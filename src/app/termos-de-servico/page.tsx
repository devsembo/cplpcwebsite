'use client';

import React, { useState } from 'react';

export default function TermosServico() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <main className="bg-white rounded-xl shadow-lg px-6 sm:px-8 md:px-12 lg:px-16 py-10 max-w-full">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Termos de Serviço - CPLP CONNECT
                    </h1>
                    <p className="text-gray-600 mb-10 text-sm">
                        <strong>Última atualização:</strong> 21 de maio de 2025
                    </p>

                    <div className="space-y-12">
                        <section id="introducao" className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">1. Introdução</h2>
                            <p>
                                Ao utilizar os serviços da CPLP CONNECT, você concorda com os presentes Termos de Serviço.
                            </p>
                            <p>
                                Estes termos regem o uso do site{' '}
                                <a
                                    href="https://cplpconnect.pt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    cplpconnect.pt
                                </a>{' '}
                                e todos os serviços oferecidos pela nossa plataforma.
                            </p>
                        </section>

                        <section id="aceitacao" className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">2. Aceitação dos termos</h2>
                            <p>
                                O uso contínuo da plataforma representa a aceitação plena e incondicional destes termos.
                            </p>
                        </section>

                        <section id="servicos" className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">3. Serviços oferecidos</h2>
                            <p>A CPLP CONNECT oferece serviços de intermediação, agendamento e apoio a cidadãos CPLP.</p>
                        </section>

                        <section id="responsabilidades" className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">4. Responsabilidades do utilizador</h2>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Fornecer informações verdadeiras e atualizadas.</li>
                                <li>Não utilizar os serviços para fins ilegais.</li>
                                <li>Respeitar os direitos de outros utilizadores e da plataforma.</li>
                            </ul>
                        </section>

                        <section id="modificacoes" className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">5. Modificações nos serviços</h2>
                            <p>
                                A CPLP CONNECT reserva-se o direito de modificar ou descontinuar os serviços a qualquer momento, com ou sem aviso prévio.
                            </p>
                        </section>

                        <section id="cancelamento" className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">6. Cancelamento e suspensão</h2>
                            <p>
                                Reservamo-nos o direito de suspender ou encerrar contas que violem estes termos ou que comprometam a segurança da plataforma.
                            </p>
                        </section>

                        <section id="limite" className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">7. Limitação de responsabilidade</h2>
                            <p>
                                A CPLP CONNECT não se responsabiliza por perdas indiretas, incidentais ou consequenciais resultantes do uso da plataforma.
                            </p>
                        </section>

                        <section id="direitos" className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">8. Direitos de propriedade intelectual</h2>
                            <p>
                                Todos os conteúdos, marcas e funcionalidades da plataforma são de propriedade exclusiva da CPLP CONNECT, salvo indicação em contrário.
                            </p>
                        </section>

                        <section id="lei-aplicavel" className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">9. Lei aplicável e foro</h2>
                            <p>
                                Estes termos são regidos pelas leis de Portugal. Quaisquer disputas serão resolvidas nos tribunais portugueses.
                            </p>
                        </section>

                        <section id="contato" className="space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">10. Contacto</h2>
                            <p>Em caso de dúvidas sobre estes termos:</p>
                            <p>
                                <strong>Email:</strong>{' '}
                                <a href="mailto:info@cplpconnect.pt" className="text-blue-600 hover:underline">
                                    info@cplpconnect.pt
                                </a>
                            </p>
                            <p><strong>Morada:</strong> Avenida do Bessa 130C, 4100-012 Porto, Portugal</p>
                        </section>
                    </div>
                </main>
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                />
            )}
        </div>
    );
}
