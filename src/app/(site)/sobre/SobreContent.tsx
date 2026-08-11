"use client";

import React from "react";
import Link from "next/link";
import { Target, Eye, Heart, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import PageHero from "@/components/PageHero";

const team = [
    { name: "Anderson Pedro", role: "Co-Founder" },
    { name: "Emanuel Macaia", role: "Strategic Director" },
    { name: "Aldemir Gunza", role: "Business Developer" },
    { name: "Bruno Ribas", role: "Diretor de Operações & Projetos (COO)" },
    { name: "Leocádio Estrela", role: "Chief Technology Officer (CTO)" },
];

const timeline = [
    {
        year: "2024",
        title: "Fundação",
        description: "A CPLP CONNECT nasce no Porto com a missão de ligar empresas e instituições do espaço CPLP através de tecnologia.",
    },
    {
        year: "2025",
        title: "CPLP CONNECT Academy",
        description: "Lançamos a Academy, a nossa unidade de formação corporativa, e entregamos os primeiros projetos entre Portugal e Angola.",
    },
    {
        year: "Hoje",
        title: "Consolidação",
        description: "Continuamos a crescer com projetos entregues em Portugal e Angola, e uma equipa dedicada à transformação digital do espaço CPLP.",
    },
];

const initials = (name: string) =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

export default function SobreContent({ heroImageUrl }: { heroImageUrl?: string | null }) {
    const { t } = useLanguage();

    const values = [
        { icon: Target, title: t("about.mission.title"), description: t("about.mission.description") },
        { icon: Eye, title: t("about.vision.title"), description: t("about.vision.description") },
        { icon: Heart, title: t("about.values.title"), description: t("about.values.description") },
        { icon: Globe, title: t("about.presence.title"), description: t("about.presence.description") },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <PageHero
                title="Sobre Nós"
                description="Uma equipa dedicada à transformação digital de empresas e instituições do espaço CPLP."
                imageUrl={heroImageUrl}
            />

            {/* Missão, Visão e Valores */}
            <section className="py-16 md:py-20 bg-cplp-bg">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            className="max-w-2xl mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="text-xs font-semibold text-cplp-blue uppercase tracking-wide">
                                {t("about.tag")}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">
                                Missão, Visão e Valores
                            </h2>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {values.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <motion.div
                                        key={value.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.08 }}
                                    >
                                        <Card className="p-6 h-full border border-cplp-line bg-white shadow-none rounded-lg">
                                            <div className="w-10 h-10 rounded-md bg-cplp-blue/[0.08] flex items-center justify-center mb-4">
                                                <Icon className="w-5 h-5 text-cplp-blue" />
                                            </div>
                                            <h3 className="text-base font-bold text-cplp-navy mb-2">{value.title}</h3>
                                            <p className="text-sm text-cplp-grey leading-relaxed">{value.description}</p>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* História */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <motion.h2
                            className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight text-center mb-14"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Nossa História
                        </motion.h2>

                        <div className="space-y-8">
                            {timeline.map((item, index) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="flex gap-6"
                                >
                                    <div className="shrink-0 w-16 text-right">
                                        <span className="text-sm font-bold text-cplp-blue">{item.year}</span>
                                    </div>
                                    <div className="border-l-2 border-cplp-line pl-6 pb-2">
                                        <h3 className="text-lg font-bold text-cplp-navy mb-1">{item.title}</h3>
                                        <p className="text-cplp-grey leading-relaxed">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Equipa */}
            <section className="py-16 md:py-20 bg-cplp-bg">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            className="text-center max-w-2xl mx-auto mb-14"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mb-4">
                                Nossa Equipa
                            </h2>
                            <p className="text-cplp-grey">
                                Os profissionais que fazem da CPLP CONNECT uma consultora de confiança.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                            {team.map((member, index) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.06 }}
                                    className="text-center"
                                >
                                    {/* TODO: substituir por fotografia real da equipa */}
                                    <div
                                        className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg"
                                        style={{ background: "linear-gradient(135deg, #0554F5 0%, #05C480 100%)" }}
                                        aria-hidden="true"
                                    >
                                        {initials(member.name)}
                                    </div>
                                    <h3 className="text-sm font-semibold text-cplp-navy">{member.name}</h3>
                                    <p className="text-xs text-cplp-grey mt-0.5">{member.role}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA final */}
            <section className="bg-cplp-blue py-20 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                            Trabalhe Connosco
                        </h2>
                        <p className="text-white/80 mb-10">
                            Estamos sempre à procura de talentos para se juntarem à nossa
                            equipa e contribuírem para a transformação digital do espaço CPLP.
                        </p>
                        <Button asChild size="lg" className="bg-white hover:bg-white/90 text-cplp-blue rounded-md">
                            <Link href="/contacto" className="flex items-center gap-2">
                                Entre em Contacto
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
