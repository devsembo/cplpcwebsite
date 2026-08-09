import type { Metadata } from "next";
import ContactoContent from "./ContactoContent";

export const metadata: Metadata = {
    title: "Contacto — CPLP CONNECT",
    description:
        "Fale com a CPLP CONNECT. Estamos sediados no Porto e trabalhamos com empresas e instituições de Portugal, Angola e restante espaço CPLP.",
};

export default function ContactoPage() {
    return <ContactoContent />;
}
