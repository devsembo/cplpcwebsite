// src/components/Services.tsx
"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Layers, Smartphone, Cloud, Compass } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
    const { t } = useLanguage();

    const areas = [
        {
            icon: Layers,
            title: t('services.items.web.title'),
            description: t('services.items.web.description'),
        },
        {
            icon: Smartphone,
            title: t('services.items.mobile.title'),
            description: t('services.items.mobile.description'),
        },
        {
            icon: Cloud,
            title: t('services.items.cloud.title'),
            description: t('services.items.cloud.description'),
        },
        {
            icon: Compass,
            title: t('services.items.design.title'),
            description: t('services.items.design.description'),
        },
    ];

    return (
        <section id="services" className="py-20 md:py-28 bg-white">
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
                            {t('services.tag')}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">
                            {t('services.title')}
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 gap-5">
                        {areas.map((area, index) => {
                            const Icon = area.icon;
                            return (
                                <motion.div
                                    key={area.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                >
                                    <Card className="p-8 h-full border border-cplp-line bg-white shadow-none hover:shadow-card transition-shadow rounded-lg">
                                        <div className="w-11 h-11 rounded-md bg-cplp-blue/[0.08] flex items-center justify-center mb-5">
                                            <Icon className="w-5 h-5 text-cplp-blue" />
                                        </div>
                                        <h3 className="text-lg font-bold text-cplp-navy mb-2">
                                            {area.title}
                                        </h3>
                                        <p className="text-cplp-grey leading-relaxed">
                                            {area.description}
                                        </p>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
