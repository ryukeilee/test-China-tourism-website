import { Injectable } from "@nestjs/common";
import type { WeatherQueryDto } from "./dto/weather-query.dto";
import type { WeatherForecast } from "@chinavista/shared";

const CITIES: Record<string, { name: string; lat: number; lng: number }> = {
  beijing: { name: "北京", lat: 39.9, lng: 116.4 },
  shanghai: { name: "上海", lat: 31.2, lng: 121.5 },
  chengdu: { name: "成都", lat: 30.6, lng: 104.1 },
  sanya: { name: "三亚", lat: 18.2, lng: 109.5 },
  lhasa: { name: "拉萨", lat: 29.7, lng: 91.1 },
  harbin: { name: "哈尔滨", lat: 45.8, lng: 126.5 },
  guangzhou: { name: "广州", lat: 23.1, lng: 113.3 },
  xian: { name: "西安", lat: 34.3, lng: 108.9 },
};

const CONDITIONS: Array<WeatherForecast["condition"]> = ["sunny", "cloudy", "partly_cloudy", "rainy", "stormy", "foggy"];

function generateForecast(city: string, days: number): WeatherForecast[] {
  const result: WeatherForecast[] = [];
  const base = CITIES[city] ?? CITIES["beijing"]!;
  const baseTemp = base.lat > 35 ? 22 : base.lat > 25 ? 28 : base.lat > 20 ? 24 : 18;
  for (let i = 0; i < days; i++) {
    const date = new Date(); date.setDate(date.getDate() + i);
    const high = baseTemp + Math.floor(Math.random() * 8) - 2;
    const low = high - 5 - Math.floor(Math.random() * 5);
    result.push({
      date: date.toISOString().slice(0, 10),
      temperature: { high, low },
      condition: CONDITIONS[Math.floor(Math.random() * CONDITIONS.length)]!,
      windSpeed: Math.floor(Math.random() * 20) + 2,
      uvIndex: Math.floor(Math.random() * 11),
      precipitationProbability: Math.floor(Math.random() * 80),
    });
  }
  return result;
}

@Injectable()
export class WeatherService {
  async forecast(query: WeatherQueryDto) {
    const city = query.city ?? "beijing";
    const days = Math.min(query.days ?? 7, 15);
    const cityInfo = CITIES[city] ?? CITIES["beijing"]!;
    return { city: cityInfo.name, coordinates: { lat: cityInfo.lat, lng: cityInfo.lng }, forecast: generateForecast(city, days) };
  }
  async cities() { return Object.entries(CITIES).map(([slug, info]) => ({ slug, name: info.name })); }
}
