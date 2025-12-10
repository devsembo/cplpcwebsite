'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react"; // Reintroduzindo ícones
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion"; // Adicionando motion para dar vida

// Dados de exemplo para o grid (simplificados para o código)
const projectData = [
    {
        id: 1,
        country: "Moçambique",
        year: "2025",
        status: "Em Andamento",
        statusColor: "bg-yellow-500",
        title: "Sistema de Gestão Documental Consular",
        description: "Implementação de uma plataforma digital para gestão e tramitação de processos para o consulado Geral de Moçambique no Porto.",
        image: "https://images.unsplash.com/photo-1661956602153-23384936a1d3?w=500&auto=format&fit=crop&q=80",
        link: "#"
    },
    {
        id: 2,
        country: "CPLP",
        year: "2025",
        status: "Em Andamento",
        statusColor: "bg-yellow-500",
        title: "TROKA - Plataforma de remessas Digitais",
        description: "A TROKA é uma plataforma digital (MTO - Money Transfer Operator) com foco na Comunidade dos Países de Língua Portuguesa (CPLP).",
        image: "/troka-logo.png",
        link: "https://trokax.com"
    },
    // Adicione mais projetos aqui para preencher o grid
];


export default function Projects() {

    // Animação para a entrada dos cartões
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const heroBackground = {
        backgroundImage: "url('/project-background.jpg')", // Usar um fundo tech
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0A192F] text-gray-100">

            {/* Hero Section */}
            <section
                className="relative py-32 md:py-48"
                style={heroBackground}
            >
                {/* Overlay Dark Blue com transparência para o ar tech */}
                <div className="absolute inset-0 bg-[#0A192F]/80 backdrop-blur-sm"></div>

                <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h1 className="text-5xl font-bold mb-4 text-white">
                            Nossos <span className="text-cyan-400">Projetos</span>
                        </h1>
                        <p className="text-xl text-gray-300">
                            Conheça alguns dos nossos principais trabalhos realizados para instituições governamentais da comunidade CPLP.
                        </p>
                    </div>
                </div>
            </section>



            {/* Projects Grid */}
            <section className="py-20 bg-[#162842]">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">

                        {projectData.map((project) => (
                            <motion.div
                                key={project.id}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                className="group"
                            >
                                {/* Card com estilo tech: fundo escuro, borda sutil, hover glow */}
                                <Card className="overflow-hidden bg-[#102A43] border border-[#1E3050] shadow-xl shadow-black/30 hover:shadow-cyan-400/20 transition-all duration-300">
                                    <div className="h-56 overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            width={500}
                                            height={300}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                        />
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            {/* Tag do País */}
                                            <span className="text-xs font-medium text-blue-300 bg-blue-900/40 py-1 px-3 rounded-full">
                                                {project.country}
                                            </span>
                                            <span className="text-xs text-gray-400">{project.year}</span>
                                        </div>
                                        <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-400 mb-4">
                                            {project.description}
                                        </p>

                                        {/* Badge do Status (Em Andamento/Concluído) */}
                                        <Badge variant="default" className={`${project.statusColor} text-xs font-bold text-black py-1 px-3 rounded`}>
                                            {project.status}
                                        </Badge>

                                        {/* Link de Detalhes */}
                                        {project.link !== '#' && (
                                            <Link
                                                href={project.link}
                                                target="_blank"
                                                className="mt-4 ml-5 text-cyan-400 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                                            >
                                                Ver detalhes do projeto <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>


            {/* Contact CTA (Ajustado para cores fixas tech) */}
            <section className="py-20 bg-[#153457] text-white">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Transforme sua Instituição com Soluções Inovadoras</h2>
                        <p className="text-xl text-white/80 mb-8">
                            Entre em contacto connosco para discutir as necessidades específicas da sua instituição e descobrir como podemos ajudar.
                        </p>
                        {/* Botão de destaque com cor cian */}
                        <Button size="lg" className="bg-cyan-400 text-gray-900 hover:bg-cyan-300 font-bold shadow-lg shadow-cyan-400/30">
                            <Link href="/contacto">Solicitar Reunião</Link>
                        </Button>
                    </div>
                </div>
            </section>

        </div>
    );
}