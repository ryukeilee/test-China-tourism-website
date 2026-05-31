import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { HotelService } from "./hotel.service";
import { HotelQueryDto } from "./dto/hotel-query.dto";

@ApiTags("Hotel")
@Controller("hotel")
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get()
  @ApiOperation({ summary: "酒店列表" })
  list(@Query() query: HotelQueryDto) { return this.hotelService.list(query); }

  @Get(":slug")
  @ApiOperation({ summary: "酒店详情" })
  detail(@Param("slug") slug: string) { return this.hotelService.bySlug(slug); }
}
