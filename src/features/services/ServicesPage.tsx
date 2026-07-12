import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Brain, Check, Code2, Layers, Monitor, PenTool, Smartphone } from 'lucide-react';

import { ScrollReveal } from './ScrollReveal';
import { endpoints } from '../../shared/api/endpoints';
import './services.css';

const SERVICE_KEYS = [
  { id: 'landing', icon: Monitor, ctaKey: 'services.cta.quote' },
  { id: 'web', icon: Code2, ctaKey: 'services.cta.quote' },
  { id: 'mobile', icon: Smartphone, ctaKey: 'services.cta.quote' },
  { id: 'design', icon: PenTool, ctaKey: 'services.cta.quote' },
  { id: 'ai', icon: Brain, ctaKey: 'services.cta.quote' },
  { id: 'custom', icon: Layers, ctaKey: 'services.cta.talk' }
] as const;

const PROCESS_KEYS = ['discovery', 'design', 'build', 'deliver'] as const;

type PublicService = {
  _id: string;
  title?: { en?: string; fr?: string };
  shortDescription?: { en?: string; fr?: string };
  supportingTags?: string[];
  cta?: {
    label?: { en?: string; fr?: string };
    href?: string;
  } | null;
};

function getLocalized(value: { en?: string; fr?: string } | undefined, lang: string) {
  if (!value) return '';
  return lang.startsWith('fr') ? value.fr || value.en || '' : value.en || value.fr || '';
}

function getDynamicIcon(service: PublicService) {
  const haystack = `${service.title?.en || ''} ${service.title?.fr || ''} ${(service.supportingTags || []).join(' ')}`.toLowerCase();
  if (haystack.includes('mobile')) return Smartphone;
  if (haystack.includes('design') || haystack.includes('ux') || haystack.includes('ui')) return PenTool;
  if (haystack.includes('ai') || haystack.includes('ia') || haystack.includes('automation')) return Brain;
  if (haystack.includes('strategy') || haystack.includes('strategie')) return Layers;
  if (haystack.includes('web') || haystack.includes('react') || haystack.includes('node')) return Code2;
  return Monitor;
}

export function ServicesPage() {
  const { i18n, t } = useTranslation();
  const publicServicesQuery = useQuery({
    queryKey: ['public', 'services'],
    queryFn: async () => {
      const res = await endpoints.public.services.list();
      return (res.data?.data || []) as PublicService[];
    }
  });

  const dynamicServices = publicServicesQuery.data || [];

  return (
    <div className="services-page">
      <section className="services-hero">
        <ScrollReveal>
          <h1 className="services-hero__line1">{t('services.hero.title1')}</h1>
          <p className="services-hero__line2">{t('services.hero.title2')}</p>
          <p className="services-hero__sub">{t('services.hero.subtitle')}</p>
        </ScrollReveal>
      </section>

      <section className="services-grid-section">
        <div className="services-grid">
          {dynamicServices.length
            ? dynamicServices.map((service, index) => {
                const Icon = getDynamicIcon(service);
                const title = getLocalized(service.title, i18n.language) || t('services.cards.custom.name');
                const description = getLocalized(service.shortDescription, i18n.language) || t('services.cards.custom.desc');
                const checkpoints = service.supportingTags?.length ? service.supportingTags : ['Strategy', 'Design', 'Build', 'Delivery'];
                const ctaLabel = getLocalized(service.cta?.label, i18n.language) || t('services.cta.quote');
                const ctaHref = service.cta?.href || '/work-with-us';

                return (
                  <ScrollReveal key={service._id} className="services-card" delay={index * 0.1}>
                    <div className="services-card__icon" aria-hidden>
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <h2 className="services-card__name">{title}</h2>
                    <p className="services-card__desc">{description}</p>
                    <div className="services-card__divider" />
                    <p className="services-card__included">{t('services.included')}</p>
                    <ul className="services-card__checklist">
                      {checkpoints.slice(0, 4).map((checkpoint) => (
                        <li key={checkpoint} className="services-card__check-item">
                          <Check className="services-card__check-icon" size={13} strokeWidth={2} aria-hidden />
                          <span>{checkpoint}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={ctaHref} className="services-card__cta">
                      {ctaLabel}
                    </Link>
                  </ScrollReveal>
                );
              })
            : SERVICE_KEYS.map((service, index) => {
                const Icon = service.icon;
                const base = `services.cards.${service.id}`;
                const checkpoints = ['c1', 'c2', 'c3', 'c4'] as const;
                return (
                  <ScrollReveal key={service.id} className="services-card" delay={index * 0.1}>
                    <div className="services-card__icon" aria-hidden>
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <h2 className="services-card__name">{t(`${base}.name`)}</h2>
                    <p className="services-card__desc">{t(`${base}.desc`)}</p>
                    <div className="services-card__divider" />
                    <p className="services-card__included">{t('services.included')}</p>
                    <ul className="services-card__checklist">
                      {checkpoints.map((c) => (
                        <li key={c} className="services-card__check-item">
                          <Check className="services-card__check-icon" size={13} strokeWidth={2} aria-hidden />
                          <span>{t(`${base}.${c}`)}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/work-with-us" className="services-card__cta">
                      {t(service.ctaKey)}
                    </Link>
                  </ScrollReveal>
                );
              })}
        </div>
      </section>

      <section className="services-process">
        <ScrollReveal>
          <h2 className="services-process__title">{t('services.process.title')}</h2>
        </ScrollReveal>
        <div className="services-process__track">
          <div className="services-process__line" aria-hidden />
          {PROCESS_KEYS.map((key, index) => (
            <ScrollReveal key={key} className="services-process__step" delay={index * 0.1}>
              <div className="services-process__num">{index + 1}</div>
              <h3 className="services-process__step-title">{t(`services.process.${key}.title`)}</h3>
              <p className="services-process__step-desc">{t(`services.process.${key}.desc`)}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="services-cta">
        <ScrollReveal>
          <h2 className="services-cta__title">{t('services.cta.title')}</h2>
          <p className="services-cta__sub">{t('services.cta.sub')}</p>
          <div className="services-cta__actions">
            <Link to="/work-with-us" className="services-cta__btn services-cta__btn--primary">
              {t('services.cta.primary')}
            </Link>
            <Link to="/developers" className="services-cta__btn services-cta__btn--secondary">
              {t('services.cta.secondary')}
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
