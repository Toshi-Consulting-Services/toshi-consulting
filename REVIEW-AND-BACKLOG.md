# Toshi Consulting — Review & Work Backlog

> **Resume point for the next session.** Last full review: **2026-06-12**.
> Read this file first (alongside `STATUS.md`) to know what's done and what's left.

---

## Where we are (2026-06-12)

- Site: Next.js 16.2.6 (App Router, Turbopack, `output: standalone`), React 19, TS strict, Tailwind v4.
- Deployed (Docker behind Caddy) at **staging** `tcsdev.sentinal-ai.in`. Cutover to `toshiconsulting.com` **parked**.
- Code quality verdict from full multi-agent review: **8/10** — idiomatic, strict-typed, clean data flow. Remaining work is automation-safety + security hardening + launch hygiene, **not** feature rewrites.

### Done this session (2026-06-12)
- **Icon overhaul:** migrated service/feature cards + sections to **Phosphor duotone** (via `@phosphor-icons/react/dist/ssr`). Files: `services.ts`, `ServicesSection`, `WhyChooseUsSection`, `ProcessSection`, `MetricsSection`, `about/page`, `services/page`, `services/[slug]/page`, `Navbar`.
- **Color overhaul:** replaced clashing rainbow gradients with a **cohesive cool ramp (teal→indigo) + muted terracotta/gold**. No alarm-red hues. (QA amber→slate-teal, Marketing rose→terracotta.)
- **Imagery:** added `public/images/` — 2 Unsplash team photos (`about-team.jpg`, `about-collab.jpg`) wired into a new **"Our Story"** band on the About page + hand-authored brand mesh `mesh-teal.svg` behind the Core Values section.
- **Hydration fix:** `suppressHydrationWarning` on `<body>` in `app/layout.tsx` (browser-extension `cz-shortcut-listen` mismatch — not a real bug).

### IMPORTANT corrections to prior assumptions
- **n8n blog automation IS built** (the repo's `PUBLISH-PLAN.md` "not built yet" is stale). Live workflows in n8n SQLite (`/opt/n8n/n8n_data/database.sqlite`), **NOT committed anywhere**:
  - `Toshi Blog - News-Grounded Poster` — **ACTIVE**
  - `Toshi Blog - AI Auto-Poster (autonomous)` — off
  - `Toshi Blog - Manual Publish Form` — **ACTIVE**
  - `Toshi Contact Form → Resend` — ACTIVE
- **No Anthropic/Claude in runtime.** LLMs used: **Groq** (request-path chat) + **NVIDIA NIM** (offline blog scripts). Both OpenAI-compatible.
- Only **8 posts published** (in `blog-posts/published/`); ~50 drafts in `blog-posts/drafts/`. Docs claiming "51 posts" are stale.

### KANAV'S EXPLICIT REQUIREMENTS (do not drop)
1. The n8n blog pipeline must **verify facts** with real grounding (web/sources), not no-web plausibility.
2. There must be a **mandatory pre-publish review/approval node** — nothing auto-publishes to the live domain unchecked.

---

## How the blog automation works (today)

```
Trigger (n8n Schedule  OR  Manual Publish Form)
  → Generate draft (Groq llama-4-scout / NVIDIA llama-3.3-70b)   [scripts/generate-drafts.mjs]
  → Structural validation (deterministic SEO/brand-voice score)  [scripts/validate-drafts.mjs]  ← NO fact-check
  → (currently) human moves .md into blog-posts/published/
  → git push → Hostinger GitHub-OAuth auto-build → live
```
**Gaps vs requirements:** no grounded fact-verification (review-posts.mjs runs with NO web access = plausibility only), and no review/approval gate before publish.

**Target shape:**
```
Generate → Structural validation → FACT-CHECK (grounded, cited) → REVIEW GATE (approve/reject/edit) → commit/push → deploy
```

---

## Backlog (Pri: 🔴 Critical 🟠 High 🟡 Medium 🟢 Low | Effort: S<½d M 1-2d L 3d+)

| # | Area | Item | Pri | Eff |
|---|---|---|---|---|
| **n8n / Blog automation** |
| 1 | n8n | Add **grounded fact-verification node** (web/source-backed) — *requirement* | 🟠 | M |
| 2 | n8n | Add **mandatory pre-publish review/approval gate** — *requirement* | 🟠 | M |
| 3 | n8n | **Export workflows into repo** (`n8n/*.json`) — currently only in SQLite | 🟠 | S |
| 4 | n8n | Fix **`draft:true` not hiding posts** in Next app (cutover indexing risk) | 🟠 | S |
| 5 | n8n | **Sanitize markdown→HTML** (DOMPurify/rehype) — XSS path if auto-poster ships | 🟡 | S |
| 6 | n8n | Harden NVIDIA **YAML frontmatter corruption** (trailing-space `---`, `: ` in values) | 🟡 | S |
| 7 | n8n | Decide **autonomous vs manual**; publish reviewed backlog (8 of 51 live) | 🟡 | — |
| **Chatbot (/api/chat + QuoteBot)** |
| 8 | Chatbot | **Rate-limit** chat endpoint (2 Groq calls/req, unauth = cost/DoS) | 🟠 | M |
| 9 | Chatbot | `GROQ_API_KEY` **not wired in docker-compose** → chat 503s | 🟠 | S |
| 10 | Chatbot | Guard **prompt-injection of `capture_lead`** (lead spam) | 🟡 | S |
| **Security** |
| 11 | Security | **Rotate Groq + NVIDIA keys** + scrub prefixes from `STATUS.md` | 🔴 | S |
| 12 | Security | Add **`.dockerignore`** — `.env.local` baked into image layer | 🟠 | S |
| 13 | Security | **Resend test-mode** `from`/`to` → verify domain (leads may not deliver) | 🟠 | S |
| 14 | Security | Run container as **non-root** (`USER node`) | 🟡 | S |
| 15 | Security | **Security headers / CSP** (next.config or confirm Caddy) | 🟡 | S |
| **Testing** |
| 16 | Testing | **Any tests** — stream parser, blog lib, validation, QuoteBot (zero today) | 🟠 | L |
| 17 | Testing | **CI** (GitHub Actions: lint + typecheck + build) | 🟡 | S |
| 18 | Testing | **Cross-browser/device manual QA** pass | 🟡 | M |
| **Website design / device** |
| 19 | Design | **Replace hero/navbar emoji glyphs** (☁🛡⚡✦◍✆✉) with Phosphor — cross-device consistency | 🟡 | S |
| 20 | Design | **Replace placeholder testimonials** (2 of 3 fake "Company") | 🟠 | S |
| 21 | Design | (DONE if committed) icon/color/imagery work | 🟠 | S |
| 22 | Design | Drop dead deps (`three`/r3f unused), consolidate dual icon libs | 🟢 | S |
| **SEO** |
| 23 | SEO | **Missing `/authors` index** → breadcrumb 404 (invalid schema) | 🟠 | S |
| 24 | SEO | **Default OG image** for home/services/about/contact | 🟡 | S |
| 25 | SEO | **Trim 7 over-length meta descriptions** (181–190 → ≤158) | 🟡 | S |
| 26 | SEO | **About JSON-LD** + blog index/category CollectionPage+Breadcrumb schema | 🟡 | M |
| 27 | SEO | `dateModified`, author pages in sitemap, `en-IN` locale, `priceRange` fix | 🟢 | S |
| **Cutover / ops** |
| 28 | Ops | Pre-cutover: delete static **`public_html/robots.txt`** on Hostinger; set `NEXT_PUBLIC_SITE_URL`; purge CDN | 🟠 | S |
| 29 | Ops | README still create-next-app boilerplate; hardcode contact/webhook → constants/env | 🟢 | S |

### Launch blockers (before toshiconsulting.com goes live)
#11 keys · #12 .dockerignore · #13 Resend domain · #4 draft hiding · #20 testimonials · #23 authors 404 · #28 cutover · #9 chat env → **~2–3 focused days (mostly Small).**

### Rough totals
- Blockers: **2–3 days** · Kanav's n8n fact-check+review gate (#1,#2): **~1 week** · Hardening+tests+SEO: **1–2 weeks** · Polish: **~1 day**. **Total ~3–4 weeks** to hardened launch.

---

## Device compatibility (snapshot)
Responsive ✅ (Tailwind breakpoints, fluid `clamp()` type, `next/image` srcset, Phosphor SVG icons, mobile nav). **Caveat:** hero/navbar **emoji glyphs render differently per OS** (#19) — main cross-device inconsistency. `backdrop-blur` degrades gracefully on old browsers. No automated cross-browser testing exists yet (#18).
