"use client";

import React from "react";
import Link from "next/link";
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
import AcademyLockup from "@/components/academy/AcademyLockup";

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
        <div className="min-h-screen flex flex-col text-foreground">
            {/* Hero */}
            <section
                className="relative py-32 md:py-44 overflow-hidden"
                style={{ backgroundColor: "#0B1533" }}
            >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(5,84,245,0.25),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(5,196,128,0.15),_transparent_55%)]" />

                <div className="relative container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center mb-10"
                    >
                        <AcademyLockup theme="dark" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6"
                    >
                        Formação corporativa com ADN tecnológico
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto"
                    >
                        Corporate Training · Executive Education · Digital Transformation —
                        programas desenhados para empresas de Portugal, Angola e restante CPLP.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-10"
                    >
                        <Button size="lg" asChild style={{ backgroundColor: "#0554F5" }} className="text-white font-semibold hover:opacity-90">
                            <Link href="/contacto" className="flex items-center gap-2">
                                Fale connosco sobre um programa à medida
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Quatro formatos */}
            <section className="py-24 bg-background">
                <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#05C480" }}>
                            Como formamos
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">Quatro formatos</h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {formatos.map((formato, index) => {
                            const Icon = formato.icon;
                            return (
                                <motion.div
                                    key={formato.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="p-8 h-full border-2 border-white/10 bg-card/40 backdrop-blur-sm hover:border-[#05C480]/50 transition-colors">
                                        <div
                                            className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                                            style={{ background: "linear-gradient(135deg, #0554F5 0%, #05C480 100%)" }}
                                        >
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">{formato.title}</h3>
                                        <p className="text-white/60 leading-relaxed">{formato.description}</p>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Áreas de formação */}
            <section className="py-24 bg-white/[0.02] border-t border-white/10">
                <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#05C480" }}>
                            Currículo
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">Áreas de formação</h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {areas.map((area, index) => {
                            const Icon = area.icon;
                            return (
                                <motion.div
                                    key={area.title}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <Card className="p-6 h-full border border-white/10 bg-card/40 backdrop-blur-sm hover:border-[#0554F5]/50 transition-colors text-center">
                                        <div
                                            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto"
                                            style={{ backgroundColor: "rgba(5,84,245,0.15)" }}
                                        >
                                            <Icon className="w-6 h-6" style={{ color: "#0554F5" }} />
                                        </div>
                                        <h3 className="text-base font-semibold text-white">{area.title}</h3>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Como funciona */}
            <section className="py-24 bg-background">
                <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#05C480" }}>
                            Metodologia
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">Como funciona</h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {comoFunciona.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <Card className="p-6 h-full border border-white/10 bg-card/40 backdrop-blur-sm text-center">
                                        <div className="text-xs font-bold mb-3" style={{ color: "#05C480" }}>
                                            {String(index + 1).padStart(2, "0")}
                                        </div>
                                        <div
                                            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto"
                                            style={{ backgroundColor: "rgba(5,196,128,0.15)" }}
                                        >
                                            <Icon className="w-6 h-6" style={{ color: "#05C480" }} />
                                        </div>
                                        <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                                        <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA final */}
            <section className="py-24 border-t border-white/10" style={{ backgroundColor: "#0B1533" }}>
                <div className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Fale connosco sobre um programa à medida
                    </h2>
                    <p className="text-white/70 mb-10">
                        Diga-nos os objetivos da sua empresa e desenhamos um programa de formação
                        adequado à sua equipa, mercado e orçamento.
                    </p>
                    <Button size="lg" asChild style={{ backgroundColor: "#05C480" }} className="text-white font-semibold hover:opacity-90">
                        <Link href="/contacto" className="flex items-center gap-2">
                            Contactar a Academy
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>

                    <p className="text-xs text-white/40 mt-10">
                        Certificação DGERT em processo de preparação.
                    </p>
                </div>
            </section>
        </div>
    );
}
