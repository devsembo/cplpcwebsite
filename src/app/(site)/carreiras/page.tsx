import type { Metadata } from "next";
import { getPageHero } from "@/lib/data/page-hero";
import CarreirasContent from "./CarreirasContent";

export const metadata: Metadata = {
    title: "Carreiras",
    description:
        "Junte-se à equipa CPLP CONNECT. Conheça a nossa cultura, benefícios e envie a sua candidatura espontânea.",
    alternates: { canonical: "/carreiras" },
};

export default async function CarreirasPage() {
    const heroImageUrl = await getPageHero("carreiras");
    return <CarreirasContent heroImageUrl={heroImageUrl} />;
}
