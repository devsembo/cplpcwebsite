import { prisma } from "@/lib/prisma";

// Serviços ------------------------------------------------------------------

export function getAllServices() {
    return prisma.service.findMany({ orderBy: [{ order: "asc" }, { title: "asc" }] });
}

export function getPublishedServices() {
    return prisma.service.findMany({
        where: { published: true },
        orderBy: [{ order: "asc" }, { title: "asc" }],
    });
}

export function getPublishedServiceBySlug(slug: string) {
    return prisma.service.findFirst({ where: { slug, published: true } });
}

// FAQs ----------------------------------------------------------------------

export function getAllFaqs() {
    return prisma.faq.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
}

export function getPublishedFaqs() {
    return prisma.faq.findMany({
        where: { published: true },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
}

// Parceiros -----------------------------------------------------------------

export function getAllPartners() {
    return prisma.partner.findMany({ orderBy: [{ order: "asc" }, { name: "asc" }] });
}

export function getPublishedPartners() {
    return prisma.partner.findMany({
        where: { published: true },
        orderBy: [{ order: "asc" }, { name: "asc" }],
    });
}

// Depoimentos ---------------------------------------------------------------

export function getAllTestimonials() {
    return prisma.testimonial.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
}

export function getPublishedTestimonials() {
    return prisma.testimonial.findMany({
        where: { published: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
}
