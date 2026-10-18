import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  Smartphone, 
  Monitor, 
  Zap, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ShieldCheck, 
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';
import './home-ai-simulation.css';

interface DemoAction {
  id: string;
  label: string;
  speech: string;
  deviceType: 'mobile' | 'web';
  mobileScreen: {
    appTitle: string;
    badge: string;
    metricLabel: string;
    metricVal: string;
    cardTitle: string;
    cardDesc: string;
    status: string;
  };
  webScreen: {
    url: string;
    title: string;
    stat1: string;
    stat2: string;
    activeAgents: number;
    log: string;
  };
}

const DEMO_ACTIONS: DemoAction[] = [
  {
    id: 'mobile-app',
    label: '📱 Déployer Application Mobile',
    speech: '« Initialisation du bundle mobile React Native. Intégration du composant biométrique et synchronisation hors-ligne activée en 4.2ms. »',
    deviceType: 'mobile',
    mobileScreen: {
      appTitle: 'Dynesis Pay & Crypto',
      badge: 'v2.4.0 • PRODUCTION',
      metricLabel: 'Volume Transactions',
      metricVal: '84 250 €',
      cardTitle: 'Paiement Instantané ZK',
      cardDesc: 'Chiffrement de bout en bout validé par agent IA. 0 latence ressentie.',
      status: 'Synchronisé avec cluster Cloud'
    },
    webScreen: {
      url: 'https://app.dynesis.tech/mobile-bridge',
      title: 'Console de Relais Mobile & PWA',
      stat1: '14.2k Utilisateurs Actifs',
      stat2: '0.01% Taux de Crash',
      activeAgents: 4,
      log: 'Passerelle mobile compilée avec succès.'
    }
  },
  {
    id: 'saas-web',
    label: '💻 Générer Dashboard SaaS Cloud',
    speech: '« Synthèse du tableau de bord d’entreprise : injection des widgets prédictifs, agrégation GraphQL et rendu SSR ultra-véloce. »',
    deviceType: 'web',
    mobileScreen: {
      appTitle: 'Dynesis Cloud Admin',
      badge: 'LIVE TELEMETRY',
      metricLabel: 'Throughput Global',
      metricVal: '142k ops/s',
      cardTitle: 'Moteur Analytics B2B',
      cardDesc: 'Agrégation de données multi-régions avec requêtes optimisées.',
      status: 'Flux temps réel actif'
    },
    webScreen: {
      url: 'https://admin.dynesis.tech/analytics',
      title: 'Dashboard Intelligent & Analytics IA',
      stat1: '142,000 Ops / seconde',
      stat2: '99.999% SLA Garanti',
      activeAgents: 8,
      log: 'Modèle prédictif déployé sur 18 régions Anycast.'
    }
  },
  {
    id: 'ai-smart',
    label: '⚡ Optimisation & Smart Contract',
    speech: '« Audit de sécurité formel déclenché. Aucune faille de réentrance détectée. Preuve mathématique ZK validée sur Ethereum L2. »',
    deviceType: 'mobile',
    mobileScreen: {
      appTitle: 'Web3 Vault Shield',
      badge: 'AUDITÉ & SÉCURISÉ',
      metricLabel: 'Liquidité Protégée',
      metricVal: '1.24 M$',
      cardTitle: 'Smart Contract DeFi',
      cardDesc: 'Oracles décentralisés vérifiés. Protection TWAP active.',
      status: 'Certifié sans vulnérabilité'
    },
    webScreen: {
      url: 'https://web3.dynesis.tech/audit',
      title: 'Moniteur de Sécurité Web3 & Oracles',
      stat1: '0 Faille Détectée',
      stat2: '100% Preuve ZK',
      activeAgents: 6,
      log: 'Contrat déployé sur réseau principal sans coupure.'
    }
  }
];

export function HomeAISimulation() {
  const [selectedAction, setSelectedAction] = useState<DemoAction>(DEMO_ACTIONS[0]);
  const [viewMode, setViewMode] = useState<'mobile' | 'web'>('mobile');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [typedSpeech, setTypedSpeech] = useState(DEMO_ACTIONS[0].speech);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Trigger speech effect
  const triggerAction = (action: DemoAction) => {
    setSelectedAction(action);
    setViewMode(action.deviceType);
    setIsSpeaking(true);
    setTypedSpeech('');

    let charIdx = 0;
    const text = action.speech;
    const interval = setInterval(() => {
      charIdx += 2;
      setTypedSpeech(text.slice(0, charIdx));
      if (charIdx >= text.length) {
        clearInterval(interval);
        setTypedSpeech(text);
        setTimeout(() => setIsSpeaking(false), 800);
      }
    }, 25);
  };

  return (
    <section className="dyn-ai-holo" id="simulation-ia" aria-label="Simulation IA et Agent Holographique">
      <div className="dyn-ai-holo__container">
        
        {/* Harmonious Header */}
        <header className="dyn-ai-holo__header">
          <div className="tech-section-tag-wrapper">
            <span className="tech-section-tag">(D) — INTELLIGENCE ARTIFICIELLE & AGENT HOLOGRAPHIQUE</span>
            <div className="tech-section-tag-line" aria-hidden="true" />
          </div>
          <h2 className="dyn-ai-holo__title">
            Agent IA Autonome & Déploiement en Temps Réel
          </h2>
          <p className="dyn-ai-holo__subtitle">
            Interagissez avec notre agent virtuel : découvrez comment nos modèles d'IA conçoivent, optimisent et projettent instantanément des applications sur mobile et web.
          </p>
        </header>

        {/* 2-Column Compact Interactive Showcase */}
        <div className="dyn-ai-holo__stage">
          
          {/* Left Column: Holographic AI Agent & Speech Bubble */}
          <div className="dyn-ai-holo__agent-card">
            
            {/* Top Toolbar */}
            <div className="dyn-ai-holo__agent-top">
              <div className="dyn-ai-holo__agent-status">
                <span className="dyn-ai-holo__status-led" />
                <span className="dyn-ai-holo__agent-name">Agent Cognitif Dynesis-Titan</span>
              </div>
              <button 
                type="button" 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="dyn-ai-holo__sound-btn"
                title={soundEnabled ? 'Synthèse audio active' : 'Audio muet'}
              >
                {soundEnabled ? <Volume2 size={14} color="#0284c7" /> : <VolumeX size={14} color="#94a3b8" />}
                <span>{soundEnabled ? 'Audio On' : 'Muet'}</span>
              </button>
            </div>

            {/* The 3D Hologram Projection Core */}
            <div className="dyn-ai-holo__projection-zone">
              <div className="dyn-ai-holo__light-beam" />
              
              {/* Concentric Holographic Rings */}
              <div className={`dyn-ai-holo__rings ${isSpeaking ? 'dyn-ai-holo__rings--active' : ''}`}>
                <div className="dyn-ai-holo__ring dyn-ai-holo__ring--outer" />
                <div className="dyn-ai-holo__ring dyn-ai-holo__ring--mid" />
                <div className="dyn-ai-holo__ring dyn-ai-holo__ring--inner" />
              </div>

              {/* Holographic Glowing Avatar */}
              <div className={`dyn-ai-holo__avatar ${isSpeaking ? 'dyn-ai-holo__avatar--speaking' : ''}`}>
                <div className="dyn-ai-holo__avatar-core">
                  <Bot size={40} className="dyn-ai-holo__bot-icon" />
                  <Sparkles size={18} className="dyn-ai-holo__sparkle-icon" />
                </div>
                {/* Hologram Scanlines Overlay */}
                <div className="dyn-ai-holo__scanlines" />
              </div>

              {/* Hologram Base Projector Emitter */}
              <div className="dyn-ai-holo__emitter">
                <div className="dyn-ai-holo__emitter-disc" />
                <div className="dyn-ai-holo__emitter-glow" />
              </div>

              {/* Audio Soundwave Bars */}
              <div className="dyn-ai-holo__soundwave">
                <span className={`dyn-ai-holo__bar ${isSpeaking ? 'dyn-ai-holo__bar--anim' : ''}`} />
                <span className={`dyn-ai-holo__bar ${isSpeaking ? 'dyn-ai-holo__bar--anim' : ''}`} style={{ animationDelay: '0.1s' }} />
                <span className={`dyn-ai-holo__bar ${isSpeaking ? 'dyn-ai-holo__bar--anim' : ''}`} style={{ animationDelay: '0.2s' }} />
                <span className={`dyn-ai-holo__bar ${isSpeaking ? 'dyn-ai-holo__bar--anim' : ''}`} style={{ animationDelay: '0.3s' }} />
                <span className={`dyn-ai-holo__bar ${isSpeaking ? 'dyn-ai-holo__bar--anim' : ''}`} style={{ animationDelay: '0.15s' }} />
              </div>
            </div>

            {/* Dynamic Talking Speech Bubble */}
            <div className="dyn-ai-holo__speech-bubble">
              <div className="dyn-ai-holo__bubble-header">
                <span className="dyn-ai-holo__bubble-badge">MESSAGE DE L'AGENT IA</span>
                <span className="dyn-ai-holo__bubble-latency">Latence : 4.8ms</span>
              </div>
              <p className="dyn-ai-holo__bubble-text">
                {typedSpeech}
                {isSpeaking && <span className="dyn-ai-holo__cursor" />}
              </p>
            </div>

            {/* Interactive User Commands */}
            <div className="dyn-ai-holo__actions-label">
              <span>Sélectionnez une instruction pour l'Agent :</span>
            </div>
            <div className="dyn-ai-holo__actions-grid">
              {DEMO_ACTIONS.map((act) => {
                const isActive = selectedAction.id === act.id;
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => triggerAction(act)}
                    className={`dyn-ai-holo__action-btn ${isActive ? 'dyn-ai-holo__action-btn--active' : ''}`}
                  >
                    <span>{act.label}</span>
                    <ArrowRight size={13} className="dyn-ai-holo__arrow" />
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Column: Device Simulation (Mobile Smartphone or Web Browser) */}
          <div className="dyn-ai-holo__device-card">
            
            {/* View Mode Switcher */}
            <div className="dyn-ai-holo__device-toolbar">
              <span className="dyn-ai-holo__toolbar-title">Projection en Direct de l'Interface</span>
              <div className="dyn-ai-holo__device-toggles">
                <button
                  type="button"
                  onClick={() => setViewMode('mobile')}
                  className={`dyn-ai-holo__toggle-btn ${viewMode === 'mobile' ? 'dyn-ai-holo__toggle-btn--active' : ''}`}
                >
                  <Smartphone size={13} />
                  <span>Mobile</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('web')}
                  className={`dyn-ai-holo__toggle-btn ${viewMode === 'web' ? 'dyn-ai-holo__toggle-btn--active' : ''}`}
                >
                  <Monitor size={13} />
                  <span>Dashboard Web</span>
                </button>
              </div>
            </div>

            {/* The Simulation Screen Container */}
            <div className="dyn-ai-holo__device-screen-mount">
              
              {/* 1. MOBILE SMARTPHONE MOCKUP */}
              {viewMode === 'mobile' && (
                <div className="dyn-ai-phone">
                  <div className="dyn-ai-phone__notch">
                    <div className="dyn-ai-phone__camera" />
                  </div>
                  <div className="dyn-ai-phone__status-bar">
                    <span>9:41</span>
                    <div className="dyn-ai-phone__icons">5G • 100%</div>
                  </div>

                  <div className="dyn-ai-phone__content">
                    <div className="dyn-ai-phone__header">
                      <div>
                        <span className="dyn-ai-phone__badge">{selectedAction.mobileScreen.badge}</span>
                        <h4 className="dyn-ai-phone__title">{selectedAction.mobileScreen.appTitle}</h4>
                      </div>
                      <div className="dyn-ai-phone__avatar-mini">
                        <Bot size={14} color="#0284c7" />
                      </div>
                    </div>

                    <div className="dyn-ai-phone__metric-card">
                      <span className="dyn-ai-phone__metric-lbl">{selectedAction.mobileScreen.metricLabel}</span>
                      <strong className="dyn-ai-phone__metric-num">{selectedAction.mobileScreen.metricVal}</strong>
                      <div className="dyn-ai-phone__trend">
                        <TrendingUp size={12} color="#10b981" />
                        <span>+18.4% ce mois</span>
                      </div>
                    </div>

                    <div className="dyn-ai-phone__feature-box">
                      <div className="dyn-ai-phone__feature-icon">
                        <Zap size={15} color="#0284c7" />
                      </div>
                      <div>
                        <strong className="dyn-ai-phone__feat-title">{selectedAction.mobileScreen.cardTitle}</strong>
                        <p className="dyn-ai-phone__feat-desc">{selectedAction.mobileScreen.cardDesc}</p>
                      </div>
                    </div>

                    <div className="dyn-ai-phone__footer-status">
                      <CheckCircle2 size={13} color="#10b981" />
                      <span>{selectedAction.mobileScreen.status}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. WEB BROWSER MOCKUP */}
              {viewMode === 'web' && (
                <div className="dyn-ai-web">
                  <div className="dyn-ai-web__browser-bar">
                    <div className="dyn-ai-web__dots">
                      <span className="dyn-ai-web__dot dyn-ai-web__dot--red" />
                      <span className="dyn-ai-web__dot dyn-ai-web__dot--yellow" />
                      <span className="dyn-ai-web__dot dyn-ai-web__dot--green" />
                    </div>
                    <div className="dyn-ai-web__url-bar">
                      <span>{selectedAction.webScreen.url}</span>
                    </div>
                  </div>

                  <div className="dyn-ai-web__content">
                    <div className="dyn-ai-web__top">
                      <h4 className="dyn-ai-web__title">{selectedAction.webScreen.title}</h4>
                      <span className="dyn-ai-web__status-pill">● Opérationnel</span>
                    </div>

                    <div className="dyn-ai-web__kpi-grid">
                      <div className="dyn-ai-web__kpi-card">
                        <span className="dyn-ai-web__kpi-label">Débit Validé</span>
                        <strong className="dyn-ai-web__kpi-val">{selectedAction.webScreen.stat1}</strong>
                      </div>
                      <div className="dyn-ai-web__kpi-card">
                        <span className="dyn-ai-web__kpi-label">Fiabilité Système</span>
                        <strong className="dyn-ai-web__kpi-val">{selectedAction.webScreen.stat2}</strong>
                      </div>
                      <div className="dyn-ai-web__kpi-card">
                        <span className="dyn-ai-web__kpi-label">Agents Actifs</span>
                        <strong className="dyn-ai-web__kpi-val">{selectedAction.webScreen.activeAgents} workers</strong>
                      </div>
                    </div>

                    <div className="dyn-ai-web__console">
                      <span className="dyn-ai-web__console-prefix">[IA CLUSTER]</span>
                      <span className="dyn-ai-web__console-msg">{selectedAction.webScreen.log}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
