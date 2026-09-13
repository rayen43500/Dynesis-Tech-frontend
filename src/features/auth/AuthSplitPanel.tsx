import React from 'react';
import { useTranslation } from 'react-i18next';

import { useBrandingContent } from '../../shared/hooks/useSiteContent';

type AuthSplitPanelProps = {
  variant: 'login' | 'register';
};

const TRUSTED_LOGOS = ['Meridian', 'NovaScale', 'Helix', 'Aperture'];

const AVATARS = {
  login: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  register: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
} as const;

function isVideoUrl(url?: string): boolean {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url) || url.includes('/video/upload/');
}

export function AuthSplitPanel({ variant }: AuthSplitPanelProps) {
  const { t } = useTranslation();
  const branding = useBrandingContent();
  const prefix = `auth.splitPanel.${variant}`;

  const authVideo = branding.authBackgroundVideo || (isVideoUrl(branding.authBackgroundImage) ? branding.authBackgroundImage : '');
  const authImage = isVideoUrl(branding.authBackgroundImage) ? '' : branding.authBackgroundImage;

  return (
    <aside
      className={`auth-split__right${(authImage || authVideo) ? ' auth-split__right--custom-bg' : ''}`}
      aria-label={t('auth.splitPanel.trusted')}
      style={authImage && !authVideo ? {
        backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.72), rgba(6, 15, 28, 0.88)), url("${authImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : undefined}
    >
      {authVideo ? (
        <div className="auth-split__bg-video-wrap" aria-hidden="true">
          <video
            className="auth-split__bg-video"
            src={authVideo}
            poster={authImage || undefined}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="auth-split__bg-video-overlay" />
        </div>
      ) : null}
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
