import type { TranslationKeys } from "@/contexts/LanguageContext";

/**
 * Valores editáveis do site. Atualizar aqui — nunca hardcoded nos componentes.
 */

// Métricas mostradas no Hero da homepage. `labelKey` refere-se a uma chave
// de tradução definida em LanguageContext.tsx.
export const SITE_STATS: { number: string; labelKey: TranslationKeys }[] = [
  { number: "3", labelKey: "hero.stats.countries" },
  { number: "10+", labelKey: "hero.stats.projectsDelivered" },
  { number: "2", labelKey: "hero.stats.businessUnits" },
  { number: "Porto", labelKey: "hero.stats.headquarters" },
];

// NIF ainda por atribuir/confirmar. TODO: substituir por o NIF real.
export const NIF_PLACEHOLDER = "518 600 203";

// Dados legais da empresa, usados no rodapé.
export const COMPANY_INFO = {
  legalName: "CPLP CONNECT",
  nif: NIF_PLACEHOLDER,
  address: "Porto, Portugal",
  email: "info@cplpconnect.pt",
};
