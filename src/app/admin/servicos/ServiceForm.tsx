"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import type { Service } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import ServiceIcon from "@/components/ServiceIcon";
import { SERVICE_ICON_NAMES } from "@/lib/service-icons";
import { createService, updateService, type ServiceActionResult } from "./actions";

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

export default function ServiceForm({
    service,
    onSuccess,
}: {
    service?: Service;
    onSuccess: () => void;
}) {
    const action = service ? updateService.bind(null, service.id) : createService;
    const [state, formAction] = useActionState<ServiceActionResult, FormData>(action, {});

    useEffect(() => {
        if (state.success) onSuccess();
    }, [state, onSuccess]);

    return (
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{service ? "Editar Serviço" : "Novo Serviço"}</DialogTitle>
            </DialogHeader>

            <form action={formAction} className="space-y-4">
                <div className="grid sm:grid-cols-[1fr_auto] gap-4 items-end">
                    <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input id="title" name="title" defaultValue={service?.title} required className="rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="icon">Ícone</Label>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-md border border-cplp-line flex items-center justify-center shrink-0">
                                <ServiceIcon name={service?.icon} className="w-5 h-5 text-cplp-blue" />
                            </div>
                            <Select
                                id="icon"
                                name="icon"
                                defaultValue={service?.icon ?? "Layers"}
                                className="rounded-md w-40"
                            >
                                {SERVICE_ICON_NAMES.map((name) => (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                        id="description"
                        name="description"
                        defaultValue={service?.description}
                        required
                        className="rounded-md h-20"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="details">O que inclui (um item por linha)</Label>
                    <Textarea
                        id="details"
                        name="details"
                        defaultValue={service?.details.join("\n")}
                        className="rounded-md h-24 font-mono text-xs"
                        placeholder={"Sites institucionais e plataformas web\nSistemas internos de gestão"}
                    />
                </div>

                <details className="border border-cplp-line rounded-md p-4">
                    <summary className="text-sm font-semibold text-cplp-navy cursor-pointer">
                        Tradução em inglês (opcional)
                    </summary>
                    <div className="space-y-4 mt-4">
                        <p className="text-xs text-cplp-grey">
                            Se deixares em branco, o site em inglês mostra o texto em português.
                        </p>
                        <div className="space-y-2">
                            <Label htmlFor="titleEn">Título (EN)</Label>
                            <Input id="titleEn" name="titleEn" defaultValue={service?.titleEn ?? ""} className="rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="descriptionEn">Descrição (EN)</Label>
                            <Textarea
                                id="descriptionEn"
                                name="descriptionEn"
                                defaultValue={service?.descriptionEn ?? ""}
                                className="rounded-md h-20"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="detailsEn">O que inclui (EN, um por linha)</Label>
                            <Textarea
                                id="detailsEn"
                                name="detailsEn"
                                defaultValue={service?.detailsEn.join("\n")}
                                className="rounded-md h-24 font-mono text-xs"
                            />
                        </div>
                    </div>
                </details>

                <details className="border border-cplp-line rounded-md p-4">
                    <summary className="text-sm font-semibold text-cplp-navy cursor-pointer">
                        SEO da página do serviço (opcional)
                    </summary>
                    <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="metaTitle">Título para motores de busca</Label>
                            <Input id="metaTitle" name="metaTitle" defaultValue={service?.metaTitle ?? ""} className="rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="metaDescription">Descrição para motores de busca</Label>
                            <Textarea
                                id="metaDescription"
                                name="metaDescription"
                                defaultValue={service?.metaDescription ?? ""}
                                className="rounded-md h-20"
                            />
                        </div>
                    </div>
                </details>

                <div className="grid sm:grid-cols-2 gap-4 items-center">
                    <div className="space-y-2">
                        <Label htmlFor="order">Ordem</Label>
                        <Input
                            id="order"
                            name="order"
                            type="number"
                            min={0}
                            defaultValue={service?.order ?? 0}
                            required
                            className="rounded-md"
                        />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                        <Switch id="published" name="published" defaultChecked={service?.published ?? true} />
                        <Label htmlFor="published">Visível no site</Label>
                    </div>
                </div>

                {state.error && (
                    <p className="text-sm text-red-600" role="alert">
                        {state.error}
                    </p>
                )}

                <DialogFooter>
                    <SubmitButton label={service ? "Guardar Alterações" : "Criar Serviço"} />
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
