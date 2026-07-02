import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

export const FilterChip = ({ label, onRemove }: FilterChipProps) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#e8f7f4] text-[#007168] text-xs font-medium rounded-full border border-[#149777]/30"
  >
    {label}
    <button onClick={onRemove} className="hover:text-[#004d43] transition-colors ml-0.5 flex-shrink-0">
      <X className="w-3 h-3" />
    </button>
  </motion.span>
);
