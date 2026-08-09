import type { Metadata } from "next";
import FaqsContent from "./FaqsContent";

export const metadata: Metadata = {
    title: "Perguntas Frequentes — CPLP CONNECT",
    description:
        "Respostas às perguntas mais comuns sobre os serviços e o processo de trabalho da CPLP CONNECT.",
};

export default function FaqsPage() {
    return <FaqsContent />;
}
