"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { partnerSchema } from "@/lib/schemas/site-content";
import { uploadImage, deleteImage } from "@/lib/storage";

export interface PartnerActionResult {
    error?: string;
    success?: boolean;
}

function parseFormData(formData: FormData) {
    return partnerSchema.safeParse({
        name: formData.get("name"),
        websiteUrl: formData.get("websiteUrl"),
        published: formData.get("published") === "on",
        order: formData.get("order"),
    });
}

export async function createPartner(
    _prevState: PartnerActionResult,
    formData: FormData
): Promise<PartnerActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const logoFile = formData.get("logo");
    let logoUrl: string | undefined;
    if (logoFile instanceof File && logoFile.size > 0) {
        try {
            logoUrl = await uploadImage(logoFile, "partners");
        } catch (error) {
            console.error("Falha ao carregar logótipo do parceiro:", error);
            return { error: "Não foi possível carregar o logótipo. Tenta novamente." };
        }
    }

    await prisma.partner.create({ data: { ...parsed.data, logoUrl } });

    revalidatePath("/");
    revalidatePath("/admin/parceiros");
    return { success: true };
}

export async function updatePartner(
    id: string,
    _prevState: PartnerActionResult,
    formData: FormData
): Promise<PartnerActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const existing = await prisma.partner.findUnique({ where: { id } });
    if (!existing) {
        return { error: "Parceiro não encontrado." };
    }

    const logoFile = formData.get("logo");
    const removeLogo = formData.get("removeLogo") === "on";
    let logoUrl: string | null | undefined = undefined;

    if (logoFile instanceof File && logoFile.size > 0) {
        try {
            logoUrl = await uploadImage(logoFile, "partners");
        } catch (error) {
            console.error("Falha ao carregar logótipo do parceiro:", error);
            return { error: "Não foi possível carregar o logótipo. Tenta novamente." };
        }
        await deleteImage(existing.logoUrl);
    } else if (removeLogo) {
        logoUrl = null;
        await deleteImage(existing.logoUrl);
    }

    await prisma.partner.update({
        where: { id },
        data: { ...parsed.data, ...(logoUrl !== undefined ? { logoUrl } : {}) },
    });

    revalidatePath("/");
    revalidatePath("/admin/parceiros");
    return { success: true };
}

export async function deletePartner(id: string): Promise<void> {
    const existing = await prisma.partner.findUnique({ where: { id } });
    if (!existing) return;

    await prisma.partner.delete({ where: { id } });
    await deleteImage(existing.logoUrl);

    revalidatePath("/");
    revalidatePath("/admin/parceiros");
}
