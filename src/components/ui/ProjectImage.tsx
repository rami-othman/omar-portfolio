import { useEffect, useState } from "react";
import type { ProjectImageAsset } from "../../data/portfolioData";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface ProjectImageProps {
  image: ProjectImageAsset;
  kind: "cover" | "drawing" | "render";
  detail: string;
  className?: string;
  tone?: "light" | "dark";
  captionPrefix?: string;
}

export function ProjectImage({
  image,
  kind,
  detail,
  className = "",
  tone = "light",
  captionPrefix,
}: ProjectImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [image.src]);

  const showImage = Boolean(image.src) && !failed;
  const objectFit = kind === "drawing" ? "object-contain" : "object-cover";

  return (
    <figure className={`flex flex-col ${className}`}>
      <div className="min-h-0 grow overflow-hidden">
        {showImage ? (
          <img
            className={`h-full w-full bg-paper-deep/45 ${objectFit}`}
            src={image.src}
            alt={image.alt ?? image.caption}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <ImagePlaceholder
            label={image.caption}
            detail={detail}
            className="h-full min-h-full"
            tone={tone}
          />
        )}
      </div>
      <figcaption className="mt-4 font-mono text-[0.55rem] uppercase tracking-editorial text-graphite">
        {captionPrefix ? `${captionPrefix} / ` : ""}
        {image.caption}
      </figcaption>
    </figure>
  );
}
