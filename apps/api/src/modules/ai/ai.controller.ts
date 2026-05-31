import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Res,
  Header,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import type { Response } from "express";
import { AiService } from "./ai.service";
import { TravelPlanRequestDto } from "./dto/travel-plan.dto";
import { ChatRequestDto } from "./dto/chat.dto";
import { SanitizeGuard } from "./guards/sanitize.guard";

@ApiTags("AI")
@Controller("ai")
@UseGuards(SanitizeGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post("plan")
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @ApiOperation({ summary: "生成 AI 旅行计划" })
  @ApiResponse({ status: 200, description: "旅行计划 JSON" })
  @ApiResponse({ status: 400, description: "输入不合法" })
  @ApiResponse({ status: 429, description: "请求过于频繁" })
  async plan(@Body() dto: TravelPlanRequestDto) {
    return this.aiService.generateTravelPlan(dto);
  }

  @Post("chat")
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { ttl: 60000, limit: 20 } })
  @Header("Content-Type", "text/event-stream")
  @Header("Cache-Control", "no-cache")
  @Header("Connection", "keep-alive")
  @Header("X-Accel-Buffering", "no")
  @ApiOperation({ summary: "AI 旅行助手对话（流式）" })
  @ApiResponse({ status: 200, description: "SSE 流式响应" })
  async chat(@Body() dto: ChatRequestDto, @Res() res: Response) {
    res.flushHeaders();

    const subscription = this.aiService.chat(dto).subscribe({
      next: (chunk) => {
        res.write(`data: ${JSON.stringify(chunk)}\n\n`);
      },
      error: (error: unknown) => {
        const message =
          error instanceof Error ? error.message : "AI 服务异常";
        res.write(
          `data: ${JSON.stringify({ content: "", error: message, done: true })}\n\n`,
        );
        res.end();
      },
      complete: () => {
        res.end();
      },
    });

    // Handle client disconnect
    res.on("close", () => {
      subscription.unsubscribe();
    });
  }
}
