import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useI18n } from '../../app/providers/I18nProvider';
import { usePlatformSettings } from '../../app/providers/PlatformSettingsProvider';
import { pickLocalized } from '../platform/platformSettingsUtils';
import type { ScrollTabContent, TestimonialItem } from '../types/platformSettings';

export function useBrandingContent() {
  const { settings } = usePlatformSettings();
  const { language } = useI18n();
  const { t } = useTranslation();

  return useMemo(
    () => ({
      siteName: pickLocalized(settings?.branding?.siteName, language, t('nav.brand')),
      tagline: pickLocalized(settings?.branding?.tagline, language, t('topBar.tagline')),
      logoUrl: settings?.branding?.logoUrl || '/images/image.png',
      logoMark: settings?.branding?.logoMark || 'D'
    }),
    [settings, language, t]
  );
}

export function useFooterContactContent() {
  const { settings } = usePlatformSettings();
  const { language } = useI18n();
  const { t } = useTranslation();

  return useMemo(
    () => ({
      email: settings?.contact?.email || t('footer.contact.email'),
      phone: settings?.contact?.phone || t('footer.contact.phone'),
      location: pickLocalized(settings?.contact?.location, language, t('footer.contact.location')),
      hours: pickLocalized(settings?.contact?.hours, language, t('footer.contact.hours')),
      about: pickLocalized(settings?.contact?.about, language, t('footer.company.about')),
      copyright: pickLocalized(settings?.copyright, language, t('footer.copyright')),
      social: {
        x: settings?.social?.x || '#',
        linkedin: settings?.social?.linkedin || '#',
        github: settings?.social?.github || '#'
      }
    }),
    [settings, language, t]
  );
}

export function useHomePageContent() {
  const { settings } = usePlatformSettings();
  const { language } = useI18n();
  const { t } = useTranslation();

  return useMemo(() => {
    const h = settings?.homeContent?.hero;
    const r = settings?.homeContent?.ratings;
    const tm = settings?.homeContent?.testimonials;
    const intro = settings?.homeContent?.intro;
    const tabs = settings?.homeContent?.scrollTabs;

    const fallbackTestimonials = [1, 2, 3, 4].map((n) => ({
      quote: t(`home.testimonials.${n}.quote`),
      name: t(`home.testimonials.${n}.name`),
      role: t(`home.testimonials.${n}.role`)
    }));

    const cmsTestimonials = (tm?.items || []).map((item: TestimonialItem) => ({
      quote: pickLocalized(item.quote, language, ''),
      name: pickLocalized(item.name, language, ''),
      role: pickLocalized(item.role, language, '')
    }));

    return {
      headline1: pickLocalized(h?.headline1, language, t('home.hero.headline1')),
      headline2: pickLocalized(h?.headline2, language, t('home.hero.headline2')),
      subheading: pickLocalized(h?.subheading, language, t('home.hero.subheading')),
      features: [
        pickLocalized(h?.feature1, language, t('home.hero.feature.strategyLed')),
        pickLocalized(h?.feature2, language, t('home.hero.feature.experiencedEngineers')),
        pickLocalized(h?.feature3, language, t('home.hero.feature.enterpriseQuality'))
      ],
      button1: pickLocalized(h?.ctaPrimary, language, t('home.cta.primary')),
      button1Href: h?.ctaPrimaryHref || '/contact',
      button2: pickLocalized(h?.ctaSecondary, language, t('home.cta.secondary')),
      button2Href: h?.ctaSecondaryHref || '/work-with-us',
      reviewCountText: pickLocalized(r?.reviewCount, language, t('home.ratings.reviewCount')),
      ratingScore: r?.score || '4.7',
      testimonialsHeading: pickLocalized(tm?.heading, language, t('home.testimonials.title')),
      matchBadge: pickLocalized(h?.matchBadge, language, t('home.hero.matchBadge')),
      featuredPerson: {
        name: pickLocalized(h?.featuredName, language, t('home.featured.name')),
        title: pickLocalized(h?.featuredRole, language, t('home.featured.role'))
      },
      heroImage: h?.heroImage || '/images/hero-developer.png',
      techStack: h?.techStack?.length ? h.techStack : ['HuggingFace', 'PyTorch', 'LangChain', 'OpenAI', 'AWS', 'FastAPI'],
      testimonials: cmsTestimonials.some((x: { quote: string }) => x.quote) ? cmsTestimonials : fallbackTestimonials,
      intro: {
        line1: pickLocalized(intro?.line1, language, t('home.intro.line1')),
        line2: pickLocalized(intro?.line2, language, t('home.intro.line2'))
      },
      scrollTabs: {
        design: resolveScrollTab(tabs?.design, language, t, 'design'),
        development: resolveScrollTab(tabs?.development, language, t, 'development'),
        transformation: resolveScrollTab(tabs?.transformation, language, t, 'transformation')
      }
    };
  }, [settings, language, t]);
}

function resolveScrollTab(
  tab: ScrollTabContent | undefined,
  language: 'en' | 'fr',
  t: (key: string) => string,
  id: 'design' | 'development' | 'transformation'
) {
  const prefix = `home.scrollTabs.${id}`;
  const defaultImages: Record<string, string> = {
    design: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    development: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    transformation: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80'
  };
  const defaultTags: Record<string, string[]> = {
    design: ['Figma', 'Design Systems'],
    development: ['React', 'Node.js'],
    transformation: ['AWS', 'DevOps']
  };
  const defaultHrefs: Record<string, string> = {
    design: '/work-with-us',
    development: '/developers',
    transformation: '/contact'
  };

  return {
    label: pickLocalized(tab?.label, language, t(`${prefix}.label`)),
    tag: pickLocalized(tab?.tag, language, t(`${prefix}.tag`)),
    headline1: pickLocalized(tab?.headline1, language, t(`${prefix}.headline1`)),
    headline2: pickLocalized(tab?.headline2, language, t(`${prefix}.headline2`)),
    checks: (['c1', 'c2', 'c3', 'c4'] as const).map((c) => pickLocalized(tab?.[c], language, t(`${prefix}.${c}`))),
    person: pickLocalized(tab?.person, language, t(`${prefix}.person`)),
    role: pickLocalized(tab?.role, language, t(`${prefix}.role`)),
    image: tab?.image || defaultImages[id],
    tags: tab?.tags?.length ? tab.tags : defaultTags[id],
    learnHref: tab?.learnHref || defaultHrefs[id]
  };
}
