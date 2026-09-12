"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

// Grelha simples com o nome de cada parceiro — substituir "logo" por um
// caminho de imagem (ex: "/partners/banco-sol.svg") assim que os logótipos
// estiverem disponíveis; o layout do cartão já está preparado para isso.
const PARTNERS = [
    { name: "Banco Sol", logo: null },
    { name: "ANJE Portugal", logo: null },
    { name: "Mirex Angola", logo: null },
    { name: "TROKA", logo: null },
    { name: "Bemvistos", logo: null },
    { name: "Consulado de Moçambique no Porto", logo: null },
] as const;

const Partners = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="max-w-2xl mb-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-xs font-semibold text-cplp-blue uppercase tracking-wide">
                            {t("partners.tag")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">
                            {t("partners.title")}
                        </h2>
                        <p className="text-cplp-grey mt-4">{t("partners.description")}</p>
                    </motion.div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                        {PARTNERS.map((partner, index) => (
                            <motion.div
                                key={partner.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.06 }}
                                className="flex items-center justify-center h-28 rounded-lg border border-cplp-line bg-white hover:shadow-card transition-shadow px-4"
                            >
                                <span className="text-center text-sm font-semibold text-cplp-navy leading-snug">
                                    {partner.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;
