import { existsSync } from "node:fs";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

for (const file of [".env.local", ".env"]) {
    if (existsSync(file)) process.loadEnvFile(file);
}

const adapter = new PrismaPg({
    connectionString:
        process.env.POSTGRES_URL_NON_POOLING ??
        process.env.POSTGRES_URL ??
        process.env.DIRECT_URL ??
        process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

const PROJECTS = [
    {
        slug: "troka",
        title: "TROKA",
        description:
            "Plataforma fintech de remessas entre Portugal e Angola, com transferências rápidas, seguras e rastreáveis.",
        tags: ["React Native", "Node.js", "Fintech"],
        category: "Fintech",
        accentFrom: "#0554F5",
        accentTo: "#05C480",
        comingSoon: false,
        order: 0,
    },
    {
        slug: "crm-bemvistos",
        title: "CRM Bemvistos",
        description:
            "CRM à medida para uma sociedade de advogados, com gestão de processos, clientes e equipas num único sistema.",
        tags: ["Next.js", "CRM", "Legal Tech"],
        category: "Legal Tech",
        accentFrom: "#05C480",
        accentTo: "#0554F5",
        comingSoon: false,
        order: 1,
    },
    {
        slug: "novo-projeto-em-curso",
        title: "Novo projeto em curso",
        description: "Um novo projeto está em desenvolvimento — brevemente aqui.",
        tags: [] as string[],
        category: "Em breve",
        accentFrom: "#5A6478",
        accentTo: "#5A6478",
        comingSoon: true,
        order: 2,
    },
];


// Conteúdo institucional inicial — o mesmo que estava escrito à mão nas páginas
// antes de passar a ser editável no admin. O seed só cria o que ainda não
// existe, para nunca sobrepor alterações feitas pelo administrador.
const SERVICES = [
    {
        slug: "web",
        icon: "Layers",
        title: "Plataformas & Software à Medida",
        description:
            "Sistemas e plataformas digitais desenhados à volta dos processos reais da sua empresa ou instituição — do primeiro desenho à entrega em produção.",
        details: [
            "Sites institucionais e plataformas web",
            "Sistemas internos de gestão e workflow",
            "Integrações com sistemas já existentes na empresa",
        ],
        titleEn: "Custom Platforms & Software",
        descriptionEn:
            "Digital systems and platforms designed around the real processes of your company or institution — from first draft to production.",
        detailsEn: [
            "Institutional websites and web platforms",
            "Internal management and workflow systems",
            "Integrations with the company's existing systems",
        ],
        metaTitle: "Plataformas & Software à Medida",
        metaDescription:
            "Sistemas e plataformas digitais desenhados à volta dos processos reais da sua empresa ou instituição.",
        order: 0,
    },
    {
        slug: "mobile",
        icon: "Smartphone",
        title: "Apps Mobile",
        description:
            "Aplicações móveis que aproximam a sua empresa de clientes, colaboradores ou cidadãos, em qualquer país do espaço CPLP.",
        details: [
            "Aplicações nativas para iOS e Android",
            "Apps híbridas para equipas com orçamento mais ajustado",
            "Integração com os sistemas e APIs da empresa",
        ],
        titleEn: "Mobile Apps",
        descriptionEn:
            "Mobile applications that bring your company closer to customers, employees or citizens, anywhere in the CPLP region.",
        detailsEn: [
            "Native iOS and Android applications",
            "Hybrid apps for teams with tighter budgets",
            "Integration with the company's systems and APIs",
        ],
        metaTitle: "Apps Mobile",
        metaDescription:
            "Aplicações móveis que aproximam a sua empresa de clientes, colaboradores ou cidadãos, em qualquer país do espaço CPLP.",
        order: 1,
    },
    {
        slug: "banking",
        icon: "Landmark",
        title: "Core Banking & Soluções Financeiras",
        description:
            "Plataformas de core banking, pagamentos e mobile banking desenhadas para bancos e instituições financeiras que operam em Angola e no espaço CPLP.",
        details: [
            "Core banking e sistemas de gestão financeira",
            "Mobile banking, pagamentos e carteiras digitais",
            "Segurança, compliance e integração com a banca central",
        ],
        titleEn: "Core Banking & Financial Solutions",
        descriptionEn:
            "Core banking, payments and mobile banking platforms designed for banks and financial institutions operating in Angola and across the CPLP region.",
        detailsEn: [
            "Core banking and financial management systems",
            "Mobile banking, payments and digital wallets",
            "Security, compliance and central bank integration",
        ],
        metaTitle: "Core Banking & Soluções Financeiras",
        metaDescription:
            "Plataformas de core banking, pagamentos e mobile banking para bancos e instituições financeiras em Angola e no espaço CPLP.",
        order: 2,
    },
    {
        slug: "cloud",
        icon: "Cloud",
        title: "Cloud & Infraestrutura",
        description:
            "Infraestrutura segura e escalável, preparada para crescer com o negócio e para operar com confiança entre mercados.",
        details: [
            "Migração para ambientes cloud seguros",
            "Gestão de servidores e infraestrutura",
            "Planeamento de escalabilidade e continuidade do negócio",
        ],
        titleEn: "Cloud & Infrastructure",
        descriptionEn:
            "Secure, scalable infrastructure, ready to grow with the business and operate confidently across markets.",
        detailsEn: [
            "Migration to secure cloud environments",
            "Server and infrastructure management",
            "Scalability and business continuity planning",
        ],
        metaTitle: "Cloud & Infraestrutura",
        metaDescription: "Infraestrutura segura e escalável, preparada para crescer com o negócio.",
        order: 3,
    },
    {
        slug: "design",
        icon: "Compass",
        title: "Estratégia Digital & Design",
        description:
            "Estratégia de marca, produto e comunicação digital alinhadas com os objetivos de negócio — não apenas com tendências visuais.",
        details: [
            "Identidade visual e branding institucional",
            "Design de interfaces e experiência de utilizador",
            "Estratégia de comunicação digital",
        ],
        titleEn: "Digital Strategy & Design",
        descriptionEn:
            "Brand, product and digital communication strategy aligned with business goals — not just visual trends.",
        detailsEn: [
            "Visual identity and institutional branding",
            "Interface design and user experience",
            "Digital communication strategy",
        ],
        metaTitle: "Estratégia Digital & Design",
        metaDescription:
            "Estratégia de marca, produto e comunicação digital alinhadas com os objetivos de negócio.",
        order: 4,
    },
];

const FAQS = [
    {
        question: "Quanto tempo demora o desenvolvimento de um projeto?",
        answer:
            "O prazo varia com a complexidade do projeto. Após a análise inicial, fornecemos um cronograma detalhado com todas as etapas e prazos.",
    },
    {
        question: "A CPLP CONNECT oferece suporte após a implementação?",
        answer:
            "Sim, oferecemos pacotes de suporte e manutenção para garantir que as suas soluções continuam a funcionar corretamente após a implementação.",
    },
    {
        question: "Como funciona o processo de desenvolvimento?",
        answer:
            "Trabalhamos com metodologias ágeis, dividindo o projeto em sprints. Mantemos comunicação constante com o cliente, garantindo entregas graduais e ajustes conforme necessário.",
    },
    {
        question: "Que tecnologias utilizam?",
        answer:
            "Utilizamos tecnologias modernas e robustas, selecionadas especificamente para cada projeto com base nas necessidades e requisitos do cliente.",
    },
    {
        question: "Desenvolvem soluções personalizadas para cada cliente?",
        answer:
            "Sim, cada solução é desenvolvida de forma personalizada, tendo em conta os objetivos e necessidades específicas de cada cliente.",
    },
    {
        question: "É possível acompanhar o andamento do projeto?",
        answer:
            "Sim, fornecemos acesso a relatórios e reuniões periódicas para garantir total transparência e alinhamento durante o desenvolvimento.",
    },
    {
        question: "Oferecem serviços de design e identidade visual?",
        answer:
            "Sim, temos uma equipa que desenvolve logótipos, interfaces e identidade visual alinhada com a imagem da sua marca.",
    },
    {
        question: "Trabalham com clientes fora de Portugal?",
        answer:
            "Sim, trabalhamos com empresas e instituições de toda a CPLP, sobretudo Portugal e Angola. Toda a comunicação e entrega pode ser feita remotamente com a mesma eficiência.",
    },
].map((faq, index) => ({ ...faq, order: index }));

const PARTNERS = [
    "Banco Sol",
    "ANJE Portugal",
    "Mirex Angola",
    "TROKA",
    "Bemvistos",
    "Consulado de Moçambique no Porto",
].map((name, index) => ({ name, order: index }));

const PAGE_KEYS = [
    "home",
    "sobre",
    "servicos",
    "projetos",
    "academy",
    "carreiras",
    "contacto",
    "faqs",
] as const;

async function main() {
    for (const project of PROJECTS) {
        await prisma.project.upsert({
            where: { slug: project.slug },
            update: {},
            create: project,
        });
    }

    for (const pageKey of PAGE_KEYS) {
        await prisma.pageHero.upsert({
            where: { pageKey },
            update: {},
            create: { pageKey },
        });
    }

    for (const service of SERVICES) {
        await prisma.service.upsert({
            where: { slug: service.slug },
            update: {},
            create: service,
        });
    }

    // FAQs e parceiros não têm chave natural — só são criados se a tabela
    // estiver vazia, para o seed não duplicar conteúdo já editado no admin.
    if ((await prisma.faq.count()) === 0) {
        await prisma.faq.createMany({ data: FAQS });
    }

    if ((await prisma.partner.count()) === 0) {
        await prisma.partner.createMany({ data: PARTNERS });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminEmail && adminPassword) {
        const passwordHash = await bcrypt.hash(adminPassword, 12);
        await prisma.adminUser.upsert({
            where: { email: adminEmail },
            update: {},
            create: { email: adminEmail, passwordHash, name: "Admin" },
        });
        console.log(`Utilizador admin pronto: ${adminEmail}`);
    } else {
        console.warn(
            "ADMIN_EMAIL/ADMIN_PASSWORD não definidos — nenhum utilizador admin foi criado."
        );
    }

    console.log("Seed concluído.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
