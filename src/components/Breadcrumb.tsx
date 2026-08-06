import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

type BreadcrumbItem = {
  label: string;
  to?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-zinc-400" aria-label="Breadcrumb">
      <Link to="/" className="inline-flex items-center gap-2 rounded-md transition hover:text-slate-950 dark:hover:text-white">
        <Home size={15} aria-hidden="true" />
        Home
      </Link>
      {items.map((item) => (
        <span key={`${item.label}-${item.to ?? 'current'}`} className="inline-flex items-center gap-2">
          <ChevronRight size={14} aria-hidden="true" />
          {item.to ? (
            <Link to={item.to} className="rounded-md transition hover:text-slate-950 dark:hover:text-white">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 dark:text-zinc-200">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
