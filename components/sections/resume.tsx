"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experience, education, profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BorderGlow from "@/components/BorderGlow";

type ExperienceItem = (typeof experience)[number];

type TabId = "experience" | "education" | "about";

const tabs: {
  id: TabId;
  label: string;
  title: string;
  description: string;
}[] = [
  {
    id: "experience",
    label: "Experience",
    title: "My experience",
    description:
      "Roles where I've shipped features, integrated APIs, and maintained production-ready code.",
  },
  {
    id: "education",
    label: "Education",
    title: "My education",
    description:
      "Academic background that built my foundation in software development and computer applications.",
  },
  {
    id: "about",
    label: "About me",
    title: "About me",
    description:
      "A quick snapshot of who I am, what I care about, and how I approach building products.",
  },
];

const leftPanelVariants = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

const rightPanelVariants = {
  hidden: { x: 40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: 0.08 },
  },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const tabContentVariants = {
  initial: { opacity: 0, x: 24 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    x: -24,
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

const borderGlowProps = {
  edgeSensitivity: 30,
  glowColor: "40 80 80",
  backgroundColor: "#24242D",
  borderRadius: 12,
  glowRadius: 40,
  glowIntensity: 1,
  coneSpread: 25,
  animated: false,
  colors: ["#c084fc", "#f472b6", "#38bdf8"],
};

function TabButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full rounded-[10px] px-6 py-4 text-left text-base font-medium transition-colors duration-200 ${
        isActive
          ? "bg-[#00F5A0] text-[#111111]"
          : "bg-[#25252E] text-foreground hover:bg-[#2f2f38]"
      }`}
    >
      {label}
    </motion.button>
  );
}

function DetailCard({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const glowCard = (
    <BorderGlow {...borderGlowProps} className="h-full w-full">
      <div className="p-6">{children}</div>
    </BorderGlow>
  );

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        variants={cardVariants}
        className={cn("w-full cursor-pointer text-left", className)}
      >
        {glowCard}
      </motion.button>
    );
  }

  return (
    <motion.div variants={cardVariants} className={cn("h-full w-full", className)}>
      {glowCard}
    </motion.div>
  );
}

function ExperienceModal({
  job,
  onClose,
}: {
  job: ExperienceItem | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={job !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        {job && (
          <>
            <DialogHeader>
              <p className="text-sm font-medium text-[#00F5A0]">{job.period}</p>
              <DialogTitle className="mt-3">{job.role}</DialogTitle>
              <DialogDescription className="mt-2 flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00F5A0]" />
                  {job.company}
                </span>
                {job.logo && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="h-6 w-auto shrink-0 rounded-md bg-white px-2 py-1 object-contain"
                  />
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 border-t border-border/60 pt-6">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#00F5A0]">
                Key responsibilities
              </p>
              <ul className="mt-4 space-y-3">
                {job.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00F5A0]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ExperiencePanel({
  onSelectJob,
}: {
  onSelectJob: (job: ExperienceItem) => void;
}) {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      {experience.map((job) => (
        <DetailCard
          key={`${job.company}-${job.period}`}
          onClick={() => onSelectJob(job)}
        >
          <p className="text-sm font-medium text-[#00F5A0]">{job.period}</p>
          <h3 className="mt-3 text-lg font-bold text-foreground">{job.role}</h3>
          <p className="mt-2 flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2 text-sm text-muted">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00F5A0]" />
              {job.company}
            </span>
            {job.logo && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="h-6 w-auto shrink-0 rounded-md bg-white px-2 py-1 object-contain"
              />
            )}
          </p>
          <p className="mt-4 text-xs text-muted/70">Click to view details</p>
        </DetailCard>
      ))}
    </motion.div>
  );
}

function EducationPanel() {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      {education.map((edu) => (
        <DetailCard key={edu.degree}>
          <p className="text-sm font-medium text-[#00F5A0]">{edu.period}</p>
          <h3 className="mt-3 text-lg font-bold text-foreground">{edu.degree}</h3>
          <p className="mt-2 flex items-center gap-2 text-sm text-muted">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00F5A0]" />
            {edu.school}
          </p>
          <p className="mt-1 text-sm text-muted">{edu.location}</p>
          <p className="mt-2 text-xs text-muted/80">{edu.detail}</p>
        </DetailCard>
      ))}
    </motion.div>
  );
}

function AboutPanel() {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      <DetailCard className="md:col-span-2">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-medium text-[#00F5A0]">{profile.title}</p>
          {profile.availableForWork && (
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00F5A0]/35 bg-[#00F5A0]/10 px-3 py-1 text-xs font-medium text-[#00F5A0]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00F5A0] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00F5A0]" />
              </span>
              Open to work
            </span>
          )}
        </div>
        <h3 className="mt-3 text-lg font-bold text-foreground">{profile.name}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted">{profile.summary}</p>
        <p className="mt-4 text-sm text-muted">{profile.location}</p>
      </DetailCard>

      <DetailCard>
        <p className="text-sm font-medium text-[#00F5A0]">Email</p>
        <p className="mt-3 text-sm text-foreground">{profile.email}</p>
      </DetailCard>

      <DetailCard>
        <p className="text-sm font-medium text-[#00F5A0]">Phone</p>
        <p className="mt-3 text-sm text-foreground">{profile.phone}</p>
      </DetailCard>
    </motion.div>
  );
}

function TabPanel({
  activeTab,
  onSelectJob,
}: {
  activeTab: TabId;
  onSelectJob: (job: ExperienceItem) => void;
}) {
  switch (activeTab) {
    case "experience":
      return <ExperiencePanel onSelectJob={onSelectJob} />;
    case "education":
      return <EducationPanel />;
    case "about":
      return <AboutPanel />;
  }
}

export function Resume() {
  const [activeTab, setActiveTab] = useState<TabId>("experience");
  const [selectedJob, setSelectedJob] = useState<ExperienceItem | null>(null);
  const activeContent = tabs.find((tab) => tab.id === activeTab)!;

  return (
    <section className="flex min-h-screen flex-col justify-center py-20 lg:py-28">
      <ExperienceModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
          {/* Left panel */}
          <motion.aside
            variants={leftPanelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="w-full max-w-[300px] lg:w-[300px]"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why hire me?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              I build polished, performant interfaces and integrate them with
              real backends — shipping features that hold up in production.
            </p>

            <nav className="mt-10 flex flex-col gap-3" aria-label="Resume sections">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  label={tab.label}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </nav>
          </motion.aside>

          {/* Right panel */}
          <motion.div
            variants={rightPanelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="min-w-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabContentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <h3 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {activeContent.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                  {activeContent.description}
                </p>

                <div className="mt-10">
                  <TabPanel
                    activeTab={activeTab}
                    onSelectJob={setSelectedJob}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
