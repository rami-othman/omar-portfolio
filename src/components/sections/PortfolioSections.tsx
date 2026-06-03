import { useEffect } from "react";
import { About } from "./About";
import { Contact } from "./Contact";
import { Hero } from "./Hero";
import { ProjectGrid } from "./ProjectGrid";

export function PortfolioSections() {
  useEffect(() => {
    document.title = "Omar — Architecture Portfolio";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Black and white architecture and interior visualization portfolio for Omar, focused on material, atmosphere, and spatial clarity.",
      );
  }, []);

  return (
    <main>
      <Hero />
      <ProjectGrid />
      <About />
      <Contact />
    </main>
  );
}
