import { z } from "zod";
import { optionalPositiveInt, optionalText } from "./fields";

export const companySchema = z.object({
    name: z.string().trim().min(1, "Nome da empresa obrigatório."),
    sector: optionalText,
    contractLabel: optionalText,
    seatsContracted: optionalPositiveInt,
    accountManager: optionalText,
    notes: optionalText,
});

export type CompanyInput = z.infer<typeof companySchema>;
