"use client";

import React from 'react';
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { useTypewriter } from "@/hooks/useTypewriter";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE_STATS } from "@/lib/constants";

const Hero = () => {
    const { t } = useLanguage();
    const { displayedText: subText } = useTypewriter(t('hero.subtitle'), 30, 300);

    return (
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cplp-blue/[0.08] rounded-md mb-8"
                    >
                        <span className="text-xs font-semibold text-cplp-blue uppercase tracking-wide">
                            {t('hero.badge')}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="text-4xl md:text-6xl font-extrabold text-cplp-navy tracking-tight leading-[1.1] mb-6"
                    >
                        {t('hero.title')}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg md:text-xl text-cplp-grey max-w-2xl mx-auto mb-12 min-h-[3.5rem] md:min-h-[4rem]"
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
                            className="border-cplp-line text-cplp-navy hover:bg-cplp-bg rounded-md text-base px-7"
                        >
                            <Link href="/academy">{t('hero.cta.secondary')}</Link>
                        </Button>
                    </motion.div>

                    {/* Números institucionais — valores editáveis em src/lib/constants.ts (SITE_STATS) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-cplp-line"
                    >
                        {SITE_STATS.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-extrabold text-cplp-navy tracking-tight mb-1">
                                    {stat.number}
                                </div>
                                <div className="text-sm text-cplp-grey">{t(stat.labelKey)}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
