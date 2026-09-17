import { describe, expect, it, afterEach } from "vitest";
import { prisma } from "@/lib/prisma";
import { getFormandoEnrollments, getFormandoSummary, getFormandoCertificates } from "./portal";

const suffix = Math.random().toString(36).slice(2);
const emailA = `vitest-portal-a-${suffix}@teste.cplpconnect.pt`;
const emailB = `vitest-portal-b-${suffix}@teste.cplpconnect.pt`;
let courseId: string;
const enrollmentIds: string[] = [];

afterEach(async () => {
    await prisma.courseEnrollment.deleteMany({ where: { id: { in: enrollmentIds } } });
    enrollmentIds.length = 0;
    if (courseId) {
        await prisma.course.delete({ where: { id: courseId } }).catch(() => {});
        courseId = "";
    }
});

async function seed() {
    const course = await prisma.course.create({
        data: { slug: `vitest-curso-portal-${suffix}`, title: "Curso Portal", summary: "x", description: "x", format: "online", area: "x" },
    });
    courseId = course.id;
    const a = await prisma.courseEnrollment.create({
        data: {
            courseId, name: "Formando A", email: emailA, status: "confirmada",
            progress: 50, grade: 16, hoursCompleted: 10, trainingStatus: "em_curso", certificateStatus: "nao_elegivel",
        },
    });
    const b = await prisma.courseEnrollment.create({
        data: {
            courseId, name: "Formando B", email: emailB, status: "confirmada",
            progress: 100, grade: 18, hoursCompleted: 20, trainingStatus: "concluido", certificateStatus: "emitido",
            certificateCode: `CPLP-9999-${suffix}`, certificateIssuedAt: new Date(),
        },
    });
    enrollmentIds.push(a.id, b.id);
}

describe("dados do portal", () => {
    it("só devolve as inscrições do email pedido", async () => {
        await seed();
        const enrollmentsA = await getFormandoEnrollments(emailA);
        expect(enrollmentsA).toHaveLength(1);
        expect(enrollmentsA[0].email).toBe(emailA);
    });

    it("calcula o resumo apenas com dados do próprio formando", async () => {
        await seed();
        const summary = await getFormandoSummary(emailB);
        expect(summary.certificadosEmitidos).toBe(1);
        expect(summary.horasTotais).toBe(20);
    });

    it("só lista certificados emitidos do próprio formando", async () => {
        await seed();
        const certsA = await getFormandoCertificates(emailA);
        const certsB = await getFormandoCertificates(emailB);
        expect(certsA).toHaveLength(0);
        expect(certsB).toHaveLength(1);
    });

    it("faz correspondência de email sem distinguir maiúsculas/minúsculas, mas continua a excluir outros formandos", async () => {
        await seed();
        const enrollmentsUpper = await getFormandoEnrollments(emailA.toUpperCase());
        expect(enrollmentsUpper).toHaveLength(1);
        expect(enrollmentsUpper[0].email).toBe(emailA);

        const crossedCase = await getFormandoEnrollments(emailB.toUpperCase());
        expect(crossedCase).toHaveLength(1);
        expect(crossedCase[0].email).toBe(emailB);
        expect(crossedCase[0].email).not.toBe(emailA);
    });
});
