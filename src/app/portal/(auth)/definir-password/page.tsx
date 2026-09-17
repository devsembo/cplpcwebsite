import type { Metadata } from "next";
import SetPasswordForm from "./SetPasswordForm";

export const metadata: Metadata = { title: "Definir password — Portal do Formando" };

export default async function DefinirPasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {
    const { token } = await searchParams;

    if (!token) {
        return <p className="text-center text-cplp-grey">Link inválido.</p>;
    }

    return (
        <>
            <h1 className="text-xl font-bold text-cplp-navy mb-6 text-center">Define a tua password</h1>
            <SetPasswordForm token={token} />
        </>
    );
}
