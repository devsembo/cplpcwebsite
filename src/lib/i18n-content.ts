// Conteúdo vindo da base de dados é escrito em português. Alguns modelos
// (Service, Faq, Testimonial) têm campos *En opcionais — quando estão vazios,
// o site em inglês mostra o texto português em vez de um espaço em branco.

export function pickLocale(language: string, pt: string, en?: string | null): string {
    if (language === "en" && en && en.trim()) return en;
    return pt;
}

export function pickLocaleList(language: string, pt: string[], en?: string[] | null): string[] {
    if (language === "en" && en && en.length > 0) return en;
    return pt;
}
