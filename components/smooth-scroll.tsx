"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Keep native touch scrolling so nested horizontal carousels stay usable.
      syncTouch: false,
      touchMultiplier: 1.4,
      allowNestedScroll: true,
      prevent: (node) =>
        Boolean(
          node.closest(
            "[data-lenis-prevent],[data-lenis-prevent-touch],[data-lenis-prevent-wheel]"
          )
        ),
    });

    window.__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      window.__lenis = null;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
