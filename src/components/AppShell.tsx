"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, House, MessageCircle, Plus, User } from "lucide-react";

const tabs = [
  { href: "/feed", label: "feed", icon: House },
  { href: "/trend", label: "trends", icon: Flame },
  { href: "/posts/create", label: "publicar", icon: Plus, create: true },
  { href: "/chat", label: "chat", icon: MessageCircle },
  { href: "/profile", label: "profile", icon: User },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-gray-200 bg-white px-4 py-6 md:flex">
        <Link href="/feed" className="px-3 text-2xl font-bold text-[#6e11b0]">
          FoodSnap
        </Link>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          <Link
            href="/posts/create"
            className="mb-3 flex items-center justify-center gap-2 rounded-full bg-[#6e11b0] px-4 py-3 font-semibold text-white"
          >
            <Plus size={20} />
            Nova publicação
          </Link>
          {tabs.filter((tab) => !tab.create).map((tab) => {
            const Icon = tab.icon;
            const active = pathname === tab.href;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-base ${
                  active ? "bg-violet-50 font-semibold text-[#6e11b0]" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={22} />
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="md:pl-60">
        <main className="mx-auto w-full max-w-6xl pb-20 md:px-6 md:pb-10 md:pt-6">{children}</main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-end border-t border-gray-200 bg-white md:hidden">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = pathname === tab.href;

          if (tab.create) {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-label="Nova publicação"
                className="flex flex-1 items-center justify-center"
              >
                <span className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#6e11b0] text-white shadow-md">
                  <Plus size={30} />
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 pb-2 text-[11px] ${
                active ? "text-[#6e11b0]" : "text-[#9c96ad]"
              }`}
            >
              <Icon size={22} />
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
