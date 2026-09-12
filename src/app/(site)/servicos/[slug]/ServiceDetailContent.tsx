"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Search, Layers as LayersIcon, Rocket, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TiltCard from "@/components/TiltCard";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { SERVICE_AREAS } from "@/lib/service-areas";

const PROCESS_STEPS = [
    { icon: Search, titleKey: "methodology.steps.diagnosis.title" },
    { icon: LayersIcon, titleKey: "methodology.steps.architecture.title" },
    { icon: Rocket, titleKey: "methodology.steps.delivery.title" },
    { icon: LifeBuoy, titleKey: "methodology.steps.support.title" },
] as const;

export default function ServiceDetailContent({ slug }: { slug: string }) {
    const { t } = useLanguage();
    const area = SERVICE_AREAS.find((a) => a.slug === slug) ?? SERVICE_AREAS[0];
    const Icon = area.icon;
    const relatedAreas = SERVICE_AREAS.filter((a) => a.slug !== area.slug);

    return (
        <div className="min-h-screen flex flex-col">
            <PageHero title={t(area.titleKey)} description={t(area.descriptionKey)} />

            <section className="py-12 bg-white border-b border-cplp-line">
                <div className="container mx-auto px-4">
                    <Link
                        href="/servicos"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-cplp-blue hover:text-cplp-blue-hover transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t("servicedetail.back")}
                    </Link>
                </div>
            </section>

            {/* O que inclui */}
            <section className="py-16 md:py-20 bg-cplp-bg">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            className="flex items-center gap-4 mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-14 h-14 rounded-full border border-cplp-blue/25 flex items-center justify-center shrink-0">
                                <Icon className="w-6 h-6 text-cplp-blue" strokeWidth={1.5} />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-cplp-navy tracking-tight">
                                {t("servicedetail.features.title")}
                            </h2>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            {area.details.map((detail, index) => (
                                <motion.div
                                    key={detail}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                >
                                    <TiltCard intensity={5} className="h-full">
                                        <Card className="flex items-start gap-3 p-6 h-full border border-cplp-line bg-white shadow-none rounded-lg">
                                            <Check className="w-5 h-5 text-cplp-green mt-0.5 shrink-0" />
                                            <span className="text-cplp-ink font-medium leading-relaxed">{detail}</span>
                                        </Card>
                                    </TiltCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Como trabalhamos */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            className="max-w-2xl mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="text-xs font-semibold text-cplp-blue uppercase tracking-wide">
                                {t("servicedetail.process.tag")}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-cplp-navy tracking-tight mt-3">
                                {t("servicedetail.process.title")}
                            </h2>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {PROCESS_STEPS.map((step, index) => {
                                const StepIcon = step.icon;
                                return (
                                    <motion.div
                                        key={step.titleKey}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <div className="w-11 h-11 rounded-full border border-cplp-blue/25 flex items-center justify-center mb-3">
                                            <StepIcon className="w-5 h-5 text-cplp-blue" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-sm font-bold text-cplp-navy">{t(step.titleKey)}</h3>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Outros serviços */}
            <section className="py-16 md:py-20 bg-cplp-bg">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            className="max-w-2xl mb-10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="text-xs font-semibold text-cplp-blue uppercase tracking-wide">
                                {t("servicedetail.related.tag")}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-cplp-navy tracking-tight mt-3">
                                {t("servicedetail.related.title")}
                            </h2>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {relatedAreas.map((related, index) => {
                                const RelatedIcon = related.icon;
                                return (
                                    <motion.div
                                        key={related.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.08 }}
                                    >
                                        <Link
                                            href={`/servicos/${related.slug}`}
                                            className="group block h-full bg-white border border-cplp-line rounded-lg p-5 hover:shadow-card transition-shadow"
                                        >
                                            <div className="w-9 h-9 rounded-full border border-cplp-blue/25 flex items-center justify-center mb-3">
                                                <RelatedIcon className="w-4 h-4 text-cplp-blue" strokeWidth={1.5} />
                                            </div>
                                            <h3 className="text-sm font-bold text-cplp-navy group-hover:text-cplp-blue transition-colors">
                                                {t(related.titleKey)}
                                            </h3>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden bg-[#050B1F] py-20 md:py-24">
                <div
                    aria-hidden
                    className="absolute inset-0 -z-10"
                    style={{
                        background:
                            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(5,84,245,0.32), transparent 65%), linear-gradient(180deg, #050B1F 0%, #060C22 100%)",
                    }}
                />
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                            {t("servicedetail.cta.title")}
                        </h2>
                        <p className="text-white/70 mb-10">{t("servicedetail.cta.description")}</p>
                        <Button
                            asChild
                            size="lg"
                            className="rounded-md bg-cplp-blue hover:bg-cplp-blue-hover text-white"
                        >
                            <Link href="/contacto" className="flex items-center gap-2">
                                {t("servicedetail.cta.button")}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
