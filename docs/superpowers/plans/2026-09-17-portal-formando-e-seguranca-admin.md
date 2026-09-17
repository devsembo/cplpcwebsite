# Portal do Formando + Segurança do Admin — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fechar a falha de segurança do BackOffice (`/admin` acessível sem login) e construir um Portal do Formando real (login, progresso, cursos, certificados) dentro do `cplpcwebsite`, ligado à mesma base de dados Postgres/Prisma já em produção.

**Architecture:** Tudo dentro do Next.js App Router existente (`cplpcwebsite`). Duas áreas autenticadas independentes e sem sessão partilhada: `/admin/*` (equipa, já existe, só corrigir) e `/portal/*` (formandos, novo). Autenticação de formando ligada às `CourseEnrollment` existentes por email (sem alterar essa tabela). `middleware.ts` novo protege ambas as áreas.

**Tech Stack:** Next.js 16 (App Router, Server Actions), Prisma + Postgres (`@prisma/adapter-pg`), `jose` (JWT), `bcryptjs`, `nodemailer`, `qrcode`, `zod`, Tailwind CSS + componentes existentes em `src/components/ui`, Vitest (novo, para testes unitários/integração).

**Spec:** `docs/superpowers/specs/2026-09-17-portal-formando-e-seguranca-admin-design.md`

## Global Constraints

- Repositório de trabalho: `/Users/ap/Documents/cplpcwebsite`, branch `feat/portal-formando-seguranca-admin` (já criado).
- Alterações ao `prisma/schema.prisma` são **só aditivas** — nunca alterar/remover colunas ou tabelas existentes (`CourseEnrollment` não é tocada).
- Nunca correr `prisma migrate reset`, `prisma db push --force-reset`, ou qualquer comando destrutivo contra a base de dados.
- Segredos vêm sempre de `process.env`, com erro explícito se estiverem em falta (padrão já usado em `src/lib/auth.ts`).
- Reutilizar os tokens de tema Tailwind já existentes (`cplp-navy`, `cplp-blue`, `cplp-green`, `cplp-line`, `cplp-bg`, `cplp-grey`) e os componentes em `src/components/ui/*` (`Button`, `Card`, `Input`, `Label`, `Table`, `Badge`) — não introduzir nova biblioteca de UI nem gráficos (não há `recharts` neste projeto; os stats do painel são cartões simples, sem gráfico).
- Cookies de sessão: `httpOnly`, `secure` em produção, `sameSite: "lax"` (mesmo padrão de `src/lib/session.ts`).
- Testes automatizados que escrevem na base de dados partilhada usam emails claramente marcados (`vitest-<random>@teste.cplpconnect.pt`) e **têm de apagar tudo o que criaram num bloco `finally`/`afterEach`**, mesmo que o teste falhe.
- Reutilizar `hashPassword`/`verifyPassword` de `src/lib/password.ts` para passwords de formando — não reimplementar hashing.
- Nunca registar em log (`console.log`/`console.error`) o valor de passwords, tokens ou segredos de sessão — só mensagens de erro genéricas.

---

### Task 1: Schema Prisma — contas e tokens de formando, rate-limit de login

**Files:**
- Modify: `prisma/schema.prisma`
- Create: `prisma/migrations/<timestamp>_add_formando_auth_and_login_rate_limit/migration.sql` (gerado pelo Prisma)

**Interfaces:**
- Produces: modelos Prisma `FormandoAccount`, `FormandoAuthToken`, enum `FormandoAuthPurpose`, modelo `AdminLoginAttempt`, todos exportados pelo cliente Prisma gerado (`@prisma/client`).

- [ ] **Step 1: Adicionar os novos modelos ao schema**

No fim de `prisma/schema.prisma`, adicionar:

```prisma
// ---------------------------------------------------------------------------
// Portal do formando — conta própria, ligada a CourseEnrollment por email
// ---------------------------------------------------------------------------

model FormandoAccount {
  id           String    @id @default(cuid())
  email        String    @unique
  passwordHash String
  name         String
  createdAt    DateTime  @default(now())
  lastLoginAt  DateTime?
}

enum FormandoAuthPurpose {
  setup
  reset
}

// Token de uso único para definir/repor password (enviado por email).
model FormandoAuthToken {
  id        String              @id @default(cuid())
  email     String
  token     String              @unique
  purpose   FormandoAuthPurpose
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime            @default(now())

  @@index([email])
}

// Histórico de tentativas de login falhadas do admin, para bloqueio temporário.
model AdminLoginAttempt {
  id        String   @id @default(cuid())
  email     String
  createdAt DateTime @default(now())

  @@index([email, createdAt])
}
```

- [ ] **Step 2: Criar e aplicar a migração**

Run: `pnpm db:migrate --name add_formando_auth_and_login_rate_limit`

Expected: termina com "Your database is now in sync with your schema" e cria a pasta `prisma/migrations/<timestamp>_add_formando_auth_and_login_rate_limit/`.

- [ ] **Step 3: Confirmar que a migração é só aditiva**

Run: `cat prisma/migrations/*_add_formando_auth_and_login_rate_limit/migration.sql`

Expected: só contém `CREATE TYPE`/`CREATE TABLE` (nenhum `ALTER TABLE` a tabelas existentes, nenhum `DROP`).

- [ ] **Step 4: Verificar o cliente gerado com um script descartável**

Criar um ficheiro temporário `scripts/verify-schema.ts`:

```ts
import { prisma } from "@/lib/prisma";

async function main() {
    const account = await prisma.formandoAccount.create({
        data: { email: "verify-schema@teste.cplpconnect.pt", passwordHash: "x", name: "Teste" },
    });
    console.log("criado:", account.id);
    await prisma.formandoAccount.delete({ where: { id: account.id } });
    console.log("apagado com sucesso");
}

main().finally(() => prisma.$disconnect());
```

Run: `pnpm exec tsx scripts/verify-schema.ts`

Expected: imprime "criado: ..." seguido de "apagado com sucesso", sem erros.

- [ ] **Step 5: Remover o script temporário e fazer commit**

```bash
rm scripts/verify-schema.ts
git add prisma/schema.prisma prisma/migrations
git commit -m "feat(db): adiciona FormandoAccount, FormandoAuthToken e AdminLoginAttempt"
```

---

### Task 2: Vitest + sessão JWT de formando

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (devDependencies + script `test`)
- Create: `src/lib/formando-auth.ts`
- Test: `src/lib/formando-auth.test.ts`

**Interfaces:**
- Produces:
  ```ts
  export const FORMANDO_SESSION_COOKIE_NAME = "formando_session";
  export const FORMANDO_SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30;
  export interface FormandoSessionPayload { sub: string; email: string; }
  export async function createFormandoSessionToken(payload: FormandoSessionPayload): Promise<string>
  export async function verifyFormandoSessionToken(token: string): Promise<FormandoSessionPayload | null>
  ```

- [ ] **Step 1: Instalar o Vitest**

Run: `pnpm add -D vitest`

- [ ] **Step 2: Configurar o Vitest**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
    test: {
        environment: "node",
        include: ["src/**/*.test.ts"],
    },
    resolve: {
        alias: { "@": path.resolve(__dirname, "src") },
    },
});
```

Add to `package.json` `"scripts"`: `"test": "vitest run"`.

- [ ] **Step 3: Escrever o teste que falha**

Create `src/lib/formando-auth.test.ts`:

```ts
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
```

- [ ] **Step 4: Correr o teste e confirmar que falha**

Run: `pnpm test -- formando-auth`
Expected: FAIL — `Cannot find module './formando-auth'`.

- [ ] **Step 5: Implementar `formando-auth.ts`**

Create `src/lib/formando-auth.ts` (espelha `src/lib/auth.ts`, com segredo e cookie próprios):

```ts
import { SignJWT, jwtVerify } from "jose";

export const FORMANDO_SESSION_COOKIE_NAME = "formando_session";
export const FORMANDO_SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30; // 30 dias

export interface FormandoSessionPayload {
    sub: string;
    email: string;
}

function getFormandoSecretKey() {
    const secret = process.env.FORMANDO_SESSION_SECRET;
    if (!secret) {
        throw new Error("FORMANDO_SESSION_SECRET não está definida.");
    }
    return new TextEncoder().encode(secret);
}

export async function createFormandoSessionToken(payload: FormandoSessionPayload): Promise<string> {
    return new SignJWT({ email: payload.email })
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(payload.sub)
        .setIssuedAt()
        .setExpirationTime(`${FORMANDO_SESSION_DURATION_SECONDS}s`)
        .sign(getFormandoSecretKey());
}

export async function verifyFormandoSessionToken(token: string): Promise<FormandoSessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, getFormandoSecretKey());
        if (typeof payload.sub !== "string" || typeof payload.email !== "string") {
            return null;
        }
        return { sub: payload.sub, email: payload.email };
    } catch {
        return null;
    }
}
```

- [ ] **Step 6: Correr o teste e confirmar que passa**

Run: `pnpm test -- formando-auth`
Expected: PASS (2 testes).

- [ ] **Step 7: Adicionar o segredo ao ambiente local e documentar**

Run: `echo "FORMANDO_SESSION_SECRET=$(openssl rand -base64 32)" >> .env.local`

Add to `.env.example` (sem valor):

```
# Segredo para o cookie de sessão do formando (gera com: openssl rand -base64 32)
# Independente do SESSION_SECRET do admin — sessões de admin e de formando nunca se misturam.
FORMANDO_SESSION_SECRET=
```

- [ ] **Step 8: Commit**

```bash
git add vitest.config.ts package.json pnpm-lock.yaml src/lib/formando-auth.ts src/lib/formando-auth.test.ts .env.example
git commit -m "feat(portal): adiciona sessão JWT dedicada ao formando"
```

---

### Task 3: Tokens de definir/repor password

**Files:**
- Create: `src/lib/formando-tokens.ts`
- Test: `src/lib/formando-tokens.test.ts`

**Interfaces:**
- Consumes: Prisma `formandoAuthToken` (Task 1).
- Produces:
  ```ts
  export async function createFormandoAuthToken(email: string, purpose: "setup" | "reset"): Promise<string> // devolve o token em texto (não hasheado)
  export async function consumeFormandoAuthToken(token: string): Promise<{ email: string; purpose: "setup" | "reset" } | null>
  ```

- [ ] **Step 1: Escrever o teste que falha**

Create `src/lib/formando-tokens.test.ts`:

```ts
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
```

- [ ] **Step 2: Correr o teste e confirmar que falha**

Run: `pnpm test -- formando-tokens`
Expected: FAIL — módulo não encontrado.

- [ ] **Step 3: Implementar**

Create `src/lib/formando-tokens.ts`:

```ts
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
```

- [ ] **Step 4: Correr o teste e confirmar que passa**

Run: `pnpm test -- formando-tokens`
Expected: PASS (3 testes).

- [ ] **Step 5: Commit**

```bash
git add src/lib/formando-tokens.ts src/lib/formando-tokens.test.ts
git commit -m "feat(portal): tokens de uso único para definir/repor password"
```

---

### Task 4: Cookie de sessão do formando

**Files:**
- Create: `src/lib/formando-session.ts`

**Interfaces:**
- Consumes: `createFormandoSessionToken`, `verifyFormandoSessionToken`, `FORMANDO_SESSION_COOKIE_NAME`, `FORMANDO_SESSION_DURATION_SECONDS`, `FormandoSessionPayload` (Task 2).
- Produces:
  ```ts
  export async function setFormandoSessionCookie(payload: FormandoSessionPayload): Promise<void>
  export async function clearFormandoSessionCookie(): Promise<void>
  export async function getFormandoSession(): Promise<FormandoSessionPayload | null>
  ```

Nota: `cookies()` do `next/headers` só funciona dentro do contexto de pedido (Server Actions/Route Handlers/Server Components), por isso este ficheiro não tem teste unitário isolado — mirrors o padrão já existente em `src/lib/session.ts` (também sem teste direto) e é exercitado pelo teste de browser da Task 22.

- [ ] **Step 1: Implementar**

Create `src/lib/formando-session.ts`:

```ts
import "server-only";
import { cookies } from "next/headers";
import {
    FORMANDO_SESSION_COOKIE_NAME,
    FORMANDO_SESSION_DURATION_SECONDS,
    createFormandoSessionToken,
    verifyFormandoSessionToken,
    type FormandoSessionPayload,
} from "@/lib/formando-auth";

export async function setFormandoSessionCookie(payload: FormandoSessionPayload) {
    const token = await createFormandoSessionToken(payload);
    const store = await cookies();
    store.set(FORMANDO_SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: FORMANDO_SESSION_DURATION_SECONDS,
    });
}

export async function clearFormandoSessionCookie() {
    const store = await cookies();
    store.delete(FORMANDO_SESSION_COOKIE_NAME);
}

export async function getFormandoSession(): Promise<FormandoSessionPayload | null> {
    const store = await cookies();
    const token = store.get(FORMANDO_SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyFormandoSessionToken(token);
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/lib/formando-session.ts
git commit -m "feat(portal): cookie de sessão do formando"
```

---

### Task 5: Middleware — protege `/admin` e `/portal`

**Files:**
- Create: `middleware.ts` (raiz do projeto, ao lado de `next.config.ts`)
- Test: `middleware.test.ts` (raiz do projeto)

**Interfaces:**
- Consumes: `verifySessionToken`, `SESSION_COOKIE_NAME` (`src/lib/auth.ts`, já existentes); `verifyFormandoSessionToken`, `FORMANDO_SESSION_COOKIE_NAME` (Task 2).
- Produces: `export default async function middleware(request: NextRequest): Promise<NextResponse>`, `export const config = { matcher: [...] }`.

- [ ] **Step 1: Escrever o teste que falha**

Create `middleware.test.ts`:

```ts
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
```

- [ ] **Step 2: Correr o teste e confirmar que falha**

Run: `pnpm test -- middleware`
Expected: FAIL — `./middleware` não encontrado.

- [ ] **Step 3: Implementar**

Create `middleware.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { FORMANDO_SESSION_COOKIE_NAME, verifyFormandoSessionToken } from "@/lib/formando-auth";

const PUBLIC_PORTAL_PATHS = ["/portal/login", "/portal/registar", "/portal/recuperar-password", "/portal/definir-password"];

export default async function middleware(request: NextRequest): Promise<NextResponse> {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/admin")) {
        if (pathname === "/admin/login") return NextResponse.next();

        const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
        const session = token ? await verifySessionToken(token) : null;
        if (!session) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
        return NextResponse.next();
    }

    if (pathname.startsWith("/portal")) {
        if (PUBLIC_PORTAL_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
            return NextResponse.next();
        }

        const token = request.cookies.get(FORMANDO_SESSION_COOKIE_NAME)?.value;
        const session = token ? await verifyFormandoSessionToken(token) : null;
        if (!session) {
            return NextResponse.redirect(new URL("/portal/login", request.url));
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/portal/:path*"],
};
```

- [ ] **Step 4: Correr o teste e confirmar que passa**

Run: `pnpm test -- middleware`
Expected: PASS (6 testes).

- [ ] **Step 5: Commit**

```bash
git add middleware.ts middleware.test.ts
git commit -m "fix(admin): adiciona middleware que protege /admin e /portal com sessão"
```

---

### Task 6: `requireAdminSession` + rate limiting do login admin

**Files:**
- Create: `src/lib/admin-guard.ts`
- Create: `src/lib/login-rate-limit.ts`
- Test: `src/lib/login-rate-limit.test.ts`
- Modify: `src/app/admin/comunicacoes/actions.ts`
- Modify: `src/app/admin/formandos/actions.ts`
- Modify: `src/app/admin/login/actions.ts`

**Interfaces:**
- Consumes: `getSession` (`src/lib/session.ts`, já existente).
- Produces:
  ```ts
  // admin-guard.ts
  export async function requireAdminSession(): Promise<{ sub: string; email: string }> // lança erro se não houver sessão

  // login-rate-limit.ts
  export async function isLoginLocked(email: string): Promise<boolean>
  export async function recordFailedLoginAttempt(email: string): Promise<void>
  export async function clearLoginAttempts(email: string): Promise<void>
  ```

- [ ] **Step 1: Implementar `requireAdminSession` (sem teste isolado — depende de `cookies()`, exercitado pela Task 22)**

Create `src/lib/admin-guard.ts`:

```ts
import "server-only";
import { getSession } from "@/lib/session";

export async function requireAdminSession() {
    const session = await getSession();
    if (!session) {
        throw new Error("Não autorizado — sessão de admin em falta ou inválida.");
    }
    return session;
}
```

- [ ] **Step 2: Escrever o teste do rate limit que falha**

Create `src/lib/login-rate-limit.test.ts`:

```ts
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
```

- [ ] **Step 3: Correr o teste e confirmar que falha**

Run: `pnpm test -- login-rate-limit`
Expected: FAIL — módulo não encontrado.

- [ ] **Step 4: Implementar**

Create `src/lib/login-rate-limit.ts`:

```ts
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
```

- [ ] **Step 5: Correr o teste e confirmar que passa**

Run: `pnpm test -- login-rate-limit`
Expected: PASS (3 testes).

- [ ] **Step 6: Ligar o rate limit ao login do admin**

Modify `src/app/admin/login/actions.ts` — substituir o corpo de `loginAction` por:

```ts
"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { setSessionCookie } from "@/lib/session";
import { isLoginLocked, recordFailedLoginAttempt, clearLoginAttempts } from "@/lib/login-rate-limit";

const loginSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(1),
});

export interface LoginActionResult {
    error?: string;
    email?: string;
}

export async function loginAction(
    _prevState: LoginActionResult,
    formData: FormData
): Promise<LoginActionResult> {
    const rawEmail = String(formData.get("email") ?? "");
    const parsed = loginSchema.safeParse({
        email: rawEmail,
        password: formData.get("password"),
    });

    if (!parsed.success) {
        return { error: "Email ou password inválidos.", email: rawEmail };
    }

    if (await isLoginLocked(parsed.data.email)) {
        return { error: "Demasiadas tentativas falhadas. Tenta novamente dentro de 15 minutos.", email: rawEmail };
    }

    const user = await prisma.adminUser.findUnique({
        where: { email: parsed.data.email },
    });

    if (!user) {
        await recordFailedLoginAttempt(parsed.data.email);
        return { error: "Credenciais incorretas.", email: rawEmail };
    }

    const valid = await verifyPassword(parsed.data.password, user.passwordHash);
    if (!valid) {
        await recordFailedLoginAttempt(parsed.data.email);
        return { error: "Credenciais incorretas.", email: rawEmail };
    }

    await clearLoginAttempts(parsed.data.email);
    await setSessionCookie({ sub: user.id, email: user.email });

    redirect("/admin");
}
```

- [ ] **Step 7: Aplicar `requireAdminSession` às ações de maior risco**

Modify `src/app/admin/comunicacoes/actions.ts` — adicionar `import { requireAdminSession } from "@/lib/admin-guard";` e, como primeira linha do corpo de `sendBulkNotification` (antes da leitura de `formData`), `await requireAdminSession();`.

Modify `src/app/admin/formandos/actions.ts` — adicionar o mesmo import. Em `sendFormandoMessage`, substituir a linha `const session = await getSession();` (a meio da função, antes do `let failed = false;`) por `const session = await requireAdminSession();` colocada logo no início da função (antes da validação de `input.subject`/`input.message`), e mais abaixo trocar `createdBy: session?.email` por `createdBy: session.email` (já não é opcional, porque `requireAdminSession` nunca devolve `null` — lança erro nesse caso). O import de `getSession` deixa de ser necessário neste ficheiro se não for usado mais nenhuma vez — remover se for o caso.

Não mexer em `issueCertificate`/`issueAllEligibleCertificates` aqui — a Task 8 substitui essas duas funções por inteiro (já incluindo `requireAdminSession`).

- [ ] **Step 8: Verificar tipos e testes**

Run: `npx tsc --noEmit && pnpm test`
Expected: sem erros de tipo; todos os testes existentes continuam a passar.

- [ ] **Step 9: Commit**

```bash
git add src/lib/admin-guard.ts src/lib/login-rate-limit.ts src/lib/login-rate-limit.test.ts src/app/admin/comunicacoes/actions.ts src/app/admin/formandos/actions.ts src/app/admin/login/actions.ts
git commit -m "fix(admin): bloqueio de login por tentativas e guarda explícita nas ações de risco"
```

---

### Task 7: Emails de formando (definir password, certificado emitido)

**Files:**
- Create: `src/lib/email-templates/formando-definir-password.ts`
- Create: `src/lib/email-templates/formando-certificado-emitido.ts`

**Interfaces:**
- Produces:
  ```ts
  export function formandoDefinirPasswordEmail(input: { name: string; link: string; purpose: "setup" | "reset" }): { subject: string; html: string }
  export function formandoCertificadoEmitidoEmail(input: { name: string; courseTitle: string; code: string; verificationUrl: string }): { subject: string; html: string }
  ```

- [ ] **Step 1: Implementar o template de definir/repor password**

Create `src/lib/email-templates/formando-definir-password.ts`:

```ts
export function formandoDefinirPasswordEmail(input: {
    name: string;
    link: string;
    purpose: "setup" | "reset";
}): { subject: string; html: string } {
    const subject =
        input.purpose === "setup"
            ? "Ativa o teu acesso ao Portal do Formando — CPLP CONNECT Academy"
            : "Repor a tua password — CPLP CONNECT Academy";

    const intro =
        input.purpose === "setup"
            ? `Olá ${input.name}, a tua inscrição na CPLP CONNECT Academy já está confirmada. Define a tua password para aceder ao Portal do Formando:`
            : `Olá ${input.name}, recebemos um pedido para repor a tua password no Portal do Formando:`;

    return {
        subject,
        html: `
            <p>${intro}</p>
            <p><a href="${input.link}">${input.link}</a></p>
            <p>Este link é válido durante 24 horas e só pode ser usado uma vez.</p>
            <p>Se não pediste isto, ignora este email.</p>
        `,
    };
}
```

- [ ] **Step 2: Implementar o template de certificado emitido**

Create `src/lib/email-templates/formando-certificado-emitido.ts`:

```ts
export function formandoCertificadoEmitidoEmail(input: {
    name: string;
    courseTitle: string;
    code: string;
    verificationUrl: string;
}): { subject: string; html: string } {
    return {
        subject: `O teu certificado de "${input.courseTitle}" já está disponível`,
        html: `
            <p>Olá ${input.name},</p>
            <p>O teu certificado do curso <strong>${input.courseTitle}</strong> foi emitido.</p>
            <p>Código: <strong>${input.code}</strong></p>
            <p>Podes verificar e descarregar o certificado aqui: <a href="${input.verificationUrl}">${input.verificationUrl}</a></p>
            <p>Também podes consultá-lo a qualquer momento no Portal do Formando.</p>
        `,
    };
}
```

- [ ] **Step 3: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/lib/email-templates/formando-definir-password.ts src/lib/email-templates/formando-certificado-emitido.ts
git commit -m "feat(portal): templates de email para acesso e certificado emitido"
```

---

### Task 8: Emissão de certificado sem condição de corrida + email automático

**Files:**
- Modify: `src/lib/certificate.ts`
- Modify: `src/app/admin/formandos/actions.ts`
- Test: `src/lib/certificate.test.ts`

**Interfaces:**
- Consumes: `formandoCertificadoEmitidoEmail` (Task 7), `sendMail` (`src/lib/mail.ts`, existente), `requireAdminSession` (Task 6).
- Produces:
  ```ts
  export async function issueCertificateForEnrollment(enrollmentId: string): Promise<{ code: string } | null>
  ```
  (substitui o uso direto de `nextCertificateCode` nas ações de emissão; `nextCertificateCode` mantém-se exportada para compatibilidade mas deixa de ser chamada pelas ações.)

- [ ] **Step 1: Escrever o teste de concorrência que falha**

Create `src/lib/certificate.test.ts`:

```ts
import { describe, expect, it, afterEach } from "vitest";
import { prisma } from "./prisma";
import { issueCertificateForEnrollment } from "./certificate";

const testCourseSlug = "vitest-curso-certificado";
let courseId: string;
const enrollmentIds: string[] = [];

async function seedEligibleEnrollment(email: string) {
    if (!courseId) {
        const course = await prisma.course.create({
            data: {
                slug: testCourseSlug,
                title: "Curso de teste",
                summary: "x",
                description: "x",
                format: "online",
                area: "x",
            },
        });
        courseId = course.id;
    }
    const enrollment = await prisma.courseEnrollment.create({
        data: {
            courseId,
            name: "Formando Teste",
            email,
            status: "confirmada",
            progress: 100,
            grade: 15,
            trainingStatus: "concluido",
            certificateStatus: "elegivel",
        },
    });
    enrollmentIds.push(enrollment.id);
    return enrollment.id;
}

afterEach(async () => {
    await prisma.courseEnrollment.deleteMany({ where: { id: { in: enrollmentIds } } });
    enrollmentIds.length = 0;
    if (courseId) {
        await prisma.course.delete({ where: { id: courseId } }).catch(() => {});
    }
});

describe("issueCertificateForEnrollment", () => {
    it("gera códigos únicos para duas emissões concorrentes", async () => {
        const idA = await seedEligibleEnrollment("vitest-cert-a@teste.cplpconnect.pt");
        const idB = await seedEligibleEnrollment("vitest-cert-b@teste.cplpconnect.pt");

        const [resultA, resultB] = await Promise.all([
            issueCertificateForEnrollment(idA),
            issueCertificateForEnrollment(idB),
        ]);

        expect(resultA?.code).toBeTruthy();
        expect(resultB?.code).toBeTruthy();
        expect(resultA?.code).not.toBe(resultB?.code);
    });

    it("devolve null se a inscrição não for elegível", async () => {
        const id = await seedEligibleEnrollment("vitest-cert-c@teste.cplpconnect.pt");
        await prisma.courseEnrollment.update({ where: { id }, data: { certificateStatus: "nao_elegivel" } });
        const result = await issueCertificateForEnrollment(id);
        expect(result).toBeNull();
    });
});
```

- [ ] **Step 2: Correr o teste e confirmar que falha**

Run: `pnpm test -- certificate`
Expected: FAIL — `issueCertificateForEnrollment` não existe.

- [ ] **Step 3: Implementar `issueCertificateForEnrollment`**

Modify `src/lib/certificate.ts` — adicionar (mantendo `nextCertificateCode` e `certificateQrDataUrl` como estão):

```ts
import { Prisma } from "@prisma/client";

export async function issueCertificateForEnrollment(enrollmentId: string): Promise<{ code: string } | null> {
    return prisma.$transaction(
        async (tx) => {
            const enrollment = await tx.courseEnrollment.findUnique({ where: { id: enrollmentId } });
            if (!enrollment || enrollment.certificateStatus !== "elegivel") {
                return null;
            }

            const year = new Date().getFullYear();
            const prefix = `CPLP-${year}-`;
            const count = await tx.courseEnrollment.count({
                where: { certificateCode: { startsWith: prefix } },
            });
            const code = `${prefix}${String(count + 1).padStart(6, "0")}`;

            await tx.courseEnrollment.update({
                where: { id: enrollmentId },
                data: { certificateStatus: "emitido", certificateCode: code, certificateIssuedAt: new Date() },
            });

            return { code };
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
    );
}
```

- [ ] **Step 4: Correr o teste e confirmar que passa**

Run: `pnpm test -- certificate`
Expected: PASS (2 testes).

- [ ] **Step 5: Ligar às ações do admin e enviar email de certificado emitido**

Modify `src/app/admin/formandos/actions.ts` — no topo, adicionar imports:

```ts
import { issueCertificateForEnrollment, certificateVerificationUrl } from "@/lib/certificate";
import { formandoCertificadoEmitidoEmail } from "@/lib/email-templates/formando-certificado-emitido";
```

Substituir `issueCertificate` por:

```ts
export async function issueCertificate(id: string): Promise<FormandoActionResult> {
    await requireAdminSession();
    const existing = await prisma.courseEnrollment.findUnique({
        where: { id },
        include: { course: { select: { title: true } } },
    });
    if (!existing) return { error: "Formando não encontrado." };
    if (existing.certificateStatus === "emitido") return { success: true };
    if (existing.certificateStatus !== "elegivel") {
        return { error: "Este formando ainda não é elegível para certificado." };
    }

    const result = await issueCertificateForEnrollment(id);
    if (!result) return { error: "Este formando ainda não é elegível para certificado." };

    try {
        const email = formandoCertificadoEmitidoEmail({
            name: existing.name,
            courseTitle: existing.course.title,
            code: result.code,
            verificationUrl: certificateVerificationUrl(result.code),
        });
        await sendMail({ to: existing.email, subject: email.subject, html: email.html });
    } catch (error) {
        console.error("Falha ao enviar email de certificado emitido:", error);
    }

    revalidatePath("/admin/formandos");
    revalidatePath(`/admin/formandos/${id}`);
    revalidatePath("/admin/certificados");
    revalidatePath("/admin");
    return { success: true };
}
```

Substituir `issueAllEligibleCertificates` por:

```ts
export async function issueAllEligibleCertificates(): Promise<number> {
    await requireAdminSession();
    const eligible = await prisma.courseEnrollment.findMany({
        where: { certificateStatus: "elegivel" },
        include: { course: { select: { title: true } } },
    });
    let issued = 0;
    for (const enrollment of eligible) {
        const result = await issueCertificateForEnrollment(enrollment.id);
        if (!result) continue;
        issued += 1;
        try {
            const email = formandoCertificadoEmitidoEmail({
                name: enrollment.name,
                courseTitle: enrollment.course.title,
                code: result.code,
                verificationUrl: certificateVerificationUrl(result.code),
            });
            await sendMail({ to: enrollment.email, subject: email.subject, html: email.html });
        } catch (error) {
            console.error("Falha ao enviar email de certificado emitido:", error);
        }
    }
    revalidatePath("/admin/formandos");
    revalidatePath("/admin/certificados");
    revalidatePath("/admin");
    return issued;
}
```

- [ ] **Step 6: Verificar tipos, lint e testes**

Run: `npx tsc --noEmit && pnpm lint && pnpm test`
Expected: sem erros; todos os testes passam.

- [ ] **Step 7: Commit**

```bash
git add src/lib/certificate.ts src/lib/certificate.test.ts src/app/admin/formandos/actions.ts
git commit -m "fix(admin): emissão de certificado sem condição de corrida e com email automático"
```

---

### Task 9: Camada de dados do portal (scoping por email)

**Files:**
- Create: `src/lib/data/portal.ts`
- Test: `src/lib/data/portal.test.ts`

**Interfaces:**
- Produces:
  ```ts
  export function getFormandoEnrollments(email: string) // Promise<CourseEnrollment[]> com course, session, clientCompany
  export async function getFormandoSummary(email: string): Promise<{ cursosAtivos: number; horasTotais: number; notaMedia: number | null; certificadosEmitidos: number }>
  export function getFormandoCertificates(email: string) // Promise<CourseEnrollment[]> certificateStatus = "emitido"
  export function getPublishedCourses() // Promise<Course[]>
  export function getCourseForFormando(courseId: string, email: string) // Promise<{ course: Course; enrollment: CourseEnrollment | null } | null>
  export function getUpcomingSessionsForFormando(email: string) // Promise<CourseSession[]>
  ```

- [ ] **Step 1: Escrever o teste que falha**

Create `src/lib/data/portal.test.ts`:

```ts
import { describe, expect, it, afterEach } from "vitest";
import { prisma } from "@/lib/prisma";
import { getFormandoEnrollments, getFormandoSummary, getFormandoCertificates } from "./portal";

const emailA = "vitest-portal-a@teste.cplpconnect.pt";
const emailB = "vitest-portal-b@teste.cplpconnect.pt";
let courseId: string;
const enrollmentIds: string[] = [];

afterEach(async () => {
    await prisma.courseEnrollment.deleteMany({ where: { id: { in: enrollmentIds } } });
    enrollmentIds.length = 0;
    if (courseId) {
        await prisma.course.delete({ where: { id: courseId } }).catch(() => {});
        courseId = "";
    }
});

async function seed() {
    const course = await prisma.course.create({
        data: { slug: "vitest-curso-portal", title: "Curso Portal", summary: "x", description: "x", format: "online", area: "x" },
    });
    courseId = course.id;
    const a = await prisma.courseEnrollment.create({
        data: {
            courseId, name: "Formando A", email: emailA, status: "confirmada",
            progress: 50, grade: 16, hoursCompleted: 10, trainingStatus: "em_curso", certificateStatus: "nao_elegivel",
        },
    });
    const b = await prisma.courseEnrollment.create({
        data: {
            courseId, name: "Formando B", email: emailB, status: "confirmada",
            progress: 100, grade: 18, hoursCompleted: 20, trainingStatus: "concluido", certificateStatus: "emitido",
            certificateCode: "CPLP-9999-000001", certificateIssuedAt: new Date(),
        },
    });
    enrollmentIds.push(a.id, b.id);
}

describe("dados do portal", () => {
    it("só devolve as inscrições do email pedido", async () => {
        await seed();
        const enrollmentsA = await getFormandoEnrollments(emailA);
        expect(enrollmentsA).toHaveLength(1);
        expect(enrollmentsA[0].email).toBe(emailA);
    });

    it("calcula o resumo apenas com dados do próprio formando", async () => {
        await seed();
        const summary = await getFormandoSummary(emailB);
        expect(summary.certificadosEmitidos).toBe(1);
        expect(summary.horasTotais).toBe(20);
    });

    it("só lista certificados emitidos do próprio formando", async () => {
        await seed();
        const certsA = await getFormandoCertificates(emailA);
        const certsB = await getFormandoCertificates(emailB);
        expect(certsA).toHaveLength(0);
        expect(certsB).toHaveLength(1);
    });
});
```

- [ ] **Step 2: Correr o teste e confirmar que falha**

Run: `pnpm test -- data/portal`
Expected: FAIL — módulo não encontrado.

- [ ] **Step 3: Implementar**

Create `src/lib/data/portal.ts`:

```ts
import { prisma } from "@/lib/prisma";

function byEmail(email: string) {
    return { equals: email, mode: "insensitive" as const };
}

export function getFormandoEnrollments(email: string) {
    return prisma.courseEnrollment.findMany({
        where: { email: byEmail(email), status: "confirmada" },
        orderBy: { createdAt: "desc" },
        include: {
            course: true,
            session: true,
            clientCompany: { select: { id: true, name: true } },
        },
    });
}

export async function getFormandoSummary(email: string) {
    const enrollments = await getFormandoEnrollments(email);
    const cursosAtivos = enrollments.filter((e) => e.trainingStatus === "em_curso").length;
    const horasTotais = enrollments.reduce((sum, e) => sum + e.hoursCompleted, 0);
    const grades = enrollments.map((e) => e.grade).filter((g): g is number => g !== null);
    const notaMedia = grades.length > 0 ? grades.reduce((a, b) => a + b, 0) / grades.length : null;
    const certificadosEmitidos = enrollments.filter((e) => e.certificateStatus === "emitido").length;
    return { cursosAtivos, horasTotais, notaMedia, certificadosEmitidos };
}

export function getFormandoCertificates(email: string) {
    return prisma.courseEnrollment.findMany({
        where: { email: byEmail(email), certificateStatus: "emitido" },
        orderBy: { certificateIssuedAt: "desc" },
        include: { course: { select: { title: true, durationLabel: true } } },
    });
}

export function getPublishedCourses() {
    return prisma.course.findMany({
        where: { published: true },
        orderBy: [{ featured: "desc" }, { order: "asc" }],
    });
}

export async function getCourseForFormando(courseId: string, email: string) {
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) return null;
    const enrollment = await prisma.courseEnrollment.findFirst({
        where: { courseId, email: byEmail(email) },
    });
    return { course, enrollment };
}

export function getUpcomingSessionsForFormando(email: string) {
    return prisma.courseSession.findMany({
        where: {
            startDate: { gte: new Date() },
            enrollments: { some: { email: byEmail(email), status: "confirmada" } },
        },
        orderBy: { startDate: "asc" },
        include: { course: { select: { title: true } } },
    });
}
```

- [ ] **Step 4: Correr o teste e confirmar que passa**

Run: `pnpm test -- data/portal`
Expected: PASS (3 testes).

- [ ] **Step 5: Commit**

```bash
git add src/lib/data/portal.ts src/lib/data/portal.test.ts
git commit -m "feat(portal): camada de dados do formando com scoping por email"
```

---

### Task 10: Registo e recuperação de password (`/portal/registar`, `/portal/recuperar-password`)

**Files:**
- Create: `src/app/portal/(auth)/layout.tsx`
- Create: `src/app/portal/(auth)/registar/page.tsx`
- Create: `src/app/portal/(auth)/registar/RequestForm.tsx`
- Create: `src/app/portal/(auth)/registar/actions.ts`
- Create: `src/app/portal/(auth)/recuperar-password/page.tsx`
- Create: `src/app/portal/(auth)/recuperar-password/actions.ts`

**Interfaces:**
- Consumes: `createFormandoAuthToken` (Task 3), `formandoDefinirPasswordEmail` (Task 7), `sendMail` (existente).
- Produces: `registerAction`, `recoverAction` — ambos `(prevState, formData) => Promise<{ message?: string; error?: string }>` (mesmo padrão de `loginAction`).

- [ ] **Step 1: Layout partilhado das páginas de autenticação do portal**

Create `src/app/portal/(auth)/layout.tsx` (espelha `src/app/admin/login/page.tsx`):

```tsx
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function PortalAuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cplp-bg px-4">
            <div className="w-full max-w-sm">
                <div className="flex justify-center mb-8">
                    <Image
                        src="/brand/png/cplpconnect-lockup-h.png"
                        alt="CPLP CONNECT"
                        width={150}
                        height={52}
                        className="h-9 w-auto"
                        priority
                    />
                </div>
                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                    <CardContent className="p-8">{children}</CardContent>
                </Card>
            </div>
        </div>
    );
}
```

- [ ] **Step 2: Ação de registo**

Create `src/app/portal/(auth)/registar/actions.ts`:

```ts
"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";
import { createFormandoAuthToken } from "@/lib/formando-tokens";
import { formandoDefinirPasswordEmail } from "@/lib/email-templates/formando-definir-password";

const schema = z.object({ email: z.string().trim().email() });

export interface RequestActionResult {
    message?: string;
    error?: string;
}

const GENERIC_MESSAGE = "Se o email corresponder a uma inscrição confirmada, vais receber um link para ativar o teu acesso.";

export async function registerAction(
    _prevState: RequestActionResult,
    formData: FormData
): Promise<RequestActionResult> {
    const parsed = schema.safeParse({ email: formData.get("email") });
    if (!parsed.success) {
        return { error: "Indica um email válido." };
    }
    const email = parsed.data.email.toLowerCase();

    const existingAccount = await prisma.formandoAccount.findUnique({ where: { email } });
    const hasEnrollment = await prisma.courseEnrollment.findFirst({
        where: { email: { equals: email, mode: "insensitive" }, status: { not: "cancelada" } },
    });

    if (!existingAccount && hasEnrollment) {
        const token = await createFormandoAuthToken(email, "setup");
        const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cplpconnect.pt";
        const link = `${base}/portal/definir-password?token=${token}`;
        const emailContent = formandoDefinirPasswordEmail({ name: hasEnrollment.name, link, purpose: "setup" });
        try {
            await sendMail({ to: email, subject: emailContent.subject, html: emailContent.html });
        } catch (error) {
            console.error("Falha ao enviar email de registo do formando:", error);
        }
    }

    return { message: GENERIC_MESSAGE };
}
```

- [ ] **Step 3: Formulário e página de registo**

Create `src/app/portal/(auth)/registar/RequestForm.tsx`:

```tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RequestActionResult } from "./actions";

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="lg" className="w-full bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md" disabled={pending}>
            {pending ? pendingLabel : label}
        </Button>
    );
}

export default function RequestForm({
    action,
    label,
    pendingLabel,
}: {
    action: (prevState: RequestActionResult, formData: FormData) => Promise<RequestActionResult>;
    label: string;
    pendingLabel: string;
}) {
    const [state, formAction] = useActionState<RequestActionResult, FormData>(action, {});

    return (
        <form action={formAction} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="email" className="text-cplp-navy">Email</Label>
                <Input id="email" name="email" type="email" required autoComplete="email" className="border-cplp-line rounded-md" />
            </div>
            {state.error && <p className="text-sm text-red-600" role="alert">{state.error}</p>}
            {state.message && <p className="text-sm text-cplp-green" role="status">{state.message}</p>}
            <SubmitButton label={label} pendingLabel={pendingLabel} />
        </form>
    );
}
```

Create `src/app/portal/(auth)/registar/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import RequestForm from "./RequestForm";
import { registerAction } from "./actions";

export const metadata: Metadata = { title: "Ativar acesso — Portal do Formando" };

export default function RegistarPage() {
    return (
        <>
            <h1 className="text-xl font-bold text-cplp-navy mb-6 text-center">Ativar o teu acesso</h1>
            <RequestForm action={registerAction} label="Enviar link de ativação" pendingLabel="A enviar..." />
            <p className="text-sm text-cplp-grey text-center mt-6">
                Já tens conta? <Link href="/portal/login" className="text-cplp-blue">Entrar</Link>
            </p>
        </>
    );
}
```

- [ ] **Step 4: Ação e página de recuperação de password**

Create `src/app/portal/(auth)/recuperar-password/actions.ts`:

```ts
"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";
import { createFormandoAuthToken } from "@/lib/formando-tokens";
import { formandoDefinirPasswordEmail } from "@/lib/email-templates/formando-definir-password";
import type { RequestActionResult } from "../registar/actions";

const schema = z.object({ email: z.string().trim().email() });

const GENERIC_MESSAGE = "Se existir uma conta com este email, vais receber um link para repor a password.";

export async function recoverAction(
    _prevState: RequestActionResult,
    formData: FormData
): Promise<RequestActionResult> {
    const parsed = schema.safeParse({ email: formData.get("email") });
    if (!parsed.success) {
        return { error: "Indica um email válido." };
    }
    const email = parsed.data.email.toLowerCase();

    const account = await prisma.formandoAccount.findUnique({ where: { email } });
    if (account) {
        const token = await createFormandoAuthToken(email, "reset");
        const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cplpconnect.pt";
        const link = `${base}/portal/definir-password?token=${token}`;
        const emailContent = formandoDefinirPasswordEmail({ name: account.name, link, purpose: "reset" });
        try {
            await sendMail({ to: email, subject: emailContent.subject, html: emailContent.html });
        } catch (error) {
            console.error("Falha ao enviar email de recuperação de password:", error);
        }
    }

    return { message: GENERIC_MESSAGE };
}
```

Create `src/app/portal/(auth)/recuperar-password/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import RequestForm from "../registar/RequestForm";
import { recoverAction } from "./actions";

export const metadata: Metadata = { title: "Repor password — Portal do Formando" };

export default function RecuperarPasswordPage() {
    return (
        <>
            <h1 className="text-xl font-bold text-cplp-navy mb-6 text-center">Repor password</h1>
            <RequestForm action={recoverAction} label="Enviar link" pendingLabel="A enviar..." />
            <p className="text-sm text-cplp-grey text-center mt-6">
                <Link href="/portal/login" className="text-cplp-blue">Voltar ao login</Link>
            </p>
        </>
    );
}
```

- [ ] **Step 5: Verificar tipos e build da rota**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 6: Commit**

```bash
git add "src/app/portal/(auth)"
git commit -m "feat(portal): fluxo de registo e recuperação de password do formando"
```

---

### Task 11: Definir password e login do formando (`/portal/definir-password`, `/portal/login`)

**Files:**
- Create: `src/app/portal/(auth)/definir-password/page.tsx`
- Create: `src/app/portal/(auth)/definir-password/SetPasswordForm.tsx`
- Create: `src/app/portal/(auth)/definir-password/actions.ts`
- Create: `src/app/portal/(auth)/login/page.tsx`
- Create: `src/app/portal/(auth)/login/LoginForm.tsx`
- Create: `src/app/portal/(auth)/login/actions.ts`

**Interfaces:**
- Consumes: `consumeFormandoAuthToken` (Task 3), `setFormandoSessionCookie` (Task 4), `hashPassword`/`verifyPassword` (existentes).

- [ ] **Step 1: Ação de definir password (cobre setup e reset via upsert)**

Create `src/app/portal/(auth)/definir-password/actions.ts`:

```ts
"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { consumeFormandoAuthToken } from "@/lib/formando-tokens";
import { setFormandoSessionCookie } from "@/lib/formando-session";

const schema = z.object({
    token: z.string().min(1),
    password: z.string().min(8, "A password tem de ter pelo menos 8 caracteres."),
});

export interface SetPasswordActionResult {
    error?: string;
}

export async function setPasswordAction(
    _prevState: SetPasswordActionResult,
    formData: FormData
): Promise<SetPasswordActionResult> {
    const parsed = schema.safeParse({
        token: formData.get("token"),
        password: formData.get("password"),
    });
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const consumed = await consumeFormandoAuthToken(parsed.data.token);
    if (!consumed) {
        return { error: "Este link é inválido ou já expirou. Pede um novo." };
    }

    const enrollment = await prisma.courseEnrollment.findFirst({
        where: { email: { equals: consumed.email, mode: "insensitive" } },
    });
    const name = enrollment?.name ?? consumed.email;
    const passwordHash = await hashPassword(parsed.data.password);

    const account = await prisma.formandoAccount.upsert({
        where: { email: consumed.email },
        update: { passwordHash },
        create: { email: consumed.email, passwordHash, name },
    });

    await setFormandoSessionCookie({ sub: account.id, email: account.email });
    redirect("/portal");
}
```

- [ ] **Step 2: Formulário e página**

Create `src/app/portal/(auth)/definir-password/SetPasswordForm.tsx`:

```tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setPasswordAction, type SetPasswordActionResult } from "./actions";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="lg" className="w-full bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md" disabled={pending}>
            {pending ? "A guardar..." : "Definir password"}
        </Button>
    );
}

export default function SetPasswordForm({ token }: { token: string }) {
    const [state, formAction] = useActionState<SetPasswordActionResult, FormData>(setPasswordAction, {});

    return (
        <form action={formAction} className="space-y-5">
            <input type="hidden" name="token" value={token} />
            <div className="space-y-2">
                <Label htmlFor="password" className="text-cplp-navy">Nova password</Label>
                <Input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className="border-cplp-line rounded-md" />
            </div>
            {state.error && <p className="text-sm text-red-600" role="alert">{state.error}</p>}
            <SubmitButton />
        </form>
    );
}
```

Create `src/app/portal/(auth)/definir-password/page.tsx`:

```tsx
import type { Metadata } from "next";
import SetPasswordForm from "./SetPasswordForm";

export const metadata: Metadata = { title: "Definir password — Portal do Formando" };

export default async function DefinirPasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {
    const { token } = await searchParams;

    if (!token) {
        return <p className="text-center text-cplp-grey">Link inválido.</p>;
    }

    return (
        <>
            <h1 className="text-xl font-bold text-cplp-navy mb-6 text-center">Define a tua password</h1>
            <SetPasswordForm token={token} />
        </>
    );
}
```

- [ ] **Step 3: Ação e página de login**

Create `src/app/portal/(auth)/login/actions.ts`:

```ts
"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { setFormandoSessionCookie } from "@/lib/formando-session";

const schema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(1),
});

export interface FormandoLoginActionResult {
    error?: string;
    email?: string;
}

export async function formandoLoginAction(
    _prevState: FormandoLoginActionResult,
    formData: FormData
): Promise<FormandoLoginActionResult> {
    const rawEmail = String(formData.get("email") ?? "");
    const parsed = schema.safeParse({ email: rawEmail, password: formData.get("password") });
    if (!parsed.success) {
        return { error: "Email ou password inválidos.", email: rawEmail };
    }

    const account = await prisma.formandoAccount.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
    if (!account) {
        return { error: "Credenciais incorretas.", email: rawEmail };
    }

    const valid = await verifyPassword(parsed.data.password, account.passwordHash);
    if (!valid) {
        return { error: "Credenciais incorretas.", email: rawEmail };
    }

    await prisma.formandoAccount.update({ where: { id: account.id }, data: { lastLoginAt: new Date() } });
    await setFormandoSessionCookie({ sub: account.id, email: account.email });
    redirect("/portal");
}
```

Create `src/app/portal/(auth)/login/LoginForm.tsx`:

```tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formandoLoginAction, type FormandoLoginActionResult } from "./actions";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="lg" className="w-full bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md" disabled={pending}>
            {pending ? "A entrar..." : "Entrar"}
        </Button>
    );
}

export default function LoginForm() {
    const [state, formAction] = useActionState<FormandoLoginActionResult, FormData>(formandoLoginAction, {});

    return (
        <form action={formAction} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="email" className="text-cplp-navy">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={state.email ?? ""} required autoComplete="username" className="border-cplp-line rounded-md" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password" className="text-cplp-navy">Password</Label>
                <Input id="password" name="password" type="password" required autoComplete="current-password" className="border-cplp-line rounded-md" />
            </div>
            {state.error && <p className="text-sm text-red-600" role="alert">{state.error}</p>}
            <SubmitButton />
        </form>
    );
}
```

Create `src/app/portal/(auth)/login/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Entrar — Portal do Formando" };

export default function PortalLoginPage() {
    return (
        <>
            <h1 className="text-xl font-bold text-cplp-navy mb-6 text-center">Portal do Formando</h1>
            <LoginForm />
            <div className="flex justify-between text-sm text-cplp-grey mt-6">
                <Link href="/portal/registar" className="text-cplp-blue">Ativar acesso</Link>
                <Link href="/portal/recuperar-password" className="text-cplp-blue">Esqueci-me da password</Link>
            </div>
        </>
    );
}
```

- [ ] **Step 4: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 5: Commit**

```bash
git add "src/app/portal/(auth)/definir-password" "src/app/portal/(auth)/login"
git commit -m "feat(portal): definir password e login do formando"
```

---

### Task 12: Layout autenticado do portal (`PortalShell`) + logout

**Files:**
- Create: `src/components/portal/PortalShell.tsx`
- Create: `src/app/portal/(app)/layout.tsx`
- Create: `src/app/portal/actions.ts`

**Interfaces:**
- Consumes: `getFormandoSession`, `clearFormandoSessionCookie` (Task 4).
- Produces: `export async function logoutFormandoAction(): Promise<void>`; `PortalShell` componente que recebe `{ email: string; children: React.ReactNode }`.

- [ ] **Step 1: Ação de logout**

Create `src/app/portal/actions.ts`:

```ts
"use server";

import { redirect } from "next/navigation";
import { clearFormandoSessionCookie } from "@/lib/formando-session";

export async function logoutFormandoAction(): Promise<void> {
    await clearFormandoSessionCookie();
    redirect("/portal/login");
}
```

- [ ] **Step 2: Shell com navegação**

Create `src/components/portal/PortalShell.tsx`:

```tsx
import Link from "next/link";
import { logoutFormandoAction } from "@/app/portal/actions";

const NAV_ITEMS = [
    { href: "/portal", label: "Painel" },
    { href: "/portal/progresso", label: "Progresso" },
    { href: "/portal/cursos", label: "Cursos" },
    { href: "/portal/certificados", label: "Certificados" },
    { href: "/portal/agenda", label: "Agenda" },
    { href: "/portal/perfil", label: "Perfil" },
];

export default function PortalShell({ email, children }: { email: string; children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-cplp-bg">
            <aside className="w-60 shrink-0 border-r border-cplp-line bg-white p-6 hidden md:flex md:flex-col md:justify-between">
                <nav className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-cplp-grey mb-4">Portal do Formando</p>
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-sm text-cplp-navy hover:bg-cplp-bg"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div>
                    <p className="text-xs text-cplp-grey truncate mb-2">{email}</p>
                    <form action={logoutFormandoAction}>
                        <button type="submit" className="text-sm text-cplp-blue">Terminar sessão</button>
                    </form>
                </div>
            </aside>
            <main className="flex-1 min-w-0 p-6 md:p-8">{children}</main>
        </div>
    );
}
```

- [ ] **Step 3: Layout autenticado com guarda de defesa em profundidade**

Create `src/app/portal/(app)/layout.tsx`:

```tsx
import { redirect } from "next/navigation";
import { getFormandoSession } from "@/lib/formando-session";
import PortalShell from "@/components/portal/PortalShell";

export default async function PortalAppLayout({ children }: { children: React.ReactNode }) {
    const session = await getFormandoSession();
    if (!session) {
        redirect("/portal/login");
    }

    return <PortalShell email={session.email}>{children}</PortalShell>;
}
```

- [ ] **Step 4: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 5: Commit**

```bash
git add src/components/portal/PortalShell.tsx "src/app/portal/(app)/layout.tsx" src/app/portal/actions.ts
git commit -m "feat(portal): shell autenticado do formando com logout"
```

---

### Task 13: Painel (`/portal`)

**Files:**
- Create: `src/app/portal/(app)/page.tsx`

**Interfaces:**
- Consumes: `getFormandoSession` (Task 4), `getFormandoSummary`, `getFormandoEnrollments`, `getUpcomingSessionsForFormando` (Task 9).

- [ ] **Step 1: Implementar a página**

Create `src/app/portal/(app)/page.tsx`:

```tsx
import type { Metadata } from "next";
import { getFormandoSession } from "@/lib/formando-session";
import { getFormandoSummary, getFormandoEnrollments, getUpcomingSessionsForFormando } from "@/lib/data/portal";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Painel — Portal do Formando" };

function StatCard({ label, value }: { label: string; value: string | number }) {
    return (
        <Card className="border border-cplp-line shadow-none">
            <CardContent className="p-5">
                <p className="text-xs text-cplp-grey">{label}</p>
                <p className="text-2xl font-bold text-cplp-navy mt-1">{value}</p>
            </CardContent>
        </Card>
    );
}

export default async function PortalPainelPage() {
    const session = await getFormandoSession();
    const email = session!.email;

    const [summary, enrollments, upcomingSessions] = await Promise.all([
        getFormandoSummary(email),
        getFormandoEnrollments(email),
        getUpcomingSessionsForFormando(email),
    ]);

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-cplp-navy">O teu painel</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Cursos ativos" value={summary.cursosAtivos} />
                <StatCard label="Horas totais" value={summary.horasTotais} />
                <StatCard label="Nota média" value={summary.notaMedia !== null ? summary.notaMedia.toFixed(1) : "—"} />
                <StatCard label="Certificados" value={summary.certificadosEmitidos} />
            </div>

            <section>
                <h2 className="text-lg font-semibold text-cplp-navy mb-3">As tuas inscrições</h2>
                <div className="space-y-3">
                    {enrollments.length === 0 && <p className="text-sm text-cplp-grey">Ainda não tens nenhuma inscrição confirmada.</p>}
                    {enrollments.map((enrollment) => (
                        <Card key={enrollment.id} className="border border-cplp-line shadow-none">
                            <CardContent className="p-4 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-cplp-navy">{enrollment.course.title}</p>
                                    <p className="text-xs text-cplp-grey">{enrollment.progress}% concluído</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-lg font-semibold text-cplp-navy mb-3">Próximas sessões</h2>
                <div className="space-y-3">
                    {upcomingSessions.length === 0 && <p className="text-sm text-cplp-grey">Não há sessões agendadas.</p>}
                    {upcomingSessions.map((session) => (
                        <Card key={session.id} className="border border-cplp-line shadow-none">
                            <CardContent className="p-4">
                                <p className="font-semibold text-cplp-navy">{session.course.title}</p>
                                <p className="text-xs text-cplp-grey">
                                    {session.startDate?.toLocaleDateString("pt-PT") ?? "Data a confirmar"}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add "src/app/portal/(app)/page.tsx"
git commit -m "feat(portal): painel do formando com dados reais"
```

---

### Task 14: Progresso (`/portal/progresso`)

**Files:**
- Create: `src/app/portal/(app)/progresso/page.tsx`

**Interfaces:**
- Consumes: `getFormandoSession` (Task 4), `getFormandoEnrollments` (Task 9), `Table`/`Badge` (`src/components/ui`).

- [ ] **Step 1: Implementar**

Create `src/app/portal/(app)/progresso/page.tsx`:

```tsx
import type { Metadata } from "next";
import { getFormandoSession } from "@/lib/formando-session";
import { getFormandoEnrollments } from "@/lib/data/portal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Progresso — Portal do Formando" };

const STATUS_LABEL: Record<string, string> = {
    nao_iniciado: "Não iniciado",
    em_curso: "Em curso",
    concluido: "Concluído",
    reprovado: "Reprovado",
};

export default async function PortalProgressoPage() {
    const session = await getFormandoSession();
    const enrollments = await getFormandoEnrollments(session!.email);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-cplp-navy">O teu progresso</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Curso</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Progresso</TableHead>
                        <TableHead>Horas</TableHead>
                        <TableHead>Nota</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {enrollments.map((enrollment) => (
                        <TableRow key={enrollment.id}>
                            <TableCell className="font-medium text-cplp-navy">{enrollment.course.title}</TableCell>
                            <TableCell><Badge variant="outline">{STATUS_LABEL[enrollment.trainingStatus]}</Badge></TableCell>
                            <TableCell>{enrollment.progress}%</TableCell>
                            <TableCell>{enrollment.hoursCompleted}h</TableCell>
                            <TableCell>{enrollment.grade !== null ? `${enrollment.grade.toFixed(1)}/20` : "—"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {enrollments.length === 0 && <p className="text-sm text-cplp-grey">Ainda não tens inscrições confirmadas.</p>}
        </div>
    );
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add "src/app/portal/(app)/progresso"
git commit -m "feat(portal): página de progresso e notas do formando"
```

---

### Task 15: Cursos (`/portal/cursos`, `/portal/cursos/[id]`)

**Files:**
- Create: `src/app/portal/(app)/cursos/page.tsx`
- Create: `src/app/portal/(app)/cursos/[id]/page.tsx`

**Interfaces:**
- Consumes: `getFormandoSession` (Task 4), `getPublishedCourses`, `getCourseForFormando` (Task 9).

- [ ] **Step 1: Lista de cursos**

Create `src/app/portal/(app)/cursos/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedCourses } from "@/lib/data/portal";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Cursos — Portal do Formando" };

export default async function PortalCursosPage() {
    const courses = await getPublishedCourses();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-cplp-navy">Catálogo de cursos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                    <Link key={course.id} href={`/portal/cursos/${course.id}`}>
                        <Card className="border border-cplp-line shadow-none hover:border-cplp-blue transition-colors">
                            <CardContent className="p-5">
                                <p className="font-semibold text-cplp-navy">{course.title}</p>
                                <p className="text-sm text-cplp-grey mt-1">{course.summary}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
            {courses.length === 0 && <p className="text-sm text-cplp-grey">Ainda não há cursos publicados.</p>}
        </div>
    );
}
```

- [ ] **Step 2: Detalhe do curso**

Create `src/app/portal/(app)/cursos/[id]/page.tsx`:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFormandoSession } from "@/lib/formando-session";
import { getCourseForFormando } from "@/lib/data/portal";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const session = await getFormandoSession();
    const result = session ? await getCourseForFormando(id, session.email) : null;
    return { title: result ? `${result.course.title} — Portal do Formando` : "Curso" };
}

export default async function PortalCursoDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getFormandoSession();
    const result = await getCourseForFormando(id, session!.email);

    if (!result || !result.course.published) {
        notFound();
    }

    const { course, enrollment } = result;

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h1 className="text-2xl font-bold text-cplp-navy">{course.title}</h1>
                <p className="text-cplp-grey mt-1">{course.summary}</p>
            </div>

            {enrollment ? (
                <div className="flex items-center gap-3">
                    <Badge variant="outline">{enrollment.progress}% concluído</Badge>
                    <Badge variant="outline">{enrollment.hoursCompleted}h de {course.durationLabel ?? "—"}</Badge>
                </div>
            ) : (
                <p className="text-sm text-cplp-grey">Ainda não estás inscrito neste curso.</p>
            )}

            <div className="prose prose-sm max-w-none text-cplp-navy" dangerouslySetInnerHTML={{ __html: course.description }} />

            {course.highlights.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold text-cplp-navy mb-2">O que vais aprender</h2>
                    <ul className="list-disc list-inside text-sm text-cplp-grey space-y-1">
                        {course.highlights.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
}
```

- [ ] **Step 3: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 4: Commit**

```bash
git add "src/app/portal/(app)/cursos"
git commit -m "feat(portal): catálogo de cursos e página de detalhe"
```

---

### Task 16: Certificados (`/portal/certificados`, `/portal/certificados/[code]`)

**Files:**
- Create: `src/app/portal/(app)/certificados/page.tsx`
- Create: `src/app/portal/(app)/certificados/[code]/page.tsx`

**Interfaces:**
- Consumes: `getFormandoSession` (Task 4), `getFormandoCertificates` (Task 9), `certificateQrDataUrl` (`src/lib/certificate.ts`, existente).

- [ ] **Step 1: Lista de certificados**

Create `src/app/portal/(app)/certificados/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getFormandoSession } from "@/lib/formando-session";
import { getFormandoCertificates } from "@/lib/data/portal";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Certificados — Portal do Formando" };

export default async function PortalCertificadosPage() {
    const session = await getFormandoSession();
    const certificates = await getFormandoCertificates(session!.email);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-cplp-navy">Os teus certificados</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((certificate) => (
                    <Link key={certificate.id} href={`/portal/certificados/${certificate.certificateCode}`}>
                        <Card className="border border-cplp-line shadow-none hover:border-cplp-blue transition-colors">
                            <CardContent className="p-5">
                                <p className="font-semibold text-cplp-navy">{certificate.course.title}</p>
                                <p className="text-xs text-cplp-grey mt-1">{certificate.certificateCode}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
            {certificates.length === 0 && <p className="text-sm text-cplp-grey">Ainda não tens certificados emitidos.</p>}
        </div>
    );
}
```

- [ ] **Step 2: Detalhe do certificado (com QR real, escopado ao próprio formando)**

Create `src/app/portal/(app)/certificados/[code]/page.tsx`:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFormandoSession } from "@/lib/formando-session";
import { getCertificateByCode } from "@/lib/data/academy";
import { certificateQrDataUrl } from "@/lib/certificate";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ code: string }>;
}): Promise<Metadata> {
    const { code } = await params;
    return { title: `Certificado ${code} — Portal do Formando` };
}

export default async function PortalCertificadoDetailPage({ params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;
    const session = await getFormandoSession();
    const certificate = await getCertificateByCode(code);

    if (!certificate || certificate.certificateStatus !== "emitido" || certificate.email.toLowerCase() !== session!.email.toLowerCase()) {
        notFound();
    }

    const qrDataUrl = await certificateQrDataUrl(code);

    return (
        <div className="max-w-xl bg-white border border-cplp-line rounded-2xl shadow-card p-8 md:p-10 text-center">
            <h1 className="text-2xl font-bold text-cplp-navy mb-1">{certificate.name}</h1>
            <p className="text-cplp-grey mb-8">{certificate.course.title}</p>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt="QR de verificação" className="w-40 h-40 mx-auto mb-8" />

            <dl className="grid grid-cols-2 gap-4 text-sm text-left border-t border-cplp-line pt-6">
                <div>
                    <dt className="text-xs text-cplp-grey">Código</dt>
                    <dd className="font-semibold text-cplp-navy">{certificate.certificateCode}</dd>
                </div>
                <div>
                    <dt className="text-xs text-cplp-grey">Duração</dt>
                    <dd className="font-semibold text-cplp-navy">{certificate.course.durationLabel ?? `${certificate.hoursCompleted}h`}</dd>
                </div>
                <div>
                    <dt className="text-xs text-cplp-grey">Nota final</dt>
                    <dd className="font-semibold text-cplp-navy">{certificate.grade !== null ? `${certificate.grade.toFixed(1)}/20` : "—"}</dd>
                </div>
                <div>
                    <dt className="text-xs text-cplp-grey">Data de emissão</dt>
                    <dd className="font-semibold text-cplp-navy">{certificate.certificateIssuedAt?.toLocaleDateString("pt-PT") ?? "—"}</dd>
                </div>
            </dl>
        </div>
    );
}
```

- [ ] **Step 3: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 4: Commit**

```bash
git add "src/app/portal/(app)/certificados"
git commit -m "feat(portal): lista e detalhe de certificados do formando com QR real"
```

---

### Task 17: Perfil e alteração de password (`/portal/perfil`)

**Files:**
- Create: `src/app/portal/(app)/perfil/page.tsx`
- Create: `src/app/portal/(app)/perfil/ChangePasswordForm.tsx`
- Create: `src/app/portal/(app)/perfil/actions.ts`

**Interfaces:**
- Consumes: `getFormandoSession` (Task 4), `getFormandoEnrollments` (Task 9), `hashPassword`/`verifyPassword` (existentes).

- [ ] **Step 1: Ação de alterar password**

Create `src/app/portal/(app)/perfil/actions.ts`:

```ts
"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";
import { getFormandoSession } from "@/lib/formando-session";

const schema = z.object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(8, "A nova password tem de ter pelo menos 8 caracteres."),
});

export interface ChangePasswordActionResult {
    error?: string;
    message?: string;
}

export async function changePasswordAction(
    _prevState: ChangePasswordActionResult,
    formData: FormData
): Promise<ChangePasswordActionResult> {
    const session = await getFormandoSession();
    if (!session) return { error: "Sessão expirada. Entra novamente." };

    const parsed = schema.safeParse({
        currentPassword: formData.get("currentPassword"),
        newPassword: formData.get("newPassword"),
    });
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const account = await prisma.formandoAccount.findUnique({ where: { email: session.email } });
    if (!account) return { error: "Conta não encontrada." };

    const valid = await verifyPassword(parsed.data.currentPassword, account.passwordHash);
    if (!valid) return { error: "A password atual está incorreta." };

    const passwordHash = await hashPassword(parsed.data.newPassword);
    await prisma.formandoAccount.update({ where: { id: account.id }, data: { passwordHash } });

    return { message: "Password atualizada com sucesso." };
}
```

- [ ] **Step 2: Formulário**

Create `src/app/portal/(app)/perfil/ChangePasswordForm.tsx`:

```tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePasswordAction, type ChangePasswordActionResult } from "./actions";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md" disabled={pending}>
            {pending ? "A guardar..." : "Alterar password"}
        </Button>
    );
}

export default function ChangePasswordForm() {
    const [state, formAction] = useActionState<ChangePasswordActionResult, FormData>(changePasswordAction, {});

    return (
        <form action={formAction} className="space-y-4 max-w-sm">
            <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-cplp-navy">Password atual</Label>
                <Input id="currentPassword" name="currentPassword" type="password" required autoComplete="current-password" className="border-cplp-line rounded-md" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-cplp-navy">Nova password</Label>
                <Input id="newPassword" name="newPassword" type="password" required minLength={8} autoComplete="new-password" className="border-cplp-line rounded-md" />
            </div>
            {state.error && <p className="text-sm text-red-600" role="alert">{state.error}</p>}
            {state.message && <p className="text-sm text-cplp-green" role="status">{state.message}</p>}
            <SubmitButton />
        </form>
    );
}
```

- [ ] **Step 3: Página de perfil**

Create `src/app/portal/(app)/perfil/page.tsx`:

```tsx
import type { Metadata } from "next";
import { getFormandoSession } from "@/lib/formando-session";
import { getFormandoEnrollments } from "@/lib/data/portal";
import ChangePasswordForm from "./ChangePasswordForm";

export const metadata: Metadata = { title: "Perfil — Portal do Formando" };

export default async function PortalPerfilPage() {
    const session = await getFormandoSession();
    const enrollments = await getFormandoEnrollments(session!.email);
    const name = enrollments[0]?.name ?? session!.email;

    return (
        <div className="space-y-8 max-w-2xl">
            <div>
                <h1 className="text-2xl font-bold text-cplp-navy">{name}</h1>
                <p className="text-cplp-grey">{session!.email}</p>
            </div>

            <section>
                <h2 className="text-lg font-semibold text-cplp-navy mb-3">Histórico de formação</h2>
                <ul className="space-y-2 text-sm">
                    {enrollments.map((enrollment) => (
                        <li key={enrollment.id} className="text-cplp-navy">
                            {enrollment.course.title} — {enrollment.progress}%
                        </li>
                    ))}
                </ul>
                {enrollments.length === 0 && <p className="text-sm text-cplp-grey">Sem histórico ainda.</p>}
            </section>

            <section>
                <h2 className="text-lg font-semibold text-cplp-navy mb-3">Alterar password</h2>
                <ChangePasswordForm />
            </section>
        </div>
    );
}
```

- [ ] **Step 4: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 5: Commit**

```bash
git add "src/app/portal/(app)/perfil"
git commit -m "feat(portal): página de perfil com alteração de password"
```

---

### Task 18: Agenda (`/portal/agenda`)

**Files:**
- Create: `src/app/portal/(app)/agenda/page.tsx`

**Interfaces:**
- Consumes: `getFormandoSession` (Task 4), `getUpcomingSessionsForFormando` (Task 9).

- [ ] **Step 1: Implementar**

Create `src/app/portal/(app)/agenda/page.tsx`:

```tsx
import type { Metadata } from "next";
import { getFormandoSession } from "@/lib/formando-session";
import { getUpcomingSessionsForFormando } from "@/lib/data/portal";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Agenda — Portal do Formando" };

export default async function PortalAgendaPage() {
    const session = await getFormandoSession();
    const sessions = await getUpcomingSessionsForFormando(session!.email);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-cplp-navy">Próximas sessões</h1>
            <div className="space-y-3">
                {sessions.map((courseSession) => (
                    <Card key={courseSession.id} className="border border-cplp-line shadow-none">
                        <CardContent className="p-5 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-cplp-navy">{courseSession.course.title}</p>
                                <p className="text-xs text-cplp-grey">Turma {courseSession.code}{courseSession.location ? ` · ${courseSession.location}` : ""}</p>
                            </div>
                            <p className="text-sm text-cplp-navy">
                                {courseSession.startDate?.toLocaleDateString("pt-PT") ?? "Data a confirmar"}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {sessions.length === 0 && <p className="text-sm text-cplp-grey">Não tens sessões agendadas.</p>}
        </div>
    );
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add "src/app/portal/(app)/agenda"
git commit -m "feat(portal): página de agenda do formando"
```

---

### Task 19: Ligação a partir do site institucional

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Footer.tsx`

**Interfaces:** nenhuma nova — apenas entradas de navegação estáticas.

- [ ] **Step 1: Adicionar o link no menu principal**

Modify `src/components/Navbar.tsx` — logo a seguir à linha `{ type: 'link', href: '/academy', label: 'Academy' },` (linha 87), adicionar:

```ts
        { type: 'link', href: '/portal/login', label: 'Área do Formando' },
```

- [ ] **Step 2: Adicionar o link no rodapé**

Modify `src/components/Footer.tsx` — logo a seguir à linha `<li><Link href="/academy" className="text-white/60 hover:text-white text-sm transition-colors">Academy</Link></li>` (linha 61), adicionar:

```tsx
                            <li><Link href="/portal/login" className="text-white/60 hover:text-white text-sm transition-colors">Área do Formando</Link></li>
```

- [ ] **Step 3: Verificar tipos e lint**

Run: `npx tsc --noEmit && pnpm lint`
Expected: sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx src/components/Footer.tsx
git commit -m "feat(site): liga o menu e o rodapé ao Portal do Formando"
```

---

### Task 20: Verificação final de build

**Files:** nenhum novo — só verificação.

- [ ] **Step 1: Lint completo**

Run: `pnpm lint`
Expected: sem erros nem avisos.

- [ ] **Step 2: Verificação de tipos completa**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Suite de testes completa**

Run: `pnpm test`
Expected: todos os testes passam (Tasks 2, 3, 5, 6, 8, 9).

- [ ] **Step 4: Build de produção**

Run: `pnpm build`
Expected: build termina sem erros. Se falhar por causa de uma rota específica, corrigir antes de continuar — não avançar para o deploy com um build partido.

- [ ] **Step 5: Commit se alguma correção tiver sido necessária**

```bash
git add -A
git commit -m "fix: corrige erros encontrados na verificação final de build"
```

(Se não houver alterações, não é necessário commit.)

---

### Task 21: Verificação end-to-end no browser (admin + formando)

**Files:** nenhum novo — verificação manual com automação de browser contra um servidor de desenvolvimento local.

Esta tarefa não segue o formato TDD — é a verificação de aceitação final pedida explicitamente ("testado e validado"). Usa as ferramentas de automação de browser (Playwright) já disponíveis nesta sessão, sempre contra `http://localhost:3000` a correr localmente — **nunca contra cplpconnect.pt em produção**.

- [ ] **Step 1: Arrancar o servidor de desenvolvimento**

Run (em background): `pnpm dev`
Esperar até `http://localhost:3000` responder.

- [ ] **Step 2: Confirmar que o `/admin` está protegido**

Navegar para `http://localhost:3000/admin` sem sessão. Esperado: redireciona para `http://localhost:3000/admin/login`.

Fazer login com `ADMIN_EMAIL`/`ADMIN_PASSWORD` de `.env.local`. Esperado: chega ao dashboard `/admin` com a barra lateral visível.

- [ ] **Step 3: Preparar uma inscrição de teste elegível para certificado**

Usar o admin (UI ou uma query Prisma pontual) para criar um curso publicado e uma `CourseEnrollment` com `status: "confirmada"`, email de teste (`browser-teste@teste.cplpconnect.pt`), `progress: 100`, `grade: 18`, `trainingStatus: "concluido"`, `certificateStatus: "elegivel"`. Emitir o certificado a partir de `/admin/formandos` ou `/admin/certificados`. Confirmar que aparece `certificateStatus: "emitido"` e um `certificateCode`.

- [ ] **Step 4: Fluxo de registo do formando**

Navegar para `http://localhost:3000/portal/registar`, submeter `browser-teste@teste.cplpconnect.pt`. Confirmar a mensagem genérica de sucesso. Consultar a caixa de correio de teste configurada em `SMTP_*` (ou, se não for possível aceder à caixa real, ler diretamente da tabela `FormandoAuthToken` o token mais recente para esse email) e navegar para `http://localhost:3000/portal/definir-password?token=<token>`. Definir uma password e confirmar o redireccionamento para `/portal`.

- [ ] **Step 5: Confirmar dados reais no portal**

No painel (`/portal`), confirmar que aparece 1 certificado emitido e a inscrição criada no Step 3. Navegar para `/portal/certificados`, abrir o certificado, confirmar que a imagem do QR é renderizada e os dados (código, nota, data) correspondem aos criados no Step 3.

- [ ] **Step 6: Logout e novo login**

Terminar sessão a partir do `PortalShell`. Confirmar redireccionamento para `/portal/login`. Fazer login novamente com a password definida no Step 4. Confirmar acesso ao painel.

- [ ] **Step 7: Confirmar que a página pública de verificação continua a funcionar**

Navegar para `http://localhost:3000/certificado/<certificateCode>` (sem sessão nenhuma). Confirmar que mostra o certificado como válido, com QR.

- [ ] **Step 8: Limpar os dados de teste**

Apagar a `CourseEnrollment`, `FormandoAccount` e `FormandoAuthToken` criados nos steps anteriores (via `/admin` ou uma query Prisma pontual), e o `Course` de teste se tiver sido criado só para este fim.

- [ ] **Step 9: Parar o servidor de desenvolvimento**

Terminar o processo `pnpm dev` iniciado no Step 1.

- [ ] **Step 10: Reportar o resultado**

Documentar (na resposta ao utilizador, não em ficheiro) que passos passaram e, se algum falhou, o que foi corrigido antes de repetir.

---

## Nota sobre o deploy final

Este plano termina com o código pronto, testado e commitado no branch `feat/portal-formando-seguranca-admin`. O deploy para produção (`git push`, merge para `main`, e `pm2 deploy production` / `git pull` + `pm2 restart cplpconnect` no VPS) é um passo manual, feito em conjunto com o utilizador, porque este ambiente não tem acesso SSH a `141.94.244.148`. Não faz parte das tarefas acima — é tratado à parte, depois de todas as tarefas estarem concluídas e revistas.
