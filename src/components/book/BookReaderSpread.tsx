import { PaperPage } from "./PaperPage";
import type { ReaderSpread } from "./spreadRegistry";

interface BookReaderSpreadProps {
  spread: ReaderSpread;
  stackIndex: number;
}

export function BookReaderSpread({
  spread,
  stackIndex,
}: BookReaderSpreadProps) {
  return (
    <article
      aria-label={spread.label}
      data-reader-spread={spread.id}
      className="book-reader-spread invisible absolute inset-0"
      style={{ zIndex: stackIndex }}
    >
      <div className="book-reader-paper-stack pointer-events-none absolute inset-x-1 -bottom-2 h-3" />
      <div className="book-reader-paper-stack pointer-events-none absolute inset-x-2 -top-1 h-2 opacity-60" />
      <div className="book-reader-book book-spread mx-auto grid h-full max-w-[86rem] grid-cols-2 overflow-visible border border-ink/10 shadow-page">
        <div data-reader-left-page className="book-reader-left-page h-full">
          <PaperPage side="left" className="h-full">
            {spread.left}
          </PaperPage>
        </div>
        <div
          data-reader-right-page
          className="book-reader-right-page relative h-full"
        >
          <div className="book-reader-page-face book-reader-page-front absolute inset-0">
            <PaperPage side="right" className="h-full">
              {spread.right}
            </PaperPage>
          </div>
          <div
            aria-hidden="true"
            className="book-reader-page-face book-reader-page-back absolute inset-0"
          >
            <div className="book-reader-page-back-inner h-full" />
          </div>
          <div
            data-reader-turn-shadow
            className="book-reader-turn-shadow pointer-events-none absolute inset-y-0 left-0 w-2/5 opacity-0"
          />
          <div className="book-reader-paper-edge pointer-events-none absolute inset-y-0 right-0 w-px" />
        </div>
        <div
          data-reader-spine-shadow
          className="book-reader-moving-spine pointer-events-none absolute inset-y-0 left-1/2 z-30 w-10 -translate-x-1/2 opacity-0"
        />
      </div>
    </article>
  );
}
