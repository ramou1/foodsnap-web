"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  Share2,
} from "lucide-react";
import { getPostById } from "@/data/lookup";
import { DEFAULT_AVATAR } from "@/data/constants";
import { formatTimeAgo } from "@/lib/time";
import { PageFrame } from "@/components/PageFrame";

const sampleComments = [
  {
    author: "@outro_usuário",
    text: "Que delícia! Fiquei com vontade de experimentar.",
    time: "2h atrás",
  },
  {
    author: "@foodlover",
    text: "Onde você comprou os ingredientes? Ficou com uma aparência incrível!",
    time: "5h atrás",
  },
];

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const post = getPostById(params.id);
  const [reposted, setReposted] = useState(post?.reposted ?? false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post?.likes ?? 0);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  if (!post) {
    return (
      <PageFrame className="flex items-center justify-center">
        <p className="text-lg text-gray-600">Post não encontrado</p>
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <div className="relative">
        <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-4 pb-2 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white"
            aria-label="Voltar"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            type="button"
            onClick={() => setReposted((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30"
            aria-label="Repostar"
          >
            <Repeat2 size={22} className={reposted ? "text-amber-400" : "text-white"} />
          </button>
        </div>

        <img
          src={post.image}
          alt={post.caption || "Publicação"}
          className="aspect-[10/16] w-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="mb-3 mt-2 flex items-center">
          <img
            src={post.user?.avatar || DEFAULT_AVATAR}
            alt=""
            className="mr-3 h-9 w-9 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">@{post.user?.username || "usuário"}</p>
            <p className="text-xs text-gray-500">{formatTimeAgo(post.timestamp)}</p>
          </div>
        </div>

        <p className="mb-6 text-base text-gray-700">
          {post.caption || "Uma deliciosa refeição!"}
        </p>

        <div className="flex items-center justify-between border-t border-gray-200 py-3 text-sm text-gray-600">
          <button
            type="button"
            className="flex items-center"
            onClick={() => {
              setLiked((current) => !current);
              setLikes((current) => (liked ? current - 1 : current + 1));
            }}
          >
            <Heart
              size={22}
              className={liked ? "fill-[#FF6B6B] text-[#FF6B6B]" : "text-gray-600"}
            />
            <span className="ml-2">{likes} curtidas</span>
          </button>
          <button
            type="button"
            className="flex items-center"
            onClick={() => setShowComments((current) => !current)}
          >
            <MessageCircle size={20} />
            <span className="ml-2">{post.comments || 0} comentários</span>
          </button>
          <button type="button" className="flex items-center">
            <Share2 size={20} />
            <span className="ml-2">compartilhar</span>
          </button>
        </div>
      </div>

      {showComments && (
        <div className="px-4 pb-6">
          <h2 className="mb-3 text-lg font-medium">Comentários</h2>
          {post.comments && post.comments > 0 ? (
            <div className="space-y-4">
              {sampleComments.map((item) => (
                <div key={item.author} className="flex">
                  <img
                    src={DEFAULT_AVATAR}
                    alt=""
                    className="mr-2 h-9 w-9 rounded-full object-cover"
                  />
                  <div className="flex-1 rounded-lg bg-gray-100 p-2">
                    <p className="font-medium">{item.author}</p>
                    <p>{item.text}</p>
                    <p className="mt-1 text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-gray-100 p-4 text-center text-gray-500">
              <p>Ainda não há comentários neste post</p>
              <p className="mt-1 text-xs">Seja o primeiro a comentar!</p>
            </div>
          )}

          <form
            className="mt-4 flex items-center rounded-full border border-gray-300 py-1 pl-3 pr-1"
            onSubmit={(event) => {
              event.preventDefault();
              setComment("");
            }}
          >
            <input
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Adicione um comentário..."
              className="flex-1 bg-transparent py-1 text-gray-800 outline-none"
            />
            <button
              type="submit"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white"
              aria-label="Enviar comentário"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </PageFrame>
  );
}
