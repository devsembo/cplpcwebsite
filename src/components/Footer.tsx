'use client';
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-items-center">
                    <div className="max-w-xs">
                        <Link href="/">
                            <Image
                                src="/cplp-logo.png"
                                alt="CPLP Connect Logo"
                                className="h-12 md:h-20 w-auto mb-[-10px]"
                                height={100}
                                width={100}
                            />
                        </Link>
                        <p className="text-gray-400">
                            Desenvolvendo soluções de software inovadoras para a comunidade CPLP, conectando com tecnologia e inovação para impulsionar o futuro digital da comunidade CPLP.
                        </p>
                    </div>

                    <div className="max-w-xs">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-brand-green"></span>
                            Links Rápidos
                        </h3>
                        <ul className="space-y-2 w-80 md:w-full ">
                            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors ">Início</Link></li>
                            <li><Link href="/sobre" className="text-gray-400 hover:text-white transition-colors">Sobre Nós</Link></li>
                            <li><Link href="/servicos" className="text-gray-400 hover:text-white transition-colors">Serviços</Link></li>
                            <li><Link href="/projetos" className="text-gray-400 hover:text-white transition-colors">Projetos</Link></li>
                            <li><Link href="/contacto" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    <div className="max-w-xs ">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-brand-green"></span>
                            Serviços
                        </h3>
                        <ul className="space-y-2 w-80 md:w-full">
                            <li><Link href="/servicos" className="text-gray-400 hover:text-white transition-colors">Desenvolvimento Personalizado</Link></li>
                            <li><Link href="/servicos" className="text-gray-400 hover:text-white transition-colors">Consultoria</Link></li>
                            <li><Link href="/servicos" className="text-gray-400 hover:text-white transition-colors">Suporte Técnico</Link></li>
                            <li><Link href="/faqs" className="text-gray-400 hover:text-white transition-colors">Pergunta Frequentes</Link></li>
                        </ul>
                    </div>

                    <div className="max-w-xs">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-brand-green"></span>
                            Contacto
                        </h3>
                        <ul className="space-y-4 w-80 md:w-full">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-brand-green mt-0.5" />
                                <span className="text-gray-400">Porto, Portugal</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-brand-green mt-0.5" />
                                <span className="text-gray-400">+351 935 254 355</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-brand-green mt-0.5" />
                                <span className="text-gray-400">geral@cplpconnect.pt</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} CPLP Connect. Todos os direitos reservados.
                    </p>
                    <div className="mt-4 md:mt-0 flex gap-4">
                        <Link href="/politica-privacidade" className="text-gray-400 hover:text-white text-sm transition-colors">
                            Política de Privacidade
                        </Link>
                        <Link href="/termos-de-servico" className="text-gray-400 hover:text-white text-sm transition-colors">
                            Termos de Serviço
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}