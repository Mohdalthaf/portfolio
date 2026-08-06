export const contactServices = [
  "Frontend Development",
  "Full Stack Project",
  "UI Component Library",
  "Consulting / Code Review",
  "Other",
] as const;

export type ContactService = (typeof contactServices)[number];
