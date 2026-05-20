#!/usr/bin/env node
/**
 * Generate blog drafts using Groq + NVIDIA NIM.
 *
 *   node scripts/generate-drafts.mjs --samples   # 3 test drafts (1 conversion + 2 cluster)
 *   node scripts/generate-drafts.mjs             # full run (resumes — skips existing drafts)
 *   node scripts/generate-drafts.mjs --slug=foo  # one slug
 *   node scripts/generate-drafts.mjs --force     # overwrite existing drafts
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

// ---------- env loader ----------
async function loadEnv() {
  try {
    const raw = await fs.readFile('.env.local', 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m) process.env[m[1]] = m[2];
    }
  } catch {}
}
await loadEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BRIEFS_DIR = path.join(ROOT, 'blog-posts/briefs');
const DRAFTS_DIR = path.join(ROOT, 'blog-posts/drafts');
const TONE_REF = path.join(ROOT, 'blog-posts/published/cybersecurity-best-practices.md');

// ---------- tier classification ----------
const PILLAR_SLUGS = new Set([
  'ai-integration-enterprises-2026-guide',
  'blockchain-consulting-2026-guide',
  'qa-test-automation-2026-guide',
  'b2b-digital-marketing-india',
]);

const CONVERSION_SLUGS = new Set([
  'hire-ai-consultant-india',
  'ai-integration-cost-sme-india',
  'smart-contract-audit-cost',
  'hire-blockchain-consultant-india',
  'outsource-qa-vs-in-house',
  'qa-team-cost-india',
  'qa-automation-services-india',
  'digital-marketing-agency-india',
  'it-consulting-panchkula',
  'it-consulting-cost-india',
  'outsource-vs-in-house-tech',
]);

// Slugs that initially failed via Groq — force-route through NVIDIA for the rescue pass.
const NVIDIA_RESCUE_SLUGS = new Set([
  'integrate-chatgpt-business-workflow',
  'blockchain-mvp-development',
  'performance-marketing-budget',
  'scaling-qa-team',
  'choose-blockchain-platform',
  'it-consulting-case-study-india',
  'b2b-lead-generation-funnel',
]);

// ---------- slug → icon/tone mapping ----------
const CATEGORY_DEFAULTS = {
  AI:           { iconName: 'brain',     tone: 'from-teal-500 to-cyan-500' },
  Blockchain:   { iconName: 'chain',     tone: 'from-cyan-500 to-teal-500' },
  QA:           { iconName: 'rocket',    tone: 'from-emerald-500 to-teal-500' },
  'Digital Media': { iconName: 'megaphone', tone: 'from-teal-600 to-cyan-600' },
  'Cross-pillar':  { iconName: 'shield',    tone: 'from-teal-600 to-cyan-600' },
};

// ---------- system prompt (shared) ----------
const SYSTEM_PROMPT = `You are a senior blog writer for Toshi Consulting, an IT consulting firm based in Panchkula, Haryana, India.

WHAT TOSHI DOES: AI Integration, Blockchain Consulting, QA Testing & Automations, Digital Media Marketing & Branding.

VOICE (non-negotiable):
- First-person plural: "we", "we've seen", "our team has built". NEVER third-person.
- Mixed audience — business owners, startup CTOs, engineers, non-tech founders. Lead with business outcome, back it up with technical specifics.
- Confident, practical, honest. Acknowledge tradeoffs. No hype.
- Indian-business context where natural: ₹ (Rupees), DPDP Act 2023, RBI, FIU-IND (for blockchain/crypto), IRDAI, ABDM, NASSCOM, GST 18%, TDS 10% u/s 194J, Panchkula/IT Park, SIDBI/IndiaAI for SME context.

FORBIDDEN PHRASES — do NOT use any of these, anywhere:
- "as a language model"
- "in this comprehensive guide"
- "let's dive in"
- "leverage" (as a verb — use "use")
- "synergy"
- "game-changing"
- "unlock the power of"
- "in conclusion" (find another way to close)
- "in today's fast-paced world"
- "revolutionary"

STRUCTURE (follow this skeleton):

[Intro: 2–3 paragraphs. Hook → problem → what we will cover. The target keyword MUST appear naturally in the first 100 words.]

## H2 Section 1
[Substantive — definition, framework, or set-the-stage content]

## H2 Section 2
[First major point, with depth]

> **💡 Key insight:** [one-line insight backed by stat or specific claim]

## H2 Section 3
### H3 sub-point
### H3 sub-point

## H2 Section 4
[Second major point]

> **⚠️ Watch out:** [common pitfall + how to avoid]

## H2 Section 5
[Practical action / checklist / framework]

## How we help
[1–2 paragraphs on how Toshi Consulting addresses this for clients. Specific, not generic. Not salesy.]

## [Closing H2 — NOT "In conclusion"]
[1–2 paragraphs that land the post. Use a heading like "Where to go from here" or "The bottom line" or topic-specific.]

OUTPUT FORMAT (mandatory):
Return ONLY a complete markdown file. Start with the YAML frontmatter delimited by '---' lines. After frontmatter, the markdown body. No prose outside the file. No explanations.

Frontmatter must look exactly like this template (fill in values):

---
title: "<title — MUST be ≤60 characters, MUST contain the target keyword>"
slug: <slug provided in user prompt>
metaDescription: "<140–160 characters, MUST contain the target keyword, with a hook>"
excerpt: "<200 characters summary>"
category: <category from user prompt>
date: 2026-05-19
author: Toshi Consulting
targetKeyword: "<keyword from user prompt>"
iconName: <iconName from user prompt>
tone: <tone gradient from user prompt>
faqs:
  - q: "<question phrased the way an Indian buyer would search>"
    a: "<2–3 sentence answer that uses related keywords naturally>"
  - q: "..."
    a: "..."
  - q: "..."
    a: "..."
  - q: "..."
    a: "..."
---

[markdown body — minimum 4 H2 sections, the key-insight + watch-out callouts, the "How we help" section, and a non-"In conclusion" closing.]

HARD REQUIREMENTS — your output is rejected if these fail:
- TITLE must contain the literal target keyword exactly as provided (case-insensitive, contiguous). If the target is "ai analytics dashboard" the title must contain "ai analytics dashboard" together, not split across words.
- META DESCRIPTION must contain the literal target keyword exactly as provided.
- BODY must use the literal target keyword as a phrase within the first 100 words AND at least 3 times overall.
- AT LEAST 3 internal Toshi links, all of these formats valid:
  [anchor](/blog/<other-slug>), [anchor](/services#ai-integration|blockchain-consulting|qa-testing-and-automations|digital-media-marketing-and-branding), [Talk to us](/contact), [our story](/about)
- AT LEAST 2 external authority links. Use these REAL URLs (paste them as-is — do not fabricate):
  • https://www.nasscom.in/
  • https://www.rbi.org.in/
  • https://www.meity.gov.in/
  • https://indiaai.gov.in/
  • https://www.gartner.com/en
  • https://www.mckinsey.com/
  • https://www.hyperledger.org/
  • https://fiuindia.gov.in/
  • https://www.istqb.org/
  • https://www.dpdp.gov.in/ (DPDP Act portal)
- WORD COUNT minimum is the target. Do not under-write. Expand the H2 sections with concrete examples, INR cost bands, or sub-section H3s if you find yourself under.
- Keyword density 0.3–2.0% across the body. Do not stuff.`;

// ---------- user prompt builder ----------
function buildUserPrompt({ briefContent, toneRef, slug, targetKeyword, category, wordCount, iconName, tone }) {
  return `Write the full blog post per the system prompt rules.

BRIEF (your spec — follow the outline + LSI keywords + question coverage):
${briefContent}

TONE REFERENCE (match this rhythm, structure, callout style, and FAQ format):
${toneRef}

POST METADATA TO USE EXACTLY:
- slug: ${slug}
- targetKeyword: "${targetKeyword}"
- category: ${category}
- iconName: ${iconName}
- tone: ${tone}
- target word count: ${wordCount} words (±15%)
- date: 2026-05-19

REMINDERS:
- Title ≤60 chars and includes the target keyword.
- Meta 140–160 chars and includes the target keyword + a hook.
- Keyword in first 100 words of body.
- ≥3 internal links, ≥2 external authority links.
- 1 "💡 Key insight:" callout (markdown blockquote starting with "> **💡 Key insight:**").
- 1 "⚠️ Watch out:" callout (markdown blockquote starting with "> **⚠️ Watch out:**").
- 4 FAQs in frontmatter.
- "How we help" section toward the end.
- Closing H2 does NOT say "In conclusion" (use something like "Where to go from here" or "The bottom line").
- No forbidden phrases (see system).

Output: only the markdown file content starting with --- frontmatter. No surrounding text.`;
}

// ---------- API callers ----------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callOpenAICompat({ endpoint, apiKey, model, messages, maxTokens = 4500, temperature = 0.7 }) {
  const maxRetries = 3;
  let attempt = 0;
  while (true) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, messages, max_tokens: maxTokens, temperature }),
    });
    if (res.ok) {
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) throw new Error(`Empty response: ${JSON.stringify(data).slice(0, 400)}`);
      return content;
    }
    if (res.status === 429 && attempt < maxRetries) {
      // Honor Retry-After if present, else 65s
      const retryAfter = Number(res.headers.get('retry-after')) || 65;
      process.stdout.write(`[429 backoff ${retryAfter}s] `);
      await sleep(retryAfter * 1000);
      attempt++;
      continue;
    }
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
  }
}

const callGroq = (messages) =>
  callOpenAICompat({
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    apiKey: process.env.GROQ_API_KEY,
    model: process.env.GROQ_MODEL || 'meta-llama/llama-4-scout-17b-16e-instruct',
    messages,
    maxTokens: 4500,
  });

const callNvidia = (messages) =>
  callOpenAICompat({
    endpoint: 'https://integrate.api.nvidia.com/v1/chat/completions',
    apiKey: process.env.NVIDIA_API_KEY,
    model: process.env.NVIDIA_MODEL || 'meta/llama-3.3-70b-instruct',
    messages,
    maxTokens: 5000,
  });

// ---------- main ----------
async function main() {
  const argv = new Set(process.argv.slice(2));
  const samples = argv.has('--samples');
  const force = argv.has('--force');
  const slugArg = [...argv].find((a) => a.startsWith('--slug='))?.slice(7);

  await fs.mkdir(DRAFTS_DIR, { recursive: true });
  const toneRef = await fs.readFile(TONE_REF, 'utf8');

  // Build work queue
  const files = await fs.readdir(BRIEFS_DIR);
  const work = [];
  for (const f of files.sort()) {
    if (!f.endsWith('.md')) continue;
    const slug = f.replace(/\.md$/, '');
    if (slugArg && slugArg !== slug) continue;
    if (PILLAR_SLUGS.has(slug)) continue;

    const briefRaw = await fs.readFile(path.join(BRIEFS_DIR, f), 'utf8');
    const { data: fm } = matter(briefRaw);

    const draftPath = path.join(DRAFTS_DIR, f);
    let existing = null;
    try {
      existing = await fs.readFile(draftPath, 'utf8');
    } catch {}
    const hasRealDraft =
      existing && existing.length > 1500 && !existing.includes("You've hit your limit");
    if (hasRealDraft && !force) continue;

    const cat = fm.category || 'Cross-pillar';
    const defaults = CATEGORY_DEFAULTS[cat] || CATEGORY_DEFAULTS['Cross-pillar'];

    const tier = CONVERSION_SLUGS.has(slug) || NVIDIA_RESCUE_SLUGS.has(slug) ? 'conversion' : 'cluster';
    work.push({
      slug,
      briefPath: path.join(BRIEFS_DIR, f),
      draftPath,
      tier,
      targetKeyword: fm.targetKeyword || '',
      category: cat,
      wordCount: fm.wordCount || 1800,
      iconName: defaults.iconName,
      tone: defaults.tone,
      briefContent: briefRaw,
    });
  }

  if (samples) {
    const conv = work.find((w) => w.tier === 'conversion');
    const clusters = work.filter((w) => w.tier === 'cluster').slice(0, 2);
    const sample = [conv, ...clusters].filter(Boolean);
    work.length = 0;
    work.push(...sample);
  }

  const conv = work.filter((w) => w.tier === 'conversion').length;
  const clu = work.filter((w) => w.tier === 'cluster').length;
  console.log(`Queue: ${work.length} drafts — ${conv} conversion (NVIDIA) + ${clu} cluster (Groq)`);

  let ok = 0;
  let fail = 0;

  for (const w of work) {
    const userPrompt = buildUserPrompt({
      briefContent: w.briefContent,
      toneRef,
      slug: w.slug,
      targetKeyword: w.targetKeyword,
      category: w.category,
      wordCount: w.wordCount,
      iconName: w.iconName,
      tone: w.tone,
    });

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ];

    const callerName = w.tier === 'conversion' ? 'NVIDIA' : 'Groq';
    const caller = w.tier === 'conversion' ? callNvidia : callGroq;

    process.stdout.write(`[${callerName}] ${w.slug} ... `);
    const t0 = Date.now();
    try {
      const output = await caller(messages);
      // Strip any code-fence wrapping the model may have added
      const stripped = output
        .replace(/^```(?:markdown|md)?\s*\n?/, '')
        .replace(/\n?```\s*$/, '')
        .trim();
      await fs.writeFile(w.draftPath, stripped + '\n');
      const sec = ((Date.now() - t0) / 1000).toFixed(1);
      const words = stripped.split(/\s+/).length;
      console.log(`✓ ${words}w in ${sec}s`);
      ok++;
    } catch (e) {
      console.log(`✗ ${e.message.slice(0, 200)}`);
      fail++;
    }

    // Groq free tier has tight TPM caps — pace per-tier:
    //   Groq: ~8s between calls (~7 req/min, well under TPM ceilings for 17B model)
    //   NVIDIA: 2s (40 RPM cap, large quota)
    await sleep(callerName === 'Groq' ? 8000 : 2000);
  }

  console.log(`\nDone: ${ok} ok, ${fail} failed`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
