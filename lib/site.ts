import { profile } from "./data";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mohammedalthaf.dev";

export const siteConfig = {
  name: profile.name,
  shortName: "Mohd-Althaf",
  url: siteUrl,
  title: `${profile.name} — ${profile.title}`,
  description:
    "Frontend-focused full stack developer from Kochi, India. I build fast, accessible web applications with React, Next.js, and TypeScript — from polished interfaces to REST APIs and authentication. View my projects, experience, and tech stack.",
  keywords: [
    profile.name,
    profile.title,
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer Portfolio",
    "Frontend Engineer",
    profile.location,
    "India",
  ],
  locale: "en_IN",
  ogImage: "/assets/work/veeble-thumb.png",
} as const;
