import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { ScenicService } from "./scenic.service";
import { ScenicQueryDto } from "./dto/scenic-query.dto";

@ApiTags("Scenic")
@Controller("scenic")
export class ScenicController {
  constructor(private readonly scenicService: ScenicService) {}

  @Get()
  @ApiOperation({ summary: "景点列表（分页+筛选）" })
  async list(@Query() query: ScenicQueryDto) {
    return this.scenicService.list(query);
  }

  @Get("provinces")
  @ApiOperation({ summary: "获取所有省份列表" })
  async provinces() {
    return this.scenicService.provinces();
  }

  @Get(":slug")
  @ApiOperation({ summary: "景点详情" })
  async detail(@Param("slug") slug: string) {
    return this.scenicService.bySlug(slug);
  }
}
