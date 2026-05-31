import React from 'react';
import { Link } from 'react-router-dom';

import { useDevelopersDirectory } from './hooks';
import { useI18n } from '../../app/providers/I18nProvider';
import { resolveDeveloperPhoto, resolveMediaUrl } from '../../shared/utils/resolveMediaUrl';
import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import { EmptyState } from '../../shared/ui/feedback/EmptyState';
import './developers.css';

export function DevelopersDirectoryPage() {
  const { language } = useI18n();
  const query = useDevelopersDirectory(language);

  if (query.isLoading) return <LoadingState label="Loading developers…" />;

  if (query.isError) {
    return (
      <EmptyState
        title="Unable to load developers"
        description="Please check your connection and try again."
        badge="Try again"
      />
    );
  }

  const developers = query.data || [];

  return (
    <div className="dev-directory">
      <div className="dev-directory__layout">
        <aside className="dev-directory__left">
          <h1 className="dev-directory__headline">Meet Our Developer Team</h1>
          <p className="dev-directory__subtext">
            Skilled, experienced engineers carefully selected for their craft, reliability, and ability to deliver
            production-grade code.
          </p>
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
                <span className="dev-card__photo-overlay">View full profile</span>
              </div>
              <div className="dev-card__body">
                <h2 className="dev-card__name">{dev.fullName}</h2>
                <div className="dev-card__verified">
                  <span className="dev-card__verified-icon" aria-hidden>
                    ✓
                  </span>
                  <span>Verified Expert</span>
                </div>
                <div className="dev-card__role">
                  <span className="dev-card__role-icon" aria-hidden>
                    ◇
                  </span>
                  <span>{dev.roleTitle}</span>
                </div>
                {dev.previouslyAt ? (
                  <>
                    <p className="dev-card__prev-label">Previously at</p>
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
            <EmptyState title="No developers yet" description="Check back soon." badge="Empty" />
          ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
