"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function ButtonWithIcon({
  label = "Let's Talk",
  onClick,
  className = "",
}: {
  label?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className={`relative h-12 w-fit cursor-pointer overflow-hidden rounded-full p-1 ps-6 pe-14 text-sm font-medium transition-all duration-500 group hover:ps-14 hover:pe-6 ${className}`}
    >
      <span className="relative z-10 transition-all duration-500">{label}</span>
      <div className="absolute right-1 flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </div>
    </Button>
  );
}
