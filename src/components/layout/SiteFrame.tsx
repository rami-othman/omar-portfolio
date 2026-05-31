import type { ReactNode } from "react";
import { FixedNavigation } from "./FixedNavigation";
import { ScrollProgress } from "./ScrollProgress";

interface SiteFrameProps {
  children: ReactNode;
}

export function SiteFrame({ children }: SiteFrameProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas text-ink">
      <ScrollProgress />
      <FixedNavigation />
      <main className="relative px-4 sm:px-7 lg:px-12">{children}</main>
    </div>
  );
}
