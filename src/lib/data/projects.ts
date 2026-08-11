import { prisma } from "@/lib/prisma";

export function getAllProjects() {
    return prisma.project.findMany({ orderBy: { order: "asc" } });
}
