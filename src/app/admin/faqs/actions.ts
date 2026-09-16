"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { faqSchema } from "@/lib/schemas/site-content";

export interface FaqActionResult {
    error?: string;
    success?: boolean;
}

function parseFormData(formData: FormData) {
    return faqSchema.safeParse({
        question: formData.get("question"),
        answer: formData.get("answer"),
        questionEn: formData.get("questionEn"),
        answerEn: formData.get("answerEn"),
        category: formData.get("category"),
        published: formData.get("published") === "on",
        order: formData.get("order"),
    });
}

function revalidatePublicPages() {
    revalidatePath("/faqs");
}

export async function createFaq(
    _prevState: FaqActionResult,
    formData: FormData
): Promise<FaqActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    await prisma.faq.create({ data: parsed.data });

    revalidatePublicPages();
    revalidatePath("/admin/faqs");
    return { success: true };
}

export async function updateFaq(
    id: string,
    _prevState: FaqActionResult,
    formData: FormData
): Promise<FaqActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    await prisma.faq.update({ where: { id }, data: parsed.data });

    revalidatePublicPages();
    revalidatePath("/admin/faqs");
    return { success: true };
}

export async function deleteFaq(id: string): Promise<void> {
    await prisma.faq.delete({ where: { id } });
    revalidatePublicPages();
    revalidatePath("/admin/faqs");
}
