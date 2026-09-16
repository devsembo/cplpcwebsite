"use client";

import { useState, useTransition } from "react";
import type { Company } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Building2, Plus, Pencil, Trash2, Ticket, Users } from "lucide-react";
import { toast } from "sonner";
import CompanyForm from "./CompanyForm";
import { deleteCompany } from "./actions";

export type CompanyRow = Company & { _count: { enrollments: number } };

export default function CompaniesTable({ companies }: { companies: CompanyRow[] }) {
    const [dialogCompany, setDialogCompany] = useState<CompanyRow | "new" | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<CompanyRow | null>(null);
    const [isPending, startTransition] = useTransition();

    const totalSeats = companies.reduce((sum, c) => sum + (c.seatsContracted ?? 0), 0);
    const totalFormandos = companies.reduce((sum, c) => sum + c._count.enrollments, 0);

    const handleDelete = () => {
        if (!deleteTarget) return;
        const id = deleteTarget.id;
        startTransition(async () => {
            await deleteCompany(id);
            toast.success("Empresa eliminada.");
            setDeleteTarget(null);
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold text-cplp-navy">Empresas Clientes</h1>
                <Button
                    onClick={() => setDialogCompany("new")}
                    className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Nova Empresa
                </Button>
            </div>
            <p className="text-sm text-cplp-grey mb-6">
                Carteira de clientes com contrato de formação corporativa.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                    <CardContent className="p-5 flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-cplp-blue" />
                        <div>
                            <p className="text-xl font-bold text-cplp-navy">{companies.length}</p>
                            <p className="text-xs text-cplp-grey">Clientes ativos</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                    <CardContent className="p-5 flex items-center gap-3">
                        <Ticket className="w-5 h-5 text-cplp-blue" />
                        <div>
                            <p className="text-xl font-bold text-cplp-navy">{totalSeats}</p>
                            <p className="text-xs text-cplp-grey">Vagas contratadas</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                    <CardContent className="p-5 flex items-center gap-3">
                        <Users className="w-5 h-5 text-cplp-blue" />
                        <div>
                            <p className="text-xl font-bold text-cplp-navy">{totalFormandos}</p>
                            <p className="text-xs text-cplp-grey">Formandos inscritos</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
                {companies.map((company) => (
                    <Card key={company.id} className="border border-cplp-line bg-white shadow-none rounded-lg">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h2 className="font-bold text-cplp-navy">{company.name}</h2>
                                    <p className="text-sm text-cplp-grey">{company.sector ?? "Setor não indicado"}</p>
                                </div>
                                <div className="flex gap-1 shrink-0">
                                    <Button variant="ghost" size="sm" title="Editar" onClick={() => setDialogCompany(company)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        title="Eliminar"
                                        onClick={() => setDeleteTarget(company)}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </Button>
                                </div>
                            </div>

                            {company.contractLabel && (
                                <span className="inline-block mt-3 text-xs font-semibold uppercase tracking-wide bg-cplp-bg text-cplp-navy rounded px-2 py-1">
                                    {company.contractLabel}
                                </span>
                            )}

                            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <dt className="text-xs text-cplp-grey">Vagas</dt>
                                    <dd className="font-semibold text-cplp-navy tabular-nums">
                                        {company._count.enrollments}
                                        {company.seatsContracted ? `/${company.seatsContracted}` : ""}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-cplp-grey">Gestor de conta</dt>
                                    <dd className="font-semibold text-cplp-navy">{company.accountManager ?? "—"}</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>
                ))}
                {companies.length === 0 && (
                    <p className="text-sm text-cplp-grey bg-white border border-cplp-line rounded-lg p-8 text-center lg:col-span-2">
                        Ainda não há empresas clientes registadas.
                    </p>
                )}
            </div>

            <Dialog open={dialogCompany !== null} onOpenChange={(open) => !open && setDialogCompany(null)}>
                {dialogCompany && (
                    <CompanyForm
                        company={dialogCompany === "new" ? undefined : dialogCompany}
                        onSuccess={() => {
                            setDialogCompany(null);
                            toast.success(dialogCompany === "new" ? "Empresa criada." : "Empresa atualizada.");
                        }}
                    />
                )}
            </Dialog>

            <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eliminar empresa?</AlertDialogTitle>
                        <AlertDialogDescription>
                            &quot;{deleteTarget?.name}&quot; será removida. Os formandos ligados a esta empresa
                            não são eliminados, apenas deixam de ter empresa associada.
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
