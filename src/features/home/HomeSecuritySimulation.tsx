import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Terminal, 
  RotateCcw, 
  Zap, 
  Radio, 
  Flame, 
  CheckCircle2 
} from 'lucide-react';
import './home-security-simulation.css';

interface SecurityAttack {
  id: string;
  name: string;
  type: string;
  badge: string;
  vector: string;
  mitigationTime: string;
  logs: { tag: string; msg: string; status: 'alert' | 'isolate' | 'ok' }[];
  summary: string;
}

const ATTACKS: SecurityAttack[] = [
  {
    id: 'ddos',
    name: 'Attaque DDoS L7 (650k req/s)',
    type: 'HTTP/2 Rapid Reset & Flood SYN',
    badge: 'Critique',
    vector: '84 000 IPs botnets distribuées mondialement',
    mitigationTime: '8.4 ms',
    logs: [
      { tag: 'WAF', msg: 'Pic anormal +4,200% détecté sur passerelle Anycast', status: 'alert' },
      { tag: 'eBPF', msg: 'Analyse comportementale noyau : empreinte botnet isolée', status: 'isolate' },
      { tag: 'SHIELD', msg: 'Challenge cryptographique injecté : 648k bots bloqués', status: 'ok' },
      { tag: 'STATUS', msg: '0 paquet légitime perdu • Uptime 100% préservé', status: 'ok' }
    ],
    summary: '648 912 requêtes malveillantes bloquées en 8.4 ms sans impact utilisateur.'
  },
  {
    id: 'sqli',
    name: 'Injection SQL Zero-Day',
    type: 'Bypass WAF & Tentative d’Exfiltration',
    badge: 'Élevée',
    vector: 'Payload hexadécimal obfusqué sur route d’authentification',
    mitigationTime: '4.2 ms',
    logs: [
      { tag: 'WAF', msg: 'Caractères suspects interceptés sur /api/v1/auth/login', status: 'alert' },
      { tag: 'KERNEL', msg: 'Tentative d’altération de requête SQL neutralisée', status: 'isolate' },
      { tag: 'SANDBOX', msg: 'Attaquant dérouté vers un Honeypot éphémère', status: 'ok' },
      { tag: 'STATUS', msg: '0 octet exfiltré • IP bannie sur 18 régions Edge', status: 'ok' }
    ],
    summary: 'Exfiltration empêchée • Intégrité de la base de données garantie à 100%.'
  },
  {
    id: 'auth',
    name: 'Brute-Force & Vol de Tokens',
    type: 'Credential Stuffing & Falsification JWT',
    badge: 'Moyenne',
    vector: 'Rotation de 300 proxys résidentiels et manipulation d’en-têtes',
    mitigationTime: '5.6 ms',
    logs: [
      { tag: 'AUTH', msg: '1 200 échecs de connexion simultanés détectés', status: 'alert' },
      { tag: 'CRYPTO', msg: 'Tentative d’algorithme JWT non autorisé (None/HMAC)', status: 'isolate' },
      { tag: 'MFA', msg: 'Défi biométrique WebAuthn / Passkey imposé', status: 'ok' },
      { tag: 'STATUS', msg: 'Comptes sécurisés • 0 compromission de session', status: 'ok' }
    ],
    summary: 'Protection adaptative activée • Comptes protégés avec succès.'
  }
];

export function HomeSecuritySimulation() {
  const [selected, setSelected] = useState<SecurityAttack>(ATTACKS[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(4); // All resolved by default
  const [radarState, setRadarState] = useState<'normal' | 'alert' | 'defended'>('defended');

  // Live blocked requests ticker
  const [blockedCount, setBlockedCount] = useState(648912);
  useEffect(() => {
    const t = setInterval(() => {
      setBlockedCount((prev) => prev + Math.floor(Math.random() * 18) + 4);
    }, 1500);
    return () => clearInterval(t);
  }, []);

  const runAttackSimulation = (attack: SecurityAttack = selected) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setPhaseIndex(0);
    setRadarState('alert');

    let p = 0;
    const interval = setInterval(() => {
      p++;
      if (p < attack.logs.length) {
        setPhaseIndex(p);
      } else {
        clearInterval(interval);
        setPhaseIndex(attack.logs.length);
        setIsSimulating(false);
        setRadarState('defended');
      }
    }, 600);
  };

  const handleSelect = (att: SecurityAttack) => {
    setSelected(att);
    runAttackSimulation(att);
  };

  return (
    <section className="dyn-sec-sim" id="simulation-securite" aria-label="Simulation Cyber-Sécurité">
      <div className="dyn-sec-sim__ambient" aria-hidden="true" />
      <div className="dyn-sec-sim__container">
        
        {/* Header */}
        <div className="dyn-sec-sim__header">
          <div className="dyn-sec-sim__eyebrow">
            <span className="dyn-sec-sim__pulse" />
            <span>(CYBER-DÉFENSE) — BOUCLIER ZERO-TRUST EN DIRECT</span>
          </div>
          <h2 className="dyn-sec-sim__title">
            Riposte & Neutralisation d'Attaques en Millisecondes
          </h2>
          <p className="dyn-sec-sim__sub">
            Testez la résistance de notre architecture : injectez un scénario d'attaque critique et constatez la vitesse d'isolation de nos sentinelles eBPF.
          </p>
        </div>

        {/* Compact 2-Column Showcase */}
        <div className="dyn-sec-sim__grid">
          
          {/* Left Column: Attack Selectors */}
          <div className="dyn-sec-sim__controls">
            
            {/* Status Bar */}
            <div className="dyn-sec-sim__status-row">
              <div className="dyn-sec-sim__status-item">
                <span className="dyn-sec-sim__status-dot" />
                <span className="dyn-sec-sim__status-label">Bouclier :</span>
                <strong className="dyn-sec-sim__status-val">WAF + eBPF Kernel</strong>
              </div>
              <div className="dyn-sec-sim__status-item">
                <Lock size={13} className="dyn-sec-sim__status-icon" />
                <span className="dyn-sec-sim__status-label">Chiffrement :</span>
                <strong className="dyn-sec-sim__status-val">Post-Quantique</strong>
              </div>
              <div className="dyn-sec-sim__status-item">
                <Zap size={13} className="dyn-sec-sim__status-icon" />
                <span className="dyn-sec-sim__status-label">Mitigation :</span>
                <strong className="dyn-sec-sim__status-val">{selected.mitigationTime}</strong>
              </div>
            </div>

            {/* Attack Cards */}
            <div className="dyn-sec-sim__pills">
              {ATTACKS.map((att) => {
                const isActive = selected.id === att.id;
                return (
                  <button
                    key={att.id}
                    type="button"
                    onClick={() => handleSelect(att)}
                    className={`dyn-sec-sim__pill ${isActive ? 'dyn-sec-sim__pill--active' : ''}`}
                  >
                    <div className="dyn-sec-sim__pill-top">
                      <span className="dyn-sec-sim__pill-badge">{att.badge}</span>
                      <span className="dyn-sec-sim__pill-type">{att.type}</span>
                    </div>
                    <strong className="dyn-sec-sim__pill-name">{att.name}</strong>
                    <span className="dyn-sec-sim__pill-vector">Vecteur : {att.vector}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Button */}
            <div className="dyn-sec-sim__action-bar">
              <button
                type="button"
                disabled={isSimulating}
                onClick={() => runAttackSimulation(selected)}
                className="dyn-sec-sim__run-btn"
              >
                {isSimulating ? (
                  <>
                    <RotateCcw size={15} className="dyn-sec-sim__spin" />
                    Attaque en cours • Bouclier en riposte...
                  </>
                ) : (
                  <>
                    <ShieldAlert size={14} />
                    Simuler l’attaque & tester la riposte immédiate
                  </>
                )}
              </button>
            </div>

            {/* Live Counter Badge */}
            <div className="dyn-sec-sim__counter-bar">
              <Radio size={13} color="#10b981" />
              <span>Menaces neutralisées en direct :</span>
              <strong>{blockedCount.toLocaleString()} reqs</strong>
            </div>

          </div>

          {/* Right Column: Cyber Radar & Live Audit Logs */}
          <div className="dyn-sec-sim__preview">
            <div className="dyn-sec-sim__radar-card">
              
              <div className="dyn-sec-sim__radar-top">
                <div className="dyn-sec-sim__radar-status">
                  <span className={`dyn-sec-sim__radar-dot dyn-sec-sim__radar-dot--${radarState}`} />
                  <span className="dyn-sec-sim__radar-state-text">
                    {isSimulating ? 'ALERTE : ATTAQUE DÉTECTÉE' : 'BOUCLIER ACTIF — 100% PROTÉGÉ'}
                  </span>
                </div>
                <span className="dyn-sec-sim__radar-time">{selected.mitigationTime}</span>
              </div>

              {/* Concentric Compact Radar Visual */}
              <div className="dyn-sec-sim__radar-box">
                <svg viewBox="0 0 160 160" className="dyn-sec-sim__radar-svg">
                  <circle cx="80" cy="80" r="70" className="dyn-sec-sim__radar-ring" />
                  <circle cx="80" cy="80" r="45" className="dyn-sec-sim__radar-ring" />
                  <circle cx="80" cy="80" r="20" className="dyn-sec-sim__radar-ring" />
                  <line x1="80" y1="10" x2="80" y2="150" className="dyn-sec-sim__radar-cross" />
                  <line x1="10" y1="80" x2="150" y2="80" className="dyn-sec-sim__radar-cross" />
                  
                  {/* Sweeping Beam */}
                  <g className={`dyn-sec-sim__radar-beam-wrap ${isSimulating ? 'dyn-sec-sim__radar-beam-wrap--fast' : ''}`}>
                    <line x1="80" y1="80" x2="150" y2="80" className="dyn-sec-sim__radar-line" />
                    <path d="M 80 80 L 150 80 A 70 70 0 0 0 130 30 Z" className="dyn-sec-sim__radar-cone" />
                  </g>

                  {/* Threat Blips */}
                  <circle cx="115" cy="50" r="3" className="dyn-sec-sim__blip dyn-sec-sim__blip--red" />
                  <circle cx="50" cy="110" r="2.5" className="dyn-sec-sim__blip dyn-sec-sim__blip--green" />
                  <circle cx="110" cy="115" r="3" className="dyn-sec-sim__blip dyn-sec-sim__blip--blue" />
                </svg>

                <div className="dyn-sec-sim__radar-telemetry">
                  <div className="dyn-sec-sim__telemetry-item">
                    <span className="dyn-sec-sim__telemetry-num">0.00%</span>
                    <span className="dyn-sec-sim__telemetry-label">Faux Positifs</span>
                  </div>
                  <div className="dyn-sec-sim__telemetry-item">
                    <span className="dyn-sec-sim__telemetry-num">100%</span>
                    <span className="dyn-sec-sim__telemetry-label">Uptime Garanti</span>
                  </div>
                  <div className="dyn-sec-sim__telemetry-item">
                    <span className="dyn-sec-sim__telemetry-num">0 Octet</span>
                    <span className="dyn-sec-sim__telemetry-label">Fuite de Données</span>
                  </div>
                </div>
              </div>

              {/* Tactical Audit Logs */}
              <div className="dyn-sec-sim__logs">
                <div className="dyn-sec-sim__logs-title">
                  <Terminal size={12} />
                  <span>Journal Kernel eBPF en direct :</span>
                </div>
                <div className="dyn-sec-sim__logs-list">
                  {selected.logs.map((lg, i) => {
                    const isVisible = phaseIndex >= i;
                    return (
                      <div 
                        key={i} 
                        className={`dyn-sec-sim__log-row dyn-sec-sim__log-row--${lg.status} ${isVisible ? 'dyn-sec-sim__log-row--show' : 'dyn-sec-sim__log-row--hide'}`}
                      >
                        <span className="dyn-sec-sim__log-tag">[{lg.tag}]</span>
                        <span className="dyn-sec-sim__log-msg">{lg.msg}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Summary Badge */}
              <div className="dyn-sec-sim__radar-bottom">
                <CheckCircle2 size={15} color="#10b981" />
                <span className="dyn-sec-sim__summary-msg">{selected.summary}</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
