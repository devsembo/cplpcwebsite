'use client';
import { Button } from '@/components/ui/button';
import { Target, Eye } from 'lucide-react';
import Link from 'next/link';


export default function AboutUs() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center bg-no-repeat py-20"
                style={{ backgroundImage: "url('/us.jpg')" }} // substitui pelo caminho da tua imagem
            >
                <div className="absolute inset-0 bg-black/50"></div> {/* Overlay escuro */}

                <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h1 className="text-4xl font-bold mb-6">Sobre Nós</h1>
                        <p className="text-xl text-gray-200">
                            Uma equipe dedicada ao desenvolvimento de soluções tecnológicas inovadoras para a comunidade CPLP.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-items-center">
                        <div className="max-w-md">
                            <div className="w-16 h-16 rounded-full bg-blue-950/10 text-blue-950 flex items-center justify-center mb-6">
                                <Target className="h-8 w-8" />
                            </div>
                            <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
                            <p className="text-gray-600 mb-4">
                                Impulsionar a transformação digital nos países da CPLP através de soluções tecnológicas inovadoras que melhorem a eficiência dos serviços públicos e a qualidade de vida dos cidadãos.
                            </p>
                            <p className="text-gray-600">
                                Trabalhamos em estreita colaboração com instituições governamentais para desenvolver software personalizado que atenda às necessidades específicas de cada país e região.
                            </p>
                        </div>

                        <div className="max-w-md">
                            <div className="w-16 h-16 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mb-6">
                                <Eye className="h-8 w-8" />
                            </div>
                            <h2 className="text-3xl font-bold mb-6">Nossa Visão</h2>
                            <p className="text-gray-600 mb-4">
                                Ser a principal referência em desenvolvimento de software institucional na comunidade CPLP, promovendo a modernização tecnológica e a cooperação entre os países de língua portuguesa.
                            </p>
                            <p className="text-gray-600">
                                Buscamos criar um ecossistema digital integrado que facilite a comunicação e o intercâmbio de informações entre as instituições governamentais dos países membros.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 bg-gray-50">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">Nossa História</h2>

                        <div className="space-y-12">
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="md:w-1/3">
                                    <div className="text-3xl font-bold text-blue-950">2024</div>
                                    <div className="mt-2 font-medium">Fundação</div>
                                </div>
                                <div className="md:w-2/3">
                                    <p className="text-gray-600">
                                        A CPLP Connect foi fundada com a visão de conectar tecnologicamente os países da Comunidade de Língua Portuguesa. Começamos com uma pequena equipe de desenvolvedores em Lisboa.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="md:w-1/3">
                                    <div className="text-3xl font-bold text-blue-950">2025</div>
                                    <div className="mt-2 font-medium">Parceria com os Governos</div>
                                </div>
                                <div className="md:w-2/3">
                                    <p className="text-gray-600">
                                        Iniciamos parcerias com instituições governamentais com Angola e Moçambique, expandindo nossas operações e desenvolvendo os primeiros sistemas para gestão Consular.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="md:w-1/3">
                                    <div className="text-3xl font-bold text-blue-950">Hoje</div>
                                    <div className="mt-2 font-medium">Consolidação</div>
                                </div>
                                <div className="md:w-2/3">
                                    <p className="text-gray-600">
                                        Atualmente, somos uma empresa em crescimento no mercado, com projetos implementados em diversos consulados de Países da CPLP e uma equipe de mais de 25 especialistas em tecnologia.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Nossa Equipa</h2>
                        <p className="text-gray-600">
                            Conheça os profissionais dedicados que fazem da CPLP Connect uma empresa inovadora e de excelência.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                        {/* Team Member 1 */}
                        <div className="text-center">
                            <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">{/* foto */}</div>
                            <h3 className="text-xl font-semibold">Anderson Pedro</h3>
                            <p className="text-blue-950">Co-Founder &amp; Diretor de Tecnologia (CTO)</p>
                            <p className="text-gray-400">Co-Founder &amp; Chief Technology Officer</p>
                        </div>

                        {/* Team Member 2 */}
                        <div className="text-center">
                            <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4"></div>
                            <h3 className="text-xl font-semibold">Nuno Marques</h3>
                            <p className="text-blue-950">Diretor-Executivo (CEO)</p>
                            <p className="text-gray-400">Chief Executive Officer</p>
                        </div>

                        {/* Team Member 3 */}
                        <div className="text-center">
                            <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4"></div>
                            <h3 className="text-xl font-semibold">William Vieira</h3>
                            <p className="text-blue-950">Diretor de Operações &amp; Projetos (COO)</p>
                            <p className="text-gray-400">Chief Operations Officer</p>
                        </div>

                        {/* Team Member 4 */}
                        <div className="text-center">
                            <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4"></div>
                            <h3 className="text-xl font-semibold">Valter Micas</h3>
                            <p className="text-blue-950">Diretor Comercial (CCO)</p>
                            <p className="text-gray-400">Chief Commercial Officer</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-20 bg-blue-900 text-white">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Trabalhe Connosco</h2>
                        <p className="text-xl text-white/80 mb-8">
                            Estamos sempre à procura de talentos para se juntar à nossa equipa e contribuir para o desenvolvimento tecnológico da comunidade CPLP.
                        </p>
                        <Button size="lg" className="bg-white text-blue-950 hover:bg-gray-100">
                            <Link href="/contacto">Entre em Contacto</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}