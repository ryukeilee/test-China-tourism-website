"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

interface Destination {
  slug: string;
  name: string;
  image: string;
  video?: string;
  fallbackColor: string;
}

const DESTINATIONS: Destination[] = [
  {
    slug: "jiuzhaigou",
    name: "九寨沟",
    image: "/hero/jiuzhaigou.jpg",
    video: "/hero/jiuzhaigou.mp4",
    fallbackColor: "from-emerald-800/60 to-teal-600/40",
  },
  {
    slug: "zhangjiajie",
    name: "张家界",
    image: "/hero/zhangjiajie.jpg",
    video: "/hero/zhangjiajie.mp4",
    fallbackColor: "from-stone-700/60 to-green-800/40",
  },
  {
    slug: "guilin",
    name: "桂林",
    image: "/hero/guilin.jpg",
    video: "/hero/guilin.mp4",
    fallbackColor: "from-teal-700/60 to-emerald-600/40",
  },
  {
    slug: "huangshan",
    name: "黄山",
    image: "/hero/huangshan.jpg",
    fallbackColor: "from-gray-700/60 to-amber-700/40",
  },
  {
    slug: "xihu",
    name: "西湖",
    image: "/hero/xihu.jpg",
    fallbackColor: "from-sky-700/60 to-indigo-600/40",
  },
  {
    slug: "kanasi",
    name: "新疆喀纳斯",
    image: "/hero/kanasi.jpg",
    video: "/hero/kanasi.mp4",
    fallbackColor: "from-blue-800/60 to-cyan-600/40",
  },
  {
    slug: "dunhuang",
    name: "敦煌",
    image: "/hero/dunhuang.jpg",
    fallbackColor: "from-amber-700/60 to-orange-600/40",
  },
  {
    slug: "daocheng",
    name: "稻城亚丁",
    image: "/hero/daocheng.jpg",
    fallbackColor: "from-sky-700/60 to-violet-600/40",
  },
];

const INTERVAL_MS = 6000;

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState<Record<number, boolean>>({});
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Auto-advance slides
  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % DESTINATIONS.length);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(advance, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [advance, reducedMotion]);

  // Play current video when slide changes
  useEffect(() => {
    const video = videoRefs.current.get(current);
    if (video && videoLoaded[current]) {
      video.currentTime = 0;
      void video.play().catch(() => {
        // Autoplay blocked — image fallback handles this
      });
    }
  }, [current, videoLoaded]);

  const destination = DESTINATIONS[current];
  if (!destination) return null;

  return (
    <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden="true">
      {/* Render all slides (hidden except current) for preloading */}
      {DESTINATIONS.map((dest, index) => {
        const isActive = index === current;
        const isPreloaded =
          index === current ||
          index === (current + 1) % DESTINATIONS.length ||
          index === (current - 1 + DESTINATIONS.length) % DESTINATIONS.length;

        return (
          <div
            key={dest.slug}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!isActive}
          >
            {/* Gradient fallback always visible behind media */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${dest.fallbackColor}`}
            />

            {/* Video (when available) — loaded only for current + neighbors */}
            {dest.video && isPreloaded && !reducedMotion && (
              <video
                ref={(el) => {
                  if (el) videoRefs.current.set(index, el);
                  else videoRefs.current.delete(index);
                }}
                src={dest.video}
                muted
                loop
                playsInline
                preload={isActive ? "auto" : "none"}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  videoLoaded[index] ? "opacity-100" : "opacity-0"
                }`}
                onLoadedData={() =>
                  setVideoLoaded((prev) => ({ ...prev, [index]: true }))
                }
                onError={() => {
                  // Video failed — image fallback will show
                }}
              />
            )}

            {/* Image (always loaded as fallback) */}
            {isPreloaded && (
              <Image
                src={dest.image}
                alt=""
                fill
                className={`object-cover transition-opacity duration-500 ${
                  imageLoaded[index] ? "opacity-100" : "opacity-0"
                } ${videoLoaded[index] && !reducedMotion ? "opacity-0" : ""}`}
                priority={index <= 1}
                sizes="100vw"
                quality={85}
                loading={index <= 2 ? "eager" : "lazy"}
                onLoad={() =>
                  setImageLoaded((prev) => ({ ...prev, [index]: true }))
                }
              />
            )}
          </div>
        );
      })}

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Pause/play button */}
      {!reducedMotion && (
        <button
          onClick={advance}
          className="absolute bottom-24 right-6 z-10 rounded-full bg-white/10 p-2 text-white/70 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
          aria-label="下一张"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Dot indicators */}
      <div
        className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 gap-2"
        role="tablist"
        aria-label="目的地轮播"
      >
        {DESTINATIONS.map((dest, index) => (
          <button
            key={dest.slug}
            role="tab"
            aria-selected={index === current}
            aria-label={`切换到${dest.name}`}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === current
                ? "w-8 bg-white"
                : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
