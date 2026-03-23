'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Check, Shield, Code, Settings, Users, Search, Link as LinkIcon } from "lucide-react"; // Importando ícones específicos
import { motion } from "framer-motion"; // Adicionando motion para animação

export default function Services() {

    // Variantes de animação para os blocos de serviço
    const serviceVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    };



    return (
        <div className="min-h-screen flex flex-col text-foreground">

            {/* Hero Section */}
            <section className="relative py-32 md:py-48 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-fuchsia-500/10 to-emerald-500/10" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(244,63,94,0.25),_transparent_55%)] opacity-70" />

                <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                            Nossos <span className="bg-linear-to-r from-cyan-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">Serviços</span>
                        </h1>
                        <p className="text-xl text-slate-300/80">
                            Soluções tecnológicas personalizadas para instituições governamentais e organizações da comunidade CPLP.
                        </p>
                    </div>
                </div>
            </section>


            {/* Services Section (Serviços Principais) */}
            <section className="py-20">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-20">

                        {/* Service 1: Desenvolvimento de Software Institucional */}
                        <motion.div
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={serviceVariants}
                        >
                            <div className="order-2 lg:order-1 max-w-lg mx-auto lg:mx-0">
                                <h2 className="text-3xl font-bold mb-6 text-cyan-400">Desenvolvimento de Software Institucional</h2>
                                <p className="text-slate-300/70 mb-6">
                                    Criamos soluções de software personalizadas para atender às necessidades específicas de instituições governamentais, facilitando a gestão de processos e serviços públicos.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                                        <span>Sistemas de gestão documental e tramitação de processos</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                                        <span>Plataformas de serviços online para cidadãos</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                                        <span>Sistemas de gestão de recursos humanos e patrimoniais</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                                        <span>Soluções de interoperabilidade entre sistemas governamentais</span>
                                    </li>
                                </ul>
                                <Button className="bg-linear-to-r from-cyan-500/60 to-emerald-400/60 text-white font-semibold rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_50px_rgba(45,212,191,0.6)] hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                                    Solicitar Informações
                                </Button>
                            </div>
                            <div className="order-1 lg:order-2 max-w-lg mx-auto lg:mx-0">
                                <div className="rounded-xl overflow-hidden border border-cyan-400/20 shadow-[0_0_40px_rgba(34,211,238,0.2)]">
                                    <Image
                                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80"
                                        alt="Software Governamental"
                                        width={600}
                                        height={400}
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Service 2: Assessoria em Transformação Digital */}
                        <motion.div
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={{
                                hidden: { opacity: 0, x: 50 }, // Mover da direita para a esquerda
                                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
                            }}
                        >
                            <div className="order-2 max-w-lg mx-auto lg:mx-0">
                                <h2 className="text-3xl font-bold mb-6 text-cyan-400">Assessoria em Transformação Digital</h2>
                                <p className="text-slate-300/70 mb-6">
                                    Oferecemos consultoria especializada para auxiliar instituições governamentais no processo de transformação digital, definindo estratégias e implementando soluções.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                                        <span>Diagnóstico e avaliação de maturidade digital</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                                        <span>Elaboração de planos estratégicos de transformação digital</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                                        <span>Reengenharia de processos com foco em digitalização</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                                        <span>Capacitação de equipes para a cultura digital</span>
                                    </li>
                                </ul>
                                <Button className="bg-linear-to-r from-cyan-500/60 to-emerald-400/60 text-white font-semibold rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_50px_rgba(45,212,191,0.6)] hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                                    Solicitar Informações
                                </Button>
                            </div>
                            <div className="order-1 max-w-lg mx-auto lg:mx-0">
                                <div className="rounded-xl overflow-hidden border border-cyan-400/20 shadow-[0_0_40px_rgba(34,211,238,0.2)]">
                                    <Image
                                        src="https://images.unsplash.com/photo-1522071500372-f0fd8c452178?w=600&auto=format&fit=crop&q=80"
                                        alt="Consultoria Tecnológica"
                                        width={600}
                                        height={400}
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Additional Services (Serviços Complementares) */}
            <section className="py-20 bg-white/[0.03] backdrop-blur-sm border-t border-cyan-400/10">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-white">Serviços <span className="text-cyan-400">Complementares</span></h2>
                        <p className="text-lg text-slate-300/70">
                            Além dos nossos serviços principais, oferecemos uma série de soluções complementares para atender às necessidades específicas dos nossos clientes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Data para os cartões complementares */}
                        {[
                            { title: "Segurança da Informação", description: "Implementamos medidas de proteção e conformidade para garantir a segurança dos dados governamentais.", icon: Shield },
                            { title: "Desenvolvimento Mobile", description: "Criamos aplicativos móveis para levar os serviços públicos à palma da mão dos cidadãos.", icon: Code },
                            { title: "Suporte Técnico", description: "Oferecemos suporte técnico contínuo para garantir o bom funcionamento das soluções implementadas.", icon: Settings },
                            { title: "Treinamento", description: "Capacitamos as equipes dos nossos clientes para utilizar de forma eficiente as soluções implementadas.", icon: Users },
                            { title: "Análise de Dados", description: "Desenvolvemos soluções para coleta, processamento e análise de dados governamentais para apoiar a tomada de decisões.", icon: Search },
                            { title: "Integração de Sistemas", description: "Criamos soluções para integrar sistemas legados com novas tecnologias, garantindo a continuidade dos serviços.", icon: LinkIcon },
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
                                }}
                            >
                                {/* Cartão com estilo dark tech */}
                                <Card className="bg-white/5 border border-cyan-400/20 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-all duration-300 h-full">
                                    <CardContent className="p-8">
                                        <div className="h-14 w-14 rounded-xl bg-cyan-600/10 text-cyan-400 flex items-center justify-center mb-5 border border-cyan-400/20">
                                            <service.icon className="h-7 w-7" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-300/70">
                                            {service.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-20 bg-linear-to-r from-cyan-500/10 to-emerald-500/10 text-white border-t border-cyan-400/10">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Vamos Desenvolver a Solução Ideal para sua Instituição, Empresa ou Negócio</h2>
                        <p className="text-xl text-white/80 mb-8">
                            Entre em contacto connosco para discutir como podemos ajudar a sua instituição a transformar-se digitalmente.
                        </p>
                        <Button size="lg" className="bg-linear-to-r from-cyan-500/60 via-sky-500/60 to-emerald-400/60 text-white font-bold rounded-xl shadow-[0_0_40px_rgba(34,211,238,0.5)] hover:shadow-[0_0_60px_rgba(45,212,191,0.7)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 cursor-pointer">
                            <Link href="/contacto">Solicitar Proposta</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}