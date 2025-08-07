"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
//import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, FileText, Shield, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import DocumentForm, { DocumentFormData } from "@/components/lost-and-found/DocumentForm";
import DocumentCard, { DocumentItem } from "@/components/lost-and-found/DocumentCard";

type ItemType = "lost" | "found";
type FilterType = "all" | "pending" | "approved" | "resolved";

const Home = () => {
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
            id: "2",
            type: "found",
            documentType: "passaporte",
            issuingCountry: "portugal",
            title: "Passaporte Português Encontrado",
            description: "Passaporte encontrado no Kinaxixi, junto à paragem de táxi",
            location: "Kinaxixi, Luanda",
            date: "2024-01-14",
            contactName: "Maria Santos",
            contactPhone: "+244 900 111 111",
            contactEmail: "maria@email.com",
            status: "pending"
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
    const [filterType, setFilterType] = useState<ItemType | "all">("all");
    const [statusFilter, setStatusFilter] = useState<FilterType>("all");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const filteredItems = items.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "all" || item.type === filterType;
        const matchesStatus = statusFilter === "all" || item.status === statusFilter;
        return matchesSearch && matchesType && matchesStatus;
    });

    const onSubmit = async (data: DocumentFormData) => {
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
        toast.success("Documento submetido para validação! Será analisado em breve.");
    };

    const handleContact = (item: DocumentItem) => {
        toast.success(`Processo de entrega iniciado. O país ${item.issuingCountry} foi contactado.`);
    };

    const getStatusStats = () => {
        return {
            total: items.length,
            pending: items.filter(item => item.status === "pending").length,
            approved: items.filter(item => item.status === "approved").length,
            resolved: items.filter(item => item.status === "resolved").length
        };
    };

    const stats = getStatusStats();

    return (
        <div className="min-h-screen bg-background">
            <div className="bg-[#162556] text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-4">Achados e Perdidos</h1>
                    <p className="text-xl text-center opacity-90 mb-6">
                        Sistema Oficial de Documentos Perdidos e Encontrados
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                        <div className="bg-white/10 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <div className="text-sm opacity-90">Total</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-yellow-300">{stats.pending}</div>
                            <div className="text-sm opacity-90">Pendentes</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-green-300">{stats.approved}</div>
                            <div className="text-sm opacity-90">Aprovados</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-blue-300">{stats.resolved}</div>
                            <div className="text-sm opacity-90">Resolvidos</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
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
                        <Select value={filterType} onValueChange={(value: ItemType | "all") => setFilterType(value)}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="lost">Perdidos</SelectItem>
                                <SelectItem value="found">Encontrados</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={(value: FilterType) => setStatusFilter(value)}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos Status</SelectItem>
                                <SelectItem value="pending">Pendentes</SelectItem>
                                <SelectItem value="approved">Aprovados</SelectItem>
                                <SelectItem value="resolved">Resolvidos</SelectItem>
                            </SelectContent>
                        </Select>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button style={{ backgroundColor: '#162556' }}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Publicar Documento
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <Shield className="h-5 w-5" />
                                        Publicar Documento
                                    </DialogTitle>
                                    <DialogDescription>
                                        Submeta um documento perdido ou encontrado para validação.
                                        Todos os documentos são verificados antes da publicação.
                                    </DialogDescription>
                                </DialogHeader>
                                <DocumentForm
                                    onSubmit={onSubmit}
                                    onCancel={() => setIsDialogOpen(false)}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="bg-muted/50 border border-muted rounded-lg p-4 mb-6">
                        <h3 className="flex items-center gap-2 font-semibold mb-2">
                            <Shield className="h-5 w-5" style={{ color: '#162556' }} />
                            Processo de Validação
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-yellow-600" />
                                <span><strong>1. Submissão:</strong> Documento enviado para análise</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span><strong>2. Validação:</strong> Verificação da autenticidade</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-blue-600" />
                                <span><strong>3. Entrega:</strong> Coordenação com o país emissor</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <DocumentCard
                            key={item.id}
                            item={item}
                            onContact={handleContact}
                        />
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Nenhum documento encontrado</h3>
                        <p className="text-muted-foreground">
                            Tente ajustar os filtros ou publique um novo documento.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;