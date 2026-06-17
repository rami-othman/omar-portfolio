import { useEffect } from "react";
import { usePortfolioData } from "../../context/PortfolioDataContext";
import { About } from "./About";
import { Contact } from "./Contact";
import { Hero } from "./Hero";
import { ProjectGrid } from "./ProjectGrid";

export function PortfolioSections() {
  const {
    content: { profile },
  } = usePortfolioData();

  useEffect(() => {
    document.title = `${profile.name} - Architecture Portfolio`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", profile.statement);
  }, [profile.name, profile.statement]);

  return (
    <main>
      <Hero />
      <ProjectGrid />
      <About />
      <Contact />
    </main>
  );
}
