'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
            <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        {isScrolled ?
                            <Image
                                src="/Logo.png"
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
                    <Link href="/" className="text-base  font-medium hover:text-green-400 transition-colors">
                        Início
                    </Link>
                    <Link href="/sobre" className="text-base font-medium hover:text-green-400 transition-colors">
                        Sobre Nós
                    </Link>
                    <Link href="/servicos" className="text-base font-medium hover:text-green-400 transition-colors">
                        Serviços
                    </Link>
                    <Link href="/projetos" className="text-base font-medium hover:text-green-400 transition-colors">
                        Projetos
                    </Link>
                    <Link href="/contacto" className="text-base font-medium hover:text-green-400 transition-colors">
                        Contacto
                    </Link>
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Button variant="outline" className="border-gray-300 text-gray-600 cursor-not-allowed" >
                        Pedidos e achados
                    </Button>

                    {/* Mobile inside Sheet */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-900 cursor-pointer  text-white hover:text-green-400 w-full md:w-40 ">Solicitar Orçamento</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Solicitar Orçamento</DialogTitle>
                                <DialogDescription>
                                    Preencha o formulário abaixo e entraremos em contacto o mais breve possível.
                                </DialogDescription>
                            </DialogHeader>

                            <form className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="nome" className="text-right">
                                        Nome
                                    </Label>
                                    <Input id="nome" placeholder="Seu nome completo" className="col-span-3" />
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input id="email" type="email" placeholder="exemplo@email.com" className="col-span-3" />
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="empresa" className="text-right">
                                        Empresa
                                    </Label>
                                    <Input id="empresa" placeholder="Opcional" className="col-span-3" />
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="servico" className="text-right">
                                        Serviço
                                    </Label>
                                    <Input id="servico" placeholder="Ex: Website, Sistema Interno, Integração..." className="col-span-3" />
                                </div>

                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="mensagem" className="text-right pt-2">
                                        Descrição
                                    </Label>
                                    <Textarea
                                        id="mensagem"
                                        placeholder="Descreva o projeto, necessidades, prazos ou qualquer detalhe relevante..."
                                        className="col-span-3"
                                    />
                                </div>
                            </form>

                            <DialogFooter>
                                <Button type="submit" className="bg-blue-950 text-white hover:bg-blue-900">
                                    Enviar Pedido
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>

                        <button className="md:hidden p-2" aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}>
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" color={isScrolled ? 'black' : 'white'} />}
                        </button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[340px] sm:w-[350px] bg-white p-4">
                        <SheetHeader>
                            <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col space-y-4 py-4">
                            <Link
                                href="/"
                                className="text-lg font-medium py-2 px-4 rounded-md hover:bg-gray-100 "
                                onClick={() => setIsOpen(false)}
                            >
                                Início
                            </Link>
                            <Link
                                href="/sobre"
                                className="text-lg font-medium py-2 px-4 rounded-md hover:bg-gray-100 "
                                onClick={() => setIsOpen(false)}
                            >
                                Sobre Nós
                            </Link>
                            <Link
                                href="/servicos"
                                className="text-lg font-medium py-2 px-4 rounded-md hover:bg-gray-100 "
                                onClick={() => setIsOpen(false)}
                            >
                                Serviços
                            </Link>
                            <Link
                                href="/projetos"
                                className="text-lg font-medium py-2 px-4 rounded-md hover:bg-gray-100 "
                                onClick={() => setIsOpen(false)}
                            >
                                Projetos
                            </Link>
                            <Link
                                href="/contacto"
                                className="text-lg font-medium py-2 px-4 rounded-md hover:bg-gray-100 "
                                onClick={() => setIsOpen(false)}
                            >
                                Contacto
                            </Link>
                        </nav>
                        <div className="mt-4 space-y-4">

                            <Dialog>
                                <DialogTrigger asChild>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                        <DialogTitle>Solicitar Orçamento</DialogTitle>
                                        <DialogDescription>
                                            Preencha o formulário abaixo e entraremos em contacto o mais breve possível.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <form className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="nome" className="text-right">
                                                Nome
                                            </Label>
                                            <Input id="nome" placeholder="Seu nome completo" className="col-span-3" />
                                        </div>

                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="email" className="text-right">
                                                Email
                                            </Label>
                                            <Input id="email" type="email" placeholder="exemplo@email.com" className="col-span-3" />
                                        </div>

                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="empresa" className="text-right">
                                                Empresa
                                            </Label>
                                            <Input id="empresa" placeholder="Opcional" className="col-span-3" />
                                        </div>

                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="servico" className="text-right">
                                                Serviço
                                            </Label>
                                            <Input
                                                id="servico"
                                                placeholder="Ex: Website, Sistema Interno, Integração..."
                                                className="col-span-3"
                                            />
                                        </div>

                                        <div className="grid grid-cols-4 items-start gap-4">
                                            <Label htmlFor="mensagem" className="text-right pt-2">
                                                Descrição
                                            </Label>
                                            <Textarea
                                                id="mensagem"
                                                placeholder="Descreva o projeto, necessidades, prazos ou qualquer detalhe relevante..."
                                                className="col-span-3"
                                            />
                                        </div>
                                    </form>

                                    <DialogFooter>
                                        <Button type="submit" className="bg-blue-950 text-white hover:bg-blue-900">
                                            Enviar Pedido
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header >
    );
}
