import { Wind, Droplets } from "lucide-react";
import Link from "next/link";

interface CityWeather {
  city: string;
  slug: string;
  temp: number;
  condition: string;
  icon: string;
  wind: string;
  humidity: number;
}

// Static preview data — real data would come from weather API
const PREVIEW_WEATHER: CityWeather[] = [
  {
    city: "北京",
    slug: "beijing",
    temp: 28,
    condition: "晴",
    icon: "☀️",
    wind: "3级",
    humidity: 45,
  },
  {
    city: "上海",
    slug: "shanghai",
    temp: 25,
    condition: "多云",
    icon: "⛅",
    wind: "4级",
    humidity: 65,
  },
  {
    city: "成都",
    slug: "chengdu",
    temp: 22,
    condition: "小雨",
    icon: "🌧️",
    wind: "2级",
    humidity: 80,
  },
  {
    city: "三亚",
    slug: "sanya",
    temp: 32,
    condition: "晴",
    icon: "☀️",
    wind: "3级",
    humidity: 70,
  },
  {
    city: "拉萨",
    slug: "lhasa",
    temp: 16,
    condition: "晴",
    icon: "☀️",
    wind: "5级",
    humidity: 30,
  },
  {
    city: "哈尔滨",
    slug: "harbin",
    temp: 18,
    condition: "多云",
    icon: "⛅",
    wind: "3级",
    humidity: 55,
  },
];

export function WeatherPreview() {
  return (
    <section
      className="py-section px-gutter bg-surface-muted"
      aria-labelledby="weather-heading"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex items-end justify-between">
          <div>
            <h2
              id="weather-heading"
              className="font-display text-display text-balance"
            >
              热门城市天气
            </h2>
            <p className="mt-3 text-ink-muted text-body">
              出行前查看目的地天气，选择最佳旅行时间
            </p>
          </div>
          <Link
            href="/weather"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-accent hover:underline sm:flex"
          >
            15天预报
            <span aria-hidden="true">→</span>
          </Link>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {PREVIEW_WEATHER.map((city) => (
            <Link
              key={city.slug}
              href={`/weather/${city.slug}`}
              className="surface-card group flex flex-col items-center p-5 text-center"
            >
              <span className="text-2xl">{city.icon}</span>
              <span className="mt-2 font-semibold">{city.city}</span>
              <span className="mt-1 font-display text-2xl font-bold">
                {city.temp}°
              </span>
              <span className="text-sm text-ink-muted">{city.condition}</span>
              <div className="mt-3 flex gap-3 text-xs text-ink-muted">
                <span className="flex items-center gap-1">
                  <Wind size={12} />
                  {city.wind}
                </span>
                <span className="flex items-center gap-1">
                  <Droplets size={12} />
                  {city.humidity}%
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/weather"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent"
          >
            15天预报 →
          </Link>
        </div>
      </div>
    </section>
  );
}
