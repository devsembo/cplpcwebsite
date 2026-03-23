'use client';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function FAQ() {
    const faqs = [
        { q: "Quanto tempo demora o desenvolvimento de um projeto?", a: "O prazo de desenvolvimento varia de acordo com a complexidade do projeto. Após a análise inicial, fornecemos um cronograma detalhado com todas as etapas e prazos." },
        { q: "Vocês oferecem suporte após a implementação?", a: "Sim, oferecemos pacotes de suporte e manutenção para garantir que suas soluções continuem funcionando perfeitamente após a implementação." },
        { q: "Como funciona o processo de desenvolvimento?", a: "Trabalhamos com metodologias ágeis, dividindo o projeto em sprints. Mantemos comunicação constante com o cliente, garantindo entregas graduais e ajustes conforme necessário." },
        { q: "Quais tecnologias vocês utilizam?", a: "Utilizamos tecnologias modernas e robustas, selecionadas especificamente para cada projeto com base nas necessidades e requisitos do cliente." },
        { q: "Vocês desenvolvem soluções personalizadas para cada cliente?", a: "Sim, cada solução é desenvolvida de forma personalizada, levando em conta os objetivos e necessidades específicas de cada cliente." },
        { q: "É possível acompanhar o andamento do projeto?", a: "Sim, fornecemos acesso a relatórios e reuniões periódicas para garantir total transparência e alinhamento durante o desenvolvimento." },
        { q: "Oferecem serviços de design e identidade visual?", a: "Sim, contamos com uma equipa que pode desenvolver logotipos, interfaces e identidade visual alinhada à imagem da sua marca." },
        { q: "Trabalham com clientes fora de Portugal?", a: "Sim, atendemos clientes da CPLP e de outras regiões. Toda a comunicação e entrega pode ser feita remotamente com a mesma eficiência." },
    ];

    return (
        <div className="min-h-screen flex flex-col text-foreground">

            {/* Hero Section */}
            <section className="relative py-32 md:py-48 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-fuchsia-500/10 to-emerald-500/10" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(244,63,94,0.25),_transparent_55%)] opacity-70" />

                <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                            Perguntas <span className="bg-linear-to-r from-cyan-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">Frequentes</span>
                        </h1>
                        <p className="text-xl text-slate-300/80">
                            Respostas para algumas das perguntas mais comuns sobre nossos serviços e processos.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Accordion Section */}
            <section className="py-20">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <Accordion type="single" collapsible className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <AccordionItem
                                        value={`item-${index + 1}`}
                                        className="border border-cyan-400/20 rounded-lg bg-white/5 backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:border-cyan-400/40 transition-all duration-300"
                                    >
                                        <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-left text-white hover:text-cyan-400 transition-colors [&[data-state=open]]:text-cyan-400">
                                            {faq.q}
                                        </AccordionTrigger>
                                        <AccordionContent className="px-6 py-4 text-slate-300/80 leading-relaxed">
                                            {faq.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                </motion.div>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>
        </div>
    );
}
