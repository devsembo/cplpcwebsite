'use client';
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { api } from "@/services/api";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

interface Registration {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    organization?: string;
    position?: string;
    expectations?: string;
    consent: boolean;
    newsletter?: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function Dashboard() {
    const [registos, setRegistos] = useState<Registration[]>([]);
    const [pesquisa, setPesquisa] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const carregarRegistos = async () => {
            try {
                setLoading(true);
                const response = await api.get('/api/conferece/participants');
                setRegistos(response.data);
            } catch (err) {
                setError("Erro ao carregar registos. Tente novamente mais tarde.");
                console.error("Erro ao carregar registos:", err);
            } finally {
                setLoading(false);
            }
        };

        carregarRegistos();
    }, []);

    const filtrados = registos.filter((r) => {
        const termo = pesquisa.trim().toLowerCase();
        return !termo || r.email.toLowerCase().includes(termo) || r.id.toLowerCase().includes(termo);
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Lista de Registos", 10, 10);
        filtrados.forEach((r, index) => {
            doc.text(`${index + 1}. Nome: ${r.firstName} ${r.lastName}, Telefone: ${r.phone}`, 10, 20 + index * 10);
        });
        doc.save("registos.pdf");
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filtrados.map(r => ({
            ID: r.id,
            Nome: `${r.firstName} ${r.lastName}`,
            Email: r.email,
            Telefone: r.phone,
            Organização: r.organization || "-",
            Cargo: r.position || "-",
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Registos");
        XLSX.writeFile(workbook, "registos.xlsx");
    };

    if (loading) {
        return <div className="container mx-auto px-4 py-8 text-center">Carregando...</div>;
    }

    if (error) {
        return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;
    }

    return (
        <main className="container mx-auto px-6 sm:px-4 py-8">
            <section className="mt-6">
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <CardTitle className="text-xl sm:text-2xl">Dashboard de Registos</CardTitle>
                        <div className="text-sm text-muted-foreground">Total: {filtrados.length}</div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    placeholder="Pesquisar por nome, e-mail ou ID"
                                    value={pesquisa}
                                    onChange={(e) => setPesquisa(e.target.value)}
                                    className="pl-9"
                                    aria-label="Pesquisar registos"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <Table className="min-w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="hidden sm:table-cell">id</TableHead>
                                        <TableHead>Nome</TableHead>
                                        <TableHead className="hidden sm:table-cell">E-mail</TableHead>
                                        <TableHead>Telefone</TableHead>
                                        <TableHead className="hidden sm:table-cell">Organização</TableHead>
                                        <TableHead className="hidden sm:table-cell">Cargo</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filtrados.length === 0 ?
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center text-muted-foreground">Sem resultados para a pesquisa atual.</TableCell>
                                        </TableRow>
                                        : <>{filtrados.map((r) =>
                                            <TableRow key={r.id}>
                                                <TableCell className="hidden sm:table-cell font-medium">{r.id}</TableCell>
                                                <TableCell className="font-medium">{r.firstName} {r.lastName}</TableCell>
                                                <TableCell className="hidden sm:table-cell truncate max-w-[220px] sm:max-w-none">{r.email}</TableCell>
                                                <TableCell>{r.phone}</TableCell>
                                                <TableCell className="hidden sm:table-cell">{r.organization || "-"}</TableCell>
                                                <TableCell className="hidden sm:table-cell">{r.position || "-"}</TableCell>
                                            </TableRow>
                                        )}</>}
                                </TableBody>
                            </Table>

                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                            <div className="text-sm text-muted-foreground">
                                A mostrar <span className="font-medium">{filtrados.length}</span> registo(s)
                            </div>
                            <div className="flex-col gap-2 md:flex-row flex">
                                <Button variant="outline" onClick={exportToPDF}>Exportar PDF</Button>
                                <Button variant="outline" onClick={exportToExcel}>Exportar Excel</Button>
                                <Button variant="ghost" onClick={() => setPesquisa("")}>
                                    Limpar pesquisa
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}