import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import ServicosContent from "./ServicosContent";
import { getPageHero } from "@/lib/data/page-hero";
import { getPublishedServices } from "@/lib/data/site-content";

// Rede de segurança: esta página é estática e só é revalidada sob pedido
// (revalidatePath nas actions do admin). Se essa revalidação alguma vez falhar
// em atingir o processo certo em produção (ex: conteúdo editado noutro ambiente
// que partilha a base de dados), a página nunca fica desatualizada por mais de
// 1 minuto.
export const revalidate = 60;

export const metadata: Metadata = {
    title: "Serviços",
    description:
        "Sites institucionais e plataformas web, apps mobile, core banking & soluções financeiras, cloud & infraestrutura e estratégia digital & design para empresas, instituições e bancos do espaço CPLP.",
    alternates: { canonical: "/servicos" },
};

export default async function ServicosPage() {
    const [heroImageUrl, services] = await Promise.all([
        getPageHero("servicos"),
        getPublishedServices(),
    ]);
    return (
        <div className="min-h-screen flex flex-col">
            <PageHero
                title="Serviços"
                description="Quatro áreas de atuação, sempre orientadas ao valor de negócio da sua empresa ou instituição."
                imageUrl={heroImageUrl}
            />

            <ServicosContent services={services} />

            <section className="bg-cplp-blue py-20 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                            Vamos falar sobre o seu projeto?
                        </h2>
                        <p className="text-white/80 mb-10">
                            Conte-nos o que precisa e ajudamo-lo a escolher a área certa
                            para o seu negócio.
                        </p>
                        <Button asChild size="lg" className="bg-white hover:bg-white/90 text-cplp-blue rounded-md">
                            <Link href="/contacto" className="flex items-center gap-2">
                                Fale connosco
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
