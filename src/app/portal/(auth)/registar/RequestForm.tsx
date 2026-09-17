"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RequestActionResult } from "./actions";

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="lg" className="w-full bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md" disabled={pending}>
            {pending ? pendingLabel : label}
        </Button>
    );
}

export default function RequestForm({
    action,
    label,
    pendingLabel,
}: {
    action: (prevState: RequestActionResult, formData: FormData) => Promise<RequestActionResult>;
    label: string;
    pendingLabel: string;
}) {
    const [state, formAction] = useActionState<RequestActionResult, FormData>(action, {});

    return (
        <form action={formAction} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="email" className="text-cplp-navy">Email</Label>
                <Input id="email" name="email" type="email" required autoComplete="email" className="border-cplp-line rounded-md" />
            </div>
            {state.error && <p className="text-sm text-red-600" role="alert">{state.error}</p>}
            {state.message && <p className="text-sm text-cplp-green" role="status">{state.message}</p>}
            <SubmitButton label={label} pendingLabel={pendingLabel} />
        </form>
    );
}
