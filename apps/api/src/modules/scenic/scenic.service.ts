import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import type { ScenicQueryDto } from "./dto/scenic-query.dto";
import type { ScenicSpot } from "@chinavista/shared";

@Injectable()
export class ScenicService {
  constructor(private readonly db: PrismaService) {}

  async list(query: ScenicQueryDto) {
    const { search, province, season, page = 1, limit = 20, sort = "rating" } = query;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { city: { contains: search } },
        { province: { contains: search } },
        { description: { contains: search } },
      ];
    }
    if (province) where.province = province;
    if (season) where.bestSeasons = { contains: season };

    const [items, total] = await Promise.all([
      this.db.scenicSpot.findMany({
        where,
        skip,
        take: limit,
        orderBy: sort === "name" ? { name: "asc" } : sort === "reviewCount" ? { reviewCount: "desc" } : { rating: "desc" },
        include: { images: { orderBy: { sortOrder: "asc" }, take: 3 } },
      }),
      this.db.scenicSpot.count({ where }),
    ]);

    return {
      items: items.map(this.format),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async bySlug(slug: string) {
    const spot = await this.db.scenicSpot.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        facilities: true,
      },
    });

    if (!spot) throw new NotFoundException("景点未找到");

    return this.format(spot);
  }

  async provinces(): Promise<string[]> {
    const result = await this.db.scenicSpot.findMany({
      select: { province: true },
      distinct: ["province"],
      orderBy: { province: "asc" },
    });
    return result.map((r) => r.province);
  }

  /** Extract numeric rating from reviews and compute average */
  async updateRating(scenicId: string) {
    const agg = await this.db.review.aggregate({
      where: { targetType: "scenic", targetId: scenicId },
      _avg: { rating: true },
      _count: { rating: true },
    });
    await this.db.scenicSpot.update({
      where: { id: scenicId },
      data: {
        rating: agg._avg.rating ?? 0,
        reviewCount: agg._count.rating,
      },
    });
  }

  private format(
    spot: Awaited<ReturnType<typeof this.db.scenicSpot.findUnique>> & {
      images?: Array<{ url: string; alt?: string | null }>;
      facilities?: Array<{
        type: string;
        name: string;
        latitude: number;
        longitude: number;
      }>;
    },
  ): ScenicSpot {
    if (!spot) throw new NotFoundException();
    return {
      id: spot.id,
      slug: spot.slug,
      name: spot.name,
      nameEn: spot.nameEn ?? undefined,
      province: spot.province,
      city: spot.city,
      description: spot.description,
      images: (spot.images ?? []).map((img) => img.url),
      videoUrl: undefined,
      ticketPrice: spot.ticketPrice,
      openingHours: spot.openingHours,
      bestSeasons: JSON.parse(spot.bestSeasons) as string[],
      tips: spot.tips,
      rating: spot.rating,
      reviewCount: spot.reviewCount,
      aiSummary: spot.aiSummary ?? undefined,
      coordinates: { lat: spot.latitude, lng: spot.longitude },
      facilities: (spot.facilities ?? []).map((f) => ({
        type: f.type as ScenicSpot["facilities"][number]["type"],
        name: f.name,
        coordinates: { lat: f.latitude, lng: f.longitude },
      })),
    };
  }
}
