"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { courseSchema } from "@/lib/schemas/course";
import { slugify } from "@/lib/slugify";
import { uploadImage, deleteImage } from "@/lib/storage";

export interface CourseActionResult {
    error?: string;
}

async function uniqueSlug(title: string, ignoreId?: string): Promise<string> {
    const base = slugify(title) || "curso";
    let candidate = base;
    let attempt = 1;
    while (
        await prisma.course.findFirst({
            where: { slug: candidate, ...(ignoreId ? { id: { not: ignoreId } } : {}) },
        })
    ) {
        attempt += 1;
        candidate = `${base}-${attempt}`;
    }
    return candidate;
}

function parseFormData(formData: FormData) {
    return courseSchema.safeParse({
        title: formData.get("title"),
        summary: formData.get("summary"),
        description: formData.get("description"),
        format: formData.get("format"),
        area: formData.get("area"),
        level: formData.get("level"),
        durationLabel: formData.get("durationLabel"),
        scheduleLabel: formData.get("scheduleLabel"),
        priceLabel: formData.get("priceLabel"),
        location: formData.get("location"),
        language: formData.get("language"),
        startDate: formData.get("startDate"),
        seats: formData.get("seats"),
        highlights: formData.get("highlights"),
        requirements: formData.get("requirements"),
        targetAudience: formData.get("targetAudience"),
        registrationUrl: formData.get("registrationUrl"),
        tags: formData.get("tags") ?? "",
        published: formData.get("published") === "on",
        featured: formData.get("featured") === "on",
        order: formData.get("order"),
    });
}

function revalidatePublicPages(slug?: string) {
    revalidatePath("/academy");
    if (slug) revalidatePath(`/academy/${slug}`);
}

export async function createCourse(
    _prevState: CourseActionResult,
    formData: FormData
): Promise<CourseActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const imageFile = formData.get("image");
    let imageUrl: string | undefined;
    if (imageFile instanceof File && imageFile.size > 0) {
        try {
            imageUrl = await uploadImage(imageFile, "courses");
        } catch (error) {
            console.error("Falha ao carregar imagem do curso:", error);
            return { error: "Não foi possível carregar a imagem. Tenta novamente." };
        }
    }

    const slug = await uniqueSlug(parsed.data.title);
    const course = await prisma.course.create({ data: { ...parsed.data, slug, imageUrl } });

    revalidatePublicPages(course.slug);
    revalidatePath("/admin/cursos");
    redirect("/admin/cursos");
}

export async function updateCourse(
    id: string,
    _prevState: CourseActionResult,
    formData: FormData
): Promise<CourseActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const existing = await prisma.course.findUnique({ where: { id } });
    if (!existing) {
        return { error: "Curso não encontrado." };
    }

    const imageFile = formData.get("image");
    const removeImage = formData.get("removeImage") === "on";
    let imageUrl: string | null | undefined = undefined;

    if (imageFile instanceof File && imageFile.size > 0) {
        try {
            imageUrl = await uploadImage(imageFile, "courses");
        } catch (error) {
            console.error("Falha ao carregar imagem do curso:", error);
            return { error: "Não foi possível carregar a imagem. Tenta novamente." };
        }
        await deleteImage(existing.imageUrl);
    } else if (removeImage) {
        imageUrl = null;
        await deleteImage(existing.imageUrl);
    }

    const slug =
        parsed.data.title === existing.title ? existing.slug : await uniqueSlug(parsed.data.title, id);

    await prisma.course.update({
        where: { id },
        data: { ...parsed.data, slug, ...(imageUrl !== undefined ? { imageUrl } : {}) },
    });

    revalidatePublicPages(slug);
    if (existing.slug !== slug) revalidatePublicPages(existing.slug);
    revalidatePath("/admin/cursos");
    redirect("/admin/cursos");
}

export async function deleteCourse(id: string): Promise<void> {
    const existing = await prisma.course.findUnique({ where: { id } });
    if (!existing) return;

    // As inscrições são eliminadas em cascata (ver schema.prisma).
    await prisma.course.delete({ where: { id } });
    await deleteImage(existing.imageUrl);

    revalidatePublicPages(existing.slug);
    revalidatePath("/admin/cursos");
    revalidatePath("/admin/inscricoes");
}

