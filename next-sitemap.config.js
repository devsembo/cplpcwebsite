/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://cplpconnect.pt',
    generateRobotsTxt: true, // Gera também o robots.txt
    sitemapSize: 5000,
    exclude: ['/admin', '/admin/*', '/newsletter/unsubscribe'],
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/', disallow: ['/admin', '/admin/*'] },
        ],
    },
};

export default config;
