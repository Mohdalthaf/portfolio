"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { MotionValue } from "framer-motion";
import {
  SCROLL_FRAME_COUNT,
  SCROLL_FRAME_START,
  getScrollFrameSrc,
  progressToFrame,
} from "@/lib/scroll-frames";

type ScrollFrameCanvasProps = {
  /** 0–1 scroll progress. Read directly — no React re-render per scroll tick. */
  progress: MotionValue<number>;
  className?: string;
  style?: CSSProperties;
  onReady?: () => void;
};

/** Parallel image requests while preloading the sequence. */
const CONCURRENCY = 6;
/** Frames around the current position that jump to the front of the queue. */
const PRIORITY_WINDOW = 10;

/**
 * Coarse-to-fine load order: every 32nd frame first, then 16th, 8th … 1st.
 * Wherever the user scrolls, a nearby frame is available almost immediately
 * and the sequence sharpens in place as the gaps fill.
 */
function buildLoadOrder() {
  const order: number[] = [];
  const seen = new Set<number>();
  for (let step = 32; step >= 1; step = Math.floor(step / 2)) {
    for (let f = SCROLL_FRAME_START; f <= SCROLL_FRAME_COUNT; f += step) {
      if (!seen.has(f)) {
        seen.add(f);
        order.push(f);
      }
    }
  }
  return order;
}

export function ScrollFrameCanvas({
  progress,
  className,
  style,
  onReady,
}: ScrollFrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let cancelled = false;
    let readyNotified = false;
    let rafId = 0;
    let drawnFrame = -1;
    let cssW = 0;
    let cssH = 0;

    const images: (HTMLImageElement | null)[] = new Array(
      SCROLL_FRAME_COUNT + 1
    ).fill(null);
    const requested = new Set<number>();
    const queue = buildLoadOrder();
    let inFlight = 0;

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w < 2 || h < 2) return false;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = w;
      cssH = h;
      const targetW = Math.round(w * dpr);
      const targetH = Math.round(h * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingQuality = "high";
        drawnFrame = -1; // canvas was cleared by the resize
      }
      return true;
    };

    /** Closest frame to `target` that has finished loading and decoding. */
    const nearestLoaded = (target: number) => {
      if (images[target]) return target;
      for (let d = 1; d <= SCROLL_FRAME_COUNT; d += 1) {
        const lo = target - d;
        const hi = target + d;
        if (lo >= SCROLL_FRAME_START && images[lo]) return lo;
        if (hi <= SCROLL_FRAME_COUNT && images[hi]) return hi;
        if (lo < SCROLL_FRAME_START && hi > SCROLL_FRAME_COUNT) break;
      }
      return -1;
    };

    const draw = () => {
      rafId = 0;
      if (cancelled) return;
      if (!cssW && !resize()) return;

      const frame = nearestLoaded(progressToFrame(progress.get()));
      if (frame < 0 || frame === drawnFrame) return;
      const img = images[frame]!;

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, cssW, cssH);
      const scale = Math.max(
        cssW / img.naturalWidth,
        cssH / img.naturalHeight
      );
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = (cssW - dw) / 2;
      // Bias portrait downward so the head sits below the fixed navbar
      const dy = (cssH - dh) / 2 + cssH * 0.08;
      ctx.drawImage(img, dx, dy, dw, dh);
      drawnFrame = frame;

      if (!readyNotified) {
        readyNotified = true;
        setReady(true);
        onReadyRef.current?.();
      }
    };

    const scheduleDraw = () => {
      if (!rafId) rafId = requestAnimationFrame(draw);
    };

    const load = (frame: number) => {
      requested.add(frame);
      inFlight += 1;
      const img = new Image();
      img.decoding = "async";
      if (frame === SCROLL_FRAME_START) {
        img.fetchPriority = "high";
      }
      img.src = getScrollFrameSrc(frame);
      // decode() resolves once the bitmap is ready, so drawImage never
      // blocks the main thread mid-scroll.
      img
        .decode()
        .then(() => {
          if (cancelled) return;
          images[frame] = img;
          scheduleDraw();
        })
        .catch(() => {
          // Leave the slot empty; nearestLoaded() will fall back.
        })
        .finally(() => {
          inFlight -= 1;
          if (!cancelled) pump();
        });
    };

    const pump = () => {
      while (inFlight < CONCURRENCY && queue.length) {
        const next = queue.shift()!;
        if (!requested.has(next)) load(next);
      }
    };

    /** Move frames near the current scroll position to the front of the queue. */
    const prioritize = () => {
      const target = progressToFrame(progress.get());
      const urgent: number[] = [];
      for (let d = 0; d <= PRIORITY_WINDOW; d += 1) {
        for (const f of d === 0 ? [target] : [target + d, target - d]) {
          if (
            f >= SCROLL_FRAME_START &&
            f <= SCROLL_FRAME_COUNT &&
            !requested.has(f)
          ) {
            urgent.push(f);
          }
        }
      }
      if (urgent.length) {
        queue.unshift(...urgent);
        pump();
      }
    };

    // First paint: the frame matching the current scroll position.
    const initial = progressToFrame(progress.get());
    queue.unshift(initial);
    if (initial !== SCROLL_FRAME_START) queue.unshift(SCROLL_FRAME_START);
    pump();

    const unsubscribe = progress.on("change", () => {
      scheduleDraw();
      prioritize();
    });

    const ro = new ResizeObserver(() => {
      cssW = 0;
      scheduleDraw();
    });
    ro.observe(canvas);

    return () => {
      cancelled = true;
      unsubscribe();
      ro.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        opacity: ready ? 1 : 0,
        transition: "opacity 0.7s ease",
        ...style,
      }}
    />
  );
}
