import { clsx } from 'clsx';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeStyles = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
};

const getInitials = (name: string) =>
  name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

const colors = [
  'bg-[#149777]', 'bg-blue-500', 'bg-green-500', 'bg-purple-500',
  'bg-amber-500', 'bg-teal-500', 'bg-indigo-500', 'bg-pink-500',
];

const getColor = (name: string) =>
  colors[name.charCodeAt(0) % colors.length];

export const Avatar = ({ name, src, size = 'md', className }: AvatarProps) => (
  <div
    className={clsx(
      'rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0 overflow-hidden',
      sizeStyles[size],
      !src && getColor(name),
      className
    )}
  >
    {src ? (
      <img src={src} alt={name} className="w-full h-full object-cover" />
    ) : (
      getInitials(name)
    )}
  </div>
);
