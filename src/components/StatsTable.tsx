"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

interface TopScorer {
    id: number;
    name: string;
    country: string;
    goals: number;
}

interface StatsTableProps {
    topScorers: TopScorer[];
}

function normalizeCountryKey(name: string) {
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove acentos
        .replace(/-/g, " ") // se usar espaços no objeto
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


export default function StatsTable({ topScorers }: StatsTableProps) {
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
                    {topScorers.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-xs sm:text-sm px-2 sm:px-4">
                                Sem marcadores disponíveis
                            </TableCell>
                        </TableRow>
                    ) : (
                        topScorers.map((scorer) => (
                            <TableRow key={scorer.id}>
                                <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{scorer.name}</TableCell>
                                <Image
                                    src={getFlagSrc(scorer.country)}
                                    alt={scorer.country}
                                    className="inline-block w-6 h-4 mr-1 object-contain"
                                    width={6}
                                    height={8}
                                />
                                <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{scorer.goals}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}