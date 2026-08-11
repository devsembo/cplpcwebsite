import LayoutWrapper from "@/components/LayoutWrapper";

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <LayoutWrapper>
            <div className="flex-1">{children}</div>
        </LayoutWrapper>
    );
}
