import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../services/services.css';

export function HelpCenterPage() {
  const { t } = useTranslation();

  return (
    <section className="services-page">
      <div className="services-hero">
        <h1>{t('public.help.title')}</h1>
        <p>{t('public.help.subtitle')}</p>
      </div>
      <div className="services-grid">
        <article className="service-card">
          <h3>{t('public.help.faq')}</h3>
          <p>{t('public.help.faqDesc')}</p>
          <Link to="/faq">{t('public.help.faqLink')}</Link>
        </article>
        <article className="service-card">
          <h3>{t('public.help.contact')}</h3>
          <p>{t('public.help.contactDesc')}</p>
          <Link to="/contact">{t('public.help.contactLink')}</Link>
        </article>
        <article className="service-card">
          <h3>{t('public.help.support')}</h3>
          <p>{t('public.help.supportDesc')}</p>
          <Link to="/login">{t('public.help.supportLink')}</Link>
        </article>
      </div>
    </section>
  );
}
