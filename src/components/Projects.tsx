// src/components/Projects.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Projects = () => {
    const { t } = useLanguage();

    const projects = [
        {
            title: "Plataforma E-commerce B2B",
            description:
                "Sistema completo de comércio eletrónico para distribuidores com gestão de inventário, pedidos e pagamentos integrados.",
            image:
                "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop",
            tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
            category: "E-commerce",
        },
        {
            title: "App Bancária Mobile",
            description:
                "Aplicação móvel para serviços bancários com autenticação biométrica, transferências e gestão de contas.",
            image:
                "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop",
            tags: ["React Native", "API REST", "Segurança"],
            category: "Fintech",
        },
        {
            title: "Portal Educacional",
            description:
                "Plataforma de e-learning com gestão de cursos, vídeos, avaliações e certificações digitais.",
            image:
                "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
            tags: ["Next.js", "LMS", "Cloud Storage"],
            category: "Educação",
        },
        {
            title: "Sistema de Gestão Pública",
            description:
                "Solução digital para administração pública com workflow automatizado e portal do cidadão.",
            image:
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
            tags: ["Vue.js", "Python", "Microserviços"],
            category: "Gov Tech",
        },
    ];

    const isClient = typeof window !== "undefined";
    const initialX = () => (isClient ? Math.random() * window.innerWidth : 0);
    const initialY = () => Math.random() * 1000;

    return (
        <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {isClient &&
                    [...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-primary/30 rounded-full"
                            initial={{
                                x: initialX(),
                                y: initialY(),
                            }}
                            animate={{
                                y: [null, Math.random() * 1000 - 500],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                        />
                    ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="inline-block px-4 py-2 bg-blue-400/10 border border-blue-400/30 rounded-full mb-4 backdrop-blur-sm"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="text-sm font-mono text-blue-400">
                                {t("projects.tag")}
                            </span>
                        </motion.div>

                        <motion.h2
                            className="text-4xl md:text-6xl font-bold mb-4"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <span className="text-white">{t("projects.title")}{" "}</span>
                            <span className="bg-linear-to-r from-blue-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
                                {t("projects.titleHighlight")}
                            </span>
                        </motion.h2>

                        <motion.p
                            className="text-xl text-white/70 max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                        >
                            {t("projects.description")}
                        </motion.p>
                    </motion.div>

                    {/* Projects grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    x: index % 2 === 0 ? -100 : 100,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.2,
                                    ease: "easeOut",
                                }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <Card className="overflow-hidden border-2 border-blue-400/20 bg-card/40 backdrop-blur-sm hover:border-blue-400/50 hover:bg-card/60 transition-smooth shadow-card hover:shadow-glow group cursor-pointer h-full">
                                    {/* Project image */}
                                    <div className="relative h-64 overflow-hidden bg-muted">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                            className="w-full h-full"
                                        >
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                style={{ objectFit: "cover" }}
                                            />
                                        </motion.div>

                                        {/* Hover Overlay */}
                                        <motion.div
                                            className="absolute inset-0 bg-linear-to-t from-blue-900/30 to-transparent flex items-end justify-center pb-4"
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="flex items-center gap-2 text-blue-400 font-medium">
                                                <span>Ver Detalhes</span>
                                                <ExternalLink className="w-4 h-4" />
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="p-6">
                                        <Badge variant="secondary" className="mb-2 text-white bg-cyan-50/10">
                                            {project.category}
                                        </Badge>

                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-smooth">
                                            {project.title}
                                        </h3>

                                        <p className="text-white/60 mb-4 leading-relaxed">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag, tagIndex) => (
                                                <motion.div
                                                    key={tagIndex}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: tagIndex * 0.1 }}
                                                >
                                                    <Badge variant="outline" className="text-xs  text-white bg-cyan-50/10">
                                                        {tag}
                                                    </Badge>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
