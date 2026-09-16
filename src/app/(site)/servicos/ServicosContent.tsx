"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Service } from "@prisma/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { getServiceIcon } from "@/lib/service-icons";
import { pickLocale, pickLocaleList } from "@/lib/i18n-content";

export default function ServicosContent({ services }: { services: Service[] }) {
    const { language } = useLanguage();

    return (
        <section className="py-16 md:py-20 bg-cplp-bg">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
                    {services.map((service, index) => {
                        const Icon = getServiceIcon(service.icon);
                        return (
                            <motion.div
                                key={service.id}
                                id={`service-${service.slug}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                className="scroll-mt-28"
                            >
                                <Card className="p-8 h-full border border-cplp-line bg-white shadow-none rounded-lg">
                                    <div className="w-11 h-11 rounded-full border border-cplp-blue/25 flex items-center justify-center mb-5">
                                        <Icon className="w-5 h-5 text-cplp-blue" strokeWidth={1.5} />
                                    </div>
                                    <h2 className="text-xl font-bold text-cplp-navy mb-2">
                                        {pickLocale(language, service.title, service.titleEn)}
                                    </h2>
                                    <p className="text-cplp-grey leading-relaxed mb-5">
                                        {pickLocale(language, service.description, service.descriptionEn)}
                                    </p>
                                    <ul className="space-y-2.5 mb-6">
                                        {pickLocaleList(language, service.details, service.detailsEn).map((detail) => (
                                            <li key={detail} className="flex items-start gap-2.5">
                                                <Check className="w-4 h-4 text-cplp-green mt-0.5 shrink-0" />
                                                <span className="text-sm text-cplp-ink">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={`/servicos/${service.slug}`}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-cplp-blue hover:text-cplp-blue-hover transition-colors"
                                    >
                                        Saber mais
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
