import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const FavoriteButton = ({ isFavorite, onToggle, className, size = 'md' }: FavoriteButtonProps) => (
  <motion.button
    whileTap={{ scale: 0.85 }}
    whileHover={{ scale: 1.1 }}
    onClick={e => { e.preventDefault(); e.stopPropagation(); onToggle(); }}
    className={clsx(
      'flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-colors duration-150 cursor-pointer',
      size === 'sm' ? 'w-7 h-7' : 'w-9 h-9',
      className
    )}
    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
  >
    <Heart
      className={clsx(
        'transition-colors duration-150',
        size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4',
        isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-400 hover:text-[#149777]'
      )}
    />
  </motion.button>
);
