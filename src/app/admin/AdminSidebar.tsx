"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, Image as ImageIcon, Newspaper, Mail, LogOut } from "lucide-react";
import { logoutAction } from "./actions/logout";

const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projetos", label: "Projetos", icon: Briefcase },
    { href: "/admin/heros", label: "Heros de Página", icon: ImageIcon },
    { href: "/admin/blog", label: "Blog", icon: Newspaper },
    { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
];

export default function AdminSidebar({ email }: { email: string }) {
    const pathname = usePathname();

    return (
        <aside className="w-64 shrink-0 bg-cplp-navy text-white flex flex-col min-h-screen">
            <div className="p-6 border-b border-white/10">
                <Image
                    src="/brand/png/cplpconnect-lockup-h.png"
                    alt="CPLP CONNECT"
                    width={150}
                    height={52}
                    className="h-7 w-auto brightness-0 invert"
                />
                <p className="text-xs text-white/40 mt-2">Administração</p>
            </div>

            <nav className="flex-1 py-4 px-3 space-y-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    const active = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                                active
                                    ? "bg-white/10 text-white"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-3 border-t border-white/10">
                <p className="text-xs text-white/40 px-3 mb-2 truncate">{email}</p>
                <form action={logoutAction}>
                    <button
                        type="submit"
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        Sair
                    </button>
                </form>
            </div>
        </aside>
    );
}
