import { getAllApplications } from "@/lib/data/jobs";
import ApplicationsTable from "./ApplicationsTable";

export default async function AdminApplicationsPage() {
    const applications = await getAllApplications();
    return <ApplicationsTable applications={applications} />;
}
