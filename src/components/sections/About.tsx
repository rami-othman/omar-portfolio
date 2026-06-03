import type { ReactNode } from "react";
import { profile, skills, software } from "../../data/portfolioData";
import { SectionTitle } from "./SectionTitle";

const services = [
  "Architecture Design",
  "Interior / Exterior Visualization",
  "Concept Development",
  "Technical Drawings",
];

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-y border-ink/12 bg-paper-deep px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          number="02"
          eyebrow="About"
          title="Architecture engineering with a calm, precise point of view."
        >
          Work shaped through concept, drawing, visualization, and careful
          spatial development.
        </SectionTitle>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-5 text-base leading-7 text-ink/68 sm:text-lg sm:leading-8">
            {profile.biography.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="grid grid-cols-2 gap-px border border-ink/12 bg-ink/12">
              {services.map((service) => (
                <div key={service} className="bg-paper-deep p-4 sm:p-5">
                  <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/70">
                    {service}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            <InfoBlock title="Profile">
              <p>{profile.title}</p>
              <p>{profile.location}</p>
              <p>{profile.availability}</p>
            </InfoBlock>
            <InfoBlock title="Core Skills">
              {skills.map((skill) => (
                <p key={skill}>{skill}</p>
              ))}
            </InfoBlock>
            <InfoBlock title="Software">
              {software.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </InfoBlock>
            <InfoBlock title="Approach">
              <p>Research-led concepts</p>
              <p>Clean representation</p>
              <p>Context-aware design</p>
            </InfoBlock>
          </div>
        </div>
      </div>
    </section>
  );
}

interface InfoBlockProps {
  title: string;
  children: ReactNode;
}

function InfoBlock({ title, children }: InfoBlockProps) {
  return (
    <div className="border-t border-ink/15 pt-4">
      <h3 className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/45">
        {title}
      </h3>
      <div className="mt-4 space-y-1.5 text-sm leading-6 text-ink/68">
        {children}
      </div>
    </div>
  );
}
