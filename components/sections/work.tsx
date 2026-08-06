"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Github, Globe } from "lucide-react";
import CardSwap, { Card } from "@/components/CardSwap";
import { SkillIcon } from "@/components/skill-icon";
import { projects } from "@/lib/data";
import { SectionHeading } from "./section-heading";
import BorderGlow from "@/components/BorderGlow";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const borderGlowProps = {
  edgeSensitivity: 30,
  glowColor: "40 80 80",
  backgroundColor: "#24242D",
  borderRadius: 12,
  glowRadius: 40,
  glowIntensity: 1,
  coneSpread: 25,
  animated: false,
  colors: ["#c084fc", "#f472b6", "#38bdf8"],
};

const projectCardGlowProps = {
  ...borderGlowProps,
  backgroundColor: "transparent",
};

function ProjectPreviewCarousel({
  previews,
  title,
}: {
  previews: string[];
  title: string;
}) {
  const [mounted, setMounted] = useState(false);
  const hasMultiple = previews.length > 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="project-preview-carousel absolute inset-0">
      {!mounted || !hasMultiple ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={previews[0]}
          alt={`${title} preview`}
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop
          allowTouchMove
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          className="h-full w-full"
        >
          {previews.map((src, index) => (
            <SwiperSlide key={`${src}-${index}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${title} preview ${index + 1}`}
                className="h-full w-full object-cover object-center"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

function TechStackBadge({ tech }: { tech: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition-colors hover:border-accent/40 hover:text-white">
      <SkillIcon skill={tech} className="h-4 w-4" deviconClassName="text-base leading-none" />
      <span>{tech}</span>
    </span>
  );
}

function ProjectDetails({
  project,
  total,
}: {
  project: (typeof projects)[number];
  total: number;
}) {
  return (
    <div className="max-w-xl">
      <span className="font-mono text-sm tracking-wide text-accent">
        {`${project.id} / ${String(total).padStart(2, "0")}`}
      </span>

      <h3 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
        {project.title}
      </h3>

      <p className="mt-4 text-sm text-accent">
        {project.role} · {project.period}
      </p>

      <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted lg:text-base">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <TechStackBadge key={tech} tech={tech} />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-accent/40 hover:text-accent"
          >
            <Globe className="h-4 w-4" />
            Live Site
          </a>
        )}
        <a
          href={project.links.github}
          target="_blank"
          rel="noreferrer"
          aria-label="View source on GitHub"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-accent hover:text-accent"
        >
          <Github className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

function ProjectPreviewCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <BorderGlow
      {...projectCardGlowProps}
      className="h-full w-full overflow-hidden"
    >
      <div className="relative h-full min-h-[220px] sm:min-h-[280px] lg:min-h-[360px]">
        <ProjectPreviewCarousel
          previews={project.previews}
          title={project.title}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
        />
      </div>
    </BorderGlow>
  );
}

export function Work() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swapMetrics, setSwapMetrics] = useState({
    cardDistance: 32,
    verticalDistance: 38,
  });
  const activeProject = projects[activeIndex] ?? projects[0];

  useEffect(() => {
    const updateMetrics = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setSwapMetrics({ cardDistance: 28, verticalDistance: 34 });
      } else if (width < 1024) {
        setSwapMetrics({ cardDistance: 36, verticalDistance: 42 });
      } else {
        setSwapMetrics({ cardDistance: 44, verticalDistance: 52 });
      }
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, []);

  const cardSwapItems = useMemo(
    () =>
      projects.map((project) => (
        <Card
          key={project.id}
          customClass="overflow-hidden border-white/10 bg-transparent p-0 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
        >
          <ProjectPreviewCard project={project} />
        </Card>
      )),
    []
  );

  return (
    <section className="pt-20 pb-12 lg:pt-20 lg:pb-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          title="Projects"
          description="A few builds worth walking through — production systems and side projects alike."
        />

        <div className="mt-14 grid grid-cols-1 items-center gap-28 sm:gap-24 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-14 xl:grid-cols-[minmax(0,460px)_1fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <ProjectDetails project={activeProject} total={projects.length} />
            </motion.div>
          </AnimatePresence>

          <div className="relative mx-auto h-[280px] w-full max-w-[260px] sm:h-[340px] sm:max-w-[320px] md:h-[400px] md:max-w-[380px] lg:mx-0 lg:h-[460px] lg:max-w-none">
            <CardSwap
              centered
              width="100%"
              height="100%"
              cardDistance={swapMetrics.cardDistance}
              verticalDistance={swapMetrics.verticalDistance}
              delay={5000}
              pauseOnHover
              skewAmount={5}
              easing="elastic"
              onActiveChange={setActiveIndex}
              onCardClick={setActiveIndex}
            >
              {cardSwapItems}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}
