import React from 'react';

import { Card, CardContent } from '../primitives/Card';
import { Badge } from '../primitives/Badge';

export function EmptyState({
  title,
  description,
  badge
}: {
  title: string;
  description?: string;
  badge?: string;
}) {
  return (
    <Card>
      <CardContent className="space-y-3">
        {badge ? <Badge className="border-transparent bg-accent/10 text-accent">{badge}</Badge> : null}
        <div className="text-[18px] font-normal tracking-tight">{title}</div>
        {description ? <div className="text-sm text-muted leading-relaxed">{description}</div> : null}
      </CardContent>
    </Card>
  );
}

