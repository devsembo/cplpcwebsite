// src/components/Sectors.tsx
"use client";

import React from 'react';
import { Landmark, Building2, GraduationCap, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Sectors = () => {
    const { t } = useLanguage();

    const sectors = [
        {
            icon: Landmark,
            title: t('sectors.items.banking.title'),
            description: t('sectors.items.banking.description'),
        },
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
                                    className="bg-white border border-cplp-line rounded-lg p-6"
                                >
                                    <div className="w-10 h-10 rounded-md bg-cplp-green/[0.1] flex items-center justify-center mb-4">
                                        <Icon className="w-5 h-5 text-cplp-green" />
                                    </div>
                                    <h3 className="text-base font-bold text-cplp-navy mb-2">
                                        {sector.title}
                                    </h3>
                                    <p className="text-sm text-cplp-grey leading-relaxed">
                                        {sector.description}
                                    </p>
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
