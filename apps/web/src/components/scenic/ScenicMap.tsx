"use client";

import type { ScenicFacility } from "@chinavista/shared";
import { MapPin, Navigation } from "lucide-react";

interface Props {
  name: string;
  lat: number;
  lng: number;
  facilities?: ScenicFacility[];
}

const FACILITY_LABELS: Record<string, string> = {
  entrance: "入口",
  parking: "停车场",
  restaurant: "餐厅",
  restroom: "卫生间",
  visitor_center: "游客中心",
};

const FACILITY_ICONS: Record<string, string> = {
  entrance: "🚪",
  parking: "🅿️",
  restaurant: "🍽️",
  restroom: "🚻",
  visitor_center: "ℹ️",
};

function pct(n: number): string {
  return String(n) + "%";
}

export function ScenicMap({ name, lat, lng, facilities = [] }: Props) {
  return (
    <div className="surface-card overflow-hidden">
      {/* Map area — production loads AMap/Baidu JS SDK */}
      <div
        className="relative h-[400px] bg-surface-muted"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, oklch(78% 0.06 160 / 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 60%, oklch(68% 0.19 25 / 0.15) 0%, transparent 50%),
            linear-gradient(180deg, oklch(95% 0.005 200) 0%, oklch(98% 0 0) 100%)
          `,
        }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Center pin */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent shadow-lg">
            <MapPin size={20} className="text-white" />
          </div>
          <div className="mt-2 rounded-xl bg-surface-elevated px-4 py-2 text-sm font-medium shadow-lg">
            {name}
          </div>
          <div className="mt-1 text-xs text-ink-muted">
            {lat.toFixed(4)}, {lng.toFixed(4)}
          </div>
        </div>

        {/* POI markers */}
        {facilities.map((fac, i) => (
          <div
            key={i}
            className="absolute z-10 flex flex-col items-center"
            style={{
              left: pct(40 + (i * 15) % 60),
              top: pct(20 + (i * 20) % 60),
            }}
          >
            <span className="text-lg">{FACILITY_ICONS[fac.type] ?? "📍"}</span>
            <span className="mt-0.5 rounded bg-surface-elevated px-1.5 py-0.5 text-xs shadow">
              {fac.name}
            </span>
          </div>
        ))}

        {/* Map controls */}
        <div className="absolute right-3 top-3 z-20 flex flex-col gap-1">
          <button className="rounded-lg bg-surface-elevated p-2 shadow-md hover:bg-surface-muted transition-colors" aria-label="放大">
            <span className="text-lg">+</span>
          </button>
          <button className="rounded-lg bg-surface-elevated p-2 shadow-md hover:bg-surface-muted transition-colors" aria-label="缩小">
            <span className="text-lg">−</span>
          </button>
          <button className="rounded-lg bg-surface-elevated p-2 shadow-md hover:bg-surface-muted transition-colors" aria-label="定位">
            <Navigation size={16} />
          </button>
        </div>

        {/* Attribution */}
        <div className="absolute bottom-2 left-2 z-10 text-xs text-ink-muted/50">
          © 高德地图 | 百度地图
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 border-t border-surface-muted px-5 py-3">
        {Object.entries(FACILITY_LABELS).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1.5 text-xs text-ink-muted">
            <span>{FACILITY_ICONS[key] ?? "📍"}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
