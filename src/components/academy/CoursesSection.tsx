"use client";

import Link from "next/link";
import Image from "next/image";
import type { Course } from "@prisma/client";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock, MapPin, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { localizedCourseFormat } from "@/lib/content-labels";

function formatDate(date: Date, language: string): string {
    return new Date(date).toLocaleDateString(language === "en" ? "en-GB" : "pt-PT", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export default function CoursesSection({ courses }: { courses: Course[] }) {
    const { t, language } = useLanguage();

    return (
        <section id="cursos" className="py-20 md:py-24 bg-white border-t border-cplp-line">
            <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mb-14"
                >
                    <span className="text-xs font-semibold uppercase tracking-wide text-cplp-blue">
                        {t("academy.courses.tag")}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">
                        {t("academy.courses.title")}
                    </h2>
                    <p className="text-cplp-grey mt-4 leading-relaxed">{t("academy.courses.description")}</p>
                </motion.div>

                {courses.length === 0 ? (
                    <Card className="border border-cplp-line bg-cplp-bg shadow-none rounded-lg p-10 text-center">
                        <p className="text-cplp-grey mb-6">{t("academy.courses.empty")}</p>
                        <div>
                            <Button asChild className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md">
                                <Link href="/contacto">{t("academy.cta.button")}</Link>
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.06 }}
                            >
                                <Link href={`/academy/${course.slug}`} className="group block h-full">
                                    <Card className="h-full flex flex-col overflow-hidden border border-cplp-line bg-white shadow-none hover:shadow-card transition-shadow rounded-lg p-0">
                                        <div className="relative h-40 bg-cplp-navy/5 shrink-0">
                                            {course.imageUrl ? (
                                                <Image
                                                    src={course.imageUrl}
                                                    alt={course.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cplp-blue/10 to-cplp-green/10">
                                                    <span className="text-cplp-navy/25 font-extrabold text-2xl tracking-tight">
                                                        Academy
                                                    </span>
                                                </div>
                                            )}
                                            {course.featured && (
                                                <Badge className="absolute top-3 left-3 bg-cplp-green hover:bg-cplp-green">
                                                    {t("academy.courses.featured")}
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="p-6 flex flex-col flex-1">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-cplp-blue mb-2">
                                                {localizedCourseFormat(course.format, language)}
                                            </p>
                                            <h3 className="text-lg font-bold text-cplp-navy mb-2 group-hover:text-cplp-blue transition-colors">
                                                {course.title}
                                            </h3>
                                            <p className="text-sm text-cplp-grey leading-relaxed line-clamp-3 mb-4">
                                                {course.summary}
                                            </p>

                                            <ul className="space-y-1.5 text-xs text-cplp-grey mt-auto">
                                                <li className="flex items-center gap-2">
                                                    <Tag className="w-3.5 h-3.5 shrink-0" />
                                                    {course.area}
                                                </li>
                                                {course.durationLabel && (
                                                    <li className="flex items-center gap-2">
                                                        <Clock className="w-3.5 h-3.5 shrink-0" />
                                                        {course.durationLabel}
                                                    </li>
                                                )}
                                                {course.location && (
                                                    <li className="flex items-center gap-2">
                                                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                                                        {course.location}
                                                    </li>
                                                )}
                                                {course.startDate && (
                                                    <li className="flex items-center gap-2">
                                                        <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                                                        {t("academy.courses.startsOn")}{" "}
                                                        {formatDate(course.startDate, language)}
                                                    </li>
                                                )}
                                            </ul>

                                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-cplp-blue mt-5">
                                                {t("academy.courses.view")}
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
