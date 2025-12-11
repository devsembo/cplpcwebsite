"use client";

import React from 'react';
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Code2, Zap } from "lucide-react";

import { useTypewriter } from "@/hooks/useTypewriter";
import { useLanguage } from "@/contexts/LanguageContext";


const Hero = () => {
    const cplpLogoPath = "/CPLP LOGO (3).png";

    const { t } = useLanguage();
    const { displayedText } = useTypewriter(t('hero.title'), 80, 500);
    const { displayedText: subText } = useTypewriter(t('hero.subtitle'), 50, 2000);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-14 md:py-20">

            {/* Elementos de fundo (Mantidos) */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Animações CSS: use animate-[...] para maior segurança se float/scan não estiverem em classes utilitárias padrão */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]" />
                <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-accent/30 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]" style={{ animationDelay: "1s" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]" style={{ animationDelay: "3s" }} />
            </div>

            {/* Código decorativo (Mantido) */}
            <div className="absolute top-[410px] md:top-40 left-10 md:left-40 text-gray-200/55 font-mono text-xs md:text-sm lg:block">
                <div className="animate-fade-in">{"// CPLP Connect"}</div>
                <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>{"function innovate() {"}</div>
                <div className="animate-fade-in pl-4" style={{ animationDelay: "0.3s" }}>{"return 'future';"}</div>
                <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>{"}"}</div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto text-center">

                    {/* Logo - Uso do componente Image do Next.js */}
                    <div className="mb-8 animate-fade-in">
                        <Image
                            src={cplpLogoPath}
                            alt="CPLP Connect Logo"
                            // OBRIGATÓRIO: Largura e altura para o Next.js Image
                            width={144} // 36 * 4 (ex: w-36 * 4px/unidade Tailwind)
                            height={144} // Ajuste conforme a proporção real
                            className="w-auto h-28 md:h-36 mx-auto drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                            // Opcional: Adicionar priority se estiver na primeira tela (LCP)
                            priority
                        />
                    </div>

                    {/* Badge (Mantido) */}
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/20 border-2 border-primary/40 rounded-full mb-8 animate-fade-in backdrop-blur-sm shadow-glow border-none" style={{ animationDelay: "0.2s" }}>
                        <Sparkles className="w-4 h-4 text-primary animate-pulse" color="#3c83f6" />
                        <span className="text-sm font-bold text-[#3c83f6] ">{t('hero.badge')}</span>
                        <Zap className="w-4 h-4 text-accent animate-pulse" style={{ animationDelay: "0.5s" }} color='#3c83f6'/>
                    </div>

                    {/* Título e Subtítulo (Mantidos) */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up leading-tight min-h-[180px] md:min-h-[200px]" style={{ animationDelay: "0.3s" }}>
                        <span className="bg-linear-to-r from-cyan-500 via-blue-700 to-green-600 bg-clip-text text-transparent">
                            {displayedText}
                            <span className="animate-pulse">|</span>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-[#3c83f6]/80 mb-12 max-w-3xl mx-auto animate-fade-in-up min-h-[90px]" style={{ animationDelay: "0.4s" }}>
                        {subText}
                        {subText.length < 50 && <span className="animate-pulse">|</span>}
                    </p>

                    {/* CTA Buttons - Link do Next.js */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                        <Link href="/sobre" passHref>
                            <Button
                                size="lg"
                                className="text-lg px-8 py-6 shadow-glow hover:shadow-card-hover transition-smooth group animate-glow-pulse bg-linear-to-r from-cyan-500/50  to-green-600/50 cursor-pointer hover:text-white"
                            >
                                <Code2 className="mr-2 w-5 h-5" />
                                {t('hero.cta.primary')}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth" />
                            </Button>
                        </Link>
                        <Link href="/contacto" passHref>
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-lg px-8 py-6  border-primary/50 hover:bg-cyan-400/10 hover:border-primary transition-smooth backdrop-blur-sm cursor-pointer border-[.5px] hover:text-white text-cyan-700"
                            >
                                {t('hero.cta.secondary')}
                            </Button>
                        </Link>
                    </div>

                    {/* Stats (Mantidos) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                        {[
                            { number: "3", label: t('hero.stats.countries') },
                            { number: "10+", label: t('nav.projects') },
                            { number: "24/5", label: "Suporte" },
                            { number: "100%", label: "Dedicação" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center group cursor-default">
                                <div className="text-4xl md:text-5xl font-bold bg-linear-to-r  from-cyan-500  to-green-600/10 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-smooth">
                                    {stat.number}
                                </div>
                                <div className="text-sm text-white font-semibold">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;