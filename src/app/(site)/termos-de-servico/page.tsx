import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Termos de Utilização",
    description: "Termos de utilização do site cplpconnect.pt.",
    alternates: { canonical: "/termos-de-servico" },
};

export default function TermosServico() {
    return (
        <div className="min-h-screen bg-cplp-bg">
            <PageHero title="Termos de Utilização" description="Última atualização: 9 de agosto de 2026" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <main className="bg-white border border-cplp-line rounded-lg px-6 sm:px-10 md:px-14 py-10 md:py-14">
                    <div className="space-y-9 text-cplp-ink leading-relaxed">
                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">1. Introdução</h2>
                            <p>
                                Estes termos regem a utilização do site{" "}
                                <a href="https://cplpconnect.pt" className="text-cplp-blue hover:text-cplp-blue-hover underline underline-offset-2">
                                    cplpconnect.pt
                                </a>
                                , propriedade da {COMPANY_INFO.legalName}. Ao aceder e utilizar este
                                site, concorda com os termos aqui descritos.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">2. Sobre a CPLP CONNECT</h2>
                            <p>
                                A CPLP CONNECT é uma consultora tecnológica sediada no Porto, dedicada
                                ao desenho e desenvolvimento de plataformas digitais, software e
                                programas de formação corporativa para empresas e instituições do
                                espaço CPLP.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">3. Utilização do site</h2>
                            <p>Ao utilizar este site, compromete-se a:</p>
                            <ul className="list-disc pl-6 space-y-1.5 mt-3">
                                <li>Fornecer informações verdadeiras e atualizadas nos formulários que preencher</li>
                                <li>Não utilizar o site para fins ilegais ou não autorizados</li>
                                <li>Não tentar aceder indevidamente a áreas restritas ou a sistemas associados ao site</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">4. Propriedade intelectual</h2>
                            <p>
                                Todo o conteúdo deste site — textos, imagens, marca e logótipos — é
                                propriedade da {COMPANY_INFO.legalName} ou é utilizado com a devida
                                autorização, e não pode ser reproduzido sem consentimento prévio por
                                escrito.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">5. Alterações ao site e aos serviços</h2>
                            <p>
                                Reservamo-nos o direito de alterar, suspender ou descontinuar qualquer
                                parte do site ou dos serviços apresentados, a qualquer momento e sem
                                aviso prévio.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">6. Limitação de responsabilidade</h2>
                            <p>
                                A CPLP CONNECT não se responsabiliza por perdas indiretas ou
                                consequenciais resultantes da utilização deste site, incluindo
                                eventuais indisponibilidades temporárias ou erros de conteúdo.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">7. Privacidade</h2>
                            <p>
                                O tratamento de dados pessoais recolhidos através deste site rege-se
                                pela nossa{" "}
                                <a href="/politica-privacidade" className="text-cplp-blue hover:text-cplp-blue-hover underline underline-offset-2">
                                    Política de Privacidade
                                </a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">8. Lei aplicável</h2>
                            <p>
                                Estes termos regem-se pela lei portuguesa. Qualquer litígio será
                                submetido aos tribunais portugueses competentes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">9. Contacto</h2>
                            <p>
                                <strong>Email:</strong>{" "}
                                <a href={`mailto:${COMPANY_INFO.email}`} className="text-cplp-blue hover:text-cplp-blue-hover underline underline-offset-2">
                                    {COMPANY_INFO.email}
                                </a>
                            </p>
                            <p><strong>Morada:</strong> {COMPANY_INFO.address}</p>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
