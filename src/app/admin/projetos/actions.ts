"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/schemas/project";
import { slugify } from "@/lib/slugify";
import { uploadImage, deleteImage } from "@/lib/storage";

export interface ProjectActionResult {
    error?: string;
    success?: boolean;
}

async function uniqueSlug(title: string, ignoreId?: string): Promise<string> {
    const base = slugify(title) || "projeto";
    let candidate = base;
    let attempt = 1;
    while (
        await prisma.project.findFirst({
            where: { slug: candidate, ...(ignoreId ? { id: { not: ignoreId } } : {}) },
        })
    ) {
        attempt += 1;
        candidate = `${base}-${attempt}`;
    }
    return candidate;
}

function parseFormData(formData: FormData) {
    return projectSchema.safeParse({
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        tags: formData.get("tags") ?? "",
        accentFrom: formData.get("accentFrom"),
        accentTo: formData.get("accentTo"),
        comingSoon: formData.get("comingSoon") === "on",
        order: formData.get("order"),
    });
}

function revalidatePublicPages() {
    revalidatePath("/");
    revalidatePath("/projetos");
}

export async function createProject(
    _prevState: ProjectActionResult,
    formData: FormData
): Promise<ProjectActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const imageFile = formData.get("image");
    let imageUrl: string | undefined;
    if (imageFile instanceof File && imageFile.size > 0) {
        try {
            imageUrl = await uploadImage(imageFile, "projects");
        } catch (error) {
            console.error("Falha ao carregar imagem do projeto:", error);
            return { error: "Não foi possível carregar a imagem. Tenta novamente." };
        }
    }

    const slug = await uniqueSlug(parsed.data.title);

    await prisma.project.create({
        data: { ...parsed.data, slug, imageUrl },
    });

    revalidatePublicPages();
    revalidatePath("/admin/projetos");
    return { success: true };
}

export async function updateProject(
    id: string,
    _prevState: ProjectActionResult,
    formData: FormData
): Promise<ProjectActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
        return { error: "Projeto não encontrado." };
    }

    const imageFile = formData.get("image");
    const removeImage = formData.get("removeImage") === "on";
    let imageUrl: string | null | undefined = undefined;

    if (imageFile instanceof File && imageFile.size > 0) {
        try {
            imageUrl = await uploadImage(imageFile, "projects");
        } catch (error) {
            console.error("Falha ao carregar imagem do projeto:", error);
            return { error: "Não foi possível carregar a imagem. Tenta novamente." };
        }
        await deleteImage(existing.imageUrl);
    } else if (removeImage) {
        imageUrl = null;
        await deleteImage(existing.imageUrl);
    }

    const slug =
        parsed.data.title === existing.title
            ? existing.slug
            : await uniqueSlug(parsed.data.title, id);

    await prisma.project.update({
        where: { id },
        data: { ...parsed.data, slug, ...(imageUrl !== undefined ? { imageUrl } : {}) },
    });

    revalidatePublicPages();
    revalidatePath("/admin/projetos");
    return { success: true };
}

export async function deleteProject(id: string): Promise<void> {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return;

    await prisma.project.delete({ where: { id } });
    await deleteImage(existing.imageUrl);

    revalidatePublicPages();
    revalidatePath("/admin/projetos");
}
