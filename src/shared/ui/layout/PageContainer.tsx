import React from 'react';

import { cn } from '../../utils/cn';

export function PageContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn('mx-auto w-full max-w-[1120px] px-6 sm:px-8', className)}
    />
  );
}

