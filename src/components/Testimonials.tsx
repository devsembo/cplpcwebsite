"use client";

import React from "react";
import type { Testimonial } from "@prisma/client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { pickLocale } from "@/lib/i18n-content";

function initials(name: string): string {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");
}

// Depoimentos geridos no admin (/admin/depoimentos). Sem depoimentos visíveis,
// a secção não é renderizada.
const Testimonials = ({ testimonials }: { testimonials: Testimonial[] }) => {
    const { t, language } = useLanguage();

    if (testimonials.length === 0) return null;

    return (
        <section className="py-20 md:py-28 bg-cplp-bg border-t border-cplp-line">
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
                            {t("testimonials.tag")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">
                            {t("testimonials.title")}
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {testimonials.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.07 }}
                            >
                                <Card className="h-full flex flex-col p-8 border border-cplp-line bg-white shadow-none rounded-lg">
                                    <Quote className="w-6 h-6 text-cplp-blue/30 mb-4" />
                                    <p className="text-cplp-ink leading-relaxed flex-1">
                                        {pickLocale(language, item.quote, item.quoteEn)}
                                    </p>
                                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-cplp-line">
                                        {item.avatarUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={item.avatarUrl}
                                                alt=""
                                                className="w-10 h-10 rounded-full object-cover shrink-0"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-cplp-blue/10 text-cplp-blue font-bold text-sm flex items-center justify-center shrink-0">
                                                {initials(item.authorName)}
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-cplp-navy truncate">
                                                {item.authorName}
                                            </p>
                                            <p className="text-xs text-cplp-grey truncate">
                                                {[item.role, item.company].filter(Boolean).join(" · ")}
                                            </p>
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

export default Testimonials;
