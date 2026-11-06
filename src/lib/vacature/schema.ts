// TODO: importeer z uit 'zod'

// TODO: maak hier vacatureSchema met z.object(): functietitel, bedrijf (nullable), niveau (enum), salarisMin (int, nullable), vaardigheden (array) en remote (boolean)

// TODO: vervang dit tijdelijke type door: export type Vacature = z.infer<typeof vacatureSchema>;
export type Vacature = {
    functietitel: string;
    bedrijf: string | null;
    niveau: 'junior' | 'medior' | 'senior' | 'onbekend';
    salarisMin: number | null;
    vaardigheden: string[];
    remote: boolean;
};
