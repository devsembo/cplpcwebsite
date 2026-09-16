import "server-only";
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

export async function certificateQrDataUrl(code: string): Promise<string> {
    return QRCode.toDataURL(certificateVerificationUrl(code), {
        margin: 1,
        width: 240,
        color: { dark: "#0B1533", light: "#00000000" },
    });
}
