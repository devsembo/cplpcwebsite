'use client';
import { useState } from 'react';
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

    return (
        <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-sm border-b shadow-sm">
            <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/cplp-logo.png"
                            alt="CPLP Connect Logo"
                            width={100}
                            height={100}
                            className="h-20 md:h-24 w-auto"
                        />
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-base font-medium hover:text-blue-950 transition-colors">
                        Início
                    </Link>
                    <Link href="/sobre" className="text-base font-medium hover:text-blue-950 transition-colors">
                        Sobre Nós
                    </Link>
                    <Link href="/servicos" className="text-base font-medium hover:text-blue-950 transition-colors">
                        Serviços
                    </Link>
                    <Link href="/projetos" className="text-base font-medium hover:text-blue-950 transition-colors">
                        Projetos
                    </Link>
                    <Link href="/contacto" className="text-base font-medium hover:text-blue-950 transition-colors">
                        Contacto
                    </Link>
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Button variant="outline" className="border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white">
                        PT | EN
                    </Button>

                    {/* Botão com dialog */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant={'default'}
                                className="bg-blue-950 text-white hover:bg-white hover:text-blue-950 hover:cursor-pointer"
                            >
                                Solicitar Orçamento
                            </Button>
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
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                            <Button
                                variant="outline"
                                className="w-full border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white"
                            >
                                PT | EN
                            </Button>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full bg-blue-950 text-white hover:bg-white hover:text-blue-950">
                                        Solicitar Orçamento
                                    </Button>
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
        </header>
    );
}
