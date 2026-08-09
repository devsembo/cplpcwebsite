// TODO: validar juridicamente antes de publicar. Este texto foi escrito para
// refletir a atividade real da CPLP CONNECT (consultoria tecnológica) e as
// exigências gerais do RGPD, mas não substitui aconselhamento jurídico.
// Verificar em particular: morada legal completa, NIF, e os prazos de
// conservação de dados indicados na secção 7.
import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Política de Privacidade — CPLP CONNECT",
    description: "Como a CPLP CONNECT recolhe, utiliza e protege os seus dados pessoais.",
};

export default function PoliticaPrivacidade() {
    return (
        <div className="min-h-screen bg-cplp-bg">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <main className="bg-white border border-cplp-line rounded-lg px-6 sm:px-10 md:px-14 py-10 md:py-14">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-cplp-navy tracking-tight mb-2">
                        Política de Privacidade
                    </h1>
                    <p className="text-cplp-grey mb-10 text-sm">
                        <strong className="text-cplp-ink">Última atualização:</strong> 9 de agosto de 2026
                    </p>

                    <div className="space-y-9 text-cplp-ink leading-relaxed">
                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">1. Introdução</h2>
                            <p>
                                A CPLP CONNECT ("nós", "a nossa empresa") é uma consultora tecnológica
                                sediada no Porto, dedicada à transformação digital de empresas e
                                instituições do espaço CPLP. Esta política explica que dados pessoais
                                recolhemos através do site{" "}
                                <a href="https://cplpconnect.pt" className="text-cplp-blue hover:text-cplp-blue-hover underline underline-offset-2">
                                    cplpconnect.pt
                                </a>
                                , para que finalidade, e quais os seus direitos enquanto titular dos dados.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">2. Responsável pelo tratamento</h2>
                            <p>
                                O responsável pelo tratamento dos dados recolhidos através deste site é
                                a <strong>{COMPANY_INFO.legalName}</strong>, com sede em {COMPANY_INFO.address}
                                {" "}({COMPANY_INFO.nif}). Para qualquer questão relacionada com os seus
                                dados, contacte-nos através de{" "}
                                <a href={`mailto:${COMPANY_INFO.email}`} className="text-cplp-blue hover:text-cplp-blue-hover underline underline-offset-2">
                                    {COMPANY_INFO.email}
                                </a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">3. Dados que recolhemos</h2>
                            <p className="mb-3">Recolhemos dados pessoais apenas quando preenche o formulário de contacto do site:</p>
                            <ul className="list-disc pl-6 space-y-1.5">
                                <li>Nome completo</li>
                                <li>Endereço de email</li>
                                <li>Número de telefone (opcional)</li>
                                <li>Organização (opcional)</li>
                                <li>Assunto e mensagem que nos envia</li>
                            </ul>
                            <p className="mt-3">
                                Não recolhemos dados através de cookies de analítica ou marketing —
                                ver secção 8.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">4. Finalidade do tratamento</h2>
                            <p>Os dados recolhidos através do formulário de contacto são usados exclusivamente para:</p>
                            <ul className="list-disc pl-6 space-y-1.5 mt-3">
                                <li>Responder ao seu pedido de contacto, informação ou orçamento</li>
                                <li>Manter um registo da comunicação, para efeitos de acompanhamento comercial</li>
                            </ul>
                            <p className="mt-3">Não usamos os seus dados para fins de marketing sem o seu consentimento explícito e separado.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">5. Base legal</h2>
                            <p>O tratamento dos dados do formulário de contacto tem por base:</p>
                            <ul className="list-disc pl-6 space-y-1.5 mt-3">
                                <li><strong>O seu consentimento explícito</strong>, dado ao submeter o formulário</li>
                                <li><strong>O nosso interesse legítimo</strong> em responder a pedidos de contacto dirigidos à empresa</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">6. Partilha de dados</h2>
                            <p>
                                Não vendemos nem partilhamos os seus dados pessoais com terceiros para
                                fins de marketing. Os seus dados podem ser processados por prestadores
                                de serviços técnicos que nos apoiam a operar o site (por exemplo,
                                alojamento do servidor), sempre sob obrigação de confidencialidade e
                                apenas na medida necessária à prestação desse serviço.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">7. Prazo de conservação</h2>
                            <p>
                                Conservamos os dados do formulário de contacto durante 24 meses após o
                                último contacto, findos os quais são eliminados, salvo se existir uma
                                relação comercial em curso ou uma obrigação legal que exija um prazo
                                de conservação mais longo. Pode solicitar a eliminação antecipada dos
                                seus dados a qualquer momento — ver secção 9.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">8. Cookies</h2>
                            <p>
                                Este site utiliza apenas cookies e armazenamento técnicos estritamente
                                necessários ao seu funcionamento. Não utilizamos cookies de analítica,
                                publicidade ou redes sociais, pelo que não é necessário pedir o seu
                                consentimento para os cookies utilizados.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">9. Os seus direitos</h2>
                            <p className="mb-3">Nos termos do RGPD, tem direito a:</p>
                            <ul className="list-disc pl-6 space-y-1.5">
                                <li><strong>Acesso</strong> — saber que dados seus tratamos</li>
                                <li><strong>Retificação</strong> — corrigir dados incorretos ou incompletos</li>
                                <li><strong>Apagamento</strong> — solicitar a eliminação dos seus dados</li>
                                <li><strong>Portabilidade</strong> — receber os seus dados num formato estruturado</li>
                                <li><strong>Oposição</strong> — opor-se ao tratamento dos seus dados</li>
                                <li><strong>Limitação</strong> — restringir a forma como tratamos os seus dados</li>
                            </ul>
                            <p className="mt-3">
                                Para exercer qualquer um destes direitos, contacte-nos através de{" "}
                                <a href={`mailto:${COMPANY_INFO.email}`} className="text-cplp-blue hover:text-cplp-blue-hover underline underline-offset-2">
                                    {COMPANY_INFO.email}
                                </a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">10. Direito de reclamação</h2>
                            <p>
                                Se considerar que o tratamento dos seus dados pessoais viola o RGPD,
                                tem o direito de apresentar reclamação junto da Comissão Nacional de
                                Proteção de Dados (CNPD) — {" "}
                                <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-cplp-blue hover:text-cplp-blue-hover underline underline-offset-2">
                                    www.cnpd.pt
                                </a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">11. Segurança dos dados</h2>
                            <p>
                                Adotamos medidas técnicas e organizativas adequadas para proteger os
                                seus dados pessoais contra acesso não autorizado, perda ou destruição.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">12. Alterações a esta política</h2>
                            <p>
                                Esta política pode ser atualizada periodicamente. A data da última
                                atualização está indicada no topo desta página.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">13. Contacto</h2>
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
