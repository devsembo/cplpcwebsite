import { getAllJobs } from "@/lib/data/jobs";
import JobsTable from "./JobsTable";

export default async function AdminJobsPage() {
    const jobs = await getAllJobs();
    return <JobsTable jobs={jobs} />;
}
