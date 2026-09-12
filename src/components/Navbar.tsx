'use client';
import { useState, useEffect, useRef } from 'react';
import {
    Menu,
    X,
    Languages,
    ChevronDown,
    ArrowRight,
    Building2,
    Briefcase,
    Users,
    Newspaper,
    HelpCircle,
    type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { SERVICE_AREAS } from '@/lib/service-areas';

type NavItem = { href: string; label: string; description?: string; icon?: LucideIcon };
type NavLink = { type: 'link'; href: string; label: string };
type NavDropdown = {
    type: 'dropdown';
    label: string;
    blurb: string;
    width: number;
    items: NavItem[];
    footerLink?: NavItem;
};
type NavEntry = NavLink | NavDropdown;

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const { language, setLanguage, t } = useLanguage();
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
                setOpenDropdown(null);
            }
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpenDropdown(null);
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const toggleLanguage = () => setLanguage(language === 'pt' ? 'en' : 'pt');

    const navEntries: NavEntry[] = [
        { type: 'link', href: '/', label: t('nav.home') },
        {
            type: 'dropdown',
            label: t('nav.services'),
            blurb: t('nav.services.blurb'),
            width: 600,
            items: SERVICE_AREAS.map((area) => ({
                href: `/servicos/${area.slug}`,
                label: t(area.titleKey),
                description: t(area.descriptionKey),
                icon: area.icon,
            })),
            footerLink: { href: '/servicos', label: t('nav.viewAllServices') },
        },
        { type: 'link', href: '/academy', label: 'Academy' },
        {
            type: 'dropdown',
            label: t('nav.company'),
            blurb: t('nav.company.blurb'),
            width: 460,
            items: [
                { href: '/sobre', label: t('nav.about'), description: t('nav.about.description'), icon: Building2 },
                { href: '/projetos', label: t('nav.projects'), description: t('nav.projects.description'), icon: Briefcase },
                { href: '/carreiras', label: t('nav.careers'), description: t('nav.careers.description'), icon: Users },
            ],
        },
        {
            type: 'dropdown',
            label: t('nav.resources'),
            blurb: t('nav.resources.blurb'),
            width: 460,
            items: [
                { href: '/blog', label: t('nav.blog'), description: t('nav.blog.description'), icon: Newspaper },
                { href: '/faqs', label: t('nav.faqs'), description: t('nav.faqs.description'), icon: HelpCircle },
            ],
        },
        { type: 'link', href: '/contacto', label: t('nav.contact') },
    ];

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 w-full z-50 transition-colors duration-200 ${isScrolled ? 'bg-white shadow-card border-b border-cplp-line' : 'bg-transparent border-b border-transparent'
                }`}
        >
            <div className="container max-w-7xl mx-auto flex h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center shrink-0" aria-label="CPLP CONNECT">
                    {isScrolled ? (
                        <Image
                            src="/brand/svg/academy-mark-color.svg"
                            alt="CPLP CONNECT"
                            width={40}
                            height={40}
                            className="h-9 w-9"
                            priority
                        />
                    ) : (
                        <Image
                            src="/brand/png/cplpconnect-lockup-h.png"
                            alt="CPLP CONNECT"
                            width={150}
                            height={52}
                            className="h-9 w-auto"
                            priority
                        />
                    )}
                </Link>

                <nav className="hidden lg:flex items-center gap-0.5">
                    {navEntries.map((entry) =>
                        entry.type === 'link' ? (
                            <Link
                                key={entry.href}
                                href={entry.href}
                                className={`px-3 py-2 rounded-md text-md font-bold ${isScrolled ? 'text-cplp-navy' : 'text-white'} hover:text-cplp-blue transition-colors`}
                            >
                                {entry.label}
                            </Link>
                        ) : (
                            <div
                                key={entry.label}
                                className="relative"
                                onMouseEnter={() => setOpenDropdown(entry.label)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <button
                                    type="button"
                                    aria-haspopup="true"
                                    aria-expanded={openDropdown === entry.label}
                                    onClick={() => setOpenDropdown(openDropdown === entry.label ? null : entry.label)}
                                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-md font-bold cursor-pointer ${isScrolled ? 'text-cplp-navy' : 'text-white'} hover:text-cplp-blue transition-colors`}
                                >
                                    {entry.label}
                                    <ChevronDown
                                        className={`h-3.5 w-3.5 transition-transform duration-200 ${openDropdown === entry.label ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {openDropdown === entry.label && (
                                    <div
                                        role="menu"
                                        className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50"
                                        style={{ width: entry.width, maxWidth: 'calc(100vw - 2rem)' }}
                                    >
                                        <div className="rounded-xl border border-cplp-line bg-white shadow-card-hover overflow-hidden flex">
                                            {/* Painel de marca — descrição da categoria */}
                                            <div className="w-[38%] shrink-0 p-6 flex flex-col justify-between bg-cplp-navy">
                                                <div>
                                                    <h3 className="text-base font-bold text-white mb-2">{entry.label}</h3>
                                                    <p className="text-sm text-white/65 leading-relaxed">{entry.blurb}</p>
                                                </div>
                                                {entry.footerLink && (
                                                    <Link
                                                        href={entry.footerLink.href}
                                                        role="menuitem"
                                                        onClick={() => setOpenDropdown(null)}
                                                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-cplp-green hover:text-white transition-colors mt-6"
                                                    >
                                                        {entry.footerLink.label}
                                                        <ArrowRight className="w-3.5 h-3.5" />
                                                    </Link>
                                                )}
                                            </div>

                                            {/* Itens do menu */}
                                            <div className="flex-1 p-2.5">
                                                {entry.items.map((item) => {
                                                    const Icon = item.icon;
                                                    return (
                                                        <Link
                                                            key={item.href}
                                                            href={item.href}
                                                            role="menuitem"
                                                            onClick={() => setOpenDropdown(null)}
                                                            className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-cplp-bg transition-colors"
                                                        >
                                                            {Icon && (
                                                                <div className="w-9 h-9 rounded-full border border-cplp-blue/25 flex items-center justify-center shrink-0">
                                                                    <Icon className="w-4 h-4 text-cplp-blue" strokeWidth={1.5} />
                                                                </div>
                                                            )}
                                                            <div className="min-w-0">
                                                                <p className="text-sm font-semibold text-cplp-navy">{item.label}</p>
                                                                {item.description && (
                                                                    <p className="text-xs text-cplp-grey mt-0.5 leading-snug">
                                                                        {item.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ),
                    )}
                </nav>

                <div className="hidden lg:flex items-center gap-3">
                    <Button
                        onClick={toggleLanguage}
                        variant="outline"
                        size="sm"
                        className="gap-1.5 border-cplp-line text-cplp-ink hover:bg-cplp-bg cursor-pointer rounded-md"
                        aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
                    >
                        <Languages className="h-4 w-4" />
                        {language === 'pt' ? 'EN' : 'PT'}
                    </Button>
                    <Button
                        asChild
                        size="sm"
                        className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md"
                    >
                        <Link href="/contacto">{t('nav.quote')}</Link>
                    </Button>
                </div>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className={`lg:hidden p-2 ${isScrolled ? 'text-cplp-ink hover:bg-cplp-bg hover:text-cplp-ink' : 'text-white hover:bg-white/10 hover:text-white'}`}
                            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-[320px] sm:w-[360px] bg-white text-cplp-ink border-l border-cplp-line overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle className="text-lg font-bold text-cplp-navy">Menu</SheetTitle>
                        </SheetHeader>

                        <nav className="flex flex-col py-4">
                            {navEntries.map((entry) =>
                                entry.type === 'link' ? (
                                    <Link
                                        key={entry.href}
                                        href={entry.href}
                                        className="text-base font-medium py-3 px-4 rounded-md text-cplp-ink hover:bg-cplp-bg transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {entry.label}
                                    </Link>
                                ) : (
                                    <Accordion key={entry.label} type="single" collapsible>
                                        <AccordionItem value={entry.label} className="border-b-0">
                                            <AccordionTrigger className="text-base font-medium py-3 px-4 rounded-md text-cplp-ink hover:bg-cplp-bg hover:no-underline">
                                                {entry.label}
                                            </AccordionTrigger>
                                            <AccordionContent className="pl-4 pb-1">
                                                <div className="flex flex-col">
                                                    {entry.items.map((item) => (
                                                        <Link
                                                            key={item.href}
                                                            href={item.href}
                                                            className="text-sm py-2.5 px-4 rounded-md text-cplp-grey hover:bg-cplp-bg hover:text-cplp-navy transition-colors"
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {item.label}
                                                            {item.description && (
                                                                <span className="block text-xs text-cplp-grey/80 font-normal mt-0.5">
                                                                    {item.description}
                                                                </span>
                                                            )}
                                                        </Link>
                                                    ))}
                                                    {entry.footerLink && (
                                                        <Link
                                                            href={entry.footerLink.href}
                                                            className="text-sm font-semibold py-2.5 px-4 rounded-md text-cplp-blue hover:bg-cplp-bg transition-colors"
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {entry.footerLink.label}
                                                        </Link>
                                                    )}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ),
                            )}
                        </nav>

                        <Button
                            onClick={toggleLanguage}
                            variant="outline"
                            size="sm"
                            className="gap-1.5 border-cplp-line text-cplp-ink hover:bg-cplp-bg cursor-pointer w-fit mx-4 rounded-md"
                            aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
                        >
                            <Languages className="h-4 w-4" />
                            {language === 'pt' ? 'EN' : 'PT'}
                        </Button>

                        <div className="mt-6 px-4 pb-6">
                            <Button
                                asChild
                                size="lg"
                                className="w-full bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md"
                                onClick={() => setIsOpen(false)}
                            >
                                <Link href="/contacto">{t('nav.quote')}</Link>
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
