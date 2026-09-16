"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { companySchema } from "@/lib/schemas/company";

export interface CompanyActionResult {
    error?: string;
    success?: boolean;
}

function parseFormData(formData: FormData) {
    return companySchema.safeParse({
        name: formData.get("name"),
        sector: formData.get("sector"),
        contractLabel: formData.get("contractLabel"),
        seatsContracted: formData.get("seatsContracted"),
        accountManager: formData.get("accountManager"),
        notes: formData.get("notes"),
    });
}

export async function createCompany(
    _prevState: CompanyActionResult,
    formData: FormData
): Promise<CompanyActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const existing = await prisma.company.findUnique({ where: { name: parsed.data.name } });
    if (existing) {
        return { error: "Já existe uma empresa com este nome." };
    }

    await prisma.company.create({ data: parsed.data });

    revalidatePath("/admin/empresas");
    return { success: true };
}

export async function updateCompany(
    id: string,
    _prevState: CompanyActionResult,
    formData: FormData
): Promise<CompanyActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const clash = await prisma.company.findFirst({ where: { name: parsed.data.name, id: { not: id } } });
    if (clash) {
        return { error: "Já existe uma empresa com este nome." };
    }

    await prisma.company.update({ where: { id }, data: parsed.data });

    revalidatePath("/admin/empresas");
    revalidatePath("/admin/formandos");
    return { success: true };
}

export async function deleteCompany(id: string): Promise<void> {
    await prisma.company.delete({ where: { id } });
    revalidatePath("/admin/empresas");
    revalidatePath("/admin/formandos");
}

/** Associa uma inscrição (formando) a uma empresa cliente formalizada. */
export async function linkEnrollmentToCompany(enrollmentId: string, companyId: string | null): Promise<void> {
    await prisma.courseEnrollment.update({
        where: { id: enrollmentId },
        data: { clientCompanyId: companyId },
    });
    revalidatePath("/admin/formandos");
    revalidatePath("/admin/empresas");
}
