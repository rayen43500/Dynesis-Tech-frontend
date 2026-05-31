import React from 'react';

import { Card, CardContent } from '../primitives/Card';

export function LoadingState({ label }: { label?: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3">
        <span
          aria-hidden
          className="h-4 w-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent"
        />
        <div className="text-sm text-muted">{label ?? 'Loading…'}</div>
      </CardContent>
    </Card>
  );
}

