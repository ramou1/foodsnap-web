"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { FOOD_TRENDS, type FoodTrend } from "@/data/trends";

export default function TrendPage() {
  const [trends, setTrends] = useState<FoodTrend[]>(FOOD_TRENDS);

  function toggleFavorite(id: string) {
    setTrends((current) =>
      current.map((trend) =>
        trend.id === id ? { ...trend, isFavorite: !trend.isFavorite } : trend
      )
    );
  }

  return (
    <div className="bg-white p-3">
      <div className="grid grid-cols-2 gap-1.5">
        <TrendCard trend={trends[0]} onFavorite={toggleFavorite} className="h-[220px]" />
        <TrendCard trend={trends[1]} onFavorite={toggleFavorite} className="h-[220px]" />
      </div>
      <TrendCard
        trend={trends[2]}
        onFavorite={toggleFavorite}
        className="mt-1.5 h-[180px] w-full"
      />
      <div className="mt-1.5 grid grid-cols-3 gap-1.5">
        <TrendCard trend={trends[3]} onFavorite={toggleFavorite} className="h-[120px]" />
        <TrendCard trend={trends[4]} onFavorite={toggleFavorite} className="h-[120px]" />
        <TrendCard trend={trends[5]} onFavorite={toggleFavorite} className="h-[120px]" />
      </div>
      <div className="mt-1.5 grid grid-cols-2 gap-1.5">
        <TrendCard trend={trends[6]} onFavorite={toggleFavorite} className="h-[220px]" />
        <TrendCard trend={trends[7]} onFavorite={toggleFavorite} className="h-[220px]" />
      </div>
    </div>
  );
}

function TrendCard({
  trend,
  onFavorite,
  className,
}: {
  trend: FoodTrend;
  onFavorite: (id: string) => void;
  className: string;
}) {
  return (
    <article className={`relative overflow-hidden rounded-lg ${className}`}>
      <img src={trend.image} alt={trend.title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/40" />
      <button
        type="button"
        onClick={() => onFavorite(trend.id)}
        className="absolute left-3 top-3"
        aria-label={trend.isFavorite ? "Remover dos favoritos" : "Favoritar"}
      >
        <Heart
          size={20}
          className={trend.isFavorite ? "fill-[#FF4D67] text-[#FF4D67]" : "text-white"}
        />
      </button>
      <span className="absolute bottom-3 left-3 rounded-md bg-[#6e11b0] px-3 py-1 text-xs font-bold lowercase text-white">
        {trend.category}
      </span>
    </article>
  );
}
