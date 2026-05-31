import React from 'react';

import { cn } from '../../utils/cn';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  intent?: 'default' | 'success' | 'danger';
  label?: string;
};

export function Input({ intent = 'default', className, label, id, ...props }: InputProps) {
  const intentStyles =
    intent === 'success'
      ? 'focus-visible:ring-success/40 border-success'
      : intent === 'danger'
        ? 'focus-visible:ring-danger/40 border-danger'
        : 'focus-visible:ring-accent/40 border-border';

  const input = (
    <input
      {...props}
      id={id}
      className={cn(
        'h-11 w-full rounded-md border bg-surface2 px-4 text-sm text-text placeholder:text-muted shadow-sm',
        'focus:outline-none focus-visible:ring-2',
        intentStyles,
        'disabled:opacity-60 disabled:cursor-not-allowed',
        className
      )}
    />
  );

  if (!label) return input;

  return (
    <label htmlFor={id} className="flex flex-col gap-1.5 text-sm text-muted">
      <span>{label}</span>
      {input}
    </label>
  );
}

