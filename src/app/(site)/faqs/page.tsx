import type { Metadata } from "next";
import { getPageHero } from "@/lib/data/page-hero";
import { getPublishedFaqs } from "@/lib/data/site-content";
import FaqsContent from "./FaqsContent";

// Rede de segurança: esta página é estática e só é revalidada sob pedido
// (revalidatePath nas actions do admin). Se essa revalidação alguma vez falhar
// em atingir o processo certo em produção (ex: conteúdo editado noutro ambiente
// que partilha a base de dados), a página nunca fica desatualizada por mais de
// 1 minuto.
export const revalidate = 60;

export const metadata: Metadata = {
    title: "Perguntas Frequentes",
    description:
        "Respostas às perguntas mais comuns sobre os serviços e o processo de trabalho da CPLP CONNECT.",
    alternates: { canonical: "/faqs" },
};

export default async function FaqsPage() {
    const [heroImageUrl, faqs] = await Promise.all([getPageHero("faqs"), getPublishedFaqs()]);
    return <FaqsContent heroImageUrl={heroImageUrl} faqs={faqs} />;
}
