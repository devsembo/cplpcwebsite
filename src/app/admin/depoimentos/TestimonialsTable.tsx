"use client";

import { useState, useTransition } from "react";
import type { Testimonial } from "@prisma/client";
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
import TestimonialForm from "./TestimonialForm";
import { deleteTestimonial } from "./actions";

export default function TestimonialsTable({ testimonials }: { testimonials: Testimonial[] }) {
    const [dialogItem, setDialogItem] = useState<Testimonial | "new" | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (!deleteTarget) return;
        const id = deleteTarget.id;
        startTransition(async () => {
            await deleteTestimonial(id);
            toast.success("Depoimento eliminado.");
            setDeleteTarget(null);
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold text-cplp-navy">Depoimentos</h1>
                <Button
                    onClick={() => setDialogItem("new")}
                    className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Novo Depoimento
                </Button>
            </div>
            <p className="text-sm text-cplp-grey mb-6">
                Testemunhos de clientes mostrados na homepage. Sem depoimentos visíveis, a secção
                não aparece no site.
            </p>

            <div className="bg-white border border-cplp-line rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-16">Ordem</TableHead>
                            <TableHead>Autor</TableHead>
                            <TableHead>Depoimento</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testimonials.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="text-cplp-grey">{item.order}</TableCell>
                                <TableCell>
                                    <p className="font-medium text-cplp-navy">{item.authorName}</p>
                                    <p className="text-xs text-cplp-grey">
                                        {[item.role, item.company].filter(Boolean).join(" · ") || "—"}
                                    </p>
                                </TableCell>
                                <TableCell className="text-cplp-grey max-w-md">
                                    <span className="line-clamp-2 text-sm">{item.quote}</span>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={item.published ? "default" : "outline"}>
                                        {item.published ? "Visível" : "Oculto"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-1">
                                    <Button variant="ghost" size="sm" title="Editar" onClick={() => setDialogItem(item)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" title="Eliminar" onClick={() => setDeleteTarget(item)}>
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {testimonials.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-cplp-grey py-8">
                                    Ainda não há depoimentos.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={dialogItem !== null} onOpenChange={(open) => !open && setDialogItem(null)}>
                {dialogItem && (
                    <TestimonialForm
                        testimonial={dialogItem === "new" ? undefined : dialogItem}
                        onSuccess={() => {
                            setDialogItem(null);
                            toast.success(dialogItem === "new" ? "Depoimento criado." : "Depoimento atualizado.");
                        }}
                    />
                )}
            </Dialog>

            <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar depoimento?</AlertDialogTitle>
                        <AlertDialogDescription>
                            O depoimento de &quot;{deleteTarget?.authorName}&quot; será removido
                            permanentemente, incluindo a fotografia.
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
