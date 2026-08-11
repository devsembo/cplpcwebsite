import type { Metadata } from "next";
import { getPageHero } from "@/lib/data/page-hero";
import FaqsContent from "./FaqsContent";

export const metadata: Metadata = {
    title: "Perguntas Frequentes — CPLP CONNECT",
    description:
        "Respostas às perguntas mais comuns sobre os serviços e o processo de trabalho da CPLP CONNECT.",
};

export default async function FaqsPage() {
    const heroImageUrl = await getPageHero("faqs");
    return <FaqsContent heroImageUrl={heroImageUrl} />;
}
