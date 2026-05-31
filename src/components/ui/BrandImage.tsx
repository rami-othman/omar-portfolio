import { useState } from "react";

interface BrandImageProps {
  sources: string[];
  alt: string;
  fallback: string;
  className?: string;
}

export function BrandImage({
  sources,
  alt,
  fallback,
  className = "",
}: BrandImageProps) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const source = sources[sourceIndex];

  if (!source) {
    return (
      <span className={`font-display tracking-[0.16em] ${className}`}>
        {fallback}
      </span>
    );
  }

  return (
    <img
      className={`object-contain ${className}`}
      src={source}
      alt={alt}
      onError={() => setSourceIndex((index) => index + 1)}
    />
  );
}
