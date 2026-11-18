export const SCROLL_FRAME_START = 3;
export const SCROLL_FRAME_COUNT = 300;
export const SCROLL_FRAME_DIR = "/scroll-animation-frames";

function clampFrame(index: number) {
  return Math.min(
    SCROLL_FRAME_COUNT,
    Math.max(SCROLL_FRAME_START, Math.round(index))
  );
}

export function getScrollFrameSrc(index: number) {
  const frame = clampFrame(index);
  return `${SCROLL_FRAME_DIR}/frame-${String(frame).padStart(3, "0")}.webp`;
}

/** Map a 0–1 progress value to a 1-based frame index. */
export function progressToFrame(progress: number) {
  const clamped = Math.min(1, Math.max(0, progress));
  const span = SCROLL_FRAME_COUNT - SCROLL_FRAME_START;
  return SCROLL_FRAME_START + Math.round(clamped * span);
}
