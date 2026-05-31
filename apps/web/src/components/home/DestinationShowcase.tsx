import Link from "next/link";

const DESTINATIONS = [
  {
    slug: "jiuzhaigou",
    name: "九寨沟",
    province: "四川·阿坝",
    tagline: "人间仙境，童话世界",
    gradient: "from-emerald-500/20 to-teal-600/10",
    stat: "年均游客 500万+",
  },
  {
    slug: "zhangjiajie",
    name: "张家界",
    province: "湖南·张家界",
    tagline: "阿凡达悬浮山取景地",
    gradient: "from-stone-500/20 to-green-600/10",
    stat: "世界自然遗产",
  },
  {
    slug: "guilin",
    name: "桂林",
    province: "广西·桂林",
    tagline: "桂林山水甲天下",
    gradient: "from-teal-500/20 to-blue-600/10",
    stat: "最佳 4-10月",
  },
  {
    slug: "huangshan",
    name: "黄山",
    province: "安徽·黄山",
    tagline: "五岳归来不看山，黄山归来不看岳",
    gradient: "from-gray-500/20 to-amber-600/10",
    stat: "云海日出绝美",
  },
  {
    slug: "xihu",
    name: "西湖",
    province: "浙江·杭州",
    tagline: "淡妆浓抹总相宜",
    gradient: "from-sky-500/20 to-indigo-600/10",
    stat: "免费 5A 景区",
  },
  {
    slug: "dunhuang",
    name: "敦煌",
    province: "甘肃·酒泉",
    tagline: "丝绸之路上的明珠",
    gradient: "from-amber-500/20 to-orange-600/10",
    stat: "莫高窟世界遗产",
  },
];

export function DestinationShowcase() {
  return (
    <section
      className="py-section px-gutter"
      aria-labelledby="destinations-heading"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 text-center">
          <h2
            id="destinations-heading"
            className="font-display text-display text-balance"
          >
            探索热门目的地
          </h2>
          <p className="mt-4 text-ink-muted text-body">
            从雪山到海滩，从古城到现代都市 — 中国有无限可能
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((dest) => (
            <Link
              key={dest.slug}
              href={`/scenic/${dest.slug}`}
              className="surface-card group relative overflow-hidden"
            >
              {/* Card header with gradient */}
              <div
                className={`relative h-48 overflow-hidden bg-gradient-to-br ${dest.gradient}`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-5xl text-ink/10 font-bold select-none">
                    {dest.name.charAt(0)}
                  </span>
                </div>
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-caption font-medium text-accent">
                      {dest.province}
                    </span>
                    <h3 className="mt-2 font-display text-heading group-hover:text-accent transition-colors">
                      {dest.name}
                    </h3>
                  </div>
                </div>
                <p className="mt-2 text-ink-muted text-sm">{dest.tagline}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full bg-surface-muted px-3 py-1 text-xs text-ink-muted">
                    {dest.stat}
                  </span>
                  <span className="text-sm font-medium text-accent">
                    探索 →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/scenic"
            className="inline-flex items-center gap-2 rounded-full border border-surface-muted px-6 py-3 text-sm font-medium text-ink transition-all hover:bg-surface-muted"
          >
            查看全部景点
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
