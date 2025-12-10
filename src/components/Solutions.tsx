// src/components/Solutions.tsx
"use client"; // OBRIGATÓRIO: Usa hooks (useLanguage) e a biblioteca Framer Motion

import React from 'react';
import { Rocket, Building2, Landmark, ShoppingCart, GraduationCap, Banknote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext"; // Deve estar migrado

const Solutions = () => {
    const { t } = useLanguage();

    const solutions = [
        {
            icon: Rocket,
            title: t('solutions.items.startups.title'),
            description: t('solutions.items.startups.description')
        },
        {
            icon: Building2,
            title: t('solutions.items.sme.title'),
            description: t('solutions.items.sme.description')
        },
        {
            icon: Landmark,
            title: t('solutions.items.public.title'),
            description: t('solutions.items.public.description')
        },
        {
            icon: ShoppingCart,
            title: t('solutions.items.ecommerce.title'),
            description: t('solutions.items.ecommerce.description')
        },
        {
            icon: GraduationCap,
            title: t('solutions.items.education.title'),
            description: t('solutions.items.education.description')
        },
        {
            icon: Banknote,
            title: t('solutions.items.finance.title'),
            description: t('solutions.items.finance.description')
        }
    ];

    return (
        <section id="solutions" className="py-24 md:py-32 relative overflow-hidden">
            {/* Animated gradient background (Mantido) */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-400/5 via-transparent to-green-400/5 animate-pulse" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Section header (Mantido) */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="inline-block px-4 py-2 bg-green-400/15 border border-green-400/30 rounded-full mb-4 backdrop-blur-sm"
                            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="text-sm font-mono text-green-400">{t('solutions.tag')}</span>
                        </motion.div>
                        <motion.h2
                            className="text-4xl md:text-6xl font-bold mb-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <span className='text-white'>  {t('solutions.title')} </span><span className="bg-linear-to-r from-cyan-400 via-blue-400 to-green-400 bg-clip-text text-transparent">{t('solutions.titleHighlight')}</span>
                        </motion.h2>
                        <motion.p
                            className="text-xl text-gray-400 max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                        >
                            {t('solutions.description')}
                        </motion.p>
                    </motion.div>

                    {/* Solutions grid (Mantido) */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {solutions.map((solution, index) => {
                            const Icon = solution.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    whileHover={{ y: -10, scale: 1.05 }}
                                >
                                    <Card
                                        className="p-6 border-[1] border-blue-400/20 bg-card/40 backdrop-blur-sm hover:border-green-400/50 hover:bg-card/60 transition-all duration-300 shadow-lg hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] group cursor-pointer h-full"
                                    >
                                        <motion.div
                                            className="mb-4 bg-linear-to-br from-blue-400 to-green-400 rounded-xl flex items-center justify-center shadow-lg w-16 h-14"
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.6, ease: "easeInOut" }}
                                        >
                                            <div className="w-14 h-14 bg-linear-to-br from-blue-400 to-green-400 rounded-xl flex items-center justify-center shadow-lg">
                                                <Icon className="w-7 h-7 text-primary-foreground"  color='#FFF'/>
                                            </div>
                                        </motion.div>
                                        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-green-400 transition-all duration-300">
                                            {solution.title}
                                        </h3>
                                        <p className="text-gray-400/60 leading-relaxed">
                                            {solution.description}
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

export default Solutions;