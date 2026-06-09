# Toshi Consulting — Publish Pipeline & Migration Plan

> **Status:** Plan LOCKED 2026-06-09. Not built yet. Phase 1 can start anytime (needs nothing from Kanav).
> Open this file whenever you want to see the full plan. Companion docs: `STATUS.md` (project resume state), `blog-posts/content-plan.md` (50-post strategy).

---

## Architecture (final)

```
        ┌─ AUTO:   n8n Schedule → Groq/NVIDIA generates a draft
n8n ────┤
(senti) └─ MANUAL: n8n Form (password-protected) → you fill title/body/etc.
            │
            ▼
   STRICT validation gate (validate-drafts logic) ── hard-fail → pings you, nothing ships
            │
            ▼
   Write .md → blog-posts/published/  →  LOCAL git commit + push   (NO PAT in n8n)
            │
            ▼
   Hostinger native GitHub OAuth: auto-pull → npm install → next build → restart
            │
            ▼
        LIVE on toshiconsulting.com   (~2–3 min, one git push)

Contact form ──► Next.js /api/contact route ──► Resend (emails you)   [+ optional n8n → Google Sheet]
```

---

## Decisions locked

| Item | Decision |
|---|---|
| Hosting | Hostinger Business — **native Node.js / Next.js SSR**, GitHub OAuth auto-deploy |
| Static export / GitHub Actions / FTP | **None** — not needed (Hostinger builds on push) |
| n8n → GitHub | **Local git on senti** (commit + push). **No GitHub PAT in n8n** (hard rule) |
| Publish modes | **Auto = primary** + **manual form = backup** — both built |
| Manual form | Password-protected; title / slug (auto) / category / author / meta / excerpt / keyword / icon / body (Markdown) / **3 optional Q&A slots** / publish-or-draft toggle |
| Validation | **Strict**, hard-fail, on both auto + manual posts |
| Approval gate | **None — full auto** (the strict gate is the only quality wall) |
| Visuals | Icon + brand logo + gradient. **No image upload, zero storage** |
| Contact form | **Resend** via Next.js `/api/contact` route (optional n8n → Sheet lead-log) |
| Redirects | `/blogs` → `/blog` 301s in **`next.config.ts`** (SSR — no `.htaccess`) |

---

## Phase 0 — Inputs (KANAV — can run in parallel)

- [ ] **Connect repo in hPanel:** Websites → Add Website → Node.js Apps → Import Git Repository → `Toshi-Consulting-Services/toshi-consulting` → deploy to a **staging subdomain** (e.g. `new.toshiconsulting.com`). OAuth — no credentials to hand over.
- [ ] **Rotate** the leaked Groq + NVIDIA API keys (auto branch needs them). Update `.env.local`.
- [ ] **Resend:** verify `toshiconsulting.com` domain (DNS records); get an API key — for Phase 3.
- [ ] *(Later, Phase 4)* GSC, Bing Webmaster, GA4 codes + claim Google Business Profile.

## Phase 1 — n8n publish workflow (CLAUDE — built FIRST, no Hostinger needed)

**Goal:** generate or hand-enter a post → it lands as valid markdown in GitHub.

1. **Manual Form Trigger** — password-protected; fields per the table above.
2. **Auto Schedule branch** — Groq/NVIDIA generation from briefs + brand-voice rules.
3. **Strict validation node** — frontmatter integrity, slug uniqueness, forbidden phrases, min word count, FAQ sanity → hard-fail + notify on reject.
4. **Commit step** — write `.md` to `blog-posts/published/`, then **local `git commit && git push`** via senti's git auth (no PAT).

**Verify:** submit a test post via the form → valid `.md` appears in GitHub → rebuild the existing `tcsdev` container → confirm it renders at `tcsdev.sentinal-ai.in/blog`. Full loop proven before Hostinger exists.

## Phase 2 — Hostinger staging deploy (KANAV connects, CLAUDE verifies)

**Goal:** a git push auto-builds + deploys to the staging subdomain.

1. Kanav finishes the Phase-0 hPanel connect to the staging subdomain.
2. Claude sets `NEXT_PUBLIC_SITE_URL` (staging) in hPanel env; confirms the **first build succeeds** (watch shared-tier memory/CPU limits on the Next 16 build).
3. Push an n8n-generated post → confirm it **auto-deploys and renders live** on staging in ~2–3 min, no manual step.

**Fallback (in pocket):** if the Hostinger build OOMs, build on senti and deploy the prebuilt output.

## Phase 3 — Contact form (CLAUDE)

**Goal:** form submissions actually reach Kanav. *(Right now the `/contact` form has NO handler — submissions are silently lost.)*

1. Kanav provides the **Resend API key** (after domain verify).
2. Claude adds `/api/contact` → validate inputs → **Resend emails Kanav** → success/error UX on the form.
3. *(Optional)* fire an n8n webhook from the route → log the lead to a **Google Sheet**.

**Verify:** submit form → email arrives (+ Sheet row if enabled).

## Phase 4 — SEO finish + production cutover (CLAUDE, on Kanav's go)

**Goal:** go live on the real domain, indexed, **zero traffic loss**.

1. Build the **301 map** old→new in `next.config.ts` — all 7 `/blogs/...` → matching `/blog/...`; top pages map 1:1; "Get Quote" → contact route.
2. Flip `NEXT_PUBLIC_SITE_URL` → `https://toshiconsulting.com`, **remove noindex**.
3. Point the apex domain at the Node app (keep old host alive ~24–48h, preserve MX/email).
4. Drop in **GSC / Bing / GA4** codes, submit sitemap, **IndexNow / GSC crawl-notify**.
5. **Trickle-publish** the 51 posts (aged domain = low velocity risk, but still spread 2–3/day + internal links).
6. **DPDP consent banner** (gates GA4 data collection).
7. **Turn the auto-scheduler ON** for ongoing content.

## Phase 5 — Ongoing (CLAUDE)

Auto-scheduler runs (e.g. 3/week) + SEO polish backlog: Core Web Vitals, internal-link suggester, topic clusters, `dateModified` badges. Then the **Claude-Designs redesign** as a **same-URL** visual update (no second migration).

---

## Critical-path order

**Phase 1 (n8n) → Phase 2 (Hostinger staging) → Phase 3 (contact) → Phase 4 (cutover) → Phase 5 (ongoing).**
Phase 1 needs nothing from Kanav to start.

## Open blockers from Kanav

1. Rotate Groq + NVIDIA keys (auto branch).
2. Connect Hostinger staging subdomain (Phase 0).
3. Resend API key + `toshiconsulting.com` domain verify (Phase 3).

*Phase 1's manual-form path can begin with none of these.*

## Risks / notes

- **Full-auto means the strict validation gate is the only quality wall** — keep it strict.
- **SSR on Business shared tier** may hit memory/CPU ceilings on `next build` — validate on staging first; senti-prebuilt fallback ready.
- **Don't dump all 51 at once** — stagger to avoid velocity flags (lower risk on the aged domain, but still).
- **Migration catch:** old `/blogs` URLs MUST 301 to new `/blog` or rankings/backlinks are lost.
- **Staging noindex guard — HARDENED 2026-06-09 ✅:** `robots.ts` + `layout.tsx` now treat a host as production only if it is *exactly* `toshiconsulting.com` / `www.toshiconsulting.com` (was a loose substring match that would have let `new.toshiconsulting.com` get indexed). So the staging subdomain auto-serves `Disallow: /` + `noindex` and won't load GA. **Backstop:** still password-protect the staging subdomain in hPanel. Verified via build + logic test; not yet committed/deployed.

---

*Last updated 2026-06-09. This plan is mirrored in Claude's session memory.*
