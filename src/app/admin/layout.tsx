import type { Metadata } from "next";
import { Toaster } from "sonner";
import { getSession } from "@/lib/session";
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

    return (
        <div className="flex min-h-screen bg-cplp-bg">
            <AdminSidebar email={session.email} />
            <main className="flex-1 p-8">{children}</main>
            <Toaster />
        </div>
    );
}
