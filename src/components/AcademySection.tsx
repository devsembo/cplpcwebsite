"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AcademySection = () => {
    return (
        <section id="academy" className="bg-cplp-navy py-20 md:py-28">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center mb-8"
                    >
                        <Image
                            src="/brand/svg/academy-lockup-h-dark.svg"
                            alt="CPLP CONNECT Academy"
                            width={310}
                            height={90}
                            className="h-12 md:h-14 w-auto"
                        />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-5"
                    >
                        Formação corporativa com ADN tecnológico
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-white/70 mb-10 leading-relaxed"
                    >
                        Corporate Training, Executive Education e programas de transformação
                        digital para empresas de Portugal, Angola e restante CPLP.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        <Button asChild size="lg" className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md">
                            <Link href="/academy" className="flex items-center gap-2">
                                Conhecer a Academy
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AcademySection;
