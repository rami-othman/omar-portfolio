import type { ReactNode } from "react";
import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import type { Project, ProjectImageAsset } from "../data/portfolioData";
import {
  getAdjacentProjects,
  getProjectById,
} from "../data/portfolioData";

export function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = getProjectById(projectId);

  useEffect(() => {
    if (!project) {
      document.title = "Project Not Found — Omar Architecture Portfolio";
      return;
    }

    document.title = `${project.title} — Omar Architecture Portfolio`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", project.description);
  }, [project]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const { previousProject, nextProject } = getAdjacentProjects(project.id);
  const creditsAndNotes = [project.credits, project.notes].filter(
    (item): item is string => Boolean(item),
  );
  const hasGalleryImages =
    project.renders.length > 0 ||
    project.drawings.length > 0 ||
    project.conceptImages.length > 0;

  return (
    <main>
      <section className="architectural-grid relative isolate overflow-hidden border-b border-ink/12 px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/#projects"
            className="inline-flex border-b border-ink/25 pb-1 font-mono text-[0.62rem] uppercase tracking-editorial text-ink/55 transition hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            Back to selected projects
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-end">
            <div className="relative z-10">
              <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/45">
                Project Study / {project.number}
              </p>
              <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[0.94] text-ink sm:text-7xl lg:text-8xl">
                {project.title}
              </h1>
              <dl className="mt-8 grid grid-cols-2 gap-px border border-ink/12 bg-ink/12 sm:grid-cols-4 lg:grid-cols-2">
                <ProjectMeta label="Type" value={project.type} />
                <ProjectMeta label="Year" value={project.year} />
                <ProjectMeta label="Location" value={project.location} />
                <ProjectMeta label="Role" value={project.role} />
              </dl>
              <p className="mt-8 max-w-2xl border-t border-ink/15 pt-5 text-base leading-7 text-ink/68 sm:text-lg sm:leading-8">
                {project.description}
              </p>
            </div>

            <figure className="relative z-10 border border-ink/14 bg-white p-2">
              <img
                src={project.coverImage.src}
                alt={project.coverImage.alt ?? project.title}
                className="max-h-[42rem] w-full object-contain"
                loading="eager"
                decoding="async"
              />
              <figcaption className="px-1 pb-1 pt-3 font-mono text-[0.58rem] uppercase tracking-editorial text-ink/45">
                {project.coverImage.caption}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,0.66fr)]">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/45">
              Project Overview
            </p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-ink/52">
              A concise case-study reading of material, atmosphere, and spatial
              intent.
            </p>
          </div>
          <div className="space-y-10">
            <section className="border-y border-ink/15 py-7">
              <h2 className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/45">
                Concept Statement
              </h2>
              <p className="mt-5 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl lg:text-5xl">
                {project.conceptStatement}
              </p>
            </section>
            <EditorialBlock label="Concept Keywords">
              <div className="flex flex-wrap gap-2">
                {project.conceptKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="border border-ink/14 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink/55"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </EditorialBlock>
            {creditsAndNotes.length > 0 ? (
              <EditorialBlock label="Credits / Notes">
                {creditsAndNotes.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </EditorialBlock>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/12 bg-paper-deep px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(16rem,0.34fr)_minmax(0,0.66fr)]">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/45">
                Design Process
              </p>
              <p className="mt-4 max-w-xs text-sm leading-6 text-ink/52">
                The study is organized as a short sequence of decisions rather
                than a finished-build claim.
              </p>
            </div>
          <ol className="grid gap-px border border-ink/12 bg-ink/12 md:grid-cols-3 lg:grid-cols-1">
            {project.designProcessSteps.map((step, index) => (
              <li
                key={step}
                className="grid gap-4 bg-paper-deep p-5 sm:grid-cols-[4rem_minmax(0,1fr)] sm:p-6"
              >
                <span className="font-mono text-[0.58rem] uppercase tracking-editorial text-ink/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-6 text-ink/68 sm:text-base sm:leading-7">
                  {step}
                </p>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(16rem,0.25fr)_minmax(0,0.75fr)]">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/45">
              Project Gallery
            </p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-ink/52">
              Additional drawings, renders, and process images can extend this
              study as the project archive grows.
            </p>
          </div>
          <div className="space-y-16">
            {hasGalleryImages ? (
              <>
                <GallerySection
                  title="Renders"
                  images={project.renders}
                  imageFit="contain"
                />
                <GallerySection
                  title="Drawings"
                  images={project.drawings}
                  imageFit="contain"
                />
                <GallerySection
                  title="Concept / Process"
                  images={project.conceptImages}
                  imageFit="cover"
                />
              </>
            ) : (
              <div className="border-y border-ink/12 py-6">
                <p className="max-w-xl text-sm leading-6 text-ink/55">
                  Additional drawings and renders can be added to this study.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <ProjectPagination
        previousProject={previousProject}
        nextProject={nextProject}
      />
    </main>
  );
}

interface ProjectMetaProps {
  label: string;
  value: string;
}

function ProjectMeta({ label, value }: ProjectMetaProps) {
  return (
    <div className="bg-canvas p-4">
      <dt className="font-mono text-[0.56rem] uppercase tracking-editorial text-ink/40">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-6 text-ink/70">{value}</dd>
    </div>
  );
}

interface EditorialBlockProps {
  label: string;
  children: ReactNode;
}

function EditorialBlock({ label, children }: EditorialBlockProps) {
  return (
    <section className="border-t border-ink/15 pt-4">
      <h2 className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/45">
        {label}
      </h2>
      <div className="mt-4 space-y-3 text-base leading-7 text-ink/68 sm:text-lg sm:leading-8">
        {children}
      </div>
    </section>
  );
}

interface GallerySectionProps {
  title: string;
  images: ProjectImageAsset[];
  imageFit: "contain" | "cover";
}

function GallerySection({ title, images, imageFit }: GallerySectionProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-ink/15 pt-5">
      <div className="flex items-baseline justify-between gap-5">
        <h2 className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/45">
          {title}
        </h2>
        <p className="font-mono text-[0.58rem] uppercase tracking-editorial text-ink/35">
          {String(images.length).padStart(2, "0")}
        </p>
      </div>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {images.map((image) => (
          <figure
            key={`${title}-${image.src}`}
            className={`min-w-0 ${
              image.layout === "full" || images.length === 1
                ? "md:col-span-2"
                : ""
            }`}
          >
            <div className="border border-ink/14 bg-white p-2">
              <img
                src={image.src}
                alt={image.alt ?? image.caption}
                className={getGalleryImageClass(image, imageFit)}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[0.58rem] uppercase tracking-editorial text-ink/45">
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function getGalleryImageClass(
  image: ProjectImageAsset,
  imageFit: "contain" | "cover",
) {
  if (imageFit === "contain") {
    return "max-h-[52rem] w-full object-contain";
  }

  const aspectClass =
    image.orientation === "portrait"
      ? "aspect-[4/5]"
      : image.orientation === "square"
        ? "aspect-square"
        : "aspect-[4/3]";

  return `${aspectClass} w-full object-cover`;
}

interface ProjectPaginationProps {
  previousProject?: Project;
  nextProject?: Project;
}

function ProjectPagination({
  previousProject,
  nextProject,
}: ProjectPaginationProps) {
  return (
    <nav
      aria-label="Project navigation"
      className="border-t border-ink/12 px-4 py-10 sm:px-6 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-px border border-ink/12 bg-ink/12 md:grid-cols-3">
        <Link
          to="/#projects"
          className="bg-canvas p-5 transition hover:bg-paper-deep focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <span className="font-mono text-[0.58rem] uppercase tracking-editorial text-ink/40">
            Back
          </span>
          <span className="mt-3 block font-display text-2xl font-medium leading-tight text-ink">
            Selected Projects
          </span>
        </Link>
        {previousProject ? (
          <Link
            to={`/projects/${previousProject.id}`}
            className="bg-canvas p-5 transition hover:bg-paper-deep focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            <span className="font-mono text-[0.58rem] uppercase tracking-editorial text-ink/40">
              Previous
            </span>
            <span className="mt-3 block font-display text-2xl font-medium leading-tight text-ink">
              {previousProject.title}
            </span>
          </Link>
        ) : null}
        {nextProject ? (
          <Link
            to={`/projects/${nextProject.id}`}
            className="bg-canvas p-5 transition hover:bg-paper-deep focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            <span className="font-mono text-[0.58rem] uppercase tracking-editorial text-ink/40">
              Next
            </span>
            <span className="mt-3 block font-display text-2xl font-medium leading-tight text-ink">
              {nextProject.title}
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
