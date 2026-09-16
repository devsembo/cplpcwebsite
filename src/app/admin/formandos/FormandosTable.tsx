"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import type { CourseEnrollment, CourseFormat } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { Search, Eye } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { TRAINING_STATUS_LABELS } from "@/lib/content-labels";
import { updateFormandoProgress } from "./actions";

export type FormandoRow = CourseEnrollment & {
    course: { id: string; title: string; area: string; format: CourseFormat };
    session: { id: string; code: string; instructorName: string | null } | null;
    clientCompany: { id: string; name: string } | null;
};

const STATUS_STYLES: Record<CourseEnrollment["trainingStatus"], string> = {
    nao_iniciado: "bg-cplp-grey hover:bg-cplp-grey",
    em_curso: "bg-cplp-blue hover:bg-cplp-blue",
    concluido: "bg-cplp-green hover:bg-cplp-green",
    reprovado: "bg-red-600 hover:bg-red-600",
};

function EditableRow({ formando }: { formando: FormandoRow }) {
    const [progress, setProgress] = useState(String(formando.progress));
    const [grade, setGrade] = useState(formando.grade !== null ? String(formando.grade) : "");
    const [isPending, startTransition] = useTransition();

    const empresa = formando.clientCompany?.name ?? formando.company ?? "Particular";

    const handleSave = () => {
        const progressNum = Number(progress);
        const gradeNum = grade.trim() === "" ? null : Number(grade.replace(",", "."));
        startTransition(async () => {
            const result = await updateFormandoProgress(formando.id, {
                progress: progressNum,
                grade: gradeNum,
                hoursCompleted: formando.hoursCompleted,
            });
            if (result.error) {
                toast.error(result.error);
                return;
            }
            toast.success("Registo atualizado.", { description: formando.name });
        });
    };

    return (
        <TableRow>
            <TableCell>
                <Link href={`/admin/formandos/${formando.id}`} className="font-medium text-cplp-navy hover:text-cplp-blue">
                    {formando.name}
                </Link>
                <p className="text-xs text-cplp-grey">{empresa}</p>
            </TableCell>
            <TableCell className="text-cplp-grey">
                {formando.course.title}
                <p className="text-xs">{formando.session?.code ?? "Sem turma atribuída"}</p>
            </TableCell>
            <TableCell>
                <Input
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                    inputMode="numeric"
                    className="h-8 w-16 rounded-md tabular-nums"
                    aria-label={`Progresso de ${formando.name}`}
                />
            </TableCell>
            <TableCell>
                <Input
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    inputMode="decimal"
                    placeholder="—"
                    className="h-8 w-16 rounded-md tabular-nums"
                    aria-label={`Nota de ${formando.name}`}
                />
            </TableCell>
            <TableCell>
                <Badge className={STATUS_STYLES[formando.trainingStatus]}>
                    {TRAINING_STATUS_LABELS[formando.trainingStatus]}
                </Badge>
            </TableCell>
            <TableCell className="text-right space-x-1">
                <Button size="sm" onClick={handleSave} disabled={isPending} className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md">
                    {isPending ? "..." : "Guardar"}
                </Button>
                <Button variant="ghost" size="sm" asChild title="Ver ficha">
                    <Link href={`/admin/formandos/${formando.id}`}>
                        <Eye className="w-4 h-4" />
                    </Link>
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default function FormandosTable({ formandos }: { formandos: FormandoRow[] }) {
    const [search, setSearch] = useState("");
    const [companyFilter, setCompanyFilter] = useState("Todas");

    const companies = useMemo(() => {
        const names = new Set(formandos.map((f) => f.clientCompany?.name ?? f.company ?? "Particular"));
        return ["Todas", ...Array.from(names).sort()];
    }, [formandos]);

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        return formandos.filter((f) => {
            const empresa = f.clientCompany?.name ?? f.company ?? "Particular";
            const matchesCompany = companyFilter === "Todas" || empresa === companyFilter;
            const matchesSearch =
                !query ||
                f.name.toLowerCase().includes(query) ||
                f.email.toLowerCase().includes(query) ||
                f.course.title.toLowerCase().includes(query);
            return matchesCompany && matchesSearch;
        });
    }, [formandos, search, companyFilter]);

    return (
        <div>
            <h1 className="text-2xl font-bold text-cplp-navy mb-2">Formandos</h1>
            <p className="text-sm text-cplp-grey mb-6">
                Inscrições confirmadas: progresso, nota e horas de formação.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cplp-grey" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Procurar formando, curso ou email..."
                        className="rounded-md pl-9"
                    />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                    {companies.map((name) => (
                        <button
                            key={name}
                            type="button"
                            onClick={() => setCompanyFilter(name)}
                            className={cn(
                                "text-sm font-medium px-3 py-1.5 rounded-md border transition-colors cursor-pointer",
                                companyFilter === name
                                    ? "bg-cplp-blue text-white border-cplp-blue"
                                    : "bg-white text-cplp-grey border-cplp-line hover:bg-cplp-bg",
                            )}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white border border-cplp-line rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Formando</TableHead>
                            <TableHead>Curso / Turma</TableHead>
                            <TableHead>Progresso %</TableHead>
                            <TableHead>Nota /20</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((formando) => (
                            <EditableRow key={formando.id} formando={formando} />
                        ))}
                        {filtered.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-cplp-grey py-8">
                                    {formandos.length === 0
                                        ? "Ainda não há formandos. Confirma inscrições em Inscrições."
                                        : "Nenhum formando corresponde à pesquisa."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
