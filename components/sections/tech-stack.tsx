"use client";

import MagicBento, { type BentoCardProps } from "@/components/MagicBento";
import { Marquee } from "@/components/shadcn-space/animations/marquee";
import { SkillIcon } from "@/components/skill-icon";
import {
  getAllTechStackSkills,
  techStackCategories,
} from "@/lib/assets";
import { SectionHeading } from "./section-heading";

const CARD_COLOR = "#24242D";

function BentoSkillGrid({ skills }: { skills: readonly string[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
      {skills.map((skill) => (
          <div
            key={skill}
            className="flex flex-col items-center gap-1.5 rounded-lg border border-white/6 bg-black/20 px-2 py-2.5 text-center"
          >
            <SkillIcon skill={skill} className="h-5 w-5" />
            <span className="text-[10px] leading-tight text-white/70">{skill}</span>
          </div>
        ))}
    </div>
  );
}

function buildTechStackBentoCards(): BentoCardProps[] {
  return techStackCategories.map((category) => ({
    color: CARD_COLOR,
    title: category.title,
    description: category.description,
    content: <BentoSkillGrid skills={category.skills} />,
  }));
}

function MarqueeStrip() {
  const skills = getAllTechStackSkills();

  return (
    <div className="relative mt-16 overflow-hidden border-y border-white/6 py-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent lg:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent lg:w-24"
      />

      <Marquee className="[--duration:36s] p-0 [--gap:2.5rem]" pauseOnHover>
        {skills.map((skill) => (
            <div
              key={skill}
              className="flex shrink-0 items-center gap-2.5 text-white/45"
            >
              <SkillIcon skill={skill} className="h-5 w-5" deviconClassName="text-xl leading-none" />
              <span className="whitespace-nowrap text-sm font-medium">{skill}</span>
            </div>
          ))}
      </Marquee>
    </div>
  );
}

export function TechStack() {
  return (
    <section className="relative overflow-hidden pt-20 pb-20 lg:pt-38 lg:pb-28">
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          className="max-w-2xl"
          title="Tech stack"
          description="The languages, frameworks, and tools I reach for when building products that need to look sharp and hold up in production."
        />

        <div className="mt-14 w-full">
          <MagicBento
            cards={buildTechStackBentoCards()}
            fullWidth
            gridLayout="tech-stack"
            textAutoHide={false}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt
            enableMagnetism
            clickEffect
            spotlightRadius={400}
            particleCount={12}
            glowColor="0, 255, 153"
            disableAnimations={false}
          />
        </div>

        <MarqueeStrip />
      </div>
    </section>
  );
}
