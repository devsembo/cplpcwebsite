import { getAllCourses } from "@/lib/data/courses";
import CoursesTable from "./CoursesTable";

export default async function AdminCoursesPage() {
    const courses = await getAllCourses();
    return <CoursesTable courses={courses} />;
}
