import "server-only";
import { prisma } from "@/lib/prisma";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export async function isFormandoLoginLocked(email: string): Promise<boolean> {
    const count = await prisma.formandoLoginAttempt.count({
        where: { email, createdAt: { gte: new Date(Date.now() - WINDOW_MS) } },
    });
    return count >= MAX_ATTEMPTS;
}

export async function recordFailedFormandoLoginAttempt(email: string): Promise<void> {
    await prisma.formandoLoginAttempt.create({ data: { email } });
}

export async function clearFormandoLoginAttempts(email: string): Promise<void> {
    await prisma.formandoLoginAttempt.deleteMany({ where: { email } });
}
