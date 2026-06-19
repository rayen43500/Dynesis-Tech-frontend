import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card, CardContent } from '../primitives/Card';
import { SectionHeader } from '../layout/SectionHeader';
import { Badge } from '../primitives/Badge';
import { FadeIn } from '../motion/FadeIn';

export function RoutePlaceholder({ name, nameKey }: { name?: string; nameKey?: string }) {
  const { t } = useTranslation();
  const title = nameKey ? t(nameKey) : name || '';

  return (
    <FadeIn className="space-y-5">
      <SectionHeader title={title} subtitle={t('placeholder.route.subtitle')} />

      <Card>
        <CardContent className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-muted">{t('placeholder.route.statusLabel')}</div>
            <div className="mt-1 text-[18px] font-normal tracking-tight">{t('placeholder.route.statusValue')}</div>
          </div>
          <Badge intent="success">{t('placeholder.route.badge')}</Badge>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
