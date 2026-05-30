# AGENTS.md

Guidance for AI agents working in this repository.

## Cursor Cloud specific instructions

### Product overview

**uriq.in** is a single Next.js 16 app (App Router, React, TypeScript, Tailwind). There is no monorepo, no Docker Compose, and no separate backend service in this repo. Optional hosted **Supabase** provides auth and PostgreSQL when configured.

### Services

| Service | Required? | Notes |
|---------|-----------|-------|
| Next.js dev server (`npm run dev`) | **Yes** | Sole in-repo service; port **3075** |
| Supabase (cloud) | **No** for guest/demo | Required only for auth, DB-backed questions, and profiles |

Guest/demo mode works without Supabase: the app falls back to mock data when `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are unset.

### Commands

See `package.json` scripts:

| Task | Command |
|------|---------|
| Install | `npm ci` |
| Dev server | `npm run dev` → http://localhost:3075 |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Production build | `npm run build` |
| Production run | `npm start` (port 3000) |

There is **no test suite** (`npm test` is not defined).

### Environment variables

Copy `uriq.env.example` → `uriq.env` only when testing Supabase-backed flows. Keys are loaded by `next.config.js` at startup. For guest quick-quiz and dashboard demos, **no env file is needed**.

### Dev server startup

Start in a tmux session so it stays running:

```bash
npm run dev
```

The dev server binds to port **3075** (not 3000).

### Lint caveats

`npm run lint` may report pre-existing issues (e.g. `react/no-unescaped-entities`, `react-hooks/set-state-in-effect`). These do not block build or dev.

### Hello-world verification

Without Supabase, verify the environment with the guest flow:

1. `curl http://localhost:3075/api/quiz/quick` — should return `{ "questions": [...], "source": "mock" }`
2. Open http://localhost:3075/quiz/quick — complete the 5-question quick IQ test
3. Open http://localhost:3075/dashboard — guest score and IQ estimate from localStorage

### Production / PM2

`./pm2-start.sh` runs `npm ci`, `npm run build`, and starts via PM2 on port 3000. PM2 is optional for local development.
