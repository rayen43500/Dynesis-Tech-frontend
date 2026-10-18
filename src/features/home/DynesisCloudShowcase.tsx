import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Database, 
  Zap, 
  ArrowRight, 
  RefreshCw, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Server, 
  Activity, 
  HardDrive,
  Copy,
  Check
} from 'lucide-react';
import './dynesis-cloud-showcase.css';

interface TransmissionBatch {
  id: number;
  time: string;
  source: string;
  target: string;
  packets: string;
  speed: string;
  status: string;
}

export function DynesisCloudShowcase() {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [dataSpeed, setDataSpeed] = useState('1.8 GB/s');
  const [syncStatus, setSyncStatus] = useState('99.999% Synchronisé');
  const [totalTransferredGB, setTotalTransferredGB] = useState(482.4);
  const [copied, setCopied] = useState(false);

  const [batches, setBatches] = useState<TransmissionBatch[]>([
    { id: 1, time: '18:42:01', source: 'Nuage Cloud Anycast (Paris)', target: 'Base PostgreSQL Cluster', packets: '50 000 reqs', speed: '2.1 GB/s', status: 'Transmis' },
    { id: 2, time: '18:42:02', source: 'Cluster DB Réplique (Francfort)', target: 'Cache Redis Distribué', packets: '12 800 ops', speed: '1.4 GB/s', status: 'Répliqué' },
    { id: 3, time: '18:42:03', source: 'Passerelle Zero-Trust', target: 'Nuage Edge Global', packets: '24 000 flux', speed: '1.9 GB/s', status: 'Chiffré' }
  ]);

  // Live counter for total data transferred
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTransferredGB((prev) => +(prev + 0.3).toFixed(1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const triggerDataTransmission = () => {
    if (isTransmitting) return;
    setIsTransmitting(true);
    setDataSpeed('3.4 GB/s');

    const now = new Date().toLocaleTimeString('fr-FR');
    const newBatch: TransmissionBatch = {
      id: Date.now(),
      time: now,
      source: 'Nuage Cloud Multi-Régions',
      target: 'Base de Données Shardée & Cache',
      packets: '100 000 paquets',
      speed: '3.4 GB/s',
      status: 'Transfert Ultra-Véloce'
    };

    setBatches((prev) => [newBatch, ...prev.slice(0, 3)]);

    setTimeout(() => {
      setIsTransmitting(false);
      setDataSpeed('1.8 GB/s');
    }, 1800);
  };

  const copyEndpoint = () => {
    navigator.clipboard?.writeText('https://cloud.dynesis.tech/v1/data-stream');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="dyn-cloud-sim" id="cloud-infrastructure" aria-label="Simulation Nuage et Base de Données">
      <div className="dyn-cloud-sim__container">
        
        {/* Harmonious Header */}
        <header className="dyn-cloud-sim__header">
          <div className="dyn-cloud-sim__eyebrow">
            <span className="dyn-cloud-sim__pulse-dot" />
            <span>(INFRASTRUCTURE CLOUD) — SIMULATION NUAGE & BASE DE DONNÉES</span>
          </div>
          <h2 className="dyn-cloud-sim__title">
            Transmission de Données Nuage & Base Distribuée
          </h2>
          <p className="dyn-cloud-sim__subtitle">
            Visualisez le flux continu de données entre nos clusters Cloud Anycast et nos bases PostgreSQL & Redis shartées : réplication multi-régions instantanée, zéro latence et intégrité totale.
          </p>
        </header>

        {/* Master Simulation Sandbox in Clear Light Style */}
        <div className="dyn-cloud-sim__card">
          
          {/* Top Window Bar */}
          <div className="dyn-cloud-sim__topbar">
            <div className="dyn-cloud-sim__dots">
              <span className="dyn-cloud-sim__dot dyn-cloud-sim__dot--red" />
              <span className="dyn-cloud-sim__dot dyn-cloud-sim__dot--yellow" />
              <span className="dyn-cloud-sim__dot dyn-cloud-sim__dot--green" />
            </div>

            <div className="dyn-cloud-sim__cluster-id">
              <Cloud size={14} color="#0284c7" />
              <span>dynesis://cloud-data-pipe • 18 Régions Anycast</span>
            </div>

            <button
              type="button"
              onClick={copyEndpoint}
              className="dyn-cloud-sim__endpoint-btn"
              title="Copier l'endpoint de streaming"
            >
              {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
              <span>{copied ? 'Endpoint Copié' : 'Endpoint API'}</span>
            </button>
          </div>

          {/* Core Interactive Simulation Arena */}
          <div className="dyn-cloud-sim__arena">
            
            {/* 1. NUAGE CLOUD COMPONENT */}
            <div className="dyn-cloud-sim__node dyn-cloud-sim__node--cloud">
              <div className="dyn-cloud-sim__cloud-icon-wrap">
                <Cloud size={48} className="dyn-cloud-sim__cloud-icon" />
                <span className="dyn-cloud-sim__cloud-pulse" />
              </div>
              <h3 className="dyn-cloud-sim__node-title">Nuage Cloud Dynesis</h3>
              <span className="dyn-cloud-sim__node-badge">18 Régions Edge Anycast</span>
              
              <div className="dyn-cloud-sim__specs">
                <div className="dyn-cloud-sim__spec-item">
                  <span className="dyn-cloud-sim__spec-k">Throughput :</span>
                  <strong className="dyn-cloud-sim__spec-v">142,000 req/s</strong>
                </div>
                <div className="dyn-cloud-sim__spec-item">
                  <span className="dyn-cloud-sim__spec-k">Latence :</span>
                  <strong className="dyn-cloud-sim__spec-v dyn-cloud-sim__spec-v--cyan">3.2 ms</strong>
                </div>
              </div>
            </div>

            {/* 2. TRANSMISSION DE DONNÉES EN DIRECT (STREAMING BEAM) */}
            <div className="dyn-cloud-sim__transmission-pipe">
              
              <div className="dyn-cloud-sim__pipe-header">
                <span className="dyn-cloud-sim__pipe-title">Faisceau de Transmission en Direct</span>
                <span className="dyn-cloud-sim__pipe-speed">{dataSpeed}</span>
              </div>

              {/* Animated Particle Tube */}
              <div className="dyn-cloud-sim__tube">
                <div className={`dyn-cloud-sim__stream-line ${isTransmitting ? 'dyn-cloud-sim__stream-line--fast' : ''}`} />
                <div className="dyn-cloud-sim__particle dyn-cloud-sim__particle--1" />
                <div className="dyn-cloud-sim__particle dyn-cloud-sim__particle--2" />
                <div className="dyn-cloud-sim__particle dyn-cloud-sim__particle--3" />
                <div className="dyn-cloud-sim__particle dyn-cloud-sim__particle--4" />
              </div>

              <div className="dyn-cloud-sim__pipe-footer">
                <div className="dyn-cloud-sim__crypto-tag">
                  <Lock size={12} color="#10b981" />
                  <span>Chiffrement TLS 1.3 + ChaCha20</span>
                </div>
                <div className="dyn-cloud-sim__crypto-tag">
                  <ShieldCheck size={12} color="#0284c7" />
                  <span>0% Perte de Paquets</span>
                </div>
              </div>

              {/* Interactive Trigger Button */}
              <button
                type="button"
                disabled={isTransmitting}
                onClick={triggerDataTransmission}
                className="dyn-cloud-sim__trans-btn"
              >
                {isTransmitting ? (
                  <>
                    <RefreshCw size={14} className="dyn-cloud-sim__spin" />
                    Transmission de 100 000 paquets en cours...
                  </>
                ) : (
                  <>
                    <Zap size={14} fill="currentColor" />
                    Déclencher Transmission & Synchronisation DB
                  </>
                )}
              </button>

            </div>

            {/* 3. BASE DE DONNÉES CLUSTER COMPONENT */}
            <div className="dyn-cloud-sim__node dyn-cloud-sim__node--db">
              <div className="dyn-cloud-sim__db-icon-wrap">
                <Database size={44} className="dyn-cloud-sim__db-icon" />
                <span className="dyn-cloud-sim__db-led" />
              </div>
              <h3 className="dyn-cloud-sim__node-title">Cluster Base de Données</h3>
              <span className="dyn-cloud-sim__node-badge dyn-cloud-sim__node-badge--green">PostgreSQL 16 + Redis</span>
              
              <div className="dyn-cloud-sim__specs">
                <div className="dyn-cloud-sim__spec-item">
                  <span className="dyn-cloud-sim__spec-k">Shards Actifs :</span>
                  <strong className="dyn-cloud-sim__spec-v">16 Shards Dédiés</strong>
                </div>
                <div className="dyn-cloud-sim__spec-item">
                  <span className="dyn-cloud-sim__spec-k">Réplication :</span>
                  <strong className="dyn-cloud-sim__spec-v dyn-cloud-sim__spec-v--green">{syncStatus}</strong>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Live Batches Audit Feed */}
          <div className="dyn-cloud-sim__batches-box">
            <div className="dyn-cloud-sim__batches-top">
              <div className="dyn-cloud-sim__batches-label">
                <Activity size={13} color="#0284c7" />
                <span>Journal des Paquets Transmis en Temps Réel :</span>
              </div>
              <div className="dyn-cloud-sim__total-trans">
                <span>Volume total transféré :</span>
                <strong>{totalTransferredGB} Go</strong>
              </div>
            </div>

            <div className="dyn-cloud-sim__batches-list">
              {batches.map((b) => (
                <div key={b.id} className="dyn-cloud-sim__batch-row">
                  <span className="dyn-cloud-sim__batch-time">{b.time}</span>
                  <div className="dyn-cloud-sim__batch-flow">
                    <span className="dyn-cloud-sim__batch-src">{b.source}</span>
                    <ArrowRight size={12} className="dyn-cloud-sim__batch-arrow" />
                    <span className="dyn-cloud-sim__batch-tgt">{b.target}</span>
                  </div>
                  <span className="dyn-cloud-sim__batch-packets">{b.packets}</span>
                  <span className="dyn-cloud-sim__batch-speed">{b.speed}</span>
                  <span className="dyn-cloud-sim__batch-status">
                    <CheckCircle2 size={12} color="#10b981" />
                    {b.status}
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
