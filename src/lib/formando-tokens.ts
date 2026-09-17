import "server-only";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import type { FormandoAuthPurpose } from "@prisma/client";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

export async function createFormandoAuthToken(
    email: string,
    purpose: FormandoAuthPurpose
): Promise<string> {
    const token = randomBytes(32).toString("hex");
    await prisma.formandoAuthToken.create({
        data: {
            email: email.toLowerCase(),
            token,
            purpose,
            expiresAt: new Date(Date.now() + TOKEN_TTL_MS),
        },
    });
    return token;
}

export async function consumeFormandoAuthToken(
    token: string
): Promise<{ email: string; purpose: FormandoAuthPurpose } | null> {
    const record = await prisma.formandoAuthToken.findUnique({ where: { token } });
    if (!record || record.usedAt || record.expiresAt < new Date()) {
        return null;
    }
    await prisma.formandoAuthToken.update({
        where: { token },
        data: { usedAt: new Date() },
    });
    return { email: record.email, purpose: record.purpose };
}
