"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import type { Company } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { createCompany, updateCompany, type CompanyActionResult } from "./actions";

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

export default function CompanyForm({
    company,
    onSuccess,
}: {
    company?: Company;
    onSuccess: () => void;
}) {
    const action = company ? updateCompany.bind(null, company.id) : createCompany;
    const [state, formAction] = useActionState<CompanyActionResult, FormData>(action, {});

    useEffect(() => {
        if (state.success) onSuccess();
    }, [state, onSuccess]);

    return (
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{company ? "Editar Empresa" : "Nova Empresa Cliente"}</DialogTitle>
            </DialogHeader>

            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nome da empresa</Label>
                    <Input id="name" name="name" defaultValue={company?.name} required className="rounded-md" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="sector">Setor</Label>
                        <Input id="sector" name="sector" defaultValue={company?.sector ?? ""} className="rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="accountManager">Gestor de conta</Label>
                        <Input
                            id="accountManager"
                            name="accountManager"
                            defaultValue={company?.accountManager ?? ""}
                            className="rounded-md"
                        />
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="contractLabel">Contrato</Label>
                        <Input
                            id="contractLabel"
                            name="contractLabel"
                            defaultValue={company?.contractLabel ?? ""}
                            placeholder="Ex: Programa à medida · renovação anual"
                            className="rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="seatsContracted">Vagas contratadas</Label>
                        <Input
                            id="seatsContracted"
                            name="seatsContracted"
                            type="number"
                            min={0}
                            defaultValue={company?.seatsContracted ?? ""}
                            className="rounded-md"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="notes">Notas internas</Label>
                    <Textarea
                        id="notes"
                        name="notes"
                        defaultValue={company?.notes ?? ""}
                        className="rounded-md h-24"
                    />
                </div>

                {state.error && (
                    <p className="text-sm text-red-600" role="alert">
                        {state.error}
                    </p>
                )}

                <DialogFooter>
                    <SubmitButton label={company ? "Guardar Alterações" : "Criar Empresa"} />
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
