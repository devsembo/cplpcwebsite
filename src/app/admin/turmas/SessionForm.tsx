"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import type { CourseSession } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { SESSION_STATUSES, SESSION_STATUS_LABELS } from "@/lib/content-labels";
import { createSession, updateSession, type SessionActionResult } from "./actions";

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

function toDateInput(date: Date | null | undefined): string {
    if (!date) return "";
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
}

export default function SessionForm({
    session,
    courseOptions,
    onSuccess,
}: {
    session?: CourseSession;
    courseOptions: { id: string; title: string }[];
    onSuccess: () => void;
}) {
    const action = session ? updateSession.bind(null, session.id) : createSession;
    const [state, formAction] = useActionState<SessionActionResult, FormData>(action, {});

    useEffect(() => {
        if (state.success) onSuccess();
    }, [state, onSuccess]);

    return (
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{session ? "Editar Turma" : "Nova Turma"}</DialogTitle>
            </DialogHeader>

            <form action={formAction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="courseId">Curso</Label>
                    <Select id="courseId" name="courseId" defaultValue={session?.courseId} required className="rounded-md">
                        <option value="" disabled>
                            Escolhe o curso...
                        </option>
                        {courseOptions.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.title}
                            </option>
                        ))}
                    </Select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="code">Código da turma</Label>
                        <Input
                            id="code"
                            name="code"
                            defaultValue={session?.code}
                            required
                            placeholder="Ex: LID-2026-01"
                            className="rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="status">Estado</Label>
                        <Select id="status" name="status" defaultValue={session?.status ?? "planeada"} className="rounded-md">
                            {SESSION_STATUSES.map((status) => (
                                <option key={status} value={status}>
                                    {SESSION_STATUS_LABELS[status]}
                                </option>
                            ))}
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="instructorName">Formador</Label>
                    <Input
                        id="instructorName"
                        name="instructorName"
                        defaultValue={session?.instructorName ?? ""}
                        className="rounded-md"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location">Local</Label>
                    <Input
                        id="location"
                        name="location"
                        defaultValue={session?.location ?? ""}
                        placeholder="Ex: Luanda · Sala 4 ou Online · Live"
                        className="rounded-md"
                    />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="startDate">Início</Label>
                        <Input
                            id="startDate"
                            name="startDate"
                            type="date"
                            defaultValue={toDateInput(session?.startDate)}
                            className="rounded-md"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="endDate">Fim</Label>
                        <Input
                            id="endDate"
                            name="endDate"
                            type="date"
                            defaultValue={toDateInput(session?.endDate)}
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
                            defaultValue={session?.seats ?? ""}
                            className="rounded-md"
                        />
                    </div>
                </div>

                {state.error && (
                    <p className="text-sm text-red-600" role="alert">
                        {state.error}
                    </p>
                )}

                <DialogFooter>
                    <SubmitButton label={session ? "Guardar Alterações" : "Criar Turma"} />
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
