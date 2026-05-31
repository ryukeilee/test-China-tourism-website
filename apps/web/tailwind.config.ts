import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/shared/src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // ChinaVista Design Tokens
      colors: {
        surface: {
          DEFAULT: "oklch(98% 0 0)",
          elevated: "oklch(100% 0 0)",
          muted: "oklch(95% 0.005 260)",
        },
        ink: {
          DEFAULT: "oklch(18% 0 0)",
          muted: "oklch(45% 0.01 260)",
          subtle: "oklch(65% 0.01 260)",
        },
        accent: {
          DEFAULT: "oklch(62% 0.19 25)", // 中国红
          warm: "oklch(68% 0.17 50)",    // 暖金
          calm: "oklch(55% 0.12 210)",   // 青蓝
        },
        jade: {
          light: "oklch(78% 0.06 160)",
          DEFAULT: "oklch(52% 0.08 165)",
          dark: "oklch(35% 0.06 160)",
        },
      },
      fontFamily: {
        display: [
          '"Noto Serif SC"',
          '"Source Han Serif SC"',
          "Georgia",
          "serif",
        ],
        body: [
          '"Noto Sans SC"',
          '"Source Han Sans SC"',
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        hero: [
          "clamp(3rem, 1rem + 7vw, 8rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "hero-sub": [
          "clamp(1.125rem, 0.92rem + 0.8vw, 1.75rem)",
          { lineHeight: "1.4", fontWeight: "400" },
        ],
        display: [
          "clamp(2rem, 1.5rem + 3vw, 4rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        heading: [
          "clamp(1.25rem, 1rem + 1.5vw, 2rem)",
          { lineHeight: "1.2", fontWeight: "600" },
        ],
        body: ["clamp(1rem, 0.92rem + 0.4vw, 1.125rem)", { lineHeight: "1.6" }],
        caption: ["0.875rem", { lineHeight: "1.5" }],
      },
      spacing: {
        section: "clamp(4rem, 3rem + 5vw, 10rem)",
        gutter: "clamp(1rem, 0.5rem + 3vw, 2rem)",
      },
      animation: {
        "fade-in": "fadeIn 600ms ease-out",
        "slide-up": "slideUp 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        "reveal-text": "revealText 800ms cubic-bezier(0.16, 1, 0.3, 1)",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        revealText: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      borderRadius: {
        bento: "1.5rem",
        soft: "0.75rem",
      },
    },
  },
  plugins: [typography],
};

export default config;
