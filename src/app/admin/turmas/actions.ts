"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sessionSchema } from "@/lib/schemas/session";

export interface SessionActionResult {
    error?: string;
    success?: boolean;
}

function parseFormData(formData: FormData) {
    return sessionSchema.safeParse({
        courseId: formData.get("courseId"),
        code: formData.get("code"),
        instructorName: formData.get("instructorName"),
        location: formData.get("location"),
        startDate: formData.get("startDate"),
        endDate: formData.get("endDate"),
        seats: formData.get("seats"),
        status: formData.get("status"),
    });
}

export async function createSession(
    _prevState: SessionActionResult,
    formData: FormData
): Promise<SessionActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const existing = await prisma.courseSession.findUnique({ where: { code: parsed.data.code } });
    if (existing) {
        return { error: "Já existe uma turma com este código." };
    }

    await prisma.courseSession.create({ data: parsed.data });

    revalidatePath("/admin/turmas");
    return { success: true };
}

export async function updateSession(
    id: string,
    _prevState: SessionActionResult,
    formData: FormData
): Promise<SessionActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const clash = await prisma.courseSession.findFirst({
        where: { code: parsed.data.code, id: { not: id } },
    });
    if (clash) {
        return { error: "Já existe uma turma com este código." };
    }

    await prisma.courseSession.update({ where: { id }, data: parsed.data });

    revalidatePath("/admin/turmas");
    revalidatePath("/admin/formandos");
    return { success: true };
}

export async function deleteSession(id: string): Promise<void> {
    await prisma.courseSession.delete({ where: { id } });
    revalidatePath("/admin/turmas");
    revalidatePath("/admin/formandos");
}
