import { z } from "zod";
import { linesField, optionalDate, optionalText, richText } from "./fields";

export const jobOpeningSchema = z.object({
    title: z.string().trim().min(1, "Título obrigatório."),
    department: optionalText,
    location: z.string().trim().min(1, "Localização obrigatória."),
    type: z.enum(["full_time", "part_time", "estagio", "freelance"], {
        message: "Tipo de contrato inválido.",
    }),
    mode: z.enum(["presencial", "hibrido", "remoto"], { message: "Regime inválido." }),
    seniority: optionalText,
    summary: z.string().trim().min(1, "Resumo obrigatório."),
    description: richText,
    responsibilities: linesField,
    requirements: linesField,
    benefits: linesField,
    applyDeadline: optionalDate,
    published: z.boolean(),
    order: z.coerce.number().int().min(0),
});

export type JobOpeningInput = z.infer<typeof jobOpeningSchema>;

// Formulário público de candidatura (a uma vaga ou espontânea).
export const jobApplicationSchema = z.object({
    jobId: optionalText,
    name: z.string().trim().min(2, "Indique o seu nome."),
    email: z.email("Email inválido."),
    phone: optionalText,
    area: optionalText,
    cvUrl: z
        .string()
        .trim()
        .min(1, "Indique um link para o CV, LinkedIn ou portefólio.")
        .refine((value) => /^https?:\/\//i.test(value), {
            message: "O link tem de começar por http:// ou https://",
        }),
    message: optionalText,
    consent: z.literal(true, { message: "Tem de aceitar a Política de Privacidade." }),
});

export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;
