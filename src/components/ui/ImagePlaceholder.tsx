interface ImagePlaceholderProps {
  label: string;
  detail?: string;
  className?: string;
  tone?: "light" | "dark";
}

export function ImagePlaceholder({
  label,
  detail = "Image placeholder",
  className = "",
  tone = "light",
}: ImagePlaceholderProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={`image-placeholder relative overflow-hidden border ${
        isDark
          ? "border-white/15 bg-ink text-paper"
          : "border-ink/15 bg-paper-deep/65 text-ink"
      } ${className}`}
    >
      <div className="absolute inset-3 border border-current opacity-15" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rotate-[32deg] bg-current opacity-10" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 -rotate-[32deg] bg-current opacity-10" />
      <div className="relative flex h-full min-h-36 flex-col justify-end p-5">
        <span className="font-mono text-[0.58rem] uppercase tracking-editorial opacity-60">
          {detail}
        </span>
        <span className="mt-2 font-display text-2xl leading-none">{label}</span>
      </div>
    </div>
  );
}
