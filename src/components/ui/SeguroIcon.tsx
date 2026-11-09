import type { ComponentType } from 'react';
import { Droplets, HeartPulse, ShieldCheck, type LucideProps } from 'lucide-react';

import type { SeguroIcon as SeguroIconName } from '@/data/seguros';

const ICONS = {
  shield: ShieldCheck,
  droplets: Droplets,
  'heart-pulse': HeartPulse,
} satisfies Record<SeguroIconName, ComponentType<LucideProps>>;

export function SeguroIcon({ name, size = 22 }: { name: SeguroIconName; size?: number }) {
  const Icon = ICONS[name];
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}
