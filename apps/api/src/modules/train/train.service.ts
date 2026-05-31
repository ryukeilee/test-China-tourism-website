import { Injectable } from "@nestjs/common";
import type { TrainQueryDto } from "./dto/train-query.dto";
import type { TrainTicket } from "@chinavista/shared";

const MOCK_TRAINS: TrainTicket[] = [
  { id: "g-1", trainNumber: "G6", type: "G", departure: { station: "上海虹桥", time: "2026-06-15T08:00:00" }, arrival: { station: "北京南", time: "2026-06-15T12:24:00" }, seats: [{ type: "business", price: 1748, available: 12 }, { type: "first", price: 933, available: 45 }, { type: "second", price: 553, available: 120 }] },
  { id: "g-2", trainNumber: "G10", type: "G", departure: { station: "上海虹桥", time: "2026-06-15T10:00:00" }, arrival: { station: "北京南", time: "2026-06-15T14:28:00" }, seats: [{ type: "business", price: 1748, available: 8 }, { type: "first", price: 933, available: 23 }, { type: "second", price: 553, available: 87 }] },
  { id: "d-1", trainNumber: "D310", type: "D", departure: { station: "上海", time: "2026-06-15T21:00:00" }, arrival: { station: "北京", time: "2026-06-16T07:00:00" }, seats: [{ type: "first", price: 498, available: 30 }, { type: "second", price: 309, available: 200 }] },
  { id: "g-3", trainNumber: "G130", type: "G", departure: { station: "上海虹桥", time: "2026-06-15T07:00:00" }, arrival: { station: "杭州东", time: "2026-06-15T07:52:00" }, seats: [{ type: "first", price: 117, available: 60 }, { type: "second", price: 73, available: 180 }] },
  { id: "g-4", trainNumber: "G360", type: "G", departure: { station: "上海虹桥", time: "2026-06-15T13:00:00" }, arrival: { station: "南京南", time: "2026-06-15T14:00:00" }, seats: [{ type: "business", price: 438, available: 15 }, { type: "first", price: 228, available: 50 }, { type: "second", price: 135, available: 160 }] },
];

@Injectable()
export class TrainService {
  async list(query: TrainQueryDto) {
    let items = MOCK_TRAINS;
    if (query.from) items = items.filter((t) => t.departure.station.includes(query.from!));
    if (query.to) items = items.filter((t) => t.arrival.station.includes(query.to!));
    const page = query.page ?? 1; const limit = query.limit ?? 12;
    const start = (page - 1) * limit;
    return { items: items.slice(start, start + limit), total: items.length, page, limit, totalPages: Math.ceil(items.length / limit) };
  }
  async stations() { return ["上海虹桥", "上海", "北京南", "北京", "杭州东", "南京南", "广州南", "深圳北", "成都东", "西安北"]; }
}
