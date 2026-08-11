"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { blogPostSchema } from "@/lib/schemas/blog-post";
import { slugify } from "@/lib/slugify";
import { uploadImage, deleteImage } from "@/lib/blob";
import { sendMail } from "@/lib/mail";
import { buildNewsletterEmail } from "@/lib/email-templates/newsletter";

export interface BlogPostActionResult {
    error?: string;
}

async function uniqueSlug(title: string, ignoreId?: string): Promise<string> {
    const base = slugify(title) || "post";
    let candidate = base;
    let attempt = 1;
    while (
        await prisma.blogPost.findFirst({
            where: { slug: candidate, ...(ignoreId ? { id: { not: ignoreId } } : {}) },
        })
    ) {
        attempt += 1;
        candidate = `${base}-${attempt}`;
    }
    return candidate;
}

function parseFormData(formData: FormData) {
    return blogPostSchema.safeParse({
        title: formData.get("title"),
        excerpt: formData.get("excerpt"),
        content: formData.get("content"),
        authorName: formData.get("authorName") || undefined,
        published: formData.get("published") === "on",
    });
}

function revalidatePublicPages(slug?: string) {
    revalidatePath("/blog");
    if (slug) revalidatePath(`/blog/${slug}`);
}

export async function createBlogPost(
    _prevState: BlogPostActionResult,
    formData: FormData
): Promise<BlogPostActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const imageFile = formData.get("coverImage");
    let coverImageUrl: string | undefined;
    if (imageFile instanceof File && imageFile.size > 0) {
        try {
            coverImageUrl = await uploadImage(imageFile, "blog");
        } catch (error) {
            console.error("Falha ao carregar imagem de capa:", error);
            return { error: "Não foi possível carregar a imagem. Tenta novamente." };
        }
    }

    const slug = await uniqueSlug(parsed.data.title);

    const post = await prisma.blogPost.create({
        data: {
            ...parsed.data,
            slug,
            coverImageUrl,
            publishedAt: parsed.data.published ? new Date() : null,
        },
    });

    revalidatePublicPages(post.slug);
    revalidatePath("/admin/blog");
    redirect("/admin/blog");
}

export async function updateBlogPost(
    id: string,
    _prevState: BlogPostActionResult,
    formData: FormData
): Promise<BlogPostActionResult> {
    const parsed = parseFormData(formData);
    if (!parsed.success) {
        return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
    }

    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
        return { error: "Post não encontrado." };
    }

    const imageFile = formData.get("coverImage");
    const removeImage = formData.get("removeCoverImage") === "on";
    let coverImageUrl: string | null | undefined = undefined;

    if (imageFile instanceof File && imageFile.size > 0) {
        try {
            coverImageUrl = await uploadImage(imageFile, "blog");
        } catch (error) {
            console.error("Falha ao carregar imagem de capa:", error);
            return { error: "Não foi possível carregar a imagem. Tenta novamente." };
        }
        await deleteImage(existing.coverImageUrl);
    } else if (removeImage) {
        coverImageUrl = null;
        await deleteImage(existing.coverImageUrl);
    }

    const slug =
        parsed.data.title === existing.title ? existing.slug : await uniqueSlug(parsed.data.title, id);

    const wasPublished = existing.published;
    const publishedAt =
        parsed.data.published && !wasPublished ? new Date() : existing.publishedAt;

    await prisma.blogPost.update({
        where: { id },
        data: {
            ...parsed.data,
            slug,
            publishedAt,
            ...(coverImageUrl !== undefined ? { coverImageUrl } : {}),
        },
    });

    revalidatePublicPages(slug);
    if (existing.slug !== slug) revalidatePublicPages(existing.slug);
    revalidatePath("/admin/blog");
    redirect("/admin/blog");
}

export async function deleteBlogPost(id: string): Promise<void> {
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) return;

    await prisma.blogPost.delete({ where: { id } });
    await deleteImage(existing.coverImageUrl);

    revalidatePublicPages(existing.slug);
    revalidatePath("/admin/blog");
}

export interface SendNewsletterResult {
    error?: string;
    sent?: number;
    failed?: number;
}

const BATCH_SIZE = 20;
const BATCH_DELAY_MS = 1000;

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Nota de escala: este envio é síncrono e em lotes, dentro do limite de duração
// da função serverless (ver `maxDuration` na página que chama esta action).
// Para listas de subscritores muito grandes (mais de algumas centenas), isto
// deixa de ser viável e precisa de uma fila de envio — não implementada aqui.
export async function sendNewsletterForPost(postId: string): Promise<SendNewsletterResult> {
    const post = await prisma.blogPost.findUnique({ where: { id: postId } });
    if (!post) {
        return { error: "Post não encontrado." };
    }
    if (!post.published) {
        return { error: "Só é possível enviar a newsletter de um post publicado." };
    }
    if (post.newsletterSentAt) {
        return { error: "A newsletter deste post já foi enviada." };
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({ where: { active: true } });

    let sent = 0;
    let failed = 0;

    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
        const batch = subscribers.slice(i, i + BATCH_SIZE);
        const results = await Promise.allSettled(
            batch.map((subscriber) =>
                sendMail({
                    to: subscriber.email,
                    subject: post.title,
                    html: buildNewsletterEmail(post, subscriber.unsubscribeToken),
                })
            )
        );
        for (const result of results) {
            if (result.status === "fulfilled") sent += 1;
            else failed += 1;
        }
        if (i + BATCH_SIZE < subscribers.length) {
            await sleep(BATCH_DELAY_MS);
        }
    }

    await prisma.blogPost.update({ where: { id: postId }, data: { newsletterSentAt: new Date() } });
    revalidatePath("/admin/blog");

    return { sent, failed };
}
