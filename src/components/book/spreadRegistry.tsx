import type { ReactNode } from "react";
import { portfolioContents, projects } from "../../data/portfolioData";
import { ContentsLeftPage, ContentsRightPage } from "./ContentsPages";
import {
  ContactLeftPage,
  ContactRightPage,
  CVLeftPage,
  CVRightPage,
  ProfileLeftPage,
  ProfileRightPage,
  WorksLeftPage,
  WorksRightPage,
} from "./PortfolioPages";
import { getProjectChapterSpreads } from "./projectChapterRegistry";

export interface ReaderSpread {
  id: string;
  anchorId?: string;
  number: string;
  page: string;
  label: string;
  statusLabel?: string;
  left: ReactNode;
  right: ReactNode;
}

const contactNumber =
  portfolioContents.find((item) => item.id === "contact")?.number ?? "07";
const contentsById = new Map(portfolioContents.map((item) => [item.id, item]));
const firstProjectPage = 10;
const pagesPerProject = 8;

export const readerSpreads: ReaderSpread[] = [
  {
    id: "reader-contents",
    number: "00",
    page: "02",
    label: "Contents",
    left: <ContentsLeftPage />,
    right: <ContentsRightPage />,
  },
  {
    id: "reader-profile",
    anchorId: "profile",
    number: "01",
    page: contentsById.get("profile")?.page ?? "04",
    label: "Profile / About",
    left: <ProfileLeftPage />,
    right: <ProfileRightPage />,
  },
  {
    id: "reader-cv",
    anchorId: "cv",
    number: "02",
    page: contentsById.get("cv")?.page ?? "06",
    label: "Curriculum Vitae",
    left: <CVLeftPage />,
    right: <CVRightPage />,
  },
  {
    id: "reader-works",
    anchorId: "works",
    number: "03",
    page: contentsById.get("works")?.page ?? "08",
    label: "Selected Works",
    left: <WorksLeftPage />,
    right: <WorksRightPage />,
  },
  ...projects.flatMap((project, projectIndex) =>
    getProjectChapterSpreads(project).map((chapter, chapterIndex) => ({
      id: `reader-project-${project.id}-${chapter.id}`,
      anchorId:
        chapter.id === "cover" ? `project-${project.id}` : undefined,
      number: project.number,
      page: String(
        firstProjectPage + projectIndex * pagesPerProject + chapterIndex * 2,
      ).padStart(2, "0"),
      label: `${project.title} / ${chapter.label}`,
      statusLabel: `Project ${project.number} / ${chapter.label}`,
      left: chapter.left,
      right: chapter.right,
    })),
  ),
  {
    id: "reader-contact",
    anchorId: "contact",
    number: contactNumber,
    page: "End",
    label: "Contact",
    left: <ContactLeftPage />,
    right: <ContactRightPage />,
  },
];
