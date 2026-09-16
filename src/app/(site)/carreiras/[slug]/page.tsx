import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOpenJobBySlug, getOpenJobs } from "@/lib/data/jobs";
import JobDetailContent from "./JobDetailContent";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const job = await getOpenJobBySlug(slug);

    if (!job) {
        return { title: "Vaga não encontrada" };
    }

    return {
        title: `${job.title} — Carreiras`,
        description: job.summary,
        alternates: { canonical: `/carreiras/${job.slug}` },
    };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const job = await getOpenJobBySlug(slug);

    if (!job) {
        notFound();
    }

    const otherJobs = (await getOpenJobs()).filter((item) => item.id !== job.id).slice(0, 3);

    return <JobDetailContent job={job} otherJobs={otherJobs} />;
}
