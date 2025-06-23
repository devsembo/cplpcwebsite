"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";

interface Game {
    id: number;
    homeCountry: string;
    awayCountry: string;
}

interface EventFormProps {
    games: Game[];
}

export default function EventForm({ games }: EventFormProps) {
    const [gameId, setGameId] = useState("");
    const [minute, setMinute] = useState("");
    const [half, setHalf] = useState("");
    const [player, setPlayer] = useState("");
    const [team, setTeam] = useState("");
    const [eventType, setEventType] = useState("");
    const [countryside, setCountrySide] = useState("");
    const [description, setDescription] = useState("");
    const [assist, setAssist] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/api/eventos", {
                gameId: gameId,
                minute,
                half: Number(half),
                player,
                team,
                eventType,
                description: description || undefined,
                assist: assist || undefined,
            });
            setMessage("Evento registrado com sucesso!");
            setGameId("");
            setMinute("");
            setHalf("");
            setPlayer("");
            setTeam("");
            setEventType("");
            setDescription("");
            setAssist("");
        } catch {
            setMessage("Erro ao registrar evento.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-2 px-2 sm:px-4 sm:py-4 md:px-6 md:py-6">
            <Card className="mb-4 sm:mb-6 md:mb-8">
                <CardContent className="p-3 sm:p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Select value={gameId} onValueChange={setGameId} required>
                            <SelectTrigger className="text-xs sm:text-sm">
                                <SelectValue placeholder="Selecione a partida" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.isArray(games) && games.length > 0 ? (
                                    games.map((game) => (
                                        <SelectItem key={game.id} value={game.id.toString()} className="text-xs sm:text-sm">
                                            {game.homeCountry} vs {game.awayCountry}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <div className="px-2 py-1 text-sm text-muted-foreground">
                                        Nenhum jogo disponível
                                    </div>


                                )}

                            </SelectContent>
                        </Select>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                placeholder="Minuto (ex: 45+2)"
                                value={minute}
                                onChange={(e) => setMinute(e.target.value)}
                                required
                                className="text-xs sm:text-sm"
                            />
                            <Select value={half} onValueChange={setHalf} required>
                                <SelectTrigger className="text-xs sm:text-sm">
                                    <SelectValue placeholder="Metade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1" className="text-xs sm:text-sm">1ª Metade</SelectItem>
                                    <SelectItem value="2" className="text-xs sm:text-sm">2ª Metade</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Input
                            placeholder="Jogador"
                            value={player}
                            onChange={(e) => setPlayer(e.target.value)}
                            required
                            className="text-xs sm:text-sm"
                        />
                        <Select value={eventType} onValueChange={setEventType} required>
                            <SelectTrigger className="text-xs sm:text-sm">
                                <SelectValue placeholder="Tipo de evento" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="goal" className="text-xs sm:text-sm">Gol</SelectItem>
                                <SelectItem value="assist" className="text-xs sm:text-sm">Assistência</SelectItem>
                                <SelectItem value="penalty_missed" className="text-xs sm:text-sm">Perdeu Penálti</SelectItem>
                                <SelectItem value="yellow" className="text-xs sm:text-sm">cartão Amarelo</SelectItem>
                                <SelectItem value="red" className="text-xs sm:text-sm">Cartão Vermelho</SelectItem>
                                <SelectItem value="mvp" className="text-xs sm:text-sm">MVP da Partida</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={countryside} onValueChange={setCountrySide} required>
                            <SelectTrigger className="text-xs sm:text-sm">
                                <SelectValue placeholder="Selecione o lado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="home" className="text-xs sm:text-sm">Casa</SelectItem>
                                <SelectItem value="away" className="text-xs sm:text-sm">Fora</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                            placeholder="Descrição (opcional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="text-xs sm:text-sm"
                        />
                        <Input
                            placeholder="Assistência (opcional)"
                            value={assist}
                            onChange={(e) => setAssist(e.target.value)}
                            className="text-xs sm:text-sm"
                        />
                        <Button type="submit" className="w-full sm:w-auto">
                            {loading ? "Salvando..." : "Salvar Evento"}
                        </Button>
                        {message && <p className="text-sm text-green-600">{message}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}