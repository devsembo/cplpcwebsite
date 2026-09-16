"use client";

import Link from "next/link";
import type { JobOpening } from "@prisma/client";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    Briefcase,
    CalendarDays,
    Check,
    Layers,
    MapPin,
    TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import JobApplicationForm from "@/components/careers/JobApplicationForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { localizedJobMode, localizedJobType } from "@/lib/content-labels";

export default function JobDetailContent({
    job,
    otherJobs,
}: {
    job: JobOpening;
    otherJobs: JobOpening[];
}) {
    const { t, language } = useLanguage();

    const facts = [
        { icon: MapPin, label: t("job.location"), value: job.location },
        { icon: Briefcase, label: t("job.department"), value: job.department },
        { icon: Layers, label: t("job.type"), value: localizedJobType(job.type, language) },
        { icon: Layers, label: t("job.mode"), value: localizedJobMode(job.mode, language) },
        { icon: TrendingUp, label: t("job.seniority"), value: job.seniority },
        {
            icon: CalendarDays,
            label: t("careers.openings.deadline"),
            value: job.applyDeadline
                ? new Date(job.applyDeadline).toLocaleDateString(language === "en" ? "en-GB" : "pt-PT")
                : null,
        },
    ].filter((fact) => Boolean(fact.value));

    const lists = [
        { title: t("job.responsibilities"), items: job.responsibilities },
        { title: t("job.requirements"), items: job.requirements },
        { title: t("job.benefits"), items: job.benefits },
    ].filter((list) => list.items.length > 0);

    return (
        <div className="min-h-screen flex flex-col">
            <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-cplp-navy">
                <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/carreiras"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t("job.back")}
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-wrap items-center gap-2 mb-5">
                            <Badge className="bg-cplp-blue hover:bg-cplp-blue">
                                {localizedJobType(job.type, language)}
                            </Badge>
                            <Badge variant="outline" className="border-white/30 text-white/80">
                                {localizedJobMode(job.mode, language)}
                            </Badge>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
                            {job.title}
                        </h1>
                        <p className="text-lg text-white/70 max-w-3xl leading-relaxed">{job.summary}</p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 md:py-20 bg-white">
                <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-10">
                            <div>
                                <h2 className="text-2xl font-extrabold text-cplp-navy tracking-tight mb-5">
                                    {t("job.about")}
                                </h2>
                                <div
                                    className="article-content max-w-none"
                                    dangerouslySetInnerHTML={{ __html: job.description }}
                                />
                            </div>

                            {lists.map((list) => (
                                <div key={list.title}>
                                    <h2 className="text-2xl font-extrabold text-cplp-navy tracking-tight mb-4">
                                        {list.title}
                                    </h2>
                                    <ul className="space-y-2.5">
                                        {list.items.map((item) => (
                                            <li key={item} className="flex items-start gap-3">
                                                <Check className="w-4 h-4 text-cplp-green mt-1 shrink-0" />
                                                <span className="text-cplp-ink leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <aside className="lg:sticky lg:top-28 lg:self-start">
                            <Card className="border border-cplp-line bg-white shadow-none rounded-lg p-6">
                                <h2 className="text-base font-bold text-cplp-navy mb-4">{t("job.details")}</h2>
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
                                <Button
                                    asChild
                                    className="w-full bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md"
                                >
                                    <a href="#candidatura">
                                        {t("careers.form.submit")}
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </Button>
                            </Card>
                        </aside>
                    </div>
                </div>
            </section>

            <section id="candidatura" className="py-16 md:py-20 bg-cplp-bg border-t border-cplp-line scroll-mt-24">
                <div className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-cplp-navy tracking-tight mb-4">
                            {t("job.apply.title")}
                        </h2>
                        <p className="text-cplp-grey leading-relaxed">{t("job.apply.description")}</p>
                    </div>

                    <Card className="border border-cplp-line bg-white shadow-none rounded-lg p-6 md:p-10">
                        <JobApplicationForm jobId={job.id} />
                    </Card>
                </div>
            </section>

            {otherJobs.length > 0 && (
                <section className="py-16 md:py-20 bg-white border-t border-cplp-line">
                    <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-extrabold text-cplp-navy tracking-tight mb-8">
                            {t("careers.openings.title")}
                        </h2>
                        <div className="grid sm:grid-cols-3 gap-5">
                            {otherJobs.map((other) => (
                                <Link key={other.id} href={`/carreiras/${other.slug}`} className="group">
                                    <Card className="h-full p-6 border border-cplp-line bg-white shadow-none hover:shadow-card transition-shadow rounded-lg">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-cplp-blue mb-2">
                                            {localizedJobType(other.type, language)}
                                        </p>
                                        <h3 className="font-bold text-cplp-navy mb-2 group-hover:text-cplp-blue transition-colors">
                                            {other.title}
                                        </h3>
                                        <p className="text-sm text-cplp-grey">{other.location}</p>
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
