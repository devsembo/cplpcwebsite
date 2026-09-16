"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/schemas/site-content";
import { slugify } from "@/lib/slugify";

export interface ServiceActionResult {
    error?: string;
    success?: boolean;
}

async function uniqueSlug(title: string, ignoreId?: string): Promise<string> {
    const base = slugify(title) || "servico";
    let candidate = base;
    let attempt = 1;
    while (
        await prisma.service.findFirst({
            where: { slug: candidate, ...(ignoreId ? { id: { not: ignoreId } } : {}) },
        })
    ) {
        attempt += 1;
        candidate = `${base}-${attempt}`;
    }
    return candidate;
}

function parseFormData(formData: FormData) {
    return serviceSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        icon: formData.get("icon"),
        details: formData.get("details"),
        titleEn: formData.get("titleEn"),
        descriptionEn: formData.get("descriptionEn"),
        detailsEn: formData.get("detailsEn"),
        metaTitle: formData.get("metaTitle"),
        metaDescription: formData.get("metaDescription"),
        published: formData.get("published") === "on",
        order: formData.get("order"),
    });
}

// Os serviços aparecem na homepage, no menu de navegação e em /servicos.
function revalidatePublicPages(slug?: string) {
    revalidatePath("/", "layout");
    revalidatePath("/servicos");
    if (slug) revalidatePath(`/servicos/${slug}`);
}

export async function createService(
    _prevState: ServiceActionResult,
    formData: FormData
): Promise<ServiceActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const slug = await uniqueSlug(parsed.data.title);
    await prisma.service.create({ data: { ...parsed.data, slug } });

    revalidatePublicPages(slug);
    revalidatePath("/admin/servicos");
    return { success: true };
}

export async function updateService(
    id: string,
    _prevState: ServiceActionResult,
    formData: FormData
): Promise<ServiceActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
        return { error: "Serviço não encontrado." };
    }

    // O slug faz parte do URL público (/servicos/<slug>) — só muda se o título mudar.
    const slug =
        parsed.data.title === existing.title ? existing.slug : await uniqueSlug(parsed.data.title, id);

    await prisma.service.update({ where: { id }, data: { ...parsed.data, slug } });

    revalidatePublicPages(slug);
    if (existing.slug !== slug) revalidatePublicPages(existing.slug);
    revalidatePath("/admin/servicos");
    return { success: true };
}

export async function deleteService(id: string): Promise<void> {
    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) return;

    await prisma.service.delete({ where: { id } });

    revalidatePublicPages(existing.slug);
    revalidatePath("/admin/servicos");
}
