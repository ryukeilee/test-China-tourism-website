"use client";
import { CloudSun, Wind, Droplets } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { post } from "@/lib/api";

interface Forecast { date: string; temperature: { high: number; low: number }; condition: string; windSpeed: number; uvIndex: number; precipitationProbability: number; }
interface WeatherData { city: string; coordinates: { lat: number; lng: number }; forecast: Forecast[]; }

const CITIES = [
  { slug: "beijing", name: "北京" }, { slug: "shanghai", name: "上海" }, { slug: "chengdu", name: "成都" },
  { slug: "sanya", name: "三亚" }, { slug: "lhasa", name: "拉萨" }, { slug: "harbin", name: "哈尔滨" },
  { slug: "guangzhou", name: "广州" }, { slug: "xian", name: "西安" },
];

const COND_ICON: Record<string, string> = { sunny: "☀️", cloudy: "☁️", partly_cloudy: "⛅", rainy: "🌧️", snowy: "❄️", stormy: "⛈️", foggy: "🌫️" };

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("beijing");
  const [loading, setLoading] = useState(true);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    try { setWeather(await post<WeatherData>("/weather", { city, days: 7 })); } catch { /* ignore */ } finally { setLoading(false); }
  }, [city]);

  useEffect(() => { void fetchWeather(); }, [fetchWeather]);

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-surface-elevated border-b border-surface-muted">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="font-display text-display">天气预报</h1>
          <p className="mt-2 text-ink-muted text-body">15天精准预报，出行前必查</p>
          <div className="mt-6 flex flex-wrap gap-2">{CITIES.map((c) => (
            <button key={c.slug} onClick={() => setCity(c.slug)} className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${city === c.slug ? "bg-accent text-white" : "bg-surface-muted text-ink-muted hover:bg-surface-muted/80"}`}>{c.name}</button>
          ))}</div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-10">
        {loading ? <div className="text-center py-20"><div className="h-8 w-8 mx-auto animate-spin rounded-full border-4 border-surface-muted border-t-accent" /></div> : weather && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <CloudSun size={32} className="text-accent" />
              <div><h2 className="font-display text-2xl font-bold">{weather.city}</h2><p className="text-sm text-ink-muted">7天天气预报</p></div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {weather.forecast.map((f, i) => (
                <div key={i} className={`shrink-0 rounded-2xl p-5 text-center min-w-[100px] ${i === 0 ? "bg-accent text-white" : "surface-card"}`}>
                  <div className="text-xs font-medium">{i === 0 ? "今天" : f.date.slice(5)}</div>
                  <div className="text-3xl my-3">{COND_ICON[f.condition] ?? "☀️"}</div>
                  <div className="font-bold text-lg">{f.temperature.high}°</div>
                  <div className={`text-sm ${i === 0 ? "text-white/70" : "text-ink-muted"}`}>{f.temperature.low}°</div>
                  <div className="mt-2 flex justify-center gap-2 text-xs">
                    <span title="风速"><Wind size={12} />{f.windSpeed}</span>
                    <span title="降水"><Droplets size={12} />{f.precipitationProbability}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
