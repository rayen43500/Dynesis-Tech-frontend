import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './cookie-consent.css';

const CONSENT_KEY = 'dynesis_cookie_consent';

type ConsentValue = 'accepted' | 'declined' | null;

export function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentValue;
    if (!stored) {
      // small delay so the page is rendered first
      const id = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(id);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-modal="false"
      aria-label={t('rgpd.consent.title')}
    >
      <div className="cookie-consent__inner">
        <div className="cookie-consent__text">
          <p className="cookie-consent__title">{t('rgpd.consent.title')}</p>
          <p className="cookie-consent__desc">
            {t('rgpd.consent.description')}{' '}
            <Link to="/privacy-policy" className="cookie-consent__link" onClick={() => setVisible(false)}>
              {t('rgpd.consent.privacyLink')}
            </Link>
          </p>
        </div>
        <div className="cookie-consent__actions">
          <button
            id="cookie-decline-btn"
            className="cookie-consent__btn cookie-consent__btn--outline"
            onClick={decline}
          >
            {t('rgpd.consent.decline')}
          </button>
          <button
            id="cookie-accept-btn"
            className="cookie-consent__btn cookie-consent__btn--primary"
            onClick={accept}
          >
            {t('rgpd.consent.accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
