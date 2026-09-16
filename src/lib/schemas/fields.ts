import { z } from "zod";

// Campos de texto opcionais são normalizados para `null` (e não `undefined`)
// para que gravar um campo vazio no admin limpe mesmo o valor na base de dados
// — com `undefined` o Prisma ignoraria o campo no update.
//
// O `.nullish()` na entrada é essencial: `formData.get()` devolve `null` para
// campos que o formulário não renderiza (ex: a área de interesse só aparece na
// candidatura espontânea), e `null` não passava num `.string().optional()`.
export const optionalText = z
    .string()
    .nullish()
    .transform((value) => {
        const trimmed = (value ?? "").trim();
        return trimmed.length > 0 ? trimmed : null;
    });

export const optionalUrl = optionalText.refine(
    (value) => value === null || /^https?:\/\//i.test(value),
    { message: "O link tem de começar por http:// ou https://" },
);

// Lista escrita numa textarea, um item por linha.
export const linesField = z
    .string()
    .nullish()
    .transform((value) =>
        (value ?? "")
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean),
    );

// Lista escrita num input, separada por vírgulas.
export const commaField = z
    .string()
    .nullish()
    .transform((value) =>
        (value ?? "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
    );

export const optionalDate = z
    .string()
    .nullish()
    .transform((value) => {
        const trimmed = (value ?? "").trim();
        if (!trimmed) return null;
        const date = new Date(trimmed);
        return Number.isNaN(date.getTime()) ? null : date;
    });

export const optionalPositiveInt = z
    .string()
    .nullish()
    .transform((value) => {
        const trimmed = (value ?? "").trim();
        if (!trimmed) return null;
        const parsed = Number(trimmed);
        return Number.isFinite(parsed) && parsed >= 0 ? Math.trunc(parsed) : null;
    });

// Conteúdo do editor visual: "<p></p>" passa no .min(1) mas não é conteúdo.
export const richText = z
    .string()
    .trim()
    .min(1, "Conteúdo obrigatório.")
    .refine((value) => value.replace(/<[^>]*>/g, "").trim().length > 0, {
        message: "Conteúdo obrigatório — o editor está vazio.",
    });
