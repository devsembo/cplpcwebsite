import { prisma } from "@/lib/prisma";

function byEmail(email: string) {
    return { equals: email, mode: "insensitive" as const };
}

export function getFormandoEnrollments(email: string) {
    return prisma.courseEnrollment.findMany({
        where: { email: byEmail(email), status: "confirmada" },
        orderBy: { createdAt: "desc" },
        include: {
            course: true,
            session: true,
            clientCompany: { select: { id: true, name: true } },
        },
    });
}

export async function getFormandoSummary(email: string) {
    const enrollments = await getFormandoEnrollments(email);
    const cursosAtivos = enrollments.filter((e) => e.trainingStatus === "em_curso").length;
    const horasTotais = enrollments.reduce((sum, e) => sum + e.hoursCompleted, 0);
    const grades = enrollments.map((e) => e.grade).filter((g): g is number => g !== null);
    const notaMedia = grades.length > 0 ? grades.reduce((a, b) => a + b, 0) / grades.length : null;
    const certificadosEmitidos = enrollments.filter((e) => e.certificateStatus === "emitido").length;
    return { cursosAtivos, horasTotais, notaMedia, certificadosEmitidos };
}

export function getFormandoCertificates(email: string) {
    return prisma.courseEnrollment.findMany({
        where: { email: byEmail(email), certificateStatus: "emitido" },
        orderBy: { certificateIssuedAt: "desc" },
        include: { course: { select: { title: true, durationLabel: true } } },
    });
}

export function getPublishedCourses() {
    return prisma.course.findMany({
        where: { published: true },
        orderBy: [{ featured: "desc" }, { order: "asc" }],
    });
}

export async function getCourseForFormando(courseId: string, email: string) {
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) return null;
    const enrollment = await prisma.courseEnrollment.findFirst({
        where: { courseId, email: byEmail(email) },
    });
    return { course, enrollment };
}

export function getUpcomingSessionsForFormando(email: string) {
    return prisma.courseSession.findMany({
        where: {
            startDate: { gte: new Date() },
            enrollments: { some: { email: byEmail(email), status: "confirmada" } },
        },
        orderBy: { startDate: "asc" },
        include: { course: { select: { title: true } } },
    });
}
