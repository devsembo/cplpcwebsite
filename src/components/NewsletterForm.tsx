"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { subscribeAction, type SubscribeResult } from "@/app/(site)/actions/newsletter";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md shrink-0">
            {pending ? "A subscrever..." : "Subscrever"}
        </Button>
    );
}

export default function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
    const [state, formAction] = useActionState<SubscribeResult, FormData>(subscribeAction, {});
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success) {
            toast.success("Subscrito com sucesso! Obrigado.");
            formRef.current?.reset();
        } else if (state.error) {
            toast.error(state.error);
        }
    }, [state]);

    return (
        <form ref={formRef} action={formAction} className="flex flex-col sm:flex-row gap-3">
            <Input
                type="email"
                name="email"
                required
                placeholder="o.seu@email.com"
                className={
                    variant === "dark"
                        ? "rounded-md bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        : "rounded-md"
                }
            />
            <SubmitButton />
        </form>
    );
}
