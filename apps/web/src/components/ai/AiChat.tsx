"use client";

import { Sparkles, Send, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { streamPost } from "@/lib/api";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  compact?: boolean;
}

export function AiChat({ compact = false }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "你好！我是你的 AI 旅行管家 🏮\n\n可以问我任何关于中国旅游的问题，比如：\n- 推荐适合亲子游的目的地\n- 九寨沟最佳旅游时间\n- 帮我规划一个周末游",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    setError(null);
    const userMsg: Message = { role: "user", content: text };
    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setIsStreaming(true);

    abortRef.current = streamPost(
      "/ai/chat",
      {
        message: text,
        history: messages
          .filter((m) => m.content.length > 0)
          .map((m) => ({ role: m.role, content: m.content })),
      },
      // onChunk
      (chunk) => {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.role === "assistant") {
            updated[updated.length - 1] = {
              ...last,
              content: last.content + chunk,
            };
          }
          return updated;
        });
      },
      // onError
      (err) => {
        setError(err);
        setIsStreaming(false);
      },
      // onDone
      () => {
        setIsStreaming(false);
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const stopStreaming = () => {
    abortRef.current?.abort();
    setIsStreaming(false);
  };

  return (
    <div className={cn("flex flex-col", compact ? "h-[300px]" : "h-full")}>
      {/* Header */}
      {!compact && (
        <div className="flex items-center gap-2 border-b border-surface-muted pb-3">
          <Sparkles size={18} className="text-accent" />
          <span className="font-semibold text-sm">AI 旅行管家</span>
        </div>
      )}

      {compact && (
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Sparkles size={16} className="text-accent" />
          快速咨询
        </h4>
      )}

      {/* Error */}
      {error && (
        <div className="mb-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
          <button onClick={() => setError(null)} className="ml-2 underline">
            关闭
          </button>
        </div>
      )}

      {/* Messages */}
      <div
        ref={scrollRef}
        className={cn(
          "flex-1 space-y-3 overflow-y-auto",
          compact ? "max-h-[200px]" : "mb-4",
        )}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-2",
              msg.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            {msg.role === "assistant" && (
              <span className="mt-1 shrink-0 rounded-lg bg-accent/10 p-1">
                <Sparkles size={14} className="text-accent" />
              </span>
            )}
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                msg.role === "user"
                  ? "bg-accent text-white"
                  : "bg-surface-muted text-ink",
              )}
            >
              {msg.content || (isStreaming && i === messages.length - 1 && (
                <span className="inline-block h-4 w-1 animate-pulse bg-accent" />
              ))}
            </div>
            {msg.role === "user" && (
              <span className="mt-1 shrink-0 rounded-lg bg-surface-muted p-1">
                <User size={14} className="text-ink-muted" />
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-end gap-2 border-t border-surface-muted pt-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="问任何旅行问题…"
          rows={compact ? 1 : 2}
          className="min-h-[2.5rem] flex-1 resize-none rounded-xl border border-surface-muted bg-surface-elevated px-4 py-2.5 text-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20"
          disabled={isStreaming}
        />
        {isStreaming ? (
          <button
            onClick={stopStreaming}
            className="shrink-0 rounded-xl bg-red-100 p-2.5 text-red-500 transition-all hover:bg-red-200"
            aria-label="停止生成"
          >
            <span className="block h-4 w-4 rounded-sm bg-red-500" />
          </button>
        ) : (
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="shrink-0 rounded-xl bg-accent p-2.5 text-white transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="发送消息"
          >
            <Send size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
