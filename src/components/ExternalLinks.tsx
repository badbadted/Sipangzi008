import { forwardRef } from 'react';
import {
  ExternalLink,
  Wallet,
  Sword,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import { EXTERNAL_LINKS } from '../config/externalLinks';

const ICON_MAP: Record<string, LucideIcon> = {
  Wallet,
  Sword,
  BookOpen,
};

function getIcon(iconName?: string): LucideIcon {
  if (iconName && iconName in ICON_MAP) return ICON_MAP[iconName];
  return ExternalLink;
}

const linkBaseClasses =
  'inline-flex items-center gap-1.5 text-slate-700 hover:text-blue-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500';

export const ExternalLinks = forwardRef<HTMLElement>(function ExternalLinks(_, ref) {
  return (
    <aside
      ref={ref}
      className="order-1 lg:order-none flex-shrink-0 w-full lg:w-72 sticky top-0 z-10 lg:static bg-white lg:bg-transparent lg:rounded-none rounded-b-xl shadow-sm lg:shadow-none border-b border-slate-200 lg:border-0 py-3 lg:mx-0 lg:px-0 lg:py-0 lg:pt-0"
      aria-label="其他系統連結"
    >
      <div className="p-4 lg:bg-white lg:rounded-xl lg:shadow-sm lg:border lg:border-slate-200 lg:p-4">
        <nav
          className="flex flex-row flex-wrap gap-1 lg:flex-col lg:flex-nowrap lg:gap-1"
          aria-label="其他系統連結"
        >
          {EXTERNAL_LINKS.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkBaseClasses} p-2.5 lg:px-2 lg:py-1.5`}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5 lg:w-4 lg:h-4 text-blue-600 flex-shrink-0" aria-hidden />
                <span className="text-sm lg:inline">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
});
