import type { Metadata } from "next";
import Link from "next/link";
import RequestForm from "../registar/RequestForm";
import { recoverAction } from "./actions";

export const metadata: Metadata = { title: "Repor password — Portal do Formando" };

export default function RecuperarPasswordPage() {
    return (
        <>
            <h1 className="text-xl font-bold text-cplp-navy mb-6 text-center">Repor password</h1>
            <RequestForm action={recoverAction} label="Enviar link" pendingLabel="A enviar..." />
            <p className="text-sm text-cplp-grey text-center mt-6">
                <Link href="/portal/login" className="text-cplp-blue">Voltar ao login</Link>
            </p>
        </>
    );
}
