'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { api } from "@/services/api";

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await api.post("/api/contact", formData);
            setTimeout(() => {
                toast.success("Agradecemos o seu contacto. Responderemos em breve.");
                // Reset do formulário (mantido)
                setFormData({ name: "", email: "", phone: "", organization: "", message: "", });
                setIsSubmitting(false);
            }, 1500);
        } catch (error) {
            toast.error("Ocorreu um erro ao enviar a sua mensagem. Por favor, tente novamente mais tarde.");
            setIsSubmitting(false);
            console.error("Erro ao enviar o formulário de contacto:", error);
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <section
                className="relative py-32 md:py-48 overflow-hidden"
            >
                {/* Overlay com gradiente tech */}
                <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-fuchsia-500/10 to-emerald-500/10" />
                {/* “grid” de linhas finas para vibe tech */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(244,63,94,0.25),_transparent_55%)] opacity-70" />

                <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                            Entre em <span className="bg-linear-to-r from-cyan-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">Contacto</span>
                        </h1>
                        <p className="text-xl text-slate-300/80">
                            Estamos à disposição para responder às suas questões e discutir como podemos colaborar.
                        </p>
                    </motion.div>
                </div>
            </section>


            {/* Contact Info & Form Section */}
            <section className="py-20 md:py-28">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* 1. Contact Info & Horário */}
                        <motion.div
                            className="lg:col-span-1 max-w-md space-y-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } }
                            }}
                        >
                            <h2 className="text-3xl font-bold mb-6 text-blue-400">Informações de Contacto</h2>

                            {/* Cartão de Localização */}
                            <motion.div variants={itemVariants}>
                                <Card className="bg-white/5 border border-cyan-400/20 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.25)] hover:shadow-[0_0_60px_rgba(56,189,248,0.45)] transition-all duration-300">
                                    <CardContent className="flex items-start gap-4 p-6">
                                        <div className="h-10 w-10 rounded-xl bg-linear-to-br from-cyan-400/30 to-fuchsia-500/30 text-cyan-300 flex items-center justify-center shrink-0 border border-cyan-400/40">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1 text-slate-50">Localização</h3>
                                            <p className="text-slate-300/80">Porto Portugal</p>
                                            <p className="text-slate-300/80">4100-012</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>


                            {/* Cartão de Telefone */}
                            <motion.div variants={itemVariants}>
                                <Card className="bg-white/5 border border-cyan-400/20 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.25)] hover:shadow-[0_0_60px_rgba(56,189,248,0.45)] transition-all duration-300">
                                    <CardContent className="flex items-start gap-4 p-6">
                                        <div className="h-10 w-10 rounded-xl bg-linear-to-br from-cyan-400/30 to-fuchsia-500/30 text-cyan-300 flex items-center justify-center shrink-0 border border-cyan-400/40">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1 text-slate-50">Telefone</h3>
                                            <p className="text-slate-300/80">+351 923 382 195</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Cartão de Email */}
                            <motion.div variants={itemVariants}>
                                <Card className="bg-white/5 border border-cyan-400/20 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.25)] hover:shadow-[0_0_60px_rgba(56,189,248,0.45)] transition-all duration-300">
                                    <CardContent className="flex items-start gap-4 p-6">
                                        <div className="h-10 w-10 rounded-xl bg-linear-to-br from-cyan-400/30 to-fuchsia-500/30 text-cyan-300 flex items-center justify-center shrink-0 border border-cyan-400/40">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1 text-slate-50">Email</h3>
                                            <p className="text-slate-300/80 ">info@cplpconnect.pt</p>
                                            <p className="text-slate-300/80">geral@cplpconnect.pt</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Horário de Funcionamento (Mantido) */}
                            <motion.div
                                className="mt-12 p-6 bg-gray-200/10 rounded-lg border-[1] border-ring/20 shadow-card"
                                variants={itemVariants}
                            >
                                <h3 className="font-semibold text-lg mb-1 text-slate-50">Horário de Funcionamento</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between border-b border-border/50 pb-2">
                                        <span className="text-slate-300/80">Segunda a Sexta</span>
                                        <span className="text-slate-300/80">10:00 - 17:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-300/80">Sábado</span>
                                        <span className="text-red-800">Fechado</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-300/80">Domingo</span>
                                        <span className="text-red-800">Fechado</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* 2. Contact Form */}
                        <motion.div
                            className="lg:col-span-2 w-full"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Card className="relative bg-white/5 border border-sky-500/30 backdrop-blur-2xl shadow-[0_0_60px_rgba(14,165,233,0.4)]">
                                {/* glow de borda animado */}
                                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-500/20 via-transparent to-fuchsia-500/20 opacity-70" />
                                <CardContent className="relative p-8 md:p-12">
                                    <h2 className="text-3xl font-bold mb-8 bg-linear-to-r from-cyan-400 to-sky-500 bg-clip-text text-transparent">
                                        Envie-nos uma Mensagem
                                    </h2>


                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Nome Completo */}
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-white">Nome Completo *</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Seu nome completo"
                                                    required
                                                    className="bg-slate-900/60 border border-slate-700/70 rounded-xl px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 focus:border-transparent transition-all duration-200"
                                                />

                                            </div>

                                            {/* Email */}
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-white">Email *</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="seu.email@exemplo.com"
                                                    required
                                                    className="bg-slate-900/60 border border-slate-700/70 rounded-xl px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 focus:border-transparent transition-all duration-200"
                                                />
                                            </div>

                                            {/* Telefone */}
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-white">Telefone</Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+351 000 000 000"
                                                    className="bg-slate-900/60 border border-slate-700/70 rounded-xl px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 focus:border-transparent transition-all duration-200"
                                                />
                                            </div>

                                            {/* Organização */}
                                            <div className="space-y-2">
                                                <Label htmlFor="organization" className="text-white">Organização</Label>
                                                <Input
                                                    id="organization"
                                                    name="organization"
                                                    value={formData.organization}
                                                    onChange={handleChange}
                                                    placeholder="Nome da sua organização"
                                                    className="bg-slate-900/60 border border-slate-700/70 rounded-xl px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 focus:border-transparent transition-all duration-200"
                                                />
                                            </div>
                                        </div>

                                        {/* Mensagem */}
                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-white">Mensagem *</Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Como podemos ajudar?"
                                                required
                                                className="h-40 bg-slate-900/60 border border-slate-700/70 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 focus:border-transparent transition-all duration-200"
                                            />

                                        </div>

                                        {/* Botão de Submissão */}
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full bg-linear-to-r cursor-pointer from-cyan-500/50 via-sky-500/50 to-emerald-400/50 text-slate-950 font-semibold rounded-xl shadow-[0_0_40px_rgba(34,211,238,0.6)] hover:shadow-[0_0_60px_rgba(45,212,191,0.85)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
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