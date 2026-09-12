"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Layers, Rocket, LifeBuoy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const steps = [
    { icon: Search, titleKey: "methodology.steps.diagnosis.title", descriptionKey: "methodology.steps.diagnosis.description" },
    { icon: Layers, titleKey: "methodology.steps.architecture.title", descriptionKey: "methodology.steps.architecture.description" },
    { icon: Rocket, titleKey: "methodology.steps.delivery.title", descriptionKey: "methodology.steps.delivery.description" },
    { icon: LifeBuoy, titleKey: "methodology.steps.support.title", descriptionKey: "methodology.steps.support.description" },
] as const;

const Methodology = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 md:py-28 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="max-w-2xl mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-xs font-semibold text-cplp-blue uppercase tracking-wide">
                            {t("methodology.tag")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">
                            {t("methodology.title")}
                        </h2>
                    </motion.div>

                    <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                        {/* Linha de conexão — apenas em ecrãs largos */}
                        <motion.div
                            aria-hidden
                            className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-cplp-line origin-left"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                        />

                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.titleKey}
                                    className="relative"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.12 }}
                                >
                                    <div className="relative z-10 w-14 h-14 rounded-full border border-cplp-blue/25 bg-white flex items-center justify-center mb-5">
                                        <Icon className="w-6 h-6 text-cplp-blue" strokeWidth={1.5} />
                                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cplp-navy text-white text-[11px] font-bold flex items-center justify-center border-2 border-white">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-bold text-cplp-navy mb-2">{t(step.titleKey)}</h3>
                                    <p className="text-sm text-cplp-grey leading-relaxed">{t(step.descriptionKey)}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Methodology;
