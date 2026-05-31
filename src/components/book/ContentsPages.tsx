import { portfolioContents } from "../../data/portfolioData";
import { Divider } from "../ui/Divider";
import { SectionLabel } from "../ui/SectionLabel";

export function ContentsLeftPage() {
  return (
    <div className="flex h-full flex-col justify-between">
      <SectionLabel number="00" title="Contents" />
      <div className="max-w-md">
        <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-graphite">
          Portfolio index
        </p>
        <h2 className="mt-5 font-display text-6xl leading-[0.88] sm:text-7xl">
          A quiet
          <br />
          collection
          <br />
          of work.
        </h2>
      </div>
      <p className="max-w-xs text-xs leading-6 text-graphite">
        A digital notebook of selected projects, studies, and architectural
        observations.
      </p>
    </div>
  );
}

export function ContentsRightPage() {
  return (
    <div className="flex h-full flex-col">
      <SectionLabel number="I" title="Index" />
      <div className="mt-16">
        {portfolioContents.map((item) => (
          <div key={item.number}>
            <div className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 py-4">
              <span className="font-mono text-[0.58rem] tracking-editorial text-graphite">
                {item.number}
              </span>
              <a
                className="font-display text-2xl transition-opacity hover:opacity-55"
                href={item.href}
              >
                {item.label}
              </a>
              <span className="font-mono text-[0.58rem] text-graphite">
                {item.page}
              </span>
            </div>
            <Divider />
          </div>
        ))}
      </div>
      <p className="mt-auto pt-14 text-right font-mono text-[0.55rem] uppercase tracking-editorial text-graphite">
        Omar / Architecture Portfolio
      </p>
    </div>
  );
}
