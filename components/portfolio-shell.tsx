"use client";

import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Resume } from "@/components/sections/resume";
import { TechStack } from "@/components/sections/tech-stack";
import { Work } from "@/components/sections/work";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { SectionNavProvider } from "@/components/section-nav";
import { Toaster } from "@/components/ui/sonner";
import SplashCursor from "@/components/SplashCursor";
import Particles from "@/components/Particles";

const sectionAnchorClassName = "scroll-mt-20";

export function PortfolioShell() {
  return (
    <SectionNavProvider>
      <div className="pointer-events-none fixed inset-0 z-0">
        <Particles
          className="h-full w-full"
          particleCount={180}
          particleColors={["#00ff99", "#66ffbb", "#ffffff"]}
          alphaParticles
          moveParticlesOnHover
          particleHoverFactor={0.6}
          particleBaseSize={90}
          speed={0.08}
          sizeRandomness={0.8}
        />
      </div>
      <SplashCursor RAINBOW_MODE={false} COLOR="#00ff99" TRANSPARENT />
      <Navbar />
      <main className="relative z-10 w-full overflow-x-hidden">
        <div id="home" className={sectionAnchorClassName}>
          <Hero />
        </div>
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
          <Footer />
        </div>
      </main>
      <Toaster />
    </SectionNavProvider>
  );
}
