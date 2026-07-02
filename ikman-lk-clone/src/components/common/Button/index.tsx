import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#149777] hover:bg-[#007168] active:bg-[#005a52] text-white shadow-sm',
  secondary: 'bg-slate-800 hover:bg-slate-900 active:bg-slate-950 text-white shadow-sm',
  outline: 'border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 bg-white',
  ghost: 'hover:bg-slate-100 text-slate-700',
  danger: 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200',
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-2.5 py-1 text-xs rounded gap-1',
  sm: 'px-3 py-1.5 text-sm rounded gap-1.5',
  md: 'px-4 py-2 text-sm rounded-md gap-2',
  lg: 'px-6 py-3 text-base rounded-md gap-2',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className,
  ...props
}: ButtonProps) => (
  <motion.button
    whileTap={{ scale: 0.97 }}
    disabled={disabled || loading}
    className={clsx(
      'inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#149777] focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none',
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      className
    )}
    {...(props as React.ComponentProps<typeof motion.button>)}
  >
    {loading ? (
      <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    ) : leftIcon}
    {children && <span>{children}</span>}
    {!loading && rightIcon}
  </motion.button>
);
