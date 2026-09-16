import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import { getCertificateByCode } from "@/lib/data/academy";
import { certificateQrDataUrl } from "@/lib/certificate";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ code: string }>;
}): Promise<Metadata> {
    const { code } = await params;
    return { title: `Certificado ${code} — CPLP CONNECT Academy` };
}

export default async function CertificatePage({ params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;
    const certificate = await getCertificateByCode(code);

    if (!certificate || certificate.certificateStatus !== "emitido") {
        notFound();
    }

    const qrDataUrl = await certificateQrDataUrl(code);

    return (
        <div className="min-h-screen flex flex-col">
            <PageHero title="Verificação de certificado" description="CPLP CONNECT Academy" />
            <section className="py-16 md:py-20 bg-white flex-1">
                <div className="container mx-auto px-4">
                    <div className="max-w-xl mx-auto bg-white border border-cplp-line rounded-2xl shadow-card p-8 md:p-10 text-center">
                        <div className="w-14 h-14 rounded-full bg-cplp-green/10 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-7 h-7 text-cplp-green" />
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-cplp-green mb-2">
                            Certificado válido
                        </p>
                        <h1 className="text-2xl font-bold text-cplp-navy mb-1">{certificate.name}</h1>
                        <p className="text-cplp-grey mb-8">{certificate.course.title}</p>

                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={qrDataUrl} alt="QR de verificação" className="w-40 h-40 mx-auto mb-8" />

                        <dl className="grid grid-cols-2 gap-4 text-sm text-left border-t border-cplp-line pt-6">
                            <div>
                                <dt className="text-xs text-cplp-grey">Código</dt>
                                <dd className="font-semibold text-cplp-navy">{certificate.certificateCode}</dd>
                            </div>
                            <div>
                                <dt className="text-xs text-cplp-grey">Duração</dt>
                                <dd className="font-semibold text-cplp-navy">
                                    {certificate.course.durationLabel ?? `${certificate.hoursCompleted}h`}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-cplp-grey">Nota final</dt>
                                <dd className="font-semibold text-cplp-navy">
                                    {certificate.grade !== null ? `${certificate.grade.toFixed(1)}/20` : "—"}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-xs text-cplp-grey">Data de emissão</dt>
                                <dd className="font-semibold text-cplp-navy">
                                    {certificate.certificateIssuedAt?.toLocaleDateString("pt-PT") ?? "—"}
                                </dd>
                            </div>
                        </dl>

                        <p className="text-xs text-cplp-grey mt-8 pt-6 border-t border-cplp-line">
                            Emitido por CPLP CONNECT, LDA. · Entidade em processo de preparação para
                            certificação DGERT.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
