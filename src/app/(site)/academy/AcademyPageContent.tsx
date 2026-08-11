"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Building2,
    GraduationCap,
    Laptop,
    Repeat,
    Users,
    Cpu,
    Database,
    Shield,
    ClipboardList,
    Handshake,
    Calculator,
    Scale,
    Search,
    PenTool,
    CheckCircle2,
    QrCode,
    ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AcademyPageContent({ heroImageUrl }: { heroImageUrl?: string | null }) {
    const { t } = useLanguage();

    const formatos = [
        {
            icon: Building2,
            title: t("academy.formatos.incompany.title"),
            description: t("academy.formatos.incompany.description"),
        },
        {
            icon: GraduationCap,
            title: t("academy.formatos.executive.title"),
            description: t("academy.formatos.executive.description"),
        },
        {
            icon: Laptop,
            title: t("academy.formatos.online.title"),
            description: t("academy.formatos.online.description"),
        },
        {
            icon: Repeat,
            title: t("academy.formatos.exchange.title"),
            description: t("academy.formatos.exchange.description"),
        },
    ];

    const areas = [
        { icon: Users, title: t("academy.areas.leadership") },
        { icon: Cpu, title: t("academy.areas.digital") },
        { icon: Database, title: t("academy.areas.data") },
        { icon: Shield, title: t("academy.areas.cyber") },
        { icon: ClipboardList, title: t("academy.areas.projects") },
        { icon: Handshake, title: t("academy.areas.sales") },
        { icon: Calculator, title: t("academy.areas.finance") },
        { icon: Scale, title: t("academy.areas.compliance") },
    ];

    const comoFunciona = [
        { icon: Search, title: t("academy.how.diagnosis.title"), description: t("academy.how.diagnosis.description") },
        { icon: PenTool, title: t("academy.how.design.title"), description: t("academy.how.design.description") },
        { icon: GraduationCap, title: t("academy.how.training.title"), description: t("academy.how.training.description") },
        { icon: CheckCircle2, title: t("academy.how.evaluation.title"), description: t("academy.how.evaluation.description") },
        { icon: QrCode, title: t("academy.how.certificate.title"), description: t("academy.how.certificate.description") },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero */}
            <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-cplp-navy overflow-hidden">
                {heroImageUrl && (
                    <>
                        <Image src={heroImageUrl} alt="" fill priority className="object-cover opacity-40" sizes="100vw" />
                        <div className="absolute inset-0 bg-cplp-navy/50" />
                    </>
                )}
                <div className="relative container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center mb-10"
                    >
                        <Image
                            src="/brand/png/academy-lockup-h-dark.png"
                            alt="CPLP CONNECT Academy"
                            width={310}
                            height={90}
                            className="h-14 md:h-16 w-auto"
                            priority
                        />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6"
                    >
                        {t("academy.hero.title")}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto"
                    >
                        {t("academy.hero.subtitle")}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="mt-10"
                    >
                        <Button asChild size="lg" className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md">
                            <Link href="/contacto" className="flex items-center gap-2">
                                {t("academy.hero.cta")}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Quatro formatos */}
            <section className="py-20 md:py-24 bg-white">
                <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-14"
                    >
                        <span className="text-xs font-semibold uppercase tracking-wide text-cplp-blue">
                            {t("academy.formatos.tag")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">{t("academy.formatos.title")}</h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 gap-5">
                        {formatos.map((formato, index) => {
                            const Icon = formato.icon;
                            return (
                                <motion.div
                                    key={formato.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                >
                                    <Card className="p-8 h-full border border-cplp-line bg-white shadow-none hover:shadow-card transition-shadow rounded-lg">
                                        <div className="w-11 h-11 rounded-md bg-cplp-blue/[0.08] flex items-center justify-center mb-5">
                                            <Icon className="w-5 h-5 text-cplp-blue" />
                                        </div>
                                        <h3 className="text-lg font-bold text-cplp-navy mb-2">{formato.title}</h3>
                                        <p className="text-cplp-grey leading-relaxed">{formato.description}</p>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Áreas de formação */}
            <section className="py-20 md:py-24 bg-cplp-bg border-t border-cplp-line">
                <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-14"
                    >
                        <span className="text-xs font-semibold uppercase tracking-wide text-cplp-blue">
                            {t("academy.areas.tag")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">{t("academy.areas.title")}</h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {areas.map((area, index) => {
                            const Icon = area.icon;
                            return (
                                <motion.div
                                    key={area.title}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: index * 0.05 }}
                                >
                                    <Card className="p-6 h-full border border-cplp-line bg-white shadow-none hover:shadow-card transition-shadow text-center rounded-lg">
                                        <div className="w-10 h-10 rounded-md bg-cplp-green/[0.1] flex items-center justify-center mb-4 mx-auto">
                                            <Icon className="w-5 h-5 text-cplp-green" />
                                        </div>
                                        <h3 className="text-sm font-semibold text-cplp-navy">{area.title}</h3>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Como funciona */}
            <section className="py-20 md:py-24 bg-white border-t border-cplp-line">
                <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-14"
                    >
                        <span className="text-xs font-semibold uppercase tracking-wide text-cplp-blue">
                            {t("academy.how.tag")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">{t("academy.how.title")}</h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
                        {comoFunciona.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                >
                                    <Card className="p-3 h-full  border border-cplp-line bg-white shadow-none text-center rounded-lg">
                                        <div className="text-xs font-bold text-cplp-blue mb-3">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>
                                        <div className="w-10 h-10 rounded-md bg-cplp-green/[0.1] flex items-center justify-center mb-4 mx-auto">
                                            <Icon className="w-5 h-5 text-cplp-green" />
                                        </div>
                                        <h3 className="text-sm font-semibold text-cplp-navy mb-2">{step.title}</h3>
                                        <p className="text-xs text-cplp-grey leading-relaxed">{step.description}</p>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA final */}
            <section className="py-20 md:py-24 bg-cplp-navy">
                <div className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                        {t("academy.cta.title")}
                    </h2>
                    <p className="text-white/70 mb-10">
                        {t("academy.cta.description")}
                    </p>
                    <Button asChild size="lg" className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md">
                        <Link href="/contacto" className="flex items-center gap-2">
                            {t("academy.cta.button")}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>

                    <p className="text-xs text-white/40 mt-10">
                        {t("academy.cta.dgert")}
                    </p>
                </div>
            </section>
        </div>
    );
}
