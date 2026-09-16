import { z } from "zod";
import { optionalDate, optionalPositiveInt, optionalText } from "./fields";

export const sessionSchema = z.object({
    courseId: z.string().trim().min(1, "Escolhe o curso."),
    code: z.string().trim().min(1, "Código da turma obrigatório."),
    instructorName: optionalText,
    location: optionalText,
    startDate: optionalDate,
    endDate: optionalDate,
    seats: optionalPositiveInt,
    status: z.enum(["planeada", "a_decorrer", "concluida"], { message: "Estado inválido." }),
});

export type SessionInput = z.infer<typeof sessionSchema>;
