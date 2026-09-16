import { getAllEnrollments } from "@/lib/data/courses";
import EnrollmentsTable from "./EnrollmentsTable";

export default async function AdminEnrollmentsPage() {
    const enrollments = await getAllEnrollments();
    return <EnrollmentsTable enrollments={enrollments} />;
}
