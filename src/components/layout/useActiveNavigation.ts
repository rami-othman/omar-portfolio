import { useEffect, useState } from "react";
import { projects } from "../../data/portfolioData";
import { getProjectChapterSpreads } from "../book/projectChapterRegistry";

export type NavigationId =
  | "cover"
  | "contents"
  | "profile"
  | "cv"
  | "works"
  | "projects"
  | "contact";

interface NavigationAnchor {
  anchorId: string;
  navigationId: NavigationId;
}

const navigationAnchors: NavigationAnchor[] = [
  { anchorId: "cover", navigationId: "cover" },
  { anchorId: "contents", navigationId: "contents" },
  { anchorId: "profile", navigationId: "profile" },
  { anchorId: "cv", navigationId: "cv" },
  { anchorId: "works", navigationId: "works" },
  ...projects.flatMap((project) =>
    getProjectChapterSpreads(project).map((chapter, index) => ({
      anchorId:
        index === 0
          ? `project-${project.id}`
          : `project-${project.id}-${chapter.id}`,
      navigationId: "projects" as const,
    })),
  ),
  { anchorId: "contact", navigationId: "contact" },
];

export function useActiveNavigation() {
  const [activeId, setActiveId] = useState<NavigationId>("cover");

  useEffect(() => {
    let frameId = 0;

    const updateActiveItem = () => {
      frameId = 0;
      const marker = window.scrollY + window.innerHeight * 0.34;
      let current: NavigationId = "cover";

      for (const item of navigationAnchors) {
        const anchor = document.getElementById(item.anchorId);

        if (!anchor) {
          continue;
        }

        const top = anchor.getBoundingClientRect().top + window.scrollY;

        if (top <= marker) {
          current = item.navigationId;
        }
      }

      setActiveId((previous) => (previous === current ? previous : current));
    };

    const requestUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateActiveItem);
      }
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return activeId;
}
