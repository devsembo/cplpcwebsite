"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Tecnologias efetivamente usadas nos projetos da CPLP CONNECT — ver package.json.
const TECHNOLOGIES = [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "Tailwind CSS",
    "Cloud",
];

const TechStack = () => {
    const { t } = useLanguage();
    const track = [...TECHNOLOGIES, ...TECHNOLOGIES];

    return (
        <section className="py-16 md:py-20 bg-cplp-bg">
            <div className="container mx-auto px-4">
                <motion.div
                    className="max-w-2xl mx-auto text-center mb-10"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-xs font-semibold text-cplp-blue uppercase tracking-wide">
                        {t("techstack.tag")}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-cplp-navy tracking-tight mt-3">
                        {t("techstack.title")}
                    </h2>
                </motion.div>
            </div>

            <div
                className="relative overflow-hidden"
                style={{
                    maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
                    WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
                }}
            >
                <div className="marquee-track flex w-max gap-4 px-4">
                    {track.map((tech, i) => (
                        <div
                            key={`${tech}-${i}`}
                            className="flex items-center gap-2.5 shrink-0 px-5 py-3 rounded-lg bg-white border border-cplp-line shadow-none"
                        >
                            <Code2 className="w-4 h-4 text-cplp-blue" />
                            <span className="text-sm font-semibold text-cplp-navy whitespace-nowrap">{tech}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
