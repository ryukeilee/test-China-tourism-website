import { IsOptional, IsString, IsInt, Min, Max } from "class-validator";
import { Type } from "class-transformer";
export class WeatherQueryDto {
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsInt() @Min(1) @Max(15) @Type(() => Number) days?: number = 7;
}
