import type { Metadata } from "next";
import { getPageHero } from "@/lib/data/page-hero";
import AcademyPageContent from "./AcademyPageContent";

export const metadata: Metadata = {
    title: "CPLP CONNECT Academy — Formação Corporativa com ADN Tecnológico",
    description:
        "Corporate Training, Executive Education e Digital Transformation para empresas de Portugal, Angola e restante espaço CPLP. In-Company, Executive Program, Online & Híbrido e Corporate Exchange.",
};

export default async function AcademyPage() {
    const heroImageUrl = await getPageHero("academy");
    return <AcademyPageContent heroImageUrl={heroImageUrl} />;
}
