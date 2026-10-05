"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, House, MessageCircle, Plus, User } from "lucide-react";

const tabs = [
  { href: "/feed", label: "feed", icon: House },
  { href: "/trend", label: "trends", icon: Flame },
  { href: "/posts/create", label: "", icon: Plus, create: true },
  { href: "/chat", label: "chat", icon: MessageCircle },
  { href: "/profile", label: "profile", icon: User },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col bg-white shadow-sm">
        <main className="flex-1 pb-16">{children}</main>
        <nav className="fixed bottom-0 left-1/2 z-30 flex h-16 w-full max-w-md -translate-x-1/2 items-end border-t border-gray-200 bg-white">
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
                    <Icon size={30} />
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
    </div>
  );
}
