import type { Metadata } from "next";
import { getPageHero } from "@/lib/data/page-hero";
import { getOpenJobs } from "@/lib/data/jobs";
import CarreirasContent from "./CarreirasContent";

// Rede de segurança: esta página é estática e só é revalidada sob pedido
// (revalidatePath nas actions do admin). Se essa revalidação alguma vez falhar
// em atingir o processo certo em produção (ex: conteúdo editado noutro ambiente
// que partilha a base de dados), a página nunca fica desatualizada por mais de
// 1 minuto.
export const revalidate = 60;

export const metadata: Metadata = {
    title: "Carreiras",
    description:
        "Vagas abertas na CPLP CONNECT. Conheça a nossa cultura, benefícios e candidate-se a uma posição ou envie a sua candidatura espontânea.",
    alternates: { canonical: "/carreiras" },
};

export default async function CarreirasPage() {
    const [heroImageUrl, jobs] = await Promise.all([getPageHero("carreiras"), getOpenJobs()]);
    return <CarreirasContent heroImageUrl={heroImageUrl} jobs={jobs} />;
}
