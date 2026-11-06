import {Suspense} from "react";
import {connection} from "next/server";
import Chat from "@/app/components/Chat";
import {getLatestChat} from "@/lib/chat/cruds";

export default function ChatPage() {
  return (
    <Suspense fallback={<p className="p-4 text-gray-400">Chat laden...</p>}>
      <LatestChat />
    </Suspense>
  );
}

async function LatestChat() {
  await connection();
  const chat = await getLatestChat();

  return (
    <Chat
        id={chat?.id ?? crypto.randomUUID()}
        initialMessages={chat?.messages}
    />
  );
}
