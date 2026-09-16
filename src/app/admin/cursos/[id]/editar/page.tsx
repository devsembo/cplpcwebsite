import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCourseById } from "@/lib/data/courses";
import CourseForm from "../../CourseForm";

export default async function EditCoursePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const course = await getCourseById(id);

    if (!course) {
        notFound();
    }

    return (
        <div>
            <Link
                href="/admin/cursos"
                className="inline-flex items-center gap-2 text-sm text-cplp-grey hover:text-cplp-navy mb-4"
            >
                <ArrowLeft className="w-4 h-4" />
                Voltar aos cursos
            </Link>
            <h1 className="text-2xl font-bold text-cplp-navy mb-6">Editar Curso</h1>
            <CourseForm course={course} />
        </div>
    );
}
