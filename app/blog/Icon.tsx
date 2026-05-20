import { ShieldCheck, Brain, Cloud, Cpu, Link2, Megaphone } from 'lucide-react';
import type { BlogIcon } from './lib';

const map = {
  shield: ShieldCheck,
  brain: Brain,
  cloud: Cloud,
  rocket: Cpu, // visual analogue — Cpu/processor for DevOps shipping
  chain: Link2,
  megaphone: Megaphone,
  bot: Brain,
  laptop: Cpu,
} satisfies Record<BlogIcon, React.ComponentType<{ size?: number; className?: string }>>;

export default function BlogTopicIcon({
  name,
  size = 80,
  className = '',
}: {
  name: BlogIcon;
  size?: number;
  className?: string;
}) {
  const Icon = map[name];
  return <Icon size={size} className={className} />;
}
