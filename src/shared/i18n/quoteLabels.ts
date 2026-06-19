import type { TFunction } from 'i18next';

const PROJECT_TYPE_KEYS: Record<string, string> = {
  'Web Application': 'workWithUs.types.web.title',
  'Mobile App': 'workWithUs.types.mobile.title',
  'Design & Branding': 'workWithUs.types.design.title',
  'Other / Not sure': 'workWithUs.types.other.title'
};

const BUDGET_KEYS: Record<string, string> = {
  '< €5,000': 'workWithUs.budget.under5k',
  '€5,000 – €15,000': 'workWithUs.budget.5k15k',
  '€15,000 – €50,000': 'workWithUs.budget.15k50k',
  '€50,000+': 'workWithUs.budget.over50k'
};

const TIMELINE_KEYS: Record<string, string> = {
  'ASAP (< 1 month)': 'workWithUs.timeline.asap',
  '1 – 3 months': 'workWithUs.timeline.1to3',
  '3 – 6 months': 'workWithUs.timeline.3to6',
  Flexible: 'workWithUs.timeline.flexible'
};

export function translateProjectType(value: string, t: TFunction) {
  const key = PROJECT_TYPE_KEYS[value];
  return key ? t(key) : value;
}

export function translateBudget(value: string, t: TFunction) {
  const key = BUDGET_KEYS[value];
  return key ? t(key) : value;
}

export function translateTimeline(value: string, t: TFunction) {
  const key = TIMELINE_KEYS[value];
  return key ? t(key) : value;
}
