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

// Interface para tipagem dos dados
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

    const dadosFiltrados = apoios.filter((a) =>
        a.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        a.distrito.toLowerCase().includes(filtro.toLowerCase())
    );

    if (!isAuthenticated) {
        return null; // Ou redirecionar manualmente, mas o contexto já cuida disso
    }

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Lista de Apoiantes</h1>
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <Input
                    placeholder="Filtrar por nome ou distrito..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="w-full md:w-1/3"
                    aria-label="Filtrar apoiantes por nome ou distrito"
                />
                <div className="flex gap-2 w-full md:w-auto">
                    <Button onClick={exportToExcel} className="w-full md:w-auto">
                        Exportar Excel
                    </Button>
                    <Button onClick={exportToPDF} className="w-full md:w-auto">
                        Exportar PDF
                    </Button>
                    <Button onClick={signOut} variant="destructive" className="w-full md:w-auto">
                        Sair
                    </Button>
                </div>
            </div>
            {loading ? (
                <div className="text-center py-10">Carregando...</div>
            ) : (
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[20%]">Nome</TableHead>
                            <TableHead className="w-[20%]">Telemóvel</TableHead>
                            <TableHead className="w-[20%]">Distrito</TableHead>
                            <TableHead className="w-[20%]">Nome Líder</TableHead>
                            <TableHead className="w-[20%]">Telemóvel Líder</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dadosFiltrados.length > 0 ? (
                            dadosFiltrados.map((apoio, i) => (
                                <TableRow key={i} className="hover:bg-gray-100">
                                    <TableCell className="py-2">{apoio.nome}</TableCell>
                                    <TableCell className="py-2">{apoio.telemovel}</TableCell>
                                    <TableCell className="py-2">{apoio.distrito}</TableCell>
                                    <TableCell className="py-2">{apoio.nomeLider}</TableCell>
                                    <TableCell className="py-2">{apoio.telemovelLider}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4">
                                    Nenhum resultado encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}