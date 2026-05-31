"use client";

import { Sparkles, MapPin, Users, Wallet, Calendar, Heart } from "lucide-react";
import { useState } from "react";

const PREFERENCES = [
  { key: "自然风景", label: "自然风景", icon: "🏔️" },
  { key: "历史文化", label: "历史文化", icon: "🏯" },
  { key: "美食之旅", label: "美食之旅", icon: "🍜" },
  { key: "亲子乐园", label: "亲子乐园", icon: "🎠" },
  { key: "购物天堂", label: "购物天堂", icon: "🛍️" },
  { key: "摄影打卡", label: "摄影打卡", icon: "📸" },
  { key: "休闲度假", label: "休闲度假", icon: "🏖️" },
  { key: "户外探险", label: "户外探险", icon: "🧗" },
];

interface FormData {
  budget: number;
  travelers: number;
  origin: string;
  preferences: string[];
  duration: number;
}

interface Props {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export function AiPlannerForm({ onSubmit, isLoading }: Props) {
  const [budget, setBudget] = useState(5000);
  const [travelers, setTravelers] = useState(2);
  const [origin, setOrigin] = useState("");
  const [preferences, setPreferences] = useState<string[]>(["自然风景"]);
  const [duration, setDuration] = useState(5);

  const togglePreference = (key: string) => {
    setPreferences((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin.trim()) return;
    onSubmit({ budget, travelers, origin: origin.trim(), preferences, duration });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Budget + Travelers row */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-ink">
            <Wallet size={16} className="text-accent" />
            预算（元）
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={500}
              max={50000}
              step={500}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="flex-1 accent-accent"
            />
            <span className="min-w-[5rem] text-right font-semibold text-lg tabular-nums">
              ¥{budget.toLocaleString()}
            </span>
          </div>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-ink">
            <Users size={16} className="text-accent" />
            出行人数
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5, "6+"].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() =>
                  setTravelers(typeof n === "number" ? n : 6)
                }
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                  (typeof n === "number" && travelers === n) ||
                  (n === "6+" && travelers >= 6)
                    ? "bg-accent text-white"
                    : "bg-surface-muted text-ink-muted hover:bg-surface-muted/80"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Origin + Duration row */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-ink">
            <MapPin size={16} className="text-accent" />
            出发城市
          </label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="例如：上海"
            className="w-full rounded-xl border border-surface-muted bg-surface-elevated px-4 py-3 text-ink outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
            required
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-ink">
            <Calendar size={16} className="text-accent" />
            旅行天数
          </label>
          <div className="flex items-center gap-2">
            {[1, 3, 5, 7, 10, 15].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setDuration(n)}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                  duration === n
                    ? "bg-accent text-white"
                    : "bg-surface-muted text-ink-muted hover:bg-surface-muted/80"
                }`}
              >
                {n}天
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div>
        <label className="mb-3 flex items-center gap-2 text-sm font-medium text-ink">
          <Heart size={16} className="text-accent" />
          旅行偏好（可多选）
        </label>
        <div className="flex flex-wrap gap-2">
          {PREFERENCES.map((pref) => {
            const active = preferences.includes(pref.key);
            return (
              <button
                key={pref.key}
                type="button"
                onClick={() => togglePreference(pref.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  active
                    ? "bg-accent text-white"
                    : "bg-surface-muted text-ink-muted hover:bg-surface-muted/80"
                }`}
              >
                <span className="mr-1">{pref.icon}</span>
                {pref.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary + Submit */}
      <div className="rounded-2xl bg-surface-muted p-6">
        <div className="mb-4 flex flex-wrap gap-4 text-sm text-ink-muted">
          <span>
            💰 预算 <strong className="text-ink">¥{budget.toLocaleString()}</strong>
          </span>
          <span>
            👥 {travelers}人
          </span>
          <span>
            📍 {origin || "未选择出发地"}
          </span>
          <span>
            📅 {duration}天
          </span>
          <span>
            🏷️ {preferences.join("、") || "无偏好"}
          </span>
        </div>
        <button
          type="submit"
          disabled={isLoading || !origin.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-4 text-white font-semibold text-lg transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              AI 正在规划中…
            </>
          ) : (
            <>
              <Sparkles size={22} />
              开始 AI 规划
            </>
          )}
        </button>
      </div>
    </form>
  );
}
