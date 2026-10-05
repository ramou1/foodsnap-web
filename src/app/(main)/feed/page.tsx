"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { Heart, LayoutGrid, List, Search, Utensils } from "lucide-react";
import { POSTS } from "@/data/posts";
import type { Post } from "@/types/post";
import { SearchModal } from "@/components/SearchModal";

function cardHeight(id: string, columns: number) {
  const seed = Number.parseInt(id, 10) || 1;
  const base = 150 + ((seed * 37) % 130);
  return columns === 1 ? base * 1.5 : base;
}

export default function FeedPage() {
  const [columns, setColumns] = useState(3);
  const [activeTab, setActiveTab] = useState<"for-you" | "following">("for-you");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function columnsForWidth(width: number) {
      if (width >= 1280) return 5;
      if (width >= 768) return 4;
      return 3;
    }

    let breakpoint = columnsForWidth(window.innerWidth);
    setColumns(breakpoint);

    function onResize() {
      const next = columnsForWidth(window.innerWidth);
      if (next === breakpoint) return;
      breakpoint = next;
      setColumns(next);
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const distributed = useMemo(() => {
    const visible =
      activeTab === "following" ? POSTS.filter((post) => post.reposted) : POSTS;
    const buckets: Post[][] = Array.from({ length: columns }, () => []);
    visible.forEach((post, index) => {
      buckets[index % columns].push(post);
    });
    return buckets;
  }, [activeTab, columns]);

  function cycleColumns() {
    const options = window.innerWidth >= 768 ? [2, 3, 4, 5] : [1, 2, 3];
    setColumns((current) => {
      const index = options.indexOf(current);
      return options[(index + 1) % options.length];
    });
  }

  return (
    <div className="bg-white md:rounded-2xl md:shadow-sm">
      <div className="px-4 pb-2 pt-3">
        <div className="mb-2 flex items-center justify-between">
          <button
            type="button"
            onClick={cycleColumns}
            aria-label="Alterar colunas"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300"
          >
            {columns === 1 ? (
              <List size={18} />
            ) : columns === 2 ? (
              <LayoutGrid size={18} />
            ) : (
              <LayoutGrid size={18} className="scale-90" />
            )}
          </button>

          <div className="flex flex-1 justify-center gap-2">
            <TabButton
              active={activeTab === "for-you"}
              onClick={() => setActiveTab("for-you")}
              icon={<Utensils size={16} />}
              label="for you"
            />
            <TabButton
              active={activeTab === "following"}
              onClick={() => setActiveTab("following")}
              icon={<Heart size={16} />}
              label="following"
            />
          </div>

          <button type="button" onClick={() => setSearchOpen(true)} aria-label="Buscar">
            <Search size={24} />
          </button>
        </div>
      </div>

      <div className="flex px-1 pb-4">
        {distributed.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-1 flex-col gap-1 px-0.5">
            {column.map((post) => (
              <Link key={post.id} href={`/posts/${post.id}`} className="block overflow-hidden rounded-lg">
                <img
                  src={post.image}
                  alt={post.caption || "Publicação"}
                  style={{ height: cardHeight(post.id, columns) }}
                  className="w-full object-cover"
                />
              </Link>
            ))}
          </div>
        ))}
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm ${
        active ? "bg-black text-white" : "bg-gray-200 text-gray-800"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
