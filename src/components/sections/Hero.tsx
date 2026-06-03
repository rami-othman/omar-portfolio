import { profile, projects } from "../../data/portfolioData";
import { BrandImage } from "../ui/BrandImage";

const heroProject = projects[0];

export function Hero() {
  return (
    <section
      id="home"
      className="architectural-grid relative isolate scroll-mt-20 overflow-hidden border-b border-ink/12 px-4 py-9 sm:px-6 sm:py-12 lg:px-10 lg:py-12"
    >
      <div className="mx-auto grid max-w-7xl gap-9 lg:min-h-[clamp(34rem,calc(100vh-10rem),44rem)] lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.46fr)] lg:items-center">
        <div className="fade-in-up max-w-5xl">
          <div className="flex items-center gap-4">
            <BrandImage
              sources={["/brand/logo_deflated.png", "/brand/omar-logo.png"]}
              alt="Omar architecture mark"
              fallback="O"
              className="h-16 w-16 shrink-0 sm:h-20 sm:w-20"
            />
            <div className="h-px flex-1 bg-ink/16" />
            <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/55">
              Portfolio / 2026
            </p>
          </div>

          <div className="mt-6 max-w-4xl border-y border-ink/15 py-5 sm:mt-7 sm:py-7">
            <BrandImage
              sources={["/brand/name_deflated.png", "/brand/omar-name.png"]}
              alt="Omar architecture identity"
              fallback={profile.name}
              className="h-auto w-full max-w-[34rem]"
            />
          </div>

          <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[0.94] text-ink sm:text-7xl xl:text-[5.75rem]">
            Selected Works
          </h1>
          <div className="mt-6 grid max-w-3xl gap-5 border-t border-ink/15 pt-5 sm:grid-cols-[1fr_1.2fr]">
            <p className="font-mono text-[0.66rem] uppercase tracking-editorial text-ink/55">
              Architecture / Design / Visualization
            </p>
            <p className="text-base leading-7 text-ink/68 sm:text-lg">
              {profile.statement}
            </p>
          </div>
        </div>

        <article
          className="fade-in-up border border-ink/14 bg-canvas/90 p-5 sm:p-6"
          style={{ animationDelay: "120ms" }}
        >
          <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/45">
            Featured Study
          </p>
          <div className="mt-8">
            <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/45">
              {heroProject.number}
            </p>
            <h2 className="mt-3 font-display text-4xl font-medium leading-none text-ink sm:text-5xl">
              {heroProject.title}
            </h2>
            <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-editorial text-ink/55">
              {heroProject.type} / {heroProject.year}
            </p>
          </div>
          <div className="mt-7 border-t border-ink/15 pt-5">
            <img
              src={heroProject.coverImage.src}
              alt={heroProject.coverImage.alt ?? heroProject.title}
              className="aspect-[4/3] w-full border border-ink/12 object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
          <a
            className="mt-6 inline-flex border-b border-ink pb-1 font-mono text-[0.62rem] uppercase tracking-editorial text-ink transition hover:text-ink/60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
            href="#projects"
          >
            View selected projects
          </a>
        </article>
      </div>
    </section>
  );
}
