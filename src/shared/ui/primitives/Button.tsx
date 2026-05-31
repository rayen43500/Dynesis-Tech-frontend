import React from 'react';

import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        size === 'sm' && 'h-9 px-3',
        size === 'md' && 'h-11 px-4',
        size === 'lg' && 'h-12 px-6 text-base',
        variant === 'primary' && 'border-transparent bg-accent text-white hover:bg-accent2',
        variant === 'secondary' && 'bg-surface2 border-border text-text hover:bg-surface',
        variant === 'ghost' && 'border-transparent bg-transparent text-text hover:bg-surface',
        variant === 'danger' && 'border-transparent bg-danger text-white hover:opacity-90',
        className
      )}
    >
      {loading ? (
        <span aria-hidden className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      ) : null}
      {props.children}
    </button>
  );
}

