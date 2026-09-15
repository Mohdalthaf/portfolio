"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Globe } from "lucide-react";
import SpecularButton from "@/components/SpecularButton";
import InteractiveHoverButton from "@/components/shadcn-space/button/button-19";
import { ButtonShineHover } from "@/components/shadcn-space/button/button-03";
import { projects, workCopy } from "@/lib/data";
import { useSectionNav } from "@/components/section-nav";
import { SkillIcon } from "@/components/skill-icon";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type Project = (typeof projects)[number];

function ProjectCard({
  project,
  index,
  isOpen,
  onToggle,
  className,
}: {
  project: Project;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}) {
  const image = project.previews[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease }}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-[1.75rem]",
        className
      )}
      onClick={onToggle}
    >
      <div className="relative aspect-3/4 w-full overflow-hidden bg-white/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {image ? (
          <img
            src={image}
            alt={project.title}
            className={cn(
              "h-full w-full object-cover transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-35",
              isOpen && "scale-[1.03] opacity-35"
            )}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : null}

        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/80 via-black/35 to-transparent transition-opacity duration-500 group-hover:opacity-0",
            isOpen && "opacity-0"
          )}
        />

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 p-5 transition-all duration-500 ease-out group-hover:pointer-events-none group-hover:translate-y-3 group-hover:opacity-0 md:p-6",
            isOpen && "pointer-events-none translate-y-3 opacity-0"
          )}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-white/55 [text-shadow:0_1px_12px_rgba(0,0,0,0.65)]">
            {project.role}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.7)] md:text-xl">
            {project.title}
          </h3>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex flex-col justify-end bg-black/55 p-5 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 ease-out group-hover:pointer-events-auto group-hover:opacity-100 md:p-6",
            isOpen && "pointer-events-auto opacity-100"
          )}
        >
          <p className="text-xs uppercase tracking-[0.18em] text-accent">
            {project.role}
          </p>
          <p className="mt-1.5 text-xs text-white/45">{project.period}</p>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-white md:text-xl">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-white/70">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {project.stack.map((tech) => (
              <ButtonShineHover key={tech} title={tech} tabIndex={-1}>
                <SkillIcon
                  skill={tech}
                  className="h-4 w-4"
                  deviconClassName="text-base leading-none"
                />
              </ButtonShineHover>
            ))}
          </div>

          <div
            className="mt-5 flex items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {project.links.live ? (
              <SpecularButton
                size="sm"
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
                className="px-4! py-2! text-xs! font-semibold tracking-wide"
                onClick={() => {
                  window.open(
                    project.links.live!,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5" />
                  View live
                </span>
              </SpecularButton>
            ) : null}
            <SpecularButton
              size="sm"
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
              className="px-2.5! py-2.5!"
              onClick={() => {
                window.open(
                  project.links.github,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            >
              <span
                className="inline-flex items-center justify-center"
                aria-label={`${project.title} on GitHub`}
              >
                <Github className="h-4 w-4" />
              </span>
            </SpecularButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Work() {
  const { navigateToSection } = useSectionNav();
  const featured = projects;
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const updateActive = () => {
      // Only track slide index in the mobile slider layout
      if (window.matchMedia("(min-width: 640px)").matches) return;

      const cards = Array.from(el.children) as HTMLElement[];
      if (!cards.length) return;

      const center = el.scrollLeft + el.clientWidth / 2;
      let nearest = 0;
      let nearestDist = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = index;
        }
      });

      setActiveIndex(nearest);
    };

    updateActive();
    el.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      el.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [featured.length]);

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({
      left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative bg-transparent pt-28 pb-28 lg:pt-36 lg:pb-40">
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* Editorial header — reference layout */}
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.9fr] lg:items-end lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-sm font-medium text-accent md:text-base">
              {workCopy.eyebrow}
            </p>
            <h2 className="mt-4 max-w-xl text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white">
              {workCopy.headline}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="max-w-md lg:justify-self-end"
          >
            <p className="text-sm leading-relaxed text-white/70 md:text-[15px]">
              {workCopy.description}
            </p>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
              <p className="max-w-44 text-sm leading-snug text-white/40">
                {workCopy.ctaSupport}
              </p>

              <InteractiveHoverButton
                text={workCopy.ctaLabel}
                onClick={() => navigateToSection("#contact")}
                className="shrink-0"
              />
            </div>
          </motion.div>
        </div>

        {/* Project gallery — slider on mobile, grid from sm up */}
        <div
          ref={scrollerRef}
          data-lenis-prevent
          className="mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-16 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible lg:mt-20 lg:grid-cols-3 lg:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {featured.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isOpen={openId === project.id}
              onToggle={() =>
                setOpenId((current) =>
                  current === project.id ? null : project.id
                )
              }
              className="w-[min(82vw,22rem)] shrink-0 snap-center sm:w-auto sm:shrink"
            />
          ))}
        </div>

        <div
          className="mt-6 flex items-center justify-center gap-2 sm:hidden"
          aria-label="Project slides"
        >
          {featured.map((project, index) => (
            <button
              key={project.id}
              type="button"
              aria-label={`Go to ${project.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => scrollToIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "w-6 bg-accent"
                  : "w-1.5 bg-white/25 hover:bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
