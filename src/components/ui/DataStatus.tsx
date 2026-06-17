interface DataStatusProps {
  isLoading: boolean;
  error?: string;
}

export function DataStatus({ isLoading, error }: DataStatusProps) {
  if (!isLoading && !error) {
    return null;
  }

  return (
    <p className="mt-6 w-fit border-y border-ink/12 py-2 font-mono text-[0.58rem] uppercase tracking-editorial text-ink/45">
      {isLoading
        ? "Loading portfolio archive"
        : "Using local portfolio fallback"}
    </p>
  );
}
