// src/components/Projects.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectsGrid from "@/components/ProjectsGrid";

const Projects = () => {
    const { t } = useLanguage();

    return (
        <section id="projects" className="py-20 md:py-28 bg-white">
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
                            {t("projects.tag")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">
                            {t("projects.title")}
                        </h2>
                    </motion.div>

                    <ProjectsGrid />
                </div>
            </div>
        </section>
    );
};

export default Projects;
