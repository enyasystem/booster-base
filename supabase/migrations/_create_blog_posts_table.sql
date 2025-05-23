-- migrate:up
create table blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  images text[] not null default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  author_id uuid references auth.users(id) not null
);

-- Enable RLS
alter table blog_posts enable row level security;

-- Create policies
create policy "Anyone can view blog posts"
  on blog_posts for select
  using (true);

create policy "Only authenticated admins can insert blog posts"
  on blog_posts for insert
  with check (auth.uid() = author_id);

create policy "Only authenticated admins can update their own blog posts"
  on blog_posts for update
  using (auth.uid() = author_id);

create policy "Only authenticated admins can delete their own blog posts"
  on blog_posts for delete
  using (auth.uid() = author_id);

-- migrate:down
drop policy "Anyone can view blog posts" on blog_posts;
drop policy "Only authenticated admins can insert blog posts" on blog_posts;
drop policy "Only authenticated admins can update their own blog posts" on blog_posts;
drop policy "Only authenticated admins can delete their own blog posts" on blog_posts;
drop table blog_posts;
