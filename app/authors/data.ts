export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  tone: string;          // gradient for avatar fallback
  side: string;          // soft bg colour
  linkedin?: string;
  email?: string;
  expertise: string[];   // for Person schema knowsAbout
};

export const authors: Author[] = [
  {
    slug: 'toshi-trivedi',
    name: 'Toshi Trivedi',
    role: 'Founder & CEO',
    bio: "Toshi leads Toshi Consulting — translating business outcomes into shippable engineering plans. Specialises in QA test automation, AI-augmented workflows, and brand-led digital marketing for Indian SMEs.",
    initials: 'TT',
    tone: 'from-cyan-500 to-sky-500',
    side: 'bg-cyan-50',
    linkedin: 'https://www.linkedin.com/in/toshi-trivedi-15a929399',
    email: 'info@toshiconsulting.com',
    // Sole bylined author across the blog, so knowsAbout spans the full service
    // range (was narrower when authorship was split with a second person).
    expertise: ['AI Integration', 'Blockchain Consulting', 'QA Test Automation', 'DevOps & CI/CD', 'Cybersecurity', 'Cloud Architecture', 'Digital Marketing', 'DPDP Compliance'],
  },
];

export function findAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

export const DEFAULT_AUTHOR_SLUG = 'toshi-trivedi';
