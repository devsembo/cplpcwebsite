import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Phone, FileText, CheckCircle, Clock } from "lucide-react";

export interface DocumentItem {
    id: string;
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
    status: "pending" | "approved" | "resolved";
    imageUrl?: string;
}

interface DocumentCardProps {
    item: DocumentItem;
    onContact: (item: DocumentItem) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ item, onContact }) => {
    const getDocumentTypeLabel = (type: string) => {
        const types = {
            bi: "Bilhete de Identidade",
            passaporte: "Passaporte",
            ar: "Autorização de Residência",
            cartao_consular: "Cartão Consular",
            carta_conducao: "Carta de Condução"
        };
        return types[type as keyof typeof types] || type;
    };

    const getCountryLabel = (country: string) => {
        const countries = {
            angola: "Angola",
            portugal: "Portugal",
            brasil: "Brasil",
            cabo_verde: "Cabo Verde",
            mocambique: "Moçambique",
            sao_tome: "São Tomé e Príncipe",
            guine_bissau: "Guiné-Bissau",
            timor_leste: "Timor-Leste",
            outro: "Outro"
        };
        return countries[country as keyof typeof countries] || country;
    };

    const getStatusBadge = () => {
        switch (item.status) {
            case "pending":
                return <Badge className="bg-yellow-500 text-white"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
            case "approved":
                return <Badge className="bg-blue-600 text-white"><CheckCircle className="h-3 w-3 mr-1" />Aprovado</Badge>;
            case "resolved":
                return <Badge className="bg-blue-600 text-white"><CheckCircle className="h-3 w-3 mr-1" />Resolvido</Badge>;
            default:
                return null;
        }
    };

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start gap-2">
                    <div className="flex gap-2 flex-wrap">
                        <Badge className={item.type === "lost" ? "bg-red-600 text-white" : "bg-green-600 text-white"}>
                            {item.type === "lost" ? "Perdido" : "Encontrado"}
                        </Badge>
                        {getStatusBadge()}
                    </div>
                    <Badge variant="outline" className="text-xs">
                        {getDocumentTypeLabel(item.documentType)}
                    </Badge>
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {/* Document Info */}
                    <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="flex items-center text-sm">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="font-medium">{getDocumentTypeLabel(item.documentType)}</span>
                            <span className="text-muted-foreground ml-1">- {getCountryLabel(item.issuingCountry)}</span>
                        </div>
                    </div>

                    {/* Location and Date */}
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {item.location}
                        </div>
                        <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {new Date(item.date).toLocaleDateString("pt-BR")}
                        </div>
                        <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {item.contactName}
                        </div>
                    </div>

                    {/* Action Button */}
                    {item.status === "approved" && (
                        <div className="mt-4">
                            <Button
                                onClick={() => onContact(item)}
                                className="w-full"
                                size="sm"
                                style={{ backgroundColor: '#162556' }}
                            >
                                <Phone className="h-4 w-4 mr-2" />
                                Contactar
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default DocumentCard;