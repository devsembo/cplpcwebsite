'use client';
import { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
} from '@/components/ui/dialog';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <header className='fixed top-0 w-full z-50 transition-all duration-300 bg-background/95 backdrop-blur-md shadow-lg'>
            <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        {isScrolled ?
                            <Image
                                src="/CPLP LOGO (3).png"
                                alt="CPLP Connect Logo"
                                width={150}
                                height={100}
                                className=" object-cover"
                            />

                            :
                            <Image
                                src="/cplp2.png"
                                alt="CPLP Connect Logo"
                                width={150}
                                height={100}
                                className=" object-cover"
                            />

                        }
                    </Link>
                </div>

                <nav className={`hidden md:flex items-center gap-6 ${isScrolled ? 'text-blue-600' : 'text-white'}`}>
                    <Link href="/" className="text-white  font-medium hover:text-green-400 transition-colors">
                        Início
                    </Link>
                    <Link href="/sobre" className="text-white font-medium hover:text-green-400 transition-colors">
                        Sobre Nós
                    </Link>
                    <Link href="/servicos" className="text-white font-medium hover:text-green-400 transition-colors">
                        Serviços
                    </Link>
                    <Link href="/projetos" className="text-white font-medium hover:text-green-400 transition-colors">
                        Projetos
                    </Link>
                    <Link href="/contacto" className="text-white font-medium hover:text-green-400 transition-colors">
                        Contacto
                    </Link>
                </nav>

                        <div></div>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        {/* Ícone de menu ajustado para usar cor do tema */}
                        <Button className="md:hidden p-2 text-foreground hover:text-primary transition-colors" aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}>
                            {/* Corrigindo a cor do ícone no topo para sempre usar foreground/primary, já que o fundo é escuro */}
                            {isOpen ? <X className="h-6 w-6 mr-5 text-foreground" color='#FFF' /> : <Menu className="h-6 w-6 text-foreground"  color='#FFF' />}
                        </Button>
                    </SheetTrigger>

                    {/* AQUI ESTÁ A MUDANÇA: Usando bg-sidebar-background (cor clara) para contraste */}
                    <SheetContent side="right" className="w-[340px] sm:w-[350px] bg-gray-950 text-white border-none">
                        <SheetHeader>
                            {/* Usando sidebar-primary para o título para dar um toque de cor */}
                            <SheetTitle className="text-xl font-bold text-sidebar-primary"></SheetTitle>
                        </SheetHeader>

                        <nav className="flex flex-col space-y-2 py-6">
                            {['Início', 'Sobre Nós', 'Serviços', 'Projetos', 'Contacto'].map((label, index) => (
                                <Link
                                    key={index}
                                    href={label === 'Início' ? '/' : `/${label.toLowerCase().replace(' ', '')}`}
                                    // Usando cores da sidebar (clara)
                                    className="text-lg font-medium py-3 px-4 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>

                        {/* Botão de Orçamento no Mobile */}
                        <div className="mt-6">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        size="lg"
                                        variant={'outline'}
                                        className="w-full bg-accent hover:bg-accent/90 text-primary-foreground shadow-glow/30"
                                        onClick={() => setIsOpen(false)}
                                        asChild
                                    >
                                        <Link href="/contacto" className="flex items-center justify-center gap-2">
                                        <Rocket className="mr-2 w-5 h-5" />
                                        Solicitar Orçamento
                                        </Link>
                                    </Button>
                                </DialogTrigger>
                                {/* O Diálogo em si reutiliza o estilo do desktop (dark theme) */}
                                <DialogContent className="sm:max-w-[600px] bg-card text-foreground border-border">
                                    {/* ... Conteúdo do formulário (mantido) ... */}
                                </DialogContent>
                            </Dialog>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header >
    );
}
