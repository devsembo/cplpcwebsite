import LayoutWrapper from "@/components/LayoutWrapper";
import { getPublishedServices } from "@/lib/data/site-content";

export default async function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const services = await getPublishedServices();

    return (
        <LayoutWrapper services={services}>
            <div className="flex-1">{children}</div>
        </LayoutWrapper>
    );
}
