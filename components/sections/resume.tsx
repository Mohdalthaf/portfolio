"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import TrueFocus from "@/components/TrueFocus";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import EducationStatisticsCard from "@/components/shadcn-space/card/card-06";
import { experience, profile, stats } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ExperienceItem = (typeof experience)[number];

/** Counts from 0 to `value` once it scrolls into view. */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    const controls = animate(0, value, {
      duration: value > 50 ? 1.8 : 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString();
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  // Render the final value for SSR / no-JS; the effect animates it in.
  return <span ref={ref}>{value.toLocaleString()}</span>;
}

function ExperienceModal({
  job,
  onClose,
}: {
  job: ExperienceItem | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={job !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto border-white/10 bg-black/90 backdrop-blur-xl">
        {job && (
          <>
            <DialogHeader>
              <p className="text-sm font-medium text-accent">{job.period}</p>
              <DialogTitle className="mt-3 text-white">{job.role}</DialogTitle>
              <DialogDescription className="mt-2 flex items-center justify-between gap-3 text-white/60">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {job.company}
                </span>
                {job.logo && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="h-6 w-auto shrink-0 rounded-md bg-white px-2 py-1 object-contain"
                  />
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                Key responsibilities
              </p>
              <ul className="mt-4 space-y-3">
                {job.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-relaxed text-white/65"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function Resume() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedJob, setSelectedJob] = useState<ExperienceItem | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Mirror cinematic intro: enter → settle → drift apart
  const headingX = useTransform(
    scrollYProgress,
    [0.08, 0.22, 0.55, 0.85],
    [-90, 0, 0, -70]
  );
  const headingY = useTransform(
    scrollYProgress,
    [0.08, 0.22, 0.7, 0.95],
    [36, 0, 0, -20]
  );
  const headingOpacity = useTransform(
    scrollYProgress,
    [0.06, 0.18, 0.72, 0.95],
    [0, 1, 1, 0.35]
  );

  const aboutLineY = useTransform(
    scrollYProgress,
    [0.1, 0.24, 0.6, 0.88],
    [28, 0, 0, -12]
  );
  const meLineY = useTransform(
    scrollYProgress,
    [0.14, 0.28, 0.6, 0.88],
    [40, 0, 0, -8]
  );

  const copyX = useTransform(
    scrollYProgress,
    [0.1, 0.26, 0.58, 0.88],
    [90, 0, 0, 70]
  );
  const copyOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.22, 0.7, 0.95],
    [0, 1, 1, 0.4]
  );

  const experienceOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.4, 0.82, 0.98],
    [0, 1, 1, 0.45]
  );
  const experienceY = useTransform(
    scrollYProgress,
    [0.28, 0.42, 0.85, 1],
    [48, 0, 0, 24]
  );

  const educationOpacity = useTransform(
    scrollYProgress,
    [0.48, 0.58, 0.88, 1],
    [0, 1, 1, 0.5]
  );
  const educationY = useTransform(
    scrollYProgress,
    [0.48, 0.6, 0.9, 1],
    [40, 0, 0, 16]
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-28 pb-28 lg:pt-36 lg:pb-40"
    >
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* Top band — headline + intro on the left, 2×2 stats on the right */}
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-stretch lg:gap-20">
          <motion.div
            style={{ x: headingX, y: headingY, opacity: headingOpacity }}
            className="flex flex-col justify-between gap-12 will-change-transform"
          >
            <div>
              <p className="text-sm text-white/70 md:text-base">
                A little more about me
              </p>
              <h2 className="mt-4 text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[0.88] tracking-[-0.045em] text-white">
                <motion.span className="block" style={{ y: aboutLineY }}>
                  About
                </motion.span>
                <motion.span
                  className="block text-white/45"
                  style={{ y: meLineY }}
                >
                  Me
                </motion.span>
              </h2>
            </div>

            <div className="max-w-md">
              <TrueFocus
                segments={["“Less,", "but better.”"]}
                borderColor="#ff2d55"
                glowColor="rgba(255, 45, 85, 0.55)"
                blurAmount={4}
                animationDuration={0.45}
                pauseBetweenAnimations={1.2}
                className="justify-start gap-x-2"
                wordClassName="text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold leading-[1.25] tracking-tight text-white"
              />
              <p className="mt-3 text-sm text-white/45">
                — {profile.heroQuote.author}
              </p>

              <p className="mt-8 text-sm leading-relaxed text-white/60 md:text-[15px]">
                {profile.shortBio}
              </p>
            </div>
          </motion.div>

          <motion.div
            style={{ x: copyX, opacity: copyOpacity }}
            className="grid grid-cols-2 gap-x-6 gap-y-12 self-center will-change-transform sm:gap-x-12 lg:gap-y-20"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-5xl font-extrabold tracking-[-0.04em] text-white tabular-nums md:text-7xl">
                  <CountUp value={stat.value} />
                  <span className="text-accent">{stat.suffix}</span>
                </p>
                <span className="mt-5 inline-block rounded-full bg-white/[0.08] px-3 py-1.5 text-[10px] sm:mt-6 sm:px-3.5 sm:text-[11px] font-medium uppercase tracking-[0.14em] text-white/80">
                  {stat.label.replace("\n", " ")}
                </span>
                <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-white/55">
                  {stat.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Experience — cinematic vertical timeline */}
        <motion.div
          className="mt-24 will-change-transform lg:mt-32"
          style={{ opacity: experienceOpacity, y: experienceY }}
        >
          <ExperienceTimeline onSelect={setSelectedJob} />
        </motion.div>

        {/* Education */}
        <motion.div
          className="mt-20 will-change-transform lg:mt-28"
          style={{ opacity: educationOpacity, y: educationY }}
        >
          <h3 className="mb-8 text-sm uppercase tracking-[0.28em] text-white/40">
            Education
          </h3>
          <EducationStatisticsCard />
        </motion.div>
      </div>

      <ExperienceModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </section>
  );
}
