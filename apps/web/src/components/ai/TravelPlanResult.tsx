"use client";

import type { TravelPlan } from "@chinavista/shared";
import {
  MapPin,
  Hotel,
  CloudSun,
  Wallet,
  Train,
  Clock,
  UtensilsCrossed,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Props {
  plan: TravelPlan;
}

export function TravelPlanResult({ plan }: Props) {
  return (
    <div className="space-y-10 animate-slide-up">
      {/* Budget overview */}
      <div className="rounded-2xl bg-accent/5 p-6">
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-lg">
          <Wallet size={20} className="text-accent" />
          预算概览
        </h3>
        <div className="flex items-end justify-between">
          <span className="text-ink-muted text-sm">总预算</span>
          <span className="font-display text-3xl font-bold text-accent">
            {formatPrice(plan.budget.total)}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "交通", value: plan.budget.transport },
            { label: "住宿", value: plan.budget.accommodation },
            { label: "餐饮", value: plan.budget.dining },
            { label: "景点", value: plan.budget.attractions },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl bg-surface-elevated p-3 text-center"
            >
              <div className="text-xs text-ink-muted">{item.label}</div>
              <div className="mt-1 font-semibold">{formatPrice(item.value)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Itinerary */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-lg">
          <MapPin size={20} className="text-accent" />
          每日行程
        </h3>
        <div className="space-y-4">
          {plan.itinerary.map((day) => (
            <div
              key={day.day}
              className="surface-card overflow-hidden"
            >
              <div className="flex items-center gap-3 border-b border-surface-muted bg-surface-muted/50 px-6 py-3">
                <span className="rounded-lg bg-accent px-3 py-1 text-sm font-bold text-white">
                  Day {day.day}
                </span>
                <span className="text-sm text-ink-muted">{day.date}</span>
                <span className="ml-auto text-sm text-ink-muted">
                  🏨 {day.accommodation}
                </span>
              </div>
              <div className="p-6">
                {/* Activities */}
                <div className="space-y-3">
                  {day.activities.map((act, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 rounded-md bg-surface-muted p-1 text-xs">
                        <Clock size={14} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="font-medium text-sm">{act.name}</span>
                        <span className="ml-2 text-xs text-ink-muted">
                          {act.duration}分钟
                        </span>
                        {act.notes && (
                          <p className="mt-0.5 text-xs text-ink-muted">
                            {act.notes}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 rounded-full bg-surface-muted px-2 py-0.5 text-xs text-ink-muted">
                        {act.type === "sightseeing" && "观光"}
                        {act.type === "dining" && "餐饮"}
                        {act.type === "shopping" && "购物"}
                        {act.type === "transport" && "交通"}
                        {act.type === "rest" && "休息"}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Meals */}
                {day.meals.length > 0 && (
                  <div className="mt-4 border-t border-surface-muted pt-4">
                    <div className="flex flex-wrap gap-2">
                      {day.meals.map((meal, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-3 py-1 text-xs"
                        >
                          <UtensilsCrossed size={12} />
                          {meal.recommendation}
                          <span className="text-ink-muted">
                            ¥{meal.estimatedCost}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hotels */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-lg">
          <Hotel size={20} className="text-accent" />
          推荐酒店
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {plan.hotels.slice(0, 4).map((hotel, i) => (
            <div key={i} className="surface-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-accent uppercase">
                    {hotel.category === "5star" && "五星级"}
                    {hotel.category === "4star" && "四星级"}
                    {hotel.category === "3star" && "三星级"}
                    {hotel.category === "boutique" && "精品民宿"}
                    {hotel.category === "hostel" && "青年旅舍"}
                  </span>
                  <h4 className="mt-1 font-semibold">{hotel.name}</h4>
                </div>
                <span className="text-sm">
                  ⭐ {hotel.rating.toFixed(1)}
                </span>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-xs text-ink-muted">
                  {hotel.rooms[0]?.name ?? "标准间"}
                </span>
                <span className="font-semibold text-accent">
                  {formatPrice(hotel.priceRange.min)}
                  <span className="text-xs text-ink-muted font-normal">
                    /晚起
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-lg">
          <CloudSun size={20} className="text-accent" />
          天气预报
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {plan.weather.slice(0, 7).map((w, i) => (
            <div
              key={i}
              className="shrink-0 rounded-xl bg-surface-muted p-4 text-center min-w-[80px]"
            >
              <div className="text-xs text-ink-muted">
                {w.date.slice(5)}
              </div>
              <div className="mt-1 text-2xl">
                {w.condition === "sunny" && "☀️"}
                {w.condition === "cloudy" && "☁️"}
                {w.condition === "rainy" && "🌧️"}
                {w.condition === "snowy" && "❄️"}
                {w.condition === "partly_cloudy" && "⛅"}
                {w.condition === "stormy" && "⛈️"}
                {w.condition === "foggy" && "🌫️"}
              </div>
              <div className="mt-1 font-semibold">
                {w.temperature.high}°
              </div>
              <div className="text-xs text-ink-muted">
                {w.temperature.low}°
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transport */}
      {plan.transport.length > 0 && (
        <div>
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-lg">
            <Train size={20} className="text-accent" />
            交通路线
          </h3>
          <div className="space-y-2">
            {plan.transport.map((t, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl bg-surface-muted px-5 py-3"
              >
                <span className="font-medium text-sm">{t.from}</span>
                <span className="flex-1 text-center text-xs text-ink-muted">
                  {t.mode === "flight" && "✈️"}
                  {t.mode === "train" && "🚄"}
                  {t.mode === "bus" && "🚌"}
                  {t.mode === "car" && "🚗"}
                  {t.mode === "walk" && "🚶"}
                  {" "}
                  {Math.round(t.duration / 60)}小时{t.duration % 60}分
                </span>
                <span className="font-medium text-sm">{t.to}</span>
                <span className="text-sm text-accent font-medium">
                  {formatPrice(t.cost)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
