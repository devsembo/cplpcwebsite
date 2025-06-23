'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlayerForm from "@/components/PlayerForm";
import MatchForm from "@/components/MatchForm";
import ResultForm from "@/components/ResultForm";
import EventForm from "@/components/EventForm";
import StatsTable from "@/components/StatsTable";
import { api } from "@/services/api";

export default function TournamentDashboard() {
    const [topScorers, setTopScorers] = useState([]);
    const [gameResults, setGameResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [scorers, games] = await Promise.all([
                    api.get('/api/marcadores'),
                    api.get('/api/jogos'),
                    api.get('/api/resultados'),
                ]);
                setTopScorers(scorers.data.data);
                setGameResults(games.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <div className="text-center py-10 text-lg">Carregando...</div>;
    }

    return (
        <div className="container mx-auto px-2 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 ">
            <Card className="mb-4 sm:mb-6 lg:mb-8 w-full shadow-md rounded-lg">
                <CardHeader className="p-4 sm:p-6 lg:p-8">
                    <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold">Dashboard do Torneio</CardTitle>
                </CardHeader>
                <CardContent className="p-1 sm:p-4 lg:p-8">
                    <Tabs defaultValue="players" className="w-full">
                        <TabsList
                            className="flex overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:flex-row gap-[-10px] sm:gap-4 mb-4 sm:mb-6 sticky top-0 z-50 bg-white shadow-sm py-2 sm:py-3 scrollbar-none"
                        >
                            <TabsTrigger value="players" className="flex-shrink-0 text-xs sm:text-base py-1.5 sm:py-2 px-2 sm:px-4">Jogadores</TabsTrigger>
                            <TabsTrigger value="matches" className="flex-shrink-0 text-xs sm:text-base py-1.5 sm:py-2 px-2 sm:px-4">Partidas</TabsTrigger>
                            <TabsTrigger value="results" className="flex-shrink-0 text-xs sm:text-base py-1.5 sm:py-2 px-2 sm:px-4">Resultados</TabsTrigger>
                            <TabsTrigger value="events" className="flex-shrink-0 text-xs sm:text-base py-1.5 sm:py-2 px-2 sm:px-4">Eventos</TabsTrigger>
                            <TabsTrigger value="stats" className="flex-shrink-0 text-xs sm:text-base py-1.5 sm:py-2 px-2 sm:px-4">Estatísticas</TabsTrigger>
                        </TabsList>

                        <TabsContent value="players" className="pt-4 sm:pt-6">
                            <Card className="w-full shadow-sm rounded-lg min-h-[calc(100vh-200px)]">
                                <CardHeader className="p-4 sm:p-5 lg:p-6">
                                    <CardTitle className="text-lg sm:text-xl lg:text-2xl">Gerenciar Jogadores</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-5 lg:p-6 overflow-y-auto">
                                    <PlayerForm />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="matches" className="pt-4 sm:pt-6">
                            <Card className="w-full shadow-sm rounded-lg min-h-[calc(100vh-200px)]">
                                <CardHeader className="p-4 sm:p-5 lg:p-6">
                                    <CardTitle className="text-lg sm:text-xl lg:text-2xl">Gerenciar Partidas</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-5 lg:p-6 overflow-y-auto">
                                    <MatchForm />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="results" className="pt-4 sm:pt-6">
                            <Card className="w-full shadow-sm rounded-lg min-h-[calc(100vh-200px)]">
                                <CardHeader className="p-4 sm:p-5 lg:p-6">
                                    <CardTitle className="text-lg sm:text-xl lg:text-2xl">Inserir Resultados</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-5 lg:p-6 overflow-y-auto">
                                    <ResultForm />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="events" className="pt-4 sm:pt-6">
                            <Card className="w-full shadow-sm rounded-lg min-h-[calc(100vh-200px)]">
                                <CardHeader className="p-4 sm:p-5 lg:p-6">
                                    <CardTitle className="text-lg sm:text-xl lg:text-2xl">Gerenciar Eventos de Jogo</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-5 lg:p-6 overflow-y-auto">
                                    <EventForm games={gameResults} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="stats" className="pt-4 sm:pt-6">
                            <Card className="w-full shadow-sm rounded-lg min-h-[calc(100vh-200px)]">
                                <CardHeader className="p-4 sm:p-5 lg:p-6">
                                    <CardTitle className="text-lg sm:text-xl lg:text-2xl">Estatísticas do Torneio</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-5 lg:p-6 overflow-y-auto">
                                    <StatsTable />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}