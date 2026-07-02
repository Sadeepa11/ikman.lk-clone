interface PriceRangeProps {
  min: string;
  max: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  label?: string;
}

export const PriceRange = ({ min, max, onMinChange, onMaxChange, label = 'Price Range (LKR)' }: PriceRangeProps) => (
  <div>
    <label className="block text-xs font-medium text-slate-700 mb-2">{label}</label>
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={min}
        onChange={e => onMinChange(e.target.value)}
        placeholder="Min"
        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400/30 text-slate-800 placeholder:text-slate-400"
      />
      <span className="text-slate-400 text-xs flex-shrink-0">to</span>
      <input
        type="number"
        value={max}
        onChange={e => onMaxChange(e.target.value)}
        placeholder="Max"
        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400/30 text-slate-800 placeholder:text-slate-400"
      />
    </div>
  </div>
);
