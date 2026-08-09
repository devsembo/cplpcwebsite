import { Layers, Smartphone, Cloud, Compass, type LucideIcon } from "lucide-react";
import type { TranslationKeys } from "@/contexts/LanguageContext";

export interface ServiceArea {
  icon: LucideIcon;
  titleKey: TranslationKeys;
  descriptionKey: TranslationKeys;
  // Usado apenas na página /servicos (mais detalhe do que a homepage).
  details: string[];
}

// Fonte única das 4 áreas de atuação — usada na homepage (Services.tsx)
// e na página /servicos, para nunca haver dados divergentes entre as duas.
export const SERVICE_AREAS: ServiceArea[] = [
  {
    icon: Layers,
    titleKey: "services.items.web.title",
    descriptionKey: "services.items.web.description",
    details: [
      "Plataformas web e portais institucionais",
      "Sistemas internos de gestão e workflow",
      "Integrações com sistemas já existentes na empresa",
    ],
  },
  {
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
