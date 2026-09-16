"use client";

import React from "react";
import type { Partner } from "@prisma/client";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

// Os parceiros são geridos no admin (/admin/parceiros). Cada cartão mostra o
// logótipo quando existe e, caso contrário, o nome do parceiro.
const Partners = ({ partners }: { partners: Partner[] }) => {
    const { t } = useLanguage();

    if (partners.length === 0) return null;

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
                        {partners.map((partner, index) => {
                            const content = partner.logoUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={partner.logoUrl}
                                    alt={partner.name}
                                    className="max-h-14 max-w-[80%] object-contain"
                                />
                            ) : (
                                <span className="text-center text-sm font-semibold text-cplp-navy leading-snug">
                                    {partner.name}
                                </span>
                            );

                            return (
                                <motion.div
                                    key={partner.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.06 }}
                                    className="flex items-center justify-center h-28 rounded-lg border border-cplp-line bg-white hover:shadow-card transition-shadow px-4"
                                >
                                    {partner.websiteUrl ? (
                                        <a
                                            href={partner.websiteUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center justify-center w-full h-full"
                                        >
                                            {content}
                                        </a>
                                    ) : (
                                        content
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;
