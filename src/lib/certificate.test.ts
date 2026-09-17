import { describe, expect, it, afterEach } from "vitest";
import { prisma } from "./prisma";
import { issueCertificateForEnrollment } from "./certificate";

const suffix = Math.random().toString(36).slice(2);
const testCourseSlug = `vitest-curso-certificado-${suffix}`;
let courseId: string;
const enrollmentIds: string[] = [];

async function seedEligibleEnrollment(email: string) {
    if (!courseId) {
        const course = await prisma.course.create({
            data: {
                slug: testCourseSlug,
                title: "Curso de teste",
                summary: "x",
                description: "x",
                format: "online",
                area: "x",
            },
        });
        courseId = course.id;
    }
    const enrollment = await prisma.courseEnrollment.create({
        data: {
            courseId,
            name: "Formando Teste",
            email,
            status: "confirmada",
            progress: 100,
            grade: 15,
            trainingStatus: "concluido",
            certificateStatus: "elegivel",
        },
    });
    enrollmentIds.push(enrollment.id);
    return enrollment.id;
}

afterEach(async () => {
    await prisma.courseEnrollment.deleteMany({ where: { id: { in: enrollmentIds } } });
    enrollmentIds.length = 0;
    if (courseId) {
        await prisma.course.delete({ where: { id: courseId } }).catch(() => {});
        courseId = "";
    }
});

describe("issueCertificateForEnrollment", () => {
    it("gera códigos únicos para duas emissões concorrentes", async () => {
        const idA = await seedEligibleEnrollment(`vitest-cert-a-${suffix}@teste.cplpconnect.pt`);
        const idB = await seedEligibleEnrollment(`vitest-cert-b-${suffix}@teste.cplpconnect.pt`);

        const [resultA, resultB] = await Promise.all([
            issueCertificateForEnrollment(idA),
            issueCertificateForEnrollment(idB),
        ]);

        expect(resultA?.code).toBeTruthy();
        expect(resultB?.code).toBeTruthy();
        expect(resultA?.code).not.toBe(resultB?.code);
    });

    it("devolve null se a inscrição não for elegível", async () => {
        const id = await seedEligibleEnrollment(`vitest-cert-c-${suffix}@teste.cplpconnect.pt`);
        await prisma.courseEnrollment.update({ where: { id }, data: { certificateStatus: "nao_elegivel" } });
        const result = await issueCertificateForEnrollment(id);
        expect(result).toBeNull();
    });
});
