import { useState } from "react";

interface BrandImageProps {
  src: string;
  alt: string;
  fallback: string;
  className?: string;
}

export function BrandImage({
  src,
  alt,
  fallback,
  className = "",
}: BrandImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={`font-display tracking-[0.16em] ${className}`}>
        {fallback}
      </span>
    );
  }

  return (
    <img
      className={`object-contain ${className}`}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}
