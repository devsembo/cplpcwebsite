"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setPasswordAction, type SetPasswordActionResult } from "./actions";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="lg" className="w-full bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md" disabled={pending}>
            {pending ? "A guardar..." : "Definir password"}
        </Button>
    );
}

export default function SetPasswordForm({ token }: { token: string }) {
    const [state, formAction] = useActionState<SetPasswordActionResult, FormData>(setPasswordAction, {});

    return (
        <form action={formAction} className="space-y-5">
            <input type="hidden" name="token" value={token} />
            <div className="space-y-2">
                <Label htmlFor="password" className="text-cplp-navy">Nova password</Label>
                <Input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className="border-cplp-line rounded-md" />
            </div>
            {state.error && <p className="text-sm text-red-600" role="alert">{state.error}</p>}
            <SubmitButton />
        </form>
    );
}
