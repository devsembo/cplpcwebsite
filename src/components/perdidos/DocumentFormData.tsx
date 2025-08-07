"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface DocumentFormProps {
    onSubmit: (data: DocumentFormData) => void;
    onCancel: () => void;
}

export type DocumentFormData = {
    type: "lost" | "found";
    documentType: string;
    issuingCountry: string;
    title: string;
    description: string;
    location: string;
    date: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    inPossession: "user" | "platform";
};

const DocumentForm = ({ onSubmit, onCancel }: DocumentFormProps) => {
    const [formData, setFormData] = useState<DocumentFormData>({
        type: "lost",
        documentType: "",
        issuingCountry: "",
        title: "",
        description: "",
        location: "",
        date: "",
        contactName: "",
        contactPhone: "",
        contactEmail: "",
        inPossession: "user",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.contactPhone) {
            toast.error("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="type">Tipo</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, type: value as "lost" | "found" })} defaultValue="lost">
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="lost">Perdido</SelectItem>
                            <SelectItem value="found">Encontrado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="documentType">Tipo de Documento</Label>
                    <Input
                        id="documentType"
                        value={formData.documentType}
                        onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                        placeholder="Ex: BI, Passaporte"
                    />
                </div>
                <div>
                    <Label htmlFor="issuingCountry">País Emissor</Label>
                    <Input
                        id="issuingCountry"
                        value={formData.issuingCountry}
                        onChange={(e) => setFormData({ ...formData, issuingCountry: e.target.value })}
                        placeholder="Ex: Angola"
                    />
                </div>
                <div>
                    <Label htmlFor="title">Título</Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Ex: BI Perdido"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Input
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Detalhes"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="location">Localização</Label>
                    <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Ex: Baixa, Luanda"
                    />
                </div>
                <div>
                    <Label htmlFor="date">Data</Label>
                    <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                </div>
                <div>
                    <Label htmlFor="contactName">Nome de Contato</Label>
                    <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="Seu nome"
                    />
                </div>
                <div>
                    <Label htmlFor="contactPhone">Telefone</Label>
                    <Input
                        id="contactPhone"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        placeholder="Ex: +244 900 000 000"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input
                        id="contactEmail"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        placeholder="Ex: seu@email.com"
                    />
                </div>
                <div>
                    <Label htmlFor="inPossession">Em Posse</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, inPossession: value as "user" | "platform" })} defaultValue="user">
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="user">Utilizador</SelectItem>
                            <SelectItem value="platform">Plataforma</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit" style={{ backgroundColor: '#162556' }}>
                    Submeter
                </Button>
            </div>
        </form>
    );
};

export default DocumentForm;