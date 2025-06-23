"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/services/api";
import Image from "next/image";



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
    brasil: "brazil.png",
    portugal: "pt.png",
    mocambique: "mz.png",
    "timor-leste": "timor.png",
};


function getFlagSrc(countryName: string) {
    const key = normalizeCountryKey(countryName);
    const fileName = countryFlags[key];
    return fileName ? `/torneio/países/${fileName}` : "/países/default.png";
}

export default function PlayerForm() {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [goals, setGoals] = useState(1);
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
            setGoals(2);
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
                    {Object.entries(countryFlags).map(([country]) => (
                        <SelectItem key={country} value={country}>
                            <Image
                                src={getFlagSrc(country)}
                                alt={`Bandeira de ${country}`}
                                width={24}
                                height={16}
                                className="rounded-sm"
                            />
                            {country.charAt(0).toUpperCase() + country.slice(1)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Input
                type="number"
                placeholder="Gols (opcional)"
                value={goals}
                onChange={(e) => setGoals(Number(e.target.value))}
                min={0}
            />
            <Button type="submit" disabled={loading}>
                {loading ? "Salvando..." : "Salvar Jogador"}
            </Button>
            {message && <p className="text-sm text-green-600">{message}</p>}
        </form>
    );
}