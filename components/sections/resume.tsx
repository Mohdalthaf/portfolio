"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Download } from "lucide-react";
import SpecularButton from "@/components/SpecularButton";
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

  const statsOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.3, 0.78, 0.95],
    [0, 1, 1, 0.45]
  );
  const statsY = useTransform(
    scrollYProgress,
    [0.18, 0.32, 0.85, 1],
    [32, 0, 0, 16]
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
        {/* Top editorial band — scroll-driven like cinematic intro */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <motion.div
            style={{ x: headingX, y: headingY, opacity: headingOpacity }}
            className="will-change-transform"
          >
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
          </motion.div>

          <motion.div
            style={{ x: copyX, opacity: copyOpacity }}
            className="max-w-md will-change-transform lg:justify-self-end"
          >
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
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm">
              <p>
                <span className="text-white/35">Based in</span>{" "}
                <span className="text-white">{profile.location}</span>
              </p>
              <p>
                <span className="text-white/35">Focus</span>{" "}
                <span className="text-white">{profile.title}</span>
              </p>
            </div>

            <div className="mt-8">
              <SpecularButton
                size="lg"
                radius={999}
                tint="#ff2d55"
                tintOpacity={0}
                blur={0}
                textColor="#ff2d55"
                lineColor="#ff2d55"
                baseColor="#3a3a3a"
                intensity={1}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={false}
                className="px-7! py-3! text-xs! font-semibold uppercase tracking-[0.18em]"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = profile.resumeUrl;
                  link.download = "";
                  link.click();
                }}
              >
                <span className="inline-flex items-center gap-2">
                  Download CV
                  <Download className="h-4 w-4" />
                </span>
              </SpecularButton>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 will-change-transform sm:grid-cols-4 sm:gap-4 lg:mt-20"
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
