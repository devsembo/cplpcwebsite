import type { Metadata } from "next";
import { getPageHero } from "@/lib/data/page-hero";
import SobreContent from "./SobreContent";

export const metadata: Metadata = {
    title: "Sobre Nós — CPLP CONNECT",
    description:
        "Consultora tecnológica sediada no Porto, dedicada à transformação digital de empresas e instituições do espaço CPLP.",
};

export default async function SobrePage() {
    const heroImageUrl = await getPageHero("sobre");
    return <SobreContent heroImageUrl={heroImageUrl} />;
}
