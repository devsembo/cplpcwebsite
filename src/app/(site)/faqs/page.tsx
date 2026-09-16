import type { Metadata } from "next";
import { getPageHero } from "@/lib/data/page-hero";
import { getPublishedFaqs } from "@/lib/data/site-content";
import FaqsContent from "./FaqsContent";

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
