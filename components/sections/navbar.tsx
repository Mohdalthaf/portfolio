"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { nav, profile } from "@/lib/data";
import { useSectionNav } from "@/components/section-nav";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

function NavLink({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate: (href: string) => void;
}) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(href);
      }}
      className={`relative text-sm transition-colors ${
        active ? "text-accent" : "text-muted hover:text-foreground"
      }`}
    >
      {label}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-1.5 left-0 h-px w-full bg-accent"
        />
      )}
    </a>
  );
}

export function Navbar() {
  const { active, navigateToSection } = useSectionNav();
  const [open, setOpen] = useState(false);

  function navigate(href: string) {
    navigateToSection(href);
    setOpen(false);
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            navigate("#home");
          }}
          className="text-lg font-bold tracking-tight"
        >
          Mohd-Althaf
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={active === item.label}
              onNavigate={navigateToSection}
            />
          ))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="text-foreground md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="text-lg font-bold">
              {profile.firstName}
              <span className="text-accent">.</span>
            </SheetTitle>
            <nav className="mt-10 flex flex-col gap-6">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.href);
                  }}
                  className={`text-base ${
                    active === item.label ? "text-accent" : "text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
