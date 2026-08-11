import type { Metadata } from "next";
import { getPageHero } from "@/lib/data/page-hero";
import ContactoContent from "./ContactoContent";

export const metadata: Metadata = {
    title: "Contacto",
    description:
        "Fale com a CPLP CONNECT. Estamos sediados no Porto e trabalhamos com empresas e instituições de Portugal, Angola e restante espaço CPLP.",
    alternates: { canonical: "/contacto" },
};

export default async function ContactoPage() {
    const heroImageUrl = await getPageHero("contacto");
    return <ContactoContent heroImageUrl={heroImageUrl} />;
}
