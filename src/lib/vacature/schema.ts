import { z } from 'zod'
export const vacatureSchema = z.object({
    functietitel: z.string(),
    bedrijf: z.string().nullable(),
    niveau: z.enum(['junior', 'medior', 'senior', 'onbekend']),
    salarisMin: z.number().int().nullable(),
    vaardigheden: z.array(z.string()),
    remote: z.boolean(),
});

export type Vacature = z.infer<typeof  vacatureSchema>;
