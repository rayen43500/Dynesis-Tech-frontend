import React from 'react';

import { cn } from '../../utils/cn';

export function SectionHeader({
  title,
  subtitle,
  className
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn('pb-6', className)}>
      <h1 className="text-[28px] leading-tight font-normal tracking-tight">{title}</h1>
      {subtitle ? <p className="mt-2 text-muted text-sm leading-relaxed max-w-[680px]">{subtitle}</p> : null}
    </div>
  );
}

