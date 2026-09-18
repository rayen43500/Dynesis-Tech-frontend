import React, { useState } from 'react';
import { 
  Search, 
  Shield, 
  Zap, 
  ArrowUpRight, 
  Cpu, 
  Activity, 
  Wifi, 
  Battery, 
  Bell, 
  Home, 
  FolderGit2, 
  Terminal,
  CheckCircle2
} from 'lucide-react';
import './home-device-simulation.css';

/* Uiverse 3D Animated Folder Card Component */
export function UiverseFolderCard({ id = 'hero-folder-toggle' }: { id?: string }) {
  return (
    <label className="folder-card" htmlFor={id}>
      <input type="checkbox" id={id} className="folder-toggle" />

      <div className="hint-wrapper">
        <span className="hint-text">Click to open</span>
        <svg
          className="hint-arrow"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 35 5 C 35 5, 15 5, 10 25 M 10 25 L 3 18 M 10 25 L 18 22"
            stroke="#60a5fa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="folder-container">
        <svg className="folder-back" viewBox="0 0 50 40" fill="none">
          <path
            d="M0 4C0 1.79086 1.79086 0 4 0H16.524C17.721 0 18.8415 0.54051 19.574 1.4673L22.426 5.0654C23.1585 5.99219 24.279 6.5327 25.476 6.5327H46C48.2091 6.5327 50 8.32356 50 10.5327V36C50 38.2091 48.2091 40 46 40H4C1.79086 40 0 38.2091 0 36V4Z"
            fill="#0056b3"
          />
        </svg>

        <div className="folder-search">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Search files..." className="search-input" onClick={(e) => e.stopPropagation()} />
        </div>

        <div className="file file-5">
          <div className="shine" />
          <svg
            className="file-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <div className="file-text">Hero_BG.png</div>
          <div className="file-tag">PNG • 4.2 MB</div>
        </div>

        <div className="file file-4">
          <div className="shine" />
          <svg
            className="file-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          <div className="file-text">Promo_Cut.mp4</div>
          <div className="file-tag">MP4 • 128 MB</div>
        </div>

        <div className="file file-3">
          <div className="shine" />
          <svg
            className="file-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <div className="file-text">app_config.json</div>
          <div className="file-tag">JSON • 12 KB</div>
        </div>

        <div className="file file-2">
          <div className="shine" />
          <svg
            className="file-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <div className="file-text">Q3_Report.pdf</div>
          <div className="file-tag">PDF • 1.1 MB</div>
        </div>

        <div className="file file-1">
          <div className="shine" />
          <svg
            className="file-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <div className="file-text">Pitch_Deck.pptx</div>
          <div className="file-tag">PPTX • 8.4 MB</div>
        </div>

        <div className="folder-front-wrapper">
          <svg className="folder-front" viewBox="0 0 50 34" fill="none">
            <path
              d="M0 4C0 1.79086 1.79086 0 4 0H46C48.2091 0 50 1.79086 50 4V30C50 32.2091 48.2091 34 46 34H4C1.79086 34 0 32.2091 0 30V4Z"
              fill="rgba(0, 123, 255, 0.65)"
            />
          </svg>
          <div className="folder-label" />
          <div className="counter">
            <div className="status-dot" />
            <span className="counter-label">FILES</span>
            <span className="counter-number">05</span>
          </div>
        </div>
      </div>
    </label>
  );
}

export function HomeDeviceSimulation() {
  const [browserTab, setBrowserTab] = useState<'overview' | 'terminal' | 'assets'>('overview');
  const [copiedUrl, setCopiedUrl] = useState(false);

  function handleCopyUrl() {
    navigator.clipboard?.writeText('https://dynesis.tech/app');
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  }

  return (
    <div className="h-sim-root">
      <div className="h-sim-stage h-sim-stage--both">
        {/* =========================================================
            1. BROWSER SIMULATION
            ========================================================= */}
        <div className="h-sim-browser">
            {/* Window Chrome Titlebar */}
            <div className="h-sim-browser__bar">
              <div className="h-sim-browser__traffic-lights">
                <span className="h-sim-dot h-sim-dot--red" />
                <span className="h-sim-dot h-sim-dot--yellow" />
                <span className="h-sim-dot h-sim-dot--green" />
              </div>

              {/* Browser Tabs */}
              <div className="h-sim-browser__tabs">
                <button
                  type="button"
                  className={`h-sim-browser__tab ${browserTab === 'overview' ? 'h-sim-browser__tab--active' : ''}`}
                  onClick={() => setBrowserTab('overview')}
                >
                  <Activity size={12} />
                  <span>Dynesis Platform</span>
                </button>
                <button
                  type="button"
                  className={`h-sim-browser__tab ${browserTab === 'terminal' ? 'h-sim-browser__tab--active' : ''}`}
                  onClick={() => setBrowserTab('terminal')}
                >
                  <Terminal size={12} />
                  <span>Cloud Terminal</span>
                </button>
                <button
                  type="button"
                  className={`h-sim-browser__tab ${browserTab === 'assets' ? 'h-sim-browser__tab--active' : ''}`}
                  onClick={() => setBrowserTab('assets')}
                >
                  <FolderGit2 size={12} />
                  <span>Projets & Fichiers</span>
                </button>
              </div>

              <div className="h-sim-browser__badge">
                <span className="h-sim-pulse-dot" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Address Bar */}
            <div className="h-sim-browser__url-row">
              <div className="h-sim-browser__nav-arrows">
                <span>←</span>
                <span>→</span>
                <span>↻</span>
              </div>
              <div className="h-sim-browser__url-pill" onClick={handleCopyUrl} title="Cliquer pour copier l'URL">
                <Shield size={12} className="h-sim-browser__lock" />
                <span className="h-sim-browser__url-text">https://dynesis.tech/app/v2/{browserTab}</span>
                <span className="h-sim-browser__copy-tag">{copiedUrl ? 'Copié !' : 'SSL'}</span>
              </div>
            </div>

            {/* Browser Content Canvas */}
            <div className="h-sim-browser__content">
              {browserTab === 'overview' && (
                <div className="h-sim-dash">
                  {/* Top Stats Grid */}
                  <div className="h-sim-dash__stats">
                    <div className="h-sim-kpi-card">
                      <div className="h-sim-kpi-card__top">
                        <span className="h-sim-kpi-lbl">Microservices</span>
                        <Zap size={14} className="h-sim-kpi-ico h-sim-kpi-ico--blue" />
                      </div>
                      <div className="h-sim-kpi-val">18 / 18</div>
                      <div className="h-sim-kpi-trend">
                        <span className="h-sim-trend-badge">99.99%</span> Disponibilité
                      </div>
                    </div>

                    <div className="h-sim-kpi-card">
                      <div className="h-sim-kpi-card__top">
                        <span className="h-sim-kpi-lbl">Latence API</span>
                        <Cpu size={14} className="h-sim-kpi-ico h-sim-kpi-ico--cyan" />
                      </div>
                      <div className="h-sim-kpi-val">12 ms</div>
                      <div className="h-sim-kpi-trend">
                        <span className="h-sim-trend-badge">-35%</span> Optimisé Edge
                      </div>
                    </div>

                    <div className="h-sim-kpi-card">
                      <div className="h-sim-kpi-card__top">
                        <span className="h-sim-kpi-lbl">Déploiements</span>
                        <CheckCircle2 size={14} className="h-sim-kpi-ico h-sim-kpi-ico--green" />
                      </div>
                      <div className="h-sim-kpi-val">Automatisés</div>
                      <div className="h-sim-kpi-trend">
                        <span className="h-sim-trend-badge">CI/CD</span> Zéro coupure
                      </div>
                    </div>
                  </div>

                  {/* Main split: Visual pipeline & 3D Interactive Folder Card */}
                  <div className="h-sim-dash__lower">
                    <div className="h-sim-pipeline-box">
                      <div className="h-sim-pipeline-header">
                        <span className="h-sim-box-title">Architecture Hybride Dynesis</span>
                        <span className="h-sim-box-sub">Web3 • Cloud • Mobile</span>
                      </div>
                      <div className="h-sim-bars">
                        <div className="h-sim-bar-item">
                          <div className="h-sim-bar-info">
                            <span>Frontend Next / Vite</span>
                            <span>98%</span>
                          </div>
                          <div className="h-sim-progress"><div className="h-sim-progress__fill" style={{ width: '98%' }} /></div>
                        </div>
                        <div className="h-sim-bar-item">
                          <div className="h-sim-bar-info">
                            <span>Backend Node / Go REST & GraphQL</span>
                            <span>96%</span>
                          </div>
                          <div className="h-sim-progress"><div className="h-sim-progress__fill h-sim-progress__fill--cyan" style={{ width: '96%' }} /></div>
                        </div>
                        <div className="h-sim-bar-item">
                          <div className="h-sim-bar-info">
                            <span>Application Mobile Android & iOS</span>
                            <span>94%</span>
                          </div>
                          <div className="h-sim-progress"><div className="h-sim-progress__fill h-sim-progress__fill--purple" style={{ width: '94%' }} /></div>
                        </div>
                      </div>
                    </div>

                    {/* Integrated 3D Folder Card Hub */}
                    <div className="h-sim-folder-showcase">
                      <div className="h-sim-folder-showcase__label">
                        <span>Fichiers & Livrables Projet</span>
                      </div>
                      <div className="h-sim-folder-mount">
                        <UiverseFolderCard id="browser-folder-toggle" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {browserTab === 'terminal' && (
                <div className="h-sim-terminal">
                  <div className="h-sim-terminal__line"><span className="h-sim-t-green">dynesis@cloud</span>:<span className="h-sim-t-blue">~/production</span>$ dynesis deploy --prod</div>
                  <div className="h-sim-terminal__line h-sim-t-muted">ℹ Packaging TypeScript bundle... (2.1s)</div>
                  <div className="h-sim-terminal__line h-sim-t-muted">ℹ Compiling Android APK & Web components...</div>
                  <div className="h-sim-terminal__line h-sim-t-green">✔ Security verification: 0 vulnerabilities found.</div>
                  <div className="h-sim-terminal__line h-sim-t-cyan">✔ Global CDN edge nodes primed across 45 locations.</div>
                  <div className="h-sim-terminal__line h-sim-t-bold">🚀 Deployment complete: https://dynesis.tech (HTTP/3 200 OK)</div>
                  <div className="h-sim-terminal__line"><span className="h-sim-t-green">dynesis@cloud</span>:<span className="h-sim-t-blue">~/production</span>$ <span className="h-sim-cursor" /></div>
                </div>
              )}

              {browserTab === 'assets' && (
                <div className="h-sim-assets-tab">
                  <div className="h-sim-assets-heading">
                    <h4>Centre de ressources du projet</h4>
                    <p>Cliquez sur le dossier 3D pour faire jaillir l'ensemble des fichiers sources, maquettes et documentations.</p>
                  </div>
                  <div className="h-sim-assets-folder-center">
                    <UiverseFolderCard id="assets-folder-toggle" />
                  </div>
                </div>
              )}
            </div>
          </div>

        {/* =========================================================
            2. ANDROID MOBILE SIMULATION
            ========================================================= */}
        <div className="h-sim-android-wrap">
            <div className="h-sim-android">
              {/* Android Chassis Bezel & Notch */}
              <div className="h-sim-android__bezel">
                {/* Punch-hole Camera */}
                <div className="h-sim-android__camera" />
                <div className="h-sim-android__speaker" />

                {/* Status Bar */}
                <div className="h-sim-android__status-bar">
                  <span className="h-sim-android__time">13:45</span>
                  <div className="h-sim-android__status-icons">
                    <span className="h-sim-android__5g">5G</span>
                    <Wifi size={12} />
                    <Battery size={13} />
                  </div>
                </div>

                {/* Android App Header */}
                <div className="h-sim-android__app-header">
                  <div className="h-sim-android__brand">
                    <div className="h-sim-android__brand-logo">D</div>
                    <div className="h-sim-android__brand-text">
                      <span className="h-sim-android__app-title">Dynesis Go</span>
                      <span className="h-sim-android__app-status">Application Android Active</span>
                    </div>
                  </div>
                  <button type="button" className="h-sim-android__notif-btn" aria-label="Notifications">
                    <Bell size={14} />
                    <span className="h-sim-android__notif-dot" />
                  </button>
                </div>

                {/* Android Screen Body */}
                <div className="h-sim-android__screen">
                  {/* Balance / Project Card */}
                  <div className="h-sim-android__card">
                    <div className="h-sim-android__card-top">
                      <span>PROJET EN COURS</span>
                      <span className="h-sim-android__card-chip">LIVE</span>
                    </div>
                    <div className="h-sim-android__card-val">Alpha-Node v3.4</div>
                    <div className="h-sim-android__card-sub">Infrastructure Cloud & Mobile Déployée</div>

                    <div className="h-sim-android__quick-actions">
                      <div className="h-sim-android__action-btn">
                        <Zap size={14} />
                        <span>Build</span>
                      </div>
                      <div className="h-sim-android__action-btn">
                        <Activity size={14} />
                        <span>Logs</span>
                      </div>
                      <div className="h-sim-android__action-btn">
                        <Shield size={14} />
                        <span>Audit</span>
                      </div>
                    </div>
                  </div>

                  {/* Android Mini Folder / Assets Component */}
                  <div className="h-sim-android__files-section">
                    <div className="h-sim-android__section-title">
                      <span>Dossier de fichiers interactif</span>
                    </div>
                    <div className="h-sim-android__folder-holder">
                      <UiverseFolderCard id="android-folder-toggle" />
                    </div>
                  </div>

                  {/* Android Recent Activity List */}
                  <div className="h-sim-android__list">
                    <div className="h-sim-android__list-item">
                      <div className="h-sim-android__list-dot h-sim-android__list-dot--green" />
                      <div className="h-sim-android__list-info">
                        <span className="h-sim-android__list-title">API Gateway synchronisée</span>
                        <span className="h-sim-android__list-time">Il y a 2 minutes</span>
                      </div>
                      <ArrowUpRight size={13} className="h-sim-android__list-arrow" />
                    </div>
                    <div className="h-sim-android__list-item">
                      <div className="h-sim-android__list-dot h-sim-android__list-dot--blue" />
                      <div className="h-sim-android__list-info">
                        <span className="h-sim-android__list-title">Android build signé (release.apk)</span>
                        <span className="h-sim-android__list-time">Il y a 14 minutes</span>
                      </div>
                      <ArrowUpRight size={13} className="h-sim-android__list-arrow" />
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation Bar */}
                <div className="h-sim-android__bottom-nav">
                  <div className="h-sim-android__nav-item h-sim-android__nav-item--active">
                    <Home size={16} />
                    <span>Accueil</span>
                  </div>
                  <div className="h-sim-android__nav-item">
                    <Activity size={16} />
                    <span>Métriques</span>
                  </div>
                  <div className="h-sim-android__nav-item">
                    <FolderGit2 size={16} />
                    <span>Fichiers</span>
                  </div>
                </div>

                {/* Android Navigation Gesture Bar */}
                <div className="h-sim-android__gesture-bar" />
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
