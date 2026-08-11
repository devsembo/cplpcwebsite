// TODO: validar juridicamente antes de publicar — mesma ressalva da Política
// de Privacidade. Atualizar esta página se, no futuro, forem adicionados
// cookies de analítica, publicidade ou redes sociais.
import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Política de Cookies",
    description: "Que cookies o site da CPLP CONNECT utiliza e para que servem.",
    alternates: { canonical: "/politica-cookies" },
};

export default function PoliticaCookies() {
    return (
        <div className="min-h-screen bg-cplp-bg">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <main className="bg-white border border-cplp-line rounded-lg px-6 sm:px-10 md:px-14 py-10 md:py-14">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-cplp-navy tracking-tight mb-2">
                        Política de Cookies
                    </h1>
                    <p className="text-cplp-grey mb-10 text-sm">
                        <strong className="text-cplp-ink">Última atualização:</strong> 11 de agosto de 2026
                    </p>

                    <div className="space-y-9 text-cplp-ink leading-relaxed">
                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">1. O que são cookies</h2>
                            <p>
                                Cookies são pequenos ficheiros de texto guardados no seu dispositivo
                                quando visita um site. Servem para que o site funcione corretamente,
                                lembre as suas preferências, ou para fins de análise e publicidade.
                                O nosso site utiliza apenas cookies estritamente necessários — não
                                usamos cookies de analítica, publicidade ou redes sociais.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">2. Cookies que utilizamos</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border border-cplp-line rounded-md overflow-hidden">
                                    <thead>
                                        <tr className="bg-cplp-bg text-left">
                                            <th className="px-4 py-3 font-semibold text-cplp-navy border-b border-cplp-line">Cookie</th>
                                            <th className="px-4 py-3 font-semibold text-cplp-navy border-b border-cplp-line">Finalidade</th>
                                            <th className="px-4 py-3 font-semibold text-cplp-navy border-b border-cplp-line">Duração</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-cplp-line">
                                            <td className="px-4 py-3 font-mono text-xs">admin_session</td>
                                            <td className="px-4 py-3">
                                                Mantém a sessão iniciada de utilizadores autorizados a gerir
                                                o conteúdo do site. Só é criado após login na área de
                                                administração — visitantes normais nunca o recebem.
                                            </td>
                                            <td className="px-4 py-3">7 dias</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-mono text-xs">cplp_cookie_consent</td>
                                            <td className="px-4 py-3">
                                                Guarda que já viu e fechou o aviso de cookies, para não voltar
                                                a aparecer. Guardado localmente no seu navegador, não é enviado
                                                ao servidor.
                                            </td>
                                            <td className="px-4 py-3">12 meses</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">3. Cookies de terceiros</h2>
                            <p>
                                Não utilizamos cookies de terceiros para publicidade, redes sociais ou
                                analítica de tráfego (ex.: Google Analytics, Meta Pixel). Se isto mudar
                                no futuro, esta página será atualizada e será pedido o seu consentimento
                                antes de qualquer cookie não essencial ser colocado.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">4. Como gerir cookies</h2>
                            <p>
                                Como usamos apenas cookies estritamente necessários, não existe uma opção
                                de recusa dentro do site — sem eles, funcionalidades como o login de
                                administração deixam de funcionar. Pode, ainda assim, gerir ou eliminar
                                cookies a qualquer momento nas definições do seu navegador.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-cplp-navy mb-3">5. Mais informação</h2>
                            <p>
                                Para saber como tratamos os seus dados pessoais em geral, consulte a
                                nossa{" "}
                                <a href="/politica-privacidade" className="text-cplp-blue hover:text-cplp-blue-hover underline underline-offset-2">
                                    Política de Privacidade
                                </a>. Para qualquer questão, contacte-nos em{" "}
                                <a href={`mailto:${COMPANY_INFO.email}`} className="text-cplp-blue hover:text-cplp-blue-hover underline underline-offset-2">
                                    {COMPANY_INFO.email}
                                </a>.
                            </p>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
