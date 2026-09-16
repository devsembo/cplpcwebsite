"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";
import { getSession } from "@/lib/session";

export interface NotificationActionResult {
    error?: string;
    success?: boolean;
    sent?: number;
    failed?: number;
}

export async function sendBulkNotification(
    _prevState: NotificationActionResult,
    formData: FormData
): Promise<NotificationActionResult> {
    const audienceType = String(formData.get("audienceType") ?? "");
    const audienceId = String(formData.get("audienceId") ?? "");
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (subject.length < 3 || message.length < 5) {
        return { error: "Preenche o assunto e a mensagem." };
    }

    let recipients: { name: string; email: string }[] = [];
    let audienceLabel = "";

    if (audienceType === "todos") {
        recipients = await prisma.courseEnrollment.findMany({
            where: { status: "confirmada" },
            select: { name: true, email: true },
        });
        audienceLabel = "Todos os formandos";
    } else if (audienceType === "empresa") {
        const company = await prisma.company.findUnique({ where: { id: audienceId } });
        if (!company) return { error: "Empresa não encontrada." };
        recipients = await prisma.courseEnrollment.findMany({
            where: { status: "confirmada", clientCompanyId: audienceId },
            select: { name: true, email: true },
        });
        audienceLabel = company.name;
    } else if (audienceType === "turma") {
        const session = await prisma.courseSession.findUnique({ where: { id: audienceId } });
        if (!session) return { error: "Turma não encontrada." };
        recipients = await prisma.courseEnrollment.findMany({
            where: { status: "confirmada", sessionId: audienceId },
            select: { name: true, email: true },
        });
        audienceLabel = `Turma ${session.code}`;
    } else {
        return { error: "Escolhe o destinatário." };
    }

    if (recipients.length === 0) {
        return { error: "Não há formandos correspondentes a este destinatário." };
    }

    const results = await Promise.allSettled(
        recipients.map((r) =>
            sendMail({ to: r.email, subject, html: `<p>${message.replace(/\n/g, "<br />")}</p>` })
        )
    );
    const sent = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.length - sent;

    const staffSession = await getSession();
    await prisma.staffNotification.create({
        data: {
            subject,
            message,
            audienceLabel,
            recipientEmails: recipients.map((r) => r.email),
            successCount: sent,
            failureCount: failed,
            createdBy: staffSession?.email,
        },
    });

    revalidatePath("/admin/comunicacoes");
    return { success: true, sent, failed };
}
