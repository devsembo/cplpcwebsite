"use client";

import Link from "next/link";
import Image from "next/image";
import type { Course } from "@prisma/client";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Check,
    Clock,
    Globe,
    Layers,
    MapPin,
    Tag,
    Ticket,
    TrendingUp,
    Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EnrollmentForm from "@/components/academy/EnrollmentForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { localizedCourseFormat } from "@/lib/content-labels";

function formatDate(date: Date, language: string): string {
    return new Date(date).toLocaleDateString(language === "en" ? "en-GB" : "pt-PT", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export default function CourseDetailContent({
    course,
    relatedCourses,
}: {
    course: Course;
    relatedCourses: Course[];
}) {
    const { t, language } = useLanguage();

    const facts = [
        { icon: Layers, label: t("course.format"), value: localizedCourseFormat(course.format, language) },
        { icon: Tag, label: t("course.area"), value: course.area },
        { icon: Clock, label: t("course.duration"), value: course.durationLabel },
        { icon: CalendarDays, label: t("course.schedule"), value: course.scheduleLabel },
        {
            icon: CalendarDays,
            label: t("course.start"),
            value: course.startDate ? formatDate(course.startDate, language) : null,
        },
        { icon: MapPin, label: t("course.location"), value: course.location },
        { icon: TrendingUp, label: t("course.level"), value: course.level },
        { icon: Globe, label: t("course.language"), value: course.language },
        { icon: Users, label: t("course.seats"), value: course.seats ? String(course.seats) : null },
        { icon: Ticket, label: t("course.price"), value: course.priceLabel },
    ].filter((fact) => Boolean(fact.value));

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-cplp-navy overflow-hidden">
                {course.imageUrl && (
                    <>
                        <Image
                            src={course.imageUrl}
                            alt=""
                            fill
                            priority
                            className="object-cover opacity-30"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-cplp-navy/60" />
                    </>
                )}
                <div className="relative container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/academy"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t("course.back")}
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-wrap items-center gap-2 mb-5">
                            <Badge className="bg-cplp-blue hover:bg-cplp-blue">
                                {localizedCourseFormat(course.format, language)}
                            </Badge>
                            <Badge variant="outline" className="border-white/30 text-white/80">
                                {course.area}
                            </Badge>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
                            {course.title}
                        </h1>
                        <p className="text-lg text-white/70 max-w-3xl leading-relaxed">{course.summary}</p>
                    </motion.div>
                </div>
            </section>

            {/* Conteúdo */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-10">
                            <div>
                                <h2 className="text-2xl font-extrabold text-cplp-navy tracking-tight mb-5">
                                    {t("course.about")}
                                </h2>
                                <div
                                    className="article-content max-w-none"
                                    dangerouslySetInnerHTML={{ __html: course.description }}
                                />
                            </div>

                            {course.highlights.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-extrabold text-cplp-navy tracking-tight mb-5">
                                        {t("course.highlights")}
                                    </h2>
                                    <ul className="grid sm:grid-cols-2 gap-3">
                                        {course.highlights.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-3 p-4 rounded-lg border border-cplp-line bg-cplp-bg"
                                            >
                                                <Check className="w-5 h-5 text-cplp-green mt-0.5 shrink-0" />
                                                <span className="text-sm text-cplp-ink leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {course.targetAudience && (
                                <div>
                                    <h2 className="text-2xl font-extrabold text-cplp-navy tracking-tight mb-3">
                                        {t("course.audience")}
                                    </h2>
                                    <p className="text-cplp-grey leading-relaxed">{course.targetAudience}</p>
                                </div>
                            )}

                            {course.requirements.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-extrabold text-cplp-navy tracking-tight mb-3">
                                        {t("course.requirements")}
                                    </h2>
                                    <ul className="space-y-2">
                                        {course.requirements.map((item) => (
                                            <li key={item} className="flex items-start gap-2.5">
                                                <Check className="w-4 h-4 text-cplp-blue mt-1 shrink-0" />
                                                <span className="text-cplp-ink leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <aside className="lg:sticky lg:top-28 lg:self-start">
                            <Card className="border border-cplp-line bg-white shadow-none rounded-lg p-6">
                                <h2 className="text-base font-bold text-cplp-navy mb-4">
                                    {t("course.details")}
                                </h2>
                                <dl className="space-y-3 mb-6">
                                    {facts.map((fact) => {
                                        const Icon = fact.icon;
                                        return (
                                            <div key={fact.label} className="flex items-start gap-3">
                                                <Icon className="w-4 h-4 text-cplp-blue mt-0.5 shrink-0" strokeWidth={1.5} />
                                                <div className="min-w-0">
                                                    <dt className="text-xs text-cplp-grey">{fact.label}</dt>
                                                    <dd className="text-sm font-medium text-cplp-navy">{fact.value}</dd>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </dl>

                                {course.registrationUrl ? (
                                    <Button
                                        asChild
                                        className="w-full bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md"
                                    >
                                        <a href={course.registrationUrl} target="_blank" rel="noreferrer">
                                            {t("enroll.external")}
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </Button>
                                ) : (
                                    <Button
                                        asChild
                                        className="w-full bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md"
                                    >
                                        <a href="#inscricao">
                                            {t("enroll.external")}
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </Button>
                                )}

                                {course.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-cplp-line">
                                        {course.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="font-normal">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Inscrição */}
            {!course.registrationUrl && (
                <section id="inscricao" className="py-16 md:py-20 bg-cplp-bg border-t border-cplp-line scroll-mt-24">
                    <div className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-4xl font-extrabold text-cplp-navy tracking-tight mb-4">
                                {t("enroll.title")}
                            </h2>
                            <p className="text-cplp-grey leading-relaxed">{t("enroll.description")}</p>
                        </div>

                        <Card className="border border-cplp-line bg-white shadow-none rounded-lg p-6 md:p-10">
                            <EnrollmentForm courseId={course.id} />
                        </Card>
                    </div>
                </section>
            )}

            {/* Outros cursos */}
            {relatedCourses.length > 0 && (
                <section className="py-16 md:py-20 bg-white border-t border-cplp-line">
                    <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-extrabold text-cplp-navy tracking-tight mb-8">
                            {t("course.related")}
                        </h2>
                        <div className="grid sm:grid-cols-3 gap-5">
                            {relatedCourses.map((related) => (
                                <Link key={related.id} href={`/academy/${related.slug}`} className="group">
                                    <Card className="h-full p-6 border border-cplp-line bg-white shadow-none hover:shadow-card transition-shadow rounded-lg">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-cplp-blue mb-2">
                                            {localizedCourseFormat(related.format, language)}
                                        </p>
                                        <h3 className="font-bold text-cplp-navy mb-2 group-hover:text-cplp-blue transition-colors">
                                            {related.title}
                                        </h3>
                                        <p className="text-sm text-cplp-grey line-clamp-2">{related.summary}</p>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
