import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import DocumentUpload from "./DocumentUpload";
import { toast } from "sonner";

export type DocumentType = "bi" | "passaporte" | "ar" | "cartao_consular" | "carta_conducao";
export type ItemType = "lost" | "found";

export interface DocumentFormData {
    type: ItemType;
    documentType: DocumentType;
    issuingCountry: string;
    title: string;
    description: string;
    location: string;
    date: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    documentImage?: File;
}

interface DocumentFormProps {
    onSubmit: (data: DocumentFormData) => void;
    onCancel: () => void;
}

const DocumentForm: React.FC<DocumentFormProps> = ({ onSubmit, onCancel }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const form = useForm<DocumentFormData>();

    const documentTypes = [
        { value: "bi", label: "Bilhete de Identidade (BI)" },
        { value: "passaporte", label: "Passaporte" },
        { value: "ar", label: "Autorização de Residência (AR)" },
        { value: "cartao_consular", label: "Cartão Consular" },
        { value: "carta_conducao", label: "Carta de Condução" }
    ];

    const countries = [
        { value: "angola", label: "Angola" },
        { value: "portugal", label: "Portugal" },
        { value: "brasil", label: "Brasil" },
        { value: "cabo_verde", label: "Cabo Verde" },
        { value: "mocambique", label: "Moçambique" },
        { value: "sao_tome", label: "São Tomé e Príncipe" },
        { value: "guine_bissau", label: "Guiné-Bissau" },
        { value: "timor_leste", label: "Timor-Leste" },
        { value: "outro", label: "Outro" }
    ];

    const handleSubmit = (data: DocumentFormData) => {
        if (!selectedImage) {
            toast.error("Por favor, carregue uma foto do documento");
            return;
        }

        const formData = {
            ...data,
            documentImage: selectedImage
        };

        onSubmit(formData);
    };

    const handleImageSelect = (file: File) => {
        setSelectedImage(file);
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {/* Document Upload */}
                <div>
                    <Label className="text-base font-semibold">Foto do Documento *</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                        Carregue uma foto clara do documento perdido ou encontrado
                    </p>
                    <DocumentUpload
                        onImageSelect={handleImageSelect}
                        selectedImage={selectedImage}
                        onRemoveImage={handleRemoveImage}
                    />
                </div>

                {/* Type of Report */}
                <FormField
                    control={form.control}
                    name="type"
                    rules={{ required: "Selecione o tipo" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo de Ocorrência *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="lost">Documento Perdido</SelectItem>
                                    <SelectItem value="found">Documento Encontrado</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Document Type */}
                <FormField
                    control={form.control}
                    name="documentType"
                    rules={{ required: "Selecione o tipo de documento" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo de Documento *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo de documento" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {documentTypes.map((doc) => (
                                        <SelectItem key={doc.value} value={doc.value}>
                                            {doc.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Issuing Country */}
                <FormField
                    control={form.control}
                    name="issuingCountry"
                    rules={{ required: "Selecione o país emissor" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>País Emissor *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o país que emitiu o documento" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {countries.map((country) => (
                                        <SelectItem key={country.value} value={country.value}>
                                            {country.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    rules={{ required: "Digite um título" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título *</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Passaporte encontrado na Baixa" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    rules={{ required: "Digite uma descrição" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição *</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Descreva detalhes sobre onde e quando encontrou/perdeu o documento..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Location */}
                <FormField
                    control={form.control}
                    name="location"
                    rules={{ required: "Digite o local" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Local *</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Baixa, Luanda" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Date */}
                <FormField
                    control={form.control}
                    name="date"
                    rules={{ required: "Selecione a data" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Data *</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Contact Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informações de Contacto</h3>

                    <FormField
                        control={form.control}
                        name="contactName"
                        rules={{ required: "Digite seu nome" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome Completo *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Seu nome completo" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="contactPhone"
                        rules={{ required: "Digite seu telefone" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telefone *</FormLabel>
                                <FormControl>
                                    <Input placeholder="+244 900 000 000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="contactEmail"
                        rules={{ required: "Digite seu email" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="email@exemplo.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1">
                        Submeter para Validação
                    </Button>
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default DocumentForm;