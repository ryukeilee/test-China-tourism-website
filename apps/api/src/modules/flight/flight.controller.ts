import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { FlightService } from "./flight.service";
import { FlightQueryDto } from "./dto/flight-query.dto";

@ApiTags("Flight")
@Controller("flight")
export class FlightController {
  constructor(private readonly svc: FlightService) {}
  @Get() @ApiOperation({ summary: "机票搜索" }) list(@Query() q: FlightQueryDto) { return this.svc.list(q); }
  @Get("cities") @ApiOperation({ summary: "城市列表" }) cities() { return this.svc.cities(); }
}
