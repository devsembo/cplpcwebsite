"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import type { Faq } from "@prisma/client";
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
import { createFaq, updateFaq, type FaqActionResult } from "./actions";

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

export default function FaqForm({ faq, onSuccess }: { faq?: Faq; onSuccess: () => void }) {
    const action = faq ? updateFaq.bind(null, faq.id) : createFaq;
    const [state, formAction] = useActionState<FaqActionResult, FormData>(action, {});

    useEffect(() => {
        if (state.success) onSuccess();
    }, [state, onSuccess]);

    return (
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{faq ? "Editar Pergunta" : "Nova Pergunta"}</DialogTitle>
            </DialogHeader>

            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="question">Pergunta</Label>
                    <Input id="question" name="question" defaultValue={faq?.question} required className="rounded-md" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="answer">Resposta</Label>
                    <Textarea
                        id="answer"
                        name="answer"
                        defaultValue={faq?.answer}
                        required
                        className="rounded-md h-28"
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
                            <Label htmlFor="questionEn">Pergunta (EN)</Label>
                            <Input id="questionEn" name="questionEn" defaultValue={faq?.questionEn ?? ""} className="rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="answerEn">Resposta (EN)</Label>
                            <Textarea
                                id="answerEn"
                                name="answerEn"
                                defaultValue={faq?.answerEn ?? ""}
                                className="rounded-md h-28"
                            />
                        </div>
                    </div>
                </details>

                <div className="grid sm:grid-cols-3 gap-4 items-center">
                    <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <Input
                            id="category"
                            name="category"
                            defaultValue={faq?.category ?? ""}
                            placeholder="Ex: Projetos"
                            className="rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="order">Ordem</Label>
                        <Input
                            id="order"
                            name="order"
                            type="number"
                            min={0}
                            defaultValue={faq?.order ?? 0}
                            required
                            className="rounded-md"
                        />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                        <Switch id="published" name="published" defaultChecked={faq?.published ?? true} />
                        <Label htmlFor="published">Visível</Label>
                    </div>
                </div>

                {state.error && (
                    <p className="text-sm text-red-600" role="alert">
                        {state.error}
                    </p>
                )}

                <DialogFooter>
                    <SubmitButton label={faq ? "Guardar Alterações" : "Criar Pergunta"} />
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
