This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Administração de conteúdo

Todo o conteúdo do site é editável em `/admin` (autenticação por sessão — ver
`ADMIN_EMAIL` / `ADMIN_PASSWORD` no `.env`):

| Secção | O que gere | Onde aparece no site |
| --- | --- | --- |
| **Cursos** | Cursos da Academy (ficha, programa, preço, vagas, imagem) | `/academy` e `/academy/[slug]` |
| **Inscrições** | Pedidos de inscrição, com estado, notas e exportação CSV | — |
| **Vagas** | Vagas abertas (requisitos, benefícios, prazo) | `/carreiras` e `/carreiras/[slug]` |
| **Candidaturas** | Candidaturas às vagas e espontâneas, com estado e CSV | — |
| **Blog** | Artigos e envio de newsletter | `/blog` |
| **Projetos** | Portefólio | `/` e `/projetos` |
| **Serviços** | Áreas de serviço (com tradução EN e SEO próprios) | `/`, menu de navegação e `/servicos` |
| **FAQs** | Perguntas frequentes (com tradução EN) | `/faqs` |
| **Parceiros** | Logótipos de parceiros | `/` |
| **Depoimentos** | Testemunhos de clientes (com tradução EN) | `/` |
| **Heros de Página** | Imagem de fundo do topo de cada página | todas |
| **Newsletter** | Lista de subscritores | — |

Conteúdo em duas línguas: serviços, FAQs e depoimentos têm campos opcionais em
inglês. Quando ficam vazios, a versão inglesa do site mostra o texto português.
Cursos e vagas são apenas em português, como o blog.

### Base de dados

```bash
pnpm db:deploy   # aplica as migrações (produção)
pnpm db:migrate  # cria uma migração nova (desenvolvimento)
pnpm db:seed     # cria o utilizador admin e importa serviços, FAQs e parceiros
                 # iniciais (não sobrepõe conteúdo já editado no admin)
```
