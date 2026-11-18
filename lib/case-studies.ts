/**
 * Case-study ("Sneak Peek") content for each project.
 *
 * Everything shown on /work/[slug] and in the Sneak Peek overlay comes from
 * here — edit copy, screenshots, or highlights without touching components.
 *
 * `highlights` should only contain real, verifiable numbers. Leave the array
 * empty and the section is hidden.
 */

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  role: string;
  timeline: string;
  platform: string;
  /** Shown in the Recent Projects section when true. */
  featured?: boolean;
  /** Portrait cover (3:4) — used on the hero. */
  cover: string;
  /** Landscape preview — used on Recent Projects cards. */
  preview: string;
  /** One or two lines for cards. */
  summary: string;
  overview: string;
  tags: string[];
  highlights: { value: string; label: string }[];
  challenge: string;
  insights: { title: string; text: string }[];
  features: { title: string; text: string }[];
  stack: { group: string; items: string[] }[];
  gallery: { src: string; alt: string; caption: string }[];
  learnings: string[];
  links: { live?: string | null; github?: string | null };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "veeble",
    title: "Veeble Softech Website",
    tagline: "A faster, clearer storefront for a hosting company.",
    category: "Web Hosting · Corporate Website",
    year: "2025",
    role: "Frontend Developer",
    timeline: "Feb 2025 — Present",
    platform: "Web (responsive)",
    featured: true,
    cover: "/assets/work/veeble-thumb.webp",
    preview: "/assets/work/veeble-thumb3.webp",
    summary:
      "A complete UI/UX overhaul of Veeble's marketing site and ordering flows — modern design, better Core Web Vitals, and accessible by default.",
    overview:
      "Veeble sells hosting, VPS, cloud, domains and SSL to businesses in India. I rebuilt the public website and the pages that lead into ordering, modernising the visual design while making every page faster and easier to navigate.",
    tags: ["Website", "Ordering flows", "Accessibility", "Performance"],
    highlights: [
      { value: "95+", label: "Lighthouse\nscore" },
      { value: "WCAG", label: "Accessibility\ncompliant" },
    ],
    challenge:
      "Hosting products are hard to compare. Visitors had to dig through dense plan tables and inconsistent pages before they could choose a product, and slow pages made that journey even longer.",
    insights: [
      {
        title: "Decisions happen on the plan cards",
        text: "Price, renewal and key specs need to be visible together — so plan cards were redesigned to answer the main questions without opening another page.",
      },
      {
        title: "Speed is part of the trust signal",
        text: "For a hosting company, a slow website undermines the product. Core Web Vitals were treated as a design requirement, not an afterthought.",
      },
      {
        title: "Support must be one click away",
        text: "First-time buyers want reassurance. Sales and technical support entry points were surfaced across product pages.",
      },
    ],
    features: [
      {
        title: "Domain search hero",
        text: "Search-first landing with instant pricing so visitors can start where most journeys begin.",
      },
      {
        title: "Product & plan pages",
        text: "Consistent layouts for hosting, VPS, cloud and SSL with scannable plan comparison.",
      },
      {
        title: "Secure login & auth",
        text: "Smooth, reliable sign-in workflows connected to the customer area.",
      },
      {
        title: "REST API integration",
        text: "Dynamic pricing and product data pulled from APIs instead of hard-coded content.",
      },
    ],
    stack: [
      { group: "Frontend", items: ["JavaScript", "HTML", "CSS", "Tailwind CSS"] },
      { group: "Integration", items: ["REST APIs"] },
      { group: "Quality", items: ["Lighthouse"] },
    ],
    gallery: [
      {
        src: "/assets/work/veeble-thumb3.webp",
        alt: "Veeble domain search landing page on desktop and mobile",
        caption: "Domain search landing — desktop and mobile",
      },
      {
        src: "/assets/work/veeble-thumb2.webp",
        alt: "Veeble domain pages with pricing and support sections",
        caption: "Domain pricing, support and transfer flow",
      },
      {
        src: "/assets/work/veeble-thumb.webp",
        alt: "Veeble managed hosting homepage",
        caption: "Managed hosting homepage",
      },
    ],
    learnings: [
      "Performance budgets are easiest to keep when they're set before the first component is built.",
      "Accessibility fixes made early cost minutes; the same fixes late cost days.",
      "Consistent page templates let a small team ship many product pages without the design drifting.",
    ],
    links: { live: "https://www.veeble.com/in/", github: null },
  },
  {
    slug: "extravelmoney",
    title: "ExTravelMoney",
    tagline: "Forex and money transfers — extra simple.",
    category: "Fintech · Forex Ordering System",
    year: "2025 — 2026",
    role: "Frontend Developer (Consultant)",
    timeline: "Aug 2025 — Jun 2026",
    platform: "Web (responsive)",
    cover: "/assets/work/extravelmoney-thumb.webp",
    preview: "/assets/work/extravelmoney-thumb2.webp",
    summary:
      "A secure forex ordering system processing 500+ transactions a month with 99.9% uptime — built on a white-label theme system.",
    overview:
      "ExTravelMoney helps people in India buy foreign currency, load forex cards and send money abroad at better rates through RBI-authorised partners. I built the frontend of its forex ordering system and the reusable component library behind the platform's interfaces.",
    tags: ["Fintech", "Ordering System", "White-label Theming", "SEO"],
    highlights: [
      { value: "500+", label: "Transactions\nper month" },
      { value: "99.9%", label: "Uptime" },
      { value: "+25%", label: "Organic\ntraffic" },
    ],
    challenge:
      "Ordering forex involves rates, destinations, purposes of remittance and compliance details — and customers need to trust the flow with their money. The ordering experience had to stay simple and dependable, and the same product had to be deployable for different businesses under their own branding.",
    insights: [
      {
        title: "Quote first, details later",
        text: "Customers want to see what they'll get before committing, so the flow leads with destination, purpose and amount, and asks for the rest after the quote.",
      },
      {
        title: "One product, many brands",
        text: "Instead of forking the UI per partner, a theme system drives colours and branding so the same ordering system can be white-labelled.",
      },
      {
        title: "Consistency builds trust",
        text: "In a money product, inconsistent UI reads as risk. A shared component library keeps every screen behaving the same way.",
      },
    ],
    features: [
      {
        title: "Forex ordering flow",
        text: "Currency, forex card and money-transfer orders from quote to checkout.",
      },
      {
        title: "White-label theme system",
        text: "Branding and colours configurable per business, so the platform can be deployed across different environments.",
      },
      {
        title: "Reusable component library",
        text: "Built on atomic design principles and documented in Storybook as part of the design system.",
      },
      {
        title: "SEO-friendly, responsive pages",
        text: "Responsive layouts and search-friendly markup that grew organic traffic by 25%.",
      },
    ],
    stack: [
      { group: "Frontend", items: ["JavaScript", "HTML", "CSS", "Tailwind CSS"] },
      { group: "Integration", items: ["REST APIs"] },
      { group: "Quality", items: ["Lighthouse"] },
    ],
    gallery: [
      {
        src: "/assets/work/extravelmoney-thumb2.webp",
        alt: "ExTravelMoney homepage with the send-money quote form",
        caption: "Homepage and send-money quote form",
      },
      {
        src: "/assets/work/extravelmoney-shot2.webp",
        alt: "ExTravelMoney how-it-works steps: compare rates, transfer funds, get credit",
        caption: "How it works — compare, transfer, get credit",
      },
      {
        src: "/assets/work/extravelmoney-shot3.webp",
        alt: "ExTravelMoney specialist support section",
        caption: "Talk to a money-transfer specialist",
      },
    ],
    learnings: [
      "Theming is an architecture decision — designing tokens up front made white-labelling a configuration change, not a rewrite.",
      "A component library pays for itself as soon as a second team or brand starts using it.",
      "In fintech, clarity is a feature: fewer surprises in the flow means fewer abandoned orders.",
    ],
    links: { live: "https://www.extravelmoney.com/", github: null },
  },
  {
    slug: "nestora",
    title: "Nestora",
    tagline: "Finding a home, from the palm of your hand.",
    category: "Real Estate · Mobile App",
    year: "2026",
    role: "Full Stack Developer",
    timeline: "Mar 2026 — Apr 2026",
    platform: "iOS & Android (Expo)",
    cover: "/assets/work/nestora-thumb.webp",
    preview: "/assets/work/nestora-thumb2.webp",
    summary:
      "A cross-platform real estate app with secure authentication, property listings and a responsive UI — shipped to production with Expo EAS.",
    overview:
      "Nestora is a cross-platform real estate app for browsing, saving and enquiring about properties. I built it end to end: the React Native interface, authentication with Clerk, and the Supabase backend that stores listings and user data.",
    tags: ["Mobile App", "Authentication", "Listings", "Dashboard"],
    highlights: [],
    challenge:
      "Property search on mobile is usually a cramped version of a desktop site. The goal was a native-feeling experience that works on both iOS and Android from a single codebase, with sign-in that's secure but painless.",
    insights: [
      {
        title: "Photos sell properties",
        text: "Listings lead with large imagery and keep price and location visible at a glance, so users can triage quickly.",
      },
      {
        title: "Saving is the real conversion",
        text: "Most users aren't ready to enquire on day one — favourites let them build a shortlist and come back.",
      },
      {
        title: "Auth shouldn't be a wall",
        text: "Visitors can browse freely; sign-in is only asked for when it adds value, like saving or contacting an agent.",
      },
    ],
    features: [
      {
        title: "Property discovery",
        text: "Featured listings, categories and search to explore homes quickly.",
      },
      {
        title: "Secure authentication",
        text: "Clerk-powered sign-up and sign-in with session handling.",
      },
      {
        title: "Favourites & shortlist",
        text: "Save properties and return to them later across devices.",
      },
      {
        title: "Production builds",
        text: "Shipped via Expo EAS for both iOS and Android.",
      },
    ],
    stack: [
      { group: "Mobile", items: ["React Native", "Expo", "Tailwind CSS"] },
      { group: "Backend", items: ["Supabase"] },
      { group: "Auth", items: ["Clerk"] },
    ],
    gallery: [
      {
        src: "/assets/work/nestora-thumb2.webp",
        alt: "Nestora dashboard and mobile listing screens",
        caption: "Listings dashboard and mobile property view",
      },
      {
        src: "/assets/work/nestora-thumb.webp",
        alt: "Nestora mobile app home, listings and sign-in screens",
        caption: "Home, saved properties and sign-in",
      },
    ],
    learnings: [
      "One codebase for iOS and Android only pays off if platform differences are designed for from the start.",
      "Managed auth (Clerk) and a hosted backend (Supabase) let me spend time on the product instead of plumbing.",
      "Building for production with EAS early surfaces config problems before launch week.",
    ],
    links: { live: null, github: "https://github.com/mohdalthaf" },
  },
  {
    slug: "voltreserve",
    title: "VoltReserve",
    tagline: "Smart EV charging. Seamless booking.",
    category: "EV Charging · Full Stack Platform",
    year: "2026",
    role: "Full Stack Developer",
    timeline: "Jul 2026 — Aug 2026",
    platform: "Web (responsive)",
    cover: "/assets/work/voltreserve-thumb.webp",
    preview: "/assets/work/voltreserve-thumb.webp",
    summary:
      "A full stack platform for finding and reserving EV charging stations — discovery, booking and live availability.",
    overview:
      "VoltReserve helps EV drivers find nearby charging stations, check availability and reserve a slot before they arrive. I built the React frontend, the Node.js / Express API and the MongoDB data model behind stations and bookings.",
    tags: ["Web App", "Booking", "Maps & Discovery", "REST API"],
    highlights: [],
    challenge:
      "Drivers often arrive at a charger only to find it occupied or offline. The platform needed to show real availability and make reserving a slot as quick as finding one.",
    insights: [
      {
        title: "Availability first",
        text: "Station status is the deciding factor, so it is shown up front on every station card.",
      },
      {
        title: "Booking in a few taps",
        text: "The reservation flow keeps steps to a minimum: pick a station, pick a time, confirm.",
      },
      {
        title: "Drivers and operators need different views",
        text: "Driver-facing booking and the operator dashboard (Volty) share one API but are designed for different jobs.",
      },
    ],
    features: [
      {
        title: "Station discovery",
        text: "Find nearby chargers with status, connector and pricing details.",
      },
      {
        title: "Slot reservation",
        text: "Book a charging window and manage upcoming reservations.",
      },
      {
        title: "Real-time updates",
        text: "Availability reflected as bookings change.",
      },
      {
        title: "OTP authentication",
        text: "Passwordless OTP sign-in for drivers, with secure sessions and booking history.",
      },
    ],
    stack: [
      { group: "Frontend", items: ["React", "Tailwind CSS"] },
      { group: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
      { group: "Database", items: ["MongoDB"] },
    ],
    gallery: [
      {
        src: "/assets/work/voltreserve-thumb.webp",
        alt: "VoltReserve booking screens on desktop and mobile",
        caption: "Station discovery and booking — desktop and mobile",
      },
    ],
    learnings: [
      "Modelling time slots carefully up front avoids double bookings later.",
      "A clean REST API made it straightforward to build a second client — the Volty admin dashboard — on the same data.",
    ],
    links: {
      live: "https://voltreserve-alpha.vercel.app/login",
      github: "https://github.com/orgs/VoltReserve/repositories",
    },
  },
  {
    slug: "volty",
    title: "Volty",
    tagline: "The control room for EV charging operations.",
    category: "Admin Dashboard · Analytics",
    year: "2025",
    role: "Full Stack Developer",
    timeline: "2025",
    platform: "Web (desktop-first)",
    cover: "/assets/work/volty-thumb.webp",
    preview: "/assets/work/volty-thumb.webp",
    summary:
      "An AI-powered admin dashboard for operations and insights — analytics, admin workflows and a responsive control panel.",
    overview:
      "Volty is the operator side of VoltReserve: an admin dashboard for managing stations, bookings and users, with analytics views that turn day-to-day activity into insight.",
    tags: ["Dashboard", "Analytics", "Admin Workflows"],
    highlights: [],
    challenge:
      "Operators were juggling stations, bookings and users across separate views. They needed one place to see what's happening and act on it quickly.",
    insights: [
      {
        title: "Overview before detail",
        text: "The landing view summarises activity at a glance, with drill-downs only when an operator needs them.",
      },
      {
        title: "Charts must answer a question",
        text: "Every chart maps to an operational decision — utilisation, revenue or demand over time.",
      },
      {
        title: "Fewer clicks for frequent tasks",
        text: "Common admin actions are reachable directly from the tables where problems are spotted.",
      },
    ],
    features: [
      {
        title: "Analytics dashboard",
        text: "Usage, bookings and station performance visualised in one view.",
      },
      {
        title: "Station management",
        text: "Add, update and monitor charging stations and their status.",
      },
      {
        title: "Booking & user admin",
        text: "Review reservations and manage user accounts.",
      },
      {
        title: "AI-assisted insights",
        text: "Intelligent admin workflows that highlight what needs attention.",
      },
    ],
    stack: [
      { group: "Frontend", items: ["React", "Tailwind CSS"] },
      { group: "Backend", items: ["Node.js", "REST APIs"] },
      { group: "Database", items: ["MongoDB"] },
    ],
    gallery: [
      {
        src: "/assets/work/volty-thumb.webp",
        alt: "Volty admin dashboard with charts and tables",
        caption: "Operations dashboard",
      },
    ],
    learnings: [
      "Dashboards are products too — start from the operator's questions, not from the available data.",
      "Sharing an API with the driver app kept both sides consistent.",
    ],
    links: {
      live: "https://voltreserve-alpha.vercel.app/admin-login",
      github: "https://github.com/mohdalthaf",
    },
  },
  {
    slug: "velvet-pour",
    title: "Velvet Pour",
    tagline: "A cocktail brand you can scroll through.",
    category: "Brand Landing Page · Motion",
    year: "2025",
    role: "Frontend Developer",
    timeline: "Dec 2024 — Jan 2025",
    platform: "Web (mobile-first)",
    cover: "/assets/work/velvet-thumb.webp",
    preview: "/assets/work/velvet-thumb1.webp",
    summary:
      "An interactive cocktail brand landing page with GSAP scroll animations, parallax effects and video scrolling.",
    overview:
      "Velvet Pour is a landing page for a premium cocktail brand. The brief was atmosphere: the page should feel like walking into the bar. I built it mobile-first in React with GSAP-driven scroll storytelling.",
    tags: ["Landing Page", "Scroll Animation", "Parallax"],
    highlights: [],
    challenge:
      "Heavy motion and video can easily make a page slow and janky — especially on phones. The animations had to feel rich while staying smooth on mobile devices.",
    insights: [
      {
        title: "Motion should guide, not distract",
        text: "Each scroll animation reveals the next part of the story — drinks, menu, then the bar itself.",
      },
      {
        title: "Mobile first, not mobile later",
        text: "Animations were designed for small screens first, then enhanced for desktop.",
      },
      {
        title: "Reusable sections",
        text: "Components were built to be recombined so new drinks or campaigns are quick to add.",
      },
    ],
    features: [
      {
        title: "GSAP scroll storytelling",
        text: "Scroll-triggered sequences that reveal drinks and copy in rhythm.",
      },
      {
        title: "Parallax layers",
        text: "Depth from layered imagery that moves at different speeds.",
      },
      {
        title: "Video scrubbing",
        text: "Video playback tied to scroll position for a cinematic feel.",
      },
      {
        title: "Cocktail menu",
        text: "Browsable signature drinks with details and pricing.",
      },
    ],
    stack: [
      { group: "Frontend", items: ["React", "Vite", "JavaScript (ES6+)"] },
      { group: "Styling & Motion", items: ["Tailwind CSS", "GSAP"] },
    ],
    gallery: [
      {
        src: "/assets/work/velvet-thumb1.webp",
        alt: "Velvet Pour landing page across tablet and phone",
        caption: "Signature drinks and menu across devices",
      },
      {
        src: "/assets/work/velvet-thumb.webp",
        alt: "Velvet Pour mojito hero section",
        caption: "Hero section",
      },
    ],
    learnings: [
      "Animating transforms and opacity only is the difference between smooth and janky on mobile.",
      "Scroll-driven video needs carefully encoded files — keyframe spacing matters as much as file size.",
    ],
    links: { live: null, github: "https://github.com/mohdalthaf" },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getNextCaseStudy(slug: string) {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length];
}

export const featuredCaseStudies = caseStudies.filter((study) => study.featured);
