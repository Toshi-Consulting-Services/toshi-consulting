# Toshi Consulting — Project Status (Paused 2026-05-20)

> 📌 **On project reopen:** new Claude Code sessions should read this file first and surface the pending items below before doing anything else.

## What state we're in

- **Site:** `tcsdev.sentinal-ai.in` (staging, noindexed). Will go to `toshiconsulting.com` on production launch.
- **Container:** `toshi-consulting` running on this VPS, behind Caddy on port 3000.
- **Phase 1 (infra + agents):** ✅ Done
- **Phase 2 (50 topic briefs):** ✅ All 50 validated, saved to `blog-posts/briefs/`
- **Phase 3 (drafts):** ✅ All 50 drafts written + 1 original = 51 in `blog-posts/published/`
- **Phase 3b (SEO upgrades):** ✅ Author system, LocalBusiness/FAQ/Service schemas, GA4/GSC/Bing env hooks, llms.txt, real favicon + logo + social handles all live
- **Status: PAUSED awaiting Kanav's review + external service setup.**

## ⏸ Awaiting Kanav (only you can do these)

### Read the 51 posts on tcsdev and verdict each
Visit `https://tcsdev.sentinal-ai.in/blog` and for each post decide:
- ✅ Keep as-is
- 🔧 Polish (small fixes — title, meta, intro)
- 🔄 Rewrite (regenerate via NVIDIA)
- ❌ Kill

Bring back the list of verdicts and Claude executes Phase C (targeted polish).

### Set up these 5 free external services
1. **Google Search Console** → [search.google.com/search-console](https://search.google.com/search-console) — add `https://toshiconsulting.com` as URL prefix → use HTML tag method → copy the `content="..."` value
2. **Bing Webmaster Tools** → [bing.com/webmasters](https://www.bing.com/webmasters) — same flow, copy the `msvalidate.01` value
3. **Google Analytics 4** → [analytics.google.com](https://analytics.google.com) — create property for `toshiconsulting.com` → copy the `G-XXXXXXXXXX` Measurement ID
4. **Ahrefs Webmaster Tools (FREE)** → [ahrefs.com/webmaster-tools](https://ahrefs.com/webmaster-tools) — verify domain → unlocks backlink + ranking data on your site
5. **Google Business Profile** → finish claiming the listing at `share.google/crSjVbZQu4RkGaB8W` — add photos, hours, description

### Then paste back here:
```
GOOGLE_SITE_VERIFICATION=<code from GSC>
BING_SITE_VERIFICATION=<code from Bing>
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
Claude drops them into `docker-compose.yml` env + rebuilds → GA4/GSC/Bing go live.

## 🔐 Security — rotate before sharing this chat

Two API keys are in chat logs and should be rotated:
- **Groq key** at [console.groq.com/keys](https://console.groq.com/keys) — current key starts with `gsk_6QC8PT...`
- **NVIDIA NIM key** at [build.nvidia.com](https://build.nvidia.com/) — current key starts with `nvapi-DfH7n...`

Both are stored in `.env.local` (gitignored). Replace them when you rotate.

## 🚀 Production go-live checklist (when ready)

Run this once you've finished reviews + collected the verification codes:

1. Edit `docker-compose.yml`:
   - `NEXT_PUBLIC_SITE_URL=https://toshiconsulting.com` (both in `build.args` and `environment`)
   - Add `GOOGLE_SITE_VERIFICATION=...`, `BING_SITE_VERIFICATION=...`, `NEXT_PUBLIC_GA_ID=...`
2. Deploy to the real `toshiconsulting.com` server (whatever infrastructure that lives on)
3. `sudo docker compose up -d --build`
4. Verify `<meta name="robots" content="index,follow">` is on the live site (no more noindex)
5. Submit `sitemap.xml` to GSC + Bing
6. **Do NOT publish all 51 at once.** Set `draft: true` in frontmatter of 45 of them → release 2–3/day for 21 days → trickle into the index without tripping Google's velocity flags
7. Set up consent banner for DPDP compliance (GA4 is currently configured with `consent default: denied` — won't collect data until banner flips it to granted)

## 📋 Saved SEO recommendations menu (from Tier 1/2/3 list)

These are the optional improvements Claude can build whenever you say go. Most need no input from you:

| ID | Improvement | Effort | Needs input? |
|---|---|---|---|
| A | LocalBusiness + FAQPage + Service schema | ✅ DONE | — |
| B | Author bio + Person schema | ✅ DONE | — |
| C | `llms.txt` for AI search | ✅ DONE | — |
| D | `dateModified` + "Last updated" badge on posts | ~20 min | No |
| E | Internal-link auto-suggester (scan all 51, add 2 contextual links each) | ~1 hr | No |
| F | Core Web Vitals audit + fix top 3 issues (LCP, CLS, INP) | ~1–2 hr | No |
| G | BreadcrumbList on About + Services + Contact | ✅ DONE | — |
| H | HowTo schema on tutorial-style posts | ~45 min | No |
| I | GSC + Bing + GA4 verification meta tags | ✅ DONE (env-driven) | Codes from you |
| J | DPDP-compliant consent banner | ~1 hr | No (but needed before GA4 collects real data) |
| K | Real photos for team members (replaces initials avatars) | ~30 min | Headshots from you |
| L | Topic-cluster hub pages (`/topics/ai-integration/` etc.) | ~2 hr | No |
| M | Comparison / "vs" structured tables on relevant posts | ~1 hr | No |
| N | Glossary section with `DefinedTerm` schema | ~2 hr | No |

## 📁 Where things live in the repo

```
blog-posts/
  briefs/           # 50 topic-validation briefs (Phase 2 output)
  drafts/           # 50 generated drafts (Phase 3 — superseded by published/)
  published/        # 51 LIVE posts the website reads from
  audits/           # 50 deterministic SEO audit scores
  content-plan.md   # The locked 50-post strategy
  phase-2-report.md # Topic validation report

scripts/
  generate-drafts.mjs   # Groq/NVIDIA writer pipeline (resumable, tier-aware)
  validate-drafts.mjs   # Deterministic SEO/voice scorer (no LLM)

app/
  authors/[slug]/page.tsx   # Author bio pages with Person schema
  authors/data.ts           # Kanav Chauhan + Toshi Trivedi profiles
  blog/lib.ts               # Markdown loader (gray-matter + marked)
  blog/[slug]/page.tsx      # Blog post page with Article+FAQ+Breadcrumb schema
  layout.tsx                # Org+WebSite schema, GA4, GSC/Bing verification, robots

public/
  logo.png          # Real Toshi Consulting brand logo (596x246)

.claude/agents/     # 3 subagent definitions (topic-strategist, blog-writer, seo-auditor)

.env.local          # API keys (gitignored) — Groq + NVIDIA
docker-compose.yml  # Container config — flip NEXT_PUBLIC_SITE_URL here when going prod
```

## ⚠️ Known footguns (do not repeat)

- **Tailwind v4** silently breaks `grid-cols-[280px,1fr]` (comma syntax). Use underscores: `grid-cols-[280px_1fr]`.
- **YAML frontmatter** breaks if a line contains `: ` mid-value (NVIDIA outputs sometimes do this). Strip in post-processing.
- **NVIDIA's llama-3.3-70b** sometimes emits `--- ` (trailing space) for frontmatter delimiter. Strip with `sed 's/^--- *$/---/'`.
- **Groq llama-4-scout** has tight TPM limits — the script handles this with 8s throttle + 65s 429 backoff.

## 🧠 Brand voice rules (for any future writing pass)

- First-person plural "we" / "we've seen" / "our team has built". Never third-person.
- Indian-business context where natural: ₹, RBI, DPDP, FIU-IND, NASSCOM, Panchkula, GST.
- **Forbidden phrases:** "leverage" (verb), "synergy", "game-changing", "unlock the power of", "in conclusion", "in today's fast-paced world", "revolutionary", "in this comprehensive guide", "let's dive in", "as a language model".

---

**To resume:** open the project, tell Claude "show me status" or just say what you want to do next. Claude will read this file first.
