import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { TrainService } from "./train.service";
import { TrainQueryDto } from "./dto/train-query.dto";

@ApiTags("Train")
@Controller("train")
export class TrainController {
  constructor(private readonly svc: TrainService) {}
  @Get() @ApiOperation({ summary: "高铁搜索" }) list(@Query() q: TrainQueryDto) { return this.svc.list(q); }
  @Get("stations") @ApiOperation({ summary: "车站列表" }) stations() { return this.svc.stations(); }
}
