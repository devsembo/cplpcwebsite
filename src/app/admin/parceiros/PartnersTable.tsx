"use client";

import { useState, useTransition } from "react";
import type { Partner } from "@prisma/client";
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
import PartnerForm from "./PartnerForm";
import { deletePartner } from "./actions";

export default function PartnersTable({ partners }: { partners: Partner[] }) {
    const [dialogPartner, setDialogPartner] = useState<Partner | "new" | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Partner | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (!deleteTarget) return;
        const id = deleteTarget.id;
        startTransition(async () => {
            await deletePartner(id);
            toast.success("Parceiro eliminado.");
            setDeleteTarget(null);
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold text-cplp-navy">Parceiros</h1>
                <Button
                    onClick={() => setDialogPartner("new")}
                    className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Novo Parceiro
                </Button>
            </div>
            <p className="text-sm text-cplp-grey mb-6">
                Parceiros e clientes mostrados na homepage.
            </p>

            <div className="bg-white border border-cplp-line rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-16">Ordem</TableHead>
                            <TableHead>Logótipo</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Website</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {partners.map((partner) => (
                            <TableRow key={partner.id}>
                                <TableCell className="text-cplp-grey">{partner.order}</TableCell>
                                <TableCell>
                                    {partner.logoUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={partner.logoUrl}
                                            alt=""
                                            className="h-8 w-20 object-contain"
                                        />
                                    ) : (
                                        <span className="text-xs text-cplp-grey">Só nome</span>
                                    )}
                                </TableCell>
                                <TableCell className="font-medium text-cplp-navy">{partner.name}</TableCell>
                                <TableCell className="text-cplp-grey text-xs max-w-[200px] truncate">
                                    {partner.websiteUrl ?? "—"}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={partner.published ? "default" : "outline"}>
                                        {partner.published ? "Visível" : "Oculto"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-1">
                                    <Button variant="ghost" size="sm" title="Editar" onClick={() => setDialogPartner(partner)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" title="Eliminar" onClick={() => setDeleteTarget(partner)}>
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {partners.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-cplp-grey py-8">
                                    Sem parceiros. Corre <code>pnpm db:seed</code> para importar os atuais ou
                                    cria o primeiro aqui.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={dialogPartner !== null} onOpenChange={(open) => !open && setDialogPartner(null)}>
                {dialogPartner && (
                    <PartnerForm
                        partner={dialogPartner === "new" ? undefined : dialogPartner}
                        onSuccess={() => {
                            setDialogPartner(null);
                            toast.success(dialogPartner === "new" ? "Parceiro criado." : "Parceiro atualizado.");
                        }}
                    />
                )}
            </Dialog>

            <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar parceiro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            &quot;{deleteTarget?.name}&quot; será removido da homepage, incluindo o logótipo.
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
