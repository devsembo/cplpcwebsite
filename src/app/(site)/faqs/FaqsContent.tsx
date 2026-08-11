"use client";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";

const faqs = [
    { q: "Quanto tempo demora o desenvolvimento de um projeto?", a: "O prazo varia com a complexidade do projeto. Após a análise inicial, fornecemos um cronograma detalhado com todas as etapas e prazos." },
    { q: "A CPLP CONNECT oferece suporte após a implementação?", a: "Sim, oferecemos pacotes de suporte e manutenção para garantir que as suas soluções continuam a funcionar corretamente após a implementação." },
    { q: "Como funciona o processo de desenvolvimento?", a: "Trabalhamos com metodologias ágeis, dividindo o projeto em sprints. Mantemos comunicação constante com o cliente, garantindo entregas graduais e ajustes conforme necessário." },
    { q: "Que tecnologias utilizam?", a: "Utilizamos tecnologias modernas e robustas, selecionadas especificamente para cada projeto com base nas necessidades e requisitos do cliente." },
    { q: "Desenvolvem soluções personalizadas para cada cliente?", a: "Sim, cada solução é desenvolvida de forma personalizada, tendo em conta os objetivos e necessidades específicas de cada cliente." },
    { q: "É possível acompanhar o andamento do projeto?", a: "Sim, fornecemos acesso a relatórios e reuniões periódicas para garantir total transparência e alinhamento durante o desenvolvimento." },
    { q: "Oferecem serviços de design e identidade visual?", a: "Sim, temos uma equipa que desenvolve logótipos, interfaces e identidade visual alinhada com a imagem da sua marca." },
    { q: "Trabalham com clientes fora de Portugal?", a: "Sim, trabalhamos com empresas e instituições de toda a CPLP, sobretudo Portugal e Angola. Toda a comunicação e entrega pode ser feita remotamente com a mesma eficiência." },
];

export default function FaqsContent({ heroImageUrl }: { heroImageUrl?: string | null }) {
    return (
        <div className="min-h-screen flex flex-col">
            <PageHero
                title="Perguntas Frequentes"
                description="Respostas para algumas das perguntas mais comuns sobre os nossos serviços e processos."
                imageUrl={heroImageUrl}
            />

            <section className="py-16 md:py-20 bg-cplp-bg">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <Accordion type="single" collapsible className="space-y-3">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={faq.q}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: index * 0.04 }}
                                >
                                    <AccordionItem
                                        value={`item-${index + 1}`}
                                        className="border border-cplp-line rounded-lg bg-white overflow-hidden"
                                    >
                                        <AccordionTrigger className="px-6 py-4 text-base font-semibold text-left text-cplp-navy hover:text-cplp-blue transition-colors">
                                            {faq.q}
                                        </AccordionTrigger>
                                        <AccordionContent className="px-6 pb-4 text-cplp-grey leading-relaxed">
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
