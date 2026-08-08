"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactCTA = () => {
    return (
        <section className="bg-cplp-blue py-20 md:py-24">
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
                    <p className="text-white/80 mb-10">
                        Fale com a nossa equipa e descubra como podemos apoiar a sua empresa
                        ou instituição no espaço CPLP.
                    </p>
                    <Button asChild size="lg" className="bg-white hover:bg-white/90 text-cplp-blue rounded-md">
                        <Link href="/contacto" className="flex items-center gap-2">
                            Fale connosco
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactCTA;
