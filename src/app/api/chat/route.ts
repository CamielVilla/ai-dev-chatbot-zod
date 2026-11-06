import { openai } from '@ai-sdk/openai';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  generateId,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai';
import {saveChat} from "@/lib/chat/cruds";

export async function POST(request: Request) {
  const CONTEXT = 'Je bent een docent die alleen antwoorden mag geven over webdevelopment. Zeg geen dingen voor maar stuur gebruikers alleen in de goede richting. Antwoord in het nederlands in maximaal 5 zinnen'
  const TEMPERATURE = 0.7
  const MAX_OUTPUT_TOKENS = 500

  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: 'OPENAI_API_KEY ontbreekt. Zet deze in .env.local.' },
      { status: 500 },
    );
  }

  try {
    const { id, messages }: {id: string, messages: UIMessage[] } = await request.json();

    const recentMessages = messages.slice(-10);

    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages: await convertToModelMessages(recentMessages),
      instructions: CONTEXT,
      temperature: TEMPERATURE,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      onEnd: ({usage}) => {
        console.log("Input: ", usage.inputTokens)
        console.log("Output: ", usage.outputTokens)
      }
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        stream: result.stream,
        originalMessages: messages,
        generateMessageId: generateId,
        onError: (error) => {
          console.error('Fout bij OpenAI:', error);
          return 'Er ging iets mis bij het ophalen van een antwoord.';
        },
        onEnd: async ( { messages } ) => {
          try {
            await saveChat(id, messages)
          } catch (error) {
            console.error('Fout bij opslaan van chat:', error);
          }
        }
      }),
    });
  } catch (error) {
    console.error('Fout in /api/chat:', error);
    return Response.json({ error: 'Er ging iets mis.' }, { status: 500 });
  }
}
