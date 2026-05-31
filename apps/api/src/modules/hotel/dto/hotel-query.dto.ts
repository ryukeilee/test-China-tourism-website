import { IsOptional, IsString, IsInt, Min, Max } from "class-validator";
import { Type } from "class-transformer";

export class HotelQueryDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsInt() @Min(0) @Type(() => Number) priceMin?: number;
  @IsOptional() @IsInt() @Min(0) @Type(() => Number) priceMax?: number;
  @IsOptional() @IsInt() @Min(1) @Max(100) @Type(() => Number) limit?: number = 12;
  @IsOptional() @IsInt() @Min(1) @Type(() => Number) page?: number = 1;
}
