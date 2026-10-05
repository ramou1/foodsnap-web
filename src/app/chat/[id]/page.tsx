"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Phone, PlusCircle, Send } from "lucide-react";
import { CHAT_CONVERSATIONS } from "@/data/chat";
import type { ChatMessage } from "@/types/chat";
import { PageFrame } from "@/components/PageFrame";

export default function ChatDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const conversation = CHAT_CONVERSATIONS.find((item) => item.id === params.id);
  const [messages, setMessages] = useState<ChatMessage[]>(conversation?.messages ?? []);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  if (!conversation) {
    return (
      <PageFrame className="flex flex-col items-center justify-center bg-gray-100">
        <p className="mb-4 text-lg">Conversa não encontrada</p>
        <button type="button" onClick={() => router.back()} className="rounded-md bg-black px-6 py-2 text-white">
          Voltar
        </button>
      </PageFrame>
    );
  }

  function sendMessage(event: FormEvent) {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;

    setMessages((current) => [
      ...current,
      {
        id: `msg-${Date.now()}`,
        text: value,
        timestamp: new Date().toISOString(),
        isMe: true,
      },
    ]);
    setText("");
  }

  return (
    <PageFrame className="flex h-dvh flex-col bg-gray-100 md:h-[calc(100vh-4rem)]">
      <div className="flex items-center border-b border-gray-200 bg-white px-4 py-3">
        <button type="button" onClick={() => router.back()} className="mr-4" aria-label="Voltar">
          <ArrowLeft size={24} />
        </button>
        <img src={conversation.avatar} alt="" className="mr-3 h-9 w-9 rounded-full object-cover" />
        <div className="flex-1">
          <p className="text-base font-semibold">{conversation.name}</p>
          <p className="text-xs text-gray-500">{conversation.username}</p>
        </div>
        <Phone size={24} />
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
            <p
              className={`max-w-[75%] rounded-2xl px-4 py-2 text-base ${
                message.isMe
                  ? "rounded-tr-sm bg-violet-500 text-white"
                  : "rounded-tl-sm bg-gray-200 text-gray-900"
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={sendMessage} className="flex items-center border-t border-gray-200 bg-white px-4 py-3">
        <PlusCircle size={28} className="mr-3 text-gray-500" />
        <div className="flex flex-1 items-center rounded-full bg-gray-100 px-4 py-2">
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Mensagem..."
            maxLength={500}
            className="flex-1 bg-transparent text-base outline-none"
          />
          {text.length > 0 && (
            <button type="submit" aria-label="Enviar" className="ml-2 text-violet-600">
              <Send size={24} />
            </button>
          )}
        </div>
      </form>
    </PageFrame>
  );
}
