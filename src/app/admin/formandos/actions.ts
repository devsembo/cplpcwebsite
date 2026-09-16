"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { nextCertificateCode } from "@/lib/certificate";
import { sendMail } from "@/lib/mail";
import { getSession } from "@/lib/session";
import type { TrainingStatus, CertificateStatus } from "@prisma/client";

export interface FormandoActionResult {
    error?: string;
    success?: boolean;
}

function deriveTrainingStatus(progress: number, grade: number | null): TrainingStatus {
    if (progress >= 100) return grade !== null && grade < 10 ? "reprovado" : "concluido";
    if (progress <= 0) return "nao_iniciado";
    return "em_curso";
}

function deriveCertificateStatus(
    trainingStatus: TrainingStatus,
    grade: number | null,
    current: CertificateStatus
): CertificateStatus {
    if (current === "emitido") return "emitido";
    return trainingStatus === "concluido" && grade !== null && grade >= 10 ? "elegivel" : "nao_elegivel";
}

export async function updateFormandoProgress(
    id: string,
    input: { progress: number; grade: number | null; hoursCompleted: number }
): Promise<FormandoActionResult> {
    if (Number.isNaN(input.progress) || input.progress < 0 || input.progress > 100) {
        return { error: "Progresso inválido — use uma percentagem de 0 a 100." };
    }
    if (input.grade !== null && (Number.isNaN(input.grade) || input.grade < 0 || input.grade > 20)) {
        return { error: "Nota inválida — use uma escala de 0 a 20." };
    }
    if (Number.isNaN(input.hoursCompleted) || input.hoursCompleted < 0) {
        return { error: "Horas inválidas." };
    }

    const existing = await prisma.courseEnrollment.findUnique({ where: { id } });
    if (!existing) return { error: "Formando não encontrado." };

    const trainingStatus = deriveTrainingStatus(input.progress, input.grade);
    const certificateStatus = deriveCertificateStatus(trainingStatus, input.grade, existing.certificateStatus);

    await prisma.courseEnrollment.update({
        where: { id },
        data: {
            progress: input.progress,
            grade: input.grade,
            hoursCompleted: input.hoursCompleted,
            trainingStatus,
            certificateStatus,
            lastActivityAt: new Date(),
        },
    });

    revalidatePath("/admin/formandos");
    revalidatePath(`/admin/formandos/${id}`);
    revalidatePath("/admin/certificados");
    revalidatePath("/admin");
    return { success: true };
}

export async function assignFormandoSessionAndCompany(
    id: string,
    input: { sessionId: string | null; clientCompanyId: string | null }
): Promise<void> {
    await prisma.courseEnrollment.update({
        where: { id },
        data: { sessionId: input.sessionId, clientCompanyId: input.clientCompanyId },
    });
    revalidatePath("/admin/formandos");
    revalidatePath(`/admin/formandos/${id}`);
    revalidatePath("/admin/turmas");
    revalidatePath("/admin/empresas");
}

export async function issueCertificate(id: string): Promise<FormandoActionResult> {
    const existing = await prisma.courseEnrollment.findUnique({ where: { id } });
    if (!existing) return { error: "Formando não encontrado." };
    if (existing.certificateStatus === "emitido") return { success: true };
    if (existing.certificateStatus !== "elegivel") {
        return { error: "Este formando ainda não é elegível para certificado." };
    }

    const code = await nextCertificateCode();
    await prisma.courseEnrollment.update({
        where: { id },
        data: { certificateStatus: "emitido", certificateCode: code, certificateIssuedAt: new Date() },
    });

    revalidatePath("/admin/formandos");
    revalidatePath(`/admin/formandos/${id}`);
    revalidatePath("/admin/certificados");
    revalidatePath("/admin");
    return { success: true };
}

export async function sendFormandoMessage(
    id: string,
    input: { subject: string; message: string }
): Promise<FormandoActionResult> {
    if (input.subject.trim().length < 3 || input.message.trim().length < 5) {
        return { error: "Preenche o assunto e a mensagem." };
    }

    const formando = await prisma.courseEnrollment.findUnique({ where: { id } });
    if (!formando) return { error: "Formando não encontrado." };

    const session = await getSession();
    let failed = false;
    try {
        await sendMail({
            to: formando.email,
            subject: input.subject,
            html: `<p>${input.message.replace(/\n/g, "<br />")}</p>`,
        });
    } catch (error) {
        console.error("Falha ao enviar email ao formando:", error);
        failed = true;
    }

    await prisma.staffNotification.create({
        data: {
            subject: input.subject,
            message: input.message,
            audienceLabel: formando.name,
            recipientEmails: [formando.email],
            successCount: failed ? 0 : 1,
            failureCount: failed ? 1 : 0,
            createdBy: session?.email,
        },
    });

    revalidatePath(`/admin/formandos/${id}`);
    revalidatePath("/admin/comunicacoes");
    return failed ? { error: "Não foi possível enviar o email. Confirma a configuração SMTP." } : { success: true };
}

export async function issueAllEligibleCertificates(): Promise<number> {
    const eligible = await prisma.courseEnrollment.findMany({ where: { certificateStatus: "elegivel" } });
    let issued = 0;
    for (const enrollment of eligible) {
        const code = await nextCertificateCode();
        await prisma.courseEnrollment.update({
            where: { id: enrollment.id },
            data: { certificateStatus: "emitido", certificateCode: code, certificateIssuedAt: new Date() },
        });
        issued += 1;
    }
    revalidatePath("/admin/formandos");
    revalidatePath("/admin/certificados");
    revalidatePath("/admin");
    return issued;
}
