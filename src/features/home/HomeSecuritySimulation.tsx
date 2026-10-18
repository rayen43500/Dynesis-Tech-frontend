import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Zap, 
  RotateCcw, 
  Radio
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

          {/* Right Column: Realistic 3D Laptop Mockup */}
          <div className="dyn-sec-lap__laptop-container">
            <div className="dyn-sec-lap__laptop-3d-wrap">
              <img 
                src="/images/dynesis-cyber-laptop.png" 
                alt="Console de Cyber-Sécurité Live sur Laptop 3D" 
                className={`dyn-sec-lap__laptop-3d-img ${isSimulating ? 'dyn-sec-lap__laptop-3d-img--simulating' : ''}`}
                loading="eager"
              />

              {/* Dynamic HUD Indicator */}
              <div className={`dyn-sec-lap__laptop-live-badge ${isSimulating ? 'dyn-sec-lap__laptop-live-badge--alert' : ''}`}>
                <span className="dyn-sec-lap__badge-pulse" />
                <span className="dyn-sec-lap__badge-text">
                  {isSimulating 
                    ? `● Riposte eBPF en cours : ${selectedAttack.name}` 
                    : `● Sentinel WAF Actif • Latence : ${selectedAttack.mitigationTime}`}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
