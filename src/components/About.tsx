// src/components/About.tsx
"use client"; // OBRIGATÓRIO: Componente usa hooks (useLanguage) e a biblioteca Framer Motion (motion.div)

import React from 'react';
import { Target, Eye, Heart, Globe } from "lucide-react";
// Importações de UI e Bibliotecas
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion"; // Mantido, deve ser instalado via npm install framer-motion
import { useLanguage } from "@/contexts/LanguageContext"; // Mantido, assumindo que foi migrado

const About = () => {
    const { t } = useLanguage();

    const values = [
        {
            icon: Target,
            title: t('about.mission.title'),
            description: t('about.mission.description')
        },
        {
            icon: Eye,
            title: t('about.vision.title'),
            description: t('about.vision.description')
        },
        {
            icon: Heart,
            title: t('about.values.title'),
            description: t('about.values.description')
        },
        {
            icon: Globe,
            title: t('about.presence.title'),
            description: t('about.presence.description')
        }
    ];

    return (
        <section id="about" className="py-24 md:py-32 relative overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Section header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        // whileInView é perfeitamente suportado no Next.js com "use client"
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="inline-block px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full mb-4 backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <span className="text-sm font-mono text-cyan-400">{t('about.tag')}</span>
                        </motion.div>
                        <motion.h2
                            className="text-4xl md:text-6xl font-bold mb-4"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <span className='text-white'>{t('about.title')} </span> <span className="bg-linear-to-r from-cyan-500  to-green-600 bg-clip-text text-transparent">{t('about.titleHighlight')}</span>
                        </motion.h2>
                        <motion.p
                            className="text-xl text-cyan-400/70 max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                        >
                            {t('about.description')}
                        </motion.p>
                    </motion.div>

                    {/* Main description */}
                    <motion.div
                        className="mb-16 text-center max-w-4xl mx-auto"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Card className="p-8 bg-card/50 backdrop-blur-sm  border-cyan-400/20 shadow-glow hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-smooth">
                            <p className="text-lg text-white/80 leading-relaxed">
                                {t('about.mainText')}
                            </p>
                        </Card>
                    </motion.div>

                    {/* Values grid (Mantido, incluindo a lógica do map) */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card
                                        className="p-8 border-2 border-cyan-400/20 bg-card/40 backdrop-blur-sm hover:border-cyan-400/50 hover:bg-card/60 transition-smooth shadow-card hover:shadow-glow group h-full"
                                    >
                                        <motion.div
                                            className="flex items-start gap-4"
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <motion.div
                                                className="p-3 bg-linear-to-br from-cyan-400/20 to-green-600/20 rounded-xl border border-cyan-400/30"
                                                whileHover={{ rotate: 360, scale: 1.1 }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                <Icon className="w-6 h-6 text-cyan-400" />
                                            </motion.div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-smooth">{value.title}</h3>
                                                <p className="text-cyan-400/70 leading-relaxed">{value.description}</p>
                                            </div>
                                        </motion.div>
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

export default About;