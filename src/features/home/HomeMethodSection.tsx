import React from 'react';
import { Lightbulb, Pencil, Code2, ShieldCheck, BarChart3, ArrowRight, type LucideIcon } from 'lucide-react';
import './home-method.css';

interface HomeMethodSectionProps {
  backgroundImage?: string | null;
  backgroundVideo?: string | null;
}

interface MethodStep {
  number: string;
  icon: LucideIcon;
  title: string;
  bullets: string[];
}

const METHOD_STEPS: MethodStep[] = [
  {
    number: '01',
    icon: Lightbulb,
    title: 'STRATÉGIE',
    bullets: ['Analyse de vos besoins', 'Cadrage du projet', 'Conseil technologique']
  },
  {
    number: '02',
    icon: Pencil,
    title: 'DESIGN',
    bullets: ['Expérience utilisateur', 'Interface moderne', 'Prototypage rapide']
  },
  {
    number: '03',
    icon: Code2,
    title: 'DÉVELOPPEMENT',
    bullets: ['Architecture robuste', 'Code de qualité', 'Intégration continue']
  },
  {
    number: '04',
    icon: ShieldCheck,
    title: 'TEST & SÉCURITÉ',
    bullets: ['Tests approfondis', 'Sécurité intégrée', 'Performance optimisée']
  },
  {
    number: '05',
    icon: BarChart3,
    title: 'DÉPLOIEMENT & SCALE',
    bullets: ['Mise en production', 'Suivi et maintenance', 'Accompagnement de la croissance']
  }
];

export function HomeMethodSection({ backgroundImage, backgroundVideo }: HomeMethodSectionProps) {
  const hasBg = Boolean(backgroundImage || backgroundVideo);

  return (
    <section
      className={`tech-method${hasBg ? ' tech-method--has-bg' : ''}`}
      id="methode"
      aria-label="Notre méthode"
      style={backgroundImage && !backgroundVideo ? { backgroundImage: `url("${backgroundImage}")` } : undefined}
    >
      {backgroundVideo ? (
        <div className="tech-method__bg-video-wrap" aria-hidden="true">
          <video
            className="tech-method__bg-video"
            src={backgroundVideo}
            poster={backgroundImage || undefined}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="tech-method__bg-video-overlay" />
        </div>
      ) : null}

      <div className="tech-method__container">
        {/* TOP ROW: Header info on left + 3D Isometric Cube on right */}
        <div className="tech-method__hero-row">
          <div className="tech-method__copy">
            {/* Tag / Eyebrow with extending blue line */}
            <div className="tech-method__tag-wrapper">
              <span className="tech-method__tag">(B) — NOTRE MÉTHODE</span>
              <div className="tech-method__tag-line" aria-hidden="true" />
            </div>

            <h2 className="tech-method__title">
              De l’idée au produit, <br />
              avec une <span className="tech-method__title-accent">méthode claire.</span>
            </h2>

            <p className="tech-method__sub">
              Nous combinons stratégie, design et ingénierie pour transformer chaque idée en solution numérique performante, fiable et évolutive.
            </p>
          </div>

          {/* 3D Visual on right */}
          <div className="tech-method__visual" aria-hidden="true">
            <div className="tech-method__cube-glow" />
            <img
              src="/images/method-3d-cube.png"
              alt="DynesisTech Méthode 3D"
              className="tech-method__cube-img"
              loading="lazy"
            />
          </div>
        </div>

        {/* 5 METHOD STEPS */}
        <div className="tech-method__steps-track" role="list">
          {METHOD_STEPS.map((step, index) => {
            const IconComponent = step.icon;
            const isLast = index === METHOD_STEPS.length - 1;

            return (
              <React.Fragment key={step.number}>
                <div className="tech-method__card" role="listitem">
                  <div className="tech-method__card-header">
                    <span className="tech-method__card-number">{step.number}</span>
                    <div className="tech-method__card-icon-wrap" aria-hidden="true">
                      <IconComponent size={19} className="tech-method__card-icon" />
                    </div>
                  </div>

                  <h3 className="tech-method__card-title">{step.title}</h3>
                  <div className="tech-method__card-accent-line" aria-hidden="true" />

                  <ul className="tech-method__card-list">
                    {step.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="tech-method__card-item">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                {!isLast ? (
                  <div className="tech-method__arrow" aria-hidden="true">
                    <ArrowRight size={20} />
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>

        {/* BOTTOM BRAND BAR */}
        <div className="tech-method__footer-bar" aria-hidden="true">
          <div className="tech-method__footer-line" />
          <span className="tech-method__footer-phrase">
            VOS IDÉES. NOTRE EXPERTISE. UN IMPACT DURABLE.
          </span>
          <div className="tech-method__footer-line" />
          <div className="tech-method__footer-badge">
            <span className="tech-method__footer-dot" />
            <span className="tech-method__footer-tagline">DE L’IDÉE À DEMAIN</span>
          </div>
        </div>
      </div>
    </section>
  );
}
