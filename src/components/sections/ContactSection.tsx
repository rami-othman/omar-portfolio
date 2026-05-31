import { BookSpread } from "../book/BookSpread";
import { ContactLeftPage, ContactRightPage } from "../book/PortfolioPages";

export function ContactSection() {
  return (
    <BookSpread
      id="contact"
      className="pb-14 lg:pb-24"
      left={<ContactLeftPage />}
      right={<ContactRightPage />}
    />
  );
}
