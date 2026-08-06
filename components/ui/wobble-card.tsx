"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
          : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease-out",
      }}
      className={cn(
        "group relative mx-auto w-full overflow-hidden rounded-2xl bg-surface-2",
        containerClassName
      )}
    >
      <div
        className={cn(
          "relative h-full overflow-hidden transition-[box-shadow,background-image] duration-300 sm:rounded-2xl",
          isHovering
            ? "bg-[radial-gradient(88%_100%_at_top,rgba(0,255,153,0.3),rgba(0,255,153,0.05))]"
            : "bg-[radial-gradient(88%_100%_at_top,rgba(0,255,153,0.12),rgba(0,255,153,0))]"
        )}
        style={{
          boxShadow: isHovering
            ? "0 10px 32px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 255, 153, 0.6), 0 0 28px rgba(0, 255, 153, 0.25)"
            : "0 10px 32px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 255, 153, 0.08)",
        }}
      >
        <motion.div
          style={{
            transform: isHovering
              ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
              : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
            transition: "transform 0.1s ease-out",
          }}
          className={cn("relative h-full px-6 py-8 sm:px-8 sm:py-10", className)}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};
