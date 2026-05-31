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
- GSAP with ScrollTrigger for the pinned intro and desktop page turns

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

## Replacing Omar's Real Content

Update `src/data/portfolioData.ts` to replace the placeholder biography, CV,
skills, contact information, and project content.

Each project supports:

- Project metadata and a short description
- A concept statement and design-process steps
- Concept keywords
- Cover image
- Concept images
- Drawings
- Renders
- Optional credits and notes

The visual placeholders are rendered by
`src/components/ui/ImagePlaceholder.tsx`. Replace them with real responsive
images once the project asset paths are ready.

### Project Images

Each project supports a typed `coverImage`, `drawings[]`, and `renders[]` array
in `src/data/portfolioData.ts`. Add files under the matching project folder:

```text
public/projects/
  courtyard-house/
    cover.jpg
    concept-01.jpg
    concept-02.jpg
    plan-01.jpg
    section-01.jpg
    render-01.jpg
    render-02.jpg
  cultural-ground/
  edge-library/
```

Then set each asset's `src` to a public path such as
`/projects/courtyard-house/cover.jpg`. `ProjectImage.tsx` keeps the layout stable
and falls back to the editorial placeholder when a path is empty or cannot
load. Drawings use `object-contain`; covers and renders use `object-cover`.

Recommended preparation:

- Use lowercase, simple file names.
- Export cover images and renders as JPG or WebP, ideally 1800-2400px wide.
- Export drawings as PNG or JPG with a clean white background, ideally
  1800-2600px wide.
- Keep file sizes considered for web delivery.
- Leave `src` empty while an image is not ready; the placeholder remains stable.

## Brand Images

Add real brand assets to `public/brand/`:

```text
public/brand/
  omar-logo.png
  omar-name.png
  omar-name-with-logo.png
```

The interface checks PNG first, supports JPG fallback paths, and displays text
if neither image is available.

## Scroll Intro

`src/components/book/ScrollBookIntro.tsx` owns the desktop opening sequence.
GSAP ScrollTrigger pins the cover and opens it into the contents spread across
`270vh`. Adjust the `h-[270vh]` class on the intro section to make the sequence
shorter or longer. Tablet and mobile layouts use a simple vertical cover and
contents flow.

## Desktop Book Reader

`src/components/book/BookReaderStage.tsx` renders the post-intro portfolio as a
single pinned open book on motion-enabled desktop screens. It turns through the
contents handoff, profile, CV, selected works, project chapters, and contact.
Each project chapter includes cover, concept, drawings, and renders spreads.
Change `SCROLL_PER_SPREAD` in that file to adjust the reading pace. Smaller
screens and reduced-motion preferences render the normal vertical editorial
flow instead.

The reader status label updates as each spread becomes active. The fixed side
navigation follows the same anchors and groups all project spreads under the
Projects entry.

## Next Milestone

Replace placeholders with Omar's real content and imagery, then refine each
project chapter around its strongest drawings and atmospheres. A later motion
pass can add a final-book closing sequence after Contact.
