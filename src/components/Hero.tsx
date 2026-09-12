"use client";

import React, { useRef } from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Layers, Smartphone, Landmark, TrendingUp, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import CountUp from "@/components/CountUp";

import { useTypewriter } from "@/hooks/useTypewriter";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE_STATS } from "@/lib/constants";

const floatingModules = [
    {
        icon: Layers,
        titleKey: "hero.float.web.title",
        metricKey: "hero.float.web.metric",
        bars: [40, 65, 50, 80, 60],
        className: "top-2 left-0 w-52 rotate-[-4deg] z-30",
        float: { duration: 5.5, delay: 0 },
    },
    {
        icon: Smartphone,
        titleKey: "hero.float.mobile.title",
        metricKey: "hero.float.mobile.metric",
        bars: [55, 30, 70, 45, 90],
        className: "top-32 right-0 w-48 rotate-[3deg] z-20",
        float: { duration: 6.5, delay: 0.6 },
    },
    {
        icon: Landmark,
        titleKey: "hero.float.banking.title",
        metricKey: "hero.float.banking.metric",
        bars: [70, 45, 85, 55, 75],
        className: "bottom-6 left-10 w-52 rotate-[-2deg] z-10",
        float: { duration: 6, delay: 1.1 },
    },
] as const;

const Hero = ({ imageUrl }: { imageUrl?: string | null }) => {
    const { t } = useLanguage();
    const { displayedText: subText } = useTypewriter(t('hero.subtitle'), 30, 300);

    const gridRef = useRef<HTMLDivElement>(null);
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const parallaxX = useSpring(useTransform(pointerX, [-1, 1], [-16, 16]), { stiffness: 120, damping: 20 });
    const parallaxY = useSpring(useTransform(pointerY, [-1, 1], [-16, 16]), { stiffness: 120, damping: 20 });

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const el = gridRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        pointerX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
        pointerY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const handlePointerLeave = () => {
        pointerX.set(0);
        pointerY.set(0);
    };

    return (
        <section className="relative overflow-hidden bg-[#050B1F] pt-36 pb-24 md:pt-44 md:pb-32">
            {/* Fundo — imagem opcional (admin), gradientes e grelha técnica */}
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt=""
                    fill
                    priority
                    className="object-cover -z-30 opacity-25 mix-blend-luminosity"
                    sizes="100vw"
                />
            )}
            <div
                aria-hidden
                className="absolute inset-0 -z-20"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(5,84,245,0.35), transparent 60%), radial-gradient(ellipse 60% 45% at 95% 105%, rgba(5,196,128,0.22), transparent 60%), linear-gradient(180deg, #050B1F 0%, #060C22 60%, #050B1F 100%)",
                }}
            />
            <div
                aria-hidden
                className="absolute inset-0 -z-10 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                    maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
                    WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
                }}
            />
            <motion.div
                aria-hidden
                className="absolute -z-10 top-10 left-[8%] w-72 h-72 rounded-full blur-[90px]"
                style={{ background: "rgba(5,84,245,0.35)" }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden
                className="absolute -z-10 bottom-0 right-[10%] w-80 h-80 rounded-full blur-[100px]"
                style={{ background: "rgba(5,196,128,0.28)" }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.65, 0.4] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            {/* Grão subtil — textura premium sobre o gradiente */}
            <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay bg-noise" />

            {/* Rota Porto ↔ Luanda — a ponte que a CPLP CONNECT representa */}
            <svg
                aria-hidden
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                className="absolute top-0 left-0 w-full h-full z-0 opacity-[0.35]"
            >
                <path
                    d="M 300 800 Q 560 280 920 120"
                    fill="none"
                    stroke="#5A6478"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className="route-dash"
                />
                <circle cx="300" cy="800" r="6" fill="#05C480" />
                <circle cx="300" cy="800" r="13" fill="none" stroke="#05C480" strokeWidth="1.5" opacity="0.6" />
                <text x="320" y="808" fill="#ffffff" fontSize="20" fontWeight="600" letterSpacing="0.5">
                    Porto
                </text>
                <circle cx="920" cy="120" r="6" fill="#0554F5" />
                <circle cx="920" cy="120" r="13" fill="none" stroke="#0554F5" strokeWidth="1.5" opacity="0.6" />
                <text x="770" y="98" fill="#ffffff" fontSize="20" fontWeight="600" letterSpacing="0.5">
                    Luanda
                </text>
            </svg>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div
                    ref={gridRef}
                    onPointerMove={handlePointerMove}
                    onPointerLeave={handlePointerLeave}
                    className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center"
                >
                    {/* Conteúdo principal */}
                    <div className="text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-8 bg-white/10 border border-white/15 backdrop-blur-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cplp-green opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cplp-green" />
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-wide text-white">
                                {t('hero.badge')}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.05 }}
                            className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6 text-white"
                        >
                            {t('hero.title')}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-12 min-h-[3.5rem] md:min-h-[4rem] text-white/75"
                        >
                            {subText}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="rounded-md text-base px-7 bg-cplp-blue hover:bg-cplp-blue-hover text-white"
                            >
                                <Link href="/contacto" className="flex items-center gap-2">
                                    {t('hero.cta.primary')}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="rounded-md text-base px-7 border-white/25 text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm"
                            >
                                <Link href="/servicos">{t('hero.cta.secondary')}</Link>
                            </Button>
                        </motion.div>

                        {/* Números institucionais — valores editáveis em src/lib/constants.ts (SITE_STATS) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-white/10"
                        >
                            {SITE_STATS.map((stat, index) => (
                                <div key={index} className="text-center lg:text-left">
                                    <div className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1 text-white">
                                        <CountUp value={stat.number} />
                                    </div>
                                    <div className="text-sm text-white/60">{t(stat.labelKey)}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Módulos flutuantes — cluster com parallax de grupo ao mover o rato */}
                    <motion.div
                        className="relative hidden lg:block h-[420px] max-w-sm mx-auto"
                        style={{ perspective: 1200, x: parallaxX, y: parallaxY }}
                    >
                        {/* Brilho de fundo que liga visualmente o cluster de cartões */}
                        <div
                            aria-hidden
                            className="absolute inset-0 rounded-full blur-[70px] opacity-60"
                            style={{ background: "radial-gradient(circle, rgba(5,84,245,0.25), transparent 70%)" }}
                        />

                        {floatingModules.map((module) => {
                            const Icon = module.icon;
                            return (
                                <motion.div
                                    key={module.titleKey}
                                    className={`absolute ${module.className}`}
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: [0, -14, 0],
                                    }}
                                    transition={{
                                        opacity: { duration: 0.6, delay: 0.3 + module.float.delay * 0.15 },
                                        scale: { duration: 0.6, delay: 0.3 + module.float.delay * 0.15 },
                                        y: {
                                            duration: module.float.duration,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: module.float.delay,
                                        },
                                    }}
                                >
                                    <TiltCard
                                        glare
                                        intensity={8}
                                        className="rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl p-5 shadow-2xl shadow-black/40"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center">
                                                <Icon className="w-4 h-4 text-white" strokeWidth={1.5} />
                                            </div>
                                            <span className="text-sm font-semibold text-white">
                                                {t(module.titleKey)}
                                            </span>
                                        </div>
                                        <div className="flex items-end gap-1.5 h-12 mb-3">
                                            {module.bars.map((height, i) => (
                                                <div
                                                    key={i}
                                                    className="flex-1 rounded-sm bg-white/25"
                                                    style={{ height: `${height}%` }}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs text-white/60">{t(module.metricKey)}</span>
                                    </TiltCard>
                                </motion.div>
                            );
                        })}

                        {/* Badge flutuante extra — número real, ver src/lib/constants.ts */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                            transition={{
                                opacity: { duration: 0.6, delay: 0.7 },
                                scale: { duration: 0.6, delay: 0.7 },
                                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
                            }}
                        >
                            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-cplp-navy/90 backdrop-blur-xl px-4 py-2 shadow-xl shadow-black/40">
                                <TrendingUp className="w-4 h-4 text-cplp-green" strokeWidth={1.5} />
                                <span className="text-xs font-semibold text-white whitespace-nowrap">
                                    {SITE_STATS[1]?.number} {t(SITE_STATS[1]?.labelKey)}
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Indicador de scroll */}
                <motion.div
                    className="hidden md:flex justify-center mt-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <Link
                        href="#services"
                        aria-label={t('hero.scroll')}
                        className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
                    >
                        <span className="text-xs uppercase tracking-wide">{t('hero.scroll')}</span>
                        <motion.span
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ChevronDown className="w-5 h-5" />
                        </motion.span>
                    </Link>
                </motion.div>
              </div>
            </div>
        </section>
    );
};

export default Hero;
