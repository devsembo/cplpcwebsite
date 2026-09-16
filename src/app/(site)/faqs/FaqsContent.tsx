"use client";
import type { Faq } from "@prisma/client";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { pickLocale } from "@/lib/i18n-content";


export default function FaqsContent({
    heroImageUrl,
    faqs,
}: {
    heroImageUrl?: string | null;
    faqs: Faq[];
}) {
    const { language } = useLanguage();

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
                                    key={faq.id}
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
                                            {pickLocale(language, faq.question, faq.questionEn)}
                                        </AccordionTrigger>
                                        <AccordionContent className="px-6 pb-4 text-cplp-grey leading-relaxed">
                                            {pickLocale(language, faq.answer, faq.answerEn)}
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
