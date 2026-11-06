'use server'

import { openai } from '@ai-sdk/openai';
import { generateText, NoObjectGeneratedError, Output } from 'ai';
import { vacatureSchema, type Vacature } from '@/lib/vacature/schema';

export type VacatureResultaat = {
  vacature?: Vacature;
  error?: string;
};

const MAX_LENGTE = 5000;

export async function extractVacature(tekst: string): Promise<VacatureResultaat> {
  const schoneTekst = tekst.trim();

  if (!schoneTekst) {
    return { error: 'Plak eerst een vacaturetekst.' };
  }

  if (schoneTekst.length > MAX_LENGTE) {
    return { error: `De tekst is te lang (maximaal ${MAX_LENGTE} tekens).` };
  }

  try {
    const { output } = await generateText({
      model: openai('gpt-4o-mini'),
      instructions: 'Haal de gegevens uit de vacaturetekst. Gebruik alleen informatie die in de tekst staat.',
      prompt: schoneTekst,
      temperature: 0,
      output: Output.object({ schema: vacatureSchema }),
    });

    return { vacature: output };
  } catch (error) {
    if (NoObjectGeneratedError.isInstance(error)) {
      console.error('Geen geldig vacature-object:', error.text);
      return { error: 'Het model gaf geen bruikbaar resultaat. Probeer het opnieuw.' };
    }

    console.error('Fout bij analyseren van vacature:', error);
    return { error: 'Er ging iets mis bij het analyseren van de vacature.' };
  }
}
