import type { Metadata } from "next";
import Link from "next/link";
import RequestForm from "./RequestForm";
import { registerAction } from "./actions";

export const metadata: Metadata = { title: "Ativar acesso — Portal do Formando" };

export default function RegistarPage() {
    return (
        <>
            <h1 className="text-xl font-bold text-cplp-navy mb-6 text-center">Ativar o teu acesso</h1>
            <RequestForm action={registerAction} label="Enviar link de ativação" pendingLabel="A enviar..." />
            <p className="text-sm text-cplp-grey text-center mt-6">
                Já tens conta? <Link href="/portal/login" className="text-cplp-blue">Entrar</Link>
            </p>
        </>
    );
}
