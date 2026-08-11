"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Rocket, GraduationCap, Users, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { api } from "@/services/api";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CarreirasContent() {
    const { t } = useLanguage();

    const whyUs = [
        { icon: Rocket, title: t("careers.why.impact.title"), description: t("careers.why.impact.description") },
        { icon: GraduationCap, title: t("careers.why.growth.title"), description: t("careers.why.growth.description") },
        { icon: Users, title: t("careers.why.team.title"), description: t("careers.why.team.description") },
        { icon: Clock, title: t("careers.why.flex.title"), description: t("careers.why.flex.description") },
    ];

    const benefits = [
        t("careers.benefits.item1"),
        t("careers.benefits.item2"),
        t("careers.benefits.item3"),
        t("careers.benefits.item4"),
        t("careers.benefits.item5"),
        t("careers.benefits.item6"),
    ];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        area: "",
        cvLink: "",
        message: "",
    });
    const [consent, setConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!consent) {
            toast.error(t("careers.form.consentError"));
            return;
        }

        setIsSubmitting(true);

        try {
            await api.post("/public/contact", {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                organization: formData.area,
                subject: "Candidatura Espontânea — Careers",
                message: `CV / LinkedIn / Portefólio: ${formData.cvLink}\n\n${formData.message}`,
                consent: true,
            });
            toast.success(t("careers.form.successTitle"), {
                description: t("careers.form.successDescription"),
            });
            setFormData({ name: "", email: "", phone: "", area: "", cvLink: "", message: "" });
            setConsent(false);
        } catch {
            toast.error(t("careers.form.errorDescription"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <PageHero title={t("careers.hero.title")} description={t("careers.hero.description")} />

            {/* Porque trabalhar connosco */}
            <section className="py-16 md:py-20 bg-cplp-bg border-t border-cplp-line">
                <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-14"
                    >
                        <span className="text-xs font-semibold uppercase tracking-wide text-cplp-blue">
                            {t("careers.why.tag")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">
                            {t("careers.why.title")}
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {whyUs.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                >
                                    <Card className="p-6 h-full border border-cplp-line bg-white shadow-none hover:shadow-card transition-shadow rounded-lg">
                                        <div className="w-10 h-10 rounded-md bg-cplp-blue/[0.08] flex items-center justify-center mb-4">
                                            <Icon className="w-5 h-5 text-cplp-blue" />
                                        </div>
                                        <h3 className="text-base font-bold text-cplp-navy mb-2">{item.title}</h3>
                                        <p className="text-sm text-cplp-grey leading-relaxed">{item.description}</p>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Benefícios */}
            <section className="py-16 md:py-20 bg-white border-t border-cplp-line">
                <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <span className="text-xs font-semibold uppercase tracking-wide text-cplp-blue">
                            {t("careers.benefits.tag")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-cplp-navy tracking-tight mt-3">
                            {t("careers.benefits.title")}
                        </h2>
                    </motion.div>

                    <motion.div
                        className="grid sm:grid-cols-2 gap-x-8 gap-y-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
                    >
                        {benefits.map((benefit) => (
                            <motion.div
                                key={benefit}
                                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                                className="flex items-start gap-3"
                            >
                                <CheckCircle2 className="w-5 h-5 text-cplp-green shrink-0 mt-0.5" />
                                <span className="text-cplp-ink">{benefit}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Candidatura espontânea */}
            <section className="py-16 md:py-20 bg-cplp-bg border-t border-cplp-line">
                <div className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-10"
                    >
                        <span className="text-xs font-semibold uppercase tracking-wide text-cplp-blue">
                            {t("careers.form.tag")}
                        </span>
                        <h2 className="text-2xl md:text-4xl font-extrabold text-cplp-navy tracking-tight mt-3 mb-4">
                            {t("careers.form.title")}
                        </h2>
                        <p className="text-cplp-grey leading-relaxed max-w-2xl mx-auto">
                            {t("careers.form.description")}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                            <CardContent className="p-6 md:p-10">
                                <h3 className="text-xl font-bold text-cplp-navy mb-8">{t("careers.form.formTitle")}</h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-cplp-navy">{t("careers.form.name")}</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder={t("careers.form.namePlaceholder")}
                                                required
                                                className="border-cplp-line rounded-md"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-cplp-navy">{t("careers.form.email")}</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder={t("careers.form.emailPlaceholder")}
                                                required
                                                className="border-cplp-line rounded-md"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-cplp-navy">{t("careers.form.phone")}</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder={t("careers.form.phonePlaceholder")}
                                                className="border-cplp-line rounded-md"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="area" className="text-cplp-navy">{t("careers.form.area")}</Label>
                                            <Input
                                                id="area"
                                                name="area"
                                                value={formData.area}
                                                onChange={handleChange}
                                                placeholder={t("careers.form.areaPlaceholder")}
                                                required
                                                className="border-cplp-line rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="cvLink" className="text-cplp-navy">{t("careers.form.cv")}</Label>
                                        <Input
                                            id="cvLink"
                                            name="cvLink"
                                            type="url"
                                            value={formData.cvLink}
                                            onChange={handleChange}
                                            placeholder={t("careers.form.cvPlaceholder")}
                                            required
                                            className="border-cplp-line rounded-md"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-cplp-navy">{t("careers.form.message")}</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder={t("careers.form.messagePlaceholder")}
                                            className="h-32 border-cplp-line rounded-md"
                                        />
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Checkbox
                                            id="consent"
                                            checked={consent}
                                            onCheckedChange={(checked) => setConsent(checked === true)}
                                            required
                                            className="mt-0.5"
                                        />
                                        <Label htmlFor="consent" className="text-sm text-cplp-grey font-normal leading-relaxed cursor-pointer">
                                            {t("careers.form.consentPrefix")}{" "}
                                            <Link href="/politica-privacidade" className="text-cplp-blue hover:text-cplp-blue-hover underline underline-offset-2">
                                                {t("careers.form.consentLink")}
                                            </Link>{" "}
                                            {t("careers.form.consentSuffix")}
                                        </Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? t("careers.form.submitting") : t("careers.form.submit")}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
