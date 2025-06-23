"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { api } from "@/services/api"; // Certifique-se de que esse `api` tem baseURL configurada

interface TopScorer {
    id: number;
    name: string;
    country: string;
    goals: number;
}

function normalizeCountryKey(name: string) {
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/-/g, " ")
        .trim();
}

const countryFlags: { [key: string]: string } = {
    angola: "ao.png",
    "cabo verde": "cv.png",
    "guine bissau": "gw.png",
    "sao tome e principe": "stp.png",
    brasil: "br.png",
    portugal: "pt.png",
    mocambique: "mz.png",
    "timor-leste": "tl.png",
};

function getFlagSrc(countryName: string) {
    const key = normalizeCountryKey(countryName);
    const fileName = countryFlags[key];
    return fileName ? `/torneio/países/${fileName}` : "/países/default.png";
}

export default function StatsTable() {
    const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScorers = async () => {
            try {
                const response = await api.get("/api/jogadores");
                setTopScorers(response.data);
            } catch (error) {
                console.error("Erro ao buscar jogadores:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchScorers();
    }, []);

    return (
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <Table className="w-full min-w-0 sm:min-w-[500px]">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Nome</TableHead>
                        <TableHead className="text-xs sm:text-sm px-2 sm:px-4">País</TableHead>
                        <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Gols</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-xs sm:text-sm px-2 sm:px-4">
                                Carregando...
                            </TableCell>
                        </TableRow>
                    ) : topScorers.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-xs sm:text-sm px-2 sm:px-4">
                                Sem marcadores disponíveis
                            </TableCell>
                        </TableRow>
                    ) : (
                        topScorers.map((scorer) => (
                            <TableRow key={scorer.id}>
                                <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{scorer.name}</TableCell>
                                <TableCell className="text-xs sm:text-sm px-2 sm:px-4 flex items-center gap-1">
                                    <Image
                                        src={getFlagSrc(scorer.country)}
                                        alt={scorer.country}
                                        className="inline-block w-6 h-4 object-contain"
                                        width={24}
                                        height={16}
                                    />
                                    {scorer.country}
                                </TableCell>
                                <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{scorer.goals}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
