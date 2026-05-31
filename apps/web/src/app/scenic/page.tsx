"use client";

import type { ScenicSpot, PaginationMeta } from "@chinavista/shared";
import { Search, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { post } from "@/lib/api";

interface ListResponse {
  items: ScenicSpot[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const PROVINCES = [
  "四川", "湖南", "广西", "安徽", "浙江", "甘肃",
  "云南", "西藏", "新疆", "青海", "贵州", "江西",
  "福建", "海南", "吉林", "黑龙江", "内蒙古", "陕西",
];

export default function ScenicListPage() {
  const [spots, setSpots] = useState<ScenicSpot[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchSpots = useCallback(async () => {
    setLoading(true);
    try {
      const data = await post<ListResponse>("/scenic", {
        search: search || undefined,
        province: province || undefined,
        page,
        limit: 12,
      });
      setSpots(data.items);
      setMeta({
        total: data.total,
        page: data.page,
        limit: data.limit,
        totalPages: data.totalPages,
      });
    } catch {
      setSpots([]);
    } finally {
      setLoading(false);
    }
  }, [search, province, page]);

  useEffect(() => {
    void fetchSpots();
  }, [fetchSpots]);

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-surface-elevated border-b border-surface-muted">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="font-display text-display">探索中国美景</h1>
          <p className="mt-2 text-ink-muted text-body">
            从雪山到海滩，发现你的下一个旅行目的地
          </p>

          {/* Search + Filter */}
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="flex min-w-[280px] flex-1 items-center gap-2 rounded-xl border border-surface-muted bg-surface px-4 py-3">
              <Search size={18} className="text-ink-muted shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="搜索景点、城市…"
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
            <select
              value={province}
              onChange={(e) => { setProvince(e.target.value); setPage(1); }}
              className="rounded-xl border border-surface-muted bg-surface px-4 py-3 text-sm outline-none"
            >
              <option value="">全部省份</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="surface-card animate-pulse">
                <div className="h-48 rounded-t-2xl bg-surface-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-24 rounded bg-surface-muted" />
                  <div className="h-6 w-40 rounded bg-surface-muted" />
                  <div className="h-4 w-full rounded bg-surface-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : spots.length === 0 ? (
          <div className="py-20 text-center">
            <MapPin size={48} className="mx-auto text-ink-muted/30" />
            <p className="mt-4 text-ink-muted text-lg">未找到匹配的景点</p>
            <button
              onClick={() => { setSearch(""); setProvince(""); }}
              className="mt-2 text-sm text-accent hover:underline"
            >
              清除筛选条件
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {spots.map((spot) => (
                <Link
                  key={spot.id}
                  href={`/scenic/${spot.slug}`}
                  className="surface-card group overflow-hidden"
                >
                  <div className="relative h-48 bg-gradient-to-br from-surface-muted to-surface">
                    {spot.images[0] && (
                      <img
                        src={spot.images[0]}
                        alt={spot.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      {spot.rating.toFixed(1)}
                      <span className="opacity-70">({spot.reviewCount})</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-medium text-accent">
                          {spot.province} · {spot.city}
                        </span>
                        <h3 className="mt-1 font-display text-lg font-semibold group-hover:text-accent transition-colors">
                          {spot.name}
                        </h3>
                      </div>
                      <span className="shrink-0 rounded-lg bg-accent px-2 py-1 text-xs font-medium text-white">
                        ¥{spot.ticketPrice}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-ink-muted text-sm">
                      {spot.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {spot.bestSeasons.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-surface-muted px-2.5 py-0.5 text-xs text-ink-muted"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                {Array.from({ length: meta.totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      page === i + 1
                        ? "bg-accent text-white"
                        : "bg-surface-muted text-ink-muted hover:bg-surface-muted/80"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
