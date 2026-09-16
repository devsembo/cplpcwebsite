"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import type { Course } from "@prisma/client";
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
import { COURSE_FORMAT_LABELS } from "@/lib/content-labels";
import { deleteCourse } from "./actions";

export type CourseWithCount = Course & { _count: { enrollments: number } };

type Filter = "all" | "published" | "draft";

const FILTERS: { value: Filter; label: string }[] = [
    { value: "all", label: "Todos" },
    { value: "published", label: "Publicados" },
    { value: "draft", label: "Rascunhos" },
];

export default function CoursesTable({ courses }: { courses: CourseWithCount[] }) {
    const [deleteTarget, setDeleteTarget] = useState<CourseWithCount | null>(null);
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<Filter>("all");

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();
        return courses.filter((course) => {
            const matchesSearch =
                !query ||
                course.title.toLowerCase().includes(query) ||
                course.area.toLowerCase().includes(query) ||
                course.tags.some((tag) => tag.toLowerCase().includes(query));
            const matchesFilter =
                filter === "all" || (filter === "published" ? course.published : !course.published);
            return matchesSearch && matchesFilter;
        });
    }, [courses, search, filter]);

    const handleDelete = () => {
        if (!deleteTarget) return;
        const id = deleteTarget.id;
        startTransition(async () => {
            await deleteCourse(id);
            toast.success("Curso eliminado.");
            setDeleteTarget(null);
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold text-cplp-navy">Cursos</h1>
                <Button asChild className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md gap-2">
                    <Link href="/admin/cursos/nova">
                        <Plus className="w-4 h-4" />
                        Novo Curso
                    </Link>
                </Button>
            </div>
            <p className="text-sm text-cplp-grey mb-6">
                Os cursos publicados aparecem na página Academy, cada um com página própria e
                formulário de inscrição.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cplp-grey" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Procurar por título, área ou tag..."
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
                            <TableHead>Curso</TableHead>
                            <TableHead>Formato</TableHead>
                            <TableHead>Início</TableHead>
                            <TableHead>Inscrições</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell className="text-cplp-grey">{course.order}</TableCell>
                                <TableCell className="font-medium text-cplp-navy">
                                    {course.title}
                                    <p className="text-xs font-normal text-cplp-grey mt-0.5">
                                        {[course.area, course.level].filter(Boolean).join(" · ")}
                                    </p>
                                </TableCell>
                                <TableCell className="text-cplp-grey">
                                    {COURSE_FORMAT_LABELS[course.format]}
                                </TableCell>
                                <TableCell className="text-cplp-grey">
                                    {course.startDate
                                        ? new Date(course.startDate).toLocaleDateString("pt-PT")
                                        : "—"}
                                </TableCell>
                                <TableCell>
                                    {course._count.enrollments > 0 ? (
                                        <Link
                                            href="/admin/inscricoes"
                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cplp-blue hover:text-cplp-blue-hover"
                                        >
                                            <Users className="w-3.5 h-3.5" />
                                            {course._count.enrollments}
                                        </Link>
                                    ) : (
                                        <span className="text-xs text-cplp-grey">0</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5">
                                        <Badge variant={course.published ? "default" : "outline"}>
                                            {course.published ? "Publicado" : "Rascunho"}
                                        </Badge>
                                        {course.featured && <Badge variant="secondary">Destaque</Badge>}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right space-x-1">
                                    {course.published && (
                                        <Button variant="ghost" size="sm" asChild title="Ver no site">
                                            <a href={`/academy/${course.slug}`} target="_blank" rel="noreferrer">
                                                <ExternalLink className="w-4 h-4 text-cplp-grey" />
                                            </a>
                                        </Button>
                                    )}
                                    <Button variant="ghost" size="sm" asChild title="Editar">
                                        <Link href={`/admin/cursos/${course.id}/editar`}>
                                            <Pencil className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        title="Eliminar"
                                        onClick={() => setDeleteTarget(course)}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filtered.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-cplp-grey py-8">
                                    {courses.length === 0
                                        ? "Ainda não há cursos. Cria o primeiro em \"Novo Curso\"."
                                        : "Nenhum curso corresponde à pesquisa."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar curso?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita. O curso &quot;{deleteTarget?.title}&quot; será
                            removido, juntamente com as{" "}
                            {deleteTarget?._count.enrollments ?? 0} inscrição(ões) associadas.
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
