"use client";

import Link from "next/link";
import { Repeat } from "lucide-react";
import type { Post } from "@/types/post";

export function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-3 gap-0.5 bg-white">
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`} className="relative block">
          <img
            src={post.image}
            alt={post.caption || "Publicação"}
            className="aspect-[2/3] w-full object-cover"
          />
          {post.reposted && (
            <span className="absolute right-1 top-1 rounded-full bg-black/30 p-1 text-white">
              <Repeat size={14} />
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
