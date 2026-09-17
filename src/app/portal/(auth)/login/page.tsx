import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Entrar — Portal do Formando" };

export default function PortalLoginPage() {
    return (
        <>
            <h1 className="text-xl font-bold text-cplp-navy mb-6 text-center">Portal do Formando</h1>
            <LoginForm />
            <div className="flex justify-between text-sm text-cplp-grey mt-6">
                <Link href="/portal/registar" className="text-cplp-blue">Ativar acesso</Link>
                <Link href="/portal/recuperar-password" className="text-cplp-blue">Esqueci-me da password</Link>
            </div>
        </>
    );
}
