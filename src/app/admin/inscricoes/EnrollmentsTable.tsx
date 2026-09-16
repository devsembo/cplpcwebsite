"use client";

import { useMemo, useState, useTransition } from "react";
import type { CourseEnrollment, EnrollmentStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
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
import { Search, Trash2, Eye, Download, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { downloadCsv } from "@/lib/csv";
import { ENROLLMENT_STATUSES, ENROLLMENT_STATUS_LABELS } from "@/lib/content-labels";
import { deleteEnrollment, updateEnrollmentNotes, updateEnrollmentStatus } from "./actions";

export type EnrollmentRow = CourseEnrollment & {
    course: { id: string; title: string; slug: string } | null;
};

const STATUS_STYLES: Record<EnrollmentStatus, string> = {
    nova: "bg-cplp-blue hover:bg-cplp-blue",
    contactada: "bg-cplp-grey hover:bg-cplp-grey",
    confirmada: "bg-cplp-green hover:bg-cplp-green",
    cancelada: "bg-red-600 hover:bg-red-600",
};

export default function EnrollmentsTable({ enrollments }: { enrollments: EnrollmentRow[] }) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<EnrollmentStatus | "all">("all");
    const [detail, setDetail] = useState<EnrollmentRow | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<EnrollmentRow | null>(null);
    const [isPending, startTransition] = useTransition();

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        return enrollments.filter((item) => {
            const matchesSearch =
                !query ||
                item.name.toLowerCase().includes(query) ||
                item.email.toLowerCase().includes(query) ||
                (item.company ?? "").toLowerCase().includes(query) ||
                (item.course?.title ?? "").toLowerCase().includes(query);
            const matchesStatus = statusFilter === "all" || item.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [enrollments, search, statusFilter]);

    const handleStatusChange = (id: string, status: EnrollmentStatus) => {
        startTransition(async () => {
            await updateEnrollmentStatus(id, status);
            toast.success("Estado atualizado.");
        });
    };

    const handleSaveNotes = (id: string, notes: string) => {
        startTransition(async () => {
            await updateEnrollmentNotes(id, notes);
            toast.success("Notas guardadas.");
            setDetail(null);
        });
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        const id = deleteTarget.id;
        startTransition(async () => {
            await deleteEnrollment(id);
            toast.success("Inscrição eliminada.");
            setDeleteTarget(null);
        });
    };

    const handleExport = () => {
        downloadCsv(
            `inscricoes-${new Date().toISOString().slice(0, 10)}.csv`,
            ["Data", "Nome", "Email", "Telefone", "Empresa", "Função", "Curso", "Estado", "Mensagem", "Notas"],
            filtered.map((item) => [
                new Date(item.createdAt).toLocaleString("pt-PT"),
                item.name,
                item.email,
                item.phone,
                item.company,
                item.role,
                item.course?.title ?? "—",
                ENROLLMENT_STATUS_LABELS[item.status],
                item.message,
                item.notes,
            ]),
        );
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold text-cplp-navy">Inscrições</h1>
                <Button variant="outline" className="rounded-md gap-2" onClick={handleExport}>
                    <Download className="w-4 h-4" />
                    Exportar CSV
                </Button>
            </div>
            <p className="text-sm text-cplp-grey mb-6">
                Pedidos de inscrição enviados pelas páginas dos cursos.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cplp-grey" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Procurar por nome, email, empresa ou curso..."
                        className="rounded-md pl-9"
                    />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                    <button
                        type="button"
                        onClick={() => setStatusFilter("all")}
                        className={cn(
                            "text-sm font-medium px-3 py-1.5 rounded-md border transition-colors cursor-pointer",
                            statusFilter === "all"
                                ? "bg-cplp-blue text-white border-cplp-blue"
                                : "bg-white text-cplp-grey border-cplp-line hover:bg-cplp-bg",
                        )}
                    >
                        Todas
                    </button>
                    {ENROLLMENT_STATUSES.map((status) => (
                        <button
                            key={status}
                            type="button"
                            onClick={() => setStatusFilter(status)}
                            className={cn(
                                "text-sm font-medium px-3 py-1.5 rounded-md border transition-colors cursor-pointer",
                                statusFilter === status
                                    ? "bg-cplp-blue text-white border-cplp-blue"
                                    : "bg-white text-cplp-grey border-cplp-line hover:bg-cplp-bg",
                            )}
                        >
                            {ENROLLMENT_STATUS_LABELS[status]}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white border border-cplp-line rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead>Participante</TableHead>
                            <TableHead>Curso</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="text-cplp-grey whitespace-nowrap">
                                    {new Date(item.createdAt).toLocaleDateString("pt-PT")}
                                </TableCell>
                                <TableCell>
                                    <span className="font-medium text-cplp-navy">{item.name}</span>
                                    <p className="text-xs text-cplp-grey mt-0.5">
                                        {item.email}
                                        {item.company ? ` · ${item.company}` : ""}
                                    </p>
                                </TableCell>
                                <TableCell className="text-cplp-grey">
                                    {item.course?.title ?? <span className="text-xs">Curso eliminado</span>}
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={item.status}
                                        onChange={(e) =>
                                            handleStatusChange(item.id, e.target.value as EnrollmentStatus)
                                        }
                                        disabled={isPending}
                                        className="h-8 w-40 rounded-md py-0 text-xs md:text-xs"
                                    >
                                        {ENROLLMENT_STATUSES.map((status) => (
                                            <option key={status} value={status}>
                                                {ENROLLMENT_STATUS_LABELS[status]}
                                            </option>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell className="text-right space-x-1">
                                    <Button variant="ghost" size="sm" title="Ver detalhes" onClick={() => setDetail(item)}>
                                        <Eye className="w-4 h-4 text-cplp-grey" />
                                    </Button>
                                    <Button variant="ghost" size="sm" title="Eliminar" onClick={() => setDeleteTarget(item)}>
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filtered.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-cplp-grey py-8">
                                    {enrollments.length === 0
                                        ? "Ainda não há inscrições."
                                        : "Nenhuma inscrição corresponde à pesquisa."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={detail !== null} onOpenChange={(open) => !open && setDetail(null)}>
                {detail && (
                    <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{detail.name}</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 text-sm">
                            <div className="flex items-center justify-between">
                                <Badge className={STATUS_STYLES[detail.status]}>
                                    {ENROLLMENT_STATUS_LABELS[detail.status]}
                                </Badge>
                                <span className="text-xs text-cplp-grey">
                                    {new Date(detail.createdAt).toLocaleString("pt-PT")}
                                </span>
                            </div>

                            <div className="space-y-1.5">
                                <a
                                    href={`mailto:${detail.email}`}
                                    className="flex items-center gap-2 text-cplp-blue hover:text-cplp-blue-hover"
                                >
                                    <Mail className="w-4 h-4" />
                                    {detail.email}
                                </a>
                                {detail.phone && (
                                    <a
                                        href={`tel:${detail.phone}`}
                                        className="flex items-center gap-2 text-cplp-blue hover:text-cplp-blue-hover"
                                    >
                                        <Phone className="w-4 h-4" />
                                        {detail.phone}
                                    </a>
                                )}
                            </div>

                            <dl className="grid grid-cols-2 gap-3 border-t border-cplp-line pt-4">
                                <div>
                                    <dt className="text-xs text-cplp-grey">Curso</dt>
                                    <dd className="text-cplp-navy font-medium">
                                        {detail.course?.title ?? "Curso eliminado"}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-cplp-grey">Empresa</dt>
                                    <dd className="text-cplp-navy font-medium">{detail.company ?? "—"}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-cplp-grey">Função</dt>
                                    <dd className="text-cplp-navy font-medium">{detail.role ?? "—"}</dd>
                                </div>
                            </dl>

                            {detail.message && (
                                <div className="border-t border-cplp-line pt-4">
                                    <p className="text-xs text-cplp-grey mb-1">Mensagem</p>
                                    <p className="text-cplp-ink whitespace-pre-wrap leading-relaxed">
                                        {detail.message}
                                    </p>
                                </div>
                            )}

                            <form
                                className="border-t border-cplp-line pt-4 space-y-2"
                                action={(formData) =>
                                    handleSaveNotes(detail.id, String(formData.get("notes") ?? ""))
                                }
                            >
                                <Label htmlFor="notes">Notas internas</Label>
                                <Textarea
                                    id="notes"
                                    name="notes"
                                    defaultValue={detail.notes ?? ""}
                                    className="rounded-md h-24"
                                    placeholder="Registo de contactos, próximos passos..."
                                />
                                <DialogFooter>
                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md"
                                    >
                                        {isPending ? "A guardar..." : "Guardar notas"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </div>
                    </DialogContent>
                )}
            </Dialog>

            <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar inscrição?</AlertDialogTitle>
                        <AlertDialogDescription>
                            A inscrição de &quot;{deleteTarget?.name}&quot; será removida permanentemente.
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
