"use client";

import type { Project, BlogPost } from "@prisma/client";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Methodology from "@/components/Methodology";
import AcademySection from "@/components/AcademySection";
import Sectors from "@/components/Sectors";
import WhyUs from "@/components/WhyUs";
import TechStack from "@/components/TechStack";
import Partners from "@/components/Partners";
import Projects from "@/components/Projects";
import LatestBlog from "@/components/LatestBlog";
import ContactCTA from "@/components/ContactCTA";

export default function HomeContent({
    projects,
    heroImageUrl,
    posts,
}: {
    projects: Project[];
    heroImageUrl?: string | null;
    posts: BlogPost[];
}) {
    return (
        <>
            <Hero imageUrl={heroImageUrl} />
            <Partners />
            <Services />
            <Methodology />
            <Sectors />
            <WhyUs />
            <AcademySection />
            <TechStack />
            <Projects projects={projects} />
            <LatestBlog posts={posts} />
            <ContactCTA />
        </>
    );
}
