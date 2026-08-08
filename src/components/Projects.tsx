// src/components/Projects.tsx
"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { PROJECTS, type Project } from "@/lib/projects";

const ProjectPlaceholder = ({ project }: { project: Project }) => {
    if (project.comingSoon) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-white/5 border-2 border-dashed border-white/15">
                <span className="text-white/40 font-semibold tracking-wide uppercase text-sm">Em breve</span>
            </div>
        );
    }

    // TODO: substituir este placeholder por um screenshot real do produto
    // (ex.: /public/projects/troka.png) quando disponível.
    return (
        <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${project.accentFrom} 0%, ${project.accentTo} 100%)` }}
        >
            <span className="text-4xl md:text-5xl font-extrabold text-white/90 tracking-tight">
                {project.title}
            </span>
        </div>
    );
};

const Projects = () => {
    const { t } = useLanguage();

    const projects = PROJECTS;

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
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.15,
                                    ease: "easeOut",
                                }}
                                whileHover={project.comingSoon ? undefined : { scale: 1.02 }}
                            >
                                <Card
                                    className={`overflow-hidden border-2 bg-card/40 backdrop-blur-sm transition-smooth shadow-card h-full ${
                                        project.comingSoon
                                            ? "border-white/10 opacity-70"
                                            : "border-blue-400/20 hover:border-blue-400/50 hover:bg-card/60 hover:shadow-glow group"
                                    }`}
                                >
                                    {/* Project visual */}
                                    <div className="relative h-56 overflow-hidden bg-muted">
                                        <ProjectPlaceholder project={project} />
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

                                        {project.tags.length > 0 && (
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
                                        )}
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
