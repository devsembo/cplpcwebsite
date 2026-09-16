"use client";

import { useState, useTransition } from "react";
import type { Service } from "@prisma/client";
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
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { getServiceIcon } from "@/lib/service-icons";
import ServiceForm from "./ServiceForm";
import { deleteService } from "./actions";

export default function ServicesTable({ services }: { services: Service[] }) {
    const [dialogService, setDialogService] = useState<Service | "new" | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (!deleteTarget) return;
        const id = deleteTarget.id;
        startTransition(async () => {
            await deleteService(id);
            toast.success("Serviço eliminado.");
            setDeleteTarget(null);
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold text-cplp-navy">Serviços</h1>
                <Button
                    onClick={() => setDialogService("new")}
                    className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Novo Serviço
                </Button>
            </div>
            <p className="text-sm text-cplp-grey mb-6">
                As áreas de serviço aparecem na homepage, no menu de navegação e na página
                /servicos, cada uma com página própria.
            </p>

            <div className="bg-white border border-cplp-line rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-16">Ordem</TableHead>
                            <TableHead>Serviço</TableHead>
                            <TableHead>Itens</TableHead>
                            <TableHead>Tradução EN</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.map((service) => {
                            const Icon = getServiceIcon(service.icon);
                            return (
                                <TableRow key={service.id}>
                                    <TableCell className="text-cplp-grey">{service.order}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-md border border-cplp-line flex items-center justify-center shrink-0">
                                                <Icon className="w-4 h-4 text-cplp-blue" strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-cplp-navy">{service.title}</p>
                                                <p className="text-xs text-cplp-grey">/servicos/{service.slug}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-cplp-grey">{service.details.length}</TableCell>
                                    <TableCell>
                                        {service.titleEn ? (
                                            <Badge variant="secondary">Traduzido</Badge>
                                        ) : (
                                            <span className="text-xs text-cplp-grey">Usa português</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={service.published ? "default" : "outline"}>
                                            {service.published ? "Visível" : "Oculto"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-1">
                                        {service.published && (
                                            <Button variant="ghost" size="sm" asChild title="Ver no site">
                                                <a href={`/servicos/${service.slug}`} target="_blank" rel="noreferrer">
                                                    <ExternalLink className="w-4 h-4 text-cplp-grey" />
                                                </a>
                                            </Button>
                                        )}
                                        <Button variant="ghost" size="sm" title="Editar" onClick={() => setDialogService(service)}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" title="Eliminar" onClick={() => setDeleteTarget(service)}>
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {services.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-cplp-grey py-8">
                                    Sem serviços. Corre <code>pnpm db:seed</code> para importar os atuais ou
                                    cria o primeiro aqui.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={dialogService !== null} onOpenChange={(open) => !open && setDialogService(null)}>
                {dialogService && (
                    <ServiceForm
                        service={dialogService === "new" ? undefined : dialogService}
                        onSuccess={() => {
                            setDialogService(null);
                            toast.success(dialogService === "new" ? "Serviço criado." : "Serviço atualizado.");
                        }}
                    />
                )}
            </Dialog>

            <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar serviço?</AlertDialogTitle>
                        <AlertDialogDescription>
                            O serviço &quot;{deleteTarget?.title}&quot; deixa de aparecer no site e o endereço
                            /servicos/{deleteTarget?.slug} passa a dar erro 404. Se for temporário, usa antes
                            a opção &quot;Visível no site&quot;.
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
