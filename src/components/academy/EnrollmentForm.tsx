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
import { submitEnrollment, type LeadResult } from "@/app/(site)/actions/leads";

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
            {pending ? t("enroll.submitting") : t("enroll.submit")}
        </Button>
    );
}

export default function EnrollmentForm({ courseId }: { courseId: string }) {
    const { t } = useLanguage();
    const [state, formAction] = useActionState<LeadResult, FormData>(submitEnrollment, {});
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success) {
            toast.success(t("enroll.successTitle"), { description: t("enroll.successDescription") });
            formRef.current?.reset();
        } else if (state.error) {
            toast.error(state.error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return (
        <form ref={formRef} action={formAction} className="space-y-6">
            <input type="hidden" name="courseId" value={courseId} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-cplp-navy">
                        {t("enroll.name")}
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        required
                        placeholder={t("enroll.namePlaceholder")}
                        className="border-cplp-line rounded-md"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-cplp-navy">
                        {t("enroll.email")}
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder={t("enroll.emailPlaceholder")}
                        className="border-cplp-line rounded-md"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-cplp-navy">
                        {t("enroll.phone")}
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        placeholder={t("enroll.phonePlaceholder")}
                        className="border-cplp-line rounded-md"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="company" className="text-cplp-navy">
                        {t("enroll.company")}
                    </Label>
                    <Input
                        id="company"
                        name="company"
                        placeholder={t("enroll.companyPlaceholder")}
                        className="border-cplp-line rounded-md"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="role" className="text-cplp-navy">
                    {t("enroll.role")}
                </Label>
                <Input
                    id="role"
                    name="role"
                    placeholder={t("enroll.rolePlaceholder")}
                    className="border-cplp-line rounded-md"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="message" className="text-cplp-navy">
                    {t("enroll.message")}
                </Label>
                <Textarea
                    id="message"
                    name="message"
                    placeholder={t("enroll.messagePlaceholder")}
                    className="h-28 border-cplp-line rounded-md"
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
                    {t("enroll.consentSuffix")}
                </Label>
            </div>

            <SubmitButton />
        </form>
    );
}
