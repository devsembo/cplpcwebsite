'use client';

import Hero from '@/components/Hero';
import Services from '@/components/Services';
import AcademySection from '@/components/AcademySection';
import Sectors from '@/components/Sectors';
import Projects from '@/components/Projects';
import ContactCTA from '@/components/ContactCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AcademySection />
      <Sectors />
      <Projects />
      <ContactCTA />
    </>
  );
}
