import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable, Subscriber } from "rxjs";
import type { LlmProvider, LlmMessage, LlmCompleteOptions, LlmStreamChunk } from "./llm-provider.interface";

@Injectable()
export class DeepSeekProvider implements LlmProvider {
  readonly name = "deepseek";
  private readonly logger = new Logger(DeepSeekProvider.name);
  private readonly apiKey: string;
  private readonly baseUrl = "https://api.deepseek.com/v1";

  constructor(private readonly config: ConfigService) {
    this.apiKey = this.config.get<string>("ai.deepseek.apiKey") ?? "";
  }

  async complete(messages: LlmMessage[], options?: LlmCompleteOptions): Promise<string> {
    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: options?.model ?? "deepseek-chat",
        messages,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 4096,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      this.logger.error(`DeepSeek API error: ${res.status} ${err}`);
      throw new Error(`AI 服务暂时不可用 (${res.status})`);
    }

    const data = (await res.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    return data.choices[0]?.message.content ?? "";
  }

  stream(
    messages: LlmMessage[],
    options?: LlmCompleteOptions,
  ): Observable<LlmStreamChunk> {
    return new Observable((subscriber: Subscriber<LlmStreamChunk>) => {
      void (async () => {
        try {
          const res = await fetch(`${this.baseUrl}/chat/completions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
              model: options?.model ?? "deepseek-chat",
              messages,
              temperature: options?.temperature ?? 0.7,
              max_tokens: options?.maxTokens ?? 4096,
              stream: true,
            }),
          });

          if (!res.ok) {
            subscriber.error(new Error(`AI 服务暂时不可用 (${res.status})`));
            return;
          }

          const reader = res.body?.getReader();
          if (!reader) {
            subscriber.error(new Error("无法读取流式响应"));
            return;
          }

          const decoder = new TextDecoder();
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data: ")) continue;
              const json = trimmed.slice(6);
              if (json === "[DONE]") {
                subscriber.next({ content: "", done: true });
                subscriber.complete();
                return;
              }

              try {
                const parsed = JSON.parse(json) as {
                  choices: Array<{ delta: { content?: string } }>;
                };
                const content = parsed.choices[0]?.delta.content;
                if (content) {
                  subscriber.next({ content, done: false });
                }
              } catch {
                // Skip unparseable chunks
              }
            }
          }

          subscriber.next({ content: "", done: true });
          subscriber.complete();
        } catch (error) {
          subscriber.error(error);
        }
      })();
    });
  }
}
