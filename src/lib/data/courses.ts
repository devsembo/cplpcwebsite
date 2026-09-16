import { prisma } from "@/lib/prisma";

export function getAllCourses() {
    return prisma.course.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        include: { _count: { select: { enrollments: true } } },
    });
}

export function getPublishedCourses() {
    return prisma.course.findMany({
        where: { published: true },
        orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });
}

export function getPublishedCourseBySlug(slug: string) {
    return prisma.course.findFirst({ where: { slug, published: true } });
}

export function getCourseById(id: string) {
    return prisma.course.findUnique({ where: { id } });
}

export function getAllEnrollments() {
    return prisma.courseEnrollment.findMany({
        orderBy: { createdAt: "desc" },
        include: { course: { select: { id: true, title: true, slug: true } } },
    });
}

export function countNewEnrollments() {
    return prisma.courseEnrollment.count({ where: { status: "nova" } });
}
