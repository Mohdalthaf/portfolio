"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type ExperienceItem = (typeof experience)[number];

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function TimelineNode({
  active,
  dimmed,
}: {
  active: boolean;
  dimmed: boolean;
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className={cn(
        "relative z-10 flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-500",
        active
          ? "border-accent shadow-[0_0_18px_rgba(255,45,85,0.55)]"
          : "border-white/35",
        dimmed && !active && "opacity-40"
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full transition-all duration-500",
          active ? "bg-accent" : "bg-white/70",
          dimmed && !active && "bg-white/30"
        )}
      />
      {active ? (
        <span
          aria-hidden
          className="absolute inset-[-3px] animate-pulse rounded-full bg-accent/25"
        />
      ) : null}
    </motion.div>
  );
}

function ExperienceCopy({
  job,
  index,
  align,
  onSelect,
}: {
  job: ExperienceItem;
  index: number;
  align: "left" | "right";
  onSelect: (job: ExperienceItem) => void;
}) {
  const number = `#${String(index + 1).padStart(2, "0")}`;
  const rightAlign = align === "left";

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(job)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={cn(
        "group w-full text-left",
        rightAlign && "lg:text-right"
      )}
    >
      <motion.p
        custom={0}
        variants={reveal}
        className="font-mono text-sm tracking-[0.2em] text-accent/85 md:text-base"
      >
        {number}
      </motion.p>

      <motion.div custom={0.08} variants={reveal}>
        <h4 className="mt-3 text-xl font-bold tracking-tight text-white transition group-hover:text-accent md:text-2xl">
          {job.role}
        </h4>
        <p
          className={cn(
            "mt-2 flex items-center gap-2 text-sm text-white/55",
            rightAlign && "lg:justify-end"
          )}
        >
          {job.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={job.logo} alt="" className="h-5 w-auto opacity-75" />
          ) : null}
          {job.company}
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/35">
          {job.period}
        </p>
      </motion.div>

      <motion.span
        custom={0.18}
        variants={reveal}
        className={cn(
          "mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition group-hover:gap-2.5",
          rightAlign && "lg:justify-end"
        )}
      >
        Click here
        <ArrowUpRight className="h-4 w-4" />
      </motion.span>
    </motion.button>
  );
}

function TimelineItem({
  job,
  index,
  activeIndex,
  onSelect,
  scrollYProgress,
}: {
  job: ExperienceItem;
  index: number;
  activeIndex: number;
  onSelect: (job: ExperienceItem) => void;
  scrollYProgress: MotionValue<number>;
}) {
  const itemRef = useRef<HTMLLIElement>(null);
  const isLeft = index % 2 === 0;
  const active = activeIndex === index;
  const dimmed = activeIndex > index;

  const parallaxRaw = useTransform(
    scrollYProgress,
    [0, 1],
    isLeft ? [16, -16] : [-16, 16]
  );
  const parallaxY = useSpring(parallaxRaw, { stiffness: 55, damping: 22 });

  return (
    <li
      ref={itemRef}
      data-index={index}
      className={cn(
        "relative grid grid-cols-[2.5rem_1fr] items-start gap-x-4 py-10 transition-opacity duration-500 lg:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] lg:gap-x-0 lg:py-16",
        dimmed && !active && "opacity-45",
        active && "opacity-100"
      )}
    >
      {/* Desktop left */}
      <motion.div
        style={{ y: parallaxY }}
        className="hidden lg:block lg:pr-10"
      >
        {isLeft ? (
          <ExperienceCopy
            job={job}
            index={index}
            align="left"
            onSelect={onSelect}
          />
        ) : null}
      </motion.div>

      {/* Node + connectors */}
      <div className="relative z-10 flex h-full flex-col items-center pt-1">
        {/* Mobile connector stub */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="absolute top-[0.85rem] left-1/2 h-px w-5 origin-left bg-accent/60 lg:hidden"
        />

        {/* Desktop horizontal connectors */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          className={cn(
            "pointer-events-none absolute top-[0.85rem] hidden h-px w-10 lg:block",
            isLeft
              ? "right-full origin-right bg-linear-to-l from-accent/70 to-transparent"
              : "left-full origin-left bg-linear-to-r from-accent/70 to-transparent"
          )}
        />

        <TimelineNode active={active} dimmed={dimmed} />
      </div>

      {/* Mobile + desktop right */}
      <motion.div
        style={{ y: isLeft ? undefined : parallaxY }}
        className="min-w-0 lg:pl-10"
      >
        <div className="lg:hidden">
          <ExperienceCopy
            job={job}
            index={index}
            align="right"
            onSelect={onSelect}
          />
        </div>
        <div className="hidden lg:block">
          {!isLeft ? (
            <ExperienceCopy
              job={job}
              index={index}
              align="right"
              onSelect={onSelect}
            />
          ) : null}
        </div>
      </motion.div>
    </li>
  );
}

export function ExperienceTimeline({
  onSelect,
}: {
  onSelect: (job: ExperienceItem) => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end 0.35"],
  });

  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
  });
  const lineScale = useTransform(lineProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const items = Array.from(
      list.querySelectorAll<HTMLElement>("[data-index]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(
                a.boundingClientRect.top +
                  a.boundingClientRect.height / 2 -
                  window.innerHeight / 2
              ) -
              Math.abs(
                b.boundingClientRect.top +
                  b.boundingClientRect.height / 2 -
                  window.innerHeight / 2
              )
          );

        const top = visible[0]?.target.getAttribute("data-index");
        if (top != null) setActiveIndex(Number(top));
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: "-28% 0px -38% 0px",
      }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 text-center lg:mb-20"
      >
       
        <h3 className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-[-0.04em] text-white">
          Experience
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/45 md:text-base">
          Building digital products, interfaces, and experiences across modern
          web technologies.
        </p>
      </motion.div>

      <div className="relative">
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-[1.15rem] w-px bg-white/10 lg:left-1/2 lg:-translate-x-px"
        />
        <motion.div
          aria-hidden
          className="absolute top-0 left-[1.15rem] w-px origin-top bg-linear-to-b from-accent via-accent to-accent-2 lg:left-1/2 lg:-translate-x-px"
          style={{ height: "100%", scaleY: lineScale }}
        />

        <ul ref={listRef} className="relative">
          {experience.map((job, index) => (
            <TimelineItem
              key={`${job.company}-${job.period}`}
              job={job}
              index={index}
              activeIndex={activeIndex}
              onSelect={onSelect}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
