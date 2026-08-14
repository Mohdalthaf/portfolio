export const SCROLL_FRAME_START = 3;
export const SCROLL_FRAME_COUNT = 300;
export const SCROLL_FRAME_DIR = "/scroll-animation-frames";

export function getScrollFrameSrc(index: number) {
  const frame = Math.min(
    SCROLL_FRAME_COUNT,
    Math.max(SCROLL_FRAME_START, Math.round(index))
  );
  return `${SCROLL_FRAME_DIR}/ezgif-frame-${String(frame).padStart(3, "0")}.png`;
}

/** Map a 0–1 progress value to a 1-based frame index. */
export function progressToFrame(progress: number) {
  const clamped = Math.min(1, Math.max(0, progress));
  const span = SCROLL_FRAME_COUNT - SCROLL_FRAME_START;
  return SCROLL_FRAME_START + Math.round(clamped * span);
}
