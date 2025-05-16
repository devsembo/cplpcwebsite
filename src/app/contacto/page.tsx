'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        organization: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            toast.success("Agradecemos o seu contacto. Responderemos em breve.");

            setFormData({
                name: "",
                email: "",
                phone: "",
                organization: "",
                message: "",
            });
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center bg-no-repeat py-20"
                style={{
                    backgroundImage: "url('/contact.jpg')", // substitui com o caminho real da imagem
                }}
            >
                <div className="absolute inset-0 bg-black/55"></div> {/* Overlay escuro */}

                <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h1 className="text-4xl font-bold mb-6">Entre em Contacto</h1>
                        <p className="text-xl">
                            Estamos à disposição para responder às suas questões e discutir como podemos colaborar.
                        </p>
                    </div>
                </div>
            </section>


            {/* Contact Info & Form Section */}
            <section className="py-20">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 justify-items-center">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 max-w-md">
                            <h2 className="text-2xl font-bold mb-6">Informações de Contacto</h2>

                            <div className="space-y-8">
                                <Card className="border-none shadow-md">
                                    <CardContent className="flex items-start gap-4 p-6">
                                        <div className="h-10 w-10 rounded-full bg-blue-900/10 text-blue-900 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg mb-1">Endereço</h3>
                                            <p className="text-gray-600">Avenida da Liberdade, 110</p>
                                            <p className="text-gray-600">1250-146 Lisboa, Portugal</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-md">
                                    <CardContent className="flex items-start gap-4 p-6">
                                        <div className="h-10 w-10 rounded-full bg-blue-900/10 text-blue-900 flex items-center justify-center flex-shrink-0">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg mb-1">Telefone</h3>
                                            <p className="text-gray-600">+351 210 123 456</p>
                                            <p className="text-gray-600">+351 960 123 456</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-md">
                                    <CardContent className="flex items-start gap-4 p-6">
                                        <div className="h-10 w-10 rounded-full bg-blue-900/10 text-blue-900 flex items-center justify-center flex-shrink-0">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg mb-1">Email</h3>
                                            <p className="text-gray-600">info@cplpconnect.pt</p>
                                            <p className="text-gray-600">geral@cplpconnect.pt</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="mt-12">
                                <h3 className="text-xl font-bold mb-4">Horário de Funcionamento</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Segunda a Sexta</span>
                                        <span className="text-gray-600">9:00 - 18:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Sábado</span>
                                        <span className="text-gray-600">10:00 - 14:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Domingo</span>
                                        <span className="text-gray-600">Fechado</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2 max-w-2xl">
                            <Card className="border-none shadow-lg">
                                <CardContent className="p-8">
                                    <h2 className="text-2xl font-bold mb-6">Envie-nos uma Mensagem</h2>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Nome Completo *</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Seu nome completo"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email *</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="seu.email@exemplo.com"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Telefone</Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+351 000 000 000"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="organization">Organização</Label>
                                                <Input
                                                    id="organization"
                                                    name="organization"
                                                    value={formData.organization}
                                                    onChange={handleChange}
                                                    placeholder="Nome da sua organização"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message">Mensagem *</Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Como podemos ajudar?"
                                                className="h-32"
                                                required
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-blue-900 hover:bg-blue-900-dark text-white"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>



        </div>
    );
}