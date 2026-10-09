import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Gauge, 
  Gem, 
  ShieldCheck, 
  TrendingUp, 
  Play, 
  ArrowRight, 
  Wifi, 
  Battery, 
  Bell, 
  Home, 
  Activity, 
  Zap, 
  Shield as ShieldIcon, 
  ArrowUpRight, 
  CheckCircle2, 
  X,
  Server,
  Cpu,
  type LucideIcon 
} from 'lucide-react';
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
    title: 'PERFORMANCE ABSOLUE',
    description: 'Des produits véloces et optimisés pour offrir une fluidité instantanée et maximiser l’engagement.'
  },
  {
    number: '02',
    icon: Gem,
    title: 'EXCELLENCE DU CODE',
    description: 'Une architecture propre, modulaire et couverte par des tests rigoureux, pensée pour durer.'
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'SÉCURITÉ & RÉSILIENCE',
    description: 'La sécurité intégrée dès la conception (Security by Design) et une conformité rigoureuse aux standards industriels.'
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'ÉVOLUTIVITÉ SANS LIMITE',
    description: 'Des systèmes modulaires et hautement scalables, capables de grandir harmonieusement avec vos ambitions.'
  }
];

export function HomeWhyDynesisSection({ backgroundImage, backgroundVideo }: HomeWhyDynesisSectionProps) {
  const hasBg = Boolean(backgroundImage || backgroundVideo);

  // Android Phone Interactive States
  const [phoneNav, setPhoneNav] = useState<'accueil' | 'stats' | 'perf'>('accueil');
  const [showNotifs, setShowNotifs] = useState(false);
  const [activeActionModal, setActiveActionModal] = useState<'build' | 'logs' | 'audit' | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildDone, setBuildDone] = useState(false);

  function handleTriggerBuild() {
    setActiveActionModal('build');
    setIsBuilding(true);
    setBuildDone(false);
    setTimeout(() => {
      setIsBuilding(false);
      setBuildDone(true);
    }, 1500);
  }

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
              Nous ne nous contentons pas de livrer du code. Nous forgeons des architectures pérennes, des interfaces sans friction et des infrastructures conçues pour soutenir durablement votre croissance.
            </p>

            <Link to="/services" className="tech-why__cta-link">
              <span className="tech-why__play-circle" aria-hidden="true">
                <Play size={11} className="tech-why__play-icon" />
              </span>
              <span className="tech-why__cta-text">DÉCOUVRIR NOTRE SAVOIR-FAIRE</span>
              <ArrowRight size={15} className="tech-why__arrow-icon" />
            </Link>
          </div>

          {/* Interactive Android Phone Simulation */}
          <div className="tech-why__visual tech-why__visual--phone" aria-label="Simulation application mobile Dynesis">
            <div className="tech-why__glow" />
            <div className="why-phone">
              <div className="why-phone__bezel">
                {/* Camera Notch */}
                <div className="why-phone__camera" />

                {/* Status Bar */}
                <div className="why-phone__status-bar">
                  <span className="why-phone__time">14:35</span>
                  <div className="why-phone__status-icons">
                    <span className="why-phone__5g">5G</span>
                    <Wifi size={11} />
                    <Battery size={12} />
                  </div>
                </div>

                {/* App Header */}
                <div className="why-phone__app-header">
                  <div className="why-phone__brand">
                    <img src="/images/dynesistech.png" alt="Dynesis Tech" className="why-phone__brand-logo-img" />
                    <div className="why-phone__brand-info">
                      <span className="why-phone__app-name">Dynesis Go</span>
                      <span className="why-phone__app-status">● Connecté</span>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="why-phone__notif" 
                    onClick={() => setShowNotifs(!showNotifs)}
                    aria-label="Notifications"
                  >
                    <Bell size={13} />
                    <span className="why-phone__notif-badge" />
                  </button>
                </div>

                {/* Notification Dropdown Drawer */}
                {showNotifs && (
                  <div className="why-phone__notif-drawer">
                    <div className="why-phone__notif-drawer-header">
                      <span>Notifications récentes</span>
                      <button type="button" onClick={() => setShowNotifs(false)}><X size={12} /></button>
                    </div>
                    <div className="why-phone__notif-item">
                      <span className="why-phone__notif-dot" />
                      <div>
                        <strong>Déploiement Cloud v3.4 réussi</strong>
                        <p>18 microservices opérationnels • 0 coupure</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Screen Body */}
                <div className="why-phone__screen">
                  {/* TAB 1: ACCUEIL */}
                  {phoneNav === 'accueil' && (
                    <>
                      {/* Hero Card */}
                      <div className="why-phone__hero-card">
                        <div className="why-phone__hero-top">
                          <span>INFRASTRUCTURE</span>
                          <span className="why-phone__live-chip">LIVE</span>
                        </div>
                        <div className="why-phone__hero-val">Plateforme Cloud</div>
                        <div className="why-phone__hero-sub">18 microservices • 99.99% uptime</div>
                        <div className="why-phone__quick-row">
                          <button 
                            type="button" 
                            className="why-phone__quick-btn"
                            onClick={handleTriggerBuild}
                          >
                            <Zap size={13} />
                            <span>Build</span>
                          </button>
                          <button 
                            type="button" 
                            className="why-phone__quick-btn"
                            onClick={() => setActiveActionModal('logs')}
                          >
                            <Activity size={13} />
                            <span>Logs</span>
                          </button>
                          <button 
                            type="button" 
                            className="why-phone__quick-btn"
                            onClick={() => setActiveActionModal('audit')}
                          >
                            <ShieldIcon size={13} />
                            <span>Audit</span>
                          </button>
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="why-phone__metrics">
                        <div className="why-phone__metric">
                          <span className="why-phone__metric-val">12ms</span>
                          <span className="why-phone__metric-lbl">Latence</span>
                        </div>
                        <div className="why-phone__metric">
                          <span className="why-phone__metric-val">3.2k</span>
                          <span className="why-phone__metric-lbl">Req/s</span>
                        </div>
                        <div className="why-phone__metric">
                          <span className="why-phone__metric-val">0</span>
                          <span className="why-phone__metric-lbl">Erreurs</span>
                        </div>
                      </div>

                      {/* Activity */}
                      <div className="why-phone__activity">
                        <div className="why-phone__act-item">
                          <div className="why-phone__act-dot why-phone__act-dot--green" />
                          <div className="why-phone__act-info">
                            <span className="why-phone__act-title">API Gateway synchronisée</span>
                            <span className="why-phone__act-time">Il y a 2 min</span>
                          </div>
                          <ArrowUpRight size={12} className="why-phone__act-arrow" />
                        </div>
                        <div className="why-phone__act-item">
                          <div className="why-phone__act-dot why-phone__act-dot--blue" />
                          <div className="why-phone__act-info">
                            <span className="why-phone__act-title">Deploy production v3.4</span>
                            <span className="why-phone__act-time">Il y a 8 min</span>
                          </div>
                          <ArrowUpRight size={12} className="why-phone__act-arrow" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* TAB 2: STATS */}
                  {phoneNav === 'stats' && (
                    <div className="why-phone__stats-view">
                      <div className="why-phone__stats-title">Ressources Serveur</div>
                      <div className="why-phone__stats-row">
                        <div className="why-phone__stat-box">
                          <Cpu size={14} className="text-cyan-400" />
                          <span className="why-phone__stat-box-val">14%</span>
                          <span className="why-phone__stat-box-lbl">CPU Global</span>
                        </div>
                        <div className="why-phone__stat-box">
                          <Server size={14} className="text-blue-400" />
                          <span className="why-phone__stat-box-val">1.2 GB</span>
                          <span className="why-phone__stat-box-lbl">Mémoire RAM</span>
                        </div>
                      </div>
                      <div className="why-phone__bandwidth-card">
                        <div className="why-phone__bw-header">
                          <span>Bande passante Edge</span>
                          <strong>240 MB/s</strong>
                        </div>
                        <div className="why-phone__bw-bar">
                          <div className="why-phone__bw-fill" style={{ width: '72%' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: PERF */}
                  {phoneNav === 'perf' && (
                    <div className="why-phone__perf-view">
                      <div className="why-phone__perf-title">Latence Nœuds Mondiaux</div>
                      <div className="why-phone__node-list">
                        <div className="why-phone__node-item">
                          <span>🇫🇷 Paris (EU-West)</span>
                          <strong className="text-emerald-400">8 ms</strong>
                        </div>
                        <div className="why-phone__node-item">
                          <span>🇬🇧 Londres (UK)</span>
                          <strong className="text-emerald-400">11 ms</strong>
                        </div>
                        <div className="why-phone__node-item">
                          <span>🇩🇪 Francfort (EU-Central)</span>
                          <strong className="text-emerald-400">14 ms</strong>
                        </div>
                        <div className="why-phone__node-item">
                          <span>🇺🇸 New York (US-East)</span>
                          <strong className="text-blue-400">26 ms</strong>
                        </div>
                        <div className="why-phone__node-item">
                          <span>🇯🇵 Tokyo (AP-East)</span>
                          <strong className="text-blue-400">62 ms</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Modal for Quick Actions */}
                  {activeActionModal && (
                    <div className="why-phone__action-overlay">
                      <div className="why-phone__action-modal">
                        <div className="why-phone__action-header">
                          <span>{activeActionModal.toUpperCase()}</span>
                          <button type="button" onClick={() => setActiveActionModal(null)}><X size={12} /></button>
                        </div>
                        <div className="why-phone__action-content">
                          {activeActionModal === 'build' && (
                            <div className="why-phone__build-box">
                              {isBuilding ? (
                                <div className="why-phone__spinner-wrap">
                                  <div className="why-phone__spinner" />
                                  <span>Compilation Android & Web...</span>
                                </div>
                              ) : (
                                <div className="why-phone__success-wrap">
                                  <CheckCircle2 size={24} className="text-emerald-400" />
                                  <strong>Build réussi (0 erreur)</strong>
                                  <p>Package signé et prêt au déploiement</p>
                                </div>
                              )}
                            </div>
                          )}
                          {activeActionModal === 'logs' && (
                            <div className="why-phone__logs-box">
                              <p>[14:35:01] ⚡ HTTP/2 Gateway live</p>
                              <p>[14:35:04] 🔐 TLS handshake 256-bit OK</p>
                              <p>[14:35:08] ✔ 18/18 microservices sync</p>
                            </div>
                          )}
                          {activeActionModal === 'audit' && (
                            <div className="why-phone__audit-box">
                              <div className="why-phone__audit-score">100 / 100</div>
                              <p>Sécurité & Vitesse validées A+</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Nav */}
                <div className="why-phone__bottom-nav">
                  <button 
                    type="button" 
                    className={`why-phone__nav-item ${phoneNav === 'accueil' ? 'why-phone__nav-item--active' : ''}`}
                    onClick={() => setPhoneNav('accueil')}
                  >
                    <Home size={15} />
                    <span>Accueil</span>
                  </button>
                  <button 
                    type="button" 
                    className={`why-phone__nav-item ${phoneNav === 'stats' ? 'why-phone__nav-item--active' : ''}`}
                    onClick={() => setPhoneNav('stats')}
                  >
                    <Activity size={15} />
                    <span>Stats</span>
                  </button>
                  <button 
                    type="button" 
                    className={`why-phone__nav-item ${phoneNav === 'perf' ? 'why-phone__nav-item--active' : ''}`}
                    onClick={() => setPhoneNav('perf')}
                  >
                    <Gauge size={15} />
                    <span>Perf</span>
                  </button>
                </div>

                {/* Gesture Bar */}
                <div className="why-phone__gesture-bar" />
              </div>
            </div>
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
            DES SOLUTIONS AUJOURD'HUI. UN IMPACT DURABLE.
          </span>
          <div className="tech-why__footer-line" />
          <div className="tech-why__footer-badge">
            <span className="tech-why__footer-dot" />
            <span className="tech-why__footer-tagline">FORGER L’AVENIR ENSEMBLE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
