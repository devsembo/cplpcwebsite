import { getAllProjects } from "@/lib/data/projects";
import { getPageHero } from "@/lib/data/page-hero";
import HomeContent from "./HomeContent";

export default async function Home() {
    const [projects, heroImageUrl] = await Promise.all([getAllProjects(), getPageHero("home")]);
    return <HomeContent projects={projects} heroImageUrl={heroImageUrl} />;
}
