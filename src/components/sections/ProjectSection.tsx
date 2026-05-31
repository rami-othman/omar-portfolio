import type { Project } from "../../data/portfolioData";
import { BookSpread } from "../book/BookSpread";
import { getProjectChapterSpreads } from "../book/projectChapterRegistry";

interface ProjectSectionProps {
  project: Project;
}

export function ProjectSection({ project }: ProjectSectionProps) {
  const chapters = getProjectChapterSpreads(project);

  return (
    <>
      {chapters.map((chapter, index) => (
        <BookSpread
          id={
            index === 0
              ? `project-${project.id}`
              : `project-${project.id}-${chapter.id}`
          }
          key={chapter.id}
          leftClassName="flex flex-col"
          rightClassName="flex flex-col"
          left={chapter.left}
          right={chapter.right}
        />
      ))}
    </>
  );
}
