"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const shineClassName =
  "relative cursor-pointer overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)]";

export function ButtonShineHover({
  children,
  className,
  title,
  type = "button",
  ...props
}: React.ComponentProps<typeof Button> & {
  children?: ReactNode;
  title?: string;
}) {
  return (
    <Button
      type={type}
      title={title}
      variant="ghost"
      size="icon"
      className={cn(
        shineClassName,
        "h-9 w-9 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10",
        className
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center justify-center">
        {children}
      </span>
    </Button>
  );
}
