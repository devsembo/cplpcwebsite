import Link from "next/link";
import {
    Briefcase,
    Image as ImageIcon,
    Newspaper,
    Mail,
    GraduationCap,
    Users,
    Users2,
    Building2,
    Award,
    Layers,
    HelpCircle,
    Handshake,
    Quote,
    Plus,
    ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

const QUICK_ACTIONS = [
    { href: "/admin/cursos/nova", label: "Novo curso" },
    { href: "/admin/vagas/nova", label: "Nova vaga" },
    { href: "/admin/blog/nova", label: "Novo post" },
];

export default async function AdminDashboard() {
    const [
        coursesPublished,
        coursesTotal,
        jobsOpen,
        jobsTotal,
        newEnrollments,
        newApplications,
        blogPostsCount,
        projectsCount,
        subscribersCount,
        servicesCount,
        faqsCount,
        partnersCount,
        testimonialsCount,
        heroesWithImageCount,
        latestEnrollments,
        latestApplications,
        formandosAtivos,
        turmasCount,
        empresasCount,
        certificatesToIssue,
    ] = await Promise.all([
        prisma.course.count({ where: { published: true } }),
        prisma.course.count(),
        prisma.jobOpening.count({
            where: {
                published: true,
                OR: [{ applyDeadline: null }, { applyDeadline: { gte: new Date() } }],
            },
        }),
        prisma.jobOpening.count(),
        prisma.courseEnrollment.count({ where: { status: "nova" } }),
        prisma.jobApplication.count({ where: { status: "nova" } }),
        prisma.blogPost.count(),
        prisma.project.count(),
        prisma.newsletterSubscriber.count({ where: { active: true } }),
        prisma.service.count({ where: { published: true } }),
        prisma.faq.count({ where: { published: true } }),
        prisma.partner.count({ where: { published: true } }),
        prisma.testimonial.count({ where: { published: true } }),
        prisma.pageHero.count({ where: { imageUrl: { not: null } } }),
        prisma.courseEnrollment.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { course: { select: { title: true } } },
        }),
        prisma.jobApplication.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { job: { select: { title: true } } },
        }),
        prisma.courseEnrollment.count({ where: { status: "confirmada" } }),
        prisma.courseSession.count(),
        prisma.company.count(),
        prisma.courseEnrollment.count({ where: { certificateStatus: "elegivel" } }),
    ]);

    const pending = [
        newEnrollments > 0 && {
            href: "/admin/inscricoes",
            label: `${newEnrollments} inscrição${newEnrollments === 1 ? "" : "ões"} por tratar`,
        },
        newApplications > 0 && {
            href: "/admin/candidaturas",
            label: `${newApplications} candidatura${newApplications === 1 ? "" : "s"} por rever`,
        },
        certificatesToIssue > 0 && {
            href: "/admin/certificados",
            label: `${certificatesToIssue} certificado${certificatesToIssue === 1 ? "" : "s"} por emitir`,
        },
    ].filter(Boolean) as { href: string; label: string }[];

    const cards = [
        {
            href: "/admin/cursos",
            label: "Cursos publicados",
            value: `${coursesPublished}/${coursesTotal}`,
            icon: GraduationCap,
        },
        { href: "/admin/formandos", label: "Formandos ativos", value: formandosAtivos, icon: Users2 },
        { href: "/admin/turmas", label: "Turmas", value: turmasCount, icon: Layers },
        { href: "/admin/empresas", label: "Empresas clientes", value: empresasCount, icon: Building2 },
        { href: "/admin/certificados", label: "Certificados a emitir", value: certificatesToIssue, icon: Award },
        { href: "/admin/vagas", label: "Vagas abertas", value: `${jobsOpen}/${jobsTotal}`, icon: Users },
        { href: "/admin/blog", label: "Posts de Blog", value: blogPostsCount, icon: Newspaper },
        { href: "/admin/projetos", label: "Projetos", value: projectsCount, icon: Briefcase },
        { href: "/admin/servicos", label: "Serviços", value: servicesCount, icon: Layers },
        { href: "/admin/faqs", label: "FAQs", value: faqsCount, icon: HelpCircle },
        { href: "/admin/parceiros", label: "Parceiros", value: partnersCount, icon: Handshake },
        { href: "/admin/depoimentos", label: "Depoimentos", value: testimonialsCount, icon: Quote },
        { href: "/admin/newsletter", label: "Subscritores ativos", value: subscribersCount, icon: Mail },
        {
            href: "/admin/heros",
            label: "Heros com imagem",
            value: `${heroesWithImageCount}/8`,
            icon: ImageIcon,
        },
    ];

    return (
        <div>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                <h1 className="text-2xl font-bold text-cplp-navy">Dashboard</h1>
                <div className="flex flex-wrap gap-2">
                    {QUICK_ACTIONS.map((action) => (
                        <Button
                            key={action.href}
                            asChild
                            variant="outline"
                            className="rounded-md gap-2 bg-white"
                        >
                            <Link href={action.href}>
                                <Plus className="w-4 h-4" />
                                {action.label}
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>

            {pending.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {pending.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Card className="border border-cplp-blue/30 bg-cplp-blue/[0.04] shadow-none rounded-lg hover:shadow-card transition-shadow">
                                <CardContent className="p-5 flex items-center justify-between gap-4">
                                    <p className="text-sm font-semibold text-cplp-navy">{item.label}</p>
                                    <ArrowRight className="w-4 h-4 text-cplp-blue shrink-0" />
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <Link key={card.href} href={card.href}>
                            <Card className="h-full border border-cplp-line bg-white shadow-none hover:shadow-card transition-shadow rounded-lg">
                                <CardContent className="p-5">
                                    <div className="w-9 h-9 rounded-md bg-cplp-blue/[0.08] flex items-center justify-center mb-3">
                                        <Icon className="w-4 h-4 text-cplp-blue" />
                                    </div>
                                    <p className="text-2xl font-bold text-cplp-navy">{card.value}</p>
                                    <p className="text-xs text-cplp-grey">{card.label}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-bold text-cplp-navy">Últimas inscrições</h2>
                            <Link
                                href="/admin/inscricoes"
                                className="text-xs font-semibold text-cplp-blue hover:text-cplp-blue-hover"
                            >
                                Ver todas
                            </Link>
                        </div>
                        {latestEnrollments.length === 0 ? (
                            <p className="text-sm text-cplp-grey py-4">Ainda não há inscrições.</p>
                        ) : (
                            <ul className="divide-y divide-cplp-line">
                                {latestEnrollments.map((item) => (
                                    <li key={item.id} className="py-3 flex justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-cplp-navy truncate">{item.name}</p>
                                            <p className="text-xs text-cplp-grey truncate">
                                                {item.course?.title ?? "Curso eliminado"}
                                            </p>
                                        </div>
                                        <span className="text-xs text-cplp-grey whitespace-nowrap">
                                            {item.createdAt.toLocaleDateString("pt-PT")}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>

                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-bold text-cplp-navy">Últimas candidaturas</h2>
                            <Link
                                href="/admin/candidaturas"
                                className="text-xs font-semibold text-cplp-blue hover:text-cplp-blue-hover"
                            >
                                Ver todas
                            </Link>
                        </div>
                        {latestApplications.length === 0 ? (
                            <p className="text-sm text-cplp-grey py-4">Ainda não há candidaturas.</p>
                        ) : (
                            <ul className="divide-y divide-cplp-line">
                                {latestApplications.map((item) => (
                                    <li key={item.id} className="py-3 flex justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-cplp-navy truncate">{item.name}</p>
                                            <p className="text-xs text-cplp-grey truncate">
                                                {item.job?.title ?? "Candidatura espontânea"}
                                            </p>
                                        </div>
                                        <span className="text-xs text-cplp-grey whitespace-nowrap">
                                            {item.createdAt.toLocaleDateString("pt-PT")}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
