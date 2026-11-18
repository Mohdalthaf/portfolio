"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Globe } from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";
import { SkillIcon } from "@/components/skill-icon";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Two-column editorial block: numbered label on the left, content on the right. */
function Block({
  index,
  label,
  title,
  children,
}: {
  index: number;
  label: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-6 border-t border-white/10 py-14 md:py-20 lg:grid-cols-[14rem_1fr] lg:gap-16">
      <Reveal>
        <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-accent">
          <span className="text-white/35 tabular-nums">
            {String(index).padStart(2, "0")}
          </span>
          <span aria-hidden className="h-px w-6 bg-accent/60" />
          {label}
        </p>
      </Reveal>
      <div className="min-w-0">
        {title && (
          <Reveal>
            <h2 className="mb-8 max-w-3xl text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.15] tracking-[-0.03em] text-white">
              {title}
            </h2>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

function ActionLink({
  href,
  icon,
  children,
  primary = false,
}: {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300",
        primary
          ? "bg-accent text-white shadow-[0_12px_40px_-12px_rgba(255,45,85,0.8)] hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-12px_rgba(255,45,85,0.9)]"
          : "border border-white/15 text-white/80 hover:border-accent/60 hover:text-white"
      )}
    >
      {icon}
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export function CaseStudyView({
  study,
  next,
}: {
  study: CaseStudy;
  next: CaseStudy;
}) {
  let section = 0;
  const n = () => ++section;

  return (
    <article className="mx-auto w-full max-w-6xl px-6 md:px-10">
      {/* ── Hero ─────────────────────────────────────────── */}
      <header className="grid gap-12 pb-16 pt-6 md:pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        <div>
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-accent">
              <span aria-hidden className="h-px w-10 bg-accent" />
              {study.category}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.045em] text-white">
              {study.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-[clamp(1.1rem,1.8vw,1.4rem)] font-semibold leading-snug tracking-tight text-white/55">
              {study.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {[
                ["Role", study.role],
                ["Timeline", study.timeline],
                ["Platform", study.platform],
                ["Year", study.year],
              ].map(([term, value]) => (
                <div key={term}>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-white/35">
                    {term}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-white">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {(study.links.live || study.links.github) && (
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
              {study.links.live && (
                <ActionLink
                  href={study.links.live}
                  icon={<Globe className="h-3.5 w-3.5" />}
                  primary
                >
                  Visit live
                </ActionLink>
              )}
              {study.links.github && (
                <ActionLink
                  href={study.links.github}
                  icon={<Github className="h-3.5 w-3.5" />}
                >
                  Source
                </ActionLink>
              )}
            </Reveal>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2.5rem] bg-accent/15 blur-3xl"
          />
          <div className="relative overflow-hidden rounded-4xl ring-1 ring-white/15">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={study.cover}
              alt={`${study.title} cover`}
              width={900}
              height={1200}
              decoding="async"
              className="aspect-3/4 w-full object-cover"
            />
          </div>
        </motion.div>
      </header>

      {/* ── Highlights (only real numbers) ───────────────── */}
      {study.highlights.length > 0 && (
        <Reveal className="mb-4">
          <div
            className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/2"
            style={{
              gridTemplateColumns: `repeat(${study.highlights.length}, minmax(0, 1fr))`,
            }}
          >
            {study.highlights.map((h) => (
              <div
                key={h.label}
                className="border-r border-white/10 px-5 py-7 last:border-r-0 md:px-8 md:py-9"
              >
                <p className="text-3xl font-extrabold tracking-[-0.04em] text-white md:text-5xl">
                  {h.value}
                </p>
                <p className="mt-3 whitespace-pre-line text-[11px] uppercase leading-snug tracking-[0.18em] text-white/45">
                  {h.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* ── Overview ─────────────────────────────────────── */}
      <Block index={n()} label="Overview">
        <Reveal>
          <p className="max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
            {study.overview}
          </p>
        </Reveal>
        <Reveal delay={0.05} className="mt-8 flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/12 bg-white/4 px-3.5 py-1.5 text-xs text-white/70"
            >
              {tag}
            </span>
          ))}
        </Reveal>
      </Block>

      {/* ── Challenge ────────────────────────────────────── */}
      <Block index={n()} label="The challenge">
        <Reveal>
          <p className="max-w-3xl border-l-2 border-accent pl-6 text-[clamp(1.2rem,2.2vw,1.65rem)] font-semibold leading-snug tracking-tight text-white">
            {study.challenge}
          </p>
        </Reveal>
      </Block>

      {/* ── Insights ─────────────────────────────────────── */}
      <Block index={n()} label="Insights" title="What shaped the decisions">
        <div className="grid gap-4 md:grid-cols-3">
          {study.insights.map((insight, i) => (
            <Reveal key={insight.title} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-white/5 to-transparent p-6 transition-colors duration-500 hover:border-accent/40">
                <span
                  aria-hidden
                  className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-linear-to-r from-accent to-transparent transition-transform duration-700 group-hover:scale-x-100"
                />
                <p className="text-sm font-semibold tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-white">
                  {insight.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {insight.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Block>

      {/* ── Key features ─────────────────────────────────── */}
      <Block index={n()} label="Key features" title="What I built">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {study.features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.05}>
              <div className="flex gap-4">
                <span
                  aria-hidden
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_12px_rgba(255,45,85,0.8)]"
                />
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                    {feature.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Block>

      {/* ── Tech stack ───────────────────────────────────── */}
      <Block index={n()} label="Technologies">
        <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
          {study.stack.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.05}>
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-8 md:p-6">
                <p className="w-40 shrink-0 text-[11px] uppercase tracking-[0.2em] text-white/40">
                  {group.group}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 py-1.5 pl-2 pr-3.5 text-xs font-medium text-white/80"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/40">
                        <SkillIcon
                          skill={item}
                          className="h-3.5 w-3.5"
                          deviconClassName="text-sm leading-none"
                        />
                      </span>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Block>

      {/* ── Screens ──────────────────────────────────────── */}
      <Block index={n()} label="Screens" title="A closer look">
        <div className="grid gap-5 sm:grid-cols-2">
          {study.gallery.map((shot, i) => (
            <Reveal
              key={shot.src}
              delay={(i % 2) * 0.06}
              className={cn(i === 0 && "sm:col-span-2")}
            >
              <figure>
                <a
                  href={shot.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 transition-shadow duration-500 hover:ring-accent/40"
                  aria-label={`Open full-size: ${shot.caption}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      "w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]",
                      i === 0 ? "aspect-video" : "aspect-4/3"
                    )}
                  />
                </a>
                <figcaption className="mt-3 flex items-center gap-2 text-xs text-white/45">
                  <span className="tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {shot.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Block>

      {/* ── Learnings ────────────────────────────────────── */}
      <Block index={n()} label="Learnings" title="What I'd take to the next project">
        <ol className="space-y-5">
          {study.learnings.map((learning, i) => (
            <Reveal key={learning} delay={i * 0.05}>
              <li className="flex gap-5 border-b border-white/6 pb-5 last:border-b-0">
                <span className="text-sm font-semibold tabular-nums text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-relaxed text-white/75">
                  {learning}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Block>

      {/* ── Next project ─────────────────────────────────── */}
      <Link
        href={`/work/${next.slug}`}
        replace
        scroll={false}
        className="group relative mb-16 mt-4 flex flex-col gap-6 overflow-hidden rounded-4xl border border-white/10 bg-white/2 p-6 transition-colors duration-500 hover:border-accent/40 sm:flex-row sm:items-center md:p-8"
      >
        <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-2xl sm:w-44">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={next.preview}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex-1">
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">
            Next project
          </p>
          <p className="mt-2 text-[clamp(1.6rem,3.5vw,2.6rem)] font-extrabold leading-none tracking-[-0.04em] text-white">
            {next.title}
          </p>
          <p className="mt-2 text-sm text-white/45">{next.category}</p>
        </div>
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-500 group-hover:border-accent group-hover:bg-accent">
          <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </article>
  );
}
