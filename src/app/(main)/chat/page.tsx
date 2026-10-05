import Link from "next/link";
import { MessageCircle, SquarePen } from "lucide-react";
import { CHAT_CONVERSATIONS } from "@/data/chat";

export default function ChatPage() {
  return (
    <div className="min-h-full bg-gray-100 md:mx-auto md:max-w-3xl md:overflow-hidden md:rounded-2xl md:border md:border-gray-200 md:bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
        <h1 className="text-2xl font-bold">Mensagens</h1>
        <SquarePen size={24} />
      </div>

      {CHAT_CONVERSATIONS.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-gray-500">
          <MessageCircle size={64} />
          <p className="mt-4">Nenhuma conversa ainda</p>
        </div>
      ) : (
        <ul>
          {CHAT_CONVERSATIONS.map((conversation) => (
            <li key={conversation.id} className="border-b border-gray-200 bg-white">
              <Link href={`/chat/${conversation.id}`} className="flex items-center px-4 py-3">
                <span className="relative">
                  <img
                    src={conversation.avatar}
                    alt=""
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  {conversation.unreadCount && conversation.unreadCount > 0 ? (
                    <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-violet-500 px-1.5 py-0.5 text-xs font-bold text-white">
                      {conversation.unreadCount > 9 ? "9+" : conversation.unreadCount}
                    </span>
                  ) : null}
                </span>
                <span className="ml-3 min-w-0 flex-1">
                  <span className="mb-1 flex items-center justify-between">
                    <span className="font-semibold">{conversation.name}</span>
                    <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                  </span>
                  <span className="block truncate text-sm text-gray-600">
                    {conversation.lastMessage}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
