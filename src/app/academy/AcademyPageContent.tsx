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

const formatos = [
    {
        icon: Building2,
        title: "In-Company Angola",
        description: "Formação ministrada nas instalações do cliente em Angola, adaptada à realidade e aos processos internos da empresa.",
    },
    {
        icon: GraduationCap,
        title: "Executive Program Portugal",
        description: "Imersões executivas no Porto e em Lisboa, com formato intensivo para equipas de liderança e gestão.",
    },
    {
        icon: Laptop,
        title: "Online & Híbrido",
        description: "Sessões ao vivo combinadas com uma plataforma digital de aprendizagem, para equipas distribuídas geograficamente.",
    },
    {
        icon: Repeat,
        title: "Corporate Exchange",
        description: "Programas de intercâmbio de equipas entre Portugal e Angola, promovendo partilha de conhecimento entre mercados.",
    },
];

const areas = [
    { icon: Users, title: "Liderança & Gestão" },
    { icon: Cpu, title: "Transformação Digital" },
    { icon: Database, title: "Dados & IA" },
    { icon: Shield, title: "Cibersegurança" },
    { icon: ClipboardList, title: "Gestão de Projetos" },
    { icon: Handshake, title: "Vendas & Negociação" },
    { icon: Calculator, title: "Finanças para não-financeiros" },
    { icon: Scale, title: "Compliance & Risco" },
];

const comoFunciona = [
    { icon: Search, title: "Diagnóstico", description: "Levantamento das necessidades de formação e dos objetivos da empresa." },
    { icon: PenTool, title: "Desenho do Programa", description: "Construção de um programa formativo à medida, com os formatos e áreas certas." },
    { icon: GraduationCap, title: "Formação", description: "Execução do programa, em regime presencial, online ou híbrido." },
    { icon: CheckCircle2, title: "Avaliação", description: "Avaliação de conhecimentos e resultados de aprendizagem dos participantes." },
    { icon: QrCode, title: "Certificado", description: "Emissão de certificado com código único e verificação online por QR." },
];

export default function AcademyPageContent() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero */}
            <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-cplp-navy">
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
                        Formação corporativa com ADN tecnológico
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto"
                    >
                        Corporate Training · Executive Education · Digital Transformation —
                        programas desenhados para empresas de Portugal, Angola e restante CPLP.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="mt-10"
                    >
                        <Button asChild size="lg" className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md">
                            <Link href="/contacto" className="flex items-center gap-2">
                                Fale connosco sobre um programa à medida
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
                            Como formamos
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">Quatro formatos</h2>
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
                            Currículo
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">Áreas de formação</h2>
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
                            Metodologia
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">Como funciona</h2>
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
                                    <Card className="p-6 h-full border border-cplp-line bg-white shadow-none text-center rounded-lg">
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
                        Fale connosco sobre um programa à medida
                    </h2>
                    <p className="text-white/70 mb-10">
                        Diga-nos os objetivos da sua empresa e desenhamos um programa de formação
                        adequado à sua equipa, mercado e orçamento.
                    </p>
                    <Button asChild size="lg" className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md">
                        <Link href="/contacto" className="flex items-center gap-2">
                            Contactar a Academy
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>

                    <p className="text-xs text-white/40 mt-10">
                        Entidade em processo de preparação para certificação DGERT.
                    </p>
                </div>
            </section>
        </div>
    );
}
