'use client';
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Linkedin } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';
import NewsletterForm from '@/components/NewsletterForm';

export default function Footer() {
    return (
        <footer className="bg-cplp-navy text-white">
            <div className="border-b border-white/10">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div>
                        <h3 className="text-lg font-bold text-white">Subscreva a nossa newsletter</h3>
                        <p className="text-white/60 text-sm mt-1">
                            Novidades sobre transformação digital no espaço CPLP, direto no seu email.
                        </p>
                    </div>
                    <div className="w-full md:w-auto md:min-w-[360px]">
                        <NewsletterForm variant="dark" />
                    </div>
                </div>
            </div>

            <div className="container max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-10">
                    <div className="col-span-2 sm:col-span-3 lg:col-span-2 max-w-xs">
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
                            Empresa
                        </h3>
                        <ul className="space-y-2.5">
                            <li><Link href="/" className="text-white/60 hover:text-white text-sm transition-colors">Início</Link></li>
                            <li><Link href="/sobre" className="text-white/60 hover:text-white text-sm transition-colors">Sobre Nós</Link></li>
                            <li><Link href="/servicos" className="text-white/60 hover:text-white text-sm transition-colors">Serviços</Link></li>
                            <li><Link href="/projetos" className="text-white/60 hover:text-white text-sm transition-colors">Projetos</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white mb-4">
                            Recursos
                        </h3>
                        <ul className="space-y-2.5">
                            <li><Link href="/academy" className="text-white/60 hover:text-white text-sm transition-colors">Academy</Link></li>
                            <li><Link href="/blog" className="text-white/60 hover:text-white text-sm transition-colors">Blog</Link></li>
                            <li><Link href="/carreiras" className="text-white/60 hover:text-white text-sm transition-colors">Carreiras</Link></li>
                            <li><Link href="/faqs" className="text-white/60 hover:text-white text-sm transition-colors">Perguntas Frequentes</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-white mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-2.5">
                            <li><Link href="/termos-de-servico" className="text-white/60 hover:text-white text-sm transition-colors">Termos de Serviço</Link></li>
                            <li><Link href="/politica-privacidade" className="text-white/60 hover:text-white text-sm transition-colors">Política de Privacidade</Link></li>
                            <li><Link href="/politica-cookies" className="text-white/60 hover:text-white text-sm transition-colors">Cookies</Link></li>
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
                                <span className="text-white/60 text-sm">+351  934 373 461</span>
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
                </div>
            </div>
        </footer>
    );
}
