"use client";

import type { Hotel } from "@chinavista/shared";
import { ArrowLeft, MapPin, Star, Wifi, Coffee, Car, Waves, Dumbbell, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { get } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

const AMENITY_MAP: Record<string, { icon: React.ReactNode; label: string }> = {
  wifi: { icon: <Wifi size={16} />, label: "WiFi" },
  breakfast: { icon: <Coffee size={16} />, label: "含早餐" },
  parking: { icon: <Car size={16} />, label: "停车场" },
  pool: { icon: <Waves size={16} />, label: "游泳池" },
  gym: { icon: <Dumbbell size={16} />, label: "健身房" },
  spa: { icon: <Sparkles size={16} />, label: "SPA" },
};

const CAT_LABELS: Record<string, string> = { "5star": "五星级", "4star": "四星级", "3star": "三星级", boutique: "精品民宿", hostel: "青年旅舍" };

export default function HotelDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    get<Hotel>(`/hotel/${encodeURIComponent(slug)}`)
      .then(setHotel).catch(() => setError("酒店未找到")).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-surface-muted border-t-accent" /></div>;
  if (error || !hotel) return <div className="flex min-h-screen flex-col items-center justify-center gap-4"><MapPin size={48} className="text-ink-muted/30" /><p className="text-ink-muted text-lg">{error ?? "酒店未找到"}</p><Link href="/hotel" className="text-accent hover:underline">返回酒店列表</Link></div>;

  return (
    <div className="min-h-screen bg-surface">
      <div className="sticky top-0 z-40 border-b border-surface-muted bg-surface-elevated/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <Link href="/hotel" className="flex items-center gap-1 text-sm text-ink-muted hover:text-ink"><ArrowLeft size={18} />酒店列表</Link>
          <span className="text-ink-muted">/</span>
          <span className="font-medium text-sm">{hotel.name}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-8">
        <div className="relative overflow-hidden rounded-3xl bg-surface-muted">
          {hotel.images.length > 0 ? (
            <>
              <img src={hotel.images[activeImg]} alt={hotel.name} className="aspect-[21/9] w-full object-cover" />
              {hotel.images.length > 1 && (
                <>
                  <button onClick={() => setActiveImg((activeImg - 1 + hotel.images.length) % hotel.images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/50"><ChevronLeft size={24} /></button>
                  <button onClick={() => setActiveImg((activeImg + 1) % hotel.images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/50"><ChevronRight size={24} /></button>
                </>
              )}
            </>
          ) : <div className="flex aspect-[21/9] items-center justify-center bg-gradient-to-br from-surface-muted to-surface"><MapPin size={64} className="text-ink-muted/20" /></div>}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div className="rounded-2xl bg-black/40 p-5 backdrop-blur-md text-white">
              <span className="text-xs opacity-70">{CAT_LABELS[hotel.category]}</span>
              <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">{hotel.name}</h1>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1"><Star size={14} className="fill-yellow-400 text-yellow-400" />{hotel.rating.toFixed(1)}</span>
                <span className="opacity-70">{hotel.city} · {hotel.province}</span>
              </div>
            </div>
            <div className="rounded-2xl bg-black/40 px-5 py-3 backdrop-blur-md">
              <span className="text-xs text-white/70">起价</span>
              <div className="font-display text-2xl font-bold text-white">{formatPrice(hotel.priceRange.min)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="mb-4 font-display text-heading">设施与服务</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {hotel.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-3 rounded-xl bg-surface-muted px-4 py-3">
                    <span className="text-accent">{AMENITY_MAP[a]?.icon}</span>
                    <span className="text-sm font-medium">{AMENITY_MAP[a]?.label ?? a}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-display text-heading">房型选择</h2>
              <div className="space-y-4">
                {hotel.rooms.map((room) => (
                  <div key={room.id} className="surface-card flex flex-wrap items-center justify-between gap-4 p-5">
                    <div>
                      <h3 className="font-semibold">{room.name}</h3>
                      <div className="mt-1 flex gap-3 text-sm text-ink-muted"><span>{room.bedType}</span><span>最多 {room.maxGuests} 人</span></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right"><div className="font-display text-xl font-bold text-accent">{formatPrice(room.price)}</div><div className="text-xs text-ink-muted">每晚含税</div></div>
                      <button className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors">预订</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="surface-card p-5">
              <h4 className="mb-3 font-semibold text-sm">价格区间</h4>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-accent">{formatPrice(hotel.priceRange.min)}</span>
                <span className="text-ink-muted text-sm">—</span>
                <span className="font-display text-2xl font-bold text-accent">{formatPrice(hotel.priceRange.max)}</span>
              </div>
            </div>

            <div className="surface-card p-5">
              <h4 className="mb-3 font-semibold text-sm">AI 推荐理由</h4>
              <div className="flex items-start gap-2">
                <Sparkles size={16} className="mt-0.5 text-accent shrink-0" />
                <p className="text-sm text-ink-muted leading-relaxed">
                  根据你的偏好，{hotel.name}评分{hotel.rating.toFixed(1)}分，提供{hotel.amenities.slice(0, 3).map((a) => AMENITY_MAP[a]?.label ?? a).join("、")}等设施。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
