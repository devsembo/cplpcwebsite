"use server";

import { revalidatePath } from "next/cache";
import type { ApplicationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function updateApplicationStatus(id: string, status: ApplicationStatus): Promise<void> {
    await prisma.jobApplication.update({ where: { id }, data: { status } });
    revalidatePath("/admin/candidaturas");
    revalidatePath("/admin");
}

export async function updateApplicationNotes(id: string, notes: string): Promise<void> {
    await prisma.jobApplication.update({
        where: { id },
        data: { notes: notes.trim() || null },
    });
    revalidatePath("/admin/candidaturas");
}

export async function deleteApplication(id: string): Promise<void> {
    await prisma.jobApplication.delete({ where: { id } });
    revalidatePath("/admin/candidaturas");
    revalidatePath("/admin");
}
