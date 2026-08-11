import type { Metadata } from "next";
import { getAllProjects } from "@/lib/data/projects";
import { getPageHero } from "@/lib/data/page-hero";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
    title: { absolute: "CPLP CONNECT — Consultoria e Transformação Digital no Espaço CPLP" },
    description:
        "Concebemos e implementamos plataformas digitais, software e programas de capacitação para empresas e instituições de Portugal, Angola e restante espaço CPLP.",
    alternates: { canonical: "/" },
};

export default async function Home() {
    const [projects, heroImageUrl] = await Promise.all([getAllProjects(), getPageHero("home")]);
    return <HomeContent projects={projects} heroImageUrl={heroImageUrl} />;
}
