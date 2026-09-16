import { z } from "zod";
import { linesField, optionalText, optionalUrl } from "./fields";

export const serviceSchema = z.object({
    title: z.string().trim().min(1, "Título obrigatório."),
    description: z.string().trim().min(1, "Descrição obrigatória."),
    icon: z.string().trim().min(1, "Ícone obrigatório."),
    details: linesField,
    titleEn: optionalText,
    descriptionEn: optionalText,
    detailsEn: linesField,
    metaTitle: optionalText,
    metaDescription: optionalText,
    published: z.boolean(),
    order: z.coerce.number().int().min(0),
});

export type ServiceInput = z.infer<typeof serviceSchema>;

export const faqSchema = z.object({
    question: z.string().trim().min(1, "Pergunta obrigatória."),
    answer: z.string().trim().min(1, "Resposta obrigatória."),
    questionEn: optionalText,
    answerEn: optionalText,
    category: optionalText,
    published: z.boolean(),
    order: z.coerce.number().int().min(0),
});

export type FaqInput = z.infer<typeof faqSchema>;

export const partnerSchema = z.object({
    name: z.string().trim().min(1, "Nome obrigatório."),
    websiteUrl: optionalUrl,
    published: z.boolean(),
    order: z.coerce.number().int().min(0),
});

export type PartnerInput = z.infer<typeof partnerSchema>;

export const testimonialSchema = z.object({
    authorName: z.string().trim().min(1, "Nome obrigatório."),
    role: optionalText,
    company: optionalText,
    quote: z.string().trim().min(1, "Depoimento obrigatório."),
    quoteEn: optionalText,
    published: z.boolean(),
    order: z.coerce.number().int().min(0),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
