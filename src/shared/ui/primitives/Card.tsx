import React from 'react';

import { cn } from '../../utils/cn';

export function Card({
  className,
  variant = 'default',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'elevated';
}) {
  return (
    <div
      {...props}
      className={cn(
        'rounded-md border border-border bg-surface2 text-text shadow-sm',
        variant === 'elevated' && 'shadow-md',
        className
      )}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('px-6 py-5 border-b border-border', className)} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('px-6 py-5', className)} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('px-6 py-4 border-t border-border', className)} />;
}

