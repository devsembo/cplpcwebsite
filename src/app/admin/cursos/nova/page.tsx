import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CourseForm from "../CourseForm";

export default function NewCoursePage() {
    return (
        <div>
            <Link
                href="/admin/cursos"
                className="inline-flex items-center gap-2 text-sm text-cplp-grey hover:text-cplp-navy mb-4"
            >
                <ArrowLeft className="w-4 h-4" />
                Voltar aos cursos
            </Link>
            <h1 className="text-2xl font-bold text-cplp-navy mb-6">Novo Curso</h1>
            <CourseForm />
        </div>
    );
}
