"use client";

import { useEffect, useRef } from "react";

type Source = { src: string; type: string };

/**
 * Muted, looping background video. It starts only after hydration and only while
 * on screen, and stays on its poster for people who prefer reduced motion or
 * have Data Saver turned on.
 */
export function HeroVideo({ sources, poster, className }: { sources: Source[]; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || connection?.saveData) return;

    video.muted = true; // required for autoplay in every browser
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video ref={ref} muted loop playsInline preload="metadata" poster={poster} aria-hidden="true" tabIndex={-1} className={className}>
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
