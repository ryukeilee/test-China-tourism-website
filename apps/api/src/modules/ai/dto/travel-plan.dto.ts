import { IsInt, IsString, IsArray, IsOptional, Min, Max, MaxLength } from "class-validator";

export class TravelPlanRequestDto {
  @IsInt()
  @Min(500)
  @Max(1000000)
  budget!: number;

  @IsInt()
  @Min(1)
  @Max(50)
  travelers!: number;

  @IsString()
  @MaxLength(100)
  origin!: string;

  @IsArray()
  @IsString({ each: true })
  @MaxLength(20, { each: true })
  preferences!: string[];

  @IsInt()
  @Min(1)
  @Max(30)
  duration!: number;

  @IsOptional()
  @IsString()
  startDate?: string;
}
