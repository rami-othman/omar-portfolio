import type { ReactNode } from "react";

interface PaperPageProps {
  children: ReactNode;
  className?: string;
  side?: "left" | "right";
}

export function PaperPage({
  children,
  className = "",
  side = "left",
}: PaperPageProps) {
  return (
    <div
      className={`paper-page relative min-h-[34rem] overflow-hidden bg-paper p-7 sm:p-10 lg:min-h-[43rem] lg:p-12 ${
        side === "left" ? "lg:border-r lg:border-ink/10" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
