import { prisma } from "@/lib/prisma";

export function getAllPosts() {
    return prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
}

export function getPublishedPosts() {
    return prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
    });
}

export function getPostBySlug(slug: string) {
    return prisma.blogPost.findUnique({ where: { slug } });
}

export function getPublishedPostBySlug(slug: string) {
    return prisma.blogPost.findFirst({ where: { slug, published: true } });
}
