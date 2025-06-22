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

export default function MatchForm() {
    const [homeCountry, setHomeCountry] = useState("");
    const [awayCountry, setAwayCountry] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (homeCountry === awayCountry) {
            setMessage("As seleções devem ser diferentes.");
            return;
        }

        setLoading(true);
        try {
            await api.post("/api/partidas", {
                homeCountry,
                awayCountry,
                dateTime,
            });
            setMessage("Partida criada com sucesso! ");
            setHomeCountry("");
            setAwayCountry("");
            setDateTime("");
        } catch {
            setMessage("Erro ao criar partida. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Select value={homeCountry} onValueChange={setHomeCountry} required>
                        <SelectTrigger className="text-xs sm:text-sm">
                            <SelectValue placeholder="Seleção da Casa" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(countryFlags).map(([country]) => (
                                <SelectItem key={country} value={country} className="text-xs sm:text-sm">
                                    <Image
                                        src={getFlagSrc(country)}
                                        alt={`Bandeira de ${country}`}
                                        width={24}
                                        height={16}
                                        className="rounded-sm"
                                    />
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Select value={awayCountry} onValueChange={setAwayCountry} required>
                        <SelectTrigger className="text-xs sm:text-sm">
                            <SelectValue placeholder="Seleção Visitante" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(countryFlags).map(([country]) => (
                                <SelectItem key={country} value={country} className="flex items-center gap-2 text-xs sm:text-sm">
                                    <Image
                                        src={getFlagSrc(country)}
                                        alt={`Bandeira de ${country}`}
                                        width={24}
                                        height={16}
                                        className="rounded-sm"
                                    />
                                    {/* Capitalizar o nome do país */}
                                    {country.charAt(0).toUpperCase() + country.slice(1)}
                                </SelectItem>
                            ))}

                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <Input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    required
                    className="text-xs sm:text-sm"
                />
            </div>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? "Salvando..." : "Salvar Partida"}
            </Button>
            {message && <p className="text-sm text-green-600">{message}</p>}
        </form>
    );
}