import type { Observable } from "rxjs";

export interface LlmMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface LlmCompleteOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface LlmStreamChunk {
  content: string;
  done: boolean;
}

export interface LlmProvider {
  readonly name: string;
  /** Non-streaming completion */
  complete(
    messages: LlmMessage[],
    options?: LlmCompleteOptions,
  ): Promise<string>;
  /** Streaming completion */
  stream(
    messages: LlmMessage[],
    options?: LlmCompleteOptions,
  ): Observable<LlmStreamChunk>;
}
