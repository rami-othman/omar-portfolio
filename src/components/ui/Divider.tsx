interface DividerProps {
  className?: string;
}

export function Divider({ className = "" }: DividerProps) {
  return <div aria-hidden="true" className={`h-px bg-rule ${className}`} />;
}
