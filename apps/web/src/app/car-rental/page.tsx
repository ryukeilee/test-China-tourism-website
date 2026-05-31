"use client";
import { Car, Users, Gauge } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { post } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

interface Car { id: string; name: string; category: string; price: number; seats: number; transmission: string; provider: string; city: string; }

const CATEGORIES = ["全部", "economy", "business", "suv", "luxury"];
const CAT_LABELS: Record<string, string> = { economy: "经济型", business: "商务型", suv: "SUV", luxury: "豪华车" };
const CITIES = ["上海", "北京", "成都", "广州", "深圳", "杭州", "三亚"];

export default function CarRentalPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [city, setCity] = useState("上海");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const data = await post<{ items: Car[] }>("/car-rental", { city: city || undefined, category: category || undefined });
      setCars(data.items);
    } catch { setCars([]); } finally { setLoading(false); }
  }, [city, category]);

  useEffect(() => { void fetchCars(); }, [fetchCars]);

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-surface-elevated border-b border-surface-muted">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="font-display text-display">租车服务</h1>
          <p className="mt-2 text-ink-muted text-body">神州租车 · 一嗨租车，全国门店任选</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="flex flex-wrap gap-2">{CITIES.map((c) => (
              <button key={c} onClick={() => setCity(c)} className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${city === c ? "bg-accent text-white" : "bg-surface-muted text-ink-muted hover:bg-surface-muted/80"}`}>{c}</button>
            ))}</div>
            <div className="w-full flex gap-2 mt-2">{CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(c === "全部" ? "" : c)} className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${category === c || (c === "全部" && !category) ? "bg-accent text-white" : "bg-surface-muted text-ink-muted"}`}>{c === "全部" ? "全部" : CAT_LABELS[c] ?? c}</button>
            ))}</div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-10">
        {loading ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="surface-card animate-pulse h-40" />)}</div> :
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((c) => (
              <div key={c.id} className="surface-card p-6">
                <div className="flex items-start justify-between mb-3">
                  <div><span className="text-xs font-medium text-accent">{CAT_LABELS[c.category] ?? c.category}</span><h3 className="font-semibold text-lg">{c.name}</h3></div>
                  <Car size={24} className="text-accent" />
                </div>
                <div className="flex gap-4 text-sm text-ink-muted mb-4">
                  <span className="flex items-center gap-1"><Users size={14} />{c.seats}座</span>
                  <span className="flex items-center gap-1"><Gauge size={14} />{c.transmission}</span>
                </div>
                <div className="flex items-end justify-between">
                  <div><div className="font-display text-xl font-bold text-accent">{formatPrice(c.price)}<span className="text-xs text-ink-muted font-normal">/天</span></div><div className="text-xs text-ink-muted">{c.provider} · {c.city}</div></div>
                  <button className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white">租车</button>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
}
