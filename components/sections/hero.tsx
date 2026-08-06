"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { profile, stats, socials } from "@/lib/data";
import { profileImage } from "@/lib/assets";
import SpecularButton from "@/components/SpecularButton";
import TrueFocus from "@/components/TrueFocus";

const socialIcons = { GitHub: Github, LinkedIn: Linkedin, Email: Mail };

const MAX_AVATAR_SIZE = 420;
const MAX_AVATAR_GAP = 28;
const RING_STROKE = 2.5;
// long dash · wide gap · short dash · wide gap (repeats around ring)
const RING_DASH_PATTERN = "58 42 14 18";

function getAvatarMetrics(availableWidth: number) {
  const clampedWidth = Math.max(availableWidth, 0);
  const avatarSize = Math.min(
    MAX_AVATAR_SIZE,
    Math.max(220, Math.floor((clampedWidth - RING_STROKE * 2) / 1.14))
  );
  const gap = Math.round(MAX_AVATAR_GAP * (avatarSize / MAX_AVATAR_SIZE));
  const containerSize = avatarSize + gap * 2 + RING_STROKE * 2;
  const ringRadius = avatarSize / 2 + gap + RING_STROKE / 2;

  return { avatarSize, gap, containerSize, ringRadius };
}

const MAX_CONTAINER_WIDTH =
  MAX_AVATAR_SIZE + MAX_AVATAR_GAP * 2 + RING_STROKE * 2;
const INITIAL_AVATAR_METRICS = getAvatarMetrics(MAX_CONTAINER_WIDTH);

function HeroAvatar({
  imageError,
  onImageError,
}: {
  imageError: boolean;
  onImageError: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState(INITIAL_AVATAR_METRICS);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateSize = () => {
      setMetrics(getAvatarMetrics(node.clientWidth));
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const { avatarSize, containerSize, ringRadius } = metrics;
  const initialsClass =
    avatarSize < 280 ? "text-4xl" : avatarSize < 340 ? "text-5xl" : "text-6xl";

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-[504px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        className="relative mx-auto shrink-0"
        style={{ width: containerSize, height: containerSize }}
      >
      {/* Neutral radial glow — matches reference */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: avatarSize + 60,
          height: avatarSize + 60,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.025) 40%, transparent 68%)",
        }}
      />

      {/* Portrait circle */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: avatarSize, height: avatarSize }}
      >
        <motion.div
          className="h-full w-full overflow-hidden rounded-full bg-[#0a0a0a] shadow-[0_0_40px_rgba(0,0,0,0.6)]"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {!imageError ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={profileImage}
              alt={profile.name}
              className="h-full w-full scale-[1.08] object-cover object-[center_18%]"
              onError={onImageError}
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-2 to-surface font-bold text-accent/40 ${initialsClass}`}
              aria-hidden
            >
              {profile.firstName[0]}
              {profile.lastName[0]}
            </div>
          )}
        </motion.div>
      </div>

      {/* Single rotating dashed neon ring */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <svg
          viewBox={`0 0 ${containerSize} ${containerSize}`}
          className="h-full w-full"
        >
          <defs>
            <filter
              id="avatar-ring-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="3.5" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle
            cx={containerSize / 2}
            cy={containerSize / 2}
            r={ringRadius}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={RING_STROKE}
            strokeDasharray={RING_DASH_PATTERN}
            strokeLinecap="round"
            filter="url(#avatar-ring-glow)"
          />
        </svg>
      </motion.div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative flex min-h-screen flex-col justify-center pt-35 pb-12">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-16">
          <motion.div
            className="relative z-10 lg:z-auto"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
              Hi, I&apos;m{" "}
              <span className="text-accent">{profile.name}</span>
            </h1>

            <p className="mt-5 text-lg font-medium text-foreground sm:text-xl">
              {profile.heroTagline}
            </p>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
              {profile.heroDescription}
            </p>

            <TrueFocus
              segments={[
                `"${profile.heroQuote.text}"`,
                `— ${profile.heroQuote.author}`,
              ]}
              borderColor="#00ff99"
              glowColor="rgba(0, 255, 153, 0.55)"
              blurAmount={4}
              animationDuration={0.45}
              pauseBetweenAnimations={1.2}
              className="relative z-10 mt-8 max-w-lg justify-start gap-3 lg:z-auto"
              wordClassName="text-sm font-normal text-muted/80 sm:text-base"
            />

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <SpecularButton
                size="lg"
                radius={999}
                tint="#00ff99"
                tintOpacity={0}
                blur={0}
                textColor="#00ff99"
                lineColor="#00ff99"
                baseColor="#3a3a3a"
                intensity={1}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={false}
                className="px-7! py-3! text-xs! font-semibold uppercase tracking-[0.18em]"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = profile.resumeUrl;
                  link.download = "";
                  link.click();
                }}
              >
                <span className="inline-flex items-center gap-2">
                  Download CV
                  <Download className="h-4 w-4" />
                </span>
              </SpecularButton>

              <div className="flex items-center gap-3">
                {socials.map((s) => {
                  const Icon = socialIcons[s.label as keyof typeof socialIcons];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.label !== "Email" ? "_blank" : undefined}
                      rel="noreferrer"
                      aria-label={s.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-accent bg-transparent text-accent shadow-[0_0_14px_rgba(0,255,153,0.16)] transition-[colors,box-shadow] hover:bg-accent hover:text-[#04140c] hover:shadow-[0_0_20px_rgba(0,255,153,0.32)]"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <div className="flex w-full justify-center overflow-hidden lg:overflow-visible">
            <HeroAvatar
              imageError={imageError}
              onImageError={() => setImageError(true)}
            />
          </div>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 pt-15 sm:justify-items-start sm:gap-8 lg:grid-cols-4 lg:gap-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:items-center sm:gap-3 sm:text-left lg:gap-4"
            >
              <div className="text-3xl font-bold leading-none text-foreground sm:text-4xl lg:text-5xl">
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2}
                    suffix={stat.suffix}
                  />
                ) : (
                  "0"
                )}
              </div>
              <p className="max-w-28 whitespace-pre-line text-xs leading-snug text-muted sm:max-w-36 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
