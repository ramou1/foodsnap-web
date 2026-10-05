"use client";

import Link from "next/link";
import { Repeat } from "lucide-react";
import type { Post } from "@/types/post";

export function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-3 gap-0.5 bg-white md:grid-cols-4 md:gap-3 md:p-4 lg:grid-cols-5">
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`} className="relative block overflow-hidden md:rounded-xl">
          <img
            src={post.image}
            alt={post.caption || "Publicação"}
            className="aspect-[2/3] w-full object-cover md:aspect-square"
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
