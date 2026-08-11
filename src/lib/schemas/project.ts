import { z } from "zod";

const hexColor = z.string().regex(/^#([0-9a-fA-F]{6})$/, "Cor inválida (usa formato #RRGGBB).");

export const projectSchema = z.object({
    title: z.string().trim().min(1, "Título obrigatório."),
    description: z.string().trim().min(1, "Descrição obrigatória."),
    category: z.string().trim().min(1, "Categoria obrigatória."),
    tags: z
        .string()
        .transform((value) =>
            value
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
        ),
    accentFrom: hexColor,
    accentTo: hexColor,
    comingSoon: z.boolean(),
    order: z.coerce.number().int().min(0),
});

export type ProjectInput = z.infer<typeof projectSchema>;
