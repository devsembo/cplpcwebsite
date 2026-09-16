"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Award, Mail, Send, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TRAINING_STATUS_LABELS, CERTIFICATE_STATUS_LABELS } from "@/lib/content-labels";
import { certificateVerificationUrl } from "@/lib/certificate-client";
import type { FormandoWithRelations } from "./page";
import {
    assignFormandoSessionAndCompany,
    issueCertificate,
    sendFormandoMessage,
    updateFormandoProgress,
} from "../actions";

export default function FormandoDetail({
    formando,
    sessionOptions,
    companyOptions,
}: {
    formando: FormandoWithRelations;
    sessionOptions: { id: string; code: string; course: { title: string } }[];
    companyOptions: { id: string; name: string }[];
}) {
    const [progress, setProgress] = useState(String(formando.progress));
    const [grade, setGrade] = useState(formando.grade !== null ? String(formando.grade) : "");
    const [hours, setHours] = useState(String(formando.hoursCompleted));
    const [message, setMessage] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSaveProgress = () => {
        startTransition(async () => {
            const result = await updateFormandoProgress(formando.id, {
                progress: Number(progress),
                grade: grade.trim() === "" ? null : Number(grade.replace(",", ".")),
                hoursCompleted: Number(hours),
            });
            if (result.error) {
                toast.error(result.error);
                return;
            }
            toast.success("Avaliação registada.");
        });
    };

    const handleAssign = (sessionId: string, clientCompanyId: string) => {
        startTransition(async () => {
            await assignFormandoSessionAndCompany(formando.id, {
                sessionId: sessionId || null,
                clientCompanyId: clientCompanyId || null,
            });
            toast.success("Atribuição atualizada.");
        });
    };

    const handleIssueCertificate = () => {
        startTransition(async () => {
            const result = await issueCertificate(formando.id);
            if (result.error) {
                toast.error(result.error);
                return;
            }
            toast.success("Certificado emitido.");
        });
    };

    const handleSendMessage = () => {
        startTransition(async () => {
            const result = await sendFormandoMessage(formando.id, {
                subject: `Acompanhamento — ${formando.course.title}`,
                message,
            });
            if (result.error) {
                toast.error(result.error);
                return;
            }
            setMessage("");
            toast.success("Email enviado.", { description: formando.email });
        });
    };

    return (
        <div>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                    <p className="text-sm text-cplp-grey">
                        {formando.clientCompany?.name ?? formando.company ?? "Particular"}
                    </p>
                    <h1 className="text-2xl font-bold text-cplp-navy">{formando.name}</h1>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild className="rounded-md">
                        <Link href="/admin/formandos">Voltar</Link>
                    </Button>
                    {formando.certificateStatus === "emitido" ? (
                        <Button asChild className="bg-cplp-green hover:bg-cplp-green text-white rounded-md gap-2">
                            <a href={`/certificado/${formando.certificateCode}`} target="_blank" rel="noreferrer">
                                <ExternalLink className="w-4 h-4" />
                                Ver certificado
                            </a>
                        </Button>
                    ) : (
                        <Button
                            disabled={formando.certificateStatus !== "elegivel" || isPending}
                            onClick={handleIssueCertificate}
                            className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md gap-2"
                        >
                            <Award className="w-4 h-4" />
                            Emitir certificado
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                    <CardContent className="p-5">
                        <p className="text-xs text-cplp-grey uppercase tracking-wide">Progresso</p>
                        <p className="text-2xl font-bold text-cplp-navy mt-2">{formando.progress}%</p>
                    </CardContent>
                </Card>
                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                    <CardContent className="p-5">
                        <p className="text-xs text-cplp-grey uppercase tracking-wide">Nota</p>
                        <p className="text-2xl font-bold text-cplp-navy mt-2">
                            {formando.grade !== null ? formando.grade.toFixed(1) : "—"}
                            <span className="text-sm font-medium text-cplp-grey">/20</span>
                        </p>
                    </CardContent>
                </Card>
                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                    <CardContent className="p-5">
                        <p className="text-xs text-cplp-grey uppercase tracking-wide">Horas</p>
                        <p className="text-2xl font-bold text-cplp-navy mt-2">{formando.hoursCompleted}h</p>
                    </CardContent>
                </Card>
                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                    <CardContent className="p-5">
                        <p className="text-xs text-cplp-grey uppercase tracking-wide">Certificação</p>
                        <p className="text-lg font-bold text-cplp-navy mt-2">
                            {CERTIFICATE_STATUS_LABELS[formando.certificateStatus]}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <Card className="border border-cplp-line bg-white shadow-none rounded-lg lg:col-span-2">
                    <CardContent className="p-6">
                        <p className="text-xs text-cplp-grey uppercase tracking-wide mb-1">Lançamento pedagógico</p>
                        <h2 className="font-bold text-cplp-navy mb-4">Atualizar avaliação e progresso</h2>

                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="progress">Progresso (%)</Label>
                                <Input
                                    id="progress"
                                    value={progress}
                                    onChange={(e) => setProgress(e.target.value)}
                                    inputMode="numeric"
                                    className="rounded-md tabular-nums"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="grade">Nota final (0-20)</Label>
                                <Input
                                    id="grade"
                                    value={grade}
                                    onChange={(e) => setGrade(e.target.value)}
                                    inputMode="decimal"
                                    placeholder="—"
                                    className="rounded-md tabular-nums"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hours">Horas validadas</Label>
                                <Input
                                    id="hours"
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}
                                    inputMode="numeric"
                                    className="rounded-md tabular-nums"
                                />
                            </div>
                        </div>

                        <Button
                            onClick={handleSaveProgress}
                            disabled={isPending}
                            className="mt-4 bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md"
                        >
                            Guardar avaliação
                        </Button>

                        <div className="mt-8 pt-6 border-t border-cplp-line">
                            <p className="text-xs text-cplp-grey uppercase tracking-wide mb-1">Comunicação direta</p>
                            <a
                                href={`mailto:${formando.email}`}
                                className="flex items-center gap-2 text-sm text-cplp-blue hover:text-cplp-blue-hover mb-3"
                            >
                                <Mail className="w-4 h-4" />
                                {formando.email}
                            </a>
                            <Textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Mensagem de acompanhamento ao formando..."
                                className="rounded-md h-24"
                            />
                            <Button
                                onClick={handleSendMessage}
                                disabled={isPending || message.trim().length < 5}
                                variant="outline"
                                className="mt-3 rounded-md gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Enviar email
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                    <CardContent className="p-6 space-y-4">
                        <p className="text-xs text-cplp-grey uppercase tracking-wide">Enquadramento</p>

                        <div className="space-y-2">
                            <Label htmlFor="session">Turma</Label>
                            <Select
                                id="session"
                                defaultValue={formando.sessionId ?? ""}
                                onChange={(e) => handleAssign(e.target.value, formando.clientCompanyId ?? "")}
                                className="rounded-md"
                            >
                                <option value="">Sem turma atribuída</option>
                                {sessionOptions.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.code} · {s.course.title}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="company">Empresa cliente</Label>
                            <Select
                                id="company"
                                defaultValue={formando.clientCompanyId ?? ""}
                                onChange={(e) => handleAssign(formando.sessionId ?? "", e.target.value)}
                                className="rounded-md"
                            >
                                <option value="">Sem empresa formal ({formando.company ?? "particular"})</option>
                                {companyOptions.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <dl className="text-sm space-y-2 pt-2 border-t border-cplp-line">
                            <div className="flex justify-between">
                                <dt className="text-cplp-grey">Curso</dt>
                                <dd className="font-medium text-cplp-navy text-right">{formando.course.title}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-cplp-grey">Cargo</dt>
                                <dd className="font-medium text-cplp-navy">{formando.role ?? "—"}</dd>
                            </div>
                            <div className="flex justify-between items-center">
                                <dt className="text-cplp-grey">Estado</dt>
                                <dd>
                                    <Badge>{TRAINING_STATUS_LABELS[formando.trainingStatus]}</Badge>
                                </dd>
                            </div>
                            {formando.certificateCode && (
                                <div className="flex justify-between">
                                    <dt className="text-cplp-grey">Certificado</dt>
                                    <dd className="font-medium text-cplp-navy text-xs">
                                        {formando.certificateCode}
                                    </dd>
                                </div>
                            )}
                        </dl>
                        {formando.certificateCode && (
                            <p className="text-xs text-cplp-grey break-all">
                                {certificateVerificationUrl(formando.certificateCode)}
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
