import { existsSync } from "node:fs";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

for (const file of [".env.local", ".env"]) {
    if (existsSync(file)) process.loadEnvFile(file);
}

const adapter = new PrismaPg({ connectionString: process.env.POSTGRES_URL });
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
