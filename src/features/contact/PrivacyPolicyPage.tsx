import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AndelaNavbar } from '../home/AndelaNavbar';
import { PublicFooter } from '../../shared/ui/layout/PublicFooter';
import './privacy-policy.css';

export function PrivacyPolicyPage() {
  const { t } = useTranslation();

  const sections = [
    { title: t('rgpd.privacy.controller'), body: t('rgpd.privacy.controllerText') },
    { title: t('rgpd.privacy.dataCollected'), body: t('rgpd.privacy.dataCollectedText') },
    { title: t('rgpd.privacy.purpose'), body: t('rgpd.privacy.purposeText') },
    { title: t('rgpd.privacy.retention'), body: t('rgpd.privacy.retentionText') },
    { title: t('rgpd.privacy.rights'), body: t('rgpd.privacy.rightsText') },
    { title: t('rgpd.privacy.cookies'), body: t('rgpd.privacy.cookiesText') },
    { title: t('rgpd.privacy.contact'), body: t('rgpd.privacy.contactText') },
  ];

  return (
    <div className="privacy-page">
      {/* Header */}
      <header className="privacy-hero" aria-label="Privacy policy hero">
        <div className="privacy-hero__overlay" aria-hidden />
        <AndelaNavbar variant="contact" />
        <div className="privacy-hero__content">
          <Link to="/" className="privacy-hero__back">
            {t('rgpd.privacy.backHome')}
          </Link>
          <h1 className="privacy-hero__title">{t('rgpd.privacy.title')}</h1>
          <p className="privacy-hero__date">{t('rgpd.privacy.lastUpdated')}</p>
        </div>
      </header>

      {/* Body */}
      <main className="privacy-body" id="privacy-main">
        <p className="privacy-intro">{t('rgpd.privacy.intro')}</p>

        {sections.map(({ title, body }) => (
          <section key={title} className="privacy-section">
            <h2 className="privacy-section__title">{title}</h2>
            <p className="privacy-section__body">{body}</p>
          </section>
        ))}
      </main>

      <PublicFooter />
    </div>
  );
}
