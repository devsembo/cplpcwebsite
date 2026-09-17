# Portal do Formando + Segurança do BackOffice — Design

**Data:** 2026-09-17
**Repositório principal de implementação:** `cplpcwebsite` (Next.js 16, produção em cplpconnect.pt)
**Repositório de referência visual (não implementado diretamente):** `cplpAcademy/academy` (protótipo Lovable/TanStack, sem backend)

## Contexto

O pedido original era "verificar o BackOffice e integrá-lo com o frontend cplpconnect, pronto para produção", cobrindo: gestão de certificações, empresas, formandos, comunicação por email e autenticação de admins e formandos.

Investigação revelou:

1. **O BackOffice real já existe e está completo** em `cplpcwebsite/src/app/admin/*` (cursos, turmas, formandos, empresas, certificados, comunicações, inscrições, vagas, candidaturas, blog, etc.), ligado a Postgres real via Prisma, com envio de email real (nodemailer/SMTP) e emissão de certificados com QR real. Não há stubs nem dados fictícios — tudo funcional.
2. **Falha crítica de segurança**: `src/app/admin/layout.tsx` verifica a sessão só para decidir se mostra a barra lateral, mas **renderiza `{children}` mesmo sem sessão válida**. Não existe `middleware.ts`. Resultado: todas as páginas admin e todas as server actions (incluindo envio de email em massa e emissão de certificados) são acessíveis sem autenticação, a qualquer pessoa com o URL.
3. **Não existe autoserviço para formandos.** `CourseEnrollment` (o registo de um formando) não tem password nem conta — só a equipa gere os dados via admin. Não há login, progresso pessoal, nem download de certificado pelo próprio formando.
4. **O projeto `academy`** é um protótipo Lovable/TanStack sem backend, sem persistência, sem autenticação — mas com um bom design visual já pronto para as páginas do formando (painel, progresso, cursos, certificados, perfil, agenda). As rotas `admin.*` desse projeto são um design de referência anterior, hoje redundante face ao BackOffice real, e serão descartadas (nenhum trabalho adicional nesse repositório).
5. **cplpconnect.pt não corre em Vercel** — corre num VPS próprio (Nginx + PM2), deploy via `git push` + `pm2 deploy` por SSH. Não há acesso SSH a partir deste ambiente. Por isso o Portal do Formando será construído **dentro do próprio `cplpcwebsite`** (mesma app, mesmo pipeline de deploy), evitando infraestrutura nova (sem subdomínio, sem processo PM2 extra, sem DNS novo).
6. Envio de email já funciona com SMTP/nodemailer real e configurado — **mantém-se esse mecanismo** em vez de introduzir o Resend (decisão inicial revista: não há motivo para trocar um sistema de email já funcional em produção).

## Objetivos

1. Corrigir a falha de segurança do `/admin` (prioridade máxima, antes de qualquer outra alteração).
2. Validar e corrigir o BackOffice existente para produção (bugs menores encontrados na auditoria).
3. Construir autenticação self-service para formandos.
4. Construir o Portal do Formando (painel, progresso, cursos, certificados, perfil, agenda) com dados reais, usando o design do protótipo `academy` como referência visual.
5. Ligar o site institucional ao portal (link "Área do Formando" na navegação).
6. Testar (automatizado + browser) e fazer o deploy em produção.

## Fora de âmbito (YAGNI, decisões explícitas)

- **Conta de "gestor de empresa"** (a vista `equipa.tsx` do protótipo, com compliance de equipa) — teria um terceiro papel de autenticação não pedido explicitamente. Fica para uma fase futura.
- **Redesenho visual do admin existente** com o estilo do protótipo `academy` — o admin atual é funcional; o foco é segurança e correção, não redesign. (Confirmado com o utilizador: "verificar, corrigir bugs e validar", não "reescrever".)
- **Trocar o email de SMTP/nodemailer para Resend** — mantém-se o que já funciona em produção.
- **Suite de testes completa para todo o CRUD já existente** (cursos, blog, vagas, etc.) — sem cobertura hoje; adicionar testes completos a tudo isso é um esforço grande e não é o que falhou. Foco de testes: código novo (autenticação admin/formando, portal) + os fluxos críticos pedidos ("testado e validado").
- **CI/CD novo** — mantém-se o pipeline manual PM2 existente.
- **Multi-idioma no portal** — só português nesta fase (como cursos/vagas hoje).

## Arquitetura

Tudo dentro de `cplpcwebsite` (Next.js App Router, Prisma/Postgres, mesmo deploy PM2/Nginx). Duas áreas autenticadas independentes, sem partilha de sessão:

- `/admin/*` — equipa (já existe, só corrigir).
- `/portal/*` — formandos (novo).

### 1. Segurança do `/admin` (fazer primeiro, isolado do resto)

- Adicionar `middleware.ts` na raiz do projeto, `matcher: ["/admin/:path*"]`, que:
  - Deixa passar `/admin/login` sem verificação.
  - Para todas as outras rotas `/admin/*`, verifica o cookie `admin_session` com `verifySessionToken` (já existe em `src/lib/auth.ts`, compatível com Edge Runtime porque usa `jose`).
  - Sem sessão válida → `redirect("/admin/login")`.
- Defesa em profundidade: adicionar um `requireAdminSession()` (lança erro se não houver sessão) no início das server actions de maior risco: `sendBulkNotification`, `issueCertificate`, `issueAllEligibleCertificates`, e todas as ações de eliminação (`delete*`). O middleware cobre o acesso a páginas; isto cobre chamadas diretas à action.
- Rate limiting simples no login: contador de tentativas falhadas por email (tabela nova `AdminLoginAttempt` ou reaproveitar um contador em memória com fallback DB) — bloqueio de 15 minutos ao fim de 5 tentativas falhadas.
- Corrigir a condição de corrida em `nextCertificateCode()`: envolver a leitura+escrita numa transação Prisma serializável (`prisma.$transaction(..., { isolationLevel: "Serializable" })`) ou usar uma tabela de contador dedicada com `UPDATE ... RETURNING` atómico.

### 2. Autenticação de formandos

Novo modelo Prisma (migração aditiva, não toca em tabelas existentes):

```prisma
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
```

`CourseEnrollment` não é alterado — a ligação entre conta e inscrições é feita por email (case-insensitive) em tempo de consulta: `where: { email: { equals: session.email, mode: "insensitive" } }`. Um formando pode ter várias inscrições (vários cursos/turmas).

**Fluxos:**

- **Registo** (`/portal/registar`): formando indica o email. Se existir pelo menos uma `CourseEnrollment` com esse email e `status != cancelada`, e ainda não existir `FormandoAccount`, envia-se um email com link para `/portal/definir-password?token=...` (token de 24h, `purpose=setup`). Se não existir inscrição correspondente, mostra-se sempre a mesma mensagem genérica ("se o email existir, vai receber instruções") — evita enumeração de utilizadores.
- **Definir password**: valida o token (não expirado, não usado), cria `FormandoAccount` com bcrypt hash, marca o token como usado, autentica automaticamente (define cookie `formando_session`).
- **Login** (`/portal/login`): email + password → bcrypt compare → cookie `formando_session` (JWT via `jose`, claims `{ sub, email, role: "formando" }`, secret dedicado `FORMANDO_SESSION_SECRET` ou reaproveita `SESSION_SECRET` com claim de role — decide-se por um secret dedicado para isolar completamente as duas sessões).
- **Esqueci-me da password**: mesmo mecanismo de token, `purpose=reset`.
- **Proteção de rota**: o mesmo `middleware.ts` cobre também `/portal/:path*` (exceto `/portal/login`, `/portal/registar`, `/portal/definir-password`, `/portal/recuperar-password`), redirecionando para `/portal/login`.

### 3. Portal do Formando (novas rotas em `cplpcwebsite`, dados reais)

Portado visualmente do protótipo `academy` (Tailwind + componentes já existentes em `cplpcwebsite`, adaptando o layout do `AppShell.tsx`), mas com dados reais via Prisma:

- `/portal` — painel: nº de cursos ativos, horas totais, nota média, certificados emitidos, próximas sessões — calculado a partir das `CourseEnrollment` do formando.
- `/portal/progresso` — progresso e notas por curso.
- `/portal/cursos` e `/portal/cursos/[id]` — catálogo de cursos publicados + estado da própria inscrição.
- `/portal/certificados` e `/portal/certificados/[code]` — lista dos certificados emitidos ao formando; a página de detalhe reaproveita a lógica já existente de QR (`certificateQrDataUrl`, `src/lib/certificate.ts`) usada na página pública `/certificado/[code]`.
- `/portal/perfil` — dados da conta, histórico de formação, opção de alterar password.
- `/portal/agenda` — sessões futuras das inscrições do formando.

`equipa.tsx` do protótipo não é portado (fora de âmbito, ver secção acima).

### 4. Email

Reaproveita `src/lib/mail.ts` (nodemailer/SMTP já configurado). Novos templates em `src/lib/email-templates/`:

- `formando-definir-password.ts` (registo/reset, com link + validade do token).
- `formando-certificado-emitido.ts` — disparado automaticamamente quando `issueCertificate`/`issueAllEligibleCertificates` corre, para notificar o formando por email assim que o certificado fica disponível (liga diretamente ao objetivo "comunicação por email" pedido).

### 5. Ligação ao site institucional

Adicionar um link "Área do Formando" → `/portal/login` na navegação principal (ao lado de "Academy") e na secção "Recursos" do rodapé, em `cplpcwebsite`. Não requer alterações de DNS/infra.

### 6. Testes

Dado que não existe nenhuma cobertura de testes no projeto hoje, o esforço concentra-se no que é novo ou crítico:

- **Vitest** (a adicionar como dev dependency): hashing/verificação de password, geração/expiração/consumo de tokens de autenticação de formando, scoping de dados (um formando só vê as suas próprias inscrições), unicidade do código de certificado sob chamadas concorrentes.
- **Playwright** (MCP já disponível nesta sessão), contra um servidor de dev local (nunca contra produção):
  1. Acesso não autenticado a `/admin` redireciona para `/admin/login`; login válido chega ao dashboard.
  2. Registo de formando com email correspondente a uma inscrição semeada → definir password → login → páginas do portal mostram dados reais.
  3. Página pública `/certificado/[code]` continua a funcionar após as alterações.
- Testes correm sempre contra uma base de dados de desenvolvimento/local ou dados semeados especificamente para teste — nunca escrevem dados de teste na base de produção.

### 7. Migração de dados e deploy

1. Nova migração Prisma (apenas aditiva: `FormandoAccount`, `FormandoAuthToken`, `FormandoAuthPurpose`, e a tabela/coluna de rate-limit do login admin) — SQL gerado revisto antes de aplicar. Aplicada com `prisma migrate deploy` contra a base de dados real (autorização já dada, com cautela: sem alterações destrutivas a tabelas existentes).
2. Trabalho feito num branch novo (`feat/portal-formando-seguranca-admin`), não diretamente em `main`.
3. `pnpm lint`, `npx tsc --noEmit`, `pnpm build` locais antes de qualquer commit final.
4. Commit e push do branch para `devsembo/cplpcwebsite`.
5. Deploy final ao VPS de produção é um passo manual (sem acesso SSH a partir deste ambiente): o utilizador executa (ou autoriza correr interativamente via `!comando`) o `git pull`/`pm2 deploy production` + `pm2 restart cplpconnect` no servidor, depois de o branch ser fundido em `main`.

## Auto-revisão do spec

- Sem placeholders/TBD.
- Consistência: os fluxos de auth de formando não tocam `CourseEnrollment`, evitando risco de migração em tabela com dados reais.
- Âmbito focado numa única entrega coerente (segurança + portal), com exclusões explícitas para não crescer sem controlo.
- Ambiguidades resolvidas: ligação de conta↔inscrição por email (não por FK), secret de sessão dedicado para formandos, SMTP mantido em vez de Resend.
