'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";

export default function Services() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center bg-no-repeat py-20"
                style={{
                    backgroundImage: "url('/service.jpg')", // substitui pelo caminho correto da imagem
                }}
            >
                <div className="absolute inset-0 bg-black/50 bg-opacity-50"></div> {/* Overlay escuro */}

                <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h1 className="text-4xl font-bold mb-6">Nossos Serviços</h1>
                        <p className="text-xl">
                            Soluções tecnológicas personalizadas para instituições governamentais e organizações da comunidade CPLP.
                        </p>
                    </div>
                </div>
            </section>


            {/* Services Section */}
            <section className="py-20">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-16">
                        {/* Service 1 */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="order-2 lg:order-1 max-w-lg mx-auto lg:mx-0">
                                <h2 className="text-3xl font-bold mb-6">Desenvolvimento de Software Institucional</h2>
                                <p className="text-gray-600 mb-6">
                                    Criamos soluções de software personalizadas para atender às necessidades específicas de instituições governamentais, facilitando a gestão de processos e serviços públicos.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                                        <span>Sistemas de gestão documental e tramitação de processos</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                                        <span>Plataformas de serviços online para cidadãos</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                                        <span>Sistemas de gestão de recursos humanos e patrimoniais</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                                        <span>Soluções de interoperabilidade entre sistemas governamentais</span>
                                    </li>
                                </ul>
                                <Button className="bg-blue-950 hover:bg-blue-950-dark text-white">
                                    Solicitar Informações
                                </Button>
                            </div>
                            <div className="order-1 lg:order-2 max-w-lg mx-auto lg:mx-0">
                                <div className="rounded-lg overflow-hidden shadow-xl">
                                    <Image
                                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80"
                                        alt="Software Governamental"
                                        width={600}
                                        height={400}
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                            </div>
                        </div>


                        {/* Service 3 */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="order-2 lg:order-1 max-w-lg mx-auto lg:mx-0">
                                <h2 className="text-3xl font-bold mb-6">Assessoria em Transformação Digital</h2>
                                <p className="text-gray-600 mb-6">
                                    Oferecemos consultoria especializada para auxiliar instituições governamentais no processo de transformação digital, definindo estratégias e implementando soluções.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                                        <span>Diagnóstico e avaliação de maturidade digital</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                                        <span>Elaboração de planos estratégicos de transformação digital</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                                        <span>Reengenharia Bring up to date reengenharia de processos com foco em digitalização</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                                        <span>Capacitação de equipes para a cultura digital</span>
                                    </li>
                                </ul>
                                <Button className="bg-blue-950 hover:bg-blue-950 text-white">
                                    Solicitar Informações
                                </Button>
                            </div>
                            <div className="order-1 lg:order-2 max-w-lg mx-auto lg:mx-0">
                                <div className="rounded-lg overflow-hidden shadow-xl">
                                    <Image
                                        src="https://images.unsplash.com/photo-1522071500372-f0fd8c452178?w=600&auto=format&fit=crop&q=80"
                                        alt="Consultoria Tecnológica"
                                        width={600}
                                        height={400}
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Services */}
            <section className="py-20 bg-gray-50">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Serviços Complementares</h2>
                        <p className="text-gray-600">
                            Além dos nossos serviços principais, oferecemos uma série de soluções complementares para atender às necessidades específicas dos nossos clientes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        {/* Service 1 */}
                        <Card className="border-none shadow-lg max-w-sm">
                            <CardContent className="p-6">
                                <div className="h-12 w-12 rounded-full bg-blue-950/10 text-blue-950 flex items-center justify-center mb-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Segurança da Informação</h3>
                                <p className="text-gray-600 mb-4">
                                    Implementamos medidas de proteção e conformidade para garantir a segurança dos dados governamentais.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Service 2 */}
                        <Card className="border-none shadow-lg max-w-sm">
                            <CardContent className="p-6">
                                <div className="h-12 w-12 rounded-full bg-blue-950/10 text-blue-950 flex items-center justify-center mb-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Desenvolvimento Mobile</h3>
                                <p className="text-gray-600 mb-4">
                                    Criamos aplicativos móveis para levar os serviços públicos à palma da mão dos cidadãos.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Service 3 */}
                        <Card className="border-none shadow-lg max-w-sm">
                            <CardContent className="p-6">
                                <div className="h-12 w-12 rounded-full bg-blue-950/10 text-blue-950 flex items-center justify-center mb-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Suporte Técnico</h3>
                                <p className="text-gray-600 mb-4">
                                    Oferecemos suporte técnico contínuo para garantir o bom funcionamento das soluções implementadas.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Service 4 */}
                        <Card className="border-none shadow-lg max-w-sm">
                            <CardContent className="p-6">
                                <div className="h-12 w-12 rounded-full bg-blue-950/10 text-blue-950 flex items-center justify-center mb-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Treinamento</h3>
                                <p className="text-gray-600 mb-4">
                                    Capacitamos as equipes dos nossos clientes para utilizar de forma eficiente as soluções implementadas.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Service 5 */}
                        <Card className="border-none shadow-lg max-w-sm">
                            <CardContent className="p-6">
                                <div className="h-12 w-12 rounded-full bg-blue-950/10 text-blue-950 flex items-center justify-center mb-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Análise de Dados</h3>
                                <p className="text-gray-600 mb-4">
                                    Desenvolvemos soluções para coleta, processamento e análise de dados governamentais para apoiar a tomada de decisões.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Service 6 */}
                        <Card className="border-none shadow-lg max-w-sm">
                            <CardContent className="p-6">
                                <div className="h-12 w-12 rounded-full bg-blue-950/10 text-blue-950 flex items-center justify-center mb-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Integração de Sistemas</h3>
                                <p className="text-gray-600 mb-4">
                                    Criamos soluções para integrar sistemas legados com novas tecnologias, garantindo a continuidade dos serviços.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-20 bg-gradient-to-r from-blue-900 to-green-300 text-white">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Vamos Desenvolver a Solução Ideal para sua Instituição, Empresa ou Negócio</h2>
                        <p className="text-xl text-white/80 mb-8">
                            Entre em contacto connosco para discutir como podemos ajudar a sua instituição a transformar-se digitalmente.
                        </p>
                        <Button size="lg" className="bg-white text-blue-950 hover:bg-gray-100">
                            <Link href="/contacto">Solicitar Proposta</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}