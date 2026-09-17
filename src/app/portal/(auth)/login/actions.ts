"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { setFormandoSessionCookie } from "@/lib/formando-session";

const schema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(1),
});

export interface FormandoLoginActionResult {
    error?: string;
    email?: string;
}

export async function formandoLoginAction(
    _prevState: FormandoLoginActionResult,
    formData: FormData
): Promise<FormandoLoginActionResult> {
    const rawEmail = String(formData.get("email") ?? "");
    const parsed = schema.safeParse({ email: rawEmail, password: formData.get("password") });
    if (!parsed.success) {
        return { error: "Email ou password inválidos.", email: rawEmail };
    }

    const account = await prisma.formandoAccount.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
    if (!account) {
        return { error: "Credenciais incorretas.", email: rawEmail };
    }

    const valid = await verifyPassword(parsed.data.password, account.passwordHash);
    if (!valid) {
        return { error: "Credenciais incorretas.", email: rawEmail };
    }

    await prisma.formandoAccount.update({ where: { id: account.id }, data: { lastLoginAt: new Date() } });
    await setFormandoSessionCookie({ sub: account.id, email: account.email });
    redirect("/portal");
}
