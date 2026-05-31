import { BookSpread } from "../book/BookSpread";
import { CVLeftPage, CVRightPage } from "../book/PortfolioPages";

export function CVSection() {
  return (
    <BookSpread id="cv" left={<CVLeftPage />} right={<CVRightPage />} />
  );
}
