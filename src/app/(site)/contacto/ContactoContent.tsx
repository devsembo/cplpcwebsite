"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { api } from "@/services/api";
import PageHero from "@/components/PageHero";
import { COMPANY_INFO } from "@/lib/constants";

export default function ContactoContent({ heroImageUrl }: { heroImageUrl?: string | null }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        organization: "",
        subject: "",
        message: "",
    });
    const [consent, setConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!consent) {
            toast.error("Tem de aceitar a Política de Privacidade para enviar a mensagem.");
            return;
        }

        setIsSubmitting(true);

        try {
            await api.post("/public/contact", { ...formData, consent: true });
            toast.success("Agradecemos o seu contacto. Responderemos em breve.");
            setFormData({ name: "", email: "", phone: "", organization: "", subject: "", message: "" });
            setConsent(false);
        } catch {
            toast.error("Ocorreu um erro ao enviar a sua mensagem. Por favor, tente novamente mais tarde.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <div className="min-h-screen flex flex-col">
            <PageHero
                title="Contacto"
                description="Estamos à disposição para responder às suas questões e discutir como podemos colaborar."
                imageUrl={heroImageUrl}
            />

            <section className="py-16 md:py-20 bg-cplp-bg">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Informações de contacto */}
                        <motion.div
                            className="lg:col-span-1 space-y-5"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                        >
                            <h2 className="text-2xl font-bold text-cplp-navy mb-4">Informações de Contacto</h2>

                            <motion.div variants={itemVariants}>
                                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                                    <CardContent className="flex items-start gap-4 p-5">
                                        <div className="h-10 w-10 rounded-md bg-cplp-blue/[0.08] flex items-center justify-center shrink-0">
                                            <MapPin className="h-5 w-5 text-cplp-blue" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-cplp-navy mb-0.5">Localização</h3>
                                            <p className="text-sm text-cplp-grey">{COMPANY_INFO.address}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                                    <CardContent className="flex items-start gap-4 p-5">
                                        <div className="h-10 w-10 rounded-md bg-cplp-blue/[0.08] flex items-center justify-center shrink-0">
                                            <Phone className="h-5 w-5 text-cplp-blue" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-cplp-navy mb-0.5">Telefone</h3>
                                            <p className="text-sm text-cplp-grey">+351 935 254 355</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                                    <CardContent className="flex items-start gap-4 p-5">
                                        <div className="h-10 w-10 rounded-md bg-cplp-blue/[0.08] flex items-center justify-center shrink-0">
                                            <Mail className="h-5 w-5 text-cplp-blue" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-cplp-navy mb-0.5">Email</h3>
                                            <p className="text-sm text-cplp-grey">{COMPANY_INFO.email}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div variants={itemVariants} className="p-5 bg-white border border-cplp-line rounded-lg">
                                <h3 className="font-semibold text-cplp-navy mb-3">Horário de Funcionamento</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between border-b border-cplp-line pb-2">
                                        <span className="text-cplp-grey">Segunda a Sexta</span>
                                        <span className="text-cplp-ink">10:00 – 17:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-cplp-grey">Sábado e Domingo</span>
                                        <span className="text-cplp-ink">Fechado</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Formulário */}
                        <motion.div
                            className="lg:col-span-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="border border-cplp-line bg-white shadow-none rounded-lg">
                                <CardContent className="p-6 md:p-10">
                                    <h2 className="text-2xl font-bold text-cplp-navy mb-8">
                                        Envie-nos uma Mensagem
                                    </h2>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-cplp-navy">Nome Completo *</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="O seu nome completo"
                                                    required
                                                    className="border-cplp-line rounded-md"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-cplp-navy">Email *</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="seu.email@exemplo.com"
                                                    required
                                                    className="border-cplp-line rounded-md"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-cplp-navy">Telefone</Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+351 000 000 000"
                                                    className="border-cplp-line rounded-md"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="organization" className="text-cplp-navy">Organização</Label>
                                                <Input
                                                    id="organization"
                                                    name="organization"
                                                    value={formData.organization}
                                                    onChange={handleChange}
                                                    placeholder="Nome da sua organização"
                                                    className="border-cplp-line rounded-md"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject" className="text-cplp-navy">Assunto *</Label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="Assunto da mensagem"
                                                required
                                                className="border-cplp-line rounded-md"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-cplp-navy">Mensagem *</Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Como podemos ajudar?"
                                                required
                                                className="h-36 border-cplp-line rounded-md"
                                            />
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Checkbox
                                                id="consent"
                                                checked={consent}
                                                onCheckedChange={(checked) => setConsent(checked === true)}
                                                required
                                                className="mt-0.5"
                                            />
                                            <Label htmlFor="consent" className="text-sm text-cplp-grey font-normal leading-relaxed cursor-pointer">
                                                Li e aceito a{" "}
                                                <Link href="/politica-privacidade" className="text-cplp-blue hover:text-cplp-blue-hover underline underline-offset-2">
                                                    Política de Privacidade
                                                </Link>{" "}
                                                e autorizo o tratamento dos meus dados para efeitos de resposta a este contacto. *
                                            </Label>
                                        </div>

                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full bg-cplp-blue hover:bg-cplp-blue-hover text-white rounded-md"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "A enviar..." : "Enviar Mensagem"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
