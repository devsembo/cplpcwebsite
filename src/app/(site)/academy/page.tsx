import type { Metadata } from "next";
import { getPageHero } from "@/lib/data/page-hero";
import { getPublishedCourses } from "@/lib/data/courses";
import AcademyPageContent from "./AcademyPageContent";

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
