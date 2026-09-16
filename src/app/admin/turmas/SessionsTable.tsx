"use client";

import { useState, useTransition } from "react";
import type { CourseSession, CourseFormat } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { Dialog } from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { COURSE_FORMAT_LABELS, SESSION_STATUS_LABELS } from "@/lib/content-labels";
import SessionForm from "./SessionForm";
import { deleteSession } from "./actions";

export type SessionRow = CourseSession & {
    course: { id: string; title: string; area: string; format: CourseFormat };
    _count: { enrollments: number };
};

const STATUS_STYLES: Record<CourseSession["status"], string> = {
    planeada: "bg-cplp-grey hover:bg-cplp-grey",
    a_decorrer: "bg-cplp-blue hover:bg-cplp-blue",
    concluida: "bg-cplp-green hover:bg-cplp-green",
};

export default function SessionsTable({
    sessions,
    courseOptions,
}: {
    sessions: SessionRow[];
    courseOptions: { id: string; title: string }[];
}) {
    const [dialogSession, setDialogSession] = useState<SessionRow | "new" | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<SessionRow | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (!deleteTarget) return;
        const id = deleteTarget.id;
        startTransition(async () => {
            await deleteSession(id);
            toast.success("Turma eliminada.");
            setDeleteTarget(null);
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold text-cplp-navy">Turmas</h1>
                <Button
                    onClick={() => setDialogSession("new")}
                    disabled={courseOptions.length === 0}
                    className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Nova Turma
                </Button>
            </div>
            <p className="text-sm text-cplp-grey mb-6">
                Execuções concretas de um curso: formador, datas, vagas e formandos.
            </p>

            {courseOptions.length === 0 && (
                <p className="text-sm text-cplp-grey bg-white border border-cplp-line rounded-lg p-4 mb-4">
                    Cria primeiro um curso em{" "}
                    <a href="/admin/cursos" className="text-cplp-blue font-medium">
                        Cursos
                    </a>{" "}
                    para poderes abrir turmas.
                </p>
            )}

            <div className="bg-white border border-cplp-line rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Código</TableHead>
                            <TableHead>Curso</TableHead>
                            <TableHead>Formador</TableHead>
                            <TableHead>Datas</TableHead>
                            <TableHead>Formandos</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sessions.map((session) => (
                            <TableRow key={session.id}>
                                <TableCell className="font-medium text-cplp-navy whitespace-nowrap">
                                    {session.code}
                                </TableCell>
                                <TableCell className="text-cplp-grey">
                                    {session.course.title}
                                    <p className="text-xs">
                                        {session.course.area} · {COURSE_FORMAT_LABELS[session.course.format]}
                                    </p>
                                </TableCell>
                                <TableCell className="text-cplp-grey">{session.instructorName ?? "—"}</TableCell>
                                <TableCell className="text-cplp-grey text-xs whitespace-nowrap">
                                    {session.startDate ? session.startDate.toLocaleDateString("pt-PT") : "—"}
                                    {" → "}
                                    {session.endDate ? session.endDate.toLocaleDateString("pt-PT") : "—"}
                                </TableCell>
                                <TableCell className="text-cplp-grey tabular-nums">
                                    {session._count.enrollments}
                                    {session.seats ? `/${session.seats}` : ""}
                                </TableCell>
                                <TableCell>
                                    <Badge className={STATUS_STYLES[session.status]}>
                                        {SESSION_STATUS_LABELS[session.status]}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-1">
                                    <Button variant="ghost" size="sm" title="Editar" onClick={() => setDialogSession(session)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" title="Eliminar" onClick={() => setDeleteTarget(session)}>
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {sessions.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-cplp-grey py-8">
                                    Ainda não há turmas.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={dialogSession !== null} onOpenChange={(open) => !open && setDialogSession(null)}>
                {dialogSession && (
                    <SessionForm
                        session={dialogSession === "new" ? undefined : dialogSession}
                        courseOptions={courseOptions}
                        onSuccess={() => {
                            setDialogSession(null);
                            toast.success(dialogSession === "new" ? "Turma criada." : "Turma atualizada.");
                        }}
                    />
                )}
            </Dialog>

            <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar turma?</AlertDialogTitle>
                        <AlertDialogDescription>
                            &quot;{deleteTarget?.code}&quot; será removida. Os formandos já inscritos ficam sem
                            turma atribuída, mas não são eliminados.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isPending}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isPending ? "A eliminar..." : "Eliminar"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
