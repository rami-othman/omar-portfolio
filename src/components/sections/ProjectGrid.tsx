import { projects } from "../../data/portfolioData";
import { ProjectCard } from "./ProjectCard";
import { SectionTitle } from "./SectionTitle";

export function ProjectGrid() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          number="01"
          eyebrow="Selected Projects"
          title="Selected interior studies."
        >
          A concise selection of interior architecture and visualization
          studies, focused on atmosphere, material, and spatial clarity.
        </SectionTitle>

        <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
