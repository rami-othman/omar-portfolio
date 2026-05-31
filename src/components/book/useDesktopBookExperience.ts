import { useEffect, useState } from "react";

const DESKTOP_BOOK_QUERY =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function matchesDesktopBookExperience() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(DESKTOP_BOOK_QUERY).matches
  );
}

export function useDesktopBookExperience() {
  const [isDesktopBook, setIsDesktopBook] = useState(
    matchesDesktopBookExperience,
  );

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_BOOK_QUERY);
    const updateMatch = () => setIsDesktopBook(media.matches);

    updateMatch();
    media.addEventListener("change", updateMatch);

    return () => media.removeEventListener("change", updateMatch);
  }, []);

  return isDesktopBook;
}
