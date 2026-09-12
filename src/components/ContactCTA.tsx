"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactCTA = () => {
    return (
        <section className="relative overflow-hidden bg-[#050B1F] py-20 md:py-28">
            <div
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(5,84,245,0.35), transparent 65%), linear-gradient(180deg, #050B1F 0%, #060C22 100%)",
                }}
            />
            <motion.div
                aria-hidden
                className="absolute -z-10 top-1/2 left-1/2 w-[560px] h-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
                style={{ background: "rgba(5,196,128,0.18)" }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay bg-noise" />
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                        Vamos transformar o seu negócio?
                    </h2>
                    <p className="text-white/70 mb-10">
                        Fale com a nossa equipa e descubra como podemos apoiar a sua empresa,
                        instituição ou banco em Portugal, Angola e no espaço CPLP.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="rounded-md bg-cplp-blue hover:bg-cplp-blue-hover text-white"
                    >
                        <Link href="/contacto" className="flex items-center gap-2">
                            Pedir uma proposta
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactCTA;
