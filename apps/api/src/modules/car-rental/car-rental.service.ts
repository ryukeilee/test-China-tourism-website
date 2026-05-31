import { Injectable } from "@nestjs/common";
import type { CarQueryDto } from "./dto/car-query.dto";

export interface Car { id: string; name: string; category: string; price: number; seats: number; transmission: string; provider: string; city: string; image?: string; }

const MOCK_CARS: Car[] = [
  { id: "car-1", name: "丰田卡罗拉", category: "economy", price: 198, seats: 5, transmission: "自动", provider: "神州租车", city: "上海" },
  { id: "car-2", name: "大众帕萨特", category: "business", price: 398, seats: 5, transmission: "自动", provider: "一嗨租车", city: "上海" },
  { id: "car-3", name: "丰田RAV4", category: "suv", price: 498, seats: 5, transmission: "自动", provider: "神州租车", city: "北京" },
  { id: "car-4", name: "奔驰C级", category: "luxury", price: 888, seats: 5, transmission: "自动", provider: "一嗨租车", city: "上海" },
  { id: "car-5", name: "本田飞度", category: "economy", price: 158, seats: 5, transmission: "手动", provider: "神州租车", city: "成都" },
  { id: "car-6", name: "别克GL8", category: "business", price: 598, seats: 7, transmission: "自动", provider: "一嗨租车", city: "北京" },
];

@Injectable()
export class CarRentalService {
  async list(query: CarQueryDto) {
    let items = MOCK_CARS;
    if (query.city) items = items.filter((c) => c.city === query.city);
    if (query.category) items = items.filter((c) => c.category === query.category);
    const page = query.page ?? 1; const limit = query.limit ?? 12;
    return { items: items.slice((page - 1) * limit, (page - 1) * limit + limit), total: items.length, page, limit, totalPages: Math.ceil(items.length / limit) };
  }
  async cities() { return ["上海", "北京", "成都", "广州", "深圳", "杭州", "三亚"]; }
}
