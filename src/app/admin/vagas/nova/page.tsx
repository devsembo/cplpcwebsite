import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import JobForm from "../JobForm";

export default function NewJobPage() {
    return (
        <div>
            <Link
                href="/admin/vagas"
                className="inline-flex items-center gap-2 text-sm text-cplp-grey hover:text-cplp-navy mb-4"
            >
                <ArrowLeft className="w-4 h-4" />
                Voltar às vagas
            </Link>
            <h1 className="text-2xl font-bold text-cplp-navy mb-6">Nova Vaga</h1>
            <JobForm />
        </div>
    );
}
