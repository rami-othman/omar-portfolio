import { BookSpread } from "../book/BookSpread";
import { ProfileLeftPage, ProfileRightPage } from "../book/PortfolioPages";

export function ProfileSection() {
  return (
    <BookSpread
      id="profile"
      left={<ProfileLeftPage />}
      right={<ProfileRightPage />}
    />
  );
}
