import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import ProjectsGrid from "@/components/ProjectsGrid";
import { getAllProjects } from "@/lib/data/projects";
import { getPageHero } from "@/lib/data/page-hero";

export const metadata: Metadata = {
    title: "Projetos — CPLP CONNECT",
    description:
        "Plataformas que desenvolvemos para empresas e instituições do espaço CPLP: TROKA, CRM Bemvistos e outros projetos em curso.",
};

export default async function ProjectsPage() {
    const [projects, heroImageUrl] = await Promise.all([getAllProjects(), getPageHero("projetos")]);
    return (
        <div className="min-h-screen flex flex-col">
            <PageHero
                title="Projetos"
                description="Plataformas reais que desenvolvemos para empresas e instituições do espaço CPLP."
                imageUrl={heroImageUrl}
            />

            <section className="py-16 md:py-20 bg-cplp-bg">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <ProjectsGrid projects={projects} />
                    </div>
                </div>
            </section>

            <section className="bg-cplp-blue py-20 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                            Tem um projeto em mente?
                        </h2>
                        <p className="text-white/80 mb-10">
                            Fale com a nossa equipa e vamos perceber como podemos ajudar a
                            construir a próxima plataforma da sua empresa.
                        </p>
                        <Button asChild size="lg" className="bg-white hover:bg-white/90 text-cplp-blue rounded-md">
                            <Link href="/contacto" className="flex items-center gap-2">
                                Fale connosco
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
