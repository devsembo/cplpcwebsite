"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AcademyLockup from "@/components/academy/AcademyLockup";

const formatos = ["In-Company Angola", "Executive Program Portugal", "Online & Híbrido", "Corporate Exchange"];

const AcademySection = () => {
    return (
        <section
            id="academy"
            className="relative py-24 md:py-32 overflow-hidden"
            style={{ backgroundColor: "#0B1533" }}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(5,84,245,0.2),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(5,196,128,0.15),_transparent_55%)]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center mb-8"
                    >
                        <AcademyLockup theme="dark" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        Formação corporativa com ADN tecnológico
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-white/70 mb-10 max-w-2xl mx-auto"
                    >
                        A nossa unidade de formação executiva para empresas de Portugal, Angola
                        e restante CPLP — em quatro formatos, do In-Company ao Corporate Exchange.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-3 mb-10"
                    >
                        {formatos.map((formato) => (
                            <span
                                key={formato}
                                className="px-4 py-2 rounded-full text-sm font-medium text-white/80 border border-white/15 bg-white/5"
                            >
                                {formato}
                            </span>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Button size="lg" asChild style={{ backgroundColor: "#05C480" }} className="text-white font-semibold hover:opacity-90">
                            <Link href="/academy" className="flex items-center gap-2">
                                Conhecer a Academy
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AcademySection;
