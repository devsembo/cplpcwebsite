"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { SERVICE_AREAS } from "@/lib/service-areas";

export default function ServicosContent() {
    const { t } = useLanguage();

    return (
        <section className="py-16 md:py-20 bg-cplp-bg">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
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
                                <Card className="p-8 h-full border border-cplp-line bg-white shadow-none rounded-lg">
                                    <div className="w-11 h-11 rounded-md bg-cplp-blue/[0.08] flex items-center justify-center mb-5">
                                        <Icon className="w-5 h-5 text-cplp-blue" />
                                    </div>
                                    <h2 className="text-xl font-bold text-cplp-navy mb-2">
                                        {t(area.titleKey)}
                                    </h2>
                                    <p className="text-cplp-grey leading-relaxed mb-5">
                                        {t(area.descriptionKey)}
                                    </p>
                                    <ul className="space-y-2.5">
                                        {area.details.map((detail) => (
                                            <li key={detail} className="flex items-start gap-2.5">
                                                <Check className="w-4 h-4 text-cplp-green mt-0.5 shrink-0" />
                                                <span className="text-sm text-cplp-ink">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
