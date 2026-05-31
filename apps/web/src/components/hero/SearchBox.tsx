"use client";

import { Search, Sparkles, MapPin, Keyboard } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const EXAMPLE_QUERIES = [
  { label: "五一上海三日游", icon: "🏙️" },
  { label: "成都亲子游", icon: "🐼" },
  { label: "新疆自驾15天", icon: "🏔️" },
  { label: "北京故宫一日游", icon: "🏯" },
];

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isAIMode, setIsAIMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ctrl/Cmd+K keyboard shortcut to focus search
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
      }
    },
    [],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    const mode = isAIMode ? "ai" : "search";
    const params = new URLSearchParams({ q: query.trim(), mode });
    window.location.href = `/search?${params.toString()}`;
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
    setIsAIMode(true);
    inputRef.current?.focus();
  };

  return (
    <div
      className="w-full max-w-2xl animate-slide-up"
      style={{ animationDelay: "200ms" }}
    >
      <form onSubmit={handleSubmit} className="relative">
        {/* Search input group */}
        <div
          className={cn(
            "glass-surface flex items-center gap-2 rounded-2xl px-4 py-3.5 shadow-2xl transition-all duration-300 sm:px-5 sm:py-4",
            isFocused && "ring-2 ring-white/50 scale-[1.02]",
          )}
        >
          {/* Mode toggle */}
          <button
            type="button"
            onClick={() => setIsAIMode(!isAIMode)}
            className={cn(
              "flex shrink-0 items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-medium transition-all sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-sm",
              isAIMode
                ? "bg-accent text-white"
                : "bg-white/20 text-white/80 hover:bg-white/30",
            )}
            aria-label={isAIMode ? "AI 规划模式已开启" : "点击开启 AI 规划模式"}
            aria-pressed={isAIMode}
          >
            {isAIMode ? (
              <>
                <Sparkles size={16} />
                <span className="hidden sm:inline">AI 规划</span>
              </>
            ) : (
              <>
                <MapPin size={16} />
                <span className="hidden sm:inline">搜索</span>
              </>
            )}
          </button>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isAIMode ? "描述你的旅行愿望…" : "你想去哪里？"}
            className="min-w-0 flex-1 bg-transparent text-white placeholder-white/60 outline-none text-sm sm:text-body"
            aria-label={isAIMode ? "AI 规划：描述你的旅行愿望" : "搜索目的地"}
            role="combobox"
            aria-expanded={isFocused}
          />

          {/* Keyboard shortcut hint */}
          <kbd className="hidden rounded-lg border border-white/20 bg-white/10 px-2 py-0.5 text-xs text-white/50 sm:block">
            <Keyboard size={12} className="inline" />
          </kbd>

          {/* Submit */}
          <button
            type="submit"
            disabled={!query.trim()}
            className="shrink-0 rounded-xl bg-white/20 p-2 text-white transition-all hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-40 sm:p-2.5"
            aria-label="搜索"
          >
            <Search size={20} />
          </button>
        </div>
      </form>

      {/* Example queries */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {EXAMPLE_QUERIES.map((example) => (
          <button
            key={example.label}
            onClick={() => handleExampleClick(example.label)}
            className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40 sm:px-4 sm:py-2 sm:text-sm"
          >
            <span className="mr-1">{example.icon}</span>
            {example.label}
          </button>
        ))}
      </div>

      {/* Subtle keyboard shortcut hint */}
      <p className="mt-3 text-center text-xs text-white/40">
        按 <kbd className="rounded bg-white/10 px-1.5 py-0.5">⌘K</kbd> 快速搜索
      </p>
    </div>
  );
}
