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
- Supabase

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
  admin/
    i18n/           Lightweight English/Arabic admin translations
  app/              Main app composition
  components/
    admin/          Admin shell, route guards, and image manager
    layout/         Site frame
    sections/       Header, hero, projects, about, and contact sections
    ui/             Shared brand image helper
  context/          Portfolio data provider
  data/             Typed portfolio content
  lib/              Supabase client
  pages/            Project detail routes
  services/         Portfolio and auth helpers
  styles/           Global styles and architectural linework utilities
  types/            Shared app and Supabase data types

public/
  brand/            Logo and name assets
  projects/         Project image folders

supabase/
  admin.sql         Admin users, admin RLS policies, and storage policies
  schema.sql        Tables, constraints, indexes, and public RLS policies
  seed.sql          Current public portfolio content seed
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

Public portfolio content is loaded through:

```text
src/services/portfolioService.ts
```

The service tries Supabase first when both Vite environment variables are
configured. If the variables are missing, or if the Supabase request fails, the
site keeps rendering the local fallback content from:

```text
src/data/portfolioData.ts
```

The fallback data intentionally remains in the project so local development and
static previews do not break before Supabase is configured.

The content model covers:

- Profile statement and biography
- Skills and software
- Contact details and links
- Project titles, years, types, descriptions, and image paths
- Project gallery arrays for renders, drawings, and concept/process images

Placeholder contact values are intentionally rendered as neutral "to be added"
messages in the UI until real details are entered.

## Supabase Setup

Create a Supabase project, then copy the project URL and anon/publishable key
into a local file:

```text
.env.local
```

Use these variable names:

```bash
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_or_publishable_key
```

Do not use a service role key in the Vite app.

In the Supabase dashboard, open SQL Editor and run:

```text
supabase/schema.sql
```

Then run the seed data:

```text
supabase/seed.sql
```

The schema enables Row Level Security on all public tables. Phase 2 policies
allow public reads for portfolio settings, published projects, and images that
belong to published projects. No public insert, update, or delete policy is
created.

### Storage

Create a public Supabase Storage bucket named:

```text
portfolio-images
```

Existing image paths in `public/projects` remain supported as fallbacks, and
Supabase rows can also use full Supabase Storage public URLs in
`cover_image_url` or `project_images`.

The admin panel uploads project images into this bucket using paths like:

```text
projects/<project-slug>/<timestamp>-<safe-file-name>
```

Uploaded public URLs are saved into `projects.cover_image_url` or
`project_images.image_url`.

## Admin Setup

The admin panel is available at:

```text
/admin
/admin/login
/admin/projects
/admin/projects/new
/admin/projects/<project-uuid>/edit
/admin/settings
```

The admin panel requires Supabase. It does not use fallback data, and it does
not use a service role key in the frontend.

### 1. Configure Environment Variables

Create `.env.local` or `.env` locally:

```bash
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_or_publishable_key
```

Never expose or paste the Supabase service role key into this React app.

### 2. Run SQL Files

In Supabase SQL Editor, run these files in order:

```text
supabase/schema.sql
supabase/seed.sql
supabase/admin.sql
```

`admin.sql` creates:

- `public.admin_users`
- `public.is_admin()`
- Admin CRUD policies for `portfolio_settings`, `projects`, and
  `project_images`
- Public read and admin write policies for Storage bucket `portfolio-images`

The Phase 2 public read policies remain in place:

- Public users can read portfolio settings.
- Public users can read only published projects.
- Public users can read project images only when the project is published.

### 3. Create the Admin Auth User

In Supabase Dashboard:

1. Go to Authentication.
2. Create a user with email and password.
3. Copy that user's UID.
4. Return to SQL Editor and run this snippet with your real UID and email:

```sql
insert into public.admin_users (user_id, email)
values ('PASTE_AUTH_USER_UID_HERE', 'admin@example.com')
on conflict (user_id) do update set email = excluded.email;
```

Only users listed in `admin_users` can access the protected admin pages.

### 4. Create Storage Bucket

Create a public Supabase Storage bucket named:

```text
portfolio-images
```

`supabase/admin.sql` also includes an optional bucket upsert. The important
security rule is that public users can read files, but only admin users can
upload, update, or delete files.

### 5. Use The Admin Panel

Visit:

```text
/admin/login
```

After signing in, use the language toggle in the admin header to switch between
English and Arabic. The selected language is saved in `localStorage`. Arabic
mode sets `dir="rtl"` inside the admin panel only; the public portfolio is not
affected.

Admin routes:

- `Projects` to create, edit, publish/unpublish, delete, and order projects.
- `Add Project` to create a new project.
- Project edit pages to upload cover images and manage render, drawing,
  concept, and process image records.
- `Settings` to edit profile, contact, about, skills, software, and approach.

### 6. Add Or Edit A Project

Go to:

```text
/admin/projects/new
```

The project form is grouped into:

- Basic Information
- Project Text
- Cover Image
- Gallery Images

When creating a project, the slug is generated from the title. You can edit it
manually, but it must use lowercase letters, numbers, and hyphens only.

After saving a new project, the admin redirects to the edit page so you can add
gallery images. Use `Save changes` to save edits, or `Save and view project` to
save and open the public project page.

### 7. Upload Images

Cover images are saved to `projects.cover_image_url`. Gallery images are saved
as rows in `project_images`.

The admin uploads files to:

```text
portfolio-images/projects/<project-slug>/<timestamp>-<safe-file-name>
```

Allowed upload formats:

- `image/jpeg`
- `image/png`
- `image/webp`

Current client-side upload limit: 8MB per file.

Recommended image guidance:

- Use JPG or WebP for renders.
- Use PNG or WebP for drawings when line clarity matters.
- Keep images around 1600-2400px wide.
- Optimize files for web before uploading.

Deleting an image record also tries to remove the file from
`portfolio-images` when the URL belongs to that bucket. Local fallback paths,
such as `/projects/kitchen-interior/cover.png`, are left alone.

### 8. Publish Or Hide Projects

In `/admin/projects`, use the publish toggle action:

- Published projects are visible on the public website.
- Unpublished projects are hidden from the public website but remain visible in
  admin.

The public website still queries only `is_published = true` projects.

### 9. Edit Portfolio Settings

Go to:

```text
/admin/settings
```

Settings are grouped into:

- Identity
- About
- Contact
- Lists

Skills, software, and approach are edited as newline lists. The admin shows a
small preview of the parsed list before saving.

### 10. Security Reminder

Do not place the Supabase service role key in `.env`, `.env.local`, or any
frontend code. The frontend must only use:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

RLS remains enabled. Public users can read published portfolio content and
public Storage files only. Admin write access requires both Supabase Auth login
and a matching row in `public.admin_users`.

## Routes

The homepage is served at:

```text
/
```

Project case-study pages use the project slug from Supabase, or the fallback id
from `src/data/portfolioData.ts`:

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

Fallback project content is managed in `src/data/portfolioData.ts`. Supabase
project content uses the `projects.cover_image_url` field and, later, rows in
`project_images` for additional render, drawing, concept, or process images.

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
