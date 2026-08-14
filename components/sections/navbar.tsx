"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, Menu } from "lucide-react";
import { nav, profile, socials } from "@/lib/data";
import { useSectionNav } from "@/components/section-nav";
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
        active ? "text-white" : "text-white/55 hover:text-white"
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
          <nav className="flex items-center gap-8">
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
