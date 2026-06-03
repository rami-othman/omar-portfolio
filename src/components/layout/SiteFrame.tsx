import type { ReactNode } from "react";

interface SiteFrameProps {
  children: ReactNode;
}

export function SiteFrame({ children }: SiteFrameProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas text-ink">
      {children}
    </div>
  );
}
