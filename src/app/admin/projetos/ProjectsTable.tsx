"use client";

import { useState, useTransition } from "react";
import type { Project } from "@prisma/client";
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
import ProjectForm from "./ProjectForm";
import { deleteProject } from "./actions";

export default function ProjectsTable({ projects }: { projects: Project[] }) {
    const [dialogProject, setDialogProject] = useState<Project | "new" | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (!deleteTarget) return;
        const id = deleteTarget.id;
        startTransition(async () => {
            await deleteProject(id);
            toast.success("Projeto eliminado.");
            setDeleteTarget(null);
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-cplp-navy">Projetos</h1>
                <Button
                    onClick={() => setDialogProject("new")}
                    className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Novo Projeto
                </Button>
            </div>

            <div className="bg-white border border-cplp-line rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ordem</TableHead>
                            <TableHead>Título</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Imagem</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell>{project.order}</TableCell>
                                <TableCell className="font-medium text-cplp-navy">{project.title}</TableCell>
                                <TableCell className="text-cplp-grey">{project.category}</TableCell>
                                <TableCell>
                                    {project.imageUrl ? (
                                        <Badge variant="secondary">Com imagem</Badge>
                                    ) : (
                                        <span className="text-xs text-cplp-grey">Padrão de cor</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {project.comingSoon && <Badge variant="outline">Em breve</Badge>}
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="ghost" size="sm" onClick={() => setDialogProject(project)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(project)}>
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {projects.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-cplp-grey py-8">
                                    Sem projetos ainda.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={dialogProject !== null} onOpenChange={(open) => !open && setDialogProject(null)}>
                {dialogProject && (
                    <ProjectForm
                        project={dialogProject === "new" ? undefined : dialogProject}
                        onSuccess={() => {
                            setDialogProject(null);
                            toast.success(dialogProject === "new" ? "Projeto criado." : "Projeto atualizado.");
                        }}
                    />
                )}
            </Dialog>

            <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar projeto?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita. O projeto &quot;{deleteTarget?.title}&quot; será removido
                            permanentemente, incluindo a imagem associada.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isPending} className="bg-red-600 hover:bg-red-700">
                            {isPending ? "A eliminar..." : "Eliminar"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
