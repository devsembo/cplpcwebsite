import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICE_AREAS } from "@/lib/service-areas";
import ServiceDetailContent from "./ServiceDetailContent";

// Metadados por serviço — em português, à semelhança das restantes páginas
// do site (o seletor de idioma no cliente não afeta os metadados de SEO).
const SERVICE_METADATA: Record<string, { title: string; description: string }> = {
    banking: {
        title: "Core Banking & Soluções Financeiras",
        description:
            "Plataformas de core banking, pagamentos e mobile banking para bancos e instituições financeiras em Angola e no espaço CPLP.",
    },
    web: {
        title: "Plataformas & Software à Medida",
        description:
            "Sistemas e plataformas digitais desenhados à volta dos processos reais da sua empresa ou instituição.",
    },
    mobile: {
        title: "Apps Mobile",
        description:
            "Aplicações móveis que aproximam a sua empresa de clientes, colaboradores ou cidadãos, em qualquer país do espaço CPLP.",
    },
    cloud: {
        title: "Cloud & Infraestrutura",
        description: "Infraestrutura segura e escalável, preparada para crescer com o negócio.",
    },
    design: {
        title: "Estratégia Digital & Design",
        description: "Estratégia de marca, produto e comunicação digital alinhadas com os objetivos de negócio.",
    },
};

export function generateStaticParams() {
    return SERVICE_AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const meta = SERVICE_METADATA[slug];

    if (!meta) {
        return { title: "Serviço não encontrado" };
    }

    return {
        title: meta.title,
        description: meta.description,
        alternates: { canonical: `/servicos/${slug}` },
    };
}

export default async function ServiceDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const exists = SERVICE_AREAS.some((a) => a.slug === slug);

    if (!exists) {
        notFound();
    }

    return <ServiceDetailContent slug={slug} />;
}
