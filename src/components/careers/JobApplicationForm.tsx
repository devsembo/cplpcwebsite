"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { submitJobApplication, type LeadResult } from "@/app/(site)/actions/leads";

function SubmitButton() {
    const { pending } = useFormStatus();
    const { t } = useLanguage();
    return (
        <Button
            type="submit"
            size="lg"
            disabled={pending}
            className="w-full bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md"
        >
            {pending ? t("careers.form.submitting") : t("careers.form.submit")}
        </Button>
    );
}

// Serve os dois casos: candidatura a uma vaga (jobId preenchido) e candidatura
// espontânea (sem jobId, onde a área de interesse passa a ser obrigatória).
export default function JobApplicationForm({ jobId }: { jobId?: string }) {
    const { t } = useLanguage();
    const [state, formAction] = useActionState<LeadResult, FormData>(submitJobApplication, {});
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success) {
            toast.success(t("careers.form.successTitle"), {
                description: t("careers.form.successDescription"),
            });
            formRef.current?.reset();
        } else if (state.error) {
            toast.error(state.error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return (
        <form ref={formRef} action={formAction} className="space-y-6">
            {jobId && <input type="hidden" name="jobId" value={jobId} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-cplp-navy">
                        {t("careers.form.name")}
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        required
                        placeholder={t("careers.form.namePlaceholder")}
                        className="border-cplp-line rounded-md"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-cplp-navy">
                        {t("careers.form.email")}
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder={t("careers.form.emailPlaceholder")}
                        className="border-cplp-line rounded-md"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-cplp-navy">
                        {t("careers.form.phone")}
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        placeholder={t("careers.form.phonePlaceholder")}
                        className="border-cplp-line rounded-md"
                    />
                </div>

                {!jobId && (
                    <div className="space-y-2">
                        <Label htmlFor="area" className="text-cplp-navy">
                            {t("careers.form.area")}
                        </Label>
                        <Input
                            id="area"
                            name="area"
                            required
                            placeholder={t("careers.form.areaPlaceholder")}
                            className="border-cplp-line rounded-md"
                        />
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="cvUrl" className="text-cplp-navy">
                    {t("careers.form.cv")}
                </Label>
                <Input
                    id="cvUrl"
                    name="cvUrl"
                    type="url"
                    required
                    placeholder={t("careers.form.cvPlaceholder")}
                    className="border-cplp-line rounded-md"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="message" className="text-cplp-navy">
                    {t("careers.form.message")}
                </Label>
                <Textarea
                    id="message"
                    name="message"
                    placeholder={t("careers.form.messagePlaceholder")}
                    className="h-32 border-cplp-line rounded-md"
                />
            </div>

            <div className="flex items-start gap-3">
                {/* Sem `required`: a validação do consentimento é feita no servidor —
                    um input escondido com `required` bloqueia a submissão no Chrome. */}
                <Checkbox id="consent" name="consent" className="mt-0.5" />
                <Label
                    htmlFor="consent"
                    className="text-sm text-cplp-grey font-normal leading-relaxed cursor-pointer"
                >
                    {t("careers.form.consentPrefix")}{" "}
                    <Link
                        href="/politica-privacidade"
                        className="text-cplp-blue hover:text-cplp-blue-hover underline underline-offset-2"
                    >
                        {t("careers.form.consentLink")}
                    </Link>{" "}
                    {t("careers.form.consentSuffix")}
                </Label>
            </div>

            <SubmitButton />
        </form>
    );
}
