import type { Project } from "../../data/portfolioData";
import { BookSpread } from "../book/BookSpread";
import { Divider } from "../ui/Divider";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { SectionLabel } from "../ui/SectionLabel";

interface ProjectSectionProps {
  project: Project;
}

export function ProjectSection({ project }: ProjectSectionProps) {
  return (
    <BookSpread
      id={`project-${project.id}`}
      leftClassName="flex flex-col"
      rightClassName="flex flex-col"
      left={
        <div className="flex h-full flex-col">
          <SectionLabel number={project.number} title="Selected Project" />
          <div className="mt-10">
            <p className="font-mono text-[0.58rem] uppercase tracking-editorial text-graphite">
              {project.type} / {project.year}
            </p>
            <h2 className="mt-4 max-w-lg font-display text-6xl leading-[0.88] sm:text-7xl">
              {project.title}
            </h2>
          </div>
          <ImagePlaceholder
            label="Project cover"
            detail={`${project.title} / hero image`}
            className="mt-10 min-h-[16rem] grow"
            tone={project.number === "02" ? "dark" : "light"}
          />
          <p className="mt-5 font-mono text-[0.55rem] uppercase tracking-editorial text-graphite">
            Fig. {project.number}.01 / Main view
          </p>
        </div>
      }
      right={
        <div className="flex h-full flex-col">
          <div className="grid gap-7 sm:grid-cols-[1fr_1.35fr]">
            <dl className="space-y-4 text-xs leading-5">
              <div>
                <dt className="font-mono text-[0.53rem] uppercase tracking-editorial text-graphite">
                  Location
                </dt>
                <dd className="mt-1">{project.location}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.53rem] uppercase tracking-editorial text-graphite">
                  Role
                </dt>
                <dd className="mt-1">{project.role}</dd>
              </div>
            </dl>
            <p className="text-sm leading-7 text-graphite">
              {project.description}
            </p>
          </div>
          <Divider className="my-8" />
          <div className="grid grow gap-4 sm:grid-cols-2">
            <ImagePlaceholder
              label={project.drawings[0]}
              detail="Technical drawing"
              className="min-h-52"
            />
            <ImagePlaceholder
              label={project.renders[0]}
              detail="Atmospheric render"
              className="min-h-52"
            />
          </div>
          <div className="mt-7">
            <p className="font-mono text-[0.53rem] uppercase tracking-editorial text-graphite">
              Concept vocabulary
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {project.conceptKeywords.map((keyword) => (
                <span
                  className="text-xs italic text-graphite"
                  key={keyword}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
}
