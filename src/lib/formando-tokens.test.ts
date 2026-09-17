import { describe, expect, it, afterEach } from "vitest";
import { prisma } from "./prisma";
import { createFormandoAuthToken, consumeFormandoAuthToken } from "./formando-tokens";

const testEmail = "vitest-tokens@teste.cplpconnect.pt";

afterEach(async () => {
    await prisma.formandoAuthToken.deleteMany({ where: { email: testEmail } });
});

describe("formando auth tokens", () => {
    it("cria um token válido por 24h e consome-o uma vez", async () => {
        const token = await createFormandoAuthToken(testEmail, "setup");
        const result = await consumeFormandoAuthToken(token);
        expect(result).toEqual({ email: testEmail, purpose: "setup" });

        const second = await consumeFormandoAuthToken(token);
        expect(second).toBeNull();
    });

    it("rejeita um token expirado", async () => {
        const token = await createFormandoAuthToken(testEmail, "reset");
        await prisma.formandoAuthToken.update({
            where: { token },
            data: { expiresAt: new Date(Date.now() - 1000) },
        });
        const result = await consumeFormandoAuthToken(token);
        expect(result).toBeNull();
    });

    it("rejeita um token inexistente", async () => {
        const result = await consumeFormandoAuthToken("token-que-nao-existe");
        expect(result).toBeNull();
    });
});
