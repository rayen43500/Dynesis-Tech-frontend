import React from 'react';

import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';

export function TopBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface2/90">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-normal tracking-tight">Dynesis Tech</div>
            <div className="text-xs text-muted">Premium Software Agency Platform</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

