import React, { useState } from 'react';
import { 
  Cloud, 
  Database, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Laptop, 
  Smartphone,
  Server
} from 'lucide-react';
import './dynesis-cloud-showcase.css';

interface Hotspot {
  id: string;
  x: string;
  y: string;
  label: string;
  detail: string;
  icon: typeof Cloud;
}

const HOTSPOTS: Hotspot[] = [
  { 
    id: 'cloud', 
    x: '44%', 
    y: '22%', 
    label: 'Nuage Cloud Anycast', 
    detail: '18 régions mondiales • Auto-scaling élastique',
    icon: Cloud 
  },
  { 
    id: 'db', 
    x: '78%', 
    y: '58%', 
    label: 'Cluster PostgreSQL & Redis', 
    detail: 'Sharding dynamique • Réplication temps réel zéro perte',
    icon: Database 
  },
  { 
    id: 'laptop', 
    x: '64%', 
    y: '34%', 
    label: 'Postes & Dashboards Clients', 
    detail: 'Synchronisation instantanée des données métier',
    icon: Laptop 
  },
  { 
    id: 'mobile', 
    x: '68%', 
    y: '74%', 
    label: 'Terminaux Mobiles & PWA', 
    detail: 'Cache hors-ligne et réconciliation automatique',
    icon: Smartphone 
  }
];

export function DynesisCloudShowcase() {
  const [activeSpot, setActiveSpot] = useState<Hotspot>(HOTSPOTS[0]);

  return (
    <section className="dyn-cloud-smart" id="cloud-infrastructure" aria-label="Architecture Cloud et Base de Données">
      <div className="dyn-cloud-smart__container">
        
        {/* Header - Clean, Harmonious and Compact */}
        <header className="dyn-cloud-smart__header">
          <div className="tech-section-tag-wrapper">
            <span className="tech-section-tag">(F) — ARCHITECTURE CLOUD & BASES DISTRIBUÉES</span>
            <div className="tech-section-tag-line" aria-hidden="true" />
          </div>
          <h2 className="dyn-cloud-smart__title">
            Écosystème Cloud & Données Distribuées
          </h2>
          <p className="dyn-cloud-smart__subtitle">
            Une architecture haute disponibilité reliant notre nuage central, nos bases de données distribuées et l'ensemble de vos terminaux applicatifs.
          </p>
        </header>

        {/* The Smart Architecture Visual Card */}
        <div className="dyn-cloud-smart__frame">
          
          <div className="dyn-cloud-smart__image-wrapper">
            <img 
              src="/images/dynesis-cloud-smart-architecture.jpg" 
              alt="Architecture Cloud et Base de Données Dynesis Tech" 
              className="dyn-cloud-smart__image"
              loading="lazy"
            />

            {/* Subtle Interactive Hotspot Pulsing Markers */}
            {HOTSPOTS.map((spot) => {
              const isActive = activeSpot.id === spot.id;
              const Icon = spot.icon;
              return (
                <div 
                  key={spot.id} 
                  className={`dyn-cloud-smart__hotspot ${isActive ? 'dyn-cloud-smart__hotspot--active' : ''}`}
                  style={{ left: spot.x, top: spot.y }}
                  onClick={() => setActiveSpot(spot)}
                >
                  <button 
                    type="button" 
                    className="dyn-cloud-smart__pin"
                    title={spot.label}
                    aria-label={spot.label}
                  >
                    <Icon size={14} className="dyn-cloud-smart__pin-icon" />
                    <span className="dyn-cloud-smart__pin-ripple" />
                  </button>

                  <div className="dyn-cloud-smart__popover">
                    <strong className="dyn-cloud-smart__pop-title">{spot.label}</strong>
                    <span className="dyn-cloud-smart__pop-desc">{spot.detail}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Node Detail Strip */}
          <div className="dyn-cloud-smart__active-bar">
            <div className="dyn-cloud-smart__active-left">
              <span className="dyn-cloud-smart__active-badge">COMPOSANT SÉLECTIONNÉ</span>
              <strong className="dyn-cloud-smart__active-name">{activeSpot.label}</strong>
              <span className="dyn-cloud-smart__active-desc">{activeSpot.detail}</span>
            </div>
            <div className="dyn-cloud-smart__active-kpi">
              <span className="dyn-cloud-smart__kpi-dot" />
              <span>SLA 99.999% • Zéro perte de données</span>
            </div>
          </div>

        </div>

        {/* 3 Compact Architectural Highlights */}
        <div className="dyn-cloud-smart__highlights">
          <div className="dyn-cloud-smart__highlight-card">
            <div className="dyn-cloud-smart__hl-icon-wrap">
              <Cloud size={20} className="dyn-cloud-smart__hl-icon" />
            </div>
            <div>
              <h4 className="dyn-cloud-smart__hl-title">Nuage Anycast Mondial</h4>
              <p className="dyn-cloud-smart__hl-desc">Routage intelligent sur 18 régions pour absorber toute montée en charge sans latence.</p>
            </div>
          </div>

          <div className="dyn-cloud-smart__highlight-card">
            <div className="dyn-cloud-smart__hl-icon-wrap dyn-cloud-smart__hl-icon-wrap--green">
              <Database size={20} className="dyn-cloud-smart__hl-icon dyn-cloud-smart__hl-icon--green" />
            </div>
            <div>
              <h4 className="dyn-cloud-smart__hl-title">Bases PostgreSQL & Redis</h4>
              <p className="dyn-cloud-smart__hl-desc">Sharding horizontal, réplication synchrone et cache distribué ultra-rapide.</p>
            </div>
          </div>

          <div className="dyn-cloud-smart__highlight-card">
            <div className="dyn-cloud-smart__hl-icon-wrap dyn-cloud-smart__hl-icon-wrap--blue">
              <ShieldCheck size={20} className="dyn-cloud-smart__hl-icon dyn-cloud-smart__hl-icon--blue" />
            </div>
            <div>
              <h4 className="dyn-cloud-smart__hl-title">Chiffrement End-to-End</h4>
              <p className="dyn-cloud-smart__hl-desc">Flux de transmission sécurisés en TLS 1.3 avec protection Zero-Trust intégrée.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
