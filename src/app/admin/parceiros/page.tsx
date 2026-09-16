import { getAllPartners } from "@/lib/data/site-content";
import PartnersTable from "./PartnersTable";

export default async function AdminPartnersPage() {
    const partners = await getAllPartners();
    return <PartnersTable partners={partners} />;
}
