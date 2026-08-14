"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  title,
  description,
  eyebrow,
  className = "max-w-2xl",
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold tracking-[-0.03em] text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          {description}
        </p>
      )}
    </motion.div>
  );
}
