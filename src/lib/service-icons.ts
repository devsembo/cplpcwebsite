import {
    Landmark,
    Layers,
    Smartphone,
    Cloud,
    Compass,
    Code2,
    Database,
    Shield,
    Cpu,
    LineChart,
    Users,
    GraduationCap,
    Rocket,
    Briefcase,
    Globe,
    Wrench,
    type LucideIcon,
} from "lucide-react";

// Conjunto fechado de ícones disponíveis para as áreas de serviço. A base de
// dados guarda apenas o nome (ex: "Landmark") — nunca o componente — para que
// o admin possa escolher de uma lista sem escrever código.
export const SERVICE_ICONS: Record<string, LucideIcon> = {
    Layers,
    Landmark,
    Smartphone,
    Cloud,
    Compass,
    Code2,
    Database,
    Shield,
    Cpu,
    LineChart,
    Users,
    GraduationCap,
    Rocket,
    Briefcase,
    Globe,
    Wrench,
};

export const SERVICE_ICON_NAMES = Object.keys(SERVICE_ICONS);

export function getServiceIcon(name: string | null | undefined): LucideIcon {
    return (name && SERVICE_ICONS[name]) || Layers;
}
