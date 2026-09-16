import type { Metadata } from "next";
import { Toaster } from "sonner";
import { getSession } from "@/lib/session";
import { countNewEnrollments } from "@/lib/data/courses";
import { countNewApplications } from "@/lib/data/jobs";
import { countCertificatesToIssue } from "@/lib/data/academy";
import AdminSidebar from "./AdminSidebar";

export const metadata: Metadata = {
    title: "Admin",
    robots: { index: false, follow: false },
};

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession();

    if (!session) {
        return (
            <>
                {children}
                <Toaster />
            </>
        );
    }

    const [newEnrollments, newApplications, certificatesToIssue] = await Promise.all([
        countNewEnrollments(),
        countNewApplications(),
        countCertificatesToIssue(),
    ]);

    return (
        <div className="flex min-h-screen bg-cplp-bg">
            <AdminSidebar
                email={session.email}
                counts={{ newEnrollments, newApplications, certificatesToIssue }}
            />
            <main className="flex-1 p-8 min-w-0">{children}</main>
            <Toaster />
        </div>
    );
}
