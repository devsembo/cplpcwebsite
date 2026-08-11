"use server";

import { prisma } from "@/lib/prisma";
import { newsletterEmailSchema } from "@/lib/schemas/newsletter";

export interface SubscribeResult {
    error?: string;
    success?: boolean;
}

export async function subscribeAction(
    _prevState: SubscribeResult,
    formData: FormData
): Promise<SubscribeResult> {
    const parsed = newsletterEmailSchema.safeParse(formData.get("email"));
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Email inválido." };
    }

    const email = parsed.data.toLowerCase();
    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });

    if (existing?.active) {
        return { error: "Este email já está subscrito." };
    }

    if (existing) {
        await prisma.newsletterSubscriber.update({
            where: { email },
            data: { active: true },
        });
    } else {
        await prisma.newsletterSubscriber.create({ data: { email } });
    }

    return { success: true };
}
