import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Les 9 Chatbot',
  description: 'Eenvoudige AI-chatinterface met Next.js, de Vercel AI SDK en OpenAI',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="nl">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
