import { Injectable, CanActivate, ExecutionContext, BadRequestException } from "@nestjs/common";
import type { Request } from "express";

// Patterns that indicate prompt injection attempts
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|above|prior)\s+(instructions?|prompts?|messages?)/i,
  /disregard\s+(all\s+)?(previous|above|prior)\s+(instructions?|prompts?|messages?)/i,
  /forget\s+(all\s+)?(previous|above|prior)\s+(instructions?|prompts?|messages?)/i,
  /you\s+are\s+now\s+(a\s+)?(different|new)\s+(ai|assistant|model|persona)/i,
  /system\s*:\s*/i,
  /<\|system\|>/i,
  /\[system\]/i,
  /\[INST\].*\[\/INST\]/i,
  /<\|im_start\|>/i,
  /<\|im_end\|>/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /act\s+as\s+(if\s+)?(you\s+are|a\s+different)/i,
  /you\s+must\s+(follow|obey|comply)/i,
  /override\s+(all\s+)?(previous\s+)?instructions/i,
];

const MAX_INPUT_LENGTH = 8000;

@Injectable()
export class SanitizeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const body = request.body as Record<string, unknown>;

    // Check all string fields in the body
    for (const [key, value] of Object.entries(body)) {
      if (typeof value !== "string") continue;

      // Length check
      if (value.length > MAX_INPUT_LENGTH) {
        throw new BadRequestException(`输入内容过长，请限制在${MAX_INPUT_LENGTH}字以内`);
      }

      // Injection detection
      for (const pattern of INJECTION_PATTERNS) {
        if (pattern.test(value)) {
          throw new BadRequestException("输入内容包含不安全的指令，请重新描述您的需求");
        }
      }

      // Check nested history array
      if (key === "history" && Array.isArray(body.history)) {
        for (const msg of body.history as Array<{ content?: string }>) {
          if (!msg.content) continue;
          if (msg.content.length > MAX_INPUT_LENGTH) {
            throw new BadRequestException("历史消息过长");
          }
          for (const pattern of INJECTION_PATTERNS) {
            if (pattern.test(msg.content)) {
              throw new BadRequestException("历史消息包含不安全的指令");
            }
          }
        }
      }
    }

    return true;
  }
}
