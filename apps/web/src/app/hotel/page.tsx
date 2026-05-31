"use client";

import type { Hotel, PaginationMeta } from "@chinavista/shared";
import { Search, Star, Wifi, Coffee, Car, Waves } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { post } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

interface ListResponse { items: Hotel[]; total: number; page: number; totalPages: number; }

const CATEGORIES = [
  { key: "", label: "全部" },
  { key: "5star", label: "五星级" },
  { key: "4star", label: "四星级" },
  { key: "boutique", label: "精品民宿" },
  { key: "hostel", label: "青年旅舍" },
];

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi: <Wifi size={12} />, breakfast: <Coffee size={12} />,
  parking: <Car size={12} />, pool: <Waves size={12} />,
};

export default function HotelListPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchHotels = useCallback(async () => {
    setLoading(true);
    try {
      const data = await post<ListResponse>("/hotel", { search: search || undefined, category: category || undefined, page, limit: 12 });
      setHotels(data.items);
      setMeta({ total: data.total, page: data.page, limit: 12, totalPages: data.totalPages });
    } catch { setHotels([]); } finally { setLoading(false); }
  }, [search, category, page]);

  useEffect(() => { void fetchHotels(); }, [fetchHotels]);

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-surface-elevated border-b border-surface-muted">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="font-display text-display">寻找理想住宿</h1>
          <p className="mt-2 text-ink-muted text-body">从五星级酒店到特色民宿，发现你的完美落脚点</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="flex min-w-[280px] flex-1 items-center gap-2 rounded-xl border border-surface-muted bg-surface px-4 py-3">
              <Search size={18} className="text-ink-muted shrink-0" />
              <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="搜索酒店、城市…" className="w-full bg-transparent outline-none text-sm" />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button key={c.key} onClick={() => { setCategory(c.key); setPage(1); }}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${category === c.key ? "bg-accent text-white" : "bg-surface-muted text-ink-muted hover:bg-surface-muted/80"}`}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="surface-card animate-pulse"><div className="h-48 rounded-t-2xl bg-surface-muted" /><div className="p-5 space-y-3"><div className="h-5 w-24 rounded bg-surface-muted" /><div className="h-6 w-40 rounded bg-surface-muted" /></div></div>
            ))}
          </div>
        ) : hotels.length === 0 ? (
          <div className="py-20 text-center"><p className="text-ink-muted text-lg">未找到匹配的酒店</p></div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hotels.map((hotel) => (
                <Link key={hotel.id} href={`/hotel/${hotel.slug}`} className="surface-card group overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-surface-muted to-surface">
                    {hotel.images[0] && <img src={hotel.images[0]} alt={hotel.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />}
                    <div className="absolute bottom-3 left-4 flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" /> {hotel.rating.toFixed(1)}
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-accent">
                      {hotel.category === "5star" && "五星级"} {hotel.category === "4star" && "四星级"} {hotel.category === "boutique" && "精品民宿"} {hotel.category === "hostel" && "青年旅舍"}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-semibold group-hover:text-accent transition-colors">{hotel.name}</h3>
                    <p className="text-sm text-ink-muted">{hotel.city} · {hotel.province}</p>
                    <div className="mt-2 flex items-center gap-2">
                      {hotel.amenities.slice(0, 3).map((a) => <span key={a} className="text-ink-muted/50">{AMENITY_ICONS[a] ?? null}</span>)}
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="font-semibold text-accent text-lg">{formatPrice(hotel.priceRange.min)}<span className="text-xs text-ink-muted font-normal">/晚起</span></span>
                      <span className="text-sm text-ink-muted">{hotel.rooms.length} 种房型</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {meta && meta.totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                {Array.from({ length: meta.totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${page === i + 1 ? "bg-accent text-white" : "bg-surface-muted text-ink-muted hover:bg-surface-muted/80"}`}>{i + 1}</button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
