"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { sendBulkNotification, type NotificationActionResult } from "./actions";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            disabled={pending}
            className="w-full bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md gap-2"
        >
            <Send className="w-4 h-4" />
            {pending ? "A enviar..." : "Enviar email"}
        </Button>
    );
}

export default function ComposeForm({
    companies,
    sessions,
}: {
    companies: { id: string; name: string }[];
    sessions: { id: string; code: string }[];
}) {
    const [state, formAction] = useActionState<NotificationActionResult, FormData>(sendBulkNotification, {});
    const [audienceType, setAudienceType] = useState("todos");

    useEffect(() => {
        if (state.success) {
            toast.success(`Email enviado a ${state.sent} formando(s).`, {
                description: state.failed ? `${state.failed} envio(s) falharam.` : undefined,
            });
        }
    }, [state]);

    return (
        <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
            <CardContent className="p-6">
                <p className="text-xs text-cplp-grey uppercase tracking-wide mb-1">Nova comunicação</p>
                <h2 className="font-bold text-cplp-navy mb-4">Compor mensagem</h2>

                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="audienceType">Destinatário</Label>
                        <Select
                            id="audienceType"
                            name="audienceType"
                            value={audienceType}
                            onChange={(e) => setAudienceType(e.target.value)}
                            className="rounded-md"
                        >
                            <option value="todos">Todos os formandos confirmados</option>
                            <option value="empresa">Uma empresa cliente</option>
                            <option value="turma">Uma turma</option>
                        </Select>
                    </div>

                    {audienceType === "empresa" && (
                        <div className="space-y-2">
                            <Label htmlFor="audienceIdEmpresa">Empresa</Label>
                            <Select id="audienceIdEmpresa" name="audienceId" required className="rounded-md">
                                <option value="" disabled>
                                    Escolhe a empresa...
                                </option>
                                {companies.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    )}

                    {audienceType === "turma" && (
                        <div className="space-y-2">
                            <Label htmlFor="audienceIdTurma">Turma</Label>
                            <Select id="audienceIdTurma" name="audienceId" required className="rounded-md">
                                <option value="" disabled>
                                    Escolhe a turma...
                                </option>
                                {sessions.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.code}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="subject">Assunto</Label>
                        <Input id="subject" name="subject" required placeholder="Ex: Entrega do projeto final" className="rounded-md" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Mensagem</Label>
                        <Textarea id="message" name="message" required rows={5} placeholder="Escreve a comunicação..." className="rounded-md" />
                    </div>

                    {state.error && (
                        <p className="text-sm text-red-600" role="alert">
                            {state.error}
                        </p>
                    )}

                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    );
}
