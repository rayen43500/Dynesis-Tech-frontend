import React from 'react';
import { useTranslation } from 'react-i18next';

type AuthSplitPanelProps = {
  variant: 'login' | 'register';
};

const TRUSTED_LOGOS = ['Meridian', 'NovaScale', 'Helix', 'Aperture'];

const AVATARS = {
  login: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  register: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
} as const;

export function AuthSplitPanel({ variant }: AuthSplitPanelProps) {
  const { t } = useTranslation();
  const prefix = `auth.splitPanel.${variant}`;

  return (
    <aside className="auth-split__right" aria-label={t('auth.splitPanel.trusted')}>
      <div className="auth-split__glow" aria-hidden />
      <div className="auth-split__right-inner">
        <div className="auth-right-top">
          <h2 className="auth-right-headline">
            {t(`${prefix}.headline1`)}
            <br />
            {t(`${prefix}.headline2`)}
          </h2>

          <div>
            <p className="auth-quote-mark" aria-hidden>
              "
            </p>
            <p className="auth-quote">{t(`${prefix}.quote`)}</p>
            <div className="auth-author">
              <img className="auth-avatar" src={AVATARS[variant]} alt="" />
              <div>
                <p className="auth-author-name">{t(`${prefix}.name`)}</p>
                <p className="auth-author-role">{t(`${prefix}.role`)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right-bottom">
        <hr className="auth-right-divider" />

        <div>
          <p className="auth-trusted-label">{t('auth.splitPanel.trusted')}</p>
          <div className="auth-logos">
            {TRUSTED_LOGOS.map((name) => (
              <span key={name} className="auth-logo-item">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
