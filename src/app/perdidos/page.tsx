"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, FileText } from "lucide-react";
import { toast } from "sonner";
import DocumentForm, { DocumentFormData } from "@/components/lost-and-found/DocumentForm";
import DocumentCard, { DocumentItem } from "@/components/lost-and-found/DocumentCard";

const UserPage = () => {
    const [items, setItems] = useState<DocumentItem[]>([
        {
            id: "1",
            type: "lost",
            documentType: "bi",
            issuingCountry: "angola",
            title: "Bilhete de Identidade Perdido",
            description: "BI perdido na zona da Baixa, próximo ao mercado",
            location: "Baixa, Luanda",
            date: "2024-01-15",
            contactName: "João Silva",
            contactPhone: "+244 900 000 000",
            contactEmail: "joao@email.com",
            status: "approved"
        },
        {
            id: "3",
            type: "found",
            documentType: "ar",
            issuingCountry: "angola",
            title: "Autorização de Residência Encontrada",
            description: "AR encontrada na zona do Alvalade",
            location: "Alvalade, Luanda",
            date: "2024-01-13",
            contactName: "Pedro Costa",
            contactPhone: "+244 900 222 222",
            contactEmail: "pedro@email.com",
            status: "approved"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<"lost" | "found" | "all">("all");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const filteredItems = items.filter((item) =>
        item.status === "approved" &&
        (filterType === "all" || item.type === filterType) &&
        (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const onSubmit = (data: DocumentFormData) => {
        const newItem: DocumentItem = {
            id: Date.now().toString(),
            type: data.type,
            documentType: data.documentType,
            issuingCountry: data.issuingCountry,
            title: data.title,
            description: data.description,
            location: data.location,
            date: data.date,
            contactName: data.contactName,
            contactPhone: data.contactPhone,
            contactEmail: data.contactEmail,
            status: "pending"
        };

        setItems([newItem, ...items]);
        setIsDialogOpen(false);
        toast.success("Documento submetido com sucesso! Será analisado pela gestão.");
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Achados e Perdidos</h1>

                <div className="mb-8">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Pesquisar por título ou descrição..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <Select value={filterType} onValueChange={(value) => setFilterType(value as "lost" | "found" | "all")}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="lost">Perdidos</SelectItem>
                                <SelectItem value="found">Encontrados</SelectItem>
                            </SelectContent>
                        </Select>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button style={{ backgroundColor: '#162556' }}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Submeter Documento
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-full max-h-[90vh] overflow-y-auto ">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <Plus className="h-5 w-5" />
                                        Submeter Documento
                                    </DialogTitle>
                                    <DialogDescription>
                                        Envie um documento perdido ou encontrado. Indique se está em sua posse ou da plataforma.
                                    </DialogDescription>
                                </DialogHeader>
                                <DocumentForm onSubmit={onSubmit} onCancel={() => setIsDialogOpen(false)} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <DocumentCard key={item.id} item={item} onContact={() => { }} />
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Nenhum documento encontrado</h3>
                        <p className="text-muted-foreground">
                            Tente ajustar os filtros ou submeta um novo documento.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPage;
