"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";
import { CaseStudyView } from "./case-study-view";

/**
 * "Sneak Peek" overlay. Rendered by the intercepted /work/[slug] route, so the
 * home page (and its scroll position) stays mounted underneath while the URL
 * is still shareable. Closing simply goes back in history.
 */
export function CaseStudyModal({
  study,
  next,
}: {
  study: CaseStudy;
  next: CaseStudy;
}) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Freeze Lenis smooth scrolling on the page behind the overlay.
  useEffect(() => {
    window.__lenis?.stop();
    return () => window.__lenis?.start();
  }, []);

  // Moving to the "next project" swaps content in place — start at the top.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [study.slug]);

  return (
    <DialogPrimitive.Root open onOpenChange={(open) => !open && router.back()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay asChild>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </DialogPrimitive.Overlay>

        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 top-3 z-[61] outline-none sm:inset-x-3 md:top-6 md:inset-x-6"
        >
          <motion.div
            initial={{ y: "6%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-full flex-col overflow-hidden rounded-t-[1.75rem] border border-b-0 border-white/10 bg-[#070708] shadow-[0_-30px_120px_-20px_rgba(255,45,85,0.25)]"
          >
            {/* Top bar */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/5 px-5 py-4 md:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Sneak Peek
                </span>
                <DialogPrimitive.Title className="truncate text-sm font-medium text-white/70">
                  {study.title}
                </DialogPrimitive.Title>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={`/work/${study.slug}`}
                  className="hidden items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-xs text-white/60 transition-colors hover:border-white/25 hover:text-white sm:inline-flex"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  Open full page
                </a>
                <DialogPrimitive.Close
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-accent hover:text-accent"
                >
                  <X className="h-4 w-4" />
                </DialogPrimitive.Close>
              </div>
            </div>

            {/* Scrollable case study */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain pt-8 [-ms-overflow-style:none] [scrollbar-width:none] md:pt-12 [&::-webkit-scrollbar]:hidden"
            >
              <CaseStudyView study={study} next={next} />
            </div>
          </motion.div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
