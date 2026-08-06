import { ArrowUp } from "lucide-react";
import { profile, socials, nav } from "@/lib/data";
import DecryptedText from "@/components/DecryptedText";

const copyrightText = `© ${new Date().getFullYear()} ${profile.name}. All rights reserved.`;

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <a href="#home" className="text-lg font-bold tracking-tight">
            Mohd-Althaf
            <span className="text-accent">.</span>
          </a>
          <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted">
            {profile.heroTagline} Building fast, accessible interfaces one
            commit at a time.
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-xs text-muted hover:text-foreground">
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
                    className="text-xs text-muted hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-muted sm:flex-row">
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
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 transition-colors hover:border-accent hover:text-accent"
          >
            Back to top <ArrowUp className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
