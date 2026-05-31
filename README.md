# Omar Architecture Portfolio

A premium architecture portfolio foundation for Omar, designed as a digital
editorial notebook rather than a conventional landing page. The current version
opens with a closed book cover and continues through responsive portfolio
spreads with restrained motion, paper texture, and placeholder content.

## Tech Stack

- React + Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP with ScrollTrigger installed for the next animation milestone

## Install And Run

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Structure

```text
src/
  app/              Main app composition
  components/
    book/           Reusable book, spread, and paper primitives
    layout/         Fixed navigation, scroll progress, and site frame
    sections/       Portfolio sections rendered in reading order
    ui/             Small editorial UI elements and image fallbacks
  data/             Typed portfolio content
  styles/           Global paper treatment and Tailwind layers
```

## Replace Omar's Content

Update `src/data/portfolioData.ts` to replace the placeholder biography, CV,
skills, contact information, and project content. Each project already supports
metadata, keywords, cover images, drawings, and renders.

The visual placeholders are rendered by
`src/components/ui/ImagePlaceholder.tsx`. Replace them with real responsive
images once the project asset paths are ready.

## Brand Images

Add real brand assets to `public/brand/`:

```text
public/brand/
  omar-logo.jpg
  omar-name.jpg
  omar-name-with-logo.jpg
```

The interface displays a text fallback if an image is not available yet.

## Scroll Intro

`src/components/book/ScrollBookIntro.tsx` owns the desktop opening sequence.
GSAP ScrollTrigger pins the cover and opens it into the contents spread across
`270vh`. Adjust the `h-[270vh]` class on the intro section to make the sequence
shorter or longer. Tablet and mobile layouts use a simple vertical cover and
contents flow.

## Next Milestone

Implement real scroll-driven page flipping between portfolio sections. The
existing `BookSpread` primitives and `data-book-spread` attributes provide
stable hooks for a shared stacked-page stage without changing the typed content
architecture.
