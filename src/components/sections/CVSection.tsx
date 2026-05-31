import { cv, profile } from "../../data/portfolioData";
import type { CVEntry } from "../../data/portfolioData";
import { BookSpread } from "../book/BookSpread";
import { Divider } from "../ui/Divider";
import { SectionLabel } from "../ui/SectionLabel";

interface CVGroupProps {
  title: string;
  entries: CVEntry[];
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

export function CVSection() {
  return (
    <BookSpread
      id="cv"
      left={
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
      }
      right={
        <div className="grid gap-11">
          <CVGroup title="Experience" entries={cv.experience} />
          <CVGroup title="Education" entries={cv.education} />
          <CVGroup title="Recognition" entries={cv.recognition} />
        </div>
      }
    />
  );
}
