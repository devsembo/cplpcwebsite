"use client";

import Link from "next/link";
import type { JobOpening } from "@prisma/client";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, CalendarDays, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { localizedJobMode, localizedJobType } from "@/lib/content-labels";

export default function OpeningsSection({ jobs }: { jobs: JobOpening[] }) {
    const { t, language } = useLanguage();

    return (
        <section id="vagas" className="py-16 md:py-20 bg-white border-t border-cplp-line scroll-mt-24">
            <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-semibold uppercase tracking-wide text-cplp-blue">
                        {t("careers.openings.tag")}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">
                        {t("careers.openings.title")}
                    </h2>
                </motion.div>

                {jobs.length === 0 ? (
                    <Card className="border border-cplp-line bg-cplp-bg shadow-none rounded-lg p-10 text-center">
                        <p className="text-cplp-grey">{t("careers.openings.empty")}</p>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {jobs.map((job, index) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: Math.min(index, 5) * 0.05 }}
                            >
                                <Link href={`/carreiras/${job.slug}`} className="group block">
                                    <Card className="border border-cplp-line bg-white shadow-none hover:shadow-card transition-shadow rounded-lg p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                                    <Badge variant="secondary" className="font-normal">
                                                        {localizedJobType(job.type, language)}
                                                    </Badge>
                                                    <Badge variant="outline" className="font-normal">
                                                        {localizedJobMode(job.mode, language)}
                                                    </Badge>
                                                </div>
                                                <h3 className="text-lg font-bold text-cplp-navy group-hover:text-cplp-blue transition-colors">
                                                    {job.title}
                                                </h3>
                                                <p className="text-sm text-cplp-grey leading-relaxed mt-1.5 line-clamp-2">
                                                    {job.summary}
                                                </p>
                                                <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-xs text-cplp-grey">
                                                    <span className="flex items-center gap-1.5">
                                                        <MapPin className="w-3.5 h-3.5" />
                                                        {job.location}
                                                    </span>
                                                    {job.department && (
                                                        <span className="flex items-center gap-1.5">
                                                            <Briefcase className="w-3.5 h-3.5" />
                                                            {job.department}
                                                        </span>
                                                    )}
                                                    {job.applyDeadline && (
                                                        <span className="flex items-center gap-1.5">
                                                            <CalendarDays className="w-3.5 h-3.5" />
                                                            {t("careers.openings.deadline")}{" "}
                                                            {new Date(job.applyDeadline).toLocaleDateString(
                                                                language === "en" ? "en-GB" : "pt-PT",
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-cplp-blue shrink-0">
                                                {t("careers.openings.view")}
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                            </span>
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
