"use client";

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { useTypewriter } from "@/hooks/useTypewriter";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE_STATS } from "@/lib/constants";

const Hero = ({ imageUrl }: { imageUrl?: string | null }) => {
    const { t } = useLanguage();
    const { displayedText: subText } = useTypewriter(t('hero.subtitle'), 30, 300);
    const hasImage = Boolean(imageUrl);

    return (
        <section className={`relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden ${hasImage ? "" : "bg-white"}`}>
            {imageUrl && (
                <>
                    <Image src={imageUrl} alt="" fill priority className="object-cover -z-20" sizes="100vw" />
                    <div className="absolute inset-0 bg-cplp-navy/60 -z-10" />
                </>
            )}
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md mb-8 ${
                            hasImage ? "bg-white/15" : "bg-cplp-blue/[0.08]"
                        }`}
                    >
                        <span className={`text-xs font-semibold uppercase tracking-wide ${hasImage ? "text-white" : "text-cplp-blue"}`}>
                            {t('hero.badge')}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className={`text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 ${
                            hasImage ? "text-white" : "text-cplp-navy"
                        }`}
                    >
                        {t('hero.title')}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 min-h-[3.5rem] md:min-h-[4rem] ${
                            hasImage ? "text-white/85" : "text-cplp-grey"
                        }`}
                    >
                        {subText}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button
                            asChild
                            size="lg"
                            className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md text-base px-7"
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
                            className={
                                hasImage
                                    ? "border-white/30 text-white hover:bg-white/10 rounded-md text-base px-7"
                                    : "border-cplp-line text-cplp-navy hover:bg-cplp-bg rounded-md text-base px-7"
                            }
                        >
                            <Link href="/academy">{t('hero.cta.secondary')}</Link>
                        </Button>
                    </motion.div>

                    {/* Números institucionais — valores editáveis em src/lib/constants.ts (SITE_STATS) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t ${
                            hasImage ? "border-white/20" : "border-cplp-line"
                        }`}
                    >
                        {SITE_STATS.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-1 ${hasImage ? "text-white" : "text-cplp-navy"}`}>
                                    {stat.number}
                                </div>
                                <div className={`text-sm ${hasImage ? "text-white/70" : "text-cplp-grey"}`}>{t(stat.labelKey)}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
