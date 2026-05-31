"use client";

import type { ScenicSpot } from "@chinavista/shared";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Ticket,
  Star,
  Calendar,
  Lightbulb,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ScenicMap } from "@/components/scenic/ScenicMap";
import { get } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

export default function ScenicDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [spot, setSpot] = useState<ScenicSpot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    get<ScenicSpot>(`/scenic/${encodeURIComponent(slug)}`)
      .then(setSpot)
      .catch(() => setError("景点未找到"))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-surface-muted border-t-accent" />
      </div>
    );
  }

  if (error || !spot) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <MapPin size={48} className="text-ink-muted/30" />
        <p className="text-ink-muted text-lg">{error ?? "景点未找到"}</p>
        <Link href="/scenic" className="text-accent hover:underline">
          返回景点列表
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header nav */}
      <div className="sticky top-0 z-40 border-b border-surface-muted bg-surface-elevated/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <Link
            href="/scenic"
            className="flex items-center gap-1 text-sm text-ink-muted hover:text-ink"
          >
            <ArrowLeft size={18} />
            景点列表
          </Link>
          <span className="text-ink-muted">/</span>
          <span className="font-medium text-sm">{spot.name}</span>
        </div>
      </div>

      {/* Hero Gallery */}
      <div className="relative mx-auto max-w-7xl px-6 pt-8">
        <div className="relative overflow-hidden rounded-3xl bg-surface-muted">
          {spot.images.length > 0 ? (
            <>
              <img
                src={spot.images[activeImage]}
                alt={`${spot.name} 图片 ${String(activeImage + 1)}`}
                className="aspect-[21/9] w-full object-cover"
              />
              {spot.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage(
                        (activeImage - 1 + spot.images.length) % spot.images.length,
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/50"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImage((activeImage + 1) % spot.images.length)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/50"
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                    {spot.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`h-2 rounded-full transition-all ${
                          i === activeImage ? "w-6 bg-white" : "w-2 bg-white/50"
                        }`}
                        aria-label={`图片 ${String(i + 1)}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex aspect-[21/9] items-center justify-center bg-gradient-to-br from-surface-muted to-surface">
              <MapPin size={64} className="text-ink-muted/20" />
            </div>
          )}

          {/* Overlay info card */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div className="rounded-2xl bg-black/40 p-5 backdrop-blur-md text-white">
              <span className="text-xs opacity-70">
                {spot.province} · {spot.city}
              </span>
              <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
                {spot.name}
              </h1>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  {spot.rating.toFixed(1)}
                </span>
                <span className="opacity-70">{spot.reviewCount} 条评价</span>
              </div>
            </div>
            <div className="rounded-2xl bg-black/40 px-5 py-3 backdrop-blur-md">
              <span className="text-xs text-white/70">门票</span>
              <div className="font-display text-2xl font-bold text-white">
                {spot.ticketPrice === 0 ? "免费" : formatPrice(spot.ticketPrice)}
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        {spot.images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {spot.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                  i === activeImage
                    ? "border-accent"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="h-16 w-24 object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content grid */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="mb-4 font-display text-heading">关于 {spot.name}</h2>
              <p className="text-ink-muted leading-relaxed">{spot.description}</p>
            </section>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Ticket, label: "门票", value: spot.ticketPrice === 0 ? "免费" : `¥${String(spot.ticketPrice)}` },
                { icon: Clock, label: "开放时间", value: spot.openingHours },
                { icon: Calendar, label: "最佳季节", value: spot.bestSeasons.slice(0, 3).join("、") },
                { icon: Star, label: "评分", value: `${spot.rating.toFixed(1)} / 5.0` },
              ].map((item) => (
                <div key={item.label} className="surface-card flex flex-col items-center p-4 text-center">
                  <item.icon size={20} className="mb-2 text-accent" />
                  <span className="text-xs text-ink-muted">{item.label}</span>
                  <span className="mt-1 font-semibold text-sm">{item.value}</span>
                </div>
              ))}
            </div>

            <section className="rounded-2xl bg-accent/5 p-6">
              <h3 className="mb-3 flex items-center gap-2 font-semibold">
                <Sparkles size={18} className="text-accent" />
                AI 总结
              </h3>
              <p className="text-ink-muted leading-relaxed">
                {spot.aiSummary ??
                  `${spot.name}最佳旅游时间为${spot.bestSeasons.join("、")}，${spot.tips.slice(0, 120)}…`}
              </p>
            </section>

            <section>
              <h3 className="mb-3 flex items-center gap-2 font-semibold">
                <Lightbulb size={18} className="text-accent" />
                游玩攻略
              </h3>
              <p className="rounded-2xl bg-surface-muted p-5 text-ink-muted leading-relaxed text-sm">
                {spot.tips}
              </p>
            </section>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-sm">
                <MapPin size={16} className="text-accent" />
                景区地图
              </h3>
              <ScenicMap
                name={spot.name}
                lat={spot.coordinates.lat}
                lng={spot.coordinates.lng}
                facilities={spot.facilities}
              />
            </div>

            <div className="surface-card p-5">
              <h4 className="mb-3 font-semibold text-sm">最佳旅游季节</h4>
              <div className="space-y-2">
                {spot.bestSeasons.map((season) => (
                  <div
                    key={season}
                    className="flex items-center gap-2 rounded-lg bg-surface-muted px-3 py-2 text-sm"
                  >
                    <Calendar size={14} className="text-accent" />
                    {season}
                  </div>
                ))}
              </div>
            </div>

            {spot.facilities.length > 0 && (
              <div className="surface-card p-5">
                <h4 className="mb-3 font-semibold text-sm">景区设施</h4>
                <div className="flex flex-wrap gap-2">
                  {spot.facilities.map((f, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-surface-muted px-3 py-1.5 text-xs"
                    >
                      {f.type === "entrance" && "🚪 "}
                      {f.type === "parking" && "🅿️ "}
                      {f.type === "restaurant" && "🍽️ "}
                      {f.type === "restroom" && "🚻 "}
                      {f.type === "visitor_center" && "ℹ️ "}
                      {f.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
