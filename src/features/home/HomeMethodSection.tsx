import React, { useState } from 'react';
import { 
  Lightbulb, 
  Pencil, 
  Code2, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight, 
  Globe, 
  Lock, 
  RefreshCw, 
  ChevronRight, 
  Terminal, 
  Layers, 
  Play,
  CheckCircle2,
  Zap,
  Activity,
  Cpu,
  Server,
  type LucideIcon 
} from 'lucide-react';
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

  // Simulation Interactive States
  const [topTab, setTopTab] = useState<'dashboard' | 'terminal' | 'deploy'>('dashboard');
  const [sidebarTab, setSidebarTab] = useState<'code' | 'analytics' | 'security' | 'apis'>('code');
  const [activeCodeFile, setActiveCodeFile] = useState<'index.ts' | 'server.ts' | 'ai.ts'>('index.ts');
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [activeCliCommand, setActiveCliCommand] = useState<string | null>(null);
  const [apiPings, setApiPings] = useState<{ [key: string]: number }>({
    '/api/v1/auth': 12,
    '/api/v1/neural-nodes': 8,
    '/api/v1/deploy': 18
  });

  function handleReload() {
    setIsReloading(true);
    setTimeout(() => setIsReloading(false), 800);
  }

  function handleRunCode() {
    if (isRunningCode) return;
    setIsRunningCode(true);
    setTimeout(() => {
      setIsRunningCode(false);
    }, 1200);
  }

  function handlePingTest(endpoint: string) {
    const newLatency = Math.floor(Math.random() * 12) + 6;
    setApiPings((prev) => ({ ...prev, [endpoint]: newLatency }));
  }

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
        {/* TOP ROW: Header info on left + Interactive Browser Simulation on right */}
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

          {/* Browser Simulation */}
          <div className="tech-method__visual tech-method__visual--browser" aria-label="Simulation navigateur Dynesis">
            <div className="tech-method__cube-glow" />
            <div className="method-browser">
              {/* Title Bar */}
              <div className="method-browser__titlebar">
                <div className="method-browser__titlebar-left">
                  <div className="method-browser__dots">
                    <span className="method-browser__dot method-browser__dot--red" title="Fermer" />
                    <span className="method-browser__dot method-browser__dot--yellow" title="Réduire" />
                    <span className="method-browser__dot method-browser__dot--green" title="Agrandir" />
                  </div>
                  <img src="/images/dynesistech.png" alt="Dynesis" className="method-browser__brand-logo" />
                </div>
                <div className="method-browser__address">
                  <Lock size={10} className="method-browser__lock" />
                  <span>app.dynesis.tech/{topTab === 'dashboard' ? sidebarTab : topTab}</span>
                </div>
                <button 
                  type="button" 
                  className={`method-browser__actions ${isReloading ? 'method-browser__actions--spinning' : ''}`}
                  onClick={handleReload}
                  aria-label="Recharger"
                >
                  <RefreshCw size={11} />
                </button>
              </div>

              {/* Tab Bar */}
              <div className="method-browser__tabs">
                <button
                  type="button"
                  className={`method-browser__tab ${topTab === 'dashboard' ? 'method-browser__tab--active' : ''}`}
                  onClick={() => setTopTab('dashboard')}
                >
                  <Globe size={11} />
                  <span>Dashboard</span>
                </button>
                <button
                  type="button"
                  className={`method-browser__tab ${topTab === 'terminal' ? 'method-browser__tab--active' : ''}`}
                  onClick={() => setTopTab('terminal')}
                >
                  <Terminal size={11} />
                  <span>Terminal</span>
                </button>
                <button
                  type="button"
                  className={`method-browser__tab ${topTab === 'deploy' ? 'method-browser__tab--active' : ''}`}
                  onClick={() => setTopTab('deploy')}
                >
                  <Layers size={11} />
                  <span>Deploy</span>
                </button>
              </div>

              {/* Screen Content */}
              <div className="method-browser__screen">
                {/* 1. VIEW FOR DASHBOARD */}
                {topTab === 'dashboard' && (
                  <>
                    {/* Sidebar */}
                    <div className="method-browser__sidebar">
                      <button
                        type="button"
                        className={`method-browser__sidebar-item ${sidebarTab === 'code' ? 'method-browser__sidebar-item--active' : ''}`}
                        onClick={() => setSidebarTab('code')}
                      >
                        <Code2 size={12} />
                        <span>Code</span>
                      </button>
                      <button
                        type="button"
                        className={`method-browser__sidebar-item ${sidebarTab === 'analytics' ? 'method-browser__sidebar-item--active' : ''}`}
                        onClick={() => setSidebarTab('analytics')}
                      >
                        <BarChart3 size={12} />
                        <span>Analytics</span>
                      </button>
                      <button
                        type="button"
                        className={`method-browser__sidebar-item ${sidebarTab === 'security' ? 'method-browser__sidebar-item--active' : ''}`}
                        onClick={() => setSidebarTab('security')}
                      >
                        <ShieldCheck size={12} />
                        <span>Security</span>
                      </button>
                      <button
                        type="button"
                        className={`method-browser__sidebar-item ${sidebarTab === 'apis' ? 'method-browser__sidebar-item--active' : ''}`}
                        onClick={() => setSidebarTab('apis')}
                      >
                        <Layers size={12} />
                        <span>APIs</span>
                      </button>
                    </div>

                    {/* Main Area */}
                    <div className="method-browser__main">
                      {sidebarTab === 'code' && (
                        <>
                          {/* Code Preview Header with File Switcher */}
                          <div className="method-browser__code">
                            <div className="method-browser__code-header">
                              <div className="method-browser__file-tabs">
                                <button
                                  type="button"
                                  className={`method-browser__file-tab ${activeCodeFile === 'index.ts' ? 'method-browser__file-tab--active' : ''}`}
                                  onClick={() => setActiveCodeFile('index.ts')}
                                >
                                  index.ts
                                </button>
                                <button
                                  type="button"
                                  className={`method-browser__file-tab ${activeCodeFile === 'server.ts' ? 'method-browser__file-tab--active' : ''}`}
                                  onClick={() => setActiveCodeFile('server.ts')}
                                >
                                  server.ts
                                </button>
                                <button
                                  type="button"
                                  className={`method-browser__file-tab ${activeCodeFile === 'ai.ts' ? 'method-browser__file-tab--active' : ''}`}
                                  onClick={() => setActiveCodeFile('ai.ts')}
                                >
                                  ai.ts
                                </button>
                              </div>
                              <button
                                type="button"
                                className="method-browser__run-btn"
                                onClick={handleRunCode}
                                disabled={isRunningCode}
                              >
                                <Play size={9} />
                                <span>{isRunningCode ? 'Compilation...' : 'Run'}</span>
                              </button>
                            </div>

                            <div className="method-browser__code-body">
                              {activeCodeFile === 'index.ts' && (
                                <>
                                  <span className="method-browser__ln">1</span><span className="method-browser__kw">import</span> {'{ createApp }'} <span className="method-browser__kw">from</span> <span className="method-browser__str">'dynesis'</span>;
                                  <br />
                                  <span className="method-browser__ln">2</span><span className="method-browser__kw">const</span> app = <span className="method-browser__fn">createApp</span>();
                                  <br />
                                  <span className="method-browser__ln">3</span>app.<span className="method-browser__fn">deploy</span>(<span className="method-browser__str">'production'</span>);
                                </>
                              )}
                              {activeCodeFile === 'server.ts' && (
                                <>
                                  <span className="method-browser__ln">1</span><span className="method-browser__kw">import</span> {'{ Fastify }'} <span className="method-browser__kw">from</span> <span className="method-browser__str">'dynesis/server'</span>;
                                  <br />
                                  <span className="method-browser__ln">2</span><span className="method-browser__kw">const</span> server = <span className="method-browser__fn">createEdgeNode</span>();
                                  <br />
                                  <span className="method-browser__ln">3</span>server.<span className="method-browser__fn">listen</span>({'{ port: 443 }'});
                                </>
                              )}
                              {activeCodeFile === 'ai.ts' && (
                                <>
                                  <span className="method-browser__ln">1</span><span className="method-browser__kw">import</span> {'{ NeuralEngine }'} <span className="method-browser__kw">from</span> <span className="method-browser__str">'dynesis/ai'</span>;
                                  <br />
                                  <span className="method-browser__ln">2</span><span className="method-browser__kw">const</span> ai = <span className="method-browser__fn">initNeuralCore</span>();
                                  <br />
                                  <span className="method-browser__ln">3</span><span className="method-browser__kw">await</span> ai.<span className="method-browser__fn">predictStream</span>();
                                </>
                              )}
                            </div>
                          </div>

                          {/* Terminal Output */}
                          <div className="method-browser__terminal">
                            <div className="method-browser__term-header">
                              <Terminal size={9} />
                              <span>Terminal</span>
                              {isRunningCode && <span className="method-browser__term-spinner" />}
                            </div>
                            <div className="method-browser__term-body">
                              <div><span className="method-browser__term-prompt">$</span> dynesis deploy --prod</div>
                              <div className="method-browser__term-ok"><ChevronRight size={9} /> Build réussi en 4.2s</div>
                              <div className="method-browser__term-ok"><ChevronRight size={9} /> Déploiement → production ✓</div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Analytics Tab */}
                      {sidebarTab === 'analytics' && (
                        <div className="method-browser__analytics-view">
                          <div className="method-browser__analytics-header">
                            <span>SURVEILLANCE DU TRAFIC EN TEMPS RÉEL</span>
                            <span className="method-browser__live-badge">LIVE</span>
                          </div>
                          <div className="method-browser__analytics-grid">
                            <div className="method-browser__analytics-card">
                              <span className="method-browser__analytics-card-lbl">Requêtes/sec</span>
                              <span className="method-browser__analytics-card-val">3,420 <span className="method-browser__positive">+14%</span></span>
                            </div>
                            <div className="method-browser__analytics-card">
                              <span className="method-browser__analytics-card-lbl">Cache Hit Ratio</span>
                              <span className="method-browser__analytics-card-val">99.4%</span>
                            </div>
                          </div>
                          <div className="method-browser__sparkline-wrap">
                            <div className="method-browser__sparkline-bar" style={{ height: '40%' }} />
                            <div className="method-browser__sparkline-bar" style={{ height: '65%' }} />
                            <div className="method-browser__sparkline-bar" style={{ height: '55%' }} />
                            <div className="method-browser__sparkline-bar" style={{ height: '80%' }} />
                            <div className="method-browser__sparkline-bar" style={{ height: '70%' }} />
                            <div className="method-browser__sparkline-bar" style={{ height: '95%' }} />
                            <div className="method-browser__sparkline-bar" style={{ height: '85%' }} />
                            <div className="method-browser__sparkline-bar" style={{ height: '100%' }} />
                          </div>
                        </div>
                      )}

                      {/* Security Tab */}
                      {sidebarTab === 'security' && (
                        <div className="method-browser__sec-view">
                          <div className="method-browser__sec-item">
                            <ShieldCheck size={14} className="method-browser__sec-icon--green" />
                            <div className="method-browser__sec-info">
                              <span className="method-browser__sec-title">Bouclier DDoS & WAF</span>
                              <span className="method-browser__sec-sub">Actif • 0 menace détectée</span>
                            </div>
                            <span className="method-browser__sec-tag">100% OK</span>
                          </div>
                          <div className="method-browser__sec-item">
                            <Lock size={14} className="method-browser__sec-icon--blue" />
                            <div className="method-browser__sec-info">
                              <span className="method-browser__sec-title">Certificat SSL TLS 1.3</span>
                              <span className="method-browser__sec-sub">Chiffrement AES 256-bit</span>
                            </div>
                            <span className="method-browser__sec-tag">VALIDÉ</span>
                          </div>
                          <div className="method-browser__sec-item">
                            <Zap size={14} className="method-browser__sec-icon--purple" />
                            <div className="method-browser__sec-info">
                              <span className="method-browser__sec-title">Audit Zero-Trust</span>
                              <span className="method-browser__sec-sub">Conformité ISO 27001</span>
                            </div>
                            <span className="method-browser__sec-tag">CONFORME</span>
                          </div>
                        </div>
                      )}

                      {/* APIs Tab */}
                      {sidebarTab === 'apis' && (
                        <div className="method-browser__apis-view">
                          <div className="method-browser__api-row">
                            <span className="method-browser__api-method method-browser__api-method--post">POST</span>
                            <span className="method-browser__api-path">/api/v1/auth</span>
                            <button
                              type="button"
                              className="method-browser__api-test-btn"
                              onClick={() => handlePingTest('/api/v1/auth')}
                            >
                              Test: {apiPings['/api/v1/auth']}ms
                            </button>
                          </div>
                          <div className="method-browser__api-row">
                            <span className="method-browser__api-method method-browser__api-method--get">GET</span>
                            <span className="method-browser__api-path">/api/v1/neural-nodes</span>
                            <button
                              type="button"
                              className="method-browser__api-test-btn"
                              onClick={() => handlePingTest('/api/v1/neural-nodes')}
                            >
                              Test: {apiPings['/api/v1/neural-nodes']}ms
                            </button>
                          </div>
                          <div className="method-browser__api-row">
                            <span className="method-browser__api-method method-browser__api-method--post">POST</span>
                            <span className="method-browser__api-path">/api/v1/deploy</span>
                            <button
                              type="button"
                              className="method-browser__api-test-btn"
                              onClick={() => handlePingTest('/api/v1/deploy')}
                            >
                              Test: {apiPings['/api/v1/deploy']}ms
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Metrics Row */}
                      <div className="method-browser__metrics">
                        <div className="method-browser__stat">
                          <span className="method-browser__stat-val">99.9%</span>
                          <span className="method-browser__stat-lbl">Uptime</span>
                        </div>
                        <div className="method-browser__stat">
                          <span className="method-browser__stat-val">24ms</span>
                          <span className="method-browser__stat-lbl">Latence</span>
                        </div>
                        <div className="method-browser__stat">
                          <span className="method-browser__stat-val">A+</span>
                          <span className="method-browser__stat-lbl">Score</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* 2. VIEW FOR TERMINAL */}
                {topTab === 'terminal' && (
                  <div className="method-browser__full-terminal">
                    <div className="method-browser__cli-actions">
                      <button
                        type="button"
                        className="method-browser__cli-pill"
                        onClick={() => setActiveCliCommand('test')}
                      >
                        $ dynesis test
                      </button>
                      <button
                        type="button"
                        className="method-browser__cli-pill"
                        onClick={() => setActiveCliCommand('build')}
                      >
                        $ dynesis build
                      </button>
                      <button
                        type="button"
                        className="method-browser__cli-pill"
                        onClick={() => setActiveCliCommand('health')}
                      >
                        $ dynesis health
                      </button>
                    </div>
                    <div className="method-browser__cli-output">
                      <div className="method-browser__cli-line"><span className="method-browser__term-prompt">$</span> dynesis cloud --cluster=eu-west-1</div>
                      <div className="method-browser__cli-line method-browser__cli-line--success">✔ Cluster synchronisé: 18 nœuds actifs</div>
                      <div className="method-browser__cli-line method-browser__cli-line--info">ℹ Nœuds neurones IA: 100% opérationnels</div>
                      {activeCliCommand === 'test' && (
                        <>
                          <div className="method-browser__cli-line method-browser__cli-line--warning">▶ Exécution de 52 tests unitaires & e2e...</div>
                          <div className="method-browser__cli-line method-browser__cli-line--success">✔ 52/52 tests passés en 1.14s (0 fail)</div>
                        </>
                      )}
                      {activeCliCommand === 'build' && (
                        <>
                          <div className="method-browser__cli-line method-browser__cli-line--info">▶ Compilation des bundles Vite & Edge Workers...</div>
                          <div className="method-browser__cli-line method-browser__cli-line--success">✔ Bundle généré: 48kb gzip • Optimisé</div>
                        </>
                      )}
                      {activeCliCommand === 'health' && (
                        <>
                          <div className="method-browser__cli-line method-browser__cli-line--success">✔ RAM: 1.2GB/8GB • CPU: 12% • Latence: 9ms</div>
                        </>
                      )}
                      <div className="method-browser__cli-line">
                        <span className="method-browser__term-prompt">$</span> <span className="method-browser__cursor-blink">_</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. VIEW FOR DEPLOY */}
                {topTab === 'deploy' && (
                  <div className="method-browser__pipeline-view">
                    <div className="method-browser__pipe-title">PIPELINE CI/CD AUTOMATISÉ</div>
                    <div className="method-browser__pipe-steps">
                      <div className="method-browser__pipe-step method-browser__pipe-step--done">
                        <CheckCircle2 size={13} />
                        <span>1. Code Push</span>
                      </div>
                      <div className="method-browser__pipe-step method-browser__pipe-step--done">
                        <CheckCircle2 size={13} />
                        <span>2. Tests & Lint</span>
                      </div>
                      <div className="method-browser__pipe-step method-browser__pipe-step--done">
                        <CheckCircle2 size={13} />
                        <span>3. Build Docker</span>
                      </div>
                      <div className="method-browser__pipe-step method-browser__pipe-step--active">
                        <Zap size={13} />
                        <span>4. Global CDN</span>
                      </div>
                    </div>
                    <div className="method-browser__pipe-status">
                      <span className="method-browser__pipe-badge">DÉPLOYÉ EN 4.2 SECONDES</span>
                      <span className="method-browser__pipe-sub">Réseau Edge Mondial Connecté</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
