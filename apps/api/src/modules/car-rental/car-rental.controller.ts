import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CarRentalService } from "./car-rental.service";
import { CarQueryDto } from "./dto/car-query.dto";

@ApiTags("CarRental")
@Controller("car-rental")
export class CarRentalController {
  constructor(private readonly svc: CarRentalService) {}
  @Get() @ApiOperation({ summary: "租车列表" }) list(@Query() q: CarQueryDto) { return this.svc.list(q); }
  @Get("cities") @ApiOperation({ summary: "城市列表" }) cities() { return this.svc.cities(); }
}
