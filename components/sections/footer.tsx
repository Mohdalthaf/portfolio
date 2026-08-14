"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { profile, socials, nav } from "@/lib/data";
import DecryptedText from "@/components/DecryptedText";
import { BrandLogo } from "@/components/brand-logo";
import { useSectionNav } from "@/components/section-nav";

export function Footer() {
  const { navigateToSection } = useSectionNav();
  const [copyrightText, setCopyrightText] = useState(
    `© ${profile.name}. All rights reserved.`
  );

  useEffect(() => {
    setCopyrightText(
      `© ${new Date().getFullYear()} ${profile.name}. All rights reserved.`
    );
  }, []);

  return (
    <div>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 md:px-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              navigateToSection("#home");
            }}
            className="inline-block text-lg leading-none transition-opacity hover:opacity-90"
          >
            <BrandLogo />
          </a>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted">
            {profile.heroTagline}
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToSection(item.href);
                    }}
                    className="text-xs uppercase tracking-[0.14em] text-muted transition hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.label !== "Email" ? "_blank" : undefined}
                    rel="noreferrer"
                    className="text-xs uppercase tracking-[0.14em] text-muted transition hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-muted md:px-10 sm:flex-row">
          <DecryptedText
            text={copyrightText}
            animateOn="view"
            sequential
            revealDirection="start"
            speed={35}
            className="text-muted"
            encryptedClassName="text-muted/40"
          />
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              navigateToSection("#home");
            }}
            className="flex items-center gap-1.5 border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-colors hover:border-accent hover:text-accent"
          >
            Back to top <ArrowUp className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
