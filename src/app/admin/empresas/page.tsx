import { getAllCompanies } from "@/lib/data/academy";
import CompaniesTable from "./CompaniesTable";

export default async function AdminCompaniesPage() {
    const companies = await getAllCompanies();
    return <CompaniesTable companies={companies} />;
}
