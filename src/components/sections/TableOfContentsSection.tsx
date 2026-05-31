import { BookSpread } from "../book/BookSpread";
import { ContentsLeftPage, ContentsRightPage } from "../book/ContentsPages";

interface TableOfContentsSectionProps {
  id?: string;
}

export function TableOfContentsSection({
  id = "contents",
}: TableOfContentsSectionProps) {
  return (
    <BookSpread
      id={id}
      left={<ContentsLeftPage />}
      right={<ContentsRightPage />}
    />
  );
}
