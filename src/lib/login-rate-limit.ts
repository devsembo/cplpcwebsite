import "server-only";
import { prisma } from "@/lib/prisma";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export async function isLoginLocked(email: string): Promise<boolean> {
    const count = await prisma.adminLoginAttempt.count({
        where: { email, createdAt: { gte: new Date(Date.now() - WINDOW_MS) } },
    });
    return count >= MAX_ATTEMPTS;
}

export async function recordFailedLoginAttempt(email: string): Promise<void> {
    await prisma.adminLoginAttempt.create({ data: { email } });
}

export async function clearLoginAttempts(email: string): Promise<void> {
    await prisma.adminLoginAttempt.deleteMany({ where: { email } });
}
