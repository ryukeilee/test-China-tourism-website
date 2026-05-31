import { Controller, Get, Query, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { WeatherService } from "./weather.service";
import { WeatherQueryDto } from "./dto/weather-query.dto";

@ApiTags("Weather")
@Controller("weather")
export class WeatherController {
  constructor(private readonly svc: WeatherService) {}
  @Get() @ApiOperation({ summary: "天气预报" }) forecast(@Query() q: WeatherQueryDto) { return this.svc.forecast(q); }
  @Get("cities") @ApiOperation({ summary: "城市列表" }) cities() { return this.svc.cities(); }
  @Get(":city") @ApiOperation({ summary: "城市天气" }) cityForecast(@Param("city") city: string, @Query() q: WeatherQueryDto) { return this.svc.forecast({ ...q, city }); }
}
