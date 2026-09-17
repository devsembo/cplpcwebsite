"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { setSessionCookie } from "@/lib/session";
import { isLoginLocked, recordFailedLoginAttempt, clearLoginAttempts } from "@/lib/login-rate-limit";

const loginSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(1),
});

export interface LoginActionResult {
    error?: string;
    email?: string;
}

export async function loginAction(
    _prevState: LoginActionResult,
    formData: FormData
): Promise<LoginActionResult> {
    const rawEmail = String(formData.get("email") ?? "");
    const parsed = loginSchema.safeParse({
        email: rawEmail,
        password: formData.get("password"),
    });

    if (!parsed.success) {
        return { error: "Email ou password inválidos.", email: rawEmail };
    }

    if (await isLoginLocked(parsed.data.email)) {
        return { error: "Demasiadas tentativas falhadas. Tenta novamente dentro de 15 minutos.", email: rawEmail };
    }

    const user = await prisma.adminUser.findUnique({
        where: { email: parsed.data.email },
    });

    if (!user) {
        await recordFailedLoginAttempt(parsed.data.email);
        return { error: "Credenciais incorretas.", email: rawEmail };
    }

    const valid = await verifyPassword(parsed.data.password, user.passwordHash);
    if (!valid) {
        await recordFailedLoginAttempt(parsed.data.email);
        return { error: "Credenciais incorretas.", email: rawEmail };
    }

    await clearLoginAttempts(parsed.data.email);
    await setSessionCookie({ sub: user.id, email: user.email });

    redirect("/admin");
}
