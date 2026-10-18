import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Database, 
  Zap, 
  RefreshCw, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Monitor, 
  Laptop, 
  Smartphone, 
  Server, 
  Activity, 
  ArrowRight,
  TrendingUp,
  Radio,
  Copy,
  Check
} from 'lucide-react';
import './dynesis-cloud-showcase.css';

interface StreamLog {
  id: number;
  time: string;
  source: string;
  target: string;
  payload: string;
  speed: string;
  status: 'synced' | 'transmitting' | 'replicated';
}

export function DynesisCloudShowcase() {
  const [activeMode, setActiveMode] = useState<'transmitting' | 'replicating' | 'encrypted'>('transmitting');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Dynamic telemetry
  const [throughput, setThroughput] = useState('2.4 Go/s');
  const [latency, setLatency] = useState('3.2 ms');
  const [packetCount, setPacketCount] = useState(1842500);

  // Live packet ticker
  useEffect(() => {
    const t = setInterval(() => {
      setPacketCount((prev) => prev + Math.floor(Math.random() * 45) + 15);
    }, 1200);
    return () => clearInterval(t);
  }, []);

  const [logs, setLogs] = useState<StreamLog[]>([
    { id: 1, time: '18:55:01', source: 'Nuage Central (18 Régions)', target: 'Cluster DB (PostgreSQL)', payload: '84 000 transactions', speed: '2.4 Go/s', status: 'synced' },
    { id: 2, time: '18:55:02', source: 'Base de Données Primaire', target: 'Laptop & Desktop Clients', payload: '12 500 flux GraphQL', speed: '1.9 Go/s', status: 'replicated' },
    { id: 3, time: '18:55:03', source: 'Passerelle Anycast', target: 'Terminaux Mobiles & PWA', payload: '32 000 requêtes Edge', speed: '2.8 Go/s', status: 'transmitting' }
  ]);

  const triggerTransmission = () => {
    if (isTransmitting) return;
    setIsTransmitting(true);
    setThroughput('5.8 Go/s (Pic Turbo)');
    setLatency('1.9 ms');
    setActiveMode('transmitting');

    const now = new Date().toLocaleTimeString('fr-FR');
    const newLog: StreamLog = {
      id: Date.now(),
      time: now,
      source: 'Nuage Cloud Anycast Global',
      target: 'Bases de Données & Appareils Connectés',
      payload: '100 000 paquets simultanés',
      speed: '5.8 Go/s',
      status: 'transmitting'
    };

    setLogs((prev) => [newLog, ...prev.slice(0, 3)]);

    setTimeout(() => {
      setIsTransmitting(false);
      setThroughput('2.4 Go/s');
      setLatency('3.2 ms');
    }, 2200);
  };

  const triggerReplication = () => {
    setActiveMode('replicating');
    const now = new Date().toLocaleTimeString('fr-FR');
    setLogs((prev) => [
      {
        id: Date.now(),
        time: now,
        source: 'Cluster DB Primaire (Paris)',
        target: 'Répliques Lecture (Francfort & Tokyo)',
        payload: 'Synchronisation WAL zéro perte',
        speed: '3.1 Go/s',
        status: 'replicated'
      },
      ...prev.slice(0, 3)
    ]);
  };

  const triggerEncryption = () => {
    setActiveMode('encrypted');
    const now = new Date().toLocaleTimeString('fr-FR');
    setLogs((prev) => [
      {
        id: Date.now(),
        time: now,
        source: 'Chiffrement Post-Quantique',
        target: 'Tous les flux de données (Anycast)',
        payload: 'Clés cryptographiques AES-256 rotées',
        speed: 'Sécurité Maximale',
        status: 'synced'
      },
      ...prev.slice(0, 3)
    ]);
  };

  const copyEndpoint = () => {
    navigator.clipboard?.writeText('https://cloud.dynesis.tech/v1/network-mesh');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="dyn-cloud-iso" id="cloud-infrastructure" aria-label="Simulation Réseau Cloud et Données Isométrique">
      <div className="dyn-cloud-iso__container">
        
        {/* Harmonious Header matching site */}
        <header className="dyn-cloud-iso__header">
          <div className="dyn-cloud-iso__eyebrow">
            <span className="dyn-cloud-iso__pulse-dot" />
            <span>(INFRASTRUCTURE CLOUD) — SIMULATION RÉSEAU ISOMÉTRIQUE EN DIRECT</span>
          </div>
          <h2 className="dyn-cloud-iso__title">
            Architecture Cloud, Bases de Données & Transmission en Direct
          </h2>
          <p className="dyn-cloud-iso__subtitle">
            Explorez notre écosystème interconnecté en temps réel : visualisez les flux de données continus reliant notre nuage central, nos clusters de bases de données et l'ensemble de vos terminaux applicatifs.
          </p>
        </header>

        {/* Master Isometric Simulation Showcase */}
        <div className="dyn-cloud-iso__canvas-card">
          
          {/* Top Control Toolbar */}
          <div className="dyn-cloud-iso__toolbar">
            <div className="dyn-cloud-iso__status-indicators">
              <span className="dyn-cloud-iso__dot dyn-cloud-iso__dot--red" />
              <span className="dyn-cloud-iso__dot dyn-cloud-iso__dot--yellow" />
              <span className="dyn-cloud-iso__dot dyn-cloud-iso__dot--green" />
              <span className="dyn-cloud-iso__toolbar-tag">dynesis://cloud-mesh-topology • En direct</span>
            </div>

            {/* Live Metrics Chips */}
            <div className="dyn-cloud-iso__chips">
              <div className="dyn-cloud-iso__chip">
                <Activity size={13} color="#0284c7" />
                <span>Débit :</span>
                <strong>{throughput}</strong>
              </div>
              <div className="dyn-cloud-iso__chip">
                <Zap size={13} color="#10b981" />
                <span>Latence :</span>
                <strong>{latency}</strong>
              </div>
              <div className="dyn-cloud-iso__chip">
                <Radio size={13} color="#0ea5e9" />
                <span>Paquets Transmis :</span>
                <strong>{packetCount.toLocaleString()}</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={copyEndpoint}
              className="dyn-cloud-iso__copy-btn"
              title="Copier l'endpoint de l'API Cloud"
            >
              {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
              <span>{copied ? 'Copié' : 'Endpoint'}</span>
            </button>
          </div>

          {/* Interactive Trigger Actions Bar */}
          <div className="dyn-cloud-iso__actions-bar">
            <button
              type="button"
              disabled={isTransmitting}
              onClick={triggerTransmission}
              className={`dyn-cloud-iso__act-btn ${activeMode === 'transmitting' ? 'dyn-cloud-iso__act-btn--active' : ''}`}
            >
              <Zap size={14} fill="currentColor" />
              <span>{isTransmitting ? 'Transmission 100k en cours...' : '⚡ Déclencher Transmission Massive'}</span>
            </button>

            <button
              type="button"
              onClick={triggerReplication}
              className={`dyn-cloud-iso__act-btn ${activeMode === 'replicating' ? 'dyn-cloud-iso__act-btn--active' : ''}`}
            >
              <Database size={14} />
              <span>🔄 Synchroniser Bases PostgreSQL & Redis</span>
            </button>

            <button
              type="button"
              onClick={triggerEncryption}
              className={`dyn-cloud-iso__act-btn ${activeMode === 'encrypted' ? 'dyn-cloud-iso__act-btn--active' : ''}`}
            >
              <ShieldCheck size={14} />
              <span>🛡️ Chiffrer Flux (Post-Quantique)</span>
            </button>
          </div>

          {/* ══════════════════════════════════════════════════════════
              ISOMETRIC VECTOR SCENE (Clean Site Palette: Cyan/Blue/White)
             ══════════════════════════════════════════════════════════ */}
          <div className="dyn-cloud-iso__stage-viewport">
            
            <svg 
              viewBox="0 0 1000 620" 
              className={`dyn-cloud-iso__svg ${isTransmitting ? 'dyn-cloud-iso__svg--transmitting' : ''}`}
            >
              <defs>
                {/* Gradients matching site colors */}
                <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#e0f2fe" />
                </linearGradient>
                <linearGradient id="cloudEdge" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>
                <linearGradient id="rackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00f5ff" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
                <linearGradient id="dbBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>

                {/* Glow Filter */}
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* ── ISOMETRIC CIRCUIT HIGHWAYS (TRANSMISSION TRACKS) ── */}
              <g className="dyn-cloud-iso__circuits">
                {/* Circuit Grid Ground Shadows */}
                <path d="M 500 240 L 500 360 L 250 420 L 180 390" className="dyn-cloud-iso__circuit-line" />
                <path d="M 500 240 L 500 360 L 730 400 L 760 360" className="dyn-cloud-iso__circuit-line" />
                <path d="M 500 240 L 500 380 L 680 470 L 720 500" className="dyn-cloud-iso__circuit-line" />
                <path d="M 500 240 L 440 320 L 360 350 L 370 470" className="dyn-cloud-iso__circuit-line" />
                <path d="M 500 240 L 560 310 L 850 350 L 870 420" className="dyn-cloud-iso__circuit-line" />
                <path d="M 250 420 L 250 510 L 150 540" className="dyn-cloud-iso__circuit-line" />
                <path d="M 680 470 L 600 520 L 580 550" className="dyn-cloud-iso__circuit-line" />

                {/* Neon Dashed Flowing Tracks */}
                <path d="M 500 240 L 500 360 L 250 420 L 180 390" className="dyn-cloud-iso__circuit-dash" />
                <path d="M 500 240 L 500 360 L 730 400 L 760 360" className="dyn-cloud-iso__circuit-dash" />
                <path d="M 500 240 L 500 380 L 680 470 L 720 500" className="dyn-cloud-iso__circuit-dash" />
                <path d="M 500 240 L 440 320 L 360 350 L 370 470" className="dyn-cloud-iso__circuit-dash" />
                <path d="M 500 240 L 560 310 L 850 350 L 870 420" className="dyn-cloud-iso__circuit-dash" />
              </g>

              {/* ── ANIMATED DATA PACKETS TRAVELING ON HIGHWAYS ── */}
              <g className="dyn-cloud-iso__particles">
                {/* Cloud to Monitor */}
                <circle r="4.5" className="dyn-cloud-iso__packet dyn-cloud-iso__packet--cyan">
                  <animateMotion path="M 500 240 L 500 360 L 250 420 L 180 390" dur="2.4s" repeatCount="indefinite" />
                </circle>
                {/* Cloud to Laptop */}
                <circle r="4.5" className="dyn-cloud-iso__packet dyn-cloud-iso__packet--blue">
                  <animateMotion path="M 500 240 L 500 360 L 730 400 L 760 360" dur="2.2s" repeatCount="indefinite" />
                </circle>
                {/* Cloud to Mobile */}
                <circle r="4.5" className="dyn-cloud-iso__packet dyn-cloud-iso__packet--green">
                  <animateMotion path="M 500 240 L 500 380 L 680 470 L 720 500" dur="2.6s" repeatCount="indefinite" />
                </circle>
                {/* Cloud to Cylindrical DB 1 */}
                <circle r="4.5" className="dyn-cloud-iso__packet dyn-cloud-iso__packet--cyan">
                  <animateMotion path="M 500 240 L 440 320 L 360 350 L 370 470" dur="2.0s" repeatCount="indefinite" />
                </circle>
                {/* Cloud to Cylindrical DB 2 */}
                <circle r="4.5" className="dyn-cloud-iso__packet dyn-cloud-iso__packet--blue">
                  <animateMotion path="M 500 240 L 560 310 L 850 350 L 870 420" dur="2.1s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* ── 1. NŒUD CENTRAL : LE NUAGE 3D AVEC SERVEURS ── */}
              <g 
                className="dyn-cloud-iso__node-group" 
                onClick={() => setActiveNode('cloud')}
                cursor="pointer"
              >
                {/* Isometric Base Glow */}
                <ellipse cx="500" cy="230" rx="140" ry="40" fill="rgba(2, 132, 199, 0.12)" filter="url(#neonGlow)" />

                {/* 3D Isometric Cloud Body */}
                <g transform="translate(370, 70)">
                  {/* Cloud Backing / Depth */}
                  <path 
                    d="M 60 110 C 20 110, 0 85, 20 55 C 35 25, 75 20, 95 38 C 115 10, 165 8, 190 35 C 220 20, 255 45, 245 75 C 265 95, 250 120, 220 125 L 60 125 Z" 
                    fill="#0284c7" 
                    opacity="0.3"
                    transform="translate(8, 10)"
                  />
                  {/* Cloud Main Front */}
                  <path 
                    d="M 60 110 C 20 110, 0 85, 20 55 C 35 25, 75 20, 95 38 C 115 10, 165 8, 190 35 C 220 20, 255 45, 245 75 C 265 95, 250 120, 220 125 L 60 125 Z" 
                    fill="url(#cloudGrad)" 
                    stroke="#0284c7" 
                    strokeWidth="3.5"
                  />

                  {/* Internal Isometric Server Racks inside the Cloud */}
                  {/* Server Blade 1 */}
                  <g transform="translate(68, 62)">
                    <rect x="0" y="0" width="34" height="42" rx="4" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
                    <line x1="4" y1="8" x2="30" y2="8" stroke="#00f5ff" strokeWidth="2.5" />
                    <line x1="4" y1="16" x2="30" y2="16" stroke="#0284c7" strokeWidth="2.5" />
                    <line x1="4" y1="24" x2="30" y2="24" stroke="#00f5ff" strokeWidth="2.5" />
                    <line x1="4" y1="32" x2="30" y2="32" stroke="#10b981" strokeWidth="2.5" />
                    <circle cx="26" cy="38" r="2" fill="#10b981" />
                  </g>

                  {/* Server Blade 2 */}
                  <g transform="translate(112, 50)">
                    <rect x="0" y="0" width="38" height="54" rx="4" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
                    <line x1="4" y1="9" x2="34" y2="9" stroke="#0284c7" strokeWidth="2.5" />
                    <line x1="4" y1="18" x2="34" y2="18" stroke="#00f5ff" strokeWidth="2.5" />
                    <line x1="4" y1="27" x2="34" y2="27" stroke="#0284c7" strokeWidth="2.5" />
                    <line x1="4" y1="36" x2="34" y2="36" stroke="#10b981" strokeWidth="2.5" />
                    <line x1="4" y1="45" x2="34" y2="45" stroke="#00f5ff" strokeWidth="2.5" />
                  </g>

                  {/* Server Blade 3 */}
                  <g transform="translate(160, 58)">
                    <rect x="0" y="0" width="34" height="46" rx="4" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
                    <line x1="4" y1="9" x2="30" y2="9" stroke="#00f5ff" strokeWidth="2.5" />
                    <line x1="4" y1="18" x2="30" y2="18" stroke="#0284c7" strokeWidth="2.5" />
                    <line x1="4" y1="27" x2="30" y2="27" stroke="#00f5ff" strokeWidth="2.5" />
                    <line x1="4" y1="36" x2="30" y2="36" stroke="#10b981" strokeWidth="2.5" />
                  </g>
                </g>

                {/* Cloud Label Badge */}
                <g transform="translate(425, 205)">
                  <rect x="0" y="0" width="150" height="24" rx="12" fill="#0284c7" />
                  <text x="75" y="16" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
                    NUAGE CLOUD ANYCAST
                  </text>
                </g>
              </g>

              {/* ── 2. NŒUD GAUCHE : MONITEUR POSTE DE TRAVAIL & BASE ── */}
              <g 
                className="dyn-cloud-iso__node-group" 
                onClick={() => setActiveNode('monitor')}
                cursor="pointer"
                transform="translate(120, 340)"
              >
                {/* Desktop Monitor Bezel */}
                <rect x="20" y="0" width="120" height="85" rx="6" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
                {/* Screen Content */}
                <rect x="26" y="6" width="108" height="73" rx="4" fill="#f0f9ff" />
                {/* Cloud Sync Icon on Screen */}
                <path d="M 64 45 C 55 45, 50 38, 55 30 C 58 22, 70 20, 78 26 C 84 18, 96 22, 98 30 C 105 32, 104 42, 96 45 Z" fill="#0284c7" opacity="0.8" />
                {/* Sync Arrows */}
                <circle cx="80" cy="54" r="8" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 2" />
                
                {/* Stand & Base */}
                <polygon points="72,85 88,85 92,108 68,108" fill="#cbd5e1" />
                <ellipse cx="80" cy="110" rx="28" ry="7" fill="#94a3b8" />

                {/* Label */}
                <text x="80" y="130" fill="#0f172a" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
                  Console Entreprise
                </text>
              </g>

              {/* ── 3. NŒUDS DE BASE DE DONNÉES CYLINDRIQUES (STORAGE) ── */}
              {/* Cylindrical DB 1 (Left near monitor) */}
              <g transform="translate(60, 410)" cursor="pointer" onClick={() => setActiveNode('db-left')}>
                {/* 3 stacked discs */}
                <g transform="translate(0, 0)">
                  <ellipse cx="32" cy="12" rx="30" ry="10" fill="url(#dbBlue)" />
                  <path d="M 2 12 L 2 24 A 30 10 0 0 0 62 24 L 62 12 Z" fill="#0284c7" />
                  <ellipse cx="32" cy="24" rx="30" ry="10" fill="#38bdf8" />
                </g>
                <g transform="translate(0, 16)">
                  <path d="M 2 24 L 2 36 A 30 10 0 0 0 62 36 L 62 24 Z" fill="#0284c7" />
                  <ellipse cx="32" cy="36" rx="30" ry="10" fill="#38bdf8" />
                </g>
                <g transform="translate(0, 32)">
                  <path d="M 2 36 L 2 48 A 30 10 0 0 0 62 48 L 62 36 Z" fill="#0284c7" />
                  <ellipse cx="32" cy="48" rx="30" ry="10" fill="#38bdf8" />
                </g>
                <text x="32" y="70" fill="#0f172a" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
                  Storage L1
                </text>
              </g>

              {/* Cylindrical DB 2 (Center Lower) */}
              <g transform="translate(340, 460)" cursor="pointer" onClick={() => setActiveNode('db-center')}>
                <g transform="translate(0, 0)">
                  <ellipse cx="30" cy="10" rx="28" ry="9" fill="url(#dbBlue)" />
                  <path d="M 2 10 L 2 22 A 28 9 0 0 0 58 22 L 58 10 Z" fill="#0284c7" />
                  <ellipse cx="30" cy="22" rx="28" ry="9" fill="#38bdf8" />
                </g>
                <g transform="translate(0, 14)">
                  <path d="M 2 22 L 2 34 A 28 9 0 0 0 58 34 L 58 22 Z" fill="#0284c7" />
                  <ellipse cx="30" cy="34" rx="28" ry="9" fill="#38bdf8" />
                </g>
                <text x="30" y="54" fill="#0f172a" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
                  Redis Cache
                </text>
              </g>

              {/* Cylindrical DB 3 (Right Node) */}
              <g transform="translate(830, 420)" cursor="pointer" onClick={() => setActiveNode('db-right')}>
                <g transform="translate(0, 0)">
                  <ellipse cx="34" cy="12" rx="32" ry="10" fill="url(#dbBlue)" />
                  <path d="M 2 12 L 2 26 A 32 10 0 0 0 66 26 L 66 12 Z" fill="#0284c7" />
                  <ellipse cx="34" cy="26" rx="32" ry="10" fill="#38bdf8" />
                </g>
                <g transform="translate(0, 18)">
                  <path d="M 2 26 L 2 40 A 32 10 0 0 0 66 40 L 66 26 Z" fill="#0284c7" />
                  <ellipse cx="34" cy="40" rx="32" ry="10" fill="#38bdf8" />
                </g>
                <g transform="translate(0, 36)">
                  <path d="M 2 40 L 2 54 A 32 10 0 0 0 66 54 L 66 40 Z" fill="#0284c7" />
                  <ellipse cx="34" cy="54" rx="32" ry="10" fill="#38bdf8" />
                </g>
                <text x="34" y="74" fill="#0f172a" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
                  PostgreSQL Cluster
                </text>
              </g>

              {/* ── 4. NŒUD HAUT-DROITE : LAPTOP ISOMÉTRIQUE ── */}
              <g 
                className="dyn-cloud-iso__node-group" 
                onClick={() => setActiveNode('laptop')}
                cursor="pointer"
                transform="translate(680, 180)"
              >
                {/* Laptop Screen Lid */}
                <polygon points="40,20 130,0 130,75 40,95" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2.5" />
                {/* Cloud icon on laptop display */}
                <path d="M 75 45 C 70 45, 68 40, 71 35 C 73 30, 80 29, 85 33 C 89 27, 96 30, 97 35 C 101 36, 100 43, 95 45 Z" fill="#0284c7" opacity="0.8" />
                
                {/* Laptop Keyboard Base */}
                <polygon points="40,95 130,75 160,110 70,130" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                {/* Trackpad & Keys texture */}
                <polygon points="56,98 124,82 144,106 76,122" fill="#334155" opacity="0.7" />

                <text x="100" y="148" fill="#0f172a" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
                  Laptop Développeur
                </text>
              </g>

              {/* ── 5. NŒUD BAS-DROITE : SMARTPHONE & ESPACE COLLABORATIF ── */}
              <g 
                className="dyn-cloud-iso__node-group" 
                onClick={() => setActiveNode('mobile')}
                cursor="pointer"
                transform="translate(640, 440)"
              >
                {/* Smartphone Isometric Plate */}
                <polygon points="50,15 160,0 190,55 80,70" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
                <polygon points="56,18 154,5 180,50 82,63" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
                
                {/* Miniature Workdesk / Screen on smartphone */}
                <rect x="90" y="24" width="45" height="24" rx="3" fill="#ffffff" stroke="#15803d" strokeWidth="1.5" />
                <circle cx="112" cy="36" r="4" fill="#15803d" />

                <text x="120" y="86" fill="#0f172a" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
                  Terminal Mobile & PWA
                </text>
              </g>

              {/* Glowing Junction Dots */}
              <circle cx="500" cy="240" r="6" fill="#00f5ff" filter="url(#neonGlow)" />
              <circle cx="250" cy="420" r="5" fill="#0284c7" />
              <circle cx="730" cy="400" r="5" fill="#0284c7" />
              <circle cx="680" cy="470" r="5" fill="#10b981" />
              <circle cx="360" cy="350" r="5" fill="#0284c7" />
              <circle cx="850" cy="350" r="5" fill="#0284c7" />
            </svg>

          </div>

          {/* Bottom Live Streaming Event Logs */}
          <div className="dyn-cloud-iso__events-box">
            <div className="dyn-cloud-iso__events-top">
              <div className="dyn-cloud-iso__events-title">
                <Activity size={13} color="#0284c7" />
                <span>Flux de Synchronisation & Transmission en Direct :</span>
              </div>
              <span className="dyn-cloud-iso__events-sla">● SLA 99.999% • 0 perte de données</span>
            </div>

            <div className="dyn-cloud-iso__events-list">
              {logs.map((lg) => (
                <div key={lg.id} className="dyn-cloud-iso__event-row">
                  <span className="dyn-cloud-iso__event-time">{lg.time}</span>
                  <div className="dyn-cloud-iso__event-route">
                    <span className="dyn-cloud-iso__src">{lg.source}</span>
                    <ArrowRight size={12} className="dyn-cloud-iso__route-arrow" />
                    <span className="dyn-cloud-iso__tgt">{lg.target}</span>
                  </div>
                  <span className="dyn-cloud-iso__payload">{lg.payload}</span>
                  <span className="dyn-cloud-iso__speed">{lg.speed}</span>
                  <span className={`dyn-cloud-iso__status-pill dyn-cloud-iso__status-pill--${lg.status}`}>
                    <CheckCircle2 size={11} />
                    {lg.status === 'synced' ? 'Synchronisé' : lg.status === 'replicated' ? 'Répliqué' : 'En transmission'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
