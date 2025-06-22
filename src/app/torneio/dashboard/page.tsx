//import { getServerSession } from "next-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlayerForm from "@/components/PlayerForm";
import MatchForm from "@/components/MatchForm";
import ResultForm from "@/components/ResultForm";
import EventForm from "@/components/EventForm";
import StatsTable from "@/components/StatsTable";
import { api } from "@/services/api";

export default async function TournamentDashboard() {

    // Carrega dados iniciais via API
    const [topScorersRes, gameResultsRes] = await Promise.all([
        api.get('/api/marcadores'),
        api.get('/api/jogos'),
        api.get('/api/resultados'),
    ]);

    const topScorers = topScorersRes.data.data;
    const gameResults = gameResultsRes.data.data;

    return (
        <div className="container mx-auto py-2 px-2 sm:px-4 sm:py-4 md:px-6 md:py-6">
            <Card className="mb-4 sm:mb-6 md:mb-8">
                <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">Dashboard do Torneio</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <Tabs defaultValue="players" className="w-full">
                        <TabsList className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-4">
                            <TabsTrigger value="players" className="w-full sm:w-auto text-sm sm:text-base">Jogadores</TabsTrigger>
                            <TabsTrigger value="matches" className="w-full sm:w-auto text-sm sm:text-base">Partidas</TabsTrigger>
                            <TabsTrigger value="results" className="w-full sm:w-auto text-sm sm:text-base">Resultados</TabsTrigger>
                            <TabsTrigger value="events" className="w-full sm:w-auto text-sm sm:text-base">Eventos</TabsTrigger>
                            <TabsTrigger value="stats" className="w-full sm:w-auto text-sm sm:text-base">Estatísticas</TabsTrigger>
                        </TabsList>

                        <TabsContent value="players">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg sm:text-xl">Gerenciar Jogadores</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <PlayerForm />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="matches">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg sm:text-xl">Gerenciar Partidas</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <MatchForm />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="results">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg sm:text-xl">Inserir Resultados</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResultForm />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="events">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg sm:text-xl">Gerenciar Eventos de Jogo</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <EventForm games={gameResults} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="stats">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg sm:text-xl">Estatísticas do Torneio</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <StatsTable topScorers={topScorers} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}