"use client";

import { useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, Menu } from "lucide-react";
import { nav, profile, socials } from "@/lib/data";
import { useSectionNav } from "@/components/section-nav";
import GooeyNav from "@/components/GooeyNav/GooeyNav";
import { BrandLogo } from "@/components/brand-logo";
import { ButtonWithIcon } from "@/components/shadcn-space/button/button-01";
import { ButtonShineHover } from "@/components/shadcn-space/button/button-03";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
} as const;

// Label-only items render as <button>s, so GooeyNav never follows a hash
// itself â€” scrolling is left to navigateToSection (Lenis-aware).
const gooeyItems = nav.map((item) => ({ label: item.label }));

export function Navbar() {
  const { active, navigateToSection } = useSectionNav();
  const [open, setOpen] = useState(false);
  const activeIndex = Math.max(
    0,
    nav.findIndex((item) => item.label === active)
  );

  function navigate(href: string) {
    navigateToSection(href);
    setOpen(false);
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#050505]"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            navigate("#home");
          }}
          className="text-lg leading-none transition-opacity hover:opacity-90 md:text-xl"
        >
          <BrandLogo />
        </a>

        <div className="hidden items-center gap-10 md:flex">
          <GooeyNav
            items={gooeyItems}
            activeIndex={activeIndex}
            onChange={(index) => navigateToSection(nav[index].href)}
            color="#ff2d55"
            activeTextColor="#ffffff"
            colors={["#ff2d55", "#ff6b86", "#ffffff"]}
            size="md"
            // Match the 48px "Let's Talk" button: 6px frame + 9.5px pill padding + ~17px text
            style={{ "--gn-y": "9.5px" } as CSSProperties}
          />

          <ButtonWithIcon
            label="Let's Talk"
            onClick={() => navigate("#contact")}
          />
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="text-white md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetTitle className="text-lg leading-none">
              <BrandLogo />
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
              <ButtonWithIcon
                label="Let's Talk"
                onClick={() => navigate("#contact")}
              />
            </nav>

            <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-10">
              {socials.map((s) => {
                const Icon = socialIcons[s.label as keyof typeof socialIcons];
                const isEmail = s.label === "Email";
                return (
                  <ButtonShineHover
                    key={s.label}
                    title={s.label}
                    aria-label={s.label}
                    onClick={() => {
                      if (isEmail) {
                        window.location.href = `mailto:${profile.email}`;
                      } else {
                        window.open(s.href, "_blank", "noopener,noreferrer");
                      }
                      setOpen(false);
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </ButtonShineHover>
                );
              })}
              <ButtonShineHover
                title="Download CV"
                aria-label="Download CV"
                className="h-9 w-auto gap-2 px-4"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = profile.resumeUrl;
                  link.download = "";
                  link.click();
                  setOpen(false);
                }}
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide">
                  <Download className="h-3.5 w-3.5" />
                  Download CV
                </span>
              </ButtonShineHover>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
