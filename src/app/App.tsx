import { SiteFrame } from "../components/layout/SiteFrame";
import { BookReaderStage } from "../components/book/BookReaderStage";
import { ScrollBookIntro } from "../components/book/ScrollBookIntro";
import { useDesktopBookExperience } from "../components/book/useDesktopBookExperience";
import { PortfolioSections } from "../components/sections/PortfolioSections";

export function App() {
  const isDesktopBook = useDesktopBookExperience();

  return (
    <SiteFrame>
      <ScrollBookIntro />
      {isDesktopBook ? <BookReaderStage /> : <PortfolioSections />}
    </SiteFrame>
  );
}
