"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import type { JobOpening } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { JOB_MODES, JOB_MODE_LABELS, JOB_TYPES, JOB_TYPE_LABELS } from "@/lib/content-labels";
import { createJob, updateJob, type JobActionResult } from "./actions";

function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            className="w-full bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md"
            disabled={pending}
        >
            {pending ? "A guardar..." : label}
        </Button>
    );
}

function toDateInput(date: Date | null | undefined): string {
    if (!date) return "";
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
}

export default function JobForm({ job }: { job?: JobOpening }) {
    const action = job ? updateJob.bind(null, job.id) : createJob;
    const [state, formAction] = useActionState<JobActionResult, FormData>(action, {});
    const [description, setDescription] = useState(job?.description ?? "");

    return (
        <form action={formAction} className="space-y-6">
            <input type="hidden" name="description" value={description} />

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Título da vaga</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={job?.title}
                                    required
                                    placeholder="Ex: Programador(a) Full-Stack"
                                    className="rounded-md"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="summary">Resumo</Label>
                                <Textarea
                                    id="summary"
                                    name="summary"
                                    defaultValue={job?.summary}
                                    required
                                    className="rounded-md h-20"
                                    placeholder="Uma ou duas frases — é o texto mostrado no cartão da vaga."
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="department">Departamento</Label>
                                    <Input
                                        id="department"
                                        name="department"
                                        defaultValue={job?.department ?? ""}
                                        placeholder="Ex: Engenharia"
                                        className="rounded-md"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Localização</Label>
                                    <Input
                                        id="location"
                                        name="location"
                                        defaultValue={job?.location}
                                        required
                                        placeholder="Ex: Porto, Portugal"
                                        className="rounded-md"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="type">Tipo de contrato</Label>
                                    <Select id="type" name="type" defaultValue={job?.type ?? "full_time"} className="rounded-md">
                                        {JOB_TYPES.map((type) => (
                                            <option key={type} value={type}>
                                                {JOB_TYPE_LABELS[type]}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mode">Regime</Label>
                                    <Select id="mode" name="mode" defaultValue={job?.mode ?? "presencial"} className="rounded-md">
                                        {JOB_MODES.map((mode) => (
                                            <option key={mode} value={mode}>
                                                {JOB_MODE_LABELS[mode]}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="seniority">Senioridade</Label>
                                    <Input
                                        id="seniority"
                                        name="seniority"
                                        defaultValue={job?.seniority ?? ""}
                                        placeholder="Ex: Júnior, Sénior"
                                        className="rounded-md"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="applyDeadline">Prazo de candidatura</Label>
                                    <Input
                                        id="applyDeadline"
                                        name="applyDeadline"
                                        type="date"
                                        defaultValue={toDateInput(job?.applyDeadline)}
                                        className="rounded-md"
                                    />
                                    <p className="text-xs text-cplp-grey">
                                        Passada esta data a vaga deixa de aparecer no site.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-2">
                        <Label>Descrição da vaga</Label>
                        <RichTextEditor
                            initialContent={job?.description ?? ""}
                            onChangeHtml={setDescription}
                            placeholder="Descreve a equipa, o projeto e o dia-a-dia da função..."
                        />
                    </div>

                    <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="responsibilities">Responsabilidades (uma por linha)</Label>
                                <Textarea
                                    id="responsibilities"
                                    name="responsibilities"
                                    defaultValue={job?.responsibilities.join("\n")}
                                    className="rounded-md h-28 font-mono text-xs"
                                    placeholder={"Desenvolver novas funcionalidades\nRever código da equipa"}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="requirements">Requisitos (um por linha)</Label>
                                <Textarea
                                    id="requirements"
                                    name="requirements"
                                    defaultValue={job?.requirements.join("\n")}
                                    className="rounded-md h-28 font-mono text-xs"
                                    placeholder={"3+ anos de experiência com React\nInglês fluente"}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="benefits">Benefícios (um por linha)</Label>
                                <Textarea
                                    id="benefits"
                                    name="benefits"
                                    defaultValue={job?.benefits.join("\n")}
                                    className="rounded-md h-24 font-mono text-xs"
                                    placeholder={"Horário flexível\nFormação contínua na Academy"}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="order">Ordem</Label>
                                <Input
                                    id="order"
                                    name="order"
                                    type="number"
                                    min={0}
                                    defaultValue={job?.order ?? 0}
                                    required
                                    className="rounded-md"
                                />
                                <p className="text-xs text-cplp-grey">
                                    Número mais baixo aparece primeiro na página Carreiras.
                                </p>
                            </div>

                            <div className="flex items-center gap-3 pt-2 border-t border-cplp-line">
                                <Switch id="published" name="published" defaultChecked={job?.published} />
                                <Label htmlFor="published">Vaga aberta (visível no site)</Label>
                            </div>
                        </CardContent>
                    </Card>

                    {state.error && (
                        <p className="text-sm text-red-600" role="alert">
                            {state.error}
                        </p>
                    )}

                    <SubmitButton label={job ? "Guardar Alterações" : "Criar Vaga"} />
                </div>
            </div>
        </form>
    );
}
