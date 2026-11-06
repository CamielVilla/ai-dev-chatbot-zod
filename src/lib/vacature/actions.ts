'use server';

import type { Vacature } from '@/lib/vacature/schema';

export type VacatureResultaat = {
  vacature?: Vacature;
  error?: string;
};

export async function extractVacature(tekst: string): Promise<VacatureResultaat> {
  // TODO: controleer de input: de tekst mag niet leeg zijn en niet langer dan een maximum

  // TODO: roep generateText() aan met openai('gpt-4o-mini'), een instructie, de tekst als prompt en output: Output.object({ schema: vacatureSchema })

  // TODO: geef { vacature: output } terug

  // TODO: vang NoObjectGeneratedError af en geef een begrijpelijke foutmelding terug

  return { error: `Nog niet geïmplementeerd. De server heeft ${tekst.length} tekens ontvangen.` };
}
