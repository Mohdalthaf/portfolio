export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-extrabold tracking-[-0.04em] ${className}`}
      aria-label="Mohd.Althaf"
    >
      <span className="text-white">Mohd</span>
      <span className="text-accent">.</span>
      <span className="text-white/85">Althaf</span>
    </span>
  );
}
