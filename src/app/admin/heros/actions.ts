"use server";

import { revalidatePath } from "next/cache";
import type { PageKey } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/storage";

export interface HeroActionResult {
    error?: string;
    success?: boolean;
}

const PAGE_PATHS: Record<PageKey, string[]> = {
    home: ["/"],
    sobre: ["/sobre"],
    servicos: ["/servicos"],
    projetos: ["/projetos"],
    academy: ["/academy"],
    carreiras: ["/carreiras"],
    contacto: ["/contacto"],
    faqs: ["/faqs"],
};

function revalidatePage(pageKey: PageKey) {
    for (const path of PAGE_PATHS[pageKey]) {
        revalidatePath(path);
    }
    revalidatePath("/admin/heros");
}

export async function updatePageHeroImage(
    pageKey: PageKey,
    _prevState: HeroActionResult,
    formData: FormData
): Promise<HeroActionResult> {
    const file = formData.get("image");
    if (!(file instanceof File) || file.size === 0) {
        return { error: "Escolhe uma imagem para carregar." };
    }

    const existing = await prisma.pageHero.findUnique({ where: { pageKey } });

    let imageUrl: string;
    try {
        imageUrl = await uploadImage(file, "heroes");
    } catch (error) {
        console.error("Falha ao carregar imagem do hero:", error);
        return { error: "Não foi possível carregar a imagem. Tenta novamente." };
    }
    await deleteImage(existing?.imageUrl);

    await prisma.pageHero.upsert({
        where: { pageKey },
        update: { imageUrl },
        create: { pageKey, imageUrl },
    });

    revalidatePage(pageKey);
    return { success: true };
}

export async function removePageHeroImage(pageKey: PageKey): Promise<void> {
    const existing = await prisma.pageHero.findUnique({ where: { pageKey } });
    if (!existing?.imageUrl) return;

    await deleteImage(existing.imageUrl);
    await prisma.pageHero.update({ where: { pageKey }, data: { imageUrl: null } });

    revalidatePage(pageKey);
}
