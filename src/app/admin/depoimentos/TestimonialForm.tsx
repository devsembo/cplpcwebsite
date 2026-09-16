"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import type { Testimonial } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { validateImageFile } from "@/lib/validate-image";
import { createTestimonial, updateTestimonial, type TestimonialActionResult } from "./actions";

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

export default function TestimonialForm({
    testimonial,
    onSuccess,
}: {
    testimonial?: Testimonial;
    onSuccess: () => void;
}) {
    const action = testimonial
        ? updateTestimonial.bind(null, testimonial.id)
        : createTestimonial;
    const [state, formAction] = useActionState<TestimonialActionResult, FormData>(action, {});

    useEffect(() => {
        if (state.success) onSuccess();
    }, [state, onSuccess]);

    return (
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{testimonial ? "Editar Depoimento" : "Novo Depoimento"}</DialogTitle>
            </DialogHeader>

            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="quote">Depoimento</Label>
                    <Textarea
                        id="quote"
                        name="quote"
                        defaultValue={testimonial?.quote}
                        required
                        className="rounded-md h-28"
                        placeholder="O que o cliente disse sobre o trabalho..."
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="quoteEn">Depoimento em inglês (opcional)</Label>
                    <Textarea
                        id="quoteEn"
                        name="quoteEn"
                        defaultValue={testimonial?.quoteEn ?? ""}
                        className="rounded-md h-24"
                    />
                    <p className="text-xs text-cplp-grey">
                        Se deixares em branco, o site em inglês mostra o texto em português.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="authorName">Nome</Label>
                        <Input
                            id="authorName"
                            name="authorName"
                            defaultValue={testimonial?.authorName}
                            required
                            className="rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Cargo</Label>
                        <Input
                            id="role"
                            name="role"
                            defaultValue={testimonial?.role ?? ""}
                            placeholder="Ex: Diretora de Operações"
                            className="rounded-md"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                        id="company"
                        name="company"
                        defaultValue={testimonial?.company ?? ""}
                        className="rounded-md"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="avatar">Fotografia</Label>
                    {testimonial?.avatarUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={testimonial.avatarUrl}
                            alt=""
                            className="h-16 w-16 object-cover rounded-full border border-cplp-line mb-2"
                        />
                    )}
                    <Input id="avatar" name="avatar" type="file" accept="image/*" onChange={handleImageChange} className="rounded-md" />
                    <p className="text-xs text-cplp-grey">
                        Opcional — sem fotografia, mostramos as iniciais do nome.
                    </p>
                    {testimonial?.avatarUrl && (
                        <label className="flex items-center gap-2 text-sm text-cplp-grey mt-2">
                            <input type="checkbox" name="removeAvatar" className="rounded" />
                            Remover fotografia atual
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
                            defaultValue={testimonial?.order ?? 0}
                            required
                            className="rounded-md"
                        />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                        <Switch id="published" name="published" defaultChecked={testimonial?.published ?? true} />
                        <Label htmlFor="published">Visível no site</Label>
                    </div>
                </div>

                {state.error && (
                    <p className="text-sm text-red-600" role="alert">
                        {state.error}
                    </p>
                )}

                <DialogFooter>
                    <SubmitButton label={testimonial ? "Guardar Alterações" : "Criar Depoimento"} />
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
