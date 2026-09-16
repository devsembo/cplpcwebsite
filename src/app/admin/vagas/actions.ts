"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { jobOpeningSchema } from "@/lib/schemas/job";
import { slugify } from "@/lib/slugify";

export interface JobActionResult {
    error?: string;
}

async function uniqueSlug(title: string, ignoreId?: string): Promise<string> {
    const base = slugify(title) || "vaga";
    let candidate = base;
    let attempt = 1;
    while (
        await prisma.jobOpening.findFirst({
            where: { slug: candidate, ...(ignoreId ? { id: { not: ignoreId } } : {}) },
        })
    ) {
        attempt += 1;
        candidate = `${base}-${attempt}`;
    }
    return candidate;
}

function parseFormData(formData: FormData) {
    return jobOpeningSchema.safeParse({
        title: formData.get("title"),
        department: formData.get("department"),
        location: formData.get("location"),
        type: formData.get("type"),
        mode: formData.get("mode"),
        seniority: formData.get("seniority"),
        summary: formData.get("summary"),
        description: formData.get("description"),
        responsibilities: formData.get("responsibilities"),
        requirements: formData.get("requirements"),
        benefits: formData.get("benefits"),
        applyDeadline: formData.get("applyDeadline"),
        published: formData.get("published") === "on",
        order: formData.get("order"),
    });
}

function revalidatePublicPages(slug?: string) {
    revalidatePath("/carreiras");
    if (slug) revalidatePath(`/carreiras/${slug}`);
}

export async function createJob(
    _prevState: JobActionResult,
    formData: FormData
): Promise<JobActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const slug = await uniqueSlug(parsed.data.title);
    const job = await prisma.jobOpening.create({ data: { ...parsed.data, slug } });

    revalidatePublicPages(job.slug);
    revalidatePath("/admin/vagas");
    redirect("/admin/vagas");
}

export async function updateJob(
    id: string,
    _prevState: JobActionResult,
    formData: FormData
): Promise<JobActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const existing = await prisma.jobOpening.findUnique({ where: { id } });
    if (!existing) {
        return { error: "Vaga não encontrada." };
    }

    const slug =
        parsed.data.title === existing.title ? existing.slug : await uniqueSlug(parsed.data.title, id);

    await prisma.jobOpening.update({ where: { id }, data: { ...parsed.data, slug } });

    revalidatePublicPages(slug);
    if (existing.slug !== slug) revalidatePublicPages(existing.slug);
    revalidatePath("/admin/vagas");
    redirect("/admin/vagas");
}

export async function deleteJob(id: string): Promise<void> {
    const existing = await prisma.jobOpening.findUnique({ where: { id } });
    if (!existing) return;

    // As candidaturas ficam guardadas como espontâneas (jobId passa a nulo).
    await prisma.jobOpening.delete({ where: { id } });

    revalidatePublicPages(existing.slug);
    revalidatePath("/admin/vagas");
    revalidatePath("/admin/candidaturas");
}
