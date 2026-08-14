/** Tech stack icons — Devicon plain variants (color via CSS for hover effects) */
export const resumeSkills = [
  { name: "HTML5", devicon: "devicon-html5-plain" },
  { name: "CSS3", devicon: "devicon-css3-plain" },
  { name: "JavaScript", devicon: "devicon-javascript-plain" },
  { name: "TypeScript", devicon: "devicon-typescript-plain" },
  { name: "React", devicon: "devicon-react-plain" },
  { name: "Next.js", devicon: "devicon-nextjs-plain" },
  { name: "Tailwind CSS", devicon: "devicon-tailwindcss-plain" },
  { name: "Spring Boot", devicon: "devicon-spring-plain" },
  { name: "Java", devicon: "devicon-java-plain" },
  { name: "Node.js", devicon: "devicon-nodejs-plain" },
  { name: "MySQL", devicon: "devicon-mysql-plain" },
  { name: "Git", devicon: "devicon-git-plain" },
  { name: "GitHub", devicon: "devicon-github-plain" },
  { name: "Postman", devicon: "devicon-postman-plain" },
] as const;

export type ResumeSkill = (typeof resumeSkills)[number];

export const techStackCategories = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Fast, responsive UIs with modern frameworks and component-driven architecture.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React",
      "TypeScript",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "Shadcn UI",
      "Framer Motion",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Secure APIs and server-side services built for scale and performance.",
    skills: [
      "Java",
      "Node.js",
      "Spring Boot",
      "Express.js",
      "REST APIs",
      "Authentication",
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description: "Cross-platform mobile apps with native-like performance and UX.",
    skills: ["React Native", "Expo", "Clerk"],
  },
  {
    id: "database",
    title: "Database & Cloud",
    description: "Data storage, auth, deployment, and cloud services for production apps.",
    skills: ["MySQL", "MongoDB", "Supabase"],
  },
  {
    id: "tools",
    title: "Tools",
    description: "Version control, collaboration, testing, and day-to-day dev workflow.",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "IntelliJ IDEA",
      "Postman",
      "Cursor",
      "Claude",
    ],
  },
] as const;

export type TechStackCategory = (typeof techStackCategories)[number];

export function getAllTechStackSkills() {
  const seen = new Set<string>();

  return techStackCategories.flatMap((category) =>
    category.skills.filter((skill) => {
      if (seen.has(skill)) return false;
      seen.add(skill);
      return true;
    }),
  );
}

export type SkillIcon =
  | { type: "devicon"; className: string }
  | { type: "svg"; src: string; alt: string };

const skillIconMap: Record<string, SkillIcon> = {
  HTML5: { type: "devicon", className: "devicon-html5-plain colored" },
  HTML: { type: "devicon", className: "devicon-html5-plain colored" },
  CSS3: { type: "devicon", className: "devicon-css3-plain colored" },
  CSS: { type: "devicon", className: "devicon-css3-plain colored" },
  JavaScript: { type: "devicon", className: "devicon-javascript-plain colored" },
  "JavaScript (ES6+)": {
    type: "devicon",
    className: "devicon-javascript-plain colored",
  },
  TypeScript: { type: "devicon", className: "devicon-typescript-plain colored" },
  React: { type: "devicon", className: "devicon-react-plain colored" },
  "React.js": { type: "devicon", className: "devicon-react-plain colored" },
  "React Native": {
    type: "devicon",
    className: "devicon-reactnative-original colored",
  },
  "Next.js": {
    type: "svg",
    src: "/assets/skills/nextjs.svg",
    alt: "Next.js",
  },
  "Tailwind CSS": {
    type: "devicon",
    className: "devicon-tailwindcss-plain colored",
  },
  NativeWind: {
    type: "devicon",
    className: "devicon-tailwindcss-plain colored",
  },
  "Shadcn UI": {
    type: "svg",
    src: "/assets/skills/shadcn-ui.svg",
    alt: "Shadcn UI",
  },
  "Framer Motion": {
    type: "svg",
    src: "/assets/skills/framer-motion.svg",
    alt: "Framer Motion",
  },
  Java: { type: "devicon", className: "devicon-java-plain colored" },
  "Spring Boot": { type: "devicon", className: "devicon-spring-plain colored" },
  "Node.js": { type: "devicon", className: "devicon-nodejs-plain colored" },
  "Express.js": {
    type: "svg",
    src: "/assets/skills/express.svg",
    alt: "Express.js",
  },
  "REST APIs": { type: "devicon", className: "devicon-openapi-plain colored" },
  Authentication: {
    type: "devicon",
    className: "devicon-passport-plain colored",
  },
  MySQL: { type: "devicon", className: "devicon-mysql-plain colored" },
  MongoDB: { type: "devicon", className: "devicon-mongodb-plain colored" },
  Supabase: { type: "devicon", className: "devicon-supabase-plain colored" },
  Expo: { type: "devicon", className: "devicon-expo-original colored" },
  Clerk: { type: "svg", src: "/assets/skills/clerk.svg", alt: "Clerk" },
  Git: { type: "devicon", className: "devicon-git-plain colored" },
  GitHub: {
    type: "svg",
    src: "/assets/skills/github.svg",
    alt: "GitHub",
  },
  "VS Code": { type: "devicon", className: "devicon-vscode-plain colored" },
  "IntelliJ IDEA": {
    type: "devicon",
    className: "devicon-intellij-plain colored",
  },
  Postman: { type: "devicon", className: "devicon-postman-plain colored" },
  Cursor: {
    type: "svg",
    src: "/assets/skills/cursor.svg",
    alt: "Cursor",
  },
  Claude: {
    type: "svg",
    src: "/assets/skills/claude.svg",
    alt: "Claude",
  },
  Figma: { type: "devicon", className: "devicon-figma-plain colored" },
  Docker: { type: "devicon", className: "devicon-docker-plain colored" },
  PHP: { type: "devicon", className: "devicon-php-plain colored" },
  Vite: { type: "devicon", className: "devicon-vitejs-plain colored" },
  Lighthouse: { type: "devicon", className: "devicon-chrome-plain colored" },
};

export function getSkillIcon(skill: string): SkillIcon | undefined {
  return skillIconMap[skill];
}
