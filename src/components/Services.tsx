// src/components/Services.tsx
"use client"; // OBRIGATÓRIO: Usa hooks (useLanguage) e a biblioteca Framer Motion

import React from 'react';
import { motion } from "framer-motion"; // Deve estar instalado
import { useLanguage } from "@/contexts/LanguageContext"; // Deve estar migrado

const Services = () => {
    const { t } = useLanguage();

    const services = [
        {
            number: "01.",
            title: t('services.items.web.title'),
            items: [
                "Websites",
                "eCommerce",
                "Landing Pages",
                "Web Apps",
                "Newsletters"
            ]
        },
        {
            number: "02.",
            title: t('services.items.mobile.title'),
            items: [
                "iOS Apps",
                "Android Apps",
                "Mobile Ads"
            ]
        },
        {
            number: "03.",
            title: t('services.items.cloud.title'),
            items: [
                "Servidor VPS",
                "Servidor Dedicado",
                "Servidor Linux",
                "Servidor Windows",
                "Servidor Cloud"
            ]
        },
        {
            number: "04.",
            title: t('services.items.consulting.title'),
            items: [
                "Gestão de Redes Sociais",
                "Bulk SMS",
                "Plano de Marketing Digital",
                "SEO (Search Engine Optimization)",
                "Estratégia Social Media"
            ]
        },
        {
            number: "05.",
            title: t('services.items.transformation.title'),
            items: [
                "Registo de Domínios",
                "Gestão e Configuração",
                "Oferta de Landing Page"
            ]
        },
        {
            number: "06.",
            title: t('services.items.design.title'),
            items: [
                "Digital Branding",
                "Design de Websites",
                "Cartões de Visita",
                "Flyers",
                "Design Publicitário"
            ]
        }
    ];

    return (
        <section id="services" className="py-24 md:py-32 relative overflow-hidden bg-background">
            {/* Animated background */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-96 bg-linear-to-t from-accent/10 to-transparent"
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Section header */}
                    <motion.div
                        className="mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="inline-block px-4 py-2 bg-green-400/20 border border-green-400/30 rounded-full mb-4 backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <span className="text-sm font-mono text-green-400 uppercase tracking-wider">
                                {t('services.tag')}
                            </span>
                        </motion.div>
                        <motion.h2
                            className="text-4xl md:text-6xl font-bold mb-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <span className='text-white'>{t('services.title')}</span>  <span className="bg-linear-to-r from-cyan-400 via-green-400 to-blue-600 bg-clip-text text-transparent">{t('services.titleHighlight')}</span>
                        </motion.h2>
                    </motion.div>

                    {/* Services grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-400/50">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1
                                }}
                                className="group border-r border-b border-gray-400/50 p-8 hover:bg-green-400/5 transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Hover effect */}
                                <motion.div
                                    className="absolute inset-0 bg-linear-to-br from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />

                                <div className="relative z-10 ">
                                    {/* Number */}
                                    <motion.div
                                        className="text-green-500/40 text-5xl font-bold mb-4 cursor-pointer"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        {service.number}
                                    </motion.div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-wide group-hover:text-green-500 transition-colors">
                                        {service.title}
                                    </h3>

                                    {/* Items list */}
                                    <ul className="space-y-3">
                                        {service.items.map((item, itemIndex) => (
                                            <motion.li
                                                key={itemIndex}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 + itemIndex * 0.05 }}
                                                className="text-white/70 text-sm flex items-start gap-2 group-hover:text-white/90 transition-colors"
                                            >
                                                <span className="text-green-500 mt-1">.</span>
                                                <span>{item}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;