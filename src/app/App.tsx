import { SiteFrame } from "../components/layout/SiteFrame";
import { ScrollBookIntro } from "../components/book/ScrollBookIntro";
import { ContactSection } from "../components/sections/ContactSection";
import { CVSection } from "../components/sections/CVSection";
import { ProfileSection } from "../components/sections/ProfileSection";
import { ProjectSection } from "../components/sections/ProjectSection";
import { SelectedWorksSection } from "../components/sections/SelectedWorksSection";
import { projects } from "../data/portfolioData";

export function App() {
  return (
    <SiteFrame>
      <ScrollBookIntro />
      <ProfileSection />
      <CVSection />
      <SelectedWorksSection />
      {projects.map((project) => (
        <ProjectSection key={project.id} project={project} />
      ))}
      <ContactSection />
    </SiteFrame>
  );
}
