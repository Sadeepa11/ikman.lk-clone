import { useState } from 'react';
import { Search, MapPin, ChevronDown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { locations } from '../../../data/locations';
import { Button } from '../../common/Button';

interface SearchBarProps {
  initialSearch?: string;
  initialDistrict?: string;
  onSearch?: (search: string, district: string) => void;
  compact?: boolean;
}

export const SearchBar = ({ initialSearch = '', initialDistrict = '', onSearch, compact = false }: SearchBarProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState(initialSearch);
  const [district, setDistrict] = useState(initialDistrict);
  const [locationOpen, setLocationOpen] = useState(false);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(search, district);
    } else {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (district) params.set('district', district);
      navigate(`/properties?${params.toString()}`);
    }
    setLocationOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className={`flex items-stretch bg-white rounded-xl shadow-lg border border-slate-100 overflow-visible relative ${compact ? 'h-11' : 'h-14'}`}>
      {/* Location selector */}
      <div className="relative flex-shrink-0">
        <button
          onClick={() => setLocationOpen(o => !o)}
          className={`flex items-center gap-1.5 px-3 h-full border-r border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors rounded-l-xl ${compact ? 'text-xs' : 'text-sm'} min-w-0`}
        >
          <MapPin className={`text-[#149777] flex-shrink-0 ${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
          <span className={`font-medium truncate max-w-28 ${compact ? 'hidden sm:inline' : ''}`}>
            {district || 'All Sri Lanka'}
          </span>
          <ChevronDown className={`flex-shrink-0 text-slate-400 transition-transform ${locationOpen ? 'rotate-180' : ''} ${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
        </button>

        <AnimatePresence>
          {locationOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-1 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"
            >
              <div className="p-2 max-h-72 overflow-y-auto">
                <button
                  onClick={() => { setDistrict(''); setLocationOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${!district ? 'bg-[#e8f7f4] text-[#007168] font-medium' : 'hover:bg-slate-50 text-slate-700'}`}
                >
                  All Sri Lanka
                </button>
                {locations.map(loc => (
                  <button
                    key={loc.id}
                    onClick={() => { setDistrict(loc.district); setLocationOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${district === loc.district ? 'bg-[#e8f7f4] text-[#007168] font-medium' : 'hover:bg-slate-50 text-slate-700'}`}
                  >
                    {loc.district}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search input */}
      <div className="flex-1 relative flex items-center">
        <Search className={`absolute left-3 text-slate-400 pointer-events-none ${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search properties, locations..."
          className={`w-full h-full pl-9 pr-9 bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none ${compact ? 'text-sm' : 'text-sm'}`}
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Search button */}
      <div className={`flex-shrink-0 p-1.5`}>
        <Button
          onClick={handleSearch}
          size={compact ? 'sm' : 'md'}
          className="h-full px-5 rounded-lg"
        >
          <Search className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </div>
    </div>
  );
};
