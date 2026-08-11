import { getAllProjects } from "@/lib/data/projects";
import ProjectsTable from "./ProjectsTable";

export default async function AdminProjectsPage() {
    const projects = await getAllProjects();
    return <ProjectsTable projects={projects} />;
}
