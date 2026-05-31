import { projects } from "../../data/portfolioData";
import { ContactSection } from "./ContactSection";
import { CVSection } from "./CVSection";
import { ProfileSection } from "./ProfileSection";
import { ProjectSection } from "./ProjectSection";
import { SelectedWorksSection } from "./SelectedWorksSection";

export function PortfolioSections() {
  return (
    <>
      <ProfileSection />
      <CVSection />
      <SelectedWorksSection />
      {projects.map((project) => (
        <ProjectSection key={project.id} project={project} />
      ))}
      <ContactSection />
    </>
  );
}
