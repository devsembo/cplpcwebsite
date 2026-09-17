"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { consumeFormandoAuthToken } from "@/lib/formando-tokens";
import { setFormandoSessionCookie } from "@/lib/formando-session";

const schema = z.object({
    token: z.string().min(1),
    password: z.string().min(8, "A password tem de ter pelo menos 8 caracteres."),
});

export interface SetPasswordActionResult {
    error?: string;
}

export async function setPasswordAction(
    _prevState: SetPasswordActionResult,
    formData: FormData
): Promise<SetPasswordActionResult> {
    const parsed = schema.safeParse({
        token: formData.get("token"),
        password: formData.get("password"),
    });
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const consumed = await consumeFormandoAuthToken(parsed.data.token);
    if (!consumed) {
        return { error: "Este link é inválido ou já expirou. Pede um novo." };
    }

    const enrollment = await prisma.courseEnrollment.findFirst({
        where: { email: { equals: consumed.email, mode: "insensitive" } },
    });
    const name = enrollment?.name ?? consumed.email;
    const passwordHash = await hashPassword(parsed.data.password);

    const account = await prisma.formandoAccount.upsert({
        where: { email: consumed.email },
        update: { passwordHash },
        create: { email: consumed.email, passwordHash, name },
    });

    await setFormandoSessionCookie({ sub: account.id, email: account.email });
    redirect("/portal");
}
