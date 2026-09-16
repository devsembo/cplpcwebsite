"use client";

import type { Project, BlogPost, Service, Partner, Testimonial } from "@prisma/client";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Methodology from "@/components/Methodology";
import AcademySection from "@/components/AcademySection";
import Sectors from "@/components/Sectors";
import WhyUs from "@/components/WhyUs";
import TechStack from "@/components/TechStack";
import Partners from "@/components/Partners";
import Testimonials from "@/components/Testimonials";
import Projects from "@/components/Projects";
import LatestBlog from "@/components/LatestBlog";
import ContactCTA from "@/components/ContactCTA";

export default function HomeContent({
    projects,
    heroImageUrl,
    posts,
    services,
    partners,
    testimonials,
}: {
    projects: Project[];
    heroImageUrl?: string | null;
    posts: BlogPost[];
    services: Service[];
    partners: Partner[];
    testimonials: Testimonial[];
}) {
    return (
        <>
            <Hero imageUrl={heroImageUrl} />

            <Services services={services} />
            <Methodology />
            <Sectors />
            <WhyUs />
            <AcademySection />
            <TechStack />
            <Projects projects={projects} />
            <Testimonials testimonials={testimonials} />
            <Partners partners={partners} />
            <LatestBlog posts={posts} />
            <ContactCTA />
        </>
    );
}
