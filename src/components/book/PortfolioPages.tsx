import {
  contact,
  cv,
  portfolioContents,
  profile,
  projects,
  skills,
  software,
} from "../../data/portfolioData";
import type { CVEntry, Project } from "../../data/portfolioData";
import { BrandImage } from "../ui/BrandImage";
import { Divider } from "../ui/Divider";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { ProjectImage } from "../ui/ProjectImage";
import { SectionLabel } from "../ui/SectionLabel";

const contactNumber =
  portfolioContents.find((item) => item.id === "contact")?.number ?? "07";

interface CVGroupProps {
  title: string;
  entries: CVEntry[];
}

interface ProjectPageProps {
  project: Project;
}

interface ProjectChapterLabelProps {
  project: Project;
  chapter: string;
  index: string;
}

function ProjectChapterLabel({
  project,
  chapter,
  index,
}: ProjectChapterLabelProps) {
  return (
    <div className="flex items-center justify-between gap-5">
      <SectionLabel number={project.number} title={project.title} />
      <span className="font-mono text-[0.53rem] uppercase tracking-editorial text-graphite">
        {index} / {chapter}
      </span>
    </div>
  );
}

function getProjectImage(
  images: Project["conceptImages"],
  index: number,
  caption: string,
) {
  return images[index] ?? { src: "", caption };
}

function CVGroup({ title, entries }: CVGroupProps) {
  return (
    <div>
      <p className="font-mono text-[0.58rem] uppercase tracking-editorial text-graphite">
        {title}
      </p>
      <Divider className="mb-5 mt-3" />
      <div className="space-y-6">
        {entries.map((entry) => (
          <article key={`${entry.period}-${entry.title}`}>
            <p className="font-mono text-[0.56rem] tracking-editorial text-graphite">
              {entry.period}
            </p>
            <h3 className="mt-1 font-display text-2xl leading-none">
              {entry.title}
            </h3>
            <p className="mt-2 text-xs leading-5 text-graphite">
              {entry.organization} / {entry.location}
            </p>
            {entry.detail ? (
              <p className="mt-1 text-xs italic leading-5 text-graphite/80">
                {entry.detail}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

export function ProfileLeftPage() {
  return (
    <div className="flex h-full flex-col">
      <SectionLabel number="01" title="Profile" />
      <ImagePlaceholder
        label="Portrait / studio image"
        detail="Replace with Omar's portrait"
        className="mt-11 min-h-[23rem] grow"
      />
      <div className="mt-5 flex justify-between font-mono text-[0.55rem] uppercase tracking-editorial text-graphite">
        <span>{profile.location}</span>
        <span>Fig. 01</span>
      </div>
    </div>
  );
}

export function ProfileRightPage() {
  return (
    <div className="flex h-full flex-col">
      <SectionLabel number="01" title="About" />
      <p className="mt-12 max-w-xl font-display text-4xl leading-[1.05] sm:text-5xl">
        {profile.statement}
      </p>
      <Divider className="my-9" />
      <div className="grid gap-6 text-sm leading-7 text-graphite sm:grid-cols-2">
        {profile.biography.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-auto grid gap-8 pt-14 sm:grid-cols-2">
        <div>
          <p className="mb-4 font-mono text-[0.58rem] uppercase tracking-editorial text-graphite">
            Core practice
          </p>
          <ul className="space-y-1.5 text-xs leading-5 text-graphite">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 font-mono text-[0.58rem] uppercase tracking-editorial text-graphite">
            Software
          </p>
          <ul className="space-y-1.5 text-xs leading-5 text-graphite">
            {software.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function CVLeftPage() {
  return (
    <div className="flex h-full flex-col">
      <SectionLabel number="02" title="Curriculum Vitae" />
      <div className="mt-12">
        <p className="font-display text-5xl leading-[0.92] sm:text-6xl">
          Omar
          <br />
          <span className="italic text-graphite">architectural</span>
          <br />
          designer
        </p>
      </div>
      <div className="mt-auto pt-12">
        <Divider className="mb-5" />
        <dl className="grid gap-5 text-xs sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[0.55rem] uppercase tracking-editorial text-graphite">
              Base
            </dt>
            <dd className="mt-2">{profile.location}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.55rem] uppercase tracking-editorial text-graphite">
              Status
            </dt>
            <dd className="mt-2">{profile.availability}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export function CVRightPage() {
  return (
    <div className="grid gap-11">
      <CVGroup title="Experience" entries={cv.experience} />
      <CVGroup title="Education" entries={cv.education} />
      <CVGroup title="Recognition" entries={cv.recognition} />
    </div>
  );
}

export function WorksLeftPage() {
  return (
    <div className="flex h-full flex-col">
      <SectionLabel number="03" title="Selected Works" />
      <h2 className="mt-12 font-display text-7xl leading-[0.82] sm:text-8xl">
        Three
        <br />
        <span className="italic text-graphite">studies</span>
        <br />
        in place.
      </h2>
      <p className="mt-auto max-w-sm pt-14 text-sm leading-7 text-graphite">
        Selected works across domestic, cultural, and civic scales. Each
        project is introduced as an editorial spread ready for drawings,
        renders, and process documentation.
      </p>
    </div>
  );
}

export function WorksRightPage() {
  return (
    <div className="flex h-full flex-col">
      <SectionLabel number="III" title="Works Index" />
      <div className="mt-10 space-y-2">
        {projects.map((project) => (
          <a
            key={project.id}
            href={`#project-${project.id}`}
            className="group block py-4"
          >
            <div className="grid grid-cols-[3rem_1fr_auto] items-baseline gap-3">
              <span className="font-mono text-[0.58rem] text-graphite">
                {project.number}
              </span>
              <div>
                <h3 className="font-display text-3xl transition-transform duration-300 group-hover:translate-x-1">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-editorial text-graphite">
                  {project.type} / {project.location}
                </p>
                <p className="mt-2 max-w-md text-xs leading-5 text-graphite/80">
                  {project.description}
                </p>
              </div>
              <span className="font-mono text-[0.58rem] text-graphite">
                {project.year}
              </span>
            </div>
            <Divider className="mt-5 transition-colors group-hover:bg-ink/45" />
          </a>
        ))}
      </div>
      <ImagePlaceholder
        label="Material study"
        detail="Works index image"
        className="mt-auto min-h-40"
      />
    </div>
  );
}

export function ProjectCoverLeftPage({ project }: ProjectPageProps) {
  return (
    <div className="flex h-full flex-col">
      <ProjectChapterLabel project={project} chapter="Cover" index="01" />
      <div className="mt-10">
        <p className="font-mono text-[0.58rem] uppercase tracking-editorial text-graphite">
          {project.type} / {project.year}
        </p>
        <h2 className="mt-4 max-w-lg font-display text-6xl leading-[0.88] sm:text-7xl">
          {project.title}
        </h2>
      </div>
      <ProjectImage
        image={project.coverImage}
        kind="cover"
        detail={`${project.title} / hero image`}
        className="mt-10 min-h-[16rem] grow"
        tone={project.number === "02" ? "dark" : "light"}
        captionPrefix={`Fig. ${project.number}.01`}
      />
    </div>
  );
}

export function ProjectCoverRightPage({ project }: ProjectPageProps) {
  return (
    <div className="flex h-full flex-col">
      <ProjectChapterLabel project={project} chapter="Overview" index="01" />
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
        <p className="text-sm leading-7 text-graphite">{project.description}</p>
      </div>
      <Divider className="my-8" />
      <div className="mt-auto">
        <p className="font-mono text-[0.53rem] uppercase tracking-editorial text-graphite">
          Chapter contents
        </p>
        <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-xs text-graphite">
          {["Cover", "Concept", "Drawings", "Renders"].map((item, index) => (
            <div className="flex gap-3 border-t border-rule pt-3" key={item}>
              <span className="font-mono text-[0.53rem]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      {project.credits ? (
        <p className="mt-9 text-xs italic leading-5 text-graphite/80">
          {project.credits}
        </p>
      ) : null}
    </div>
  );
}

export function ProjectConceptLeftPage({ project }: ProjectPageProps) {
  return (
    <div className="flex h-full flex-col">
      <ProjectChapterLabel project={project} chapter="Concept" index="02" />
      <p className="mt-12 font-display text-5xl leading-[0.95] sm:text-6xl">
        Design
        <br />
        <span className="italic text-graphite">idea.</span>
      </p>
      <p className="mt-10 max-w-lg text-sm leading-7 text-graphite">
        {project.conceptStatement}
      </p>
      <Divider className="my-8" />
      <div className="mt-auto">
        <p className="font-mono text-[0.53rem] uppercase tracking-editorial text-graphite">
          Concept vocabulary
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {project.conceptKeywords.map((keyword) => (
            <span className="text-xs italic text-graphite" key={keyword}>
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectConceptRightPage({ project }: ProjectPageProps) {
  return (
    <div className="flex h-full flex-col">
      <ProjectChapterLabel project={project} chapter="Process" index="02" />
      <div className="mt-10 grid grow gap-4 sm:grid-cols-2">
        <ProjectImage
          image={getProjectImage(
            project.conceptImages,
            0,
            "Concept study 01",
          )}
          kind="render"
          detail="Concept image"
          className="min-h-52"
          captionPrefix={`Fig. ${project.number}.02`}
        />
        <ProjectImage
          image={getProjectImage(
            project.conceptImages,
            1,
            "Concept study 02",
          )}
          kind="render"
          detail="Concept image"
          className="min-h-52"
          captionPrefix={`Fig. ${project.number}.03`}
        />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {project.designProcessSteps.map((step, index) => (
          <div className="border-t border-rule pt-4" key={step}>
            <p className="font-mono text-[0.53rem] text-graphite">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-3 text-xs leading-5 text-graphite">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectDrawingsLeftPage({ project }: ProjectPageProps) {
  return (
    <div className="flex h-full flex-col">
      <ProjectChapterLabel project={project} chapter="Drawings" index="03" />
      <ProjectImage
        image={getProjectImage(project.drawings, 0, "Primary plan")}
        kind="drawing"
        detail="Technical drawing"
        className="mt-10 min-h-[24rem] grow"
        captionPrefix={`Fig. ${project.number}.04`}
      />
    </div>
  );
}

export function ProjectDrawingsRightPage({ project }: ProjectPageProps) {
  return (
    <div className="flex h-full flex-col">
      <ProjectChapterLabel project={project} chapter="Plans / Sections" index="03" />
      <ProjectImage
        image={getProjectImage(project.drawings, 1, "Primary section")}
        kind="drawing"
        detail="Technical drawing"
        className="mt-10 min-h-[24rem] grow"
        captionPrefix={`Fig. ${project.number}.05`}
      />
      <p className="mt-7 max-w-sm text-xs leading-6 text-graphite">
        Drawing placeholders are reserved for plans, sections, elevations, and
        analytical diagrams. Replace them with the project&apos;s clearest
        architectural documents.
      </p>
    </div>
  );
}

export function ProjectRendersLeftPage({ project }: ProjectPageProps) {
  return (
    <div className="flex h-full flex-col">
      <ProjectChapterLabel project={project} chapter="Renders" index="04" />
      <ProjectImage
        image={getProjectImage(project.renders, 0, "Primary atmosphere")}
        kind="render"
        detail="Atmospheric render"
        className="mt-10 min-h-[24rem] grow"
        captionPrefix={`Fig. ${project.number}.06`}
      />
    </div>
  );
}

export function ProjectRendersRightPage({ project }: ProjectPageProps) {
  return (
    <div className="flex h-full flex-col">
      <ProjectChapterLabel project={project} chapter="Atmosphere" index="04" />
      <ProjectImage
        image={getProjectImage(project.renders, 1, "Secondary atmosphere")}
        kind="render"
        detail="Atmospheric render"
        className="mt-10 min-h-[24rem] grow"
        captionPrefix={`Fig. ${project.number}.07`}
      />
      <div className="mt-7 flex items-end justify-between gap-6">
        <p className="max-w-sm text-xs leading-6 text-graphite">
          A final atmospheric spread reserved for the project&apos;s material,
          light, and inhabitation studies.
        </p>
        <span className="font-display text-3xl italic text-graphite">
          {project.number}
        </span>
      </div>
    </div>
  );
}

export function ContactLeftPage() {
  return (
    <div className="flex h-full flex-col">
      <SectionLabel number={contactNumber} title="Contact" />
      <div className="my-auto py-16">
        <p className="font-display text-6xl leading-[0.88] sm:text-7xl">
          Let us make
          <br />
          something
          <br />
          <span className="italic text-graphite">considered.</span>
        </p>
      </div>
      <p className="max-w-xs text-xs leading-6 text-graphite">
        For collaborations, commissions, and architectural conversations.
      </p>
    </div>
  );
}

export function ContactRightPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-end">
        <BrandImage
          sources={["/brand/omar-logo.png", "/brand/omar-logo.jpg"]}
          alt="Omar logo"
          fallback="O."
          className="max-h-20 max-w-24 text-5xl text-ink"
        />
      </div>
      <div className="mt-auto">
        <p className="font-mono text-[0.58rem] uppercase tracking-editorial text-graphite">
          Direct correspondence
        </p>
        <a
          className="mt-5 block break-all font-display text-3xl transition-opacity hover:opacity-55 sm:text-4xl"
          href={`mailto:${contact.email}`}
        >
          {contact.email}
        </a>
        <Divider className="my-7" />
        <div className="grid gap-8 text-xs leading-6 sm:grid-cols-2">
          <div>
            <p>{contact.phone}</p>
            <p>{contact.city}</p>
          </div>
          <div className="flex flex-col items-start">
            {contact.links.map((link) => (
              <a
                className="transition-opacity hover:opacity-55"
                href={link.href}
                key={link.label}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-auto pt-14 text-right font-mono text-[0.55rem] uppercase tracking-editorial text-graphite">
        End / Volume 01
      </p>
    </div>
  );
}
