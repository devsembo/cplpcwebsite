import type { Metadata } from "next";
import { getPageHero } from "@/lib/data/page-hero";
import { getPublishedCourses } from "@/lib/data/courses";
import AcademyPageContent from "./AcademyPageContent";

// Rede de segurança: esta página é estática e só é revalidada sob pedido
// (revalidatePath nas actions do admin). Se essa revalidação alguma vez falhar
// em atingir o processo certo em produção (ex: conteúdo editado noutro ambiente
// que partilha a base de dados), a página nunca fica desatualizada por mais de
// 1 minuto.
export const revalidate = 60;

export const metadata: Metadata = {
    title: "Academy — Formação Corporativa com ADN Tecnológico",
    description:
        "Corporate Training, Executive Education e Digital Transformation para empresas de Portugal, Angola e restante espaço CPLP. In-Company, Executive Program, Online & Híbrido e Corporate Exchange.",
    alternates: { canonical: "/academy" },
};

export default async function AcademyPage() {
    const [heroImageUrl, courses] = await Promise.all([
        getPageHero("academy"),
        getPublishedCourses(),
    ]);
    return <AcademyPageContent heroImageUrl={heroImageUrl} courses={courses} />;
}
