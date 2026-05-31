import { Injectable } from "@nestjs/common";
import type { FlightQueryDto } from "./dto/flight-query.dto";
import type { Flight } from "@chinavista/shared";

const MOCK_FLIGHTS: Flight[] = [
  { id: "mu-5101", airline: "东方航空", flightNumber: "MU5101", departure: { city: "上海", airport: "浦东国际机场", time: "2026-06-15T08:00:00" }, arrival: { city: "北京", airport: "首都国际机场", time: "2026-06-15T10:30:00" }, price: 1280, stops: 0, duration: 150 },
  { id: "ca-1501", airline: "中国国航", flightNumber: "CA1501", departure: { city: "上海", airport: "虹桥国际机场", time: "2026-06-15T09:00:00" }, arrival: { city: "北京", airport: "首都国际机场", time: "2026-06-15T11:15:00" }, price: 1350, stops: 0, duration: 135 },
  { id: "cz-3501", airline: "南方航空", flightNumber: "CZ3501", departure: { city: "上海", airport: "浦东国际机场", time: "2026-06-15T14:00:00" }, arrival: { city: "北京", airport: "大兴国际机场", time: "2026-06-15T16:20:00" }, price: 1080, stops: 0, duration: 140 },
  { id: "mu-5102", airline: "东方航空", flightNumber: "MU5102", departure: { city: "北京", airport: "首都国际机场", time: "2026-06-15T18:00:00" }, arrival: { city: "上海", airport: "浦东国际机场", time: "2026-06-15T20:15:00" }, price: 1320, stops: 0, duration: 135 },
  { id: "ca-4500", airline: "中国国航", flightNumber: "CA4500", departure: { city: "上海", airport: "浦东国际机场", time: "2026-06-15T07:00:00" }, arrival: { city: "成都", airport: "天府国际机场", time: "2026-06-15T10:10:00" }, price: 1680, stops: 0, duration: 190 },
  { id: "cz-6800", airline: "南方航空", flightNumber: "CZ6800", departure: { city: "上海", airport: "虹桥国际机场", time: "2026-06-15T11:00:00" }, arrival: { city: "三亚", airport: "凤凰国际机场", time: "2026-06-15T14:10:00" }, price: 2100, stops: 0, duration: 190 },
];

@Injectable()
export class FlightService {
  async list(query: FlightQueryDto) {
    let items = MOCK_FLIGHTS;
    if (query.from) items = items.filter((f) => f.departure.city.includes(query.from!));
    if (query.to) items = items.filter((f) => f.arrival.city.includes(query.to!));
    const page = query.page ?? 1;
    const limit = query.limit ?? 12;
    const start = (page - 1) * limit;
    return { items: items.slice(start, start + limit), total: items.length, page, limit, totalPages: Math.ceil(items.length / limit) };
  }
  async cities() {
    const fromSet = new Set(MOCK_FLIGHTS.map((f) => f.departure.city));
    const toSet = new Set(MOCK_FLIGHTS.map((f) => f.arrival.city));
    return { from: [...fromSet].sort(), to: [...toSet].sort() };
  }
}
