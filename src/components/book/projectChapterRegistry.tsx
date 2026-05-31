import type { ReactNode } from "react";
import type { Project } from "../../data/portfolioData";
import {
  ProjectConceptLeftPage,
  ProjectConceptRightPage,
  ProjectCoverLeftPage,
  ProjectCoverRightPage,
  ProjectDrawingsLeftPage,
  ProjectDrawingsRightPage,
  ProjectRendersLeftPage,
  ProjectRendersRightPage,
} from "./PortfolioPages";

export interface ProjectChapterSpread {
  id: "cover" | "concept" | "drawings" | "renders";
  label: string;
  left: ReactNode;
  right: ReactNode;
}

export function getProjectChapterSpreads(
  project: Project,
): ProjectChapterSpread[] {
  return [
    {
      id: "cover",
      label: "Cover",
      left: <ProjectCoverLeftPage project={project} />,
      right: <ProjectCoverRightPage project={project} />,
    },
    {
      id: "concept",
      label: "Concept",
      left: <ProjectConceptLeftPage project={project} />,
      right: <ProjectConceptRightPage project={project} />,
    },
    {
      id: "drawings",
      label: "Drawings",
      left: <ProjectDrawingsLeftPage project={project} />,
      right: <ProjectDrawingsRightPage project={project} />,
    },
    {
      id: "renders",
      label: "Renders",
      left: <ProjectRendersLeftPage project={project} />,
      right: <ProjectRendersRightPage project={project} />,
    },
  ];
}
