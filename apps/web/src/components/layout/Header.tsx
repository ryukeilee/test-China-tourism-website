"use client";

import { Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const CHANNELS = [
  { href: "/scenic", label: "景点" },
  { href: "/hotel", label: "酒店" },
  { href: "/flight", label: "机票" },
  { href: "/train", label: "火车票" },
  { href: "/car-rental", label: "租车" },
  { href: "/guide", label: "攻略" },
  { href: "/food", label: "美食" },
  { href: "/weather", label: "天气" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass-surface border-b border-white/10 py-3"
          : "bg-transparent py-5",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "font-display text-xl font-bold transition-colors",
            scrolled ? "text-ink" : "text-white",
          )}
          aria-label="ChinaVista 华景中国 首页"
        >
          <span className="flex items-center gap-2">
            <span className="text-accent">华</span>
            <span className="hidden sm:inline">ChinaVista</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="主导航">
          {CHANNELS.map((ch) => (
            <Link
              key={ch.href}
              href={ch.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                scrolled
                  ? "text-ink-muted hover:text-ink hover:bg-surface-muted"
                  : "text-white/80 hover:text-white hover:bg-white/10",
              )}
            >
              {ch.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/ai-planner"
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all",
              scrolled
                ? "bg-accent text-white hover:bg-accent/90"
                : "bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm",
            )}
          >
            <Sparkles size={16} />
            AI 规划
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            "rounded-lg p-2 transition-colors lg:hidden",
            scrolled
              ? "text-ink hover:bg-surface-muted"
              : "text-white hover:bg-white/10",
          )}
          aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      {mobileOpen && (
        <nav
          className="fixed inset-0 top-0 z-40 flex flex-col bg-surface pt-20 lg:hidden"
          aria-label="移动端导航"
        >
          <div className="flex flex-col gap-1 overflow-y-auto px-6">
            {CHANNELS.map((ch) => (
              <Link
                key={ch.href}
                href={ch.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-4 text-lg font-medium text-ink transition-colors hover:bg-surface-muted"
              >
                {ch.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto px-6 pb-10 pt-6">
            <Link
              href="/ai-planner"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-white font-medium"
            >
              <Sparkles size={20} />
              AI 规划行程
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
