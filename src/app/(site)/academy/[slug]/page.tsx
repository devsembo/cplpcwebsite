import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedCourseBySlug, getPublishedCourses } from "@/lib/data/courses";
import CourseDetailContent from "./CourseDetailContent";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const course = await getPublishedCourseBySlug(slug);

    if (!course) {
        return { title: "Curso não encontrado" };
    }

    return {
        title: `${course.title} — Academy`,
        description: course.summary,
        alternates: { canonical: `/academy/${course.slug}` },
        openGraph: {
            title: course.title,
            description: course.summary,
            images: course.imageUrl ? [{ url: course.imageUrl }] : undefined,
        },
    };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const course = await getPublishedCourseBySlug(slug);

    if (!course) {
        notFound();
    }

    const relatedCourses = (await getPublishedCourses())
        .filter((item) => item.id !== course.id)
        .slice(0, 3);

    return <CourseDetailContent course={course} relatedCourses={relatedCourses} />;
}
