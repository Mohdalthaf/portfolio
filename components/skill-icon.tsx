import { getSkillIcon } from "@/lib/assets";

export function SkillIcon({
  skill,
  className = "h-5 w-5",
  deviconClassName = "text-xl leading-none",
}: {
  skill: string;
  className?: string;
  deviconClassName?: string;
}) {
  const icon = getSkillIcon(skill);

  if (!icon) {
    return (
      <span
        className={`flex shrink-0 items-center justify-center rounded-md bg-white/10 text-[10px] font-bold ${className}`}
      >
        {skill.charAt(0)}
      </span>
    );
  }

  if (icon.type === "devicon") {
    return (
      <i
        aria-hidden
        className={`${icon.className} shrink-0 ${deviconClassName}`}
      />
    );
  }

  return (
    <img
      src={icon.src}
      alt={icon.alt}
      className={`shrink-0 object-contain ${className}`}
    />
  );
}
