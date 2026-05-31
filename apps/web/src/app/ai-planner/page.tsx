"use client";

import type { TravelPlan } from "@chinavista/shared";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AiChat } from "@/components/ai/AiChat";
import { AiPlannerForm } from "@/components/ai/AiPlannerForm";
import { TravelPlanResult } from "@/components/ai/TravelPlanResult";
import { post } from "@/lib/api";

export default function AiPlannerPage() {
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: {
    budget: number;
    travelers: number;
    origin: string;
    preferences: string[];
    duration: number;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await post<TravelPlan>("/ai/plan", data);
      setPlan(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "规划失败，请稍后重试",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="border-b border-surface-muted bg-surface-elevated">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-ink-muted hover:text-ink transition-colors"
          >
            <ArrowLeft size={18} />
            首页
          </Link>
          <h1 className="flex items-center gap-2 font-display text-xl font-bold">
            <Sparkles size={22} className="text-accent" />
            AI 行程规划
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Form column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="surface-card p-6">
                <h2 className="mb-6 font-semibold text-lg">
                  告诉我你的旅行需求
                </h2>
                <AiPlannerForm
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>

              {/* Quick chat preview */}
              <div className="mt-6 surface-card p-6">
                <AiChat compact />
              </div>
            </div>
          </div>

          {/* Results column */}
          <div className="lg:col-span-2">
            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-6">
                <p className="font-medium text-red-700">规划失败</p>
                <p className="mt-1 text-red-600 text-sm">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-3 text-sm font-medium text-red-700 underline"
                >
                  关闭
                </button>
              </div>
            )}

            {!plan && !isLoading && !error && (
              <div className="flex h-[400px] flex-col items-center justify-center rounded-2xl bg-surface-muted text-center">
                <Sparkles size={48} className="text-ink-muted/30" />
                <p className="mt-4 text-ink-muted text-lg">
                  在左侧填写旅行需求
                </p>
                <p className="mt-1 text-ink-muted text-sm">
                  AI 将为你生成详细的旅行计划
                </p>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-surface-muted border-t-accent" />
                <p className="mt-6 text-ink-muted text-lg">
                  AI 正在为你规划行程…
                </p>
                <p className="mt-2 text-ink-muted text-sm">
                  这可能需要 10-30 秒
                </p>
              </div>
            )}

            {plan && <TravelPlanResult plan={plan} />}
          </div>
        </div>
      </div>
    </div>
  );
}
