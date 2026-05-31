import { Sparkles, Map, Hotel, Plane, CloudSun } from "lucide-react";
import Link from "next/link";

const CAPABILITIES = [
  {
    icon: Map,
    title: "智能行程规划",
    description: "输入预算和偏好，AI 自动生成完整旅行计划",
  },
  {
    icon: Hotel,
    title: "个性化推荐",
    description: "基于你的喜好推荐酒店、景点和美食",
  },
  {
    icon: Plane,
    title: "一键预订",
    description: "机票、酒店、门票一站式比价和预订",
  },
  {
    icon: CloudSun,
    title: "实时天气",
    description: "15天天气预报，助你选择最佳出行时间",
  },
];

export function AIAssistantTeaser() {
  return (
    <section
      className="py-section px-gutter bg-surface-muted"
      aria-labelledby="ai-heading"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            <Sparkles size={16} />
            AI 旅行管家
          </span>
          <h2
            id="ai-heading"
            className="mt-6 font-display text-display text-balance"
          >
            让 AI 成为你的私人旅行规划师
          </h2>
          <p className="mt-4 text-ink-muted text-body">
            只需告诉 AI 你的想法，剩下的交给我们
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="surface-card group flex flex-col items-center p-8 text-center"
            >
              <div className="rounded-2xl bg-accent/10 p-4 text-accent transition-transform duration-300 group-hover:scale-110">
                <cap.icon size={28} />
              </div>
              <h3 className="mt-5 font-semibold text-lg">{cap.title}</h3>
              <p className="mt-2 text-ink-muted text-sm">{cap.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/ai-planner"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-white font-medium transition-all hover:bg-accent/90 hover:scale-105 active:scale-95"
          >
            <Sparkles size={20} />
            开始 AI 规划
          </Link>
        </div>
      </div>
    </section>
  );
}
