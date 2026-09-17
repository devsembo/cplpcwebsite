"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";
import { createFormandoAuthToken } from "@/lib/formando-tokens";
import { formandoDefinirPasswordEmail } from "@/lib/email-templates/formando-definir-password";
import type { RequestActionResult } from "../registar/actions";

const schema = z.object({ email: z.string().trim().email() });

const GENERIC_MESSAGE = "Se existir uma conta com este email, vais receber um link para repor a password.";

export async function recoverAction(
    _prevState: RequestActionResult,
    formData: FormData
): Promise<RequestActionResult> {
    const parsed = schema.safeParse({ email: formData.get("email") });
    if (!parsed.success) {
        return { error: "Indica um email válido." };
    }
    const email = parsed.data.email.toLowerCase();

    const account = await prisma.formandoAccount.findUnique({ where: { email } });
    if (account) {
        const token = await createFormandoAuthToken(email, "reset");
        const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cplpconnect.pt";
        const link = `${base}/portal/definir-password?token=${token}`;
        const emailContent = formandoDefinirPasswordEmail({ name: account.name, link, purpose: "reset" });
        try {
            await sendMail({ to: email, subject: emailContent.subject, html: emailContent.html });
        } catch (error) {
            console.error("Falha ao enviar email de recuperação de password:", error);
        }
    }

    return { message: GENERIC_MESSAGE };
}
