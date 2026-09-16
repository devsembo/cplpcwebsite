import { z } from "zod";
import {
    commaField,
    linesField,
    optionalDate,
    optionalPositiveInt,
    optionalText,
    optionalUrl,
    richText,
} from "./fields";

export const courseSchema = z.object({
    title: z.string().trim().min(1, "Título obrigatório."),
    summary: z.string().trim().min(1, "Resumo obrigatório."),
    description: richText,
    format: z.enum(["in_company", "executive", "online", "exchange"], {
        message: "Formato inválido.",
    }),
    area: z.string().trim().min(1, "Área obrigatória."),
    level: optionalText,
    durationLabel: optionalText,
    scheduleLabel: optionalText,
    priceLabel: optionalText,
    location: optionalText,
    language: optionalText,
    startDate: optionalDate,
    seats: optionalPositiveInt,
    highlights: linesField,
    requirements: linesField,
    targetAudience: optionalText,
    registrationUrl: optionalUrl,
    tags: commaField,
    published: z.boolean(),
    featured: z.boolean(),
    order: z.coerce.number().int().min(0),
});

export type CourseInput = z.infer<typeof courseSchema>;

// Formulário público de inscrição.
export const enrollmentSchema = z.object({
    courseId: z.string().trim().min(1, "Curso inválido."),
    name: z.string().trim().min(2, "Indique o seu nome."),
    email: z.email("Email inválido."),
    phone: optionalText,
    company: optionalText,
    role: optionalText,
    message: optionalText,
    consent: z.literal(true, { message: "Tem de aceitar a Política de Privacidade." }),
});

export type EnrollmentInput = z.infer<typeof enrollmentSchema>;
