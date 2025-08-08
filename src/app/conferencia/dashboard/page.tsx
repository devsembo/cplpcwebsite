'use client';
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { api } from "@/services/api";

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
                const response = await api.get('/api/conferece/participants')
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
        return !termo ||  r.email.toLowerCase().includes(termo) || r.id.toLowerCase().includes(termo);
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (loading) {
        return <div className="container mx-auto px-4 py-8 text-center">Carregando...</div>;
    }

    if (error) {
        return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;
    }

    return (
        <main className="container mx-auto px-4 py-8">
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

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>id</TableHead>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>E-mail</TableHead>
                                        <TableHead>Telefone</TableHead>
                                        <TableHead>Organização</TableHead>
                                        <TableHead>Cargo</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filtrados.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={11} className="text-center text-muted-foreground">
                                                Sem resultados para a pesquisa atual.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filtrados.map((r) => (
                                            <TableRow key={r.id}>
                                                <TableCell className="font-medium">{r.id}</TableCell>
                                                <TableCell className="font-medium">{r.firstName} {r.lastName}</TableCell>
                                                <TableCell className="truncate max-w-[220px] sm:max-w-none">{r.email}</TableCell>
                                                <TableCell>{r.phone}</TableCell>
                                                <TableCell>{r.organization || "-"}</TableCell>
                                                <TableCell>{r.position || "-"}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                A mostrar <span className="font-medium">{filtrados.length}</span> registo(s)
                            </div>
                            <Button variant="ghost" onClick={() => setPesquisa("")}>
                                Limpar pesquisa
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}