"use server";

import { revalidatePath } from "next/cache";
import type { EnrollmentStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function updateEnrollmentStatus(id: string, status: EnrollmentStatus): Promise<void> {
    await prisma.courseEnrollment.update({ where: { id }, data: { status } });
    revalidatePath("/admin/inscricoes");
    revalidatePath("/admin");
}

export async function updateEnrollmentNotes(id: string, notes: string): Promise<void> {
    await prisma.courseEnrollment.update({
        where: { id },
        data: { notes: notes.trim() || null },
    });
    revalidatePath("/admin/inscricoes");
}

export async function deleteEnrollment(id: string): Promise<void> {
    await prisma.courseEnrollment.delete({ where: { id } });
    revalidatePath("/admin/inscricoes");
    revalidatePath("/admin");
}
