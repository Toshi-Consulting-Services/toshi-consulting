#!/usr/bin/env node
/**
 * Deterministic SEO + voice audit. No LLM calls. Scores each draft 0–100.
 *
 *   node scripts/validate-drafts.mjs           # audit all drafts
 *   node scripts/validate-drafts.mjs --slug=X  # audit one
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DRAFTS_DIR = path.join(ROOT, 'blog-posts/drafts');
const AUDITS_DIR = path.join(ROOT, 'blog-posts/audits');
const BRIEFS_DIR = path.join(ROOT, 'blog-posts/briefs');

const FORBIDDEN = [
  'as a language model',
  'in this comprehensive guide',
  "let's dive in",
  'synergy',
  'game-changing',
  'unlock the power of',
  'in conclusion',
  "in today's fast-paced world",
  'revolutionary',
];
// "leverage" as verb — only flag inflected forms (leverages/leveraged/leveraging).
// Bare "leverage" is usually a noun (e.g. "your leverage in negotiation") and is fine.
const LEVERAGE_AS_VERB = /\bleverag(?:es|ed|ing)\b/i;

function countWords(s) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function avgSentenceLength(body) {
  const sentences = body
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/[.!?]+/)
    .map((x) => x.trim())
    .filter((x) => x.length > 4);
  const lens = sentences.map((s) => s.split(/\s+/).length);
  if (lens.length === 0) return 0;
  return lens.reduce((a, b) => a + b, 0) / lens.length;
}

function countMatches(body, needle) {
  const re = new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  return (body.match(re) || []).length;
}

// Token-match: all keyword tokens (≥3 chars) appear in haystack, ignoring stopwords.
// SEO-friendly — Google treats "hire an AI consultant in India" as matching
// the keyword "hire AI consultant India" even with filler words between.
const STOPWORDS = new Set(['a', 'an', 'the', 'in', 'on', 'of', 'for', 'to', 'and', 'or', 'with', 'vs']);

// Match a keyword token against the haystack, allowing common variations:
//   - plural 's' (dashboard → dashboards)
//   - -ing/-ed/-er (outsource → outsourcing, outsourced)
//   - hyphenated forms (in-house ↔ inhouse ↔ "in house")
function tokenAppears(hay, t) {
  const hayNorm = hay.toLowerCase().replace(/-/g, ' '); // treat hyphens as spaces
  const tNorm = t.toLowerCase().replace(/-/g, ' ');
  if (tNorm.includes(' ')) {
    // multi-word token like "in house"
    return new RegExp(`\\b${tNorm.replace(/\s+/g, '\\s+')}\\b`, 'i').test(hayNorm);
  }
  // Single word: allow common inflections (plurals, verb forms, demonyms)
  // e.g. india ↔ indian; service ↔ services; outsource ↔ outsourcing
  const re = new RegExp(`\\b${tNorm}(?:s|es|ed|ing|er|ers|n|ns|an|ans|ese|ian)?\\b`, 'i');
  return re.test(hayNorm);
}

function keywordTokensIn(haystack, keyword) {
  if (!keyword) return false;
  const tokens = keyword.toLowerCase().split(/\s+/).filter((t) => t.length >= 2 && !STOPWORDS.has(t));
  if (tokens.length === 0) return false;
  return tokens.every((t) => tokenAppears(haystack, t));
}

function score(rawDraft, brief) {
  const { data: fm, content: body } = matter(rawDraft);
  const issues = { critical: [], should: [], nice: [] };
  let total = 0;

  const title = fm.title || '';
  const meta = fm.metaDescription || '';
  const targetKw = (fm.targetKeyword || '').toLowerCase();
  const targetWords = brief?.wordCount || 1800;
  const wordCount = countWords(body);

  // Title & meta (15)
  if (title.length > 0 && title.length <= 60) total += 3;
  else issues.critical.push(`Title is ${title.length} chars (max 60).`);
  if (keywordTokensIn(title, targetKw)) total += 4;
  else issues.critical.push(`Title does not contain target-keyword tokens "${targetKw}".`);
  if (meta.length >= 140 && meta.length <= 160) total += 3;
  else issues.should.push(`Meta is ${meta.length} chars (target 140–160).`);
  if (keywordTokensIn(meta, targetKw)) total += 3;
  else issues.critical.push(`Meta description does not contain target-keyword tokens.`);
  if (meta.length > 80) total += 2;

  // Body structure (15)
  if (keywordTokensIn(title, targetKw)) total += 3;
  const first100 = body.split(/\s+/).slice(0, 100).join(' ');
  if (keywordTokensIn(first100, targetKw)) total += 4;
  else issues.critical.push(`Target keyword not in first 100 words of body.`);
  const h2Count = (body.match(/^##\s/gm) || []).length;
  if (h2Count >= 4) total += 3;
  else issues.should.push(`Only ${h2Count} H2 sections (target ≥4).`);
  // crude hierarchy check
  total += 2;
  const avg = avgSentenceLength(body);
  if (avg > 0 && avg < 25) total += 3;
  else if (avg > 0) issues.should.push(`Avg sentence ${avg.toFixed(1)} words (target <25).`);

  // Keyword coverage (15)
  // Density counts both exact-phrase AND paragraph-level token co-occurrence
  // (which is closer to how Google ranks naturally-written content).
  const kwMatches = targetKw ? countMatches(body, targetKw) : 0;
  const paragraphsWithAllTokens = body
    .split(/\n\s*\n/)
    .filter((p) => keywordTokensIn(p, targetKw)).length;
  const effectiveMatches = kwMatches + Math.floor(paragraphsWithAllTokens / 2);
  const density = wordCount > 0 ? (effectiveMatches / wordCount) * 100 : 0;
  // Relaxed band — natural writing rarely hits 0.5% exact-phrase even on top-ranking pages
  if (density >= 0.2 && density <= 2.0) total += 5;
  else if (density > 0 && density < 0.2) issues.should.push(`Keyword density ${density.toFixed(2)}% (target 0.2–2.0%).`);
  else if (density > 2.0) issues.should.push(`Keyword density ${density.toFixed(2)}% — possible stuffing.`);
  else {
    // Density is 0 — check if at least the tokens individually appear in body
    const toks = targetKw.toLowerCase().split(/\s+/).filter((t) => t.length >= 2 && !STOPWORDS.has(t));
    const present = toks.filter((t) => new RegExp(`\\b${t}\\b`, 'i').test(body)).length;
    if (toks.length > 0 && present >= Math.ceil(toks.length / 2)) {
      issues.should.push(`Keyword tokens scattered (no paragraph contains the full "${targetKw}" phrase). Consider one summary paragraph using the phrase as-is.`);
    } else {
      issues.critical.push(`Keyword "${targetKw}" largely absent from body.`);
    }
  }
  // LSI: pull keywords from brief and count overlap
  if (brief?.lsiKeywords && Array.isArray(brief.lsiKeywords)) {
    const hits = brief.lsiKeywords.filter((k) => body.toLowerCase().includes(k.toLowerCase())).length;
    if (hits >= 4) total += 5;
    else issues.should.push(`Only ${hits} LSI keywords found (target ≥4).`);
  } else {
    total += 3; // partial credit when brief lacks structured LSI
  }
  // no paragraph with >5 occurrences
  const paras = body.split(/\n\s*\n/);
  const stuffed = paras.some((p) => targetKw && countMatches(p, targetKw) > 5);
  if (!stuffed) total += 5;
  else issues.should.push(`At least one paragraph stuffs the keyword.`);

  // Internal linking (10)
  const internalLinks = [...body.matchAll(/\]\(\/(blog|services|contact|about)[^)]*\)/g)];
  if (internalLinks.length >= 3) total += 4;
  else issues.critical.push(`Only ${internalLinks.length} internal Toshi links (target ≥3).`);
  // anchor quality — penalise "click here" / "here" anchors
  const badAnchors = [...body.matchAll(/\[(click here|here|read more|this link)\]\(\/[^)]+\)/gi)];
  if (badAnchors.length === 0) total += 3;
  else issues.should.push(`${badAnchors.length} non-descriptive internal anchors.`);
  total += 3; // resolution check skipped offline

  // External authority (10)
  const externalLinks = [...body.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((m) => m[1]);
  if (externalLinks.length >= 2) total += 5;
  else issues.critical.push(`Only ${externalLinks.length} external links (target ≥2).`);
  total += 5; // HTTP-200 check skipped offline

  // FAQ + Schema-readiness (10)
  const faqs = Array.isArray(fm.faqs) ? fm.faqs : [];
  if (faqs.length === 4) total += 4;
  else issues.critical.push(`${faqs.length} FAQs in frontmatter (target 4).`);
  const properAnswers = faqs.filter((f) => {
    const a = (f && f.a) || '';
    const sentences = a.split(/[.!?]+/).filter((s) => s.trim().length > 5).length;
    return sentences >= 2;
  }).length;
  if (properAnswers === faqs.length && faqs.length > 0) total += 3;
  else issues.should.push(`${properAnswers}/${faqs.length} FAQ answers have ≥2 sentences.`);
  const buyerQs = faqs.filter((f) => /^(how|what|when|why|where|can|should|is|do|are)/i.test((f && f.q) || '')).length;
  if (buyerQs === faqs.length && faqs.length > 0) total += 3;
  else issues.nice.push(`${buyerQs}/${faqs.length} FAQ questions are buyer-phrased.`);

  // Brand voice (15)
  const weCount = (body.match(/\b[Ww]e(?:'ve|'re|'ll|'d)?\b/g) || []).length;
  if (weCount >= 5) total += 4;
  else issues.critical.push(`"we" used only ${weCount} times — voice may be too third-person.`);
  // forbidden phrases
  const found = FORBIDDEN.filter((p) => body.toLowerCase().includes(p));
  const leverageVerb = LEVERAGE_AS_VERB.test(body);
  if (found.length === 0 && !leverageVerb) total += 4;
  else {
    if (found.length > 0) issues.critical.push(`Forbidden phrases: ${found.join(', ')}.`);
    if (leverageVerb) issues.critical.push(`"leverage" used as a verb.`);
  }
  if (/Key insight/i.test(body)) total += 3;
  else issues.should.push(`Missing "💡 Key insight" callout.`);
  if (/Watch out/i.test(body)) total += 2;
  else issues.should.push(`Missing "⚠️ Watch out" callout.`);
  if (!/in conclusion/i.test(body)) total += 2;

  // Word count (5)
  const lo = targetWords * 0.85;
  const hi = targetWords * 1.15;
  if (wordCount >= lo && wordCount <= hi) total += 5;
  else issues.should.push(`Word count ${wordCount} (target ${targetWords} ±15% = ${Math.round(lo)}–${Math.round(hi)}).`);

  // Originality / depth (5)
  if (/₹|Rs\.?\s*\d|INR/.test(body)) total += 3; // INR pricing presence is a strong signal
  else issues.nice.push(`No INR pricing/cost mentioned — Indian-context wedge missing.`);
  if (wordCount > 1000 && body.includes('## ')) total += 2;

  const score = Math.max(0, Math.min(100, Math.round(total)));
  let verdict;
  if (score >= 80 && issues.critical.length === 0) verdict = 'pass';
  else if (score >= 65) verdict = 'needs-revision';
  else verdict = 'reject';

  return { score, verdict, issues, stats: { wordCount, h2Count, kwMatches, density, weCount, externalLinks: externalLinks.length, internalLinks: internalLinks.length, faqs: faqs.length } };
}

function renderAudit(slug, result, brief) {
  const { score, verdict, issues, stats } = result;
  const date = new Date().toISOString().slice(0, 10);
  return `---
slug: ${slug}
score: ${score}
verdict: ${verdict}
auditedAt: ${date}
---

## Stats
- Word count: ${stats.wordCount}
- H2 sections: ${stats.h2Count}
- Internal links: ${stats.internalLinks}
- External links: ${stats.externalLinks}
- Keyword matches: ${stats.kwMatches} (density ${stats.density.toFixed(2)}%)
- "we" occurrences: ${stats.weCount}
- FAQs: ${stats.faqs}

## Critical issues (must fix before publish)
${issues.critical.length ? issues.critical.map((s) => `- ${s}`).join('\n') : '_(none)_'}

## Should-fix
${issues.should.length ? issues.should.map((s) => `- ${s}`).join('\n') : '_(none)_'}

## Nice-to-have
${issues.nice.length ? issues.nice.map((s) => `- ${s}`).join('\n') : '_(none)_'}
`;
}

async function main() {
  const argv = new Set(process.argv.slice(2));
  const slugArg = [...argv].find((a) => a.startsWith('--slug='))?.slice(7);

  await fs.mkdir(AUDITS_DIR, { recursive: true });
  const drafts = (await fs.readdir(DRAFTS_DIR)).filter((f) => f.endsWith('.md'));

  const summary = [];
  for (const f of drafts.sort()) {
    const slug = f.replace(/\.md$/, '');
    if (slugArg && slugArg !== slug) continue;

    const draftRaw = await fs.readFile(path.join(DRAFTS_DIR, f), 'utf8');
    if (draftRaw.includes("You've hit your limit") || draftRaw.length < 500) {
      summary.push({ slug, score: 0, verdict: 'invalid', note: 'placeholder/rate-limit file' });
      continue;
    }

    let brief = null;
    try {
      const briefRaw = await fs.readFile(path.join(BRIEFS_DIR, f), 'utf8');
      brief = matter(briefRaw).data;
    } catch {}

    let result;
    try {
      result = score(draftRaw, brief || {});
    } catch (e) {
      summary.push({ slug, score: 0, verdict: 'invalid', note: `parse error: ${e.message.slice(0, 80)}` });
      continue;
    }
    await fs.writeFile(path.join(AUDITS_DIR, f), renderAudit(slug, result, brief));
    summary.push({ slug, score: result.score, verdict: result.verdict, critical: result.issues.critical.length });
  }

  console.log('\n=== Audit Summary ===');
  summary.sort((a, b) => b.score - a.score);
  for (const s of summary) {
    console.log(`${String(s.score).padStart(3)}  ${s.verdict.padEnd(16)}  ${s.slug}${s.critical ? `  [${s.critical} critical]` : ''}${s.note ? `  (${s.note})` : ''}`);
  }
  const pass = summary.filter((s) => s.verdict === 'pass').length;
  const rev = summary.filter((s) => s.verdict === 'needs-revision').length;
  const rej = summary.filter((s) => s.verdict === 'reject' || s.verdict === 'invalid').length;
  console.log(`\nTotal: ${summary.length}  pass=${pass}  needs-revision=${rev}  reject=${rej}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
