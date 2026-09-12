"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Cloud, GitBranch, GraduationCap } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import { useLanguage } from "@/contexts/LanguageContext";

const pillars = [
    { icon: MapPin, titleKey: "whyus.items.local.title", descriptionKey: "whyus.items.local.description" },
    { icon: ShieldCheck, titleKey: "whyus.items.security.title", descriptionKey: "whyus.items.security.description" },
    { icon: Cloud, titleKey: "whyus.items.scalable.title", descriptionKey: "whyus.items.scalable.description" },
    { icon: GitBranch, titleKey: "whyus.items.agile.title", descriptionKey: "whyus.items.agile.description" },
    { icon: GraduationCap, titleKey: "whyus.items.academy.title", descriptionKey: "whyus.items.academy.description" },
] as const;

const WhyUs = () => {
    const { t } = useLanguage();

    return (
        <section className="relative overflow-hidden py-20 md:py-28 bg-[#050B1F]">
            <div
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 50% at 10% 10%, rgba(5,84,245,0.22), transparent 60%), radial-gradient(ellipse 50% 40% at 90% 90%, rgba(5,196,128,0.16), transparent 60%)",
                }}
            />
            <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay bg-noise" />
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="max-w-2xl mb-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-xs font-semibold text-cplp-green uppercase tracking-wide">
                            {t("whyus.tag")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-3">
                            {t("whyus.title")}
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {pillars.map((pillar, index) => {
                            const Icon = pillar.icon;
                            const isLast = index === pillars.length - 1;
                            return (
                                <motion.div
                                    key={pillar.titleKey}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.07 }}
                                    className={isLast ? "sm:col-span-2 lg:col-span-1" : ""}
                                >
                                    <TiltCard intensity={6} className="h-full">
                                        <div className="h-full rounded-lg p-6 border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:bg-white/[0.06] transition-colors">
                                            <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center mb-4">
                                                <Icon className="w-5 h-5 text-cplp-green" strokeWidth={1.5} />
                                            </div>
                                            <h3 className="text-base font-bold text-white mb-2">{t(pillar.titleKey)}</h3>
                                            <p className="text-sm text-white/65 leading-relaxed">{t(pillar.descriptionKey)}</p>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
