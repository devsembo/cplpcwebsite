"use server";

import { prisma } from "@/lib/prisma";

export async function unsubscribeAction(token: string): Promise<{ success: boolean }> {
    const subscriber = await prisma.newsletterSubscriber.findUnique({ where: { unsubscribeToken: token } });
    if (!subscriber) {
        return { success: false };
    }

    await prisma.newsletterSubscriber.update({
        where: { id: subscriber.id },
        data: { active: false },
    });

    return { success: true };
}
