'use client';

import About from '@/components/About';

import Hero from '@/components/Hero';
import Services from '@/components/Services';
import AcademySection from '@/components/AcademySection';
import Projects from '@/components/Projects';
import Solutions from '@/components/Solutions';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <AcademySection />
      <Projects />
      <Solutions/>
    </>
  );
}
