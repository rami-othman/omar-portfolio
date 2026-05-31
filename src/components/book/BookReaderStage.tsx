import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookReaderSpread } from "./BookReaderSpread";
import { readerSpreads } from "./spreadRegistry";
import { OPEN_BOOK_SIZE_CLASS } from "./bookLayout";

gsap.registerPlugin(ScrollTrigger);

export const SCROLL_PER_SPREAD = 120;

const transitionCount = readerSpreads.length - 1;
const readerHeight = 100 + transitionCount * SCROLL_PER_SPREAD;

export function BookReaderStage() {
  const readerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeSpreadRef = useRef(0);
  const [activeSpreadIndex, setActiveSpreadIndex] = useState(0);

  useLayoutEffect(() => {
    const reader = readerRef.current;
    const stage = stageRef.current;

    if (!reader || !stage) {
      return;
    }

    const context = gsap.context(() => {
      const spreads = gsap.utils.toArray<HTMLElement>("[data-reader-spread]");

      gsap.set(spreads, { autoAlpha: 1 });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: reader,
          pin: stage,
          pinSpacing: false,
          scrub: 0.75,
          start: "top top",
          end: "bottom bottom",
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const updateActiveSpread = () => {
        const nextIndex = Math.min(
          spreads.length - 1,
          Math.max(0, Math.floor(timeline.time() + 0.5)),
        );

        if (nextIndex !== activeSpreadRef.current) {
          activeSpreadRef.current = nextIndex;
          setActiveSpreadIndex(nextIndex);
        }
      };

      timeline.eventCallback("onUpdate", updateActiveSpread);

      spreads.slice(0, -1).forEach((spread, index) => {
        const leftPage = spread.querySelector<HTMLElement>(
          "[data-reader-left-page]",
        );
        const rightPage = spread.querySelector<HTMLElement>(
          "[data-reader-right-page]",
        );
        const turnShadow = spread.querySelector<HTMLElement>(
          "[data-reader-turn-shadow]",
        );
        const spineShadow = spread.querySelector<HTMLElement>(
          "[data-reader-spine-shadow]",
        );

        if (!leftPage || !rightPage || !turnShadow || !spineShadow) {
          return;
        }

        // Each timeline unit is one measured page turn with a short reading pause.
        timeline
          .to(
            rightPage,
            {
              rotationY: -104,
              scaleX: 0.985,
              boxShadow: "18px 0 34px rgba(45, 39, 32, 0.2)",
              duration: 0.76,
            },
            index,
          )
          .to(turnShadow, { opacity: 0.72, duration: 0.2 }, index + 0.08)
          .to(
            spineShadow,
            { opacity: 0.75, scaleX: 1.45, duration: 0.24 },
            index + 0.08,
          )
          .to(turnShadow, { opacity: 0, duration: 0.34 }, index + 0.3)
          .to(
            spineShadow,
            { opacity: 0, scaleX: 0.75, duration: 0.38 },
            index + 0.34,
          )
          .to(leftPage, { opacity: 0.12, duration: 0.24 }, index + 0.48)
          .to(spread, { autoAlpha: 0, duration: 0.14 }, index + 0.82);
      });

      timeline.to({}, { duration: 0.12 });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    }, reader);

    return () => context.revert();
  }, []);

  const activeSpread = readerSpreads[activeSpreadIndex];

  return (
    <section
      ref={readerRef}
      aria-label="Scroll-driven portfolio reader"
      className="book-reader-root relative"
      style={{ height: `${readerHeight}vh` }}
    >
      {readerSpreads.map((spread, index) =>
        spread.anchorId ? (
          <span
            key={spread.anchorId}
            id={spread.anchorId}
            className="pointer-events-none absolute left-0 scroll-mt-8"
            style={{ top: `${index * SCROLL_PER_SPREAD}vh` }}
          />
        ) : null,
      )}

      <div
        ref={stageRef}
        className="book-reader-stage relative flex h-screen items-center justify-center overflow-hidden py-14"
      >
        <div className="pointer-events-none absolute left-0 top-8 font-mono text-[0.55rem] uppercase tracking-editorial text-graphite">
          Open portfolio / Scroll to turn pages
        </div>
        <div className="pointer-events-none absolute bottom-8 right-0 font-mono text-[0.55rem] uppercase tracking-editorial text-graphite">
          Omar / Architecture portfolio / Vol. 01
        </div>
        <p
          data-reader-status
          className="pointer-events-none absolute bottom-8 left-0 font-mono text-[0.55rem] uppercase tracking-editorial text-ink"
        >
          {activeSpread.page} / {activeSpread.statusLabel ?? activeSpread.label}
        </p>
        <div
          className={`book-open-frame relative [perspective:1800px] ${OPEN_BOOK_SIZE_CLASS}`}
        >
          {readerSpreads.map((spread, index) => (
            <BookReaderSpread
              key={spread.id}
              spread={spread}
              stackIndex={readerSpreads.length - index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
