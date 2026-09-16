import { getAllFaqs } from "@/lib/data/site-content";
import FaqsTable from "./FaqsTable";

export default async function AdminFaqsPage() {
    const faqs = await getAllFaqs();
    return <FaqsTable faqs={faqs} />;
}
