import { Home, Building2, Map, Store, BedDouble, CalendarDays } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { clsx } from 'clsx';
import type { PropertyCategory } from '../../../types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, Building2, Map, Store, BedDouble, CalendarDays,
};

const navItems: { id: PropertyCategory | ''; label: string; icon: string; count: number }[] = [
  { id: '', label: 'All', icon: 'Home', count: 6236 },
  { id: 'houses', label: 'Houses', icon: 'Home', count: 1842 },
  { id: 'apartments', label: 'Apartments', icon: 'Building2', count: 967 },
  { id: 'land', label: 'Land', icon: 'Map', count: 2341 },
  { id: 'commercial', label: 'Commercial', icon: 'Store', count: 543 },
  { id: 'rooms', label: 'Rooms', icon: 'BedDouble', count: 328 },
  { id: 'short_term', label: 'Short Term', icon: 'CalendarDays', count: 215 },
];

interface CategoryNavigationProps {
  activeCategory?: string;
  onSelect?: (category: PropertyCategory | '') => void;
}

export const CategoryNavigation = ({ activeCategory, onSelect }: CategoryNavigationProps) => {
  const [searchParams] = useSearchParams();
  const current = activeCategory ?? searchParams.get('category') ?? '';

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-stretch overflow-x-auto scrollbar-hide gap-0 -mb-px">
          {navItems.map(item => {
            const Icon = iconMap[item.icon] || Home;
            const isActive = current === item.id;

            if (onSelect) {
              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id as PropertyCategory | '')}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 flex-shrink-0 transition-colors whitespace-nowrap',
                    isActive
                      ? 'border-[#149777] text-[#149777]'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  <span className={clsx('text-xs', isActive ? 'text-[#149777]' : 'text-slate-400')}>
                    ({item.count.toLocaleString()})
                  </span>
                </button>
              );
            }

            const params = new URLSearchParams(searchParams);
            if (item.id) params.set('category', item.id);
            else params.delete('category');

            return (
              <Link
                key={item.id}
                to={`/properties?${params.toString()}`}
                className={clsx(
                  'flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 flex-shrink-0 transition-colors whitespace-nowrap',
                  isActive
                    ? 'border-[#149777] text-[#149777]'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                <span className={clsx('text-xs', isActive ? 'text-[#149777]' : 'text-slate-400')}>
                  ({item.count.toLocaleString()})
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
