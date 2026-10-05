"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Search, X } from "lucide-react";
import { LOCATIONS } from "@/data/locations";
import { RESTAURANTS } from "@/data/restaurants";
import { SEARCH_USERS } from "@/data/users";
import { DEFAULT_AVATAR } from "@/data/constants";
import type { Location } from "@/types/location";
import type { Restaurant } from "@/types/restaurant";
import type { User } from "@/types/user";

const HISTORY_KEY = "foodsnap_search_history";

type SearchItem =
  | Location
  | (Restaurant & { type: "restaurant" })
  | (User & { type: "user" });

interface HistoryItem {
  id: string;
  name: string;
  image: string;
  type: "restaurant" | "user";
}

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState<"locations" | "restaurants" | "users">(
    "locations"
  );
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (!open) return;
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  }, [open]);

  const results = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) {
      return { locations: [], restaurants: [], users: [] };
    }

    return {
      locations: LOCATIONS.filter((location) =>
        location.name.toLowerCase().includes(query)
      ),
      restaurants: RESTAURANTS.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(query)
      ).map((restaurant) => ({ ...restaurant, type: "restaurant" as const })),
      users: SEARCH_USERS.filter(
        (user) =>
          user.username.toLowerCase().includes(query) ||
          user.name?.toLowerCase().includes(query)
      ).map((user) => ({ ...user, type: "user" as const })),
    };
  }, [searchText]);

  if (!open) return null;

  function persistHistory(items: HistoryItem[]) {
    setHistory(items);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
  }

  function remember(item: SearchItem) {
    if (item.type === "location" || !item.id) return;

    const entry: HistoryItem = {
      id: item.id,
      name: item.username,
      image:
        "avatar" in item && item.avatar
          ? item.avatar
          : DEFAULT_AVATAR,
      type: item.type,
    };

    persistHistory(
      [entry, ...history.filter((saved) => !(saved.id === entry.id && saved.type === entry.type))].slice(
        0,
        5
      )
    );
  }

  function openItem(item: SearchItem | HistoryItem) {
    if (item.type === "location") return;

    if ("region" in item) return;

    if (item.type === "user" || item.type === "restaurant") {
      if ("bio" in item || "postsList" in item) {
        remember(item as SearchItem);
      }
    }

    onClose();
    if (item.type === "user") router.push(`/users/${item.id}`);
    if (item.type === "restaurant") router.push(`/restaurants/${item.id}`);
  }

  const list = searchText.trim() ? results[activeTab] : [];

  return (
    <div className="fixed inset-0 z-40 flex justify-center bg-black/40 md:items-center md:p-8">
      <div className="flex h-full w-full flex-col bg-white md:h-[min(720px,90vh)] md:max-w-2xl md:overflow-hidden md:rounded-2xl md:shadow-xl">
        <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
          <button type="button" onClick={onClose} aria-label="Fechar busca">
            <ArrowLeft size={24} />
          </button>
          <div className="flex flex-1 items-center rounded-md bg-gray-100 px-3 py-2">
            <Search size={18} className="text-gray-500" />
            <input
              autoFocus
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search"
              className="ml-2 w-full bg-transparent text-sm outline-none"
            />
            {searchText && (
              <button type="button" onClick={() => setSearchText("")} aria-label="Limpar">
                <X size={18} className="text-gray-500" />
              </button>
            )}
          </div>
        </div>

        <div className="flex border-b border-gray-200 text-sm">
          {(["locations", "restaurants", "users"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 ${
                activeTab === tab ? "border-b-2 border-black font-bold" : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {searchText.trim() ? (
            list.length === 0 ? (
              <p className="p-4 text-center text-gray-500">no results found :(</p>
            ) : (
              list.map((item) =>
                item.type === "location" ? (
                  <div
                    key={item.id}
                    className="flex items-center border-b border-gray-200 px-4 py-3"
                  >
                    <span className="mr-3 rounded-full bg-gray-200 p-2">
                      <MapPin size={16} className="text-gray-600" />
                    </span>
                    <span>
                      <span className="block font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500">{item.region}</span>
                    </span>
                  </div>
                ) : (
                  <button
                    key={`${item.type}-${item.id}`}
                    type="button"
                    onClick={() => openItem(item)}
                    className="flex w-full border-b border-gray-200 px-4 py-3 text-left"
                  >
                    <img
                      src={item.avatar || DEFAULT_AVATAR}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="ml-3 min-w-0 flex-1">
                      <span className="block font-medium">{item.username}</span>
                      <span className="mb-2 block text-sm text-gray-500">
                        {item.type === "restaurant" ? "Restaurant" : "User"}
                      </span>
                      {"postsList" in item && item.postsList && item.postsList.length > 0 && (
                        <span className="flex gap-1 overflow-hidden">
                          {item.postsList.slice(0, 3).map((post) => (
                            <img
                              key={post.id}
                              src={post.image}
                              alt=""
                              className="h-16 w-16 rounded object-cover"
                            />
                          ))}
                        </span>
                      )}
                    </span>
                  </button>
                )
              )
            )
          ) : (
            <>
              <p className="px-4 py-3 text-lg font-bold">recent searches</p>
              {history.length === 0 ? (
                <p className="p-4 text-center text-gray-500">no recent searches :(</p>
              ) : (
                history.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="flex items-center border-b border-gray-200 px-4 py-3"
                  >
                    <button
                      type="button"
                      onClick={() => openItem(item)}
                      className="flex min-w-0 flex-1 items-center text-left"
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <span className="ml-3">
                        <span className="block font-medium">{item.name}</span>
                        <span className="text-sm text-gray-500">
                          {item.type === "restaurant" ? "Restaurant" : "User"}
                        </span>
                      </span>
                    </button>
                    <button
                      type="button"
                      aria-label="Remover"
                      className="p-2 text-gray-500"
                      onClick={() =>
                        persistHistory(history.filter((saved) => saved.id !== item.id))
                      }
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
