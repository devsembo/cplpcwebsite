"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    Image as ImageIcon,
    Newspaper,
    Mail,
    LogOut,
    GraduationCap,
    ClipboardList,
    Users,
    Users2,
    UserPlus,
    Layers,
    HelpCircle,
    Handshake,
    Quote,
    ExternalLink,
    LayoutList,
    Building2,
    Award,
    Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "./actions/logout";

type NavLink = {
    href: string;
    label: string;
    icon: typeof LayoutDashboard;
    // Contador de itens por tratar (inscrições/candidaturas novas).
    badge?: number;
};

type NavGroup = { title: string | null; links: NavLink[] };

export interface AdminSidebarCounts {
    newEnrollments: number;
    newApplications: number;
    certificatesToIssue: number;
}

export default function AdminSidebar({
    email,
    counts,
}: {
    email: string;
    counts: AdminSidebarCounts;
}) {
    const pathname = usePathname();

    const groups: NavGroup[] = [
        {
            title: null,
            links: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
        },
        {
            title: "Academy",
            links: [
                { href: "/admin/cursos", label: "Cursos", icon: GraduationCap },
                {
                    href: "/admin/inscricoes",
                    label: "Inscrições",
                    icon: ClipboardList,
                    badge: counts.newEnrollments,
                },
                { href: "/admin/turmas", label: "Turmas", icon: LayoutList },
                { href: "/admin/formandos", label: "Formandos", icon: Users2 },
                { href: "/admin/empresas", label: "Empresas clientes", icon: Building2 },
                {
                    href: "/admin/certificados",
                    label: "Certificação",
                    icon: Award,
                    badge: counts.certificatesToIssue,
                },
            ],
        },
        {
            title: "Carreiras",
            links: [
                { href: "/admin/vagas", label: "Vagas", icon: Users },
                {
                    href: "/admin/candidaturas",
                    label: "Candidaturas",
                    icon: UserPlus,
                    badge: counts.newApplications,
                },
            ],
        },
        {
            title: "Conteúdo do site",
            links: [
                { href: "/admin/blog", label: "Blog", icon: Newspaper },
                { href: "/admin/projetos", label: "Projetos", icon: Briefcase },
                { href: "/admin/servicos", label: "Serviços", icon: Layers },
                { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
                { href: "/admin/parceiros", label: "Parceiros", icon: Handshake },
                { href: "/admin/depoimentos", label: "Depoimentos", icon: Quote },
                { href: "/admin/heros", label: "Heros de Página", icon: ImageIcon },
            ],
        },
        {
            title: "Comunicação",
            links: [
                { href: "/admin/comunicacoes", label: "Comunicações Academy", icon: Send },
                { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
            ],
        },
    ];

    return (
        <aside className="w-64 shrink-0 bg-cplp-navy text-white flex flex-col sticky top-0 h-screen">
            <div className="p-6 border-b border-white/10 shrink-0">
                <Image
                    src="/brand/png/cplpconnect-lockup-h.png"
                    alt="CPLP CONNECT"
                    width={150}
                    height={52}
                    className="h-7 w-auto brightness-0 invert"
                />
                <p className="text-xs text-white/40 mt-2">Administração</p>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4">
                {groups.map((group, index) => (
                    <div key={group.title ?? `group-${index}`} className="space-y-1">
                        {group.title && (
                            <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-white/30">
                                {group.title}
                            </p>
                        )}
                        {group.links.map((link) => {
                            const Icon = link.icon;
                            const active =
                                link.href === "/admin"
                                    ? pathname === "/admin"
                                    : pathname.startsWith(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                        active
                                            ? "bg-white/10 text-white"
                                            : "text-white/60 hover:text-white hover:bg-white/5",
                                    )}
                                >
                                    <Icon className="w-4 h-4 shrink-0" />
                                    <span className="flex-1">{link.label}</span>
                                    {link.badge ? (
                                        <span className="min-w-5 h-5 px-1.5 rounded-full bg-cplp-blue text-white text-[11px] font-bold flex items-center justify-center">
                                            {link.badge}
                                        </span>
                                    ) : null}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>

            <div className="p-3 border-t border-white/10 shrink-0">
                <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                >
                    <ExternalLink className="w-4 h-4" />
                    Ver site
                </a>
                <p className="text-xs text-white/40 px-3 mt-2 mb-2 truncate">{email}</p>
                <form action={logoutAction}>
                    <button
                        type="submit"
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        Sair
                    </button>
                </form>
            </div>
        </aside>
    );
}
