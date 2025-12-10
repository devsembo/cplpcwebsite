'use client';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card"; // Importando Card
import { Target, Eye, Heart, Globe } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Adicionando motion
import { useLanguage } from "@/contexts/LanguageContext"; // Adicionando i18n hook
import Image from 'next/image';

export default function AboutUs() {
    const { t } = useLanguage();

    // Data de valores (Missão, Visão, etc. - do seu componente About original)
    const values = [
        {
            icon: Target,
            title: t('about.mission.title'),
            description: t('about.mission.description')
        },
        {
            icon: Eye,
            title: t('about.vision.title'),
            description: t('about.vision.description')
        },
        {
            icon: Heart,
            title: t('about.values.title'),
            description: t('about.values.description')
        },
        {
            icon: Globe,
            title: t('about.presence.title'),
            description: t('about.presence.description')
        }
    ];

    // Variantes de animação
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const team = [
        { name: "Anderson Pedro", role: "Co-Founder & CTO", role_en: "Co-Founder & Chief Technology Officer", image: "/team/anderson.jpg" },
        { name: "Nuno Marques", role: "Diretor-Executivo (CEO)", role_en: "Chief Executive Officer", image: "/team/nuno.jpg" },
        { name: "William Vieira", role: "Diretor de Operações & Projetos (COO)", role_en: "Chief Operations Officer", image: "/team/william.jpg" },
        { name: "Valter Micas", role: "Diretor Comercial (CCO)", role_en: "Chief Commercial Officer", image: "/team/valter.jpg" },
    ];

    const heroBackground = {
        backgroundImage: "url('/us-background.jpg')", // Usar um fundo tech
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0A192F] text-gray-100">

            {/* ------------------------------------------------
            // 1. HERO SECTION
            // ------------------------------------------------ */}
            <section
                className="relative py-32 md:py-48"
                style={heroBackground}
            >
                <div className="absolute inset-0 bg-[#0A192F]/80 backdrop-blur-sm"></div>

                <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h1 className="text-5xl font-bold mb-4">
                            <span className="text-cyan-400">Sobre</span> Nós
                        </h1>
                        <p className="text-xl text-gray-300">
                            Uma equipe dedicada ao desenvolvimento de soluções tecnológicas inovadoras para a comunidade CPLP.
                        </p>
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------
            // 2. MISSÃO, VISÃO & VALORES (Valores do componente About.tsx)
            // ------------------------------------------------ */}
            <section className="py-20 md:py-32 bg-[#0C2036]">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-block px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full mb-4 backdrop-blur-sm">
                                <span className="text-sm font-mono text-cyan-400">{t('about.tag') || "Nossa Essência"}</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                                Missão, Visão e <span className="text-cyan-400">Valores</span>
                            </h2>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                                {t('about.description') || "Nossos pilares fundamentais para impulsionar a transformação digital na CPLP."}
                            </p>
                        </motion.div>

                        {/* Values grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
                            {values.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="group"
                                    >
                                        <Card className="p-4 border-2 border-[#1E3050] bg-[#102A43] hover:border-cyan-400/50 transition-all duration-300 shadow-xl shadow-black/30 h-full lg:w-72">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-cyan-600/10 rounded-xl border border-cyan-400/30">
                                                    <Icon className="w-6 h-6 text-cyan-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-smooth">{value.title}</h3>
                                                    <p className="text-gray-400 leading-relaxed text-sm">{value.description}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------
            // 3. OUR STORY (Timeline)
            // ------------------------------------------------ */}
            <section className="py-20 md:py-32 bg-[#0A192F]">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold mb-16 text-center text-white">Nossa <span className='text-cyan-400'>História</span></h2>

                        <div className="space-y-12 relative">
                            {/* Linha vertical decorativa (simulada) */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#1E3050] transform -translate-x-1/2 hidden md:block"></div>

                            {[
                                { year: "2024", title: "Fundação", desc: "A CPLP Connect foi fundada com a visão de conectar tecnologicamente os países da Comunidade de Língua Portuguesa. Começamos com uma pequena equipe de desenvolvedores em Lisboa." },
                                { year: "2025", title: "Parceria Governamental", desc: "Iniciamos parcerias com instituições governamentais com Angola e Moçambique, expandindo nossas operações e desenvolvendo os primeiros sistemas para gestão Consular." },
                                { year: "Hoje", title: "Consolidação", desc: "Atualmente, somos uma empresa em crescimento no mercado, com projetos implementados em diversos consulados de Países da CPLP e uma equipe de mais de 25 especialistas em tecnologia." }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`flex gap-8 relative items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.5 }}
                                    variants={itemVariants}
                                >
                                    {/* Círculo do Tempo */}
                                    <div className="hidden md:flex w-16 h-16 rounded-full bg-cyan-600/20 border-4 border-[#0A192F] items-center justify-center text-cyan-400 text-lg font-bold shrink-0 absolute left-1/2 top-0 transform -translate-x-1/2">
                                        {item.year}
                                    </div>

                                    {/* Conteúdo */}
                                    <div className={`md:w-5/12 p-4 ${index % 2 === 1 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                                        <h3 className="text-2xl font-bold text-white mb-2">{item.year} - {item.title}</h3>
                                        <p className="text-gray-400">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------
            // 4. TEAM SECTION
            // ------------------------------------------------ */}
            <section className="py-20 md:py-32 bg-[#0C2036] border-t border-[#1E3050]">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-white">Nossa <span className='text-cyan-400'>Equipa</span></h2>
                        <p className="text-gray-400">
                            Conheça os profissionais dedicados que fazem da CPLP Connect uma empresa inovadora e de excelência.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                className="text-center group"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.8 },
                                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: index * 0.1 } },
                                }}
                            >
                                {/* Foto (Substitua por componente Image com src real) */}
                                <div className="rounded-xl overflow-hidden w-full max-w-[150px] aspect-square mx-auto mb-4 border-4 border-cyan-400/50 group-hover:border-cyan-400 transition-colors duration-300">
                                    <Image
                                        src={member.image || 'https://images.unsplash.com/photo-1560250097-fb55913e6d19?w=300&fit=crop'} // Placeholder
                                        alt={member.name}
                                        width={150}
                                        height={150}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                                <p className="text-cyan-400 font-medium text-sm">{member.role}</p>
                                <p className="text-gray-500 text-xs">{member.role_en}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ------------------------------------------------
            // 5. CONTACT CTA
            // ------------------------------------------------ */}
            <section className="py-20 bg-gradient-to-r from-[#102A43] to-[#0A192F] text-white border-t border-[#1E3050]">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Trabalhe Connosco</h2>
                        <p className="text-xl text-white/80 mb-8">
                            Estamos sempre à procura de talentos para se juntar à nossa equipa e contribuir para o desenvolvimento tecnológico da comunidade CPLP.
                        </p>
                        <Button size="lg" className="bg-cyan-400 text-gray-900 hover:bg-cyan-300 font-bold shadow-xl shadow-cyan-400/40 transition-all duration-300">
                            <Link href="/contacto">Entre em Contacto</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}