export interface Project {
  title: string;
  description: string;
  tags: string[];
  category: string;
  accentFrom: string;
  accentTo: string;
  comingSoon?: boolean;
}

// Casos reais. Editar aqui — nunca hardcoded no componente Projects.
// TODO: adicionar screenshots reais dos produtos (ver ProjectPlaceholder em Projects.tsx).
export const PROJECTS: Project[] = [
  {
    title: "TROKA",
    description:
      "Plataforma fintech de remessas entre Portugal e Angola, com transferências rápidas, seguras e rastreáveis.",
    tags: ["React Native", "Node.js", "Fintech"],
    category: "Fintech",
    accentFrom: "#0554F5",
    accentTo: "#05C480",
  },
  {
    title: "CRM Bemvistos",
    description:
      "CRM à medida para uma sociedade de advogados, com gestão de processos, clientes e equipas num único sistema.",
    tags: ["Next.js", "CRM", "Legal Tech"],
    category: "Legal Tech",
    accentFrom: "#05C480",
    accentTo: "#0554F5",
  },
  {
    title: "Em breve",
    description: "Um novo projeto está em desenvolvimento — brevemente aqui.",
    tags: [],
    category: "Em breve",
    accentFrom: "#5A6478",
    accentTo: "#5A6478",
    comingSoon: true,
  },
];
