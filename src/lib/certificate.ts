import "server-only";
import { Prisma } from "@prisma/client";
import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";
import { certificateVerificationUrl } from "@/lib/certificate-client";

export { certificateVerificationUrl };

/**
 * Gera o próximo código de certificado do ano corrente, ex: "CPLP-2026-000042".
 * Sequencial por ano, calculado a partir dos códigos já emitidos na BD (sem
 * contador separado — não há corrida real de escrita nesta operação).
 */
export async function nextCertificateCode(): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `CPLP-${year}-`;
    const count = await prisma.courseEnrollment.count({
        where: { certificateCode: { startsWith: prefix } },
    });
    return `${prefix}${String(count + 1).padStart(6, "0")}`;
}

const MAX_SERIALIZATION_RETRIES = 5;

function isSerializationFailure(error: unknown): boolean {
    // Postgres aborta uma das transações concorrentes com SQLSTATE 40001
    // ("could not serialize access due to concurrent update") quando duas
    // transações Serializable colidem — o Prisma expõe isto como P2034.
    // É o comportamento esperado e documentado do isolamento Serializable:
    // a aplicação tem de repetir a transação em vez de tratar isto como
    // erro definitivo.
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2034";
}

/**
 * Emite o certificado de uma inscrição elegível de forma atómica: valida a
 * elegibilidade, calcula o próximo código e grava tudo dentro da mesma
 * transação Serializable, para que duas emissões concorrentes nunca
 * produzam o mesmo código (o que `nextCertificateCode` sozinho não garante).
 *
 * Sob isolamento Serializable, quando duas emissões concorrem pelo mesmo
 * intervalo de códigos, o Postgres aborta uma delas com um erro de
 * serialização (P2034) em vez de deixar ambas prosseguir — por isso
 * repetimos a transação um número limitado de vezes antes de desistir.
 */
export async function issueCertificateForEnrollment(
    enrollmentId: string,
    attempt = 1
): Promise<{ code: string } | null> {
    try {
        return await prisma.$transaction(
            async (tx) => {
                const enrollment = await tx.courseEnrollment.findUnique({ where: { id: enrollmentId } });
                if (!enrollment || enrollment.certificateStatus !== "elegivel") {
                    return null;
                }

                const year = new Date().getFullYear();
                const prefix = `CPLP-${year}-`;
                const count = await tx.courseEnrollment.count({
                    where: { certificateCode: { startsWith: prefix } },
                });
                const code = `${prefix}${String(count + 1).padStart(6, "0")}`;

                await tx.courseEnrollment.update({
                    where: { id: enrollmentId },
                    data: { certificateStatus: "emitido", certificateCode: code, certificateIssuedAt: new Date() },
                });

                return { code };
            },
            { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
        );
    } catch (error) {
        if (isSerializationFailure(error) && attempt < MAX_SERIALIZATION_RETRIES) {
            return issueCertificateForEnrollment(enrollmentId, attempt + 1);
        }
        throw error;
    }
}

export async function certificateQrDataUrl(code: string): Promise<string> {
    return QRCode.toDataURL(certificateVerificationUrl(code), {
        margin: 1,
        width: 240,
        color: { dark: "#0B1533", light: "#00000000" },
    });
}
