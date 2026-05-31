import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import type { HotelQueryDto } from "./dto/hotel-query.dto";
import type { Hotel } from "@chinavista/shared";

@Injectable()
export class HotelService {
  constructor(private readonly db: PrismaService) {}

  async list(query: HotelQueryDto) {
    const { search, city, category, priceMin, priceMax, page = 1, limit = 12 } = query;
    const skip = (page - 1) * limit;
    const where: Record<string, unknown> = {};
    if (search) where.OR = [{ name: { contains: search } }, { city: { contains: search } }, { province: { contains: search } }];
    if (city) where.city = city;
    if (category) {
      const catMap: Record<string, string> = { "5star": "FIVE_STAR", "4star": "FOUR_STAR", "3star": "THREE_STAR", boutique: "BOUTIQUE", hostel: "HOSTEL" };
      where.category = catMap[category] ?? category;
    }
    if (priceMin !== undefined) where.priceMin = { gte: priceMin };
    if (priceMax !== undefined) where.priceMax = { lte: priceMax };

    const [items, total] = await Promise.all([
      this.db.hotel.findMany({ where, skip, take: limit, orderBy: { rating: "desc" },
        include: { images: { orderBy: { sortOrder: "asc" }, take: 3 }, rooms: true, amenities: true } }),
      this.db.hotel.count({ where }),
    ]);
    return { items: items.map((h) => this.format(h)), total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async bySlug(slug: string) {
    const hotel = await this.db.hotel.findUnique({ where: { slug },
      include: { images: { orderBy: { sortOrder: "asc" } }, rooms: true, amenities: true } });
    if (!hotel) throw new NotFoundException("酒店未找到");
    return this.format(hotel);
  }

  private format(h: Awaited<ReturnType<typeof this.db.hotel.findUnique>> & {
    images?: Array<{ url: string }>; rooms?: Array<{ id: string; name: string; price: number; bedType: string; maxGuests: number; available: boolean }>;
    amenities?: Array<{ type: string }>;
  }): Hotel {
    if (!h) throw new NotFoundException();
    const catMap: Record<string, Hotel["category"]> = { FIVE_STAR: "5star", FOUR_STAR: "4star", THREE_STAR: "3star", BOUTIQUE: "boutique", HOSTEL: "hostel" };
    return {
      id: h.id, slug: h.slug, name: h.name, category: catMap[h.category] ?? "4star", city: h.city, province: h.province,
      images: (h.images ?? []).map((img) => img.url), vrTourUrl: h.vrTourUrl ?? undefined,
      rooms: (h.rooms ?? []).map((r) => ({ id: r.id, name: r.name, price: r.price, bedType: r.bedType, maxGuests: r.maxGuests, available: r.available })),
      amenities: (h.amenities ?? []).map((a) => a.type as Hotel["amenities"][number]),
      rating: h.rating, reviewCount: h.reviewCount, priceRange: { min: h.priceMin, max: h.priceMax },
    };
  }
}
