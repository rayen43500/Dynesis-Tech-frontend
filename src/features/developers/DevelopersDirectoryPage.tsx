import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useDevelopersDirectory } from './hooks';
import { useI18n } from '../../app/providers/I18nProvider';
import { resolveDeveloperPhoto, resolveMediaUrl } from '../../shared/utils/resolveMediaUrl';
import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import { EmptyState } from '../../shared/ui/feedback/EmptyState';
import './developers.css';

export function DevelopersDirectoryPage() {
  const { t } = useTranslation();
  const { language } = useI18n();
  const query = useDevelopersDirectory(language);

  if (query.isLoading) return <LoadingState label={t('developers.directory.loading')} />;

  if (query.isError) {
    return (
      <EmptyState
        title={t('developers.directory.error.title')}
        description={t('developers.directory.error.sub')}
        badge={t('common.tryAgain')}
      />
    );
  }

  const developers = query.data || [];

  return (
    <div className="dev-directory">
      <div className="dev-directory__layout">
        <aside className="dev-directory__left">
          <h1 className="dev-directory__headline">{t('developers.directory.title')}</h1>
          <p className="dev-directory__subtext">{t('developers.directory.subtitle')}</p>
        </aside>

        <div className="dev-directory__right">
          <div className="dev-directory__map-bg" aria-hidden />
          <div className="dev-directory__grid">
          {developers.map((dev) => (
            <Link key={dev.id} to={`/developers/${dev.id}`} className="dev-card">
              <div className="dev-card__photo-wrap">
                <img
                  className="dev-card__photo"
                  src={resolveDeveloperPhoto(dev) || 'https://i.pravatar.cc/300?img=11'}
                  alt={dev.fullName}
                  loading="lazy"
                />
                <span className="dev-card__icon" aria-hidden>
                  ✦
                </span>
                <span className="dev-card__photo-overlay">{t('developers.directory.viewProfile')}</span>
              </div>
              <div className="dev-card__body">
                <h2 className="dev-card__name">{dev.fullName}</h2>
                <div className="dev-card__verified">
                  <span className="dev-card__verified-icon" aria-hidden>
                    ✓
                  </span>
                  <span>{t('developers.directory.verified')}</span>
                </div>
                <div className="dev-card__role">
                  <span className="dev-card__role-icon" aria-hidden>
                    ◇
                  </span>
                  <span>{dev.roleTitle}</span>
                </div>
                {dev.previouslyAt ? (
                  <>
                    <p className="dev-card__prev-label">{t('developers.directory.previouslyAt')}</p>
                    {dev.companyLogo ? (
                      <img
                        className="dev-card__company-logo"
                        src={resolveMediaUrl(dev.companyLogo)}
                        alt={dev.previouslyAt}
                        loading="lazy"
                      />
                    ) : (
                      <p className="dev-card__company-name">{dev.previouslyAt}</p>
                    )}
                  </>
                ) : null}
              </div>
            </Link>
          ))}

          {!developers.length ? (
            <EmptyState
              title={t('developers.directory.empty.title')}
              description={t('developers.directory.empty.sub')}
              badge={t('common.empty')}
            />
          ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
