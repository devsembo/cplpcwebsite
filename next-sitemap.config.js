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
    // /blog/[slug] é uma rota dinâmica (server-rendered on demand) — o
    // next-sitemap só descobre rotas estáticas a partir do output do build,
    // por isso os posts publicados têm de ser adicionados aqui manualmente.
    additionalPaths: async () => {
        if (!process.env.POSTGRES_URL) return [];

        try {
            const { PrismaClient } = await import("@prisma/client");
            const { PrismaPg } = await import("@prisma/adapter-pg");
            const adapter = new PrismaPg({ connectionString: process.env.POSTGRES_URL });
            const prisma = new PrismaClient({ adapter });

            const posts = await prisma.blogPost.findMany({
                where: { published: true },
                select: { slug: true, updatedAt: true },
            });
            await prisma.$disconnect();

            return posts.map((post) => ({
                loc: `/blog/${post.slug}`,
                lastmod: post.updatedAt.toISOString(),
                changefreq: "monthly",
                priority: 0.6,
            }));
        } catch (error) {
            console.warn("[next-sitemap] Não foi possível carregar os posts do blog:", error.message);
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
