'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";


export default function Projects() {
    return (
        <div className="min-h-screen flex flex-col">

            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center bg-no-repeat py-20"
                style={{
                    backgroundImage: "url('/project.jpg')", // substitui com o caminho real da imagem
                }}
            >
                <div className="absolute inset-0 bg-black/50 bg-opacity-50"></div> {/* Overlay escuro */}

                <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h1 className="text-4xl font-bold mb-6">Nossos Projetos</h1>
                        <p className="text-xl">
                            Conheça alguns dos nossos principais trabalhos realizados para instituições governamentais da comunidade CPLP.
                        </p>
                    </div>
                </div>
            </section>


            {/* Filter */}
            <section className="py-10 border-b">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="ghost" className="hover:bg-blue-200">
                            Todos os Projetos
                        </Button>
                        <Button variant="ghost" className="hover:bg-blue-100">
                            Angola
                        </Button>
                        <Button variant="ghost" className="hover:bg-blue-100">
                            Moçambique
                        </Button>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="py-20">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
                        {/* Project 1 */}
                        <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all max-w-sm">
                            <div className="h-56 overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1661956602153-23384936a1d3?w=500&auto=format&fit=crop&q=80"
                                    alt="Sistema de Gestão Documental AIMA"
                                    width={500}
                                    height={300}
                                    className="w-full h-full object-cover transition-transform hover:scale-105"
                                />
                            </div>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-medium text-blue-950 bg-blue-950/10 py-1 px-2 rounded-full">
                                        Moçambique
                                    </span>
                                    <span className="text-xs text-gray-500">2025</span>

                                </div>
                                <h3 className="text-xl font-semibold mb-2">Sistema de Gestão Documental Consular</h3>
                                <p className="text-gray-600 mb-4">
                                    Implementação de uma plataforma digital para gestão e tramitação de processos para o consulado Geral de Moçambique no Porto.
                                </p>
                                <Badge variant="outline" className="text-xs font-medium text-white bg-orange-400 py-1 px-2 rounded-full">
                                    Em Andamento
                                </Badge>
                                {/**
                                <Link href="#" className="text-blue-950 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                                    Ver detalhes do projeto <ArrowRight className="h-4 w-4" />
                                </Link>
                                 */}
                            </CardContent>
                        </Card>

                        {/* Project 2 */}
                        <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all max-w-sm">
                            <div className="h-56 overflow-hidden">
                                <Image
                                    src="/sepe.jpg"
                                    alt="Portal de Serviços Públicos"
                                    width={500}
                                    height={300}
                                    className="w-full h-full object-cover transition-transform hover:scale-105"
                                />
                            </div>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-medium text-blue-950 bg-blue-950/10 py-1 px-2 rounded-full">
                                        Angola
                                    </span>
                                    <span className="text-xs text-gray-500">2022</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Portal de Serviços Públicos</h3>
                                <p className="text-gray-600 mb-4">
                                    Desenvolvimento de portal integrado de serviços públicos para cidadãos angolanos.
                                </p>
                                <Link href="https://sepe.gov.ao/ao/" target="_blank" className="text-blue-950 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                                    Ver detalhes do projeto <ArrowRight className="h-4 w-4" />
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Project 3 
                        <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all max-w-sm">
                            <div className="h-56 overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1573496130423-4516f84b4a4b?w=500&auto=format&fit=crop&q=80"
                                    alt="Sistema de Gestão Eleitoral"
                                    width={500}
                                    height={300}
                                    className="w-full h-full object-cover transition-transform hover:scale-105"
                                />
                            </div>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-medium text-blue-950 bg-blue-950/10 py-1 px-2 rounded-full">
                                        Moçambique
                                    </span>
                                    <span className="text-xs text-gray-500">2022</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Sistema de Gestão Eleitoral</h3>
                                <p className="text-gray-600 mb-4">
                                    Plataforma segura para gestão e auditoria de processos eleitorais em Moçambique.
                                </p>
                                <Link href="#" className="text-blue-950 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                                    Ver detalhes do projeto <ArrowRight className="h-4 w-4" />
                                </Link>
                            </CardContent>
                        </Card>
                        */}

                        {/* Project 4 
                        <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all max-w-sm">
                            <div className="h-56 overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&auto=format&fit=crop&q=80"
                                    alt="Sistema de Registro Civil"
                                    width={500}
                                    height={300}
                                    className="w-full h-full object-cover transition-transform hover:scale-105"
                                />
                            </div>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-medium text-blue-950 bg-blue-950/10 py-1 px-2 rounded-full">
                                        Cabo Verde
                                    </span>
                                    <span className="text-xs text-gray-500">2021</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Sistema de Registro Civil</h3>
                                <p className="text-gray-600 mb-4">
                                    Modernização do sistema de registro civil e identidade de Cabo Verde, com emissão de documentos digitais.
                                </p>
                                <Link href="#" className="text-blue-950 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                                    Ver detalhes do projeto <ArrowRight className="h-4 w-4" />
                                </Link>
                            </CardContent>
                        </Card>
*/}
                        {/* Project 5 
                        <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all max-w-sm">
                            <div className="h-56 overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1579389083395-4507e98b5e67?w=500&auto=format&fit=crop&q=80"
                                    alt="Plataforma de Compras Públicas"
                                    width={500}
                                    height={300}
                                    className="w-full h-full object-cover transition-transform hover:scale-105"
                                />
                            </div>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-medium text-blue-950 bg-blue-950/10 py-1 px-2 rounded-full">
                                        Brasil
                                    </span>
                                    <span className="text-xs text-gray-500">2021</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Plataforma de Compras Públicas</h3>
                                <p className="text-gray-600 mb-4">
                                    Sistema integrado para gestão de compras governamentais, licitações e contratos públicos.
                                </p>
                                <Link href="#" className="text-blue-950 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                                    Ver detalhes do projeto <ArrowRight className="h-4 w-4" />
                                </Link>
                            </CardContent>
                        </Card>
*/}
                        {/* Project 6 
                        <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all max-w-sm">
                            <div className="h-56 overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&auto=format&fit=crop&q=80"
                                    alt="Sistema Integrado de Educação"
                                    width={500}
                                    height={300}
                                    className="w-full h-full object-cover transition-transform hover:scale-105"
                                />
                            </div>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-medium text-blue-950 bg-blue-950/10 py-1 px-2 rounded-full">
                                        Portugal
                                    </span>
                                    <span className="text-xs text-gray-500">2020</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Sistema Integrado de Educação</h3>
                                <p className="text-gray-600 mb-4">
                                    Plataforma para gestão escolar, registro acadêmico e integração entre instituições de ensino.
                                </p>
                                <Link href="#" className="text-blue-950 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                                    Ver detalhes do projeto <ArrowRight className="h-4 w-4" />
                                </Link>
                            </CardContent>
                        </Card>
                        */}
                    </div>

                    {/* Pagination 
                    <div className="flex justify-center mt-12">
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                            </Button>
                            <Button variant="outline" size="sm" className="bg-blue-950 text-white hover:bg-blue-950-dark">1</Button>
                            <Button variant="outline" size="sm">2</Button>
                            <Button variant="outline" size="sm">3</Button>
                            <Button variant="outline" size="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                            </Button>
                        </div>
                    </div>
                    */}
                </div>
            </section>


            {/* Contact CTA */}
            <section className="py-20 bg-blue-950 text-white">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Transforme sua Instituição com Soluções Inovadoras</h2>
                        <p className="text-xl text-white/80 mb-8">
                            Entre em contacto connosco para discutir as necessidades específicas da sua instituição e descobrir como podemos ajudar.
                        </p>
                        <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                            <Link href="/contacto">Solicitar Reunião</Link>
                        </Button>
                    </div>
                </div>
            </section>

        </div>
    );
}