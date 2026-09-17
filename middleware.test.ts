import { describe, expect, it, beforeAll } from "vitest";
import { NextRequest } from "next/server";
import middleware from "./middleware";
import { createSessionToken } from "./src/lib/auth";
import { createFormandoSessionToken } from "./src/lib/formando-auth";

beforeAll(() => {
    process.env.SESSION_SECRET = "segredo-admin-de-teste-suficientemente-longo";
    process.env.FORMANDO_SESSION_SECRET = "segredo-formando-de-teste-suficientemente-longo";
});

describe("middleware", () => {
    it("redireciona /admin sem sessão para /admin/login", async () => {
        const request = new NextRequest(new URL("http://localhost/admin"));
        const response = await middleware(request);
        expect(response.status).toBe(307);
        expect(response.headers.get("location")).toBe("http://localhost/admin/login");
    });

    it("deixa passar /admin com sessão válida", async () => {
        const token = await createSessionToken({ sub: "1", email: "admin@teste.pt" });
        const request = new NextRequest(new URL("http://localhost/admin"), {
            headers: { cookie: `admin_session=${token}` },
        });
        const response = await middleware(request);
        expect(response.status).toBe(200);
    });

    it("deixa sempre passar /admin/login", async () => {
        const request = new NextRequest(new URL("http://localhost/admin/login"));
        const response = await middleware(request);
        expect(response.status).toBe(200);
    });

    it("redireciona /portal sem sessão para /portal/login", async () => {
        const request = new NextRequest(new URL("http://localhost/portal"));
        const response = await middleware(request);
        expect(response.status).toBe(307);
        expect(response.headers.get("location")).toBe("http://localhost/portal/login");
    });

    it("deixa passar /portal com sessão de formando válida", async () => {
        const token = await createFormandoSessionToken({ sub: "1", email: "formando@teste.pt" });
        const request = new NextRequest(new URL("http://localhost/portal"), {
            headers: { cookie: `formando_session=${token}` },
        });
        const response = await middleware(request);
        expect(response.status).toBe(200);
    });

    it("deixa sempre passar as páginas públicas do portal", async () => {
        for (const path of ["/portal/login", "/portal/registar", "/portal/recuperar-password", "/portal/definir-password"]) {
            const request = new NextRequest(new URL(`http://localhost${path}`));
            const response = await middleware(request);
            expect(response.status).toBe(200);
        }
    });
});
