import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export type BlogIcon =
  | 'shield'
  | 'brain'
  | 'cloud'
  | 'rocket'
  | 'chain'
  | 'megaphone'
  | 'bot'
  | 'laptop';

export type FAQ = { q: string; a: string };

export type BlogPost = {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  targetKeyword: string;
  iconName: BlogIcon;
  tone: string;
  draft?: boolean;
  faqs: FAQ[];
  body: string;       // raw markdown
  html: string;       // rendered HTML
  wordCount: number;
  readMinutes: number;
};

const POSTS_DIR = path.join(process.cwd(), 'blog-posts/published');

let cache: BlogPost[] | null = null;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function readingMinutes(wordCount: number): number {
  return Math.max(1, Math.round(wordCount / 220));
}

async function parsePost(filename: string): Promise<BlogPost> {
  const raw = await fs.readFile(path.join(POSTS_DIR, filename), 'utf-8');
  const { data, content } = matter(raw);
  const html = await marked.parse(content, { gfm: true, breaks: false });
  const wordCount = countWords(content);
  return {
    slug: data.slug ?? filename.replace(/\.md$/, ''),
    title: data.title ?? 'Untitled',
    metaDescription: data.metaDescription ?? data.excerpt ?? '',
    excerpt: data.excerpt ?? data.metaDescription ?? '',
    category: data.category ?? 'General',
    date: typeof data.date === 'string' ? data.date : new Date(data.date ?? Date.now()).toISOString().slice(0, 10),
    author: data.author ?? 'Toshi Consulting',
    targetKeyword: data.targetKeyword ?? '',
    iconName: (data.iconName ?? 'shield') as BlogIcon,
    tone: data.tone ?? 'from-blue-500 to-cyan-500',
    draft: data.draft === true,
    faqs: Array.isArray(data.faqs) ? data.faqs : [],
    body: content,
    html: typeof html === 'string' ? html : '',
    wordCount,
    readMinutes: readingMinutes(wordCount),
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (cache) return cache;
  let files: string[];
  try {
    files = await fs.readdir(POSTS_DIR);
  } catch {
    return [];
  }
  const posts = await Promise.all(
    files.filter((f) => f.endsWith('.md')).map(parsePost)
  );
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  cache = posts;
  return posts;
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
}

export type CategoryCount = { name: string; slug: string; count: number };

export async function categoriesWithCounts(): Promise<CategoryCount[]> {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();
  for (const p of posts) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return Array.from(counts.entries()).map(([name, count]) => ({
    name,
    slug: categorySlug(name),
    count,
  }));
}

export async function monthsWithCounts(): Promise<{ label: string; count: number }[]> {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();
  for (const p of posts) {
    const d = new Date(p.date);
    const key = `${d.toLocaleString('en-US', { month: 'short' })} ${d.getFullYear()}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([label, count]) => ({ label, count }));
}

export function categorySlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export async function postsByCategorySlug(slug: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => categorySlug(p.category) === slug);
}

/**
 * Internal-link suggester: returns N most-relevant siblings.
 * Strategy: same-category posts first (most recent), then cross-category by recency.
 */
export async function relatedPosts(slug: string, count = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  const me = posts.find((p) => p.slug === slug);
  if (!me) return posts.slice(0, count);
  const same = posts.filter((p) => p.slug !== slug && p.category === me.category);
  const other = posts.filter((p) => p.slug !== slug && p.category !== me.category);
  return [...same, ...other].slice(0, count);
}

export const POSTS_PER_PAGE = 12;
