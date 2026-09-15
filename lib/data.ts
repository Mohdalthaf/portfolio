export const profile = {
  name: "Mohammed Althaf",
  firstName: "Mohammed",
  lastName: "Althaf",
  title: "Frontend Developer",
  location: "Kochi, Kerala, India",
  email: "mohdalthaftkekm@gmail.com",
  phone: "+91 9633825283",
  linkedin: "https://linkedin.com/in/mohammedalthaftk",
  github: "https://github.com/mohdalthaf",
  summary:
    "Front-end engineer building scalable web applications — from pixel-accurate, accessible interfaces to the REST APIs and auth flows behind them. I work mainly in React and Next.js, but I'm just as comfortable in PHP and Spring Boot when a feature needs a backend.",
  heroTagline:
    "Frontend-focused Full Stack Developer from India. Building fast, accessible interfaces one commit at a time.",
  heroDescription:
    "I enjoy crafting digital experiences that feel effortless, purposeful, and enjoyable. If they make someone's day a little better, I've done my job.",
  heroQuote: {
    text: "Less, but better.",
    author: "Dieter Rams",
  },
  resumeUrl: "/Mohammed-Althaf_CV.pdf",
  availableForWork: true,
};

export const stats = [
  { value: 1, suffix: "+", label: "Years of\nexperience" },
  { value: 6, suffix: "+", label: "Projects\nshipped" },
  { value: 5, suffix: "+", label: "Technologies\nMastered" },
  { value: 500, suffix: "+", label: "Code\nCommits" },
];

export const experience = [
  {
    period: "02/2025 — Present",
    role: "Frontend Developer",
    company: "Veeble Softech India",
    logo: "/assets/resume/icons/veeble-logo.svg",
    points: [
      "Engineered and maintained company websites and ordering systems for seamless user experiences.",
      "Implemented secure login and authentication workflows for smooth, reliable user access.",
      "Integrated secure REST APIs for dynamic data handling, user management, and business functionality.",
      "Ensured accessibility and WCAG compliance, scoring 95+ on Lighthouse audits.",
    ],
  },
  {
    period: "04/2025 — Present",
    role: "Frontend Developer (Consultant)",
    company: "ExTravelMoney India",
    logo: "/assets/resume/icons/extravelmoney-logo.svg",
    points: [
      "Created scalable frontend interfaces and reusable components for consistency across the platform.",
      "Implemented responsive, SEO-friendly designs, increasing organic traffic by 25%.",
      "Built a reusable UI component library on atomic design principles, integrated with Storybook.",
    ],
  },
  {
    period: "01/2024 — 03/2024",
    role: "Software Developer (Intern)",
    company: "Geojit Technologies",
    logo: "/assets/resume/icons/geojit-logo1.svg",
    points: [
      "Developed responsive dashboards in React.js, integrating RESTful APIs for real-time data.",
      "Built backend functionality with Spring Boot, reducing API response time by 15%.",
      "Improved page load times by 35% through code-splitting and lazy loading.",
    ],
  },
];

export const education = [
  {
    period: "06/2022 — 04/2024",
    degree: "Master of Computer Application (MCA)",
    school: "Rajagiri College of Social Sciences (Autonomous)",
    location: "Kerala, India",
    detail: "GPA: 7.4",
  },
  {
    period: "06/2019 — 05/2022",
    degree: "Bachelor of Computer Application (BCA)",
    school: "Rajagiri College of Management and Applied Sciences",
    location: "Kerala, India",
    detail: "GPA: 7.6",
  },
];

export const projects = [
  {
    id: "01",
    title: "Veeble Softech Website",
    role: "Frontend Developer",
    period: "Feb 2025 — Present",
    description:
      "A complete UI/UX overhaul for Veeble's website. The project focused on modernizing the design, improving Core Web Vitals, and enhancing interactivity to deliver a superior user experience.",
    stack: ["JavaScript", "HTML", "CSS", "Tailwind CSS", "REST APIs", "Lighthouse"],
    links: { github: "https://github.com/mohdalthaf", live: "https://www.veeble.com/in/" },
    previews: ["/assets/work/veeble-thumb.png"],
  },
  {
    id: "02",
    title: "VoltReserve",
    role: "Full Stack Developer",
    period: "2025",
    description:
      "A full stack platform for finding and reserving EV charging stations. Built station discovery, booking, and availability flows with a React frontend, Node.js API, and MongoDB.",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs", "Tailwind CSS"],
    links: {
      github: "https://github.com/orgs/VoltReserve/repositories",
      live: "https://voltreserve-alpha.vercel.app/login",
    },
    previews: ["/assets/work/voltreserve-thumb.png"],
  },
  {
    id: "03",
    title: "Volty",
    role: "Full Stack Developer",
    period: "2025",
    description:
      "An AI-powered admin dashboard for operations and insights. Built analytics views, intelligent admin workflows, and a responsive control panel for managing day-to-day system activity.",
    stack: ["React", "Node.js", "MongoDB", "REST APIs", "Tailwind CSS"],
    links: { github: "https://github.com/mohdalthaf", live: "https://voltreserve-alpha.vercel.app/admin-login"},
    previews: ["/assets/work/volty-thumb.png"],
  },
  {
    id: "04",
    title: "Nestora — Real Estate App",
    role: "Full Stack Developer",
    period: "Mar 2026 — Apr 2026",
    description:
      "A cross-platform real estate application with secure authentication, property listings, and responsive UI. Integrated Clerk for auth and Supabase for backend data, with production builds shipped via Expo EAS.",
    stack: ["React Native", "Expo", "Clerk", "Supabase", "Tailwind CSS"],
    links: { github: "https://github.com/mohdalthaf", live: "https://github.com/mohdalthaf" },
    previews: ["/assets/work/nestora-thumb.png"],
  },
  {
    id: "05",
    title: "Velvet Pour",
    role: "Frontend Developer",
    period: "Dec 2024 — Jan 2025",
    description:
      "An interactive cocktail brand landing page with GSAP scroll animations, parallax effects, and video scrolling — built mobile-first with reusable React components.",
    stack: ["React", "Vite", "GSAP", "Tailwind CSS", "JavaScript (ES6+)"],
    links: { github: "https://github.com/mohdalthaf", live: null },
    previews: ["/assets/work/velvet-thumb.png"],
  },
];

export const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
];

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#resume" },
  { label: "Work", href: "#work" },
  { label: "Tech Stack", href: "#tech-stack" },
];

export const heroCopy = {
  eyebrow: `Hey, I'm ${profile.name}`,
  lineOne: "Full Stack",
  lineTwo: "Developer",
  statement: "Code should feel invisible.\nThe experience should speak.",
  description:
    "I build high-performance digital experiences where engineering meets modern visual design.",
};

export const workCopy = {
  eyebrow: "Behind the Builds",
  headline: "Shaping Experiences That Make Life Simpler",
  description:
    "I'm a frontend-focused full stack developer building clean, intuitive interfaces that solve real-world problems.",
  ctaSupport: "Let's Build Something Meaningful Together",
  ctaLabel: "Get in touch",
};
