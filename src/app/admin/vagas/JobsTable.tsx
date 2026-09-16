"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import type { JobOpening } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
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
import { Plus, Pencil, Trash2, Search, ExternalLink, Users } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { JOB_MODE_LABELS, JOB_TYPE_LABELS } from "@/lib/content-labels";
import { deleteJob } from "./actions";

export type JobWithCount = JobOpening & { _count: { applications: number } };

type Filter = "all" | "open" | "closed";

const FILTERS: { value: Filter; label: string }[] = [
    { value: "all", label: "Todas" },
    { value: "open", label: "Abertas" },
    { value: "closed", label: "Fechadas" },
];

// Uma vaga só está aberta no site se estiver publicada e dentro do prazo.
function isOpen(job: JobOpening): boolean {
    if (!job.published) return false;
    return !job.applyDeadline || new Date(job.applyDeadline) >= new Date();
}

export default function JobsTable({ jobs }: { jobs: JobWithCount[] }) {
    const [deleteTarget, setDeleteTarget] = useState<JobWithCount | null>(null);
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<Filter>("all");

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        return jobs.filter((job) => {
            const matchesSearch =
                !query ||
                job.title.toLowerCase().includes(query) ||
                job.location.toLowerCase().includes(query) ||
                (job.department ?? "").toLowerCase().includes(query);
            const matchesFilter =
                filter === "all" || (filter === "open" ? isOpen(job) : !isOpen(job));
            return matchesSearch && matchesFilter;
        });
    }, [jobs, search, filter]);

    const handleDelete = () => {
        if (!deleteTarget) return;
        const id = deleteTarget.id;
        startTransition(async () => {
            await deleteJob(id);
            toast.success("Vaga eliminada.");
            setDeleteTarget(null);
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold text-cplp-navy">Vagas</h1>
                <Button asChild className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md gap-2">
                    <Link href="/admin/vagas/nova">
                        <Plus className="w-4 h-4" />
                        Nova Vaga
                    </Link>
                </Button>
            </div>
            <p className="text-sm text-cplp-grey mb-6">
                As vagas abertas aparecem na página Carreiras, cada uma com página própria e
                formulário de candidatura.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cplp-grey" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Procurar por título, local ou departamento..."
                        className="rounded-md pl-9"
                    />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                    {FILTERS.map((item) => (
                        <button
                            key={item.value}
                            type="button"
                            onClick={() => setFilter(item.value)}
                            className={cn(
                                "text-sm font-medium px-3 py-1.5 rounded-md border transition-colors cursor-pointer",
                                filter === item.value
                                    ? "bg-cplp-blue text-white border-cplp-blue"
                                    : "bg-white text-cplp-grey border-cplp-line hover:bg-cplp-bg",
                            )}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white border border-cplp-line rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-16">Ordem</TableHead>
                            <TableHead>Vaga</TableHead>
                            <TableHead>Local</TableHead>
                            <TableHead>Prazo</TableHead>
                            <TableHead>Candidaturas</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell className="text-cplp-grey">{job.order}</TableCell>
                                <TableCell className="font-medium text-cplp-navy">
                                    {job.title}
                                    <p className="text-xs font-normal text-cplp-grey mt-0.5">
                                        {[job.department, JOB_TYPE_LABELS[job.type], JOB_MODE_LABELS[job.mode]]
                                            .filter(Boolean)
                                            .join(" · ")}
                                    </p>
                                </TableCell>
                                <TableCell className="text-cplp-grey">{job.location}</TableCell>
                                <TableCell className="text-cplp-grey">
                                    {job.applyDeadline
                                        ? new Date(job.applyDeadline).toLocaleDateString("pt-PT")
                                        : "Sem prazo"}
                                </TableCell>
                                <TableCell>
                                    {job._count.applications > 0 ? (
                                        <Link
                                            href="/admin/candidaturas"
                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cplp-blue hover:text-cplp-blue-hover"
                                        >
                                            <Users className="w-3.5 h-3.5" />
                                            {job._count.applications}
                                        </Link>
                                    ) : (
                                        <span className="text-xs text-cplp-grey">0</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={isOpen(job) ? "default" : "outline"}>
                                        {isOpen(job) ? "Aberta" : job.published ? "Prazo terminado" : "Rascunho"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-1">
                                    {isOpen(job) && (
                                        <Button variant="ghost" size="sm" asChild title="Ver no site">
                                            <a href={`/carreiras/${job.slug}`} target="_blank" rel="noreferrer">
                                                <ExternalLink className="w-4 h-4 text-cplp-grey" />
                                            </a>
                                        </Button>
                                    )}
                                    <Button variant="ghost" size="sm" asChild title="Editar">
                                        <Link href={`/admin/vagas/${job.id}/editar`}>
                                            <Pencil className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        title="Eliminar"
                                        onClick={() => setDeleteTarget(job)}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filtered.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-cplp-grey py-8">
                                    {jobs.length === 0
                                        ? "Ainda não há vagas. Cria a primeira em \"Nova Vaga\"."
                                        : "Nenhuma vaga corresponde à pesquisa."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar vaga?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita. A vaga &quot;{deleteTarget?.title}&quot; será
                            removida do site. As candidaturas já recebidas continuam disponíveis em
                            Candidaturas, marcadas como espontâneas.
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
