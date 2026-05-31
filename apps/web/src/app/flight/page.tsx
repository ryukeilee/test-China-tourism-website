"use client";
import { Plane, ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { post } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

interface Flight { id: string; airline: string; flightNumber: string; departure: { city: string; airport: string; time: string }; arrival: { city: string; airport: string; time: string }; price: number; stops: number; duration: number; }

const AIRLINES = ["全部", "东方航空", "中国国航", "南方航空"];

export default function FlightPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [from, setFrom] = useState("上海");
  const [to, setTo] = useState("北京");
  const [airline, setAirline] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFlights = useCallback(async () => {
    setLoading(true);
    try {
      const data = await post<{ items: Flight[] }>("/flight", { from: from || undefined, to: to || undefined });
      let items = data.items;
      if (airline) items = items.filter((f: Flight) => f.airline === airline);
      setFlights(items);
    } catch { setFlights([]); } finally { setLoading(false); }
  }, [from, to, airline]);

  useEffect(() => { void fetchFlights(); }, [fetchFlights]);

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-surface-elevated border-b border-surface-muted">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="font-display text-display">机票预订</h1>
          <p className="mt-2 text-ink-muted text-body">搜索比价，轻松预订国内航班</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="出发城市" className="rounded-xl border border-surface-muted bg-surface px-4 py-3 text-sm outline-none focus:border-accent w-32" />
            <span className="flex items-center"><ArrowRight size={18} className="text-ink-muted" /></span>
            <input type="text" value={to} onChange={(e) => setTo(e.target.value)} placeholder="到达城市" className="rounded-xl border border-surface-muted bg-surface px-4 py-3 text-sm outline-none focus:border-accent w-32" />
            <div className="flex gap-2">
              {AIRLINES.map((a) => (
                <button key={a} onClick={() => setAirline(a === "全部" ? "" : a)} className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${airline === a || (a === "全部" && !airline) ? "bg-accent text-white" : "bg-surface-muted text-ink-muted hover:bg-surface-muted/80"}`}>{a}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-10">
        {loading ? <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="surface-card animate-pulse h-24" />)}</div> :
          flights.map((f) => (
            <div key={f.id} className="surface-card mb-4 flex flex-wrap items-center justify-between gap-4 p-6">
              <div className="flex items-center gap-4">
                <Plane size={24} className="text-accent" />
                <div>
                  <div className="font-semibold">{f.airline} <span className="text-sm text-ink-muted font-normal">{f.flightNumber}</span></div>
                  <div className="text-xs text-ink-muted">{f.stops === 0 ? "直飞" : `${String(f.stops)} 经停`} · {Math.floor(f.duration / 60)}时{String(f.duration % 60)}分</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="font-semibold text-lg">{f.departure.time.slice(11, 16)}</div>
                  <div className="text-xs text-ink-muted">{f.departure.city}</div>
                </div>
                <ArrowRight size={18} className="text-ink-muted" />
                <div className="text-center">
                  <div className="font-semibold text-lg">{f.arrival.time.slice(11, 16)}</div>
                  <div className="text-xs text-ink-muted">{f.arrival.city}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-2xl font-bold text-accent">{formatPrice(f.price)}</div>
                <button className="mt-1 rounded-lg bg-accent px-4 py-1.5 text-sm font-medium text-white">预订</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
