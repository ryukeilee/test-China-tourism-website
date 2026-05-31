import { IsOptional, IsString, IsInt, Min, Max } from "class-validator";
import { Type } from "class-transformer";
export class FlightQueryDto {
  @IsOptional() @IsString() from?: string;
  @IsOptional() @IsString() to?: string;
  @IsOptional() @IsString() date?: string;
  @IsOptional() @IsString() type?: string;
  @IsOptional() @IsInt() @Min(1) @Max(100) @Type(() => Number) limit?: number = 12;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) page?: number = 1;
}
