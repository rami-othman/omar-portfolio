interface SectionLabelProps {
  number: string;
  title: string;
}

export function SectionLabel({ number, title }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-4 text-[0.62rem] uppercase tracking-editorial text-graphite">
      <span className="font-mono">{number}</span>
      <span className="h-px w-10 bg-rule" aria-hidden="true" />
      <span>{title}</span>
    </div>
  );
}
