"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formandoLoginAction, type FormandoLoginActionResult } from "./actions";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="lg" className="w-full bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md" disabled={pending}>
            {pending ? "A entrar..." : "Entrar"}
        </Button>
    );
}

export default function LoginForm() {
    const [state, formAction] = useActionState<FormandoLoginActionResult, FormData>(formandoLoginAction, {});

    return (
        <form action={formAction} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="email" className="text-cplp-navy">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={state.email ?? ""} required autoComplete="username" className="border-cplp-line rounded-md" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password" className="text-cplp-navy">Password</Label>
                <Input id="password" name="password" type="password" required autoComplete="current-password" className="border-cplp-line rounded-md" />
            </div>
            {state.error && <p className="text-sm text-red-600" role="alert">{state.error}</p>}
            <SubmitButton />
        </form>
    );
}
