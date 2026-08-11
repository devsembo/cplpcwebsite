'use client';
import { useState, useEffect } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => setLanguage(language === 'pt' ? 'en' : 'pt');

    const navLinks = [
        { href: '/', label: t('nav.home') },
        { href: '/sobre', label: t('nav.about') },
        { href: '/servicos', label: t('nav.services') },
        { href: '/projetos', label: t('nav.projects') },
        { href: '/academy', label: 'Academy' },
        { href: '/blog', label: t('nav.blog') },
        { href: '/carreiras', label: t('nav.careers') },
        { href: '/contacto', label: t('nav.contact') },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 bg-white transition-shadow duration-200 ${
                isScrolled ? 'shadow-card border-b border-cplp-line' : 'border-b border-transparent'
            }`}
        >
            <div className="container max-w-7xl mx-auto flex h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center shrink-0" aria-label="CPLP CONNECT">
                    <Image
                        src="/brand/png/cplpconnect-lockup-h.png"
                        alt="CPLP CONNECT"
                        width={150}
                        height={52}
                        className="h-9 w-auto"
                        priority
                    />
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-cplp-ink hover:text-cplp-blue transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
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
                            className="md:hidden p-2 text-cplp-ink hover:bg-cplp-bg"
                            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-[320px] sm:w-[360px] bg-white text-cplp-ink border-l border-cplp-line">
                        <SheetHeader>
                            <SheetTitle className="text-lg font-bold text-cplp-navy">Menu</SheetTitle>
                        </SheetHeader>

                        <nav className="flex flex-col space-y-1 py-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-base font-medium py-3 px-4 rounded-md text-cplp-ink hover:bg-cplp-bg transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
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

                        <div className="mt-6 px-4">
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
