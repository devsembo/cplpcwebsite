import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import UnsubscribeButton from "./UnsubscribeButton";

export const metadata: Metadata = {
    title: "Cancelar Subscrição — CPLP CONNECT",
    robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {
    const { token } = await searchParams;

    return (
        <div className="min-h-screen flex flex-col">
            <PageHero
                title="Cancelar Subscrição"
                description="Lamentamos vê-lo partir. Confirme abaixo para deixar de receber a nossa newsletter."
            />
            <section className="py-16 bg-white flex-1">
                <div className="container mx-auto px-4 text-center">
                    {token ? (
                        <UnsubscribeButton token={token} />
                    ) : (
                        <p className="text-red-600">Link de cancelamento inválido.</p>
                    )}
                </div>
            </section>
        </div>
    );
}
