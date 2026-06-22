-- Badge wall + language preferences (uriq gamification layer)

alter table if exists users
  add column if not exists preferred_language text default 'en',
  add column if not exists streak_days int default 0,
  add column if not exists last_pass_date date;

create table if not exists user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  badge_id text not null,
  tier text not null default 'bronze' check (tier in ('bronze', 'silver', 'gold')),
  earned_at timestamptz not null default now(),
  unique(user_id, badge_id)
);

create index if not exists idx_user_badges_user on user_badges(user_id);
