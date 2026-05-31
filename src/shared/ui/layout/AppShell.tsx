import React from 'react';

import { TopBar } from '../navigation/TopBar';

export function AppShell({
  sidebar,
  children
}: {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg">
      <TopBar />
      <div className="mx-auto flex max-w-[1120px] gap-6 px-6 sm:px-8">
        {sidebar ? (
          <aside className="w-[260px] pt-6">
            <div className="rounded-md border border-border bg-surface shadow-sm p-4">{sidebar}</div>
          </aside>
        ) : null}
        <main className="flex-1 py-6">{children}</main>
      </div>
    </div>
  );
}

