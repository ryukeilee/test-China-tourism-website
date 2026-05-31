import Link from "next/link";

const FOOTER_LINKS = {
  探索: [
    { href: "/scenic", label: "热门景点" },
    { href: "/guide", label: "旅游攻略" },
    { href: "/food", label: "美食推荐" },
    { href: "/weather", label: "天气预报" },
    { href: "/activity", label: "特色活动" },
  ],
  预订: [
    { href: "/hotel", label: "酒店预订" },
    { href: "/flight", label: "机票预订" },
    { href: "/train", label: "高铁票" },
    { href: "/car-rental", label: "租车服务" },
    { href: "/scenic", label: "景区门票" },
  ],
  服务: [
    { href: "/ai-planner", label: "AI 行程规划" },
    { href: "/community", label: "旅游社区" },
    { href: "/membership", label: "会员中心" },
    { href: "/merchant", label: "商家入驻" },
    { href: "/help", label: "帮助中心" },
  ],
  关于: [
    { href: "/about", label: "关于我们" },
    { href: "/privacy", label: "隐私政策" },
    { href: "/terms", label: "服务条款" },
    { href: "/contact", label: "联系我们" },
    { href: "/sitemap", label: "网站地图" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-surface-muted bg-surface-elevated" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Link columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 font-semibold text-ink">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-ink-muted transition-colors hover:text-accent text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-surface-muted pt-8 sm:flex-row">
          <div className="flex items-center gap-2 text-ink-muted text-sm">
            <span className="font-display font-semibold text-ink">华景中国</span>
            <span>ChinaVista</span>
          </div>
          <div className="flex items-center gap-6 text-ink-muted text-sm">
            <span>© 2026 ChinaVista</span>
            <span className="hidden sm:inline">·</span>
            <span>AI 智慧旅游平台</span>
          </div>
          <div className="flex gap-4 text-ink-muted text-sm">
            <span>🇨🇳 中文</span>
            <span>🇺🇸 EN</span>
            <span>🇯🇵 日本語</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
