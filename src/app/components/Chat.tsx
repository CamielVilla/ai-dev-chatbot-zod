'use client'

import {useChat} from "@ai-sdk/react";
import type {UIMessage} from "ai";
import {useState} from "react";
import {extractVacature} from "@/lib/vacature/actions";
import type {Vacature} from "@/lib/vacature/schema";
import VacatureKaart from "@/app/components/VacatureKaart";

type ChatProps = {
    id: string;
    initialMessages?: UIMessage[];
};

export default function Chat ({ id, initialMessages }: ChatProps) {
    const { messages, sendMessage, status, error, stop, regenerate } = useChat({ id, messages: initialMessages});
    const isLoading = status === 'submitted' || status === 'streaming';
    const [input, setInput] = useState('');

    const [vacature, setVacature] = useState<Vacature | null>(null);
    const [vacatureFout, setVacatureFout] = useState<string | null>(null);
    const [isAnalyseren, setIsAnalyseren] = useState(false);

    async function analyseerVacature() {
        if (!input.trim()) return;

        setIsAnalyseren(true);
        setVacature(null);
        setVacatureFout(null);

        try {
            const resultaat = await extractVacature(input);

            if (resultaat.vacature) {
                setVacature(resultaat.vacature);
                setInput('');
            } else {
                setVacatureFout(resultaat.error ?? 'Er ging iets mis bij het analyseren van de vacature.');
            }
        } catch {
            setVacatureFout('Er ging iets mis bij het analyseren van de vacature.');
        } finally {
            setIsAnalyseren(false);
        }
    }

    return (
        <main className="mx-auto flex h-screen w-full max-w-2xl flex-col p-4">
            <h1 className="mb-4 text-2xl font-bold">Les 9 Chatbot</h1>

            <div className="flex-1 space-y-3 overflow-y-auto rounded-lg border border-gray-200 bg-white p-4">
                {messages.length === 0 && (
                    <p className="text-gray-400">Stel een vraag om te beginnen.</p>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
                    >
                        <div
                            className={
                                message.role === 'user'
                                    ? 'max-w-[80%] whitespace-pre-wrap rounded-lg bg-blue-600 px-4 py-2 text-white'
                                    : 'max-w-[80%] whitespace-pre-wrap rounded-lg bg-gray-100 px-4 py-2 text-gray-900'
                            }
                        >
                            {message.parts.map((part, index) =>
                                part.type === 'text' ? <span key={index}>{part.text}</span> : null,
                            )}
                        </div>
                    </div>
                ))}

                {status === 'submitted' && (
                    <p className="animate-pulse text-gray-500">Aan het nadenken...</p>
                )}

                {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
                        <p>Er ging iets mis bij het ophalen van een antwoord.</p>
                        <button
                            type="button"
                            onClick={() => regenerate()}
                            className="mt-2 text-sm font-semibold underline"
                        >
                            Opnieuw proberen
                        </button>
                    </div>
                )}
            </div>

            {isAnalyseren && (
                <p className="mt-4 animate-pulse text-gray-500">Vacature analyseren...</p>
            )}

            {vacatureFout && (
                <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">{vacatureFout}</p>
            )}

            {vacature && (
                <div className="mt-4">
                    <VacatureKaart vacature={vacature} onSluiten={() => setVacature(null)} />
                </div>
            )}

            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    if (!input.trim()) return;
                    sendMessage({ text: input });
                    setInput('');
                }}
                className="mt-4 flex gap-2"
            >
                <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Typ je bericht..."
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
                />

                {isLoading ? (
                    <button
                        type="button"
                        onClick={() => stop()}
                        className="rounded-lg bg-gray-700 px-4 py-2 font-semibold text-white hover:bg-gray-800"
                    >
                        Stop
                    </button>
                ) : (
                    <>
                        <button
                            type="submit"
                            disabled={!input.trim() || isAnalyseren}
                            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            Verstuur
                        </button>
                        <button
                            type="button"
                            onClick={analyseerVacature}
                            disabled={!input.trim() || isAnalyseren}
                            className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50 disabled:opacity-50"
                        >
                            Analyseer als vacature
                        </button>
                    </>
                )}
            </form>
        </main>
    );
}