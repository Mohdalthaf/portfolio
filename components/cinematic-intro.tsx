"use client";

import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { heroCopy, profile, stats } from "@/lib/data";
import { ScrollFrameCanvas } from "@/components/scroll-frame-canvas";
import { ButtonShineHover } from "@/components/shadcn-space/button/button-03";

/** Fixed frame sequence — stays behind page content. */
export function CinematicBackdrop({
  trackRef,
  introRef,
}: {
  trackRef: RefObject<HTMLElement | null>;
  introRef: RefObject<HTMLElement | null>;
}) {
  const [progress, setProgress] = useState(0);
  const mountedRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    mountedRef.current = true;
    setProgress(scrollYProgress.get());
    return () => {
      mountedRef.current = false;
    };
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!mountedRef.current) return;
    setProgress(v);
  });

  // Zoom in through mid-intro, then zoom back out into About.
  // Origin biased downward so scale expands below the navbar, not into it.
  const portraitScale = useTransform(
    introProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1, 1.1, 1.18, 1.08, 1]
  );

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-[#050505]"
        style={{
          scale: portraitScale,
          transformOrigin: "50% 62%",
          y: 36,
        }}
      >
        <ScrollFrameCanvas progress={progress} className="h-full w-full" />
      </motion.div>

      {/* Soft side grades so left/right copy stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/15 to-black/65" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/40" />
    </motion.div>
  );
}

/** Editorial hero — first scene of the scrollytelling experience. */
export function CinematicIntro({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const mountedRef = useRef(false);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    mountedRef.current = true;
    setProgress(scrollYProgress.get());
    return () => {
      mountedRef.current = false;
    };
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!mountedRef.current) return;
    setProgress(v);
  });

  // Phase 2: heading drifts left
  const headingX = useTransform(scrollYProgress, [0.15, 0.55], [0, -120]);
  // Phase 3: right statement drifts right
  const statementX = useTransform(scrollYProgress, [0.2, 0.6], [0, 120]);
  // Phase 4–5: UI fades as portrait dominates, then into Resume
  const uiOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.78, 1],
    [1, 1, 0.35, 0]
  );
  const statsOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.75, 0.95],
    [1, 1, 0.25, 0]
  );
  const statsY = useTransform(scrollYProgress, [0.55, 0.95], [0, 40]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative z-10 h-[320vh]"
      aria-label="Hero"
    >
      <div className="sticky top-0 flex h-dvh w-full flex-col overflow-hidden">
        <motion.div
          className="relative mx-auto flex h-full w-full max-w-7xl flex-1 flex-col px-6 pb-8 pt-28 md:px-10"
          style={{ opacity: uiOpacity }}
        >
          {/* Main hero row */}
          <div className="relative flex min-h-0 flex-1 flex-col justify-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            {/* Left — eyebrow + giant heading */}
            <motion.div
              className="relative z-10 w-full max-w-[16rem] sm:max-w-sm md:max-w-md lg:w-[42%] lg:max-w-none"
              style={{ x: headingX }}
            >
              <p className="text-sm text-white/75 md:text-base">
                {heroCopy.eyebrow}
              </p>
              <h1 className="mt-4 text-[clamp(3.25rem,9vw,7.5rem)] font-extrabold leading-[0.88] tracking-[-0.045em] text-white">
                <span className="block">{heroCopy.lineOne}</span>
                <span className="block">{heroCopy.lineTwo}</span>
              </h1>

              <div className="mt-6 hidden flex-wrap items-center gap-2.5 md:flex">
                <ButtonShineHover
                  title="GitHub"
                  aria-label="GitHub"
                  onClick={() =>
                    window.open(profile.github, "_blank", "noopener,noreferrer")
                  }
                >
                  <Github className="h-4 w-4" />
                </ButtonShineHover>
                <ButtonShineHover
                  title="LinkedIn"
                  aria-label="LinkedIn"
                  onClick={() =>
                    window.open(profile.linkedin, "_blank", "noopener,noreferrer")
                  }
                >
                  <Linkedin className="h-4 w-4" />
                </ButtonShineHover>
                <ButtonShineHover
                  title="Email"
                  aria-label="Email"
                  onClick={() => {
                    window.location.href = `mailto:${profile.email}`;
                  }}
                >
                  <Mail className="h-4 w-4" />
                </ButtonShineHover>
                <ButtonShineHover
                  title="Download CV"
                  aria-label="Download CV"
                  className="h-9 w-auto gap-2 px-4"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = profile.resumeUrl;
                    link.download = "";
                    link.click();
                  }}
                >
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide">
                    <Download className="h-3.5 w-3.5" />
                    Download CV
                  </span>
                </ButtonShineHover>
              </div>
            </motion.div>

            {/* Spacer keeps the center clear for the portrait */}
            <div className="pointer-events-none hidden flex-1 lg:block" />

            {/* Right — supporting statement */}
            <motion.div
              className="relative z-10 w-full max-w-sm self-end lg:max-w-[17rem] lg:self-center xl:max-w-xs"
              style={{ x: statementX }}
            >
              <p className="whitespace-pre-line text-[clamp(1.35rem,2.4vw,2rem)] font-semibold leading-[1.2] tracking-tight text-white">
                {heroCopy.statement}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-white/60 md:text-[15px]">
                {heroCopy.description}
              </p>
            </motion.div>
          </div>

          {/* Bottom — stats as category columns */}
          <motion.div
            className="relative z-10 mt-auto grid grid-cols-2 gap-6 pt-6 sm:grid-cols-4 sm:gap-4"
            style={{ opacity: statsOpacity, y: statsY }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {stat.value}
                  <span className="text-accent">{stat.suffix}</span>
                </p>
                <p className="mt-1 whitespace-pre-line text-xs leading-snug text-white/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Phase progress cue */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-white/35"
          style={{ opacity: Math.max(0, 1 - progress * 4) }}
        >
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
