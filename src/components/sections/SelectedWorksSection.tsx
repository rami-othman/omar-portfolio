import { projects } from "../../data/portfolioData";
import { BookSpread } from "../book/BookSpread";
import { Divider } from "../ui/Divider";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { SectionLabel } from "../ui/SectionLabel";

export function SelectedWorksSection() {
  return (
    <BookSpread
      id="works"
      left={
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
      }
      right={
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
      }
    />
  );
}
