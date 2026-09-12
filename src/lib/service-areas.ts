import { Landmark, Layers, Smartphone, Cloud, Compass, type LucideIcon } from "lucide-react";
import type { TranslationKeys } from "@/contexts/LanguageContext";

export interface ServiceArea {
  slug: string;
  icon: LucideIcon;
  titleKey: TranslationKeys;
  descriptionKey: TranslationKeys;
  // Usado apenas na página /servicos (mais detalhe do que a homepage).
  details: string[];
}

// Fonte única das áreas de atuação — usada na homepage (Services.tsx),
// no dropdown do Navbar e na página /servicos (âncoras por slug), para
// nunca haver dados divergentes entre elas.
//
// Nota: nenhuma área é "a especialidade" — a CPLP CONNECT desenvolve desde
// sites institucionais e apps até soluções financeiras para bancos, por
// isso as 5 áreas são apresentadas em pé de igualdade (sem destaque).
export const SERVICE_AREAS: ServiceArea[] = [
  {
    slug: "web",
    icon: Layers,
    titleKey: "services.items.web.title",
    descriptionKey: "services.items.web.description",
    details: [
      "Sites institucionais e plataformas web",
      "Sistemas internos de gestão e workflow",
      "Integrações com sistemas já existentes na empresa",
    ],
  },
  {
    slug: "mobile",
    icon: Smartphone,
    titleKey: "services.items.mobile.title",
    descriptionKey: "services.items.mobile.description",
    details: [
      "Aplicações nativas para iOS e Android",
      "Apps híbridas para equipas com orçamento mais ajustado",
      "Integração com os sistemas e APIs da empresa",
    ],
  },
  {
    slug: "banking",
    icon: Landmark,
    titleKey: "services.items.banking.title",
    descriptionKey: "services.items.banking.description",
    details: [
      "Core banking e sistemas de gestão financeira",
      "Mobile banking, pagamentos e carteiras digitais",
      "Segurança, compliance e integração com a banca central",
    ],
  },
  {
    slug: "cloud",
    icon: Cloud,
    titleKey: "services.items.cloud.title",
    descriptionKey: "services.items.cloud.description",
    details: [
      "Migração para ambientes cloud seguros",
      "Gestão de servidores e infraestrutura",
      "Planeamento de escalabilidade e continuidade do negócio",
    ],
  },
  {
    slug: "design",
    icon: Compass,
    titleKey: "services.items.design.title",
    descriptionKey: "services.items.design.description",
    details: [
      "Identidade visual e branding institucional",
      "Design de interfaces e experiência de utilizador",
      "Estratégia de comunicação digital",
    ],
  },
];
