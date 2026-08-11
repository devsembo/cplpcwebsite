import { prisma } from "@/lib/prisma";
import type { PageKey } from "@prisma/client";

export async function getPageHero(pageKey: PageKey): Promise<string | null> {
    const hero = await prisma.pageHero.findUnique({ where: { pageKey } });
    return hero?.imageUrl ?? null;
}

export function getAllPageHeroes() {
    return prisma.pageHero.findMany({ orderBy: { pageKey: "asc" } });
}
