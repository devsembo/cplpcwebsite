"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/services/api";

const countryFlags = {
    angola: "ao.png",
    "cabo verde": "cv.png",
    "guine bissau": "gw.png",
    "sao tome e principe": "stp.png",
    brasil: "brazil.png",
    portugal: "pt.png",
    mocambique: "mz.png",
    "timor-leste": "timor.png",
};

export default function PlayerForm() {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [goals, setGoals] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/api/jogadores", { name, country, goals });
            setMessage("Jogador criado com sucesso!");
            setName("");
            setCountry("");
            setGoals('golos');
        } catch {
            setMessage("Erro ao criar jogador.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                placeholder="Nome do jogador"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Select value={country} onValueChange={setCountry} required>
                <SelectTrigger>
                    <SelectValue placeholder="Selecione o país" />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(countryFlags).map(([country, flag]) => (
                        <SelectItem key={country} value={country}>
                            {flag} {country}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Input
                type="number"
                placeholder="Gols (opcional)"
                value={goals}
                onChange={(e) => setGoals((e.target.value))}
                min={0}
            />
            <Button type="submit" disabled={loading}>
                {loading ? "Salvando..." : "Salvar Jogador"}
            </Button>
            {message && <p className="text-sm text-green-600">{message}</p>}
        </form>
    );
}