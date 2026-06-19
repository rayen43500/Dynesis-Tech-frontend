import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card, CardContent } from '../primitives/Card';

export function LoadingState({ label }: { label?: string }) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent className="flex items-center gap-3">
        <span
          aria-hidden
          className="h-4 w-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent"
        />
        <div className="text-sm text-muted">{label ?? t('common.loading')}</div>
      </CardContent>
    </Card>
  );
}
