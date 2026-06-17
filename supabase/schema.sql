create extension if not exists pgcrypto;

create table if not exists public.portfolio_settings (
  id uuid primary key default gen_random_uuid(),
  owner_name text,
  role_title text,
  hero_title text,
  hero_subtitle text,
  about_title text,
  about_intro text,
  about_body text,
  location text,
  contact_email text,
  contact_phone text,
  behance_url text,
  linkedin_url text,
  instagram_url text,
  skills jsonb default '[]'::jsonb,
  software jsonb default '[]'::jsonb,
  approach jsonb default '[]'::jsonb,
  updated_at timestamptz default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  project_number text,
  type text,
  year text,
  location text,
  role text,
  description text,
  concept_statement text,
  concept_keywords jsonb default '[]'::jsonb,
  design_process_steps jsonb default '[]'::jsonb,
  credits text,
  notes text,
  cover_image_url text,
  cover_image_alt text,
  cover_image_caption text,
  cover_orientation text default 'landscape' check (cover_orientation in ('landscape', 'portrait')),
  sort_order integer default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  image_url text not null,
  alt text,
  caption text,
  category text not null check (category in ('render', 'drawing', 'concept', 'process')),
  orientation text default 'landscape' check (orientation in ('landscape', 'portrait', 'square')),
  sort_order integer default 0,
  created_at timestamptz default now()
);

alter table public.portfolio_settings enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;

drop policy if exists "Public can read portfolio settings" on public.portfolio_settings;
create policy "Public can read portfolio settings"
  on public.portfolio_settings
  for select
  using (true);

drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects"
  on public.projects
  for select
  using (is_published = true);

drop policy if exists "Public can read images for published projects" on public.project_images;
create policy "Public can read images for published projects"
  on public.project_images
  for select
  using (
    exists (
      select 1
      from public.projects
      where projects.id = project_images.project_id
        and projects.is_published = true
    )
  );

create index if not exists projects_published_sort_idx
  on public.projects (is_published, sort_order, created_at);

create index if not exists project_images_project_sort_idx
  on public.project_images (project_id, sort_order);
