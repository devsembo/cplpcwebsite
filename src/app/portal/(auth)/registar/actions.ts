"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";
import { createFormandoAuthToken } from "@/lib/formando-tokens";
import { formandoDefinirPasswordEmail } from "@/lib/email-templates/formando-definir-password";

const schema = z.object({ email: z.string().trim().email() });

export interface RequestActionResult {
    message?: string;
    error?: string;
}

const GENERIC_MESSAGE = "Se o email corresponder a uma inscrição confirmada, vais receber um link para ativar o teu acesso.";

export async function registerAction(
    _prevState: RequestActionResult,
    formData: FormData
): Promise<RequestActionResult> {
    const parsed = schema.safeParse({ email: formData.get("email") });
    if (!parsed.success) {
        return { error: "Indica um email válido." };
    }
    const email = parsed.data.email.toLowerCase();

    const existingAccount = await prisma.formandoAccount.findUnique({ where: { email } });
    const hasEnrollment = await prisma.courseEnrollment.findFirst({
        where: { email: { equals: email, mode: "insensitive" }, status: { not: "cancelada" } },
    });

    if (!existingAccount && hasEnrollment) {
        const token = await createFormandoAuthToken(email, "setup");
        const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cplpconnect.pt";
        const link = `${base}/portal/definir-password?token=${token}`;
        const emailContent = formandoDefinirPasswordEmail({ name: hasEnrollment.name, link, purpose: "setup" });
        try {
            await sendMail({ to: email, subject: emailContent.subject, html: emailContent.html });
        } catch (error) {
            console.error("Falha ao enviar email de registo do formando:", error);
        }
    }

    return { message: GENERIC_MESSAGE };
}
