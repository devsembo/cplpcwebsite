import { existsSync } from "node:fs";

for (const file of [".env.local", ".env"]) {
    if (existsSync(file)) process.loadEnvFile(file);
}

/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: "https://cplpconnect.pt",
    generateRobotsTxt: true, // Gera também o robots.txt
    sitemapSize: 5000,
    exclude: ["/admin", "/admin/*", "/newsletter/unsubscribe"],
    robotsTxtOptions: {
        policies: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/admin/*"] }],
    },
    // As páginas de detalhe (blog, cursos, vagas, serviços) são rotas dinâmicas
    // renderizadas a pedido — o next-sitemap só descobre rotas estáticas a partir
    // do output do build, por isso são adicionadas aqui a partir da base de dados.
    additionalPaths: async () => {
        const connectionString =
            process.env.POSTGRES_URL_NON_POOLING ??
            process.env.POSTGRES_URL ??
            process.env.DATABASE_URL;
        if (!connectionString) return [];

        try {
            const { PrismaClient } = await import("@prisma/client");
            const { PrismaPg } = await import("@prisma/adapter-pg");
            const adapter = new PrismaPg({ connectionString });
            const prisma = new PrismaClient({ adapter });

            const now = new Date();
            const [posts, courses, jobs, services] = await Promise.all([
                prisma.blogPost.findMany({
                    where: { published: true },
                    select: { slug: true, updatedAt: true },
                }),
                prisma.course.findMany({
                    where: { published: true },
                    select: { slug: true, updatedAt: true },
                }),
                prisma.jobOpening.findMany({
                    where: {
                        published: true,
                        OR: [{ applyDeadline: null }, { applyDeadline: { gte: now } }],
                    },
                    select: { slug: true, updatedAt: true },
                }),
                prisma.service.findMany({
                    where: { published: true },
                    select: { slug: true, updatedAt: true },
                }),
            ]);
            await prisma.$disconnect();

            const toPath = (prefix, priority) => (item) => ({
                loc: `${prefix}/${item.slug}`,
                lastmod: item.updatedAt.toISOString(),
                changefreq: "monthly",
                priority,
            });

            return [
                ...posts.map(toPath("/blog", 0.6)),
                ...courses.map(toPath("/academy", 0.8)),
                ...jobs.map(toPath("/carreiras", 0.7)),
                ...services.map(toPath("/servicos", 0.9)),
            ];
        } catch (error) {
            console.warn("[next-sitemap] Não foi possível carregar conteúdo da base de dados:", error.message);
            return [];
        }
    },
    transform: async (transformConfig, path) => {
        let priority = 0.7;
        if (path === "/") priority = 1.0;
        else if (["/servicos", "/academy", "/contacto"].includes(path)) priority = 0.9;

        return {
            loc: path,
            changefreq: path === "/blog" ? "weekly" : "monthly",
            priority,
            lastmod: new Date().toISOString(),
        };
    },
};

export default config;
