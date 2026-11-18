"use client";

import { ArrowUp } from "lucide-react";
import { nav, profile, socials } from "@/lib/data";
import { BrandLogo } from "@/components/brand-logo";
import { useSectionNav } from "@/components/section-nav";

const exploreLinks = nav.slice(0, 2);
const pageLinks = [...nav.slice(2), { label: "Contact", href: "#contact" }];

export function Footer() {
  const { navigateToSection } = useSectionNav();
  const year = new Date().getFullYear();

  return (
    <div className="bg-transparent font-mono text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:px-10 lg:grid-cols-[1.1fr_1.4fr] lg:items-start lg:gap-16 lg:py-20">
        <div className="max-w-xs">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              navigateToSection("#home");
            }}
            className="inline-block text-lg leading-none transition-opacity hover:opacity-90 md:text-xl"
          >
            <BrandLogo />
          </a>
          <p className="mt-5 text-sm leading-relaxed text-white/80 md:text-[15px]">
            {profile.heroTagline}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:justify-items-end">
          <FooterColumn>
            {exploreLinks.map((item) => (
              <FooterLink
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToSection(item.href);
                }}
              >
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn>
            {pageLinks.map((item) => (
              <FooterLink
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToSection(item.href);
                }}
              >
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn>
            {socials.map((item) => (
              <FooterLink
                key={item.label}
                href={item.href}
                external={item.label !== "Email"}
              >
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <div className="flex justify-end sm:justify-start lg:justify-end">
            <button
              type="button"
              aria-label="Back to top"
              onClick={() => navigateToSection("#home")}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-accent hover:text-accent"
            >
              <ArrowUp className="h-4 w-4 animate-bounce" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden px-2 pb-0 sm:px-4">
        <p
          aria-label={`${profile.firstName} Althaf`}
          className="select-none translate-y-[22%] whitespace-nowrap text-center font-mono text-[clamp(2.35rem,12.4vw,11.5rem)] font-extrabold  leading-[0.78] tracking-[-0.045em] text-white/75"
        >
          Mohd Althaf
          <sup className="ml-1 align-super text-[0.22em] font-medium tracking-normal text-white/45">
            ©{year}
          </sup>
        </p>
      </div>
    </div>
  );
}

function FooterColumn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  onClick,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="text-sm text-white/75 transition-colors hover:text-white"
      >
        {children}
      </a>
    </li>
  );
}
