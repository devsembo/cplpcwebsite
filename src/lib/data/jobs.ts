import { prisma } from "@/lib/prisma";

export function getAllJobs() {
    return prisma.jobOpening.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        include: { _count: { select: { applications: true } } },
    });
}

// Vagas visíveis no site: publicadas e com o prazo de candidatura ainda aberto
// (sem prazo = sempre aberta).
export function getOpenJobs() {
    return prisma.jobOpening.findMany({
        where: {
            published: true,
            OR: [{ applyDeadline: null }, { applyDeadline: { gte: new Date() } }],
        },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
}

export function getOpenJobBySlug(slug: string) {
    return prisma.jobOpening.findFirst({
        where: {
            slug,
            published: true,
            OR: [{ applyDeadline: null }, { applyDeadline: { gte: new Date() } }],
        },
    });
}

export function getJobById(id: string) {
    return prisma.jobOpening.findUnique({ where: { id } });
}

export function getAllApplications() {
    return prisma.jobApplication.findMany({
        orderBy: { createdAt: "desc" },
        include: { job: { select: { id: true, title: true, slug: true } } },
    });
}

export function countNewApplications() {
    return prisma.jobApplication.count({ where: { status: "nova" } });
}
