import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface DocumentUploadProps {
    onImageSelect: (file: File) => void;
    selectedImage: File | null;
    onRemoveImage: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
    onImageSelect,
    selectedImage,
    onRemoveImage
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Por favor, selecione apenas imagens');
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('A imagem deve ter menos de 5MB');
            return;
        }

        onImageSelect(file);
        toast.success('Imagem carregada com sucesso');
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-4">
            {!selectedImage ? (
                <Card
                    className={`border-2 border-dashed transition-colors cursor-pointer ${dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={openFileDialog}
                >
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                            Carregar Foto do Documento
                        </h3>
                        <p className="text-muted-foreground text-center mb-4">
                            Arraste e solte uma imagem aqui ou clique para selecionar
                        </p>
                        <p className="text-sm text-muted-foreground">
                            PNG, JPG até 5MB
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Imagem Carregada</h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onRemoveImage}
                            >
                                <X className="h-4 w-4 mr-2" />
                                Remover
                            </Button>
                        </div>
                        <div className="flex items-center space-x-3">
                            <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            <div>
                                <p className="font-medium">{selectedImage.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};

export default DocumentUpload;