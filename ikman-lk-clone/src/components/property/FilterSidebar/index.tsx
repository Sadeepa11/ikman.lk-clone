import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocationSelector } from '../LocationSelector';
import { PriceRange } from '../PriceRange';
import { Dropdown } from '../Dropdown';
import { Button } from '../../common/Button';
import type { FilterState } from '../../../types';
import { bedroomOptions, bathroomOptions, conditionOptions, postedDateOptions, propertyTypes } from '../../../data/categories';
import { countActiveFilters } from '../../../utils/helpers';

interface FilterSidebarProps {
  filters: FilterState;
  onUpdate: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">{children}</h3>
);

const RadioGroup = ({ options, value, onChange }: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-1.5">
    {options.map(opt => (
      <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${value === opt.value ? 'border-[#149777]' : 'border-slate-300 group-hover:border-slate-400'}`}>
          {value === opt.value && <div className="w-2 h-2 rounded-full bg-[#149777]" />}
        </div>
        <input type="radio" className="sr-only" value={opt.value} checked={value === opt.value} onChange={() => onChange(opt.value)} />
        <span className="text-sm text-slate-700">{opt.label}</span>
      </label>
    ))}
  </div>
);

const CheckGroup = ({ options, value, onChange }: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {options.map(opt => (
      <button
        key={opt}
        onClick={() => onChange(value === opt ? '' : opt)}
        className={`px-3 py-1 text-sm rounded-full border transition-colors ${
          value === opt
            ? 'bg-[#149777] text-white border-[#149777]'
            : 'bg-white text-slate-600 border-slate-200 hover:border-[#149777]/50 hover:text-[#149777]'
        }`}
      >
        {opt}
      </button>
    ))}
  </div>
);

const Divider = () => <div className="border-t border-slate-100 my-4" />;

const FilterContent = ({ filters, onUpdate, onReset }: Omit<FilterSidebarProps, 'mobileOpen' | 'onMobileClose'>) => {
  const activeCount = countActiveFilters(filters);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-600" />
          <span className="font-semibold text-slate-800 text-sm">Filters</span>
          {activeCount > 0 && (
            <span className="w-5 h-5 bg-[#149777] text-white text-xs rounded-full flex items-center justify-center font-bold">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={onReset} className="flex items-center gap-1 text-xs text-[#149777] hover:text-[#007168] font-medium transition-colors">
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Property Type */}
      <SectionTitle>Property For</SectionTitle>
      <RadioGroup
        options={[{ value: '', label: 'All' }, ...propertyTypes]}
        value={filters.type}
        onChange={v => onUpdate('type', v as FilterState['type'])}
      />

      <Divider />

      {/* Location */}
      <SectionTitle>Location</SectionTitle>
      <LocationSelector
        district={filters.district}
        city={filters.city}
        onDistrictChange={v => onUpdate('district', v)}
        onCityChange={v => onUpdate('city', v)}
      />

      <Divider />

      {/* Price */}
      <SectionTitle>Price (LKR)</SectionTitle>
      <PriceRange
        label=""
        min={filters.priceMin}
        max={filters.priceMax}
        onMinChange={v => onUpdate('priceMin', v)}
        onMaxChange={v => onUpdate('priceMax', v)}
      />

      <Divider />

      {/* Bedrooms */}
      <SectionTitle>Bedrooms</SectionTitle>
      <CheckGroup options={bedroomOptions} value={filters.bedrooms} onChange={v => onUpdate('bedrooms', v)} />

      <Divider />

      {/* Bathrooms */}
      <SectionTitle>Bathrooms</SectionTitle>
      <CheckGroup options={bathroomOptions} value={filters.bathrooms} onChange={v => onUpdate('bathrooms', v)} />

      <Divider />

      {/* Condition */}
      <SectionTitle>Condition</SectionTitle>
      <RadioGroup
        options={[{ value: '', label: 'Any' }, ...conditionOptions]}
        value={filters.condition}
        onChange={v => onUpdate('condition', v)}
      />

      <Divider />

      {/* Posted Date */}
      <SectionTitle>Posted Date</SectionTitle>
      <Dropdown
        value={filters.postedDate}
        onChange={v => onUpdate('postedDate', v)}
        options={[{ value: '', label: 'Any time' }, ...postedDateOptions]}
        placeholder="Any time"
      />

      {activeCount > 0 && (
        <div className="mt-5">
          <Button variant="outline" fullWidth size="sm" onClick={onReset} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export const FilterSidebar = ({ filters, onUpdate, onReset, mobileOpen, onMobileClose }: FilterSidebarProps) => (
  <>
    {/* Desktop */}
    <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden sticky top-20">
      <FilterContent filters={filters} onUpdate={onUpdate} onReset={onReset} />
    </div>

    {/* Mobile drawer */}
    <AnimatePresence>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40"
            onClick={onMobileClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-80 max-w-full bg-white h-full overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between z-10">
              <span className="font-semibold text-slate-800">Filter Properties</span>
              <button onClick={onMobileClose} className="text-slate-500 hover:text-slate-700 p-1">✕</button>
            </div>
            <FilterContent filters={filters} onUpdate={onUpdate} onReset={onReset} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  </>
);
