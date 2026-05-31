import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ChinaVista 华景中国 — AI 智慧旅游平台",
    template: "%s | ChinaVista 华景中国",
  },
  description:
    "一站式 AI 智慧旅游平台 — 从搜索灵感到完成预订，AI 全程旅行管家。覆盖景点、酒店、机票、高铁、攻略、美食。",
  keywords: [
    "中国旅游",
    "AI行程规划",
    "酒店预订",
    "机票",
    "高铁票",
    "旅游攻略",
    "景点门票",
  ],
  authors: [{ name: "ChinaVista" }],
  creator: "ChinaVista",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US", "ja_JP", "ko_KR", "fr_FR"],
    siteName: "ChinaVista 华景中国",
    title: "ChinaVista 华景中国 — AI 智慧旅游平台",
    description: "一站式 AI 智慧旅游平台，AI 全程旅行管家。",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(98% 0 0)" },
    { media: "(prefers-color-scheme: dark)", color: "oklch(12% 0.005 260)" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Core fonts: Noto Serif SC (display) + Noto Sans SC (body) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&family=Noto+Serif+SC:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-surface text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
