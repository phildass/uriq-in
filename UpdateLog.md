# uriq.in — Update Log

> **uriq** = **Your IQ** — A gamified IQ & exam-prep platform for Indian aspirants (ages 13–60).

This file tracks product and engineering progress. Update after each meaningful milestone.

---

## 2026-06-22 — Hostinger Business (Node.js) deployment

### How ports work on Business hosting
- **Local machine:** uriq.in dev runs on **3075** (`npm run dev`) so aienter.in can use **3000**.
- **Hostinger Business:** Each Node.js website is a **separate app**. Hostinger assigns `PORT` internally and proxies `https://uriq.in` for you. **No port conflict** with aienter.in in production.
- **Production start:** `npm start` → `next start` (reads Hostinger’s `PORT` env var automatically).

### hPanel setup for uriq.in
1. **Websites → Add Website → Node.js Web App**
2. Connect GitHub repo (or upload zip)
3. Domain: **uriq.in**
4. **Build command:** `npm run build`
5. **Start command:** `npm start`
6. **Node.js version:** 20 or 22
7. **Environment variables** (hPanel → Node.js app → Environment):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GOOGLE_TRANSLATE_API_KEY`
   - `NEXT_PUBLIC_LOGO_URL` (GitHub raw logo URL when ready)
8. Click **Deploy**

### Do NOT set PORT=3075 on Hostinger
Let the platform assign the port. Visitors always use `https://uriq.in` (443), never `:3075`.

---

## 2026-06-22 — Production Port (Hostinger / uriq.in)

### Changed
- Production uses `next start` (Hostinger `PORT` env) — not hardcoded 3075
- Local dev remains `next dev -p 3075`

---

## 2026-06-22 — Dev Port

### Changed
- Dev server port set to **3075** (`npm run dev` → `http://localhost:3075`) to avoid conflict with aienter.in on 3000

---

## 2026-06-22 — Foundation & Product Vision

### Brand & Audience
- App name: **uriq.in** — **Your IQ** (highlighted in UI)
- Target: Indian aspirants aged **13–60**, primarily young learners improving intelligence and competitive exam readiness (UPSC, Banking, Corporate aptitude)
- Tone: Minimal, scholarly, mobile-first — addictive through badges, streaks, and challenges (not loud gaming UI)
- Logo: Placeholder in repo; production logo to be added on GitHub — set `NEXT_PUBLIC_LOGO_URL` to the raw GitHub asset URL when ready

### Game Rules (Baked In)
- **Pass threshold:** ≥ 50% on a completed test
- **Free tier:** 12 unique badge types, 4 playable tests (baseline + 3 category modules)
- **Premium tier:** 34 total unique badge types (12 free + 22 premium-only)
- Repeat passes upgrade badge tier: Bronze → Silver → Gold

### Features Implemented
- [x] Mobile-first layout (`max-w-md` shell)
- [x] Landing page with **Your IQ** branding and primary CTA
- [x] Baseline + category quiz modules (Logic, Patterns, Verbal)
- [x] Badge system with pass/fail at 50%, badge wall, tier progression
- [x] Indian language picker (22 scheduled languages + English)
- [x] Google Cloud Translation API route (placeholder — requires `GOOGLE_TRANSLATE_API_KEY`)
- [x] Dashboard with blurred partial results + paywall hook
- [x] Paywall screen: ₹99/year + 18% GST = ₹116.82 (UPI placeholder)
- [x] Supabase schema migration (users, questions_pool, user_responses, daily_anecdotes, user_badges)
- [x] AI question ingestion script skeleton
- [x] Benchmark percentile utilities for social micro-banners

### Pending / Next Up
- [ ] Connect Supabase auth (email/OAuth)
- [ ] Wire Razorpay/PhonePe UPI payment flow
- [ ] Replace sample questions with AI-ingested `questions_pool`
- [ ] Add GitHub logo URL to env once uploaded
- [ ] Enable Google Translate API key in production
- [ ] Premium modules: Mensa difficulty + Exam Boss tracks
- [ ] Intel Intel daily anecdote feed
- [ ] Live LLM round summary (GPT-4o-mini / Claude)
- [ ] Leaderboard with real-time Supabase aggregation

### Badge Catalog Summary

| Tier | Unique Badges | Playable Tests |
|------|---------------|----------------|
| Free | 12 | 4 |
| Premium | 34 (incl. free) | 22+ |

---

## How to Use This Log

Add a dated section for each release or sprint:

```md
## YYYY-MM-DD — Short Title
### Shipped
- item

### Fixed
- item

### Next
- item
```
