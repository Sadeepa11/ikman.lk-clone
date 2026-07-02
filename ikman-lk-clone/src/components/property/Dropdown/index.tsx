import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const Dropdown = ({ value, onChange, options, placeholder = 'Select...', label, className, size = 'md' }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div ref={ref} className={clsx('relative', className)}>
      {label && <label className="block text-xs font-medium text-slate-700 mb-1">{label}</label>}
      <button
        onClick={() => setOpen(o => !o)}
        className={clsx(
          'w-full flex items-center justify-between gap-2 bg-white border border-slate-200 rounded-lg text-left transition-colors hover:border-slate-300 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400/30',
          size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-3 py-2.5 text-sm',
          open ? 'border-red-400 ring-1 ring-red-400/30' : ''
        )}
      >
        <span className={clsx('truncate', !selected && 'text-slate-400')}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown className={clsx('w-4 h-4 text-slate-400 flex-shrink-0 transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.12 }}
            className="absolute z-30 top-full mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="max-h-56 overflow-y-auto py-1">
              {options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={clsx(
                    'w-full flex items-center justify-between px-3 py-2 text-sm transition-colors',
                    value === opt.value ? 'bg-red-50 text-red-600 font-medium' : 'hover:bg-slate-50 text-slate-700'
                  )}
                >
                  <span>{opt.label}</span>
                  {value === opt.value && <Check className="w-3.5 h-3.5 text-red-500" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
