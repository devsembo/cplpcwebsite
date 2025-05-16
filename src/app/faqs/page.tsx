'use client';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function FAQ() {
    return (
        <div className="min-h-screen flex flex-col">

            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center bg-no-repeat py-20"
                style={{
                    backgroundImage: "url('/faqs.jpg')", // substitui com o caminho real da imagem
                }}
            >
                <div className="absolute inset-0 bg-black/50 "></div> {/* Overlay escuro */}

                <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center text-white">
                        <h1 className="text-4xl font-bold mb-6">Perguntas Frequentes</h1>
                        <p className="text-xl">
                            Respostas para algumas das perguntas mais comuns sobre nossos serviços e processos.
                        </p>
                    </div>
                </div>
            </section>


            {/* FAQ Accordion Section */}
            <section className="py-20">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <Accordion type="single" collapsible className="space-y-4">
                            <AccordionItem value="item-1" className="border border-gray-200 rounded-lg shadow-md">
                                <AccordionTrigger className="px-6 py-4 text-xl font-semibold text-left">
                                    Quanto tempo demora o desenvolvimento de um projeto?
                                </AccordionTrigger>
                                <AccordionContent className="px-6 py-4 text-gray-600">
                                    O prazo de desenvolvimento varia de acordo com a complexidade do projeto. Após a análise inicial, fornecemos um cronograma detalhado com todas as etapas e prazos.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2" className="border border-gray-200 rounded-lg shadow-md">
                                <AccordionTrigger className="px-6 py-4 text-xl font-semibold text-left">
                                    Vocês oferecem suporte após a implementação?
                                </AccordionTrigger>
                                <AccordionContent className="px-6 py-4 text-gray-600">
                                    Sim, oferecemos pacotes de suporte e manutenção para garantir que suas soluções continuem funcionando perfeitamente após a implementação.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3" className="border border-gray-200 rounded-lg shadow-md">
                                <AccordionTrigger className="px-6 py-4 text-xl font-semibold text-left">
                                    Como funciona o processo de desenvolvimento?
                                </AccordionTrigger>
                                <AccordionContent className="px-6 py-4 text-gray-600">
                                    Trabalhamos com metodologias ágeis, dividindo o projeto em sprints. Mantemos comunicação constante com o cliente, garantindo entregas graduais e ajustes conforme necessário.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4" className="border border-gray-200 rounded-lg shadow-md">
                                <AccordionTrigger className="px-6 py-4 text-xl font-semibold text-left">
                                    Quais tecnologias vocês utilizam?
                                </AccordionTrigger>
                                <AccordionContent className="px-6 py-4 text-gray-600">
                                    Utilizamos tecnologias modernas e robustas, selecionadas especificamente para cada projeto com base nas necessidades e requisitos do cliente.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5" className="border border-gray-200 rounded-lg shadow-md">
                                <AccordionTrigger className="px-6 py-4 text-xl font-semibold text-left">
                                    Vocês desenvolvem soluções personalizadas para cada cliente?
                                </AccordionTrigger>
                                <AccordionContent className="px-6 py-4 text-gray-600">
                                    Sim, cada solução é desenvolvida de forma personalizada, levando em conta os objetivos e necessidades específicas de cada cliente.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-6" className="border border-gray-200 rounded-lg shadow-md">
                                <AccordionTrigger className="px-6 py-4 text-xl font-semibold text-left">
                                    É possível acompanhar o andamento do projeto?
                                </AccordionTrigger>
                                <AccordionContent className="px-6 py-4 text-gray-600">
                                    Sim, fornecemos acesso a relatórios e reuniões periódicas para garantir total transparência e alinhamento durante o desenvolvimento.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-7" className="border border-gray-200 rounded-lg shadow-md">
                                <AccordionTrigger className="px-6 py-4 text-xl font-semibold text-left">
                                    Oferecem serviços de design e identidade visual?
                                </AccordionTrigger>
                                <AccordionContent className="px-6 py-4 text-gray-600">
                                    Sim, contamos com uma equipa que pode desenvolver logotipos, interfaces e identidade visual alinhada à imagem da sua marca.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-8" className="border border-gray-200 rounded-lg shadow-md">
                                <AccordionTrigger className="px-6 py-4 text-xl font-semibold text-left">
                                    Trabalham com clientes fora de Portugal?
                                </AccordionTrigger>
                                <AccordionContent className="px-6 py-4 text-gray-600">
                                    Sim, atendemos clientes da CPLP e de outras regiões. Toda a comunicação e entrega pode ser feita remotamente com a mesma eficiência.
                                </AccordionContent>
                            </AccordionItem>


                        </Accordion>
                    </div>
                </div>
            </section>

        </div>
    );
}