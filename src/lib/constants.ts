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
  { number: "100%", labelKey: "hero.stats.lusophone" },
];
