import type { Metadata } from "next";
import CarreirasContent from "./CarreirasContent";

export const metadata: Metadata = {
    title: "Carreiras — CPLP CONNECT",
    description:
        "Junte-se à equipa CPLP CONNECT. Conheça a nossa cultura, benefícios e envie a sua candidatura espontânea.",
};

export default function CarreirasPage() {
    return <CarreirasContent />;
}
