create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "Admin users can read own admin row" on public.admin_users;
create policy "Admin users can read own admin row"
  on public.admin_users
  for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "Admins can manage admin users" on public.admin_users;
create policy "Admins can manage admin users"
  on public.admin_users
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can manage portfolio settings" on public.portfolio_settings;
create policy "Admins can manage portfolio settings"
  on public.portfolio_settings
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can manage projects" on public.projects;
create policy "Admins can manage projects"
  on public.projects
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can manage project images" on public.project_images;
create policy "Admins can manage project images"
  on public.project_images
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Optional: create/update the bucket from SQL Editor. You can also create it
-- manually in Storage with the same name and public read enabled.
insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read portfolio images" on storage.objects;
create policy "Public can read portfolio images"
  on storage.objects
  for select
  to public
  using (bucket_id = 'portfolio-images');

drop policy if exists "Admins can upload portfolio images" on storage.objects;
create policy "Admins can upload portfolio images"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'portfolio-images'
    and public.is_admin()
  );

drop policy if exists "Admins can update portfolio images" on storage.objects;
create policy "Admins can update portfolio images"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'portfolio-images'
    and public.is_admin()
  )
  with check (
    bucket_id = 'portfolio-images'
    and public.is_admin()
  );

drop policy if exists "Admins can delete portfolio images" on storage.objects;
create policy "Admins can delete portfolio images"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'portfolio-images'
    and public.is_admin()
  );

-- After creating a Supabase Auth user, paste that user's UID here and run it
-- in SQL Editor to grant admin access:
--
-- insert into public.admin_users (user_id, email)
-- values ('PASTE_AUTH_USER_UID_HERE', 'admin@example.com')
-- on conflict (user_id) do update set email = excluded.email;
