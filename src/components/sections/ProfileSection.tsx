import { profile, skills, software } from "../../data/portfolioData";
import { BookSpread } from "../book/BookSpread";
import { Divider } from "../ui/Divider";
import { ImagePlaceholder } from "../ui/ImagePlaceholder";
import { SectionLabel } from "../ui/SectionLabel";

export function ProfileSection() {
  return (
    <BookSpread
      id="profile"
      left={
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
      }
      right={
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
      }
    />
  );
}
