"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { testimonialSchema } from "@/lib/schemas/site-content";
import { uploadImage, deleteImage } from "@/lib/storage";

export interface TestimonialActionResult {
    error?: string;
    success?: boolean;
}

function parseFormData(formData: FormData) {
    return testimonialSchema.safeParse({
        authorName: formData.get("authorName"),
        role: formData.get("role"),
        company: formData.get("company"),
        quote: formData.get("quote"),
        quoteEn: formData.get("quoteEn"),
        published: formData.get("published") === "on",
        order: formData.get("order"),
    });
}

export async function createTestimonial(
    _prevState: TestimonialActionResult,
    formData: FormData
): Promise<TestimonialActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const avatarFile = formData.get("avatar");
    let avatarUrl: string | undefined;
    if (avatarFile instanceof File && avatarFile.size > 0) {
        try {
            avatarUrl = await uploadImage(avatarFile, "testimonials");
        } catch (error) {
            console.error("Falha ao carregar fotografia do depoimento:", error);
            return { error: "Não foi possível carregar a fotografia. Tenta novamente." };
        }
    }

    await prisma.testimonial.create({ data: { ...parsed.data, avatarUrl } });

    revalidatePath("/");
    revalidatePath("/admin/depoimentos");
    return { success: true };
}

export async function updateTestimonial(
    id: string,
    _prevState: TestimonialActionResult,
    formData: FormData
): Promise<TestimonialActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) {
        return { error: "Depoimento não encontrado." };
    }

    const avatarFile = formData.get("avatar");
    const removeAvatar = formData.get("removeAvatar") === "on";
    let avatarUrl: string | null | undefined = undefined;

    if (avatarFile instanceof File && avatarFile.size > 0) {
        try {
            avatarUrl = await uploadImage(avatarFile, "testimonials");
        } catch (error) {
            console.error("Falha ao carregar fotografia do depoimento:", error);
            return { error: "Não foi possível carregar a fotografia. Tenta novamente." };
        }
        await deleteImage(existing.avatarUrl);
    } else if (removeAvatar) {
        avatarUrl = null;
        await deleteImage(existing.avatarUrl);
    }

    await prisma.testimonial.update({
        where: { id },
        data: { ...parsed.data, ...(avatarUrl !== undefined ? { avatarUrl } : {}) },
    });

    revalidatePath("/");
    revalidatePath("/admin/depoimentos");
    return { success: true };
}

export async function deleteTestimonial(id: string): Promise<void> {
    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) return;

    await prisma.testimonial.delete({ where: { id } });
    await deleteImage(existing.avatarUrl);

    revalidatePath("/");
    revalidatePath("/admin/depoimentos");
}
