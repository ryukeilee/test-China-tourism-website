import { IsString, IsOptional, MaxLength, IsArray, ValidateNested, IsIn } from "class-validator";
import { Type } from "class-transformer";

class ChatMessageDto {
  @IsString()
  @IsIn(["user", "assistant", "system"])
  role!: "user" | "assistant" | "system";

  @IsString()
  @MaxLength(4000)
  content!: string;
}

export class ChatRequestDto {
  @IsString()
  @MaxLength(4000)
  message!: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  history?: ChatMessageDto[];

  @IsOptional()
  @IsString()
  @IsIn(["openai", "deepseek", "qwen"])
  provider?: string;
}
