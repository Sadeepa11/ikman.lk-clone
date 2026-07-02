import { clsx } from 'clsx';

type BadgeVariant = 'featured' | 'verified' | 'new' | 'sale' | 'rent' | 'agent' | 'owner' | 'developer' | 'success' | 'warning' | 'info';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, string> = {
  featured: 'bg-amber-500 text-white',
  verified: 'bg-green-500 text-white',
  new: 'bg-blue-500 text-white',
  sale: 'bg-[#149777] text-white',
  rent: 'bg-purple-500 text-white',
  agent: 'bg-blue-600 text-white',
  owner: 'bg-teal-600 text-white',
  developer: 'bg-indigo-600 text-white',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  info: 'bg-blue-100 text-blue-800',
};

export const Badge = ({ variant = 'info', children, className, size = 'sm' }: BadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center font-semibold rounded',
      size === 'sm' ? 'px-1.5 py-0.5 text-[10px] leading-4' : 'px-2 py-1 text-xs',
      variantStyles[variant],
      className
    )}
  >
    {children}
  </span>
);
