import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getJobById } from "@/lib/data/jobs";
import JobForm from "../../JobForm";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const job = await getJobById(id);

    if (!job) {
        notFound();
    }

    return (
        <div>
            <Link
                href="/admin/vagas"
                className="inline-flex items-center gap-2 text-sm text-cplp-grey hover:text-cplp-navy mb-4"
            >
                <ArrowLeft className="w-4 h-4" />
                Voltar às vagas
            </Link>
            <h1 className="text-2xl font-bold text-cplp-navy mb-6">Editar Vaga</h1>
            <JobForm job={job} />
        </div>
    );
}
