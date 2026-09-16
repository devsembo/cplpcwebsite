import { createElement } from "react";
import { getServiceIcon } from "@/lib/service-icons";

// O ícone de cada serviço é guardado na base de dados pelo nome. Resolvê-lo
// aqui, com createElement, evita atribuir um componente a uma variável durante
// o render (regra react-hooks/static-components).
export default function ServiceIcon({
    name,
    className,
    strokeWidth = 1.5,
}: {
    name: string | null | undefined;
    className?: string;
    strokeWidth?: number;
}) {
    return createElement(getServiceIcon(name), { className, strokeWidth });
}
