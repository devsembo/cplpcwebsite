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
    "timor-leste": "timo.png",
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
        <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 md:py-6 max-w-7xl">
            <Card className="mb-4 sm:mb-6 md:mb-8">
                <CardHeader className="p-2 sm:p-4">
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">Resultados e Jogos</CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-4">
                    <Tabs defaultValue="results" className="w-full">
                        <TabsList className="flex flex-row  sm:flex-row gap-1 mb-4 sticky top-0 z-50 bg-white shadow-sm max-w-[95%] mx-auto">
                            <TabsTrigger value="results" className="w-full sm:w-auto text-sm sm:text-base py-2 px-3">Resultados</TabsTrigger>
                            <TabsTrigger value="upcoming" className="w-full sm:w-auto text-sm sm:text-base py-2 px-3">Jogos Futuros</TabsTrigger>
                            <TabsTrigger value="scorers" className="w-full sm:w-auto text-sm sm:text-base py-2 px-3">Melhores Marcadores</TabsTrigger>
                        </TabsList>

                        <TabsContent value="results" className="pt-4 sm:pt-6">
                            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                                <Table className="w-full min-w-[320px]">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-sm px-1 sm:px-2">Data</TableHead>
                                            <TableHead className="text-sm px-1 sm:px-2 hidden sm:table-cell">Equipa Casa</TableHead>
                                            <TableHead className="text-sm px-1 sm:px-2">Resultado</TableHead>
                                            <TableHead className="text-sm px-1 sm:px-2 hidden sm:table-cell">Equipa Fora</TableHead>
                                            <TableHead className="text-sm px-1 sm:px-2">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center text-sm px-2 py-2">Carregando...</TableCell>
                                            </TableRow>
                                        ) : results.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center text-sm px-2 py-2">Sem resultados disponíveis</TableCell>
                                            </TableRow>
                                        ) : (
                                            results.map((game) => (
                                                <TableRow key={game.id} className="hover:bg-gray-100">
                                                    <TableCell className="text-sm px-2 py-1">{new Date(game.date).toLocaleDateString("pt-PT")}</TableCell>
                                                    <TableCell className="text-sm px-2 py-1 hidden sm:table-cell">
                                                        <Image
                                                            src={getFlagSrc(game.homeCountry)}
                                                            alt={game.homeCountry}
                                                            className="inline-block w-6 h-4 sm:w-8 sm:h-5 mr-1 object-contain"
                                                            width={8}
                                                            height={5}
                                                        />
                                                        {game.homeCountry}
                                                    </TableCell>
                                                    <TableCell className="px-2 py-1">
                                                        <Badge variant="secondary" className="text-sm">{`${game.homeScore} - ${game.awayScore}`}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-sm px-2 py-1 hidden sm:table-cell">
                                                        <Image
                                                            src={getFlagSrc(game.awayCountry)}
                                                            alt={game.awayCountry}
                                                            className="inline-block w-6 h-4 sm:w-8 sm:h-5 mr-1 object-contain"
                                                            width={8}
                                                            height={5}
                                                        />
                                                        {game.awayCountry}
                                                    </TableCell>
                                                    <TableCell className="text-sm px-2 py-1">
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

                        <TabsContent value="upcoming" className="pt-4 sm:pt-6">
                            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                                <Table className="w-full min-w-[320px]">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-sm px-1 sm:px-2">Data</TableHead>
                                            <TableHead className="text-sm px-1 sm:px-2">Hora</TableHead>
                                            <TableHead className="text-sm px-1 sm:px-2 hidden sm:table-cell">Seleção de Casa</TableHead>
                                            <TableHead className="text-sm px-1 sm:px-2 hidden sm:table-cell">Seleção de Fora</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center text-sm px-2 py-2">Carregando...</TableCell>
                                            </TableRow>
                                        ) : upcomingGames.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center text-sm px-2 py-2">Sem jogos futuros disponíveis</TableCell>
                                            </TableRow>
                                        ) : (
                                            upcomingGames.map((game) => (
                                                <TableRow key={game.id}>
                                                    <TableCell className="text-sm px-2 py-1">{new Date(game.date).toLocaleDateString("pt-PT")}</TableCell>
                                                    <TableCell className="text-sm px-2 py-1">{game.time}</TableCell>
                                                    <TableCell className="text-sm px-2 py-1 hidden sm:table-cell">
                                                        <Image
                                                            src={getFlagSrc(game.homeCountry)}
                                                            alt={game.homeCountry}
                                                            className="inline-block w-6 h-4 sm:w-8 sm:h-5 mr-1 object-contain"
                                                            width={8}
                                                            height={5}
                                                        />
                                                        {game.homeCountry}
                                                    </TableCell>
                                                    <TableCell className="text-sm px-2 py-1 hidden sm:table-cell">
                                                        <Image
                                                            src={getFlagSrc(game.awayCountry)}
                                                            alt={game.awayCountry}
                                                            className="inline-block w-6 h-4 sm:w-8 sm:h-5 mr-1 object-contain"
                                                            width={8}
                                                            height={5}
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

                        <TabsContent value="scorers" className="pt-4 sm:pt-6">
                            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                                <Table className="w-full min-w-[320px]">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-sm px-1 sm:px-2">Nome</TableHead>
                                            <TableHead className="text-sm px-1 sm:px-2">Equipa</TableHead>
                                            <TableHead className="text-sm px-1 sm:px-2 hidden sm:table-cell">País</TableHead>
                                            <TableHead className="text-sm px-1 sm:px-2">Golos</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center text-sm px-2 py-2">Carregando...</TableCell>
                                            </TableRow>
                                        ) : topScorers.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center text-sm px-2 py-2">Sem marcadores disponíveis</TableCell>
                                            </TableRow>
                                        ) : (
                                            topScorers.map((scorer) => (
                                                <TableRow key={scorer.id}>
                                                    <TableCell className="text-sm px-2 py-1">{scorer.name}</TableCell>
                                                    <TableCell className="text-sm px-2 py-1">{scorer.team}</TableCell>
                                                    <TableCell className="text-sm px-2 py-1 hidden sm:table-cell">
                                                        <Image
                                                            src={getFlagSrc(scorer.country)}
                                                            alt={scorer.country}
                                                            className="inline-block w-6 h-4 sm:w-8 sm:h-5 mr-1 object-contain"
                                                            width={8}
                                                            height={5}
                                                        />
                                                        {scorer.country}
                                                    </TableCell>
                                                    <TableCell className="text-sm px-2 py-1">{scorer.goals}</TableCell>
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