"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { api } from "@/services/api";
import Image from "next/image";

type GameResult = {
    id: string;
    homeCountry: string;
    awayCountry: string;
    homeScore: number;
    awayScore: number;
    date: string;
};

type UpcomingGame = {
    id: number;
    homeCountry: string;
    awayCountry: string;
    date: string;
    time: string;
};

type TopScorer = {
    id: number;
    name: string;
    team: string;
    country: string;
    goals: number;
};

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
    brasil: "brazil.png",
    portugal: "pt.png",
    mocambique: "mz.png",
    "timor-leste": "tl.png",
};

function getFlagSrc(countryName: string) {
    const key = normalizeCountryKey(countryName);
    const fileName = countryFlags[key];
    return fileName ? `/torneio/países/${fileName}` : "/países/default.png";
}

export default function ResultsPage() {
    const [results, setResults] = useState<GameResult[]>([]);
    const [upcomingGames, setUpcomingGames] = useState<UpcomingGame[]>([]);
    const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [marcadoresRes, jogosRes, resultadosRes] = await Promise.all([
                    api.get('/api/marcadores'),
                    api.get('/api/jogos'),
                    api.get('/api/resultados'),
                ]);

                setTopScorers(marcadoresRes.data.data);
                setUpcomingGames(jogosRes.data.data);
                setResults(resultadosRes.data.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto py-2 px-2 sm:px-4 sm:py-4 md:px-6 md:py-6">
            <Card className="mb-4 sm:mb-6 md:mb-8">
                <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">Resultados e Jogos</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <Tabs defaultValue="results" className="w-full">
                        <TabsList className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-4">
                            <TabsTrigger value="results" className="w-full sm:w-auto text-sm sm:text-base">Resultados</TabsTrigger>
                            <TabsTrigger value="upcoming" className="w-full sm:w-auto text-sm sm:text-base">Jogos Futuros</TabsTrigger>
                            <TabsTrigger value="scorers" className="w-full sm:w-auto text-sm sm:text-base">Melhores Marcadores</TabsTrigger>
                        </TabsList>

                        <TabsContent value="results">
                            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                                <Table className="w-full min-w-0 sm:min-w-[700px]">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-xs px-1 sm:text-sm sm:px-2">Data</TableHead>
                                            <TableHead className="text-xs px-1 sm:text-sm sm:px-2">Equipa Casa</TableHead>
                                            <TableHead className="text-xs px-1 sm:text-sm sm:px-2">Resultado</TableHead>
                                            <TableHead className="text-xs px-1 sm:text-sm sm:px-2">Equipa Fora</TableHead>
                                            <TableHead className="text-xs px-1 sm:text-sm sm:px-2">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center text-xs sm:text-sm px-2 sm:px-4">Carregando...</TableCell>
                                            </TableRow>
                                        ) : results.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center text-xs sm:text-sm px-2 sm:px-4">Sem resultados disponíveis</TableCell>
                                            </TableRow>
                                        ) : (
                                            results.map((game) => (
                                                <TableRow
                                                    key={game.id}
                                                    className="hover:cursor-pointer hover:bg-gray-100"
                                                >
                                                    <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{new Date(game.date).toLocaleDateString("pt-PT")}</TableCell>
                                                    <TableCell className="text-xs sm:text-sm px-2 sm:px-4 hidden sm:table-cell">
                                                        <Image
                                                            src={getFlagSrc(game.homeCountry)}
                                                            alt={game.homeCountry}
                                                            className="inline-block w-6 h-4 mr-1 object-contain"
                                                            width={6}
                                                            height={8}
                                                        />
                                                        {game.homeCountry}
                                                    </TableCell>
                                                    <TableCell className="px-2 sm:px-4">
                                                        <Badge variant="secondary" className="text-xs sm:text-sm">{`${game.homeScore} - ${game.awayScore}`}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-xs sm:text-sm px-2 sm:px-4 hidden sm:table-cell">
                                                        <Image
                                                            src={getFlagSrc(game.awayCountry)}
                                                            alt={game.awayCountry}
                                                            className="inline-block w-6 h-4 mr-1 object-contain"
                                                            width={6}
                                                            height={8}
                                                        />
                                                        {game.awayCountry}
                                                    </TableCell>
                                                    <TableCell className="text-xs sm:text-sm px-2 sm:px-4">
                                                        <Link href={`/torneio/resultados/${game.id}`}>
                                                            <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                                                                Ver Detalhes
                                                            </button>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="upcoming">
                            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                                <Table className="w-full min-w-0 sm:min-w-[700px]">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Data</TableHead>
                                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Hora</TableHead>
                                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4 hidden sm:table-cell">Seleção de Casa</TableHead>
                                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4 hidden sm:table-cell">Seleção de Fora</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center text-xs sm:text-sm px-2 sm:px-4">Carregando...</TableCell>
                                            </TableRow>
                                        ) : upcomingGames.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center text-xs sm:text-sm px-2 sm:px-4">Sem jogos futuros disponíveis</TableCell>
                                            </TableRow>
                                        ) : (
                                            upcomingGames.map((game) => (
                                                <TableRow key={game.id}>
                                                    <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{new Date(game.date).toLocaleDateString("pt-PT")}</TableCell>
                                                    <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{game.time}</TableCell>
                                                    <TableCell className="text-xs sm:text-sm px-2 sm:px-4 hidden sm:table-cell">
                                                        <Image
                                                            src={getFlagSrc(game.homeCountry)}
                                                            alt={game.homeCountry}
                                                            className="inline-block w-6 h-4 mr-1 object-contain"
                                                            width={6}
                                                            height={8}
                                                        />
                                                        {game.homeCountry}
                                                    </TableCell>
                                                    <TableCell className="text-xs sm:text-sm px-2 sm:px-4 hidden sm:table-cell">
                                                        <Image
                                                            src={getFlagSrc(game.awayCountry)}
                                                            alt={game.awayCountry}
                                                            className="inline-block w-6 h-4 mr-1 object-contain"
                                                            width={6}
                                                            height={8}
                                                        />
                                                        {game.awayCountry}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="scorers">
                            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                                <Table className="w-full min-w-0 sm:min-w-[500px]">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Nome</TableHead>
                                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Equipa</TableHead>
                                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4 hidden sm:table-cell">País</TableHead>
                                            <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Golos</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center text-xs sm:text-sm px-2 sm:px-4">Carregando...</TableCell>
                                            </TableRow>
                                        ) : topScorers.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center text-xs sm:text-sm px-2 sm:px-4">Sem marcadores disponíveis</TableCell>
                                            </TableRow>
                                        ) : (
                                            topScorers.map((scorer) => (
                                                <TableRow key={scorer.id}>
                                                    <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{scorer.name}</TableCell>
                                                    <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{scorer.team}</TableCell>
                                                    <TableCell className="text-xs sm:text-sm px-2 sm:px-4 hidden sm:table-cell">
                                                        <Image
                                                            src={getFlagSrc(scorer.country)}
                                                            alt={scorer.country}
                                                            className="inline-block w-6 h-4 mr-1 object-contain"
                                                            width={6}
                                                            height={8}
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
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}