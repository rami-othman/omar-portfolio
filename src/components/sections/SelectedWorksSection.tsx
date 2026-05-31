import { BookSpread } from "../book/BookSpread";
import { WorksLeftPage, WorksRightPage } from "../book/PortfolioPages";

export function SelectedWorksSection() {
  return (
    <BookSpread
      id="works"
      left={<WorksLeftPage />}
      right={<WorksRightPage />}
    />
  );
}
