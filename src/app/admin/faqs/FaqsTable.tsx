"use client";

import { useState, useTransition } from "react";
import type { Faq } from "@prisma/client";
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
import FaqForm from "./FaqForm";
import { deleteFaq } from "./actions";

export default function FaqsTable({ faqs }: { faqs: Faq[] }) {
    const [dialogFaq, setDialogFaq] = useState<Faq | "new" | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Faq | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (!deleteTarget) return;
        const id = deleteTarget.id;
        startTransition(async () => {
            await deleteFaq(id);
            toast.success("Pergunta eliminada.");
            setDeleteTarget(null);
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold text-cplp-navy">FAQs</h1>
                <Button
                    onClick={() => setDialogFaq("new")}
                    className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Nova Pergunta
                </Button>
            </div>
            <p className="text-sm text-cplp-grey mb-6">
                Perguntas mostradas na página /faqs, pela ordem definida aqui.
            </p>

            <div className="bg-white border border-cplp-line rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-16">Ordem</TableHead>
                            <TableHead>Pergunta</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Tradução EN</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {faqs.map((faq) => (
                            <TableRow key={faq.id}>
                                <TableCell className="text-cplp-grey">{faq.order}</TableCell>
                                <TableCell className="font-medium text-cplp-navy max-w-md">
                                    {faq.question}
                                    <p className="text-xs font-normal text-cplp-grey mt-0.5 line-clamp-1">
                                        {faq.answer}
                                    </p>
                                </TableCell>
                                <TableCell className="text-cplp-grey">{faq.category ?? "—"}</TableCell>
                                <TableCell>
                                    {faq.questionEn ? (
                                        <Badge variant="secondary">Traduzida</Badge>
                                    ) : (
                                        <span className="text-xs text-cplp-grey">Usa português</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={faq.published ? "default" : "outline"}>
                                        {faq.published ? "Visível" : "Oculta"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-1">
                                    <Button variant="ghost" size="sm" title="Editar" onClick={() => setDialogFaq(faq)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" title="Eliminar" onClick={() => setDeleteTarget(faq)}>
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {faqs.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-cplp-grey py-8">
                                    Sem perguntas. Corre <code>pnpm db:seed</code> para importar as atuais ou
                                    cria a primeira aqui.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={dialogFaq !== null} onOpenChange={(open) => !open && setDialogFaq(null)}>
                {dialogFaq && (
                    <FaqForm
                        faq={dialogFaq === "new" ? undefined : dialogFaq}
                        onSuccess={() => {
                            setDialogFaq(null);
                            toast.success(dialogFaq === "new" ? "Pergunta criada." : "Pergunta atualizada.");
                        }}
                    />
                )}
            </Dialog>

            <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar pergunta?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita.
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
