import { getAllServices } from "@/lib/data/site-content";
import ServicesTable from "./ServicesTable";

export default async function AdminServicesPage() {
    const services = await getAllServices();
    return <ServicesTable services={services} />;
}
