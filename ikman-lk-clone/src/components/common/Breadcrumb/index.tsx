import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex items-center gap-1 flex-wrap">
      <li>
        <Link to="/" className="flex items-center text-slate-500 hover:text-[#149777] transition-colors">
          <Home className="w-3.5 h-3.5" />
        </Link>
      </li>
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-1">
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          {item.href ? (
            <Link to={item.href} className="text-xs text-slate-500 hover:text-[#149777] transition-colors whitespace-nowrap">
              {item.label}
            </Link>
          ) : (
            <span className="text-xs text-slate-800 font-medium whitespace-nowrap">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
