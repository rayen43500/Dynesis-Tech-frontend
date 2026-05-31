import React from 'react';

import { Card, CardContent } from '../primitives/Card';
import { SectionHeader } from '../layout/SectionHeader';
import { Badge } from '../primitives/Badge';
import { FadeIn } from '../motion/FadeIn';

export function RoutePlaceholder({ name }: { name: string }) {
  return (
    <FadeIn className="space-y-5">
      <SectionHeader
        title={name}
        subtitle="This route is scaffolded. UI and data wiring will be implemented next."
      />

      <Card>
        <CardContent className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-muted">Status</div>
            <div className="mt-1 text-[18px] font-normal tracking-tight">Coming soon</div>
          </div>
          <Badge intent="success">V1-ready</Badge>
        </CardContent>
      </Card>
    </FadeIn>
  );
}

