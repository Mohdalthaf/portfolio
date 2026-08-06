"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { nav } from "@/lib/data";

type SectionNavContextValue = {
  active: string;
  navigateToSection: (href: string) => void;
};

const SectionNavContext = createContext<SectionNavContextValue | null>(null);

export function useSectionNav() {
  const ctx = useContext(SectionNavContext);
  if (!ctx) {
    throw new Error("useSectionNav must be used within SectionNavProvider");
  }
  return ctx;
}

function hrefToId(href: string) {
  return href.replace(/^#/, "") || "home";
}

function idToLabel(id: string) {
  return nav.find((item) => item.href === `#${id}`)?.label ?? nav[0].label;
}

export function SectionNavProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState("home");
  const active = idToLabel(activeId);

  const sectionIds = useMemo(
    () => nav.map((item) => hrefToId(item.href)),
    []
  );

  const navigateToSection = useCallback((href: string) => {
    const id = hrefToId(href);
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`);
    }
    setActiveId(id);
  }, []);

  useEffect(() => {
    const offset = 120;

    const resolveActiveSection = () => {
      const scrollY = window.scrollY;
      const viewportBottom = scrollY + window.innerHeight;
      const pageBottom = document.documentElement.scrollHeight;

      if (viewportBottom >= pageBottom - 8) {
        setActiveId(sectionIds[sectionIds.length - 1]);
        return;
      }

      let currentId = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.getBoundingClientRect().top + scrollY;
        if (top - offset <= scrollY) {
          currentId = id;
        }
      }

      setActiveId(currentId);
    };

    resolveActiveSection();

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(resolveActiveSection);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resolveActiveSection);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resolveActiveSection);
    };
  }, [sectionIds]);

  useEffect(() => {
    const id = hrefToId(window.location.hash);
    if (sectionIds.includes(id)) {
      setActiveId(id);
    }
  }, [sectionIds]);

  useEffect(() => {
    const syncFromHash = () => {
      const id = hrefToId(window.location.hash);
      if (!sectionIds.includes(id)) return;

      setActiveId(id);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
    };
  }, [sectionIds]);

  return (
    <SectionNavContext.Provider value={{ active, navigateToSection }}>
      {children}
    </SectionNavContext.Provider>
  );
}
