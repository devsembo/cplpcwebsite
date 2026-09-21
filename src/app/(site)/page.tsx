import type { Metadata } from "next";
import { getAllProjects } from "@/lib/data/projects";
import { getPageHero } from "@/lib/data/page-hero";
import { getPublishedPosts } from "@/lib/data/blog";
import {
    getPublishedPartners,
    getPublishedServices,
    getPublishedTestimonials,
} from "@/lib/data/site-content";
import HomeContent from "./HomeContent";

// Rede de segurança: esta página é estática e só é revalidada sob pedido
// (revalidatePath nas actions do admin). Se essa revalidação alguma vez falhar
// em atingir o processo certo em produção (ex: conteúdo editado noutro ambiente
// que partilha a base de dados), a página nunca fica desatualizada por mais de
// 1 minuto.
export const revalidate = 60;

export const metadata: Metadata = {
    title: { absolute: "CPLP CONNECT — Consultoria e Transformação Digital no Espaço CPLP" },
    description:
        "Concebemos e implementamos plataformas digitais, software e programas de capacitação para empresas e instituições de Portugal, Angola e restante espaço CPLP.",
    alternates: { canonical: "/" },
};

export default async function Home() {
    const [projects, heroImageUrl, posts, services, partners, testimonials] = await Promise.all([
        getAllProjects(),
        getPageHero("home"),
        getPublishedPosts(),
        getPublishedServices(),
        getPublishedPartners(),
        getPublishedTestimonials(),
    ]);

    return (
        <HomeContent
            projects={projects}
            heroImageUrl={heroImageUrl}
            posts={posts.slice(0, 3)}
            services={services}
            partners={partners}
            testimonials={testimonials}
        />
    );
}
