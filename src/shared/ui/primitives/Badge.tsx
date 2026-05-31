import React from 'react';

import { cn } from '../../utils/cn';

type BadgeIntent = 'default' | 'success' | 'warning' | 'danger';

export function Badge({ intent = 'default', className, ...props }: React.HTMLAttributes<HTMLDivElement> & { intent?: BadgeIntent }) {
  const intentClasses =
    intent === 'success'
      ? 'bg-success/10 text-success border-success/20'
      : intent === 'warning'
        ? 'bg-warning/10 text-warning border-warning/20'
        : intent === 'danger'
          ? 'bg-danger/10 text-danger border-danger/20'
          : 'bg-surface text-muted border-border';

  return (
    <div
      {...props}
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
        intentClasses,
        className
      )}
    />
  );
}

