"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import type { Course } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { toast } from "sonner";
import { validateImageFile } from "@/lib/validate-image";
import { COURSE_FORMATS, COURSE_FORMAT_LABELS } from "@/lib/content-labels";
import { createCourse, updateCourse, type CourseActionResult } from "./actions";

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

export default function CourseForm({ course }: { course?: Course }) {
    const action = course ? updateCourse.bind(null, course.id) : createCourse;
    const [state, formAction] = useActionState<CourseActionResult, FormData>(action, {});
    const [description, setDescription] = useState(course?.description ?? "");

    return (
        <form action={formAction} className="space-y-6">
            <input type="hidden" name="description" value={description} />

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Título do curso</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={course?.title}
                                    required
                                    placeholder="Ex: Liderança de Equipas Digitais"
                                    className="rounded-md"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="summary">Resumo</Label>
                                <Textarea
                                    id="summary"
                                    name="summary"
                                    defaultValue={course?.summary}
                                    required
                                    className="rounded-md h-20"
                                    placeholder="Uma ou duas frases — é o texto mostrado no cartão do curso."
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="format">Formato</Label>
                                    <Select
                                        id="format"
                                        name="format"
                                        defaultValue={course?.format ?? "in_company"}
                                        className="rounded-md"
                                    >
                                        {COURSE_FORMATS.map((format) => (
                                            <option key={format} value={format}>
                                                {COURSE_FORMAT_LABELS[format]}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="area">Área de formação</Label>
                                    <Input
                                        id="area"
                                        name="area"
                                        defaultValue={course?.area}
                                        required
                                        placeholder="Ex: Liderança & Gestão"
                                        className="rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="targetAudience">Público-alvo</Label>
                                <Input
                                    id="targetAudience"
                                    name="targetAudience"
                                    defaultValue={course?.targetAudience ?? ""}
                                    placeholder="Ex: Diretores e chefes de equipa"
                                    className="rounded-md"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-2">
                        <Label>Descrição do programa</Label>
                        <RichTextEditor
                            initialContent={course?.description ?? ""}
                            onChangeHtml={setDescription}
                            placeholder="Descreve o programa, os módulos e a metodologia..."
                        />
                    </div>

                    <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="highlights">O que vai aprender (um por linha)</Label>
                                <Textarea
                                    id="highlights"
                                    name="highlights"
                                    defaultValue={course?.highlights.join("\n")}
                                    className="rounded-md h-28 font-mono text-xs"
                                    placeholder={"Liderar equipas distribuídas\nDefinir OKRs de equipa\nGerir conflitos"}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="requirements">Pré-requisitos (um por linha)</Label>
                                <Textarea
                                    id="requirements"
                                    name="requirements"
                                    defaultValue={course?.requirements.join("\n")}
                                    className="rounded-md h-24 font-mono text-xs"
                                    placeholder={"Experiência prévia em gestão de equipas"}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                        <CardContent className="p-6 space-y-4">
                            <p className="text-sm font-semibold text-cplp-navy">Ficha do curso</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="durationLabel">Duração</Label>
                                    <Input
                                        id="durationLabel"
                                        name="durationLabel"
                                        defaultValue={course?.durationLabel ?? ""}
                                        placeholder="Ex: 16 horas"
                                        className="rounded-md"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="scheduleLabel">Horário / calendário</Label>
                                    <Input
                                        id="scheduleLabel"
                                        name="scheduleLabel"
                                        defaultValue={course?.scheduleLabel ?? ""}
                                        placeholder="Ex: 4 sessões, 3ª e 5ª das 18h às 22h"
                                        className="rounded-md"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="priceLabel">Preço</Label>
                                    <Input
                                        id="priceLabel"
                                        name="priceLabel"
                                        defaultValue={course?.priceLabel ?? ""}
                                        placeholder="Ex: 450 € + IVA ou Sob consulta"
                                        className="rounded-md"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Local</Label>
                                    <Input
                                        id="location"
                                        name="location"
                                        defaultValue={course?.location ?? ""}
                                        placeholder="Ex: Porto ou Online"
                                        className="rounded-md"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="level">Nível</Label>
                                    <Input
                                        id="level"
                                        name="level"
                                        defaultValue={course?.level ?? ""}
                                        placeholder="Ex: Intermédio"
                                        className="rounded-md"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="language">Idioma</Label>
                                    <Input
                                        id="language"
                                        name="language"
                                        defaultValue={course?.language ?? ""}
                                        placeholder="Ex: Português"
                                        className="rounded-md"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="startDate">Data de início</Label>
                                    <Input
                                        id="startDate"
                                        name="startDate"
                                        type="date"
                                        defaultValue={toDateInput(course?.startDate)}
                                        className="rounded-md"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="seats">Vagas</Label>
                                    <Input
                                        id="seats"
                                        name="seats"
                                        type="number"
                                        min={0}
                                        defaultValue={course?.seats ?? ""}
                                        placeholder="Ex: 20"
                                        className="rounded-md"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="image">Imagem do curso</Label>
                                {course?.imageUrl && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={course.imageUrl}
                                        alt=""
                                        className="h-32 w-full object-cover rounded-md border border-cplp-line mb-2"
                                    />
                                )}
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="rounded-md"
                                />
                                {course?.imageUrl && (
                                    <label className="flex items-center gap-2 text-sm text-cplp-grey mt-2">
                                        <input type="checkbox" name="removeImage" className="rounded" />
                                        Remover imagem atual
                                    </label>
                                )}
                            </div>

                            <div className="space-y-2 pt-2 border-t border-cplp-line">
                                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                                <Input
                                    id="tags"
                                    name="tags"
                                    defaultValue={course?.tags.join(", ")}
                                    placeholder="Liderança, Gestão"
                                    className="rounded-md"
                                />
                            </div>

                            <div className="space-y-2 pt-2 border-t border-cplp-line">
                                <Label htmlFor="order">Ordem</Label>
                                <Input
                                    id="order"
                                    name="order"
                                    type="number"
                                    min={0}
                                    defaultValue={course?.order ?? 0}
                                    required
                                    className="rounded-md"
                                />
                                <p className="text-xs text-cplp-grey">
                                    Número mais baixo aparece primeiro na página Academy.
                                </p>
                            </div>

                            <div className="flex items-center gap-3 pt-2 border-t border-cplp-line">
                                <Switch id="published" name="published" defaultChecked={course?.published} />
                                <Label htmlFor="published">Publicado no site</Label>
                            </div>

                            <div className="flex items-center gap-3">
                                <Switch id="featured" name="featured" defaultChecked={course?.featured} />
                                <Label htmlFor="featured">Curso em destaque</Label>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                        <CardContent className="p-6 space-y-2">
                            <Label htmlFor="registrationUrl">Link de inscrição externo</Label>
                            <Input
                                id="registrationUrl"
                                name="registrationUrl"
                                type="url"
                                defaultValue={course?.registrationUrl ?? ""}
                                placeholder="https://..."
                                className="rounded-md"
                            />
                            <p className="text-xs text-cplp-grey">
                                Opcional. Se preencheres, o botão do curso leva para este link em vez do
                                formulário de inscrição do site.
                            </p>
                        </CardContent>
                    </Card>

                    {state.error && (
                        <p className="text-sm text-red-600" role="alert">
                            {state.error}
                        </p>
                    )}

                    <SubmitButton label={course ? "Guardar Alterações" : "Criar Curso"} />
                </div>
            </div>
        </form>
    );
}
