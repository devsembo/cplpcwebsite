// src/components/Sectors.tsx
"use client";

import React from 'react';
import { Landmark, Building2, GraduationCap, Users } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import { useLanguage } from "@/contexts/LanguageContext";

const Sectors = () => {
    const { t } = useLanguage();

    const sectors = [
        {
            icon: Building2,
            title: t('sectors.items.public.title'),
            description: t('sectors.items.public.description'),
        },
        {
            icon: GraduationCap,
            title: t('sectors.items.education.title'),
            description: t('sectors.items.education.description'),
        },
        {
            icon: Users,
            title: t('sectors.items.sme.title'),
            description: t('sectors.items.sme.description'),
        },
        {
            icon: Landmark,
            title: t('sectors.items.banking.title'),
            description: t('sectors.items.banking.description'),
        },
    ];

    return (
        <section id="sectors" className="py-20 md:py-28 bg-cplp-bg">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="max-w-2xl mb-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-xs font-semibold text-cplp-blue uppercase tracking-wide">
                            {t('sectors.tag')}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">
                            {t('sectors.title')}
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {sectors.map((sector, index) => {
                            const Icon = sector.icon;
                            return (
                                <motion.div
                                    key={sector.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                >
                                    <TiltCard intensity={6} className="h-full">
                                        <div className="h-full rounded-lg p-6 border bg-white border-cplp-line">
                                            <div className="w-10 h-10 rounded-full border border-cplp-green/25 flex items-center justify-center mb-4">
                                                <Icon className="w-5 h-5 text-cplp-green" strokeWidth={1.5} />
                                            </div>
                                            <h3 className="text-base font-bold mb-2 text-cplp-navy">
                                                {sector.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-cplp-grey">
                                                {sector.description}
                                            </p>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sectors;
