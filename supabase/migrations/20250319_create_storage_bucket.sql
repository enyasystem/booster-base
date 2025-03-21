-- Enable the storage extension
create extension if not exists "storage" schema "extensions";

-- Create the blog-images bucket
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Set up storage policies
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'blog-images' );

create policy "Authenticated Users Can Upload"
  on storage.objects for insert
  with check (
    bucket_id = 'blog-images'
    and auth.role() = 'authenticated'
  );

create policy "Owners Can Update"
  on storage.objects for update
  using ( auth.uid() = owner );

create policy "Owners Can Delete"
  on storage.objects for delete
  using ( auth.uid() = owner );
