import { z } from "zod";

export const blogPostSchema = z.object({
    title: z.string().trim().min(1, "Título obrigatório."),
    excerpt: z.string().trim().min(1, "Resumo obrigatório."),
    // O refine garante que sobra texto visível depois de remover tags HTML —
    // um "<p></p>" vazio passa no .min(1) mas não deve ser aceite como artigo.
    content: z
        .string()
        .trim()
        .min(1, "Conteúdo obrigatório.")
        .refine((value) => value.replace(/<[^>]*>/g, "").trim().length > 0, {
            message: "Conteúdo obrigatório — o editor está vazio.",
        }),
    contentFormat: z.enum(["markdown", "html"]).default("html"),
    authorName: z.string().trim().optional(),
    category: z.string().trim().optional(),
    tags: z
        .string()
        .optional()
        .transform((value) =>
            (value ?? "")
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
        ),
    published: z.boolean(),
    // Data/hora de agendamento (opcional) — vazio publica imediatamente.
    scheduledAt: z
        .string()
        .trim()
        .optional()
        .transform((value) => (value ? new Date(value) : undefined)),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
