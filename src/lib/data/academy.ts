import { prisma } from "@/lib/prisma";

// ---------------------------------------------------------------------------
// Turmas (CourseSession)
// ---------------------------------------------------------------------------

export function getAllSessions() {
    return prisma.courseSession.findMany({
        orderBy: [{ startDate: "desc" }, { createdAt: "desc" }],
        include: {
            course: { select: { id: true, title: true, area: true, format: true } },
            _count: { select: { enrollments: true } },
        },
    });
}

export function getSessionById(id: string) {
    return prisma.courseSession.findUnique({ where: { id } });
}

export function getSessionOptions() {
    return prisma.courseSession.findMany({
        orderBy: { code: "asc" },
        select: { id: true, code: true, course: { select: { title: true } } },
    });
}

// ---------------------------------------------------------------------------
// Empresas clientes (Company)
// ---------------------------------------------------------------------------

export function getAllCompanies() {
    return prisma.company.findMany({
        orderBy: { name: "asc" },
        include: { _count: { select: { enrollments: true } } },
    });
}

export function getCompanyById(id: string) {
    return prisma.company.findUnique({
        where: { id },
        include: {
            enrollments: {
                orderBy: { createdAt: "desc" },
                include: { course: { select: { title: true } } },
            },
        },
    });
}

export function getCompanyOptions() {
    return prisma.company.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } });
}

// ---------------------------------------------------------------------------
// Formandos — inscrições confirmadas, geridas pedagogicamente
// ---------------------------------------------------------------------------

export function getFormandos() {
    return prisma.courseEnrollment.findMany({
        where: { status: "confirmada" },
        orderBy: { createdAt: "desc" },
        include: {
            course: { select: { id: true, title: true, area: true, format: true } },
            session: { select: { id: true, code: true, instructorName: true } },
            clientCompany: { select: { id: true, name: true } },
        },
    });
}

export function getFormandoById(id: string) {
    return prisma.courseEnrollment.findUnique({
        where: { id },
        include: {
            course: true,
            session: true,
            clientCompany: true,
        },
    });
}

export function getCertificateQueue() {
    return prisma.courseEnrollment.findMany({
        where: { certificateStatus: { in: ["elegivel", "emitido"] } },
        orderBy: [{ certificateStatus: "asc" }, { createdAt: "desc" }],
        include: {
            course: { select: { title: true } },
            session: { select: { code: true } },
        },
    });
}

export async function getCertificateByCode(code: string) {
    return prisma.courseEnrollment.findUnique({
        where: { certificateCode: code },
        include: { course: { select: { title: true, durationLabel: true } } },
    });
}

export function countFormandosAtivos() {
    return prisma.courseEnrollment.count({
        where: { status: "confirmada", trainingStatus: { in: ["nao_iniciado", "em_curso"] } },
    });
}

export function countCertificatesToIssue() {
    return prisma.courseEnrollment.count({ where: { certificateStatus: "elegivel" } });
}

// ---------------------------------------------------------------------------
// Comunicações (StaffNotification)
// ---------------------------------------------------------------------------

export function getNotifications() {
    return prisma.staffNotification.findMany({ orderBy: { sentAt: "desc" }, take: 50 });
}
