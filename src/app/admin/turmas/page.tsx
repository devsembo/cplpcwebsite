import { prisma } from "@/lib/prisma";
import { getAllSessions } from "@/lib/data/academy";
import SessionsTable from "./SessionsTable";

export default async function AdminSessionsPage() {
    const [sessions, courseOptions] = await Promise.all([
        getAllSessions(),
        prisma.course.findMany({ orderBy: { title: "asc" }, select: { id: true, title: true } }),
    ]);

    return <SessionsTable sessions={sessions} courseOptions={courseOptions} />;
}
