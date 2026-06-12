#!/usr/bin/env node
/**
 * Reviews every published post: deterministic SEO audit + a cheap-model
 * fact/quality pass (NVIDIA llama-3.3-70b). Writes a triage report so Kanav
 * only reviews the flagged posts, not all 51.
 *
 *   node scripts/review-posts.mjs
 *
 * NOTE: the LLM pass has NO web access — it flags claims that look dubious,
 * outdated, or internally inconsistent. It's triage, not authoritative truth.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIR = path.join(ROOT, 'blog-posts/published');
const OUT = path.join(ROOT, 'blog-posts/_review-2026-06-09.md');

async function loadEnv() {
  try {
    const raw = await fs.readFile(path.join(ROOT, '.env.local'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
    }
  } catch {}
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const FORBIDDEN = ['as a language model','in this comprehensive guide',"let's dive in",'synergy','game-changing','unlock the power of','in conclusion',"in today's fast-paced world",'revolutionary'];

function seoFlags(fm, body) {
  const f = [];
  const title = fm.title || '';
  const meta = fm.metaDescription || '';
  const kw = (fm.targetKeyword || '').toLowerCase();
  const words = body.split(/\s+/).filter(Boolean).length;
  if (!title || title.length > 64) f.push(`title ${title.length}c`);
  if (kw && !title.toLowerCase().includes(kw.split(' ')[0])) f.push('kw not in title');
  if (meta.length < 140 || meta.length > 160) f.push(`meta ${meta.length}c`);
  if ((body.match(/^##\s/gm) || []).length < 4) f.push('<4 H2');
  if ((body.match(/\]\(\/(blog|services|contact|about)/g) || []).length < 3) f.push('<3 internal');
  if ((body.match(/\]\(https?:\/\//g) || []).length < 2) f.push('<2 external');
  if ((Array.isArray(fm.faqs) ? fm.faqs.length : 0) !== 4) f.push(`${Array.isArray(fm.faqs)?fm.faqs.length:0} FAQs`);
  if (words < 1000) f.push(`${words}w short`);
  const fb = FORBIDDEN.filter((p) => body.toLowerCase().includes(p));
  if (fb.length) f.push('forbidden:' + fb.join(','));
  return { flags: f, words };
}

async function nvidiaReview(title, kw, body) {
  const sys = 'You are a strict senior editor and fact-checker for an Indian IT consulting firm blog. Review the post for: factual errors, outdated or dubious claims, invented statistics, internal contradictions, and quality/credibility problems that could embarrass the brand. You have NO web access — flag claims that look unverifiable or dubious, do not assume they are true. Be concise and specific.';
  const usr = `TITLE: ${title}\nTARGET KEYWORD: ${kw}\n\n${body.slice(0, 8000)}\n\nReturn ONLY compact JSON: {"verdict":"keep|revise|kill","riskFlags":["specific concern", "..."],"topFix":"single most important fix or empty string"}`;
  const res = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: process.env.NVIDIA_MODEL || 'meta/llama-3.3-70b-instruct', messages: [{ role: 'system', content: sys }, { role: 'user', content: usr }], max_tokens: 400, temperature: 0.2 }),
  });
  if (res.status === 429) { await sleep(20000); return nvidiaReview(title, kw, body); }
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || '';
  const m = content.match(/\{[\s\S]*\}/);
  return JSON.parse(m[0]);
}

async function main() {
  await loadEnv();
  const files = (await fs.readdir(DIR)).filter((f) => f.endsWith('.md')).sort();
  console.log(`Reviewing ${files.length} posts...`);
  const rows = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const slug = f.replace(/\.md$/, '');
    const raw = await fs.readFile(path.join(DIR, f), 'utf8');
    const { data: fm, content: body } = matter(raw);
    const seo = seoFlags(fm, body);
    let rev = { verdict: 'error', riskFlags: [], topFix: '' };
    try { rev = await nvidiaReview(fm.title || slug, fm.targetKeyword || '', body); }
    catch (e) { rev.riskFlags = ['review failed: ' + e.message.slice(0, 60)]; }
    rows.push({ slug, seo: seo.flags, words: seo.words, ...rev });
    console.log(`[${i + 1}/${files.length}] ${rev.verdict.padEnd(7)} ${slug}  ${seo.flags.length ? '(SEO: ' + seo.flags.join(', ') + ')' : ''}`);
    // write report incrementally
    const order = { kill: 0, revise: 1, error: 2, keep: 3 };
    const sorted = [...rows].sort((a, b) => (order[a.verdict] ?? 9) - (order[b.verdict] ?? 9));
    let md = `# Blog post review — 51 posts (auto, NVIDIA 70b)\n\n_Generated ${'2026-06-09'}. LLM pass = plausibility/quality triage (no web access). Review flagged posts; "keep" = no obvious issues found._\n\n`;
    md += `| Slug | Verdict | SEO flags | Risk flags | Top fix |\n|---|---|---|---|---|\n`;
    for (const r of sorted) {
      md += `| ${r.slug} | **${r.verdict}** | ${r.seo.join('; ') || '—'} | ${(r.riskFlags || []).join('; ').slice(0, 220) || '—'} | ${(r.topFix || '').slice(0, 160) || '—'} |\n`;
    }
    await fs.writeFile(OUT, md);
    await sleep(2500);
  }
  const c = (v) => rows.filter((r) => r.verdict === v).length;
  console.log(`\n=== SUMMARY ===  keep=${c('keep')}  revise=${c('revise')}  kill=${c('kill')}  error=${c('error')}`);
  console.log('Report: blog-posts/_review-2026-06-09.md');
}
main().catch((e) => { console.error(e); process.exit(1); });
