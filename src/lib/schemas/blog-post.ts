import { z } from "zod";

export const blogPostSchema = z.object({
    title: z.string().trim().min(1, "Título obrigatório."),
    excerpt: z.string().trim().min(1, "Resumo obrigatório."),
    content: z.string().trim().min(1, "Conteúdo obrigatório."),
    authorName: z.string().trim().optional(),
    published: z.boolean(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
