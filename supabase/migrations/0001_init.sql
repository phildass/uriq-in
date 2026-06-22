create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now(),
  subscription_status text not null default 'free' check (subscription_status in ('free', 'premium')),
  subscription_expires_at timestamptz
);

create table if not exists questions_pool (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('Spatial', 'Quantitative', 'Verbal', 'Logic')),
  difficulty text not null check (difficulty in ('Baseline', 'Mensa')),
  question_data jsonb not null,
  options jsonb not null,
  correct_option text not null,
  explanation text not null,
  average_solve_time_seconds integer not null default 45,
  created_at timestamptz not null default now()
);

create table if not exists user_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  question_id uuid not null references questions_pool(id) on delete cascade,
  is_correct boolean not null,
  time_taken_ms integer not null,
  attempted_at timestamptz not null default now()
);

create table if not exists daily_anecdotes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content_body text not null,
  category text not null check (category in ('History', 'Neuroscience', 'Interview Trick')),
  published_date date not null default current_date
);
