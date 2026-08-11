"use client";

import type { Project } from "@prisma/client";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AcademySection from "@/components/AcademySection";
import Sectors from "@/components/Sectors";
import Projects from "@/components/Projects";
import ContactCTA from "@/components/ContactCTA";

export default function HomeContent({
    projects,
    heroImageUrl,
}: {
    projects: Project[];
    heroImageUrl?: string | null;
}) {
    return (
        <>
            <Hero imageUrl={heroImageUrl} />
            <Services />
            <AcademySection />
            <Sectors />
            <Projects projects={projects} />
            <ContactCTA />
        </>
    );
}
