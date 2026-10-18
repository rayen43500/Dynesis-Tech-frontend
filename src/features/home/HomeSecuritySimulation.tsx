import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Zap, 
  Terminal, 
  RotateCcw, 
  Radio, 
  Flame, 
  CheckCircle2,
  Cpu,
  Globe
} from 'lucide-react';
import './home-security-simulation.css';

interface AttackScenario {
  id: string;
  name: string;
  badge: string;
  intensity: string;
  vector: string;
  mitigationTime: string;
  logs: { step: string; detail: string; status: 'alert' | 'isolate' | 'ok' }[];
  summary: string;
}

const ATTACK_SCENARIOS: AttackScenario[] = [
  {
    id: 'ddos',
    name: 'Attaque DDoS L7 (650k req/s)',
    badge: 'CRITIQUE',
    intensity: '650 000 req/s',
    vector: 'Botnets mondiaux (84k IPs ciblées)',
    mitigationTime: '8.4 ms',
    logs: [
      { step: '01. Détection WAF', detail: 'Pic anormal +4,200% intercepté sur passerelle Anycast', status: 'alert' },
      { step: '02. Filtre eBPF', detail: 'Empreinte de botnet isolée directement au niveau noyau', status: 'isolate' },
      { step: '03. Challenge JS', detail: 'Défi cryptographique silencieux validé sur trafic légitime', status: 'ok' },
      { step: '04. Mitigation', detail: '648 912 bots bloqués • Uptime 100% préservé', status: 'ok' }
    ],
    summary: 'Attaque volumétrique neutralisée en 8.4 ms. 0 ralentissement utilisateur.'
  },
  {
    id: 'sqli',
    name: 'Injection SQL Zero-Day',
    badge: 'ÉLEVÉE',
    intensity: 'Bypass WAF',
    vector: 'Payload hexadécimal sur route /api/auth',
    mitigationTime: '4.2 ms',
    logs: [
      { step: '01. Interception', detail: 'Caractères hexadécimaux anormaux détectés dans les paramètres', status: 'alert' },
      { step: '02. Analyse IA', detail: 'Signature d’élévation de privilèges confirmée (99.9%)', status: 'isolate' },
      { step: '03. Déroutement', detail: 'Attaquant redirigé vers un conteneur Honeypot isolé', status: 'ok' },
      { step: '04. Bannissement', detail: 'IP bannie sur l’ensemble du CDN • 0 octet exfiltré', status: 'ok' }
    ],
    summary: 'Intégrité de la base de données préservée à 100%. Aucune fuite de données.'
  },
  {
    id: 'jwt',
    name: 'Brute-Force & Vol de Tokens',
    badge: 'MOYENNE',
    intensity: 'Stuffing JWT',
    vector: '300 proxys résidentiels et manipulation RS256',
    mitigationTime: '5.6 ms',
    logs: [
      { step: '01. Vélocité', detail: '1 200 échecs de connexion coordonnés identifiés', status: 'alert' },
      { step: '02. Contrôle Clé', detail: 'Tentative d’algorithme JWT falsifié (None/HMAC) rejetée', status: 'isolate' },
      { step: '03. Passkey MFA', detail: 'Défi biométrique WebAuthn imposé automatiquement', status: 'ok' },
      { step: '04. Clôture', detail: 'Comptes sécurisés avec succès • 0 accès illégitime', status: 'ok' }
    ],
    summary: 'Sécurité adaptative activée. Tous les comptes clients protégés.'
  }
];

export function HomeSecuritySimulation() {
  const [selectedAttack, setSelectedAttack] = useState<AttackScenario>(ATTACK_SCENARIOS[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [logStep, setLogStep] = useState(4); // All done by default
  const [radarStatus, setRadarStatus] = useState<'normal' | 'alert' | 'defended'>('defended');

  // Live blocked count incrementer
  const [blockedReqs, setBlockedReqs] = useState(648912);
  useEffect(() => {
    const t = setInterval(() => {
      setBlockedReqs((prev) => prev + Math.floor(Math.random() * 22) + 5);
    }, 1400);
    return () => clearInterval(t);
  }, []);

  const runSimulation = (scenario: AttackScenario = selectedAttack) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setLogStep(0);
    setRadarStatus('alert');

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < scenario.logs.length) {
        setLogStep(step);
      } else {
        clearInterval(interval);
        setLogStep(scenario.logs.length);
        setIsSimulating(false);
        setRadarStatus('defended');
      }
    }, 600);
  };

  const handleSelect = (sc: AttackScenario) => {
    setSelectedAttack(sc);
    runSimulation(sc);
  };

  return (
    <section className="dyn-sec-lap" id="simulation-securite" aria-label="Simulation Cyber-Sécurité Laptop">
      <div className="dyn-sec-lap__container">
        
        {/* Harmonious Header */}
        <header className="dyn-sec-lap__header">
          <div className="tech-section-tag-wrapper">
            <span className="tech-section-tag">(E) — CYBER-SÉCURITÉ ZERO-TRUST & TERMINAL</span>
            <div className="tech-section-tag-line" aria-hidden="true" />
          </div>
          <h2 className="dyn-sec-lap__title">
            Console de Sécurité & Riposte en Millisecondes
          </h2>
          <p className="dyn-sec-lap__subtitle">
            Prenez les commandes du terminal de défense : simulez une intrusion critique sur le laptop et observez le filtrage instantané par nos sentinelles eBPF.
          </p>
        </header>

        {/* 2-Column Compact Stage */}
        <div className="dyn-sec-lap__stage">
          
          {/* Left Column: Interactive Attack Controls */}
          <div className="dyn-sec-lap__controls">
            
            {/* Status Bar */}
            <div className="dyn-sec-lap__status-bar">
              <div className="dyn-sec-lap__status-chip">
                <span className="dyn-sec-lap__status-led" />
                <span className="dyn-sec-lap__status-label">Bouclier :</span>
                <strong className="dyn-sec-lap__status-val">WAF Anycast + eBPF</strong>
              </div>
              <div className="dyn-sec-lap__status-chip">
                <Lock size={13} className="dyn-sec-lap__chip-icon" />
                <span className="dyn-sec-lap__status-label">Chiffrement :</span>
                <strong className="dyn-sec-lap__status-val">Post-Quantique</strong>
              </div>
              <div className="dyn-sec-lap__status-chip">
                <Zap size={13} className="dyn-sec-lap__chip-icon" />
                <span className="dyn-sec-lap__status-label">Mitigation :</span>
                <strong className="dyn-sec-lap__status-val">{selectedAttack.mitigationTime}</strong>
              </div>
            </div>

            {/* Attack Cards */}
            <div className="dyn-sec-lap__attacks-label">
              <span>Sélectionnez un scénario d’attaque à injecter :</span>
            </div>
            <div className="dyn-sec-lap__attacks-list">
              {ATTACK_SCENARIOS.map((sc) => {
                const isActive = selectedAttack.id === sc.id;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => handleSelect(sc)}
                    className={`dyn-sec-lap__attack-btn ${isActive ? 'dyn-sec-lap__attack-btn--active' : ''}`}
                  >
                    <div className="dyn-sec-lap__btn-top">
                      <span className="dyn-sec-lap__btn-badge">{sc.badge}</span>
                      <span className="dyn-sec-lap__btn-intensity">{sc.intensity}</span>
                    </div>
                    <strong className="dyn-sec-lap__btn-name">{sc.name}</strong>
                    <span className="dyn-sec-lap__btn-vector">{sc.vector}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Trigger */}
            <div className="dyn-sec-lap__action-wrap">
              <button
                type="button"
                disabled={isSimulating}
                onClick={() => runSimulation(selectedAttack)}
                className="dyn-sec-lap__run-btn"
              >
                {isSimulating ? (
                  <>
                    <RotateCcw size={15} className="dyn-sec-lap__spin" />
                    Attaque en cours • Bouclier en riposte...
                  </>
                ) : (
                  <>
                    <ShieldAlert size={15} />
                    Simuler l’attaque sur le Laptop
                  </>
                )}
              </button>
            </div>

            {/* Live Ticker Banner */}
            <div className="dyn-sec-lap__ticker">
              <Radio size={14} color="#10b981" />
              <span>Menaces neutralisées en direct :</span>
              <strong className="dyn-sec-lap__ticker-count">{blockedReqs.toLocaleString()} reqs</strong>
            </div>

          </div>

          {/* Right Column: Realistic Miniature Laptop Mockup */}
          <div className="dyn-sec-lap__laptop-container">
            
            {/* The Laptop Device */}
            <div className="dyn-laptop">
              
              {/* Laptop Display Top Lid */}
              <div className="dyn-laptop__screen-lid">
                {/* Webcam & Ambient light sensor */}
                <div className="dyn-laptop__webcam">
                  <span className="dyn-laptop__cam-lens" />
                </div>

                {/* Inner High-Def Screen (Clear Style) */}
                <div className="dyn-laptop__display">
                  
                  {/* Display OS Top Bar */}
                  <div className="dyn-laptop__display-bar">
                    <div className="dyn-laptop__display-dots">
                      <span className="dyn-laptop__dot dyn-laptop__dot--red" />
                      <span className="dyn-laptop__dot dyn-laptop__dot--yellow" />
                      <span className="dyn-laptop__dot dyn-laptop__dot--green" />
                    </div>
                    <div className="dyn-laptop__display-title">
                      <ShieldCheck size={12} color="#10b981" />
                      <span>dynesis-sentinel://live-defense-console</span>
                    </div>
                    <span className={`dyn-laptop__threat-tag dyn-laptop__threat-tag--${radarStatus}`}>
                      {isSimulating ? '● ALERTE : ATTAQUE' : '● SÉCURISÉ'}
                    </span>
                  </div>

                  {/* Display Main Content: Radar + Live Logs */}
                  <div className="dyn-laptop__display-body">
                    
                    {/* Top Row: Mini Radar + Telemetry */}
                    <div className="dyn-laptop__telemetry-row">
                      
                      {/* Radar */}
                      <div className="dyn-laptop__radar-wrap">
                        <svg viewBox="0 0 100 100" className="dyn-laptop__radar-svg">
                          <circle cx="50" cy="50" r="44" className="dyn-laptop__radar-ring" />
                          <circle cx="50" cy="50" r="28" className="dyn-laptop__radar-ring" />
                          <circle cx="50" cy="50" r="12" className="dyn-laptop__radar-ring" />
                          <line x1="50" y1="6" x2="50" y2="94" className="dyn-laptop__radar-cross" />
                          <line x1="6" y1="50" x2="94" y2="50" className="dyn-laptop__radar-cross" />
                          
                          {/* Beam */}
                          <g className={`dyn-laptop__radar-sweep ${isSimulating ? 'dyn-laptop__radar-sweep--fast' : ''}`}>
                            <line x1="50" y1="50" x2="94" y2="50" className="dyn-laptop__radar-line" />
                            <path d="M 50 50 L 94 50 A 44 44 0 0 0 81 19 Z" className="dyn-laptop__radar-cone" />
                          </g>

                          <circle cx="72" cy="32" r="2.5" className="dyn-laptop__blip dyn-laptop__blip--red" />
                          <circle cx="30" cy="70" r="2" className="dyn-laptop__blip dyn-laptop__blip--green" />
                        </svg>
                      </div>

                      {/* Live Telemetry Stats */}
                      <div className="dyn-laptop__stats">
                        <div className="dyn-laptop__stat-box">
                          <span className="dyn-laptop__stat-lbl">Temps Riposte</span>
                          <strong className="dyn-laptop__stat-val dyn-laptop__stat-val--green">{selectedAttack.mitigationTime}</strong>
                        </div>
                        <div className="dyn-laptop__stat-box">
                          <span className="dyn-laptop__stat-lbl">Faux Positifs</span>
                          <strong className="dyn-laptop__stat-val">0.00%</strong>
                        </div>
                        <div className="dyn-laptop__stat-box">
                          <span className="dyn-laptop__stat-lbl">Uptime</span>
                          <strong className="dyn-laptop__stat-val dyn-laptop__stat-val--blue">100%</strong>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Row: Incident Logs in clean style */}
                    <div className="dyn-laptop__logs-box">
                      <div className="dyn-laptop__logs-header">
                        <Terminal size={11} />
                        <span>Journal d’Événements Kernel eBPF :</span>
                      </div>
                      <div className="dyn-laptop__logs-list">
                        {selectedAttack.logs.map((lg, i) => {
                          const isVisible = logStep >= i;
                          return (
                            <div 
                              key={i} 
                              className={`dyn-laptop__log-item dyn-laptop__log-item--${lg.status} ${isVisible ? 'dyn-laptop__log-item--show' : 'dyn-laptop__log-item--hide'}`}
                            >
                              <strong className="dyn-laptop__log-step">{lg.step}</strong>
                              <span className="dyn-laptop__log-detail">{lg.detail}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Summary Banner inside display */}
                    <div className="dyn-laptop__summary-banner">
                      <CheckCircle2 size={13} color="#15803d" />
                      <span>{selectedAttack.summary}</span>
                    </div>

                  </div>

                </div>
              </div>

              {/* Laptop Hinge */}
              <div className="dyn-laptop__hinge" />

              {/* Laptop Keyboard Base & Trackpad */}
              <div className="dyn-laptop__keyboard-base">
                
                {/* Keyboard Layout */}
                <div className="dyn-laptop__keyboard">
                  <div className="dyn-laptop__key-row">
                    <span className="dyn-laptop__key">Esc</span>
                    <span className="dyn-laptop__key">F1</span>
                    <span className="dyn-laptop__key">F2</span>
                    <span className="dyn-laptop__key">F3</span>
                    <span className="dyn-laptop__key">F4</span>
                    <span className="dyn-laptop__key">F5</span>
                    <span className="dyn-laptop__key">F6</span>
                    <span className="dyn-laptop__key">F7</span>
                    <span className="dyn-laptop__key">F8</span>
                    <span className="dyn-laptop__key">Del</span>
                  </div>
                  <div className="dyn-laptop__key-row">
                    <span className="dyn-laptop__key dyn-laptop__key--med">Tab</span>
                    <span className="dyn-laptop__key">Q</span>
                    <span className="dyn-laptop__key">W</span>
                    <span className="dyn-laptop__key">E</span>
                    <span className="dyn-laptop__key">R</span>
                    <span className="dyn-laptop__key">T</span>
                    <span className="dyn-laptop__key">Y</span>
                    <span className="dyn-laptop__key">U</span>
                    <span className="dyn-laptop__key">I</span>
                    <span className="dyn-laptop__key dyn-laptop__key--med">⌫</span>
                  </div>
                  <div className="dyn-laptop__key-row">
                    <span className="dyn-laptop__key dyn-laptop__key--large">Caps</span>
                    <span className="dyn-laptop__key">A</span>
                    <span className="dyn-laptop__key">S</span>
                    <span className="dyn-laptop__key">D</span>
                    <span className="dyn-laptop__key">F</span>
                    <span className="dyn-laptop__key">G</span>
                    <span className="dyn-laptop__key">H</span>
                    <span className="dyn-laptop__key">J</span>
                    <span className="dyn-laptop__key dyn-laptop__key--large">Enter</span>
                  </div>
                  <div className="dyn-laptop__key-row">
                    <span className="dyn-laptop__key dyn-laptop__key--xl">Shift</span>
                    <span className="dyn-laptop__key">Z</span>
                    <span className="dyn-laptop__key">X</span>
                    <span className="dyn-laptop__key">C</span>
                    <span className="dyn-laptop__key">V</span>
                    <span className="dyn-laptop__key">B</span>
                    <span className="dyn-laptop__key">N</span>
                    <span className="dyn-laptop__key dyn-laptop__key--xl">Shift</span>
                  </div>
                  <div className="dyn-laptop__key-row">
                    <span className="dyn-laptop__key">Ctrl</span>
                    <span className="dyn-laptop__key">Alt</span>
                    <span className="dyn-laptop__key dyn-laptop__key--space">Space</span>
                    <span className="dyn-laptop__key">Alt</span>
                    <span className="dyn-laptop__key">Ctrl</span>
                  </div>
                </div>

                {/* Trackpad */}
                <div className="dyn-laptop__trackpad" />

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
