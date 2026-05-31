import { HeroBanner } from "@/components/hero/HeroBanner";
import { SearchBox } from "@/components/hero/SearchBox";
import { AIAssistantTeaser } from "@/components/home/AIAssistantTeaser";
import { DestinationShowcase } from "@/components/home/DestinationShowcase";
import { GuidePreview } from "@/components/home/GuidePreview";
import { WeatherPreview } from "@/components/home/WeatherPreview";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section: Full-screen video + search */}
        <section
          className="relative flex h-screen min-h-[600px] flex-col items-center justify-center overflow-hidden"
          aria-labelledby="hero-heading"
        >
          <HeroBanner />
          <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center sm:gap-8">
            <h1
              id="hero-heading"
              className="font-display text-hero animate-slide-up text-balance"
              style={{
                color: "white",
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              }}
            >
              发现中国之美
            </h1>
            <p
              className="max-w-2xl text-hero-sub animate-slide-up text-balance"
              style={{
                color: "rgba(255,255,255,0.9)",
                textShadow: "0 1px 10px rgba(0,0,0,0.3)",
                animationDelay: "100ms",
              }}
            >
              AI 旅行管家全程陪伴，从灵感到预订一步到位
            </p>
            <SearchBox />
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-float"
            aria-hidden="true"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </section>

        {/* Destination Showcase */}
        <DestinationShowcase />

        {/* Quick Preview: Weather */}
        <WeatherPreview />

        {/* Quick Preview: Travel Guides */}
        <GuidePreview />

        {/* AI Assistant Teaser */}
        <AIAssistantTeaser />
      </main>

      <Footer />
    </>
  );
}
