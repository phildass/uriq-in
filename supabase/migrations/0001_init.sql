-- uriq.in initial schema
-- Run via Supabase CLI or SQL editor

create type subscription_status as enum ('free', 'premium');
create type question_category as enum ('Spatial', 'Quantitative', 'Verbal', 'Logic');
create type question_difficulty as enum ('Baseline', 'Mensa');
create type anecdote_category as enum ('History', 'Neuroscience', 'Interview Trick');
create type badge_tier as enum ('bronze', 'silver', 'gold');

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now(),
  subscription_status subscription_status default 'free',
  subscription_expires_at timestamptz,
  preferred_language text default 'en',
  streak_days int default 0,
  last_pass_date date
);

create table if not exists questions_pool (
  id uuid primary key default gen_random_uuid(),
  category question_category not null,
  difficulty question_difficulty not null,
  question_data jsonb not null,
  options jsonb not null,
  correct_option int not null,
  explanation text,
  average_solve_time_seconds int default 30,
  created_at timestamptz default now()
);

create table if not exists user_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  question_id uuid references questions_pool(id) on delete cascade,
  is_correct boolean not null,
  time_taken_ms int not null,
  attempted_at timestamptz default now()
);

create table if not exists daily_anecdotes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content_body text not null,
  category anecdote_category not null,
  published_date date not null default current_date
);

create table if not exists user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  badge_id text not null,
  tier badge_tier not null default 'bronze',
  earned_at timestamptz default now(),
  unique(user_id, badge_id)
);

create index idx_user_responses_user on user_responses(user_id);
create index idx_questions_pool_category on questions_pool(category, difficulty);
create index idx_daily_anecdotes_date on daily_anecdotes(published_date desc);
