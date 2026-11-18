"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function SectionHeading({
  title,
  titleMuted,
  description,
  eyebrow,
  className = "max-w-2xl",
}: {
  title: string;
  /** Optional second line rendered in a softer tone (editorial two-tone). */
  titleMuted?: string;
  description?: string;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease }}
      className={className}
    >
      {eyebrow && (
        <div className="mb-5 flex items-center gap-3">
          <motion.span
            aria-hidden
            className="h-px w-10 origin-left bg-accent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          />
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
            {eyebrow}
          </p>
        </div>
      )}
      <h2 className="text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-foreground">
        {title}
        {titleMuted && (
          <span className="block text-white/40">{titleMuted}</span>
        )}
      </h2>
      {description && (
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
          {description}
        </p>
      )}
    </motion.div>
  );
}
