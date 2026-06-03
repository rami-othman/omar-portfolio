# Omar Architecture Portfolio

A clean black and white architecture portfolio for Omar. The site is built as a
simple one-page portfolio with a premium studio feel: precise linework, generous
spacing, quiet typography, and project covers that can use real imagery when it
is ready.

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

## Project Structure

```text
src/
  app/              Main app composition
  components/
    layout/         Site frame
    sections/       Header, hero, projects, about, and contact sections
    ui/             Shared brand image helper
  data/             Typed portfolio content
  pages/            Project detail routes
  styles/           Global styles and architectural linework utilities

public/
  brand/            Logo and name assets
  projects/         Project image folders
```

## Sharing Project Zips

When sharing the project as a zip, exclude generated and local-only folders:

```text
node_modules
dist
.git
.playwright-mcp
```

After committing the source you want to share, you can create a clean archive
with:

```bash
npm run zip:source
```

This uses `git archive`, so it includes committed source files only and leaves
generated folders out.

## Brand Assets

The current design prefers the cleaned/deflated brand assets:

```text
public/brand/logo_deflated.png
public/brand/name_and_logo_deflated.png
public/brand/name_deflated.png
```

The older assets remain available as fallbacks:

```text
public/brand/omar-logo.png
public/brand/omar-name-with-logo.png
public/brand/omar-name.png
```

## Portfolio Data

Main content lives in:

```text
src/data/portfolioData.ts
```

Update this file to edit:

- Profile statement and biography
- Skills and software
- Contact details and links
- Project titles, years, types, descriptions, and image paths
- Project gallery arrays for renders, drawings, and concept/process images

Placeholder contact values are intentionally rendered as neutral "to be added"
messages in the UI until real details are entered.

## Routes

The homepage is served at:

```text
/
```

Project case-study pages use the project id from `src/data/portfolioData.ts`:

```text
/projects/kitchen-interior
/projects/bathroom-interior
/projects/dining-interior
```

The site uses `BrowserRouter`, so direct project URLs need an SPA fallback on
static hosts. Fallback files are included:

```text
vercel.json         Vercel rewrite to /index.html
public/_redirects  Netlify redirect to /index.html
```

## Project Images

Project images should be placed in the matching folder under
`public/projects/<project-id>/`:

```text
public/projects/
  kitchen-interior/
    cover.png
  bathroom-interior/
    cover.png
  dining-interior/
    cover.png
```

Project content is managed in `src/data/portfolioData.ts`.

Use `coverImage` for the main hero image on the project page. Use the gallery
arrays for additional assets:

- `renders`: final or atmospheric render images
- `drawings`: plans, sections, elevations, and technical sheets
- `conceptImages`: process, detail, material, or concept studies

Then set each project image path in `src/data/portfolioData.ts`, for example:

```ts
coverImage: {
  src: "/projects/kitchen-interior/cover.png",
  caption: "Main view",
  alt: "Warm kitchen interior render",
  orientation: "landscape",
  layout: "full",
}
```

To add more images later, place the files in the same project folder and add
them to the relevant array:

```ts
renders: [
  {
    src: "/projects/kitchen-interior/render-01.png",
    caption: "Kitchen evening render",
    alt: "Kitchen interior render with concealed lighting",
    orientation: "landscape",
    layout: "full",
  },
],
drawings: [
  {
    src: "/projects/kitchen-interior/plan-01.png",
    caption: "Kitchen plan",
    alt: "Kitchen interior plan drawing",
    orientation: "landscape",
    layout: "full",
  },
],
conceptImages: [
  {
    src: "/projects/kitchen-interior/detail-01.png",
    caption: "Material detail",
    alt: "Kitchen material detail study",
    orientation: "square",
    layout: "half",
  },
],
```

`orientation` can be `landscape`, `portrait`, or `square`. `layout` can be
`full` for a wide image or `half` for a two-column gallery item. Do not add paths
until the matching files exist in `public/projects/<project-id>/`.

If a project does not have a real image yet, the website renders a deliberate
black and white typographic cover instead of a missing-image placeholder.
