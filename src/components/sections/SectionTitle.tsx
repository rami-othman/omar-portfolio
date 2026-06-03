interface SectionTitleProps {
  number: string;
  eyebrow: string;
  title: string;
  children?: string;
}

export function SectionTitle({
  number,
  eyebrow,
  title,
  children,
}: SectionTitleProps) {
  return (
    <div className="grid gap-5 border-t border-ink/15 pt-5 md:grid-cols-[8rem_1fr] lg:grid-cols-[9rem_1fr]">
      <div className="flex items-start justify-between gap-4 md:block">
        <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/45">
          {number}
        </p>
        <p className="font-mono text-[0.62rem] uppercase tracking-editorial text-ink/65 md:mt-7">
          {eyebrow}
        </p>
      </div>
      <div className="max-w-4xl">
        <h2 className="font-display text-[2.6rem] font-medium leading-[0.98] text-ink sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {children ? (
          <p className="mt-4 max-w-2xl text-base leading-7 text-ink/65 sm:text-lg">
            {children}
          </p>
        ) : null}
      </div>
    </div>
  );
}
