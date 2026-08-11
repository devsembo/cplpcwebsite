'use client';
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Linkedin } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

export default function Footer() {
    return (
        <footer className="bg-cplp-navy text-white">
            <div className="container max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div className="max-w-xs">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/brand/png/cplpconnect-lockup-h.png"
                                alt="CPLP CONNECT"
                                className="h-8 w-auto"
                                height={52}
                                width={150}
                            />
                        </Link>
                        <p className="text-white/60 text-sm mt-4 leading-relaxed">
                            Consultoria e transformação digital para empresas e instituições
                            do espaço CPLP.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white mb-4">
                            Links Rápidos
                        </h3>
                        <ul className="space-y-2.5">
                            <li><Link href="/" className="text-white/60 hover:text-white text-sm transition-colors">Início</Link></li>
                            <li><Link href="/sobre" className="text-white/60 hover:text-white text-sm transition-colors">Sobre Nós</Link></li>
                            <li><Link href="/servicos" className="text-white/60 hover:text-white text-sm transition-colors">Serviços</Link></li>
                            <li><Link href="/projetos" className="text-white/60 hover:text-white text-sm transition-colors">Projetos</Link></li>
                            <li><Link href="/academy" className="text-white/60 hover:text-white text-sm transition-colors">Academy</Link></li>
                            <li><Link href="/carreiras" className="text-white/60 hover:text-white text-sm transition-colors">Carreiras</Link></li>
                            <li><Link href="/contacto" className="text-white/60 hover:text-white text-sm transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white mb-4">
                            Serviços
                        </h3>
                        <ul className="space-y-2.5">
                            <li><Link href="/servicos" className="text-white/60 hover:text-white text-sm transition-colors">Plataformas & Software</Link></li>
                            <li><Link href="/servicos" className="text-white/60 hover:text-white text-sm transition-colors">Consultoria Digital</Link></li>
                            <li><Link href="/servicos" className="text-white/60 hover:text-white text-sm transition-colors">Suporte Técnico</Link></li>
                            <li><Link href="/faqs" className="text-white/60 hover:text-white text-sm transition-colors">Perguntas Frequentes</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white mb-4">
                            Contacto
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-cplp-green mt-0.5 shrink-0" />
                                <span className="text-white/60 text-sm">{COMPANY_INFO.address}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="h-4 w-4 text-cplp-green mt-0.5 shrink-0" />
                                <span className="text-white/60 text-sm">+351 935 254 355</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="h-4 w-4 text-cplp-green mt-0.5 shrink-0" />
                                <span className="text-white/60 text-sm">{COMPANY_INFO.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <ul className="flex items-center gap-5 mb-3">
                            <li>
                                <Link
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.instagram.com/cplpconnect/"
                                    className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
                                >
                                    <Instagram className="h-4 w-4" />
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.linkedin.com/company/cplp-connect/"
                                    className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
                                >
                                    <Linkedin className="h-4 w-4" />
                                    LinkedIn
                                </Link>
                            </li>
                        </ul>

                        <p className="text-white/50 text-sm">
                            © {new Date().getFullYear()} {COMPANY_INFO.legalName}. Todos os direitos reservados.
                        </p>
                        <p className="text-white/40 text-xs mt-1">
                            {COMPANY_INFO.legalName} · {COMPANY_INFO.nif} · {COMPANY_INFO.address}
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <Link href="/politica-privacidade" className="text-white/50 hover:text-white text-sm transition-colors">
                            Política de Privacidade
                        </Link>
                        <Link href="/termos-de-servico" className="text-white/50 hover:text-white text-sm transition-colors">
                            Termos de Serviço
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
