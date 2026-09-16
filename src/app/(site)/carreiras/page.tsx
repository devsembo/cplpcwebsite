import type { Metadata } from "next";
import { getPageHero } from "@/lib/data/page-hero";
import { getOpenJobs } from "@/lib/data/jobs";
import CarreirasContent from "./CarreirasContent";

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
