"use client";

import { useTransition } from "react";
import Link from "next/link";
import type { CourseEnrollment } from "@prisma/client";
import { Award, BadgeCheck, Clock, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { issueAllEligibleCertificates, issueCertificate } from "../formandos/actions";

export type CertificateRow = CourseEnrollment & {
    course: { title: string };
    session: { code: string } | null;
};

export default function CertificatesQueue({ enrollments }: { enrollments: CertificateRow[] }) {
    const [isPending, startTransition] = useTransition();

    const eligible = enrollments.filter((e) => e.certificateStatus === "elegivel");
    const issued = enrollments.filter((e) => e.certificateStatus === "emitido");

    const handleIssue = (id: string, name: string) => {
        startTransition(async () => {
            const result = await issueCertificate(id);
            if (result.error) {
                toast.error(result.error);
                return;
            }
            toast.success("Certificado emitido.", { description: name });
        });
    };

    const handleIssueAll = () => {
        startTransition(async () => {
            const count = await issueAllEligibleCertificates();
            toast.success(`${count} certificado${count === 1 ? "" : "s"} emitido${count === 1 ? "" : "s"}.`);
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold text-cplp-navy">Certificação</h1>
                <Button
                    disabled={eligible.length === 0 || isPending}
                    onClick={handleIssueAll}
                    className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md"
                >
                    Emitir todos os elegíveis
                </Button>
            </div>
            <p className="text-sm text-cplp-grey mb-6">
                Aprovação e emissão de certificados com código único e verificação online.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                    <CardContent className="p-5 flex items-center gap-3">
                        <BadgeCheck className="w-5 h-5 text-cplp-blue" />
                        <div>
                            <p className="text-xl font-bold text-cplp-navy">{eligible.length}</p>
                            <p className="text-xs text-cplp-grey">Elegíveis</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                    <CardContent className="p-5 flex items-center gap-3">
                        <Award className="w-5 h-5 text-cplp-blue" />
                        <div>
                            <p className="text-xl font-bold text-cplp-navy">{issued.length}</p>
                            <p className="text-xs text-cplp-grey">Emitidos</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                    <CardContent className="p-5 flex items-center gap-3">
                        <Clock className="w-5 h-5 text-cplp-blue" />
                        <div>
                            <p className="text-xl font-bold text-cplp-navy">{enrollments.length}</p>
                            <p className="text-xs text-cplp-grey">Total na fila</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white border border-cplp-line rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Formando</TableHead>
                            <TableHead>Curso</TableHead>
                            <TableHead className="text-right">Nota</TableHead>
                            <TableHead>Código</TableHead>
                            <TableHead className="text-right">Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {enrollments.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Link
                                        href={`/admin/formandos/${item.id}`}
                                        className="font-medium text-cplp-navy hover:text-cplp-blue"
                                    >
                                        {item.name}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-cplp-grey">
                                    {item.course.title}
                                    {item.session ? ` · ${item.session.code}` : ""}
                                </TableCell>
                                <TableCell className="text-right font-semibold text-cplp-navy tabular-nums">
                                    {item.grade?.toFixed(1) ?? "—"}
                                </TableCell>
                                <TableCell className="text-xs text-cplp-grey">
                                    {item.certificateCode ?? "—"}
                                </TableCell>
                                <TableCell className="text-right">
                                    {item.certificateStatus === "emitido" ? (
                                        <a
                                            href={`/certificado/${item.certificateCode}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cplp-blue hover:underline"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            Ver certificado
                                        </a>
                                    ) : (
                                        <Button
                                            size="sm"
                                            disabled={isPending}
                                            onClick={() => handleIssue(item.id, item.name)}
                                            className="bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md"
                                        >
                                            Emitir
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {enrollments.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-cplp-grey py-8">
                                    Sem formandos elegíveis ou certificados emitidos neste momento.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Card className="border border-cplp-line bg-white shadow-none rounded-lg mt-6">
                <CardContent className="p-6">
                    <p className="text-xs text-cplp-grey uppercase tracking-wide mb-3">Critérios de emissão</p>
                    <ul className="grid sm:grid-cols-3 gap-2 text-sm text-cplp-grey">
                        <li>Progresso do percurso a 100%.</li>
                        <li>Nota final igual ou superior a 10 valores.</li>
                        <li>Horas de formação validadas pelo formador.</li>
                    </ul>
                    <p className="text-xs text-cplp-grey mt-4 pt-4 border-t border-cplp-line">
                        Entidade em processo de preparação para certificação DGERT.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
