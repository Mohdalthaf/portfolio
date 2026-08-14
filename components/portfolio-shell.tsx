"use client";

import { useRef } from "react";
import { Navbar } from "@/components/sections/navbar";
import {
  CinematicBackdrop,
  CinematicIntro,
} from "@/components/cinematic-intro";
import { Resume } from "@/components/sections/resume";
import { TechStack } from "@/components/sections/tech-stack";
import { Work } from "@/components/sections/work";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { SectionNavProvider } from "@/components/section-nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Toaster } from "@/components/ui/sonner";

const sectionAnchorClassName = "scroll-mt-24";

export function PortfolioShell() {
  const trackRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement | null>(null);

  return (
    <SmoothScroll>
      <SectionNavProvider>
        <CinematicBackdrop
          trackRef={trackRef}
          introRef={introRef}
        />
        <Navbar />

        <div ref={trackRef} className="relative z-10">
          <CinematicIntro sectionRef={introRef} />
          <main className="relative w-full overflow-x-hidden bg-transparent">
            <div id="resume" className={sectionAnchorClassName}>
              <Resume />
            </div>
            <div id="work" className={sectionAnchorClassName}>
              <Work />
            </div>
            <div id="tech-stack" className={sectionAnchorClassName}>
              <TechStack />
            </div>
            <div id="contact" className={sectionAnchorClassName}>
              <Contact />
            </div>
          </main>

          <footer className="relative border-t border-white/10 bg-transparent">
            <Footer />
          </footer>
        </div>

        <Toaster />
      </SectionNavProvider>
    </SmoothScroll>
  );
}
