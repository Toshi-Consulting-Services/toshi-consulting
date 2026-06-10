import type { LucideIcon } from 'lucide-react';
import { Brain, Link2, Bug, GitBranch, ShieldCheck, Cloud, Megaphone } from 'lucide-react';

export type Service = {
  slug: string;          // MUST match the live site's old /services/<slug> URLs for SEO continuity
  title: string;
  short: string;         // one-liner for the navbar dropdown + footer
  description: string;   // intro paragraph
  benefits: string[];    // "Key benefits"
  expectations: string[];// "What you can expect"
  meta: string;          // SEO meta description
  icon: LucideIcon;
  tone: string;          // gradient classes
  soft: string;          // soft background tint
  featured?: boolean;    // also surfaced on the homepage services section
};

/**
 * Single source of truth for all services. Slugs mirror the existing live
 * toshiconsulting.com/services/<slug> URLs exactly so the migration needs no
 * redirects for these pages (1:1 URL parity preserves rankings).
 */
export const services: Service[] = [
  {
    slug: 'ai-integration',
    title: 'AI Integration',
    short: 'Production-grade AI inside your existing products.',
    description:
      'Seamlessly integrate AI capabilities into your existing applications to enhance functionality, improve efficiency, and drive innovation across your workflows.',
    benefits: [
      'Production-ready AI integration with reliable performance',
      'NLP and automation workflows that reduce manual effort',
      'Security, governance, and quality checks for enterprise use',
      'Measurable improvements through clear success metrics',
    ],
    expectations: [
      'Use-case discovery and solution design',
      'Model deployment, integration, and pipeline setup',
      'Testing for accuracy, latency, and reliability',
      'Documentation, monitoring, and continuous optimisation',
    ],
    meta:
      'Integrate production-grade AI — LLMs, NLP, and automation — into your existing applications with governance, testing, and measurable results.',
    icon: Brain,
    tone: 'from-teal-500 to-cyan-500',
    soft: 'bg-teal-50',
    featured: true,
  },
  {
    slug: 'blockchain-consulting',
    title: 'Blockchain Consulting',
    short: 'Tailored blockchain architecture and smart contracts.',
    description:
      'Unlock the potential of your business with tailored blockchain solutions that drive automation, enhance transparency, and optimise decentralised operations.',
    benefits: [
      'Secure-by-design blockchain architecture and solution planning',
      'Smart-contract development with best practices and testing',
      'Transparent, traceable workflows that improve accountability',
      'Integration support across your existing systems and applications',
    ],
    expectations: [
      'Discovery workshop and implementation roadmap',
      'Contract development, audit checklist, and test cycles',
      'Integration with web apps and backend services',
      'Deployment, monitoring, and ongoing support',
    ],
    meta:
      'Tailored blockchain consulting — secure architecture, smart-contract development, and integration that brings transparency and automation to your operations.',
    icon: Link2,
    tone: 'from-cyan-500 to-sky-500',
    soft: 'bg-cyan-50',
    featured: true,
  },
  {
    slug: 'qa-testing-automations',
    title: 'QA Testing & Automations',
    short: 'Functional, regression, performance & security testing.',
    description:
      'Ship with confidence. We build functional, regression, performance, and security testing into your delivery — and automate it across your CI/CD pipeline for early defect detection and faster releases.',
    benefits: [
      'Functional, regression, performance, and security testing',
      'Early defect detection that lowers development cost',
      'Automation that accelerates release cycles',
      'Domain expertise across insurance, fintech, and CRM applications',
    ],
    expectations: [
      'Test strategy and coverage planning',
      'Automation suites with Playwright, Selenium, Cypress, Katalon, and JMeter',
      'Continuous testing integrated into your CI/CD pipeline',
      'Python, Java, and Cloud upskilling for your in-house team',
    ],
    meta:
      'QA testing and automation — functional, regression, performance, and security testing wired into CI/CD with Playwright, Selenium, Cypress, and JMeter.',
    icon: Bug,
    tone: 'from-emerald-500 to-teal-500',
    soft: 'bg-emerald-50',
    featured: true,
  },
  {
    slug: 'devops-ci-cd',
    title: 'DevOps & CI/CD',
    short: 'Automated pipelines and reliable, repeatable deploys.',
    description:
      'Accelerate delivery and efficiency with automated pipelines, continuous integration, and seamless deployment workflows — so your team ships faster with less risk.',
    benefits: [
      'Faster releases with automated CI/CD pipelines',
      'Improved reliability with testing and observability',
      'Reduced risk through consistent deployment workflows',
      'Efficient collaboration using modern DevOps practices',
    ],
    expectations: [
      'Pipeline design for build, test, and deployment stages',
      'Environment setup with repeatable infrastructure patterns',
      'Monitoring and logging for faster incident response',
      'Documentation and team enablement for CI/CD operations',
    ],
    meta:
      'DevOps and CI/CD — automated build, test, and deployment pipelines with monitoring and repeatable infrastructure so you release faster and safer.',
    icon: GitBranch,
    tone: 'from-sky-500 to-cyan-600',
    soft: 'bg-sky-50',
  },
  {
    slug: 'cybersecurity-lab',
    title: 'Cybersecurity Lab',
    short: 'Security audits, hardening, and monitoring readiness.',
    description:
      'Protect your business with enterprise-grade security reviews, compliance-oriented audits, and threat-monitoring readiness — built around the risks that actually matter to you.',
    benefits: [
      'Proactive security reviews and actionable improvement plans',
      'Vulnerability management and security-hardening guidance',
      'Threat-monitoring recommendations aligned to your needs',
      'Compliance-oriented approach that reduces risk exposure',
    ],
    expectations: [
      'Security audit and threat-modelling workshop',
      'Hands-on testing, findings, and prioritised remediation',
      'Operational guidance for monitoring and response readiness',
      'Roadmap and documentation for continuous improvement',
    ],
    meta:
      'Cybersecurity Lab — enterprise-grade security audits, vulnerability management, hardening, and threat-monitoring readiness with prioritised remediation.',
    icon: ShieldCheck,
    tone: 'from-teal-600 to-emerald-600',
    soft: 'bg-teal-50',
  },
  {
    slug: 'cloud-deployment-support',
    title: 'Cloud Deployment & Support',
    short: 'Scalable cloud infrastructure with ongoing support.',
    description:
      'Scalable cloud infrastructure and ongoing support to keep your applications running smoothly, reliably, and securely as you grow.',
    benefits: [
      'Scalable deployments for stable performance and growth',
      'Optimised infrastructure patterns for reliability',
      'Deployment guidance, tuning, and ongoing support',
      'Cloud readiness with clear operational ownership',
    ],
    expectations: [
      'Architecture planning and deployment strategy',
      'Cloud migration assistance and environment setup',
      'Performance tuning, monitoring, and reliability improvements',
      'Ongoing support for updates, maintenance, and optimisation',
    ],
    meta:
      'Cloud deployment and support — scalable architecture, migration, performance tuning, monitoring, and ongoing managed support for your applications.',
    icon: Cloud,
    tone: 'from-cyan-500 to-blue-500',
    soft: 'bg-cyan-50',
  },
  {
    slug: 'digital-media-marketing-and-branding',
    title: 'Digital Media Marketing & Branding',
    short: 'Strategy, branding, and full-funnel digital growth.',
    description:
      'Build a powerful online presence with strategies that connect, engage, and convert. From social-media campaigns to complete brand-identity design, we help your brand stand out and grow with confidence.',
    benefits: [
      'A brand identity that is consistent and memorable',
      'Full-funnel campaigns built to convert, not just reach',
      'Content engines across blog, video, and social',
      'Measurement and CRO that ties spend to outcomes',
    ],
    expectations: [
      'SEO, Local SEO, and the newer AEO / GEO answer-engine optimisation',
      'Social media marketing and optimisation (SMM / SMO)',
      'Performance advertising (PPC) and conversion-rate optimisation',
      'Content, email, and influencer marketing plus brand strategy and identity',
    ],
    meta:
      'Digital media marketing and branding — SEO, AEO/GEO, paid media, content, and brand identity that make your business visible, valuable, and memorable.',
    icon: Megaphone,
    tone: 'from-emerald-500 to-cyan-500',
    soft: 'bg-emerald-50',
    featured: true,
  },
];

export const featuredServices = services.filter((s) => s.featured);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
