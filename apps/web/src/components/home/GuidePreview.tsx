import { Camera, Footprints, Users, Compass } from "lucide-react";
import Link from "next/link";

const GUIDES = [
  {
    icon: Compass,
    category: "自由行",
    title: "云南大理丽江7日自由行攻略",
    description: "苍山洱海，古城漫步，体验最地道的云南慢生活",
    href: "/guide/yunnan-7day",
  },
  {
    icon: Users,
    category: "亲子",
    title: "广州长隆+珠海海洋王国亲子攻略",
    description: "最适合带娃的广东双城游，孩子玩到不想走",
    href: "/guide/guangzhou-zhuhai-family",
  },
  {
    icon: Camera,
    category: "摄影",
    title: "霞浦滩涂摄影全攻略",
    description: "中国最美滩涂，日出日落最佳拍摄点一网打尽",
    href: "/guide/xiapu-photography",
  },
  {
    icon: Footprints,
    category: "徒步",
    title: "虎跳峡徒步2日经典路线",
    description: "世界十大经典徒步路线之一，震撼峡谷风光",
    href: "/guide/tiger-leaping-gorge",
  },
];

export function GuidePreview() {
  return (
    <section className="py-section px-gutter" aria-labelledby="guides-heading">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex items-end justify-between">
          <div>
            <h2
              id="guides-heading"
              className="font-display text-display text-balance"
            >
              精选旅游攻略
            </h2>
            <p className="mt-3 text-ink-muted text-body">
              AI 精选 + 真实玩家分享，让你的旅行更精彩
            </p>
          </div>
          <Link
            href="/guide"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-accent hover:underline sm:flex"
          >
            查看全部攻略
            <span aria-hidden="true">→</span>
          </Link>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GUIDES.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="surface-card group flex flex-col p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-xl bg-accent/10 p-2 text-accent">
                  <guide.icon size={20} />
                </span>
                <span className="text-xs font-medium text-accent uppercase tracking-wide">
                  {guide.category}
                </span>
              </div>
              <h3 className="font-semibold leading-snug group-hover:text-accent transition-colors">
                {guide.title}
              </h3>
              <p className="mt-2 text-ink-muted text-sm flex-1">
                {guide.description}
              </p>
              <span className="mt-4 text-sm font-medium text-accent">
                查看详情 →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/guide"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent"
          >
            查看全部攻略 →
          </Link>
        </div>
      </div>
    </section>
  );
}
