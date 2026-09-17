import { describe, expect, it, beforeAll } from "vitest";
import { createFormandoSessionToken, verifyFormandoSessionToken } from "./formando-auth";

beforeAll(() => {
    process.env.FORMANDO_SESSION_SECRET = "segredo-de-teste-suficientemente-longo";
});

describe("formando session token", () => {
    it("cria e verifica um token válido", async () => {
        const token = await createFormandoSessionToken({ sub: "abc123", email: "formando@teste.pt" });
        const payload = await verifyFormandoSessionToken(token);
        expect(payload).toEqual({ sub: "abc123", email: "formando@teste.pt" });
    });

    it("rejeita um token inválido", async () => {
        const payload = await verifyFormandoSessionToken("token-invalido");
        expect(payload).toBeNull();
    });
});
