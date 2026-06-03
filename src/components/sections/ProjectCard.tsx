import { Link } from "react-router-dom";
import type { Project } from "../../data/portfolioData";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasImage = Boolean(project.coverImage.src);

  return (
    <article className="h-full border-t border-ink/15 pt-4">
      <Link
        to={`/projects/${project.id}`}
        className="group flex h-full w-full flex-col text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-6 focus-visible:outline-ink"
        aria-label={`View study for ${project.title}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden border border-ink/14 bg-white transition-colors group-hover:border-ink/35">
          {hasImage ? (
            <img
              src={project.coverImage.src}
              alt={project.coverImage.alt ?? project.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.015] group-hover:saturate-100 sm:saturate-[0.72]"
              style={{ objectPosition: project.coverObjectPosition ?? "50% 50%" }}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <ProjectTypographicCover project={project} />
          )}
        </div>
        <div className="grid gap-4 border-b border-ink/12 py-5 sm:grid-cols-[1fr_auto]">
          <div className="min-w-0">
            <h3 className="text-2xl font-medium leading-tight text-ink">
              {project.title}
            </h3>
            <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-editorial text-ink/55">
              {project.type} / {project.location}
            </p>
          </div>
          <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/55">
            {project.year}
          </p>
        </div>
        <p className="mt-4 max-w-xl flex-1 text-sm leading-6 text-ink/62">
          {project.description}
        </p>
        <span className="mt-5 inline-flex w-fit border-b border-ink/25 pb-1 font-mono text-[0.58rem] uppercase tracking-editorial text-ink/45 transition group-hover:border-ink group-hover:text-ink">
          View Study
        </span>
      </Link>
    </article>
  );
}

function ProjectTypographicCover({ project }: ProjectCardProps) {
  return (
    <div className="construction-panel relative flex h-full flex-col justify-between p-5">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/45">
          {project.number}
        </span>
        <span className="text-right font-mono text-[0.58rem] uppercase tracking-editorial text-ink/45">
          {project.year}
        </span>
      </div>
      <div className="relative z-10">
        <p className="font-mono text-[0.58rem] uppercase tracking-editorial text-ink/45">
          {project.type}
        </p>
        <h4 className="mt-4 max-w-[14rem] font-display text-4xl font-medium leading-[0.96] text-ink sm:text-5xl">
          {project.title}
        </h4>
      </div>
      <div className="grid grid-cols-3 gap-px bg-ink/12 text-center font-mono text-[0.5rem] uppercase tracking-[0.12em] text-ink/45">
        {project.conceptKeywords.map((keyword) => (
          <span key={keyword} className="bg-white px-2 py-2">
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}
