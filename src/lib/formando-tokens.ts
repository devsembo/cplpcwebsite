import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import type { FormandoAuthPurpose } from "@prisma/client";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

// O token é entregue por email em texto simples, mas nunca é guardado assim
// na base de dados — só o hash é persistido, tal como as passwords
// (src/lib/password.ts). `consumeFormandoAuthToken` recebe sempre o valor em
// texto simples (vindo do link) e faz o mesmo hash antes de procurar.
function hashToken(token: string): string {
    return createHash("sha256").update(token).digest("hex");
}

export async function createFormandoAuthToken(
    email: string,
    purpose: FormandoAuthPurpose
): Promise<string> {
    const rawToken = randomBytes(32).toString("hex");
    await prisma.formandoAuthToken.create({
        data: {
            email: email.toLowerCase(),
            token: hashToken(rawToken),
            purpose,
            expiresAt: new Date(Date.now() + TOKEN_TTL_MS),
        },
    });
    return rawToken;
}

export async function consumeFormandoAuthToken(
    token: string
): Promise<{ email: string; purpose: FormandoAuthPurpose } | null> {
    const hashedToken = hashToken(token);
    const record = await prisma.formandoAuthToken.findUnique({ where: { token: hashedToken } });
    if (!record || record.usedAt || record.expiresAt < new Date()) {
        return null;
    }
    await prisma.formandoAuthToken.update({
        where: { token: hashedToken },
        data: { usedAt: new Date() },
    });
    return { email: record.email, purpose: record.purpose };
}
