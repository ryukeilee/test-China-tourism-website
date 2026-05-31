"use client";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { post } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

interface TrainTicket { id: string; trainNumber: string; type: string; departure: { station: string; time: string }; arrival: { station: string; time: string }; seats: { type: string; price: number; available: number }[]; }

const TYPES = ["全部", "G", "D", "C", "K"];

export default function TrainPage() {
  const [trains, setTrains] = useState<TrainTicket[]>([]);
  const [from, setFrom] = useState("上海");
  const [to, setTo] = useState("北京");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTrains = useCallback(async () => {
    setLoading(true);
    try {
      const data = await post<{ items: TrainTicket[] }>("/train", { from: from || undefined, to: to || undefined });
      let items = data.items;
      if (type) items = items.filter((t) => t.type === type);
      setTrains(items);
    } catch { setTrains([]); } finally { setLoading(false); }
  }, [from, to, type]);

  useEffect(() => { void fetchTrains(); }, [fetchTrains]);

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-surface-elevated border-b border-surface-muted">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="font-display text-display">高铁票预订</h1>
          <p className="mt-2 text-ink-muted text-body">12306官方接口，余票实时查询</p>
          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="出发站" className="rounded-xl border border-surface-muted bg-surface px-4 py-3 text-sm outline-none focus:border-accent w-32" />
            <ArrowRight size={18} className="text-ink-muted" />
            <input type="text" value={to} onChange={(e) => setTo(e.target.value)} placeholder="到达站" className="rounded-xl border border-surface-muted bg-surface px-4 py-3 text-sm outline-none focus:border-accent w-32" />
            <div className="flex gap-2">{TYPES.map((t) => (
              <button key={t} onClick={() => setType(t === "全部" ? "" : t)} className={`rounded-xl px-3 py-2 text-sm font-medium transition-all ${type === t || (t === "全部" && !type) ? "bg-accent text-white" : "bg-surface-muted text-ink-muted"}`}>{t === "全部" ? "全部" : `${t}字头`}</button>
            ))}</div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-10">
        {loading ? <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="surface-card animate-pulse h-32" />)}</div> :
          trains.map((t) => (
            <div key={t.id} className="surface-card mb-4 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-accent/10 px-3 py-1 text-sm font-bold text-accent">{t.type}字头</span>
                  <span className="font-semibold text-lg">{t.trainNumber}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center"><div className="font-semibold text-lg">{t.departure.time.slice(11, 16)}</div><div className="text-xs text-ink-muted">{t.departure.station}</div></div>
                  <ArrowRight size={18} className="text-ink-muted" />
                  <div className="text-center"><div className="font-semibold text-lg">{t.arrival.time.slice(11, 16)}</div><div className="text-xs text-ink-muted">{t.arrival.station}</div></div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {t.seats.map((s) => (
                  <div key={s.type} className="flex items-center gap-4 rounded-xl bg-surface-muted px-4 py-3 flex-1 min-w-[150px]">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{s.type === "business" ? "商务座" : s.type === "first" ? "一等座" : s.type === "second" ? "二等座" : "站票"}</div>
                      <div className="text-xs text-ink-muted">余 {s.available} 张</div>
                    </div>
                    <div className="text-right"><div className="font-bold text-accent">{formatPrice(s.price)}</div><button className="text-xs text-accent font-medium hover:underline">预订</button></div>
                  </div>
                ))}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
