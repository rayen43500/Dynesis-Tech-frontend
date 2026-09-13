import React from 'react';
import { Link } from 'react-router-dom';
import { Gauge, Gem, ShieldCheck, TrendingUp, Play, ArrowRight, type LucideIcon } from 'lucide-react';
import './home-why-dynesis.css';

interface HomeWhyDynesisSectionProps {
  backgroundImage?: string | null;
  backgroundVideo?: string | null;
}

interface PillarCard {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const PILLAR_CARDS: PillarCard[] = [
  {
    number: '01',
    icon: Gauge,
    title: 'PERFORMANCE',
    description: 'Des produits rapides et optimisés pour une expérience fluide.'
  },
  {
    number: '02',
    icon: Gem,
    title: 'QUALITÉ',
    description: 'Une architecture propre, testée et maintenable dans le temps.'
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'SÉCURITÉ',
    description: 'La sécurité intégrée à chaque étape du développement.'
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'ÉVOLUTIVITÉ',
    description: 'Des solutions prêtes à grandir avec vos ambitions.'
  }
];

export function HomeWhyDynesisSection({ backgroundImage, backgroundVideo }: HomeWhyDynesisSectionProps) {
  const hasBg = Boolean(backgroundImage || backgroundVideo);

  return (
    <section
      className={`tech-why${hasBg ? ' tech-why--has-bg' : ''}`}
      id="pourquoi-nous"
      aria-label="Pourquoi DynesisTech"
      style={backgroundImage && !backgroundVideo ? { backgroundImage: `url("${backgroundImage}")` } : undefined}
    >
      {backgroundVideo ? (
        <div className="tech-why__bg-video-wrap" aria-hidden="true">
          <video
            className="tech-why__bg-video"
            src={backgroundVideo}
            poster={backgroundImage || undefined}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="tech-why__bg-video-overlay" />
        </div>
      ) : null}

      <div className="tech-why__container">
        {/* TOP ROW: Content on Left + 3D Visual with Orbiting Badges on Right */}
        <div className="tech-why__hero-row">
          <div className="tech-why__copy">
            {/* Tag / Eyebrow with blue extending line */}
            <div className="tech-why__tag-wrapper">
              <span className="tech-why__tag">(C) — POURQUOI DYNESISTECH</span>
              <div className="tech-why__tag-line" aria-hidden="true" />
            </div>

            <h2 className="tech-why__title">
              Une ingénierie <br />
              pensée pour <span className="tech-why__title-accent">durer.</span>
            </h2>

            <p className="tech-why__sub">
              Nous ne nous contentons pas de développer des fonctionnalités. Nous construisons des produits numériques rapides, fiables et conçus pour évoluer avec votre entreprise.
            </p>

            <Link to="/services" className="tech-why__cta-link">
              <span className="tech-why__play-circle" aria-hidden="true">
                <Play size={11} className="tech-why__play-icon" />
              </span>
              <span className="tech-why__cta-text">DÉCOUVRIR NOTRE APPROCHE</span>
              <ArrowRight size={15} className="tech-why__arrow-icon" />
            </Link>
          </div>

          {/* 3D Isometric Visual with Orbiting Satellite Badges */}
          <div className="tech-why__visual" aria-hidden="true">
            <div className="tech-why__glow" />
            <img
              src="/images/why-dynesis-3d.png"
              alt="DynesisTech Ingénierie 3D"
              className="tech-why__cube-img"
              loading="lazy"
            />
          </div>
        </div>

        {/* 4 PILLAR CARDS */}
        <div className="tech-why__pillars-grid" role="list">
          {PILLAR_CARDS.map((card) => {
            const IconComponent = card.icon;

            return (
              <div className="tech-why__card" role="listitem" key={card.number}>
                <div className="tech-why__card-header">
                  <span className="tech-why__card-number">{card.number}</span>
                  <div className="tech-why__card-icon-wrap" aria-hidden="true">
                    <IconComponent size={20} className="tech-why__card-icon" />
                  </div>
                </div>

                <h3 className="tech-why__card-title">{card.title}</h3>
                <div className="tech-why__card-accent-line" aria-hidden="true" />

                <p className="tech-why__card-desc">{card.description}</p>
              </div>
            );
          })}
        </div>

        {/* BOTTOM BRAND FOOTER BAR */}
        <div className="tech-why__footer-bar" aria-hidden="true">
          <div className="tech-why__footer-line" />
          <span className="tech-why__footer-phrase">
            DES SOLUTIONS AUJOURD'HUI. UN IMPACT DEMAIN.
          </span>
          <div className="tech-why__footer-line" />
          <div className="tech-why__footer-badge">
            <span className="tech-why__footer-dot" />
            <span className="tech-why__footer-tagline">CONSTRUIRE L’AVENIR ENSEMBLE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
