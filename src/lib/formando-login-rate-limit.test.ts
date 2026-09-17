import { describe, expect, it, afterEach } from "vitest";
import { prisma } from "./prisma";
import { isFormandoLoginLocked, recordFailedFormandoLoginAttempt, clearFormandoLoginAttempts } from "./formando-login-rate-limit";

const testEmail = `vitest-formando-rate-limit-${Math.random().toString(36).slice(2)}@teste.cplpconnect.pt`;

afterEach(async () => {
    await prisma.formandoLoginAttempt.deleteMany({ where: { email: testEmail } });
});

describe("formando login rate limit", () => {
    it("não bloqueia sem tentativas", async () => {
        expect(await isFormandoLoginLocked(testEmail)).toBe(false);
    });

    it("bloqueia ao fim de 5 tentativas nos últimos 15 minutos", async () => {
        for (let i = 0; i < 5; i += 1) {
            await recordFailedFormandoLoginAttempt(testEmail);
        }
        expect(await isFormandoLoginLocked(testEmail)).toBe(true);
    });

    it("desbloqueia depois de limpar as tentativas", async () => {
        for (let i = 0; i < 5; i += 1) {
            await recordFailedFormandoLoginAttempt(testEmail);
        }
        await clearFormandoLoginAttempts(testEmail);
        expect(await isFormandoLoginLocked(testEmail)).toBe(false);
    });
});
