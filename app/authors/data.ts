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
    slug: 'kanav-chauhan',
    name: 'Kanav Chauhan',
    role: 'Founder & CEO',
    bio: "Kanav founded Toshi Consulting to bridge the gap between ambitious Indian businesses and reliable digital delivery. Over a decade across AI integration, blockchain, and security architecture — engineer at heart, operator by necessity.",
    initials: 'KC',
    tone: 'from-teal-500 to-cyan-500',
    side: 'bg-teal-50',
    email: 'kchauhan@toshiconsulting.com',
    expertise: ['AI Integration', 'Blockchain Consulting', 'Cybersecurity', 'DPDP Compliance', 'Cloud Architecture'],
  },
  {
    slug: 'toshi-trivedi',
    name: 'Toshi Trivedi',
    role: 'Principal Consultant',
    bio: "Toshi leads client delivery at Toshi Consulting — translating business outcomes into shippable engineering plans. Specialises in QA test automation, AI-augmented workflows, and brand-led digital marketing for Indian SMEs.",
    initials: 'TT',
    tone: 'from-cyan-500 to-sky-500',
    side: 'bg-cyan-50',
    linkedin: 'https://www.linkedin.com/in/toshi-trivedi-15a929399',
    expertise: ['QA Test Automation', 'AI Workflows', 'Digital Marketing', 'Brand Strategy'],
  },
];

export function findAuthor(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

export const DEFAULT_AUTHOR_SLUG = 'kanav-chauhan';
