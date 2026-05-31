import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CoverSection } from "../sections/CoverSection";
import { TableOfContentsSection } from "../sections/TableOfContentsSection";
import { BookHero } from "./BookHero";
import { ContentsLeftPage, ContentsRightPage } from "./ContentsPages";
import { PaperPage } from "./PaperPage";
import { OPEN_BOOK_SIZE_CLASS } from "./bookLayout";

gsap.registerPlugin(ScrollTrigger);

export function ScrollBookIntro() {
  const introRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closedBookRef = useRef<HTMLDivElement>(null);
  const openSpreadRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLParagraphElement>(null);
  const stageLabelsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const intro = introRef.current;
    const stage = stageRef.current;
    const closedBook = closedBookRef.current;
    const openSpread = openSpreadRef.current;

    if (!intro || !stage || !closedBook || !openSpread) {
      return;
    }

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const reveal = { inset: 24 };
          const timeline = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: intro,
              pin: stage,
              pinSpacing: false,
              scrub: 0.8,
              start: "top top",
              end: "bottom top",
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          gsap.set(openSpread, {
            autoAlpha: 0,
            scale: 0.62,
          });
          openSpread.style.setProperty("--book-reveal", String(reveal.inset));

          // The cover settles first, then yields to the spread underneath.
          timeline
            .to(closedBook, {
              y: -14,
              scale: 1.065,
              duration: 0.34,
            })
            .to(promptRef.current, { autoAlpha: 0, duration: 0.1 }, 0.12)
            .to(
              openSpread,
              {
                autoAlpha: 1,
                duration: 0.12,
              },
              0.38,
            )
            .to(
              closedBook,
              {
                xPercent: -42,
                rotationY: -82,
                rotationZ: -0.6,
                scale: 0.67,
                autoAlpha: 0.22,
                duration: 0.27,
              },
              0.47,
            )
            .to(
              reveal,
              {
                inset: 0,
                onUpdate: () => {
                  openSpread.style.setProperty(
                    "--book-reveal",
                    String(reveal.inset),
                  );
                },
                duration: 0.34,
              },
              0.51,
            )
            .to(openSpread, { scale: 1, duration: 0.34 }, 0.51)
            .to(
              closedBook,
              {
                xPercent: -88,
                rotationY: -116,
                autoAlpha: 0,
                duration: 0.17,
              },
              0.67,
            )
            .to(stageLabelsRef.current, { opacity: 0.36, duration: 0.2 }, 0.75);

          return () => {
            openSpread.style.removeProperty("--book-reveal");
            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        },
      );

    }, intro);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <>
      <span
        id="cover"
        className="pointer-events-none absolute left-0 top-0 scroll-mt-8"
      />
      <span
        id="contents"
        className="pointer-events-none absolute left-0 top-[100vh] scroll-mt-8 lg:top-[170vh]"
      />
      <div className="lg:hidden">
        <CoverSection id="mobile-cover" />
        <TableOfContentsSection id="mobile-contents" />
      </div>

      <section
        ref={introRef}
        className="scroll-book-intro relative hidden h-[270vh] scroll-mt-8 lg:block"
      >
        <div
          ref={stageRef}
          className="relative flex h-screen items-center justify-center overflow-hidden"
        >
          <div
            ref={stageLabelsRef}
            className="pointer-events-none absolute inset-0 opacity-100"
          >
            <div className="absolute left-1/2 top-1/2 h-[72vh] w-px -translate-x-1/2 -translate-y-1/2 bg-ink/10" />
            <p className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 font-mono text-[0.55rem] uppercase tracking-editorial text-graphite">
              Digital notebook / volume 01
            </p>
            <p className="absolute left-0 top-8 font-mono text-[0.55rem] uppercase tracking-editorial text-graphite">
              Omar / Architectural designer
            </p>
            <p className="absolute bottom-8 right-0 font-mono text-[0.55rem] uppercase tracking-editorial text-graphite">
              Selected work / 2023-2026
            </p>
          </div>

          <div
            ref={openSpreadRef}
            className={`book-open-frame book-spread scroll-book-open-spread invisible absolute z-10 grid grid-cols-2 overflow-hidden border border-ink/10 shadow-page ${OPEN_BOOK_SIZE_CLASS}`}
          >
            <PaperPage side="left" className="h-full">
              <ContentsLeftPage />
            </PaperPage>
            <PaperPage side="right" className="h-full">
              <ContentsRightPage />
            </PaperPage>
          </div>

          <div
            ref={closedBookRef}
            className="scroll-book-cover absolute z-20 [perspective:1600px]"
          >
            <BookHero />
          </div>

          <p
            ref={promptRef}
            className="absolute bottom-8 left-0 font-mono text-[0.55rem] uppercase tracking-editorial text-graphite"
          >
            Scroll to open the portfolio
          </p>
        </div>
      </section>
    </>
  );
}
