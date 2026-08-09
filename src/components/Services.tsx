// src/components/Services.tsx
"use client";

import React from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { SERVICE_AREAS } from "@/lib/service-areas";

const Services = () => {
    const { t } = useLanguage();

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
                        {SERVICE_AREAS.map((area, index) => {
                            const Icon = area.icon;
                            return (
                                <motion.div
                                    key={area.titleKey}
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
                                            {t(area.titleKey)}
                                        </h3>
                                        <p className="text-cplp-grey leading-relaxed">
                                            {t(area.descriptionKey)}
                                        </p>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="mt-10">
                        <Link
                            href="/servicos"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-cplp-blue hover:text-cplp-blue-hover transition-colors"
                        >
                            Ver todos os serviços
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
