"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { api } from "@/services/api";

interface ApiGameEvent {
    id: string;
    minute: string;
    half: number;
    player: string;
    country: "home" | "away";
    eventType: "goal" | "yellow" | "red" | "substitution" | "offside" | "penalty_missed" | "assist" | "mvp";
    description?: string;
    assist?: string;
}

interface GameData {
    homeCountry: string;
    awayCountry: string;
    homeScore: number;
    awayScore: number;
    date: string;
    events: ApiGameEvent[];
}

function normalizeCountryKey(name: string) {
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove acentos
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

export default function GameSummary() {
    const params = useParams();
    const { id } = params as { id: string };
    const [gameDetails, setGameDetails] = useState<GameData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const resultResponse = await api.get(`/api/resultados/${id}`);
                const game = resultResponse.data.data;
                console.log("Game Data:", game);

                setGameDetails({
                    homeCountry: game.homeCountry,
                    awayCountry: game.awayCountry,
                    homeScore: game.homeScore,
                    awayScore: game.awayScore,
                    date: new Date(game.date).toLocaleString("pt-PT"),
                    events: game.events.map((e: ApiGameEvent) => ({
                        id: e.id.toString(),
                        minute: e.minute,
                        half: e.half,
                        player: e.player,
                        country: e.country?.toLowerCase() as "home" | "away",
                        eventType: e.eventType.toLowerCase() as "goal" | "yellow" | "red" | "substitution" | "offside" | "penalty_missed" | "assist" | "mvp",
                        description: e.description,
                        assist: e.assist,
                    })).sort((a: ApiGameEvent, b: ApiGameEvent) => {
                        if (a.half !== b.half) return a.half - b.half;
                        return parseInt(a.minute) - parseInt(b.minute);
                    }),
                });
            } catch (error) {
                console.error("Erro ao buscar detalhes do jogo:", error);
                setGameDetails(null);
            } finally {
                setLoading(false);
            }
        };

        fetchGameDetails();
    }, [id]);

    if (loading) return <div className="text-center p-2 sm:p-4">Carregando...</div>;
    if (!gameDetails) return <div className="text-center p-2 sm:p-4">Jogo não encontrado</div>;

    const { homeCountry, awayCountry, homeScore, awayScore, date, events } = gameDetails;

    // Split events into home and away
    const homeEvents = events.filter((e) => e.country === "home");
    const awayEvents = events.filter((e) => e.country === "away");

    return (
        <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-4 md:py-6">
            <div className="text-center mb-4 sm:mb-6">
                <div className="text-xs sm:text-sm text-muted-foreground">{date}</div>
                <div className="text-xl xs:text-2xl sm:text-3xl font-bold my-2 flex flex-row sm:flex-row items-center justify-center gap-2 xs:gap-4 sm:gap-6 md:gap-9">
                    <span className="flex items-center">
                        <Image
                            src={getFlagSrc(homeCountry)}
                            alt={homeCountry}
                            className="inline-block w-5 h-3 xs:w-6 xs:h-4 sm:w-8 sm:h-5 object-contain"
                            width={8}
                            height={5}
                        />
                        {homeCountry}
                    </span>
                    <span className="flex flex-row items-center text-base xs:text-lg sm:text-xl gap-1 xs:gap-2 sm:gap-3">
                        {homeScore} - {awayScore}
                    </span>
                    <span className="flex items-center ">
                        {awayCountry}
                        <Image
                            src={getFlagSrc(awayCountry)}
                            alt={awayCountry}
                            className="inline-block w-5 h-3 xs:w-6 xs:h-4 sm:w-8 sm:h-5 object-contain"
                            width={8}
                            height={5}
                        />
                    </span>
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-widest text-green-500">Terminado</div>
                <div className="flex flex-col items-center">
                    <p className="text-sm font-semibold">In Partneship:</p>
                    <Image
                        src={'/torneio/lap_blue.png'}
                        alt="Lços angolas no porto logo"
                        width={60}
                        height={40}
                    />
                </div>
            </div>


            <Tabs defaultValue="summary" className="w-full">
                {/**
                <TabsList className="flex flex-row gap-2 sm:gap-4 mb-4 sticky top-0 z-50 bg-white shadow-sm">
                    <TabsTrigger value="summary" className="w-full sm:w-auto text-sm sm:text-base py-2 px-3">Sumário</TabsTrigger>
                    <TabsTrigger value="stats" className="w-full sm:w-auto text-sm sm:text-base py-2 px-3">Estatísticas</TabsTrigger>
                    <TabsTrigger value="players" className="w-full sm:w-auto text-sm sm:text-base py-2 px-3">Jogadores</TabsTrigger>
                    <TabsTrigger value="report" className="w-full sm:w-auto text-sm sm:text-base py-2 px-3">Relatório</TabsTrigger>
                </TabsList>
                 */}

                <TabsContent value="summary" className="pt-2 sm:pt-4">
                    <Card className="mt-2 sm:mt-4">
                        <CardContent className="p-2 sm:p-4">
                            <ScrollArea className="h-[60vh] sm:h-[50vh] md:h-[40vh] pr-2">
                                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                    <div>
                                        <h3 className="text-sm sm:text-base font-semibold mb-2 text-center">{homeCountry}</h3>
                                        {homeEvents.length > 0 && (
                                            <>
                                                <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-gray-200">
                                                    <h4 className="text-xs sm:text-sm font-medium text-gray-500">1ª Parte</h4>
                                                    {homeEvents.filter((e) => e.half === 1).map((event) => (
                                                        <div key={event.id} className="flex items-center mb-1 sm:mb-2">
                                                            <span className="text-xs sm:text-sm w-12 text-muted-foreground">{event.minute}</span>
                                                            <span className="font-normal">
                                                                {event.eventType === "goal" && "⚽"}
                                                                {event.eventType === "yellow" && "🟨"}
                                                                {event.eventType === "red" && "🟥"}
                                                                {event.eventType === "substitution" && "🔁"}
                                                                {event.eventType === "offside" && "🚫"}
                                                                {event.eventType === "penalty_missed" && "⚽❌"}
                                                                {event.eventType === "assist" && "🎯"}
                                                                {event.eventType === "mvp" && "🏆"}
                                                                {" "}{event.player}
                                                            </span>
                                                            {event.description && (
                                                                <div className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">{event.description}</div>
                                                            )}
                                                            {event.assist && (
                                                                <div className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">Assistência: {event.assist}</div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-gray-200">
                                                    <h4 className="text-xs sm:text-sm font-medium text-gray-500">2ª Parte</h4>
                                                    {homeEvents.filter((e) => e.half === 2).map((event) => (
                                                        <div key={event.id} className="flex items-center mb-1 sm:mb-2">
                                                            <span className="text-xs sm:text-sm w-12 text-muted-foreground">{event.minute}</span>
                                                            <span className="font-normal">
                                                                {event.eventType === "goal" && "⚽"}
                                                                {event.eventType === "yellow" && "🟨"}
                                                                {event.eventType === "red" && "🟥"}
                                                                {event.eventType === "substitution" && "🔁"}
                                                                {event.eventType === "offside" && "🚫"}
                                                                {event.eventType === "penalty_missed" && "⚽❌"}
                                                                {event.eventType === "assist" && "🎯"}
                                                                {event.eventType === "mvp" && "🏆"}
                                                                {" "}{event.player}
                                                            </span>
                                                            {event.description && (
                                                                <div className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">{event.description}</div>
                                                            )}
                                                            {event.assist && (
                                                                <div className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">Assistência: {event.assist}</div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-sm sm:text-base font-semibold mb-2 text-center">{awayCountry}</h3>
                                        {awayEvents.length > 0 && (
                                            <>
                                                <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-gray-200">
                                                    <h4 className="text-xs sm:text-sm font-medium text-gray-500">1ª Parte</h4>
                                                    {awayEvents.filter((e) => e.half === 1).map((event) => (
                                                        <div key={event.id} className="flex items-center mb-1 sm:mb-2">
                                                            <span className="text-xs sm:text-sm w-12 text-muted-foreground">{event.minute}</span>
                                                            <span className="font-normal">
                                                                {event.eventType === "goal" && "⚽"}
                                                                {event.eventType === "yellow" && "🟨"}
                                                                {event.eventType === "red" && "🟥"}
                                                                {event.eventType === "substitution" && "🔁"}
                                                                {event.eventType === "offside" && "🚫"}
                                                                {event.eventType === "penalty_missed" && "⚽❌"}
                                                                {event.eventType === "assist" && "🎯"}
                                                                {event.eventType === "mvp" && "🏆"}
                                                                {" "}{event.player}
                                                            </span>
                                                            {event.description && (
                                                                <div className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">{event.description}</div>
                                                            )}
                                                            {event.assist && (
                                                                <div className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">Assistência: {event.assist}</div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-gray-200">
                                                    <h4 className="text-xs sm:text-sm font-medium text-gray-500">2ª Parte</h4>
                                                    {awayEvents.filter((e) => e.half === 2).map((event) => (
                                                        <div key={event.id} className="flex items-center mb-1 sm:mb-2">
                                                            <span className="text-xs sm:text-sm w-12 text-muted-foreground">{event.minute}</span>
                                                            <span className="font-normal">
                                                                {event.eventType === "goal" && "⚽"}
                                                                {event.eventType === "yellow" && "🟨"}
                                                                {event.eventType === "red" && "🟥"}
                                                                {event.eventType === "substitution" && "🔁"}
                                                                {event.eventType === "offside" && "🚫"}
                                                                {event.eventType === "penalty_missed" && "⚽❌"}
                                                                {event.eventType === "assist" && "🎯"}
                                                                {event.eventType === "mvp" && "🏆"}
                                                                {" "}{event.player}
                                                            </span>
                                                            {event.description && (
                                                                <div className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">{event.description}</div>
                                                            )}
                                                            {event.assist && (
                                                                <div className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">Assistência: {event.assist}</div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="stats">
                    <Card className="mt-4 sm:mt-6">
                        <CardContent className="p-2 sm:p-4 text-center text-muted-foreground">Estatísticas (por implementar)</CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="players">
                    <Card className="mt-4 sm:mt-6">
                        <CardContent className="p-2 sm:p-4 text-center text-muted-foreground">Jogadores (por implementar)</CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="report">
                    <Card className="mt-4 sm:mt-6">
                        <CardContent className="p-2 sm:p-4 text-center text-muted-foreground">Relatório do jogo (por implementar)</CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}