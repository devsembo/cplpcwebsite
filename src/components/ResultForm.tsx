"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { api } from "@/services/api";

interface Game {
    id: string; // Altera para string para corresponder a UUID
    homeCountry: string;
    awayCountry: string;
    date: string;
    time: string;
}

export default function ResultForm() {
    const [games, setGames] = useState<Game[]>([]);
    const [gameId, setGameId] = useState("");
    const [homeScore, setHomeScore] = useState(0);
    const [awayScore, setAwayScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchGames() {
            try {
                const response = await api.get("/api/jogos");
                setGames(response.data.data);
            } catch (error) {
                console.error("Erro ao buscar jogos:", error);
                setGames([]);
            }
        }

        fetchGames();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post("/api/resultados", { gameId, homeScore, awayScore });
            setMessage("Resultado salvo com sucesso! ID: " + response.data.data.id);
            setGameId("");
            setHomeScore(0);
            setAwayScore(0);
        } catch {
            setMessage("Erro ao salvar resultado: Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Select value={gameId} onValueChange={setGameId} required>
                <SelectTrigger>
                    <SelectValue placeholder="Selecione a partida" />
                </SelectTrigger>
                <SelectContent>
                    {Array.isArray(games) &&
                        games.map((game) => {
                            const formattedDate = new Date(game.date).toLocaleDateString("pt-PT", {
                                day: "2-digit",
                                month: "2-digit",
                            });
                            const formattedTime = game.time?.slice(0, 5); // Pega "HH:MM"

                            return (
                                <SelectItem key={game.id} value={game.id}>
                                    {game.homeCountry} vs {game.awayCountry} – {formattedDate} às {formattedTime}
                                </SelectItem>
                            );
                        })}
                </SelectContent>
            </Select>

            <Input
                type="number"
                placeholder="Gols da equipe casa"
                value={homeScore}
                onChange={(e) => setHomeScore(Number(e.target.value))}
                min={0}
                required
            />
            <Input
                type="number"
                placeholder="Gols da equipe visitante"
                value={awayScore}
                onChange={(e) => setAwayScore(Number(e.target.value))}
                min={0}
                required
            />
            <Button type="submit" disabled={loading}>
                {loading ? "Salvando..." : "Salvar Resultado"}
            </Button>
            {message && <p className="text-sm text-green-600">{message}</p>}
        </form>
    );
}