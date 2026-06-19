import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useDeveloperProfile, type DeveloperPortfolioProject } from './hooks';
import { useI18n } from '../../app/providers/I18nProvider';
import { resolveDeveloperPhoto, resolveMediaUrl } from '../../shared/utils/resolveMediaUrl';
import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import { EmptyState } from '../../shared/ui/feedback/EmptyState';
import './developers.css';

function PortfolioOverlay({
  project,
  onClose
}: {
  project: DeveloperPortfolioProject;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const images = project.images;
  const activeImage = images[activeIndex] || images[0];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div className="dev-overlay" role="dialog" aria-modal="true" aria-label={project.title}>
      <button type="button" className="dev-overlay__close" onClick={onClose} aria-label={t('common.close')}>
        ×
      </button>

      <div className="dev-overlay__gallery">
        <img className="dev-overlay__main-image" src={resolveMediaUrl(activeImage)} alt={project.title} />
        <div className="dev-overlay__thumbs">
          {images.map((img, idx) => (
            <img
              key={img}
              src={resolveMediaUrl(img)}
              alt=""
              className={`dev-overlay__thumb${idx === activeIndex ? ' dev-overlay__thumb--active' : ''}`}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      </div>

      <aside className="dev-overlay__details">
        <h2 className="dev-overlay__title">{project.title}</h2>
        <div className="dev-overlay__pills">
          {project.technologies.map((tech) => (
            <span key={tech} className="dev-overlay__pill">
              {tech}
            </span>
          ))}
        </div>

        {(
          [
            ['overview', project.overview],
            ['projectBrief', project.brief],
            ['challenges', project.challenges],
            ['solutions', project.solutions],
            ['outcomes', project.outcomes]
          ] as const
        ).map(([key, text]) => (
          <div key={key}>
            <p className="dev-overlay__section-label">{t(`developers.profile.${key}`)}</p>
            <p className="dev-overlay__section-text">{text}</p>
          </div>
        ))}
      </aside>
    </div>
  );
}

function CollapsibleSection({
  title,
  children,
  defaultOpen = false
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="dev-profile__collapse">
      <button
        type="button"
        className="dev-profile__collapse-header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <h2 className="dev-profile__section-title">{title}</h2>
        <span
          className={`dev-profile__collapse-chevron${open ? ' dev-profile__collapse-chevron--open' : ''}`}
          aria-hidden
        >
          ∧
        </span>
      </button>
      {open ? <div className="dev-profile__collapse-body">{children}</div> : null}
    </div>
  );
}

export function DeveloperProfilePage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { language } = useI18n();
  const query = useDeveloperProfile(id, language);
  const [selectedProject, setSelectedProject] = useState<DeveloperPortfolioProject | null>(null);
  const [portfolioIndex, setPortfolioIndex] = useState(0);

  useEffect(() => {
    setSelectedProject(null);
    setPortfolioIndex(0);
  }, [id]);

  if (query.isLoading) return <LoadingState label={t('developers.profile.loading')} />;

  if (query.isError || !query.data) {
    return (
      <div className="dev-profile">
        <EmptyState
          title={t('developers.profile.notFound.title')}
          description={t('developers.profile.notFound.sub')}
          badge="404"
        />
        <Link to="/developers">{t('developers.profile.back')}</Link>
      </div>
    );
  }

  const developer = query.data;

  const firstName = developer.fullName.split(' ')[0];
  const projects = developer.portfolioProjects;
  const visibleProjects = projects.slice(portfolioIndex, portfolioIndex + 2);
  const expertiseTags = (developer.expertiseTags || []).filter((tag) => tag && String(tag).trim());
  const biography = (developer.biography || '').trim();
  const profilePhoto =
    resolveDeveloperPhoto(developer) || `https://i.pravatar.cc/400?u=${encodeURIComponent(developer.id)}`;

  return (
    <div className="dev-profile">
      <header className="dev-profile__header">
        <div>
          <img className="dev-profile__photo" src={profilePhoto} alt={developer.fullName} />
          <div className="dev-profile__availability">
            <p className="dev-profile__availability-text">
              {t('developers.profile.available', { name: firstName })}
            </p>
            <Link to="/contact" className="dev-profile__hire-btn">
              {t('developers.profile.hire', { name: firstName })}
            </Link>
          </div>
        </div>

        <div>
          <h1 className="dev-profile__name">{developer.fullName}</h1>
          <div className="dev-profile__verified">
            <span className="dev-profile__verified-icon" aria-hidden>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
                  fill="#3A8A3A"
                />
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            </span>
            <span className="dev-profile__verified-text">
              <span className="dev-profile__verified-strong">{t('developers.directory.verified')}</span>
              <span className="dev-profile__verified-light">{t('developers.profile.verifiedIn')}</span>
            </span>
          </div>

          <div className="dev-profile__info-row">
            <span aria-hidden>◇</span>
            {developer.roleTitle}
          </div>
          <div className="dev-profile__info-row">
            <span aria-hidden>📍</span>
            {developer.location}
          </div>
          <div className="dev-profile__info-row">
            <span aria-hidden>📅</span>
            {t('developers.profile.memberSince', { year: developer.memberSince })}
          </div>

          {expertiseTags.length > 0 ? (
            <>
              <p className="dev-profile__section-label">{t('developers.profile.expertise')}</p>
              <div className="dev-profile__expertise">
                {expertiseTags.map((tag) => (
                  <span key={tag} className="dev-profile__expertise-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </>
          ) : null}

          {biography ? (
            <>
              <p className="dev-profile__section-label">{t('developers.profile.bio')}</p>
              <p className="dev-profile__bio">{biography}</p>
            </>
          ) : null}
        </div>
      </header>

      <section className="dev-profile__section">
        <div className="dev-profile__section-header">
          <h2 className="dev-profile__section-title">{t('developers.profile.portfolio')}</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              className={`dev-profile__nav-btn${portfolioIndex > 0 ? ' dev-profile__nav-btn--active' : ''}`}
              onClick={() => setPortfolioIndex((i) => Math.max(0, i - 1))}
              disabled={portfolioIndex === 0}
              aria-label={t('developers.profile.prevProjects')}
            >
              ‹
            </button>
            <button
              type="button"
              className={`dev-profile__nav-btn${
                portfolioIndex + 2 < projects.length ? ' dev-profile__nav-btn--active' : ''
              }`}
              onClick={() => setPortfolioIndex((i) => Math.min(projects.length - 2, i + 1))}
              disabled={portfolioIndex + 2 >= projects.length}
              aria-label={t('developers.profile.nextProjects')}
            >
              ›
            </button>
          </div>
        </div>

        <div className="dev-profile__portfolio-grid">
          {visibleProjects.map((project) => {
            const extra = project.technologies.length - 3;
            return (
              <button
                key={project.id}
                type="button"
                className="dev-project-card"
                onClick={() => setSelectedProject(project)}
              >
                <div className="dev-project-card__image-wrap">
                  <img
                    className="dev-project-card__image"
                    src={resolveMediaUrl(project.images[0])}
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="dev-project-card__overlay">
                    <span className="dev-project-card__link-icon" aria-hidden>
                      ↗
                    </span>
                  </div>
                  <div className="dev-project-card__title-bar">{project.title}</div>
                </div>
                <div className="dev-project-card__pills">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="dev-project-card__pill">
                      {tech}
                    </span>
                  ))}
                  {extra > 0 ? (
                    <span className="dev-project-card__pill dev-project-card__pill--more">
                      {t('developers.profile.moreProjects', { count: extra })}
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="dev-profile__section">
        <CollapsibleSection title={t('developers.profile.workExperience')} defaultOpen>
          <div className="dev-profile__timeline">
            {developer.experienceTimeline.map((item) => (
              <div key={`${item.company}-${item.years}`} className="dev-profile__timeline-item">
                <span className="dev-profile__timeline-dot" aria-hidden />
                <div className="dev-profile__timeline-top">
                  <span className="dev-profile__timeline-role">{item.role}</span>
                  <span className="dev-profile__timeline-dates">{item.years}</span>
                </div>
                <div className="dev-profile__timeline-company">{item.company}</div>
                <ul className="dev-profile__timeline-bullets">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="dev-profile__timeline-bullet">
                      <span className="dev-profile__timeline-bullet-dot" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <p className="dev-profile__timeline-tech">
                  {t('developers.profile.technologies', { list: item.technologies.join(', ') })}
                </p>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      </section>

      <CollapsibleSection title={t('developers.profile.education')}>
        {developer.education.map((edu) => (
          <div key={edu.school} className="dev-profile__info-row">
            <span>
              {edu.degree} — {edu.school} ({edu.year})
            </span>
          </div>
        ))}
      </CollapsibleSection>

      <CollapsibleSection title={t('developers.profile.skills')}>
        <div>
          {developer.skillYears.map(({ skill, years }) => (
            <span key={skill} className="dev-profile__pill">
              {skill} — {years} {years === 1 ? t('common.year') : t('common.years')}
            </span>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title={t('developers.profile.experience')}>
        <div>
          {developer.skillYears.map(({ skill, years }) => (
            <span key={skill} className="dev-profile__pill">
              {skill} — {years} {years === 1 ? t('common.year') : t('common.years')}
            </span>
          ))}
        </div>
      </CollapsibleSection>

      <div className="dev-profile__share">
        <span className="dev-profile__share-label">{t('developers.profile.share')}</span>
        <button type="button" className="dev-profile__share-btn" aria-label={t('developers.profile.shareTwitter')}>
          X
        </button>
        <button type="button" className="dev-profile__share-btn" aria-label={t('developers.profile.shareFacebook')}>
          f
        </button>
        <button type="button" className="dev-profile__share-btn" aria-label={t('developers.profile.shareLinkedin')}>
          in
        </button>
      </div>

      {selectedProject ? (
        <PortfolioOverlay project={selectedProject} onClose={() => setSelectedProject(null)} />
      ) : null}
    </div>
  );
}
