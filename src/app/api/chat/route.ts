import { openai } from '@ai-sdk/openai';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai';

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: 'OPENAI_API_KEY ontbreekt. Zet deze in .env.local.' },
      { status: 500 },
    );
  }

  try {
    const { messages }: { messages: UIMessage[] } = await request.json();
    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages: await convertToModelMessages(messages),
      temperature: 0.7,
      maxOutputTokens: 500,
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        stream: result.stream,
        onError: (error) => {
          console.error('Fout bij OpenAI:', error);
          return 'Er ging iets mis bij het ophalen van een antwoord.';
        },
      }),
    });
  } catch (error) {
    console.error('Fout in /api/chat:', error);
    return Response.json({ error: 'Er ging iets mis.' }, { status: 500 });
  }
}
