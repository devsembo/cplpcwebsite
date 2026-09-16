import { getAllTestimonials } from "@/lib/data/site-content";
import TestimonialsTable from "./TestimonialsTable";

export default async function AdminTestimonialsPage() {
    const testimonials = await getAllTestimonials();
    return <TestimonialsTable testimonials={testimonials} />;
}
