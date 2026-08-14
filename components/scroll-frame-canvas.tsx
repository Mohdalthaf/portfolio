"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  SCROLL_FRAME_COUNT,
  SCROLL_FRAME_START,
  getScrollFrameSrc,
  progressToFrame,
} from "@/lib/scroll-frames";

type ScrollFrameCanvasProps = {
  progress: number;
  className?: string;
  style?: CSSProperties;
  onReady?: () => void;
};

const PRELOAD_AHEAD = 24;

export function ScrollFrameCanvas({
  progress,
  className,
  style,
  onReady,
}: ScrollFrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array.from({ length: SCROLL_FRAME_COUNT + 1 }, () => null)
  );
  const loadingRef = useRef<Set<number>>(new Set());
  const drawnFrameRef = useRef(0);
  const readyNotified = useRef(false);
  const progressRef = useRef(progress);
  const [ready, setReady] = useState(false);

  progressRef.current = progress;

  const drawFrame = (frame: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[frame];
    if (!canvas || !img?.complete || !img.naturalWidth) return false;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return false;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w < 2 || h < 2) return false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(w * dpr);
    const targetH = Math.round(h * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, w, h);

    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (w - dw) / 2;
    // Bias portrait downward so the head sits below the fixed navbar
    const dy = (h - dh) / 2 + h * 0.08;
    ctx.drawImage(img, dx, dy, dw, dh);
    drawnFrameRef.current = frame;
    return true;
  };

  const markReady = () => {
    if (readyNotified.current) return;
    readyNotified.current = true;
    // Defer so we never setState during another component's render/commit.
    queueMicrotask(() => {
      setReady(true);
      onReady?.();
    });
  };

  const loadFrame = (frame: number) =>
    new Promise<boolean>((resolve) => {
      if (frame < SCROLL_FRAME_START || frame > SCROLL_FRAME_COUNT) {
        resolve(false);
        return;
      }
      const cached = imagesRef.current[frame];
      if (cached?.complete && cached.naturalWidth) {
        resolve(true);
        return;
      }
      if (loadingRef.current.has(frame)) {
        resolve(false);
        return;
      }

      loadingRef.current.add(frame);
      const img = new Image();
      img.decoding = "async";
      if (frame <= 12) {
        // Prioritize early frames for first paint
        try {
          (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority =
            "high";
        } catch {
          // ignore older browsers
        }
      }
      img.src = getScrollFrameSrc(frame);
      img.onload = () => {
        imagesRef.current[frame] = img;
        loadingRef.current.delete(frame);
        resolve(true);
      };
      img.onerror = () => {
        loadingRef.current.delete(frame);
        resolve(false);
      };
    });

  const paintCurrent = () => {
    const target = progressToFrame(progressRef.current);
    if (drawFrame(target)) {
      markReady();
      return;
    }
    for (let offset = 1; offset < 32; offset += 1) {
      const lo = target - offset;
      const hi = target + offset;
      if (lo >= SCROLL_FRAME_START && drawFrame(lo)) {
        markReady();
        return;
      }
      if (hi <= SCROLL_FRAME_COUNT && drawFrame(hi)) {
        markReady();
        return;
      }
    }
  };

  useEffect(() => {
    let cancelled = false;
    let preloadCursor = SCROLL_FRAME_START + 1;

    const bootstrap = async () => {
      const ok = await loadFrame(SCROLL_FRAME_START);
      if (cancelled) return;

      // Wait a frame so sticky layout has real dimensions
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (cancelled) return;

      if (ok) paintCurrent();

      // Sparse keyframes for scrubbing ahead of full preload
      for (const key of [30, 60, 90, 120, 150, 180, 210, 240, 270, 300]) {
        if (cancelled) return;
        await loadFrame(key);
      }

      // Fill opening sequence densely
      while (preloadCursor <= 60 && !cancelled) {
        await loadFrame(preloadCursor);
        preloadCursor += 1;
        if (preloadCursor % 6 === 0) {
          await new Promise<void>((r) => requestAnimationFrame(() => r()));
        }
      }
    };

    bootstrap();

    const onResize = () => paintCurrent();
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => paintCurrent());
    if (canvasRef.current) ro.observe(canvasRef.current);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    paintCurrent();

    const target = progressToFrame(progress);
    const start = Math.max(SCROLL_FRAME_START, target - 2);
    const end = Math.min(SCROLL_FRAME_COUNT, target + PRELOAD_AHEAD);

    let cancelled = false;
    (async () => {
      for (let i = start; i <= end; i += 1) {
        if (cancelled) return;
        await loadFrame(i);
        if (i === target || i % 4 === 0) paintCurrent();
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
