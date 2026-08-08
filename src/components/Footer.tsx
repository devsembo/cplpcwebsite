'use client';
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Linkedin } from 'lucide-react'; // Ícones para redes sociais
import { COMPANY_INFO } from '@/lib/constants';

export default function Footer() {
    return (
        <footer className="bg-white/[0.03] backdrop-blur-sm border-t border-cyan-400/10 text-white">
            <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-items-center">
                    <div className="max-w-xs">
                        <Link href="/">
                            <Image
                                src="/cplp-connect-logo-header.png"
                                alt="CPLP Connect Logo"
                                className="object-cover"
                                height={100}
                                width={150}
                            />
                        </Link>
                        <p className="text-slate-300/70">
                            Desenvolvemos soluções de software para a comunidade CPLP, promovendo serviços digitais confiáveis, acessíveis e interoperáveis.
                        </p>
                    </div>

                    <div className="max-w-xs">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-brand-green"></span>
                            Links Rápidos
                        </h3>
                        <ul className="space-y-2 w-80 md:w-full ">
                            <li><Link href="/" className="text-slate-300/70 hover:text-cyan-400 transition-colors ">Início</Link></li>
                            <li><Link href="/sobre" className="text-slate-300/70 hover:text-cyan-400 transition-colors">Sobre Nós</Link></li>
                            <li><Link href="/servicos" className="text-slate-300/70 hover:text-cyan-400 transition-colors">Serviços</Link></li>
                            <li><Link href="/projetos" className="text-slate-300/70 hover:text-cyan-400 transition-colors">Projetos</Link></li>
                            <li><Link href="/academy" className="text-slate-300/70 hover:text-cyan-400 transition-colors">CPLP CONNECT Academy</Link></li>
                            <li><Link href="/contacto" className="text-slate-300/70 hover:text-cyan-400 transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    <div className="max-w-xs ">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-brand-green"></span>
                            Serviços
                        </h3>
                        <ul className="space-y-2 w-80 md:w-full">
                            <li><Link href="/servicos" className="text-slate-300/70 hover:text-cyan-400 transition-colors">Desenvolvimento Personalizado</Link></li>
                            <li><Link href="/servicos" className="text-slate-300/70 hover:text-cyan-400 transition-colors">Consultoria</Link></li>
                            <li><Link href="/servicos" className="text-slate-300/70 hover:text-cyan-400 transition-colors">Suporte Técnico</Link></li>
                            <li><Link href="/faqs" className="text-slate-300/70 hover:text-cyan-400 transition-colors">Perguntas Frequentes</Link></li>
                        </ul>
                    </div>

                    <div className="max-w-xs">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-brand-green"></span>
                            Contacto
                        </h3>
                        <ul className="space-y-4 w-80 md:w-full">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-cyan-400 mt-0.5" />
                                <span className="text-slate-300/70">Porto, Portugal</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-cyan-400 mt-0.5" />
                                <span className="text-slate-300/70">+351 935 254 355</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-cyan-400 mt-0.5" />
                                <span className="text-slate-300/70">info@cplpconnect.pt</span>
                            </li>
                        </ul>

                    </div>
                </div>

                <div className="border-t border-cyan-400/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <ul className="space-y-4 w-80 md:w-full flex items-center gap-3">
                            <li className="flex items-center gap-3">
                                <Instagram className="h-6 w-6 text-brand-green rounded-sm p-0.1"  color='#d45a8d'/>
                                <Link target='_blank' href="https://www.instagram.com/cplpconnect/" className="text-slate-300/70 hover:text-cyan-400 transition-colors">
                                    Instagram
                                </Link>
                            </li>
                            <li className="flex items-center gap-3">
                                <Linkedin className="h-6 w-6 text-brand-green rounded-sm p-0.5" color='#0077b5' />
                                <Link target='_blank' href="https://www.linkedin.com/company/cplp-connect/" className="text-slate-300/70 hover:text-cyan-400 transition-colors">
                                    LinkedIn
                                </Link>
                            </li>
                            <li className="flex items-center gap-3">
                            </li>
                        </ul>

                        <p className="text-slate-400/60 text-sm">
                            © {new Date().getFullYear()} CPLP Connect. Todos os direitos reservados.
                        </p>
                        <p className="text-slate-400/50 text-xs mt-1">
                            {COMPANY_INFO.legalName} · {COMPANY_INFO.nif} · {COMPANY_INFO.address}
                        </p>

                    </div>
                    <div className="mt-4 md:mt-0 flex gap-4">
                        <Link href="/politica-privacidade" className="text-slate-400/60 hover:text-cyan-400 text-sm transition-colors">
                            Política de Privacidade
                        </Link>
                        <Link href="/termos-de-servico" className="text-slate-400/60 hover:text-cyan-400 text-sm transition-colors">
                            Termos de Serviço
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}