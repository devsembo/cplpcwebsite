"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import type { Partner } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { validateImageFile } from "@/lib/validate-image";
import { createPartner, updatePartner, type PartnerActionResult } from "./actions";

function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const error = validateImageFile(file);
    if (error) {
        toast.error(error);
        e.target.value = "";
    }
}

function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md"
            disabled={pending}
        >
            {pending ? "A guardar..." : label}
        </Button>
    );
}

export default function PartnerForm({
    partner,
    onSuccess,
}: {
    partner?: Partner;
    onSuccess: () => void;
}) {
    const action = partner ? updatePartner.bind(null, partner.id) : createPartner;
    const [state, formAction] = useActionState<PartnerActionResult, FormData>(action, {});

    useEffect(() => {
        if (state.success) onSuccess();
    }, [state, onSuccess]);

    return (
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{partner ? "Editar Parceiro" : "Novo Parceiro"}</DialogTitle>
            </DialogHeader>

            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" name="name" defaultValue={partner?.name} required className="rounded-md" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="websiteUrl">Website</Label>
                    <Input
                        id="websiteUrl"
                        name="websiteUrl"
                        type="url"
                        defaultValue={partner?.websiteUrl ?? ""}
                        placeholder="https://..."
                        className="rounded-md"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="logo">Logótipo</Label>
                    {partner?.logoUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={partner.logoUrl}
                            alt=""
                            className="h-20 w-full object-contain rounded-md border border-cplp-line bg-white p-2 mb-2"
                        />
                    )}
                    <Input id="logo" name="logo" type="file" accept="image/*" onChange={handleImageChange} className="rounded-md" />
                    <p className="text-xs text-cplp-grey">
                        Opcional — sem logótipo, o cartão mostra o nome do parceiro.
                    </p>
                    {partner?.logoUrl && (
                        <label className="flex items-center gap-2 text-sm text-cplp-grey mt-2">
                            <input type="checkbox" name="removeLogo" className="rounded" />
                            Remover logótipo atual
                        </label>
                    )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 items-center">
                    <div className="space-y-2">
                        <Label htmlFor="order">Ordem</Label>
                        <Input
                            id="order"
                            name="order"
                            type="number"
                            min={0}
                            defaultValue={partner?.order ?? 0}
                            required
                            className="rounded-md"
                        />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                        <Switch id="published" name="published" defaultChecked={partner?.published ?? true} />
                        <Label htmlFor="published">Visível no site</Label>
                    </div>
                </div>

                {state.error && (
                    <p className="text-sm text-red-600" role="alert">
                        {state.error}
                    </p>
                )}

                <DialogFooter>
                    <SubmitButton label={partner ? "Guardar Alterações" : "Criar Parceiro"} />
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
