export interface ExternalLinkItem {
  label: string;
  href: string;
  icon?: string;
}

export const EXTERNAL_LINKS: ExternalLinkItem[] = [
  { label: '怪獸記帳', href: 'https://sipangzi002.vercel.app/', icon: 'Wallet' },
  { label: '小小英雄', href: 'https://sipangzi003.vercel.app/', icon: 'Sword' },
  { label: '英文偵探', href: 'https://sipangzi006.vercel.app/', icon: 'BookOpen' },
];
