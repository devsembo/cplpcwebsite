import Link from "next/link";
import { Briefcase, Image as ImageIcon, Newspaper, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
    const [projectsCount, blogPostsCount, subscribersCount, heroesWithImageCount] =
        await Promise.all([
            prisma.project.count(),
            prisma.blogPost.count(),
            prisma.newsletterSubscriber.count({ where: { active: true } }),
            prisma.pageHero.count({ where: { imageUrl: { not: null } } }),
        ]);

    const cards = [
        { href: "/admin/projetos", label: "Projetos", value: projectsCount, icon: Briefcase },
        { href: "/admin/heros", label: "Heros com imagem", value: `${heroesWithImageCount}/8`, icon: ImageIcon },
        { href: "/admin/blog", label: "Posts de Blog", value: blogPostsCount, icon: Newspaper },
        { href: "/admin/newsletter", label: "Subscritores ativos", value: subscribersCount, icon: Mail },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-cplp-navy mb-8">Dashboard</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <Link key={card.href} href={card.href}>
                            <Card className="border border-cplp-line bg-white shadow-none hover:shadow-card transition-shadow rounded-lg">
                                <CardContent className="p-6">
                                    <div className="w-10 h-10 rounded-md bg-cplp-blue/[0.08] flex items-center justify-center mb-4">
                                        <Icon className="w-5 h-5 text-cplp-blue" />
                                    </div>
                                    <p className="text-2xl font-bold text-cplp-navy">{card.value}</p>
                                    <p className="text-sm text-cplp-grey">{card.label}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
