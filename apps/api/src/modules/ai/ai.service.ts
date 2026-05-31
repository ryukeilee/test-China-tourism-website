import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";
import type { TravelPlan } from "@chinavista/shared";
import type { LlmProvider, LlmMessage, LlmStreamChunk } from "./providers/llm-provider.interface";
import { OpenAiProvider } from "./providers/openai.provider";
import { DeepSeekProvider } from "./providers/deepseek.provider";
import {
  buildTravelPlannerSystemPrompt,
  buildTravelPlannerUserPrompt,
} from "./prompts/travel-planner.prompt";
import type { TravelPlanRequestDto } from "./dto/travel-plan.dto";
import type { ChatRequestDto } from "./dto/chat.dto";

const TRAVEL_CHAT_SYSTEM_PROMPT = `你是华景中国 (ChinaVista) 的 AI 旅行管家。你的职责是帮助用户规划中国境内的旅行。

你的能力包括：
- 推荐目的地、景点、酒店
- 提供旅行建议和攻略
- 回答天气、交通、美食等旅行相关问题
- 帮忙制定行程计划

规则：
1. 用中文回复，语气热情友好、专业可信
2. 回答要具体，提供可操作的建议
3. 如果不确定的信息，诚实告知并建议用户查询官方渠道
4. 提到价格时说明是大致参考价
5. 回答控制在200-500字，除非用户要求详细计划`;

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly providers: Map<string, LlmProvider> = new Map();
  private readonly defaultProvider: string;

  constructor(
    private readonly config: ConfigService,
    openai: OpenAiProvider,
    deepseek: DeepSeekProvider,
  ) {
    // Register available providers
    if (this.config.get<string>("ai.openai.apiKey")) {
      this.providers.set("openai", openai);
    }
    if (this.config.get<string>("ai.deepseek.apiKey")) {
      this.providers.set("deepseek", deepseek);
    }

    // Default: first available, preferring deepseek for cost
    this.defaultProvider =
      this.providers.has("deepseek") ? "deepseek" :
      this.providers.has("openai") ? "openai" :
      "none";

    this.logger.log(
      `AI providers: ${[...this.providers.keys()].join(", ") || "none"}`,
    );
  }

  private getProvider(name?: string): LlmProvider {
    const key = name ?? this.defaultProvider;
    const provider = this.providers.get(key);
    if (!provider) {
      throw new Error("没有可用的 AI 服务，请检查 API 密钥配置");
    }
    return provider;
  }

  /** Generate a complete travel plan */
  async generateTravelPlan(dto: TravelPlanRequestDto): Promise<TravelPlan> {
    const provider = this.getProvider();
    const messages: LlmMessage[] = [
      { role: "system", content: buildTravelPlannerSystemPrompt() },
      { role: "user", content: buildTravelPlannerUserPrompt(dto) },
    ];

    const startTime = Date.now();
    this.logger.log(
      `Generating plan: ${dto.duration}天 ${dto.origin} → budget ¥${dto.budget}`,
    );

    const raw = await provider.complete(messages, {
      temperature: 0.7,
      maxTokens: 4096,
    });

    const elapsed = Date.now() - startTime;
    this.logger.log(`Plan generated in ${elapsed}ms`);

    return this.parsePlanResponse(raw);
  }

  /** Parse LLM response into TravelPlan */
  private parsePlanResponse(raw: string): TravelPlan {
    // Try to extract JSON from the response (LLM might wrap in markdown)
    let json = raw.trim();

    // Remove markdown code fences if present
    const fenceMatch = json.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) {
      json = fenceMatch[1]!.trim();
    }

    try {
      const plan = JSON.parse(json) as TravelPlan;
      // Basic validation
      if (!plan.itinerary || !Array.isArray(plan.itinerary)) {
        throw new Error("行程数据格式不正确");
      }
      return plan;
    } catch (error) {
      this.logger.error(`Failed to parse plan JSON: ${String(error)}`);
      this.logger.debug(`Raw response: ${raw.slice(0, 500)}`);
      throw new Error("AI 生成的行程格式异常，请重试");
    }
  }

  /** Streaming chat completion */
  chat(dto: ChatRequestDto): Observable<LlmStreamChunk> {
    const provider = this.getProvider(dto.provider);
    const messages: LlmMessage[] = [
      { role: "system", content: TRAVEL_CHAT_SYSTEM_PROMPT },
    ];

    // Add history if provided
    if (dto.history) {
      for (const msg of dto.history) {
        messages.push({ role: msg.role, content: msg.content });
      }
    }

    // Add current message
    messages.push({ role: "user", content: dto.message });

    this.logger.log(`Chat: "${dto.message.slice(0, 80)}..."`);

    return provider.stream(messages, {
      temperature: 0.7,
      maxTokens: 2048,
    });
  }
}
