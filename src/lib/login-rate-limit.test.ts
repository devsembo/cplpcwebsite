import { describe, expect, it, afterEach } from "vitest";
import { prisma } from "./prisma";
import { isLoginLocked, recordFailedLoginAttempt, clearLoginAttempts } from "./login-rate-limit";

const testEmail = "vitest-rate-limit@teste.cplpconnect.pt";

afterEach(async () => {
    await prisma.adminLoginAttempt.deleteMany({ where: { email: testEmail } });
});

describe("login rate limit", () => {
    it("não bloqueia sem tentativas", async () => {
        expect(await isLoginLocked(testEmail)).toBe(false);
    });

    it("bloqueia ao fim de 5 tentativas nos últimos 15 minutos", async () => {
        for (let i = 0; i < 5; i += 1) {
            await recordFailedLoginAttempt(testEmail);
        }
        expect(await isLoginLocked(testEmail)).toBe(true);
    });

    it("desbloqueia depois de limpar as tentativas", async () => {
        for (let i = 0; i < 5; i += 1) {
            await recordFailedLoginAttempt(testEmail);
        }
        await clearLoginAttempts(testEmail);
        expect(await isLoginLocked(testEmail)).toBe(false);
    });
});
