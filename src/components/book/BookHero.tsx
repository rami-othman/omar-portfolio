import { BookShell } from "./BookShell";
import { BrandImage } from "../ui/BrandImage";

export function BookHero() {
  return (
    <BookShell>
      <div className="flex items-start justify-between gap-6">
        <p className="font-mono text-[0.58rem] uppercase leading-relaxed tracking-editorial text-paper/70">
          Selected work
          <br />
          2023-2026
        </p>
        <p className="font-mono text-[0.58rem] uppercase tracking-editorial text-paper/55">
          Vol. 01
        </p>
      </div>

      <div>
        <p className="mb-5 text-[0.62rem] uppercase tracking-[0.35em] text-paper/65">
          Architecture portfolio
        </p>
        <BrandImage
          src="/brand/omar-name-with-logo.jpg"
          alt="Omar architecture portfolio"
          fallback="OMAR"
          className="max-h-24 max-w-[90%] text-6xl text-paper sm:text-7xl"
        />
        <p className="mt-6 max-w-[18rem] font-display text-2xl leading-[1.05] text-paper/90 sm:text-3xl">
          Notes on space,
          <br />
          material, and place.
        </p>
      </div>

      <div className="flex items-end justify-between gap-6">
        <p className="font-mono text-[0.56rem] uppercase leading-relaxed tracking-editorial text-paper/60">
          Architectural
          <br />
          designer
        </p>
        <span className="font-display text-3xl italic text-paper/70">01</span>
      </div>
    </BookShell>
  );
}
