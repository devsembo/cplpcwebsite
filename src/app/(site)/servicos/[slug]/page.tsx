import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedServiceBySlug, getPublishedServices } from "@/lib/data/site-content";
import ServiceDetailContent from "./ServiceDetailContent";

// Os metadados são em português, à semelhança das restantes páginas do site
// (o seletor de idioma no cliente não afeta os metadados de SEO). Cada serviço
// pode definir título/descrição próprios no admin.
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const service = await getPublishedServiceBySlug(slug);

    if (!service) {
        return { title: "Serviço não encontrado" };
    }

    return {
        title: service.metaTitle ?? service.title,
        description: service.metaDescription ?? service.description,
        alternates: { canonical: `/servicos/${service.slug}` },
    };
}

export default async function ServiceDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const service = await getPublishedServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    const relatedServices = (await getPublishedServices()).filter((item) => item.id !== service.id);

    return <ServiceDetailContent service={service} relatedServices={relatedServices} />;
}
