'use client';

import { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableHeader,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
} from '@/components/ui/table';
import { saveAs } from 'file-saver';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthContext } from '@/contexts/AuthContext';
import { api } from '@/services/api';

interface Apoio {
    nome: string;
    telemovel: string;
    distrito: string;
    nomeLider: string;
    telemovelLider: string;
}

export default function DashboardPage() {
    const [apoios, setApoios] = useState<Apoio[]>([]);
    const [filtro, setFiltro] = useState('');
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, signOut } = useContext(AuthContext);

    useEffect(() => {
        const fetchApoiantes = async () => {
            if (!isAuthenticated) {
                toast.error('Você precisa estar logado para acessar esta página.');
                return;
            }

            try {
                setLoading(true);
                const response = await api.get('/api/apoiantes');
                setApoios(response.data);
            } catch (err) {
                console.error('Erro ao buscar dados:', err);
                toast.error('Erro ao buscar dados. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchApoiantes();
    }, [isAuthenticated]);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(apoios);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Apoiantes');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'apoios.xlsx');
        toast.success('Exportação para Excel concluída!');
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Nome', 'Telemóvel', 'Distrito', 'Líder', 'Telemóvel Líder']],
            body: apoios.map((a) => [
                a.nome,
                a.telemovel,
                a.distrito,
                a.nomeLider,
                a.telemovelLider,
            ]),
            styles: { overflow: 'linebreak' },
        });
        doc.save('apoios.pdf');
        toast.success('Exportação para PDF concluída!');
    };

    const dadosFiltrados = apoios.filter(
        (a) =>
            a.nome.toLowerCase().includes(filtro.toLowerCase()) ||
            a.distrito.toLowerCase().includes(filtro.toLowerCase())
    );

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Lista de Apoiantes</h1>
            <div className="flex flex-col gap-3 mb-4">
                <Input
                    placeholder="Filtrar por nome ou distrito..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="w-full text-sm"
                    aria-label="Filtrar apoiantes por nome ou distrito"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Button onClick={exportToExcel} className="w-full text-sm">
                        Exportar Excel
                    </Button>
                    <Button onClick={exportToPDF} className="w-full text-sm">
                        Exportar PDF
                    </Button>
                    <Button onClick={signOut} variant="destructive" className="w-full text-sm">
                        Sair
                    </Button>
                </div>
            </div>
            {loading ? (
                <div className="text-center py-8 text-sm">Carregando...</div>
            ) : (
                <div className="overflow-x-auto">
                    <Table className="w-full">
                        <TableHeader className="hidden sm:table-header-group">
                            <TableRow>
                                <TableHead className="text-sm">Nome</TableHead>
                                <TableHead className="text-sm">Telemóvel</TableHead>
                                <TableHead className="text-sm">Distrito</TableHead>
                                <TableHead className="text-sm">Nome Líder</TableHead>
                                <TableHead className="text-sm">Telemóvel Líder</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dadosFiltrados.length > 0 ? (
                                dadosFiltrados.map((apoio, i) => (
                                    <TableRow
                                        key={i}
                                        className="flex flex-col sm:table-row border-b sm:border-none py-4 sm:py-0"
                                    >
                                        <TableCell
                                            className="flex items-center justify-between sm:table-cell py-1 sm:py-2 text-sm"
                                            data-label="Nome"
                                        >
                                            <span className="font-semibold sm:hidden">Nome:</span>
                                            <span>{apoio.nome}</span>
                                        </TableCell>
                                        <TableCell
                                            className="flex items-center justify-between sm:table-cell py-1 sm:py-2 text-sm"
                                            data-label="Telemóvel"
                                        >
                                            <span className="font-semibold sm:hidden">Telemóvel:</span>
                                            <span>{apoio.telemovel}</span>
                                        </TableCell>
                                        <TableCell
                                            className="flex items-center justify-between sm:table-cell py-1 sm:py-2 text-sm"
                                            data-label="Distrito"
                                        >
                                            <span className="font-semibold sm:hidden">Distrito:</span>
                                            <span>{apoio.distrito}</span>
                                        </TableCell>
                                        <TableCell
                                            className="flex items-center justify-between sm:table-cell py-1 sm:py-2 text-sm"
                                            data-label="Nome Líder"
                                        >
                                            <span className="font-semibold sm:hidden">Nome Líder:</span>
                                            <span>{apoio.nomeLider}</span>
                                        </TableCell>
                                        <TableCell
                                            className="flex items-center justify-between sm:table-cell py-1 sm:py-2 text-sm"
                                            data-label="Telemóvel Líder"
                                        >
                                            <span className="font-semibold sm:hidden">Telemóvel Líder:</span>
                                            <span>{apoio.telemovelLider}</span>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4 text-sm">
                                        Nenhum resultado encontrado.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}