"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Eye } from "lucide-react";
import { featuredCaseStudies } from "@/lib/case-studies";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";
import StarBorder from "@/components/StarBorder/StarBorder";
import { ButtonShineHover } from "@/components/shadcn-space/button/button-03";
import { starButton } from "@/components/StarBorder/presets";

const ease = [0.22, 1, 0.36, 1] as const;

export function RecentProjects() {
  return (
    <section className="relative pt-28 lg:pt-36">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Recent Projects"
            title="Fresh off"
            titleMuted="the workbench."
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="max-w-sm text-sm leading-relaxed text-white/55 md:text-[15px]"
          >
            What I&apos;ve been building lately. Open a{" "}
            <span className="text-white">Sneak Peek</span> to see the problem,
            insights, stack and screens behind each one.
          </motion.p>
        </div>

        <div className="mt-14 flex flex-col gap-6 lg:mt-20 lg:gap-8">
          {featuredCaseStudies.map((study, index) => {
            const flip = index % 2 === 1;
            return (
              <motion.article
                key={study.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease }}
                className="group relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-white/6 via-white/2 to-transparent backdrop-blur-xl transition-[border-color,box-shadow] duration-500 hover:border-accent/35 hover:shadow-[0_40px_120px_-40px_rgba(255,45,85,0.45)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div
                  className={cn(
                    "grid lg:grid-cols-[0.9fr_1.1fr]",
                    flip && "lg:grid-cols-[1.1fr_0.9fr]"
                  )}
                >
                  {/* Copy */}
                  <div
                    className={cn(
                      "flex flex-col p-7 md:p-10 lg:p-12",
                      flip && "lg:order-2"
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {study.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/12 bg-white/4 px-3 py-1 text-[11px] text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm font-semibold tabular-nums text-white/25">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="mt-10 text-xs uppercase tracking-[0.24em] text-accent">
                      {study.category}
                    </p>
                    <h3 className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-white">
                      {study.title}
                    </h3>
                    <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 md:text-[15px]">
                      {study.summary}
                    </p>

                    <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm">
                      <div>
                        <dt className="text-[11px] uppercase tracking-[0.2em] text-white/35">
                          Role
                        </dt>
                        <dd className="mt-1 text-white">{study.role}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] uppercase tracking-[0.2em] text-white/35">
                          Timeline
                        </dt>
                        <dd className="mt-1 text-white">{study.timeline}</dd>
                      </div>
                    </dl>

                    <div className="mt-10 flex flex-wrap items-center gap-3 lg:mt-auto lg:pt-10">
                      <StarBorder
                        as={Link}
                        href={`/work/${study.slug}`}
                        scroll={false}
                        {...starButton}
                        className="px-5! py-3! text-xs! font-semibold! tracking-wide whitespace-nowrap"
                      >
                        <Eye className="h-4 w-4" />
                        Sneak Peek
                      </StarBorder>
                      {study.links.live && (
                        <ButtonShineHover
                          title="Visit live"
                          aria-label={`Visit ${study.title} live`}
                          className="h-10 w-auto gap-2 px-5"
                          onClick={() =>
                            window.open(study.links.live!, "_blank", "noopener,noreferrer")
                          }
                        >
                          <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-semibold tracking-wide">
                            Visit live
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </span>
                        </ButtonShineHover>
                      )}
                    </div>
                  </div>

                  {/* Preview */}
                  <Link
                    href={`/work/${study.slug}`}
                    scroll={false}
                    aria-label={`Sneak peek: ${study.title}`}
                    className={cn(
                      "relative block min-h-64 overflow-hidden sm:min-h-80 lg:min-h-[30rem]",
                      flip && "lg:order-1"
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={study.preview}
                      alt={`${study.title} preview`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden
                      className={cn(
                        "absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent lg:bg-linear-to-r lg:from-black/40",
                        flip && "lg:bg-linear-to-l"
                      )}
                    />
                    <span className="absolute bottom-5 right-5 inline-flex translate-y-2 items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <Eye className="h-3.5 w-3.5" />
                      View case study
                    </span>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
