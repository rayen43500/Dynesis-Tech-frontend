import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Server, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Layers, 
  Globe, 
  CheckCircle2, 
  Terminal, 
  Copy, 
  Check, 
  RefreshCw,
  ArrowRight,
  TrendingUp,
  HardDrive
} from 'lucide-react';
import { useBrandingContent } from '../../shared/hooks/useSiteContent';
import './dynesis-cloud-showcase.css';

interface MicroserviceNode {
  id: string;
  name: string;
  type: string;
  status: 'healthy' | 'scaling' | 'optimizing';
  latency: number;
  ops: string;
}

const DEFAULT_NODES: MicroserviceNode[] = [
  { id: 'gw', name: 'Auth & Zero-Trust Gateway', type: 'Security', status: 'healthy', latency: 8, ops: '1.4k req/s' },
  { id: 'ai', name: 'Neural AI Inference Engine', type: 'IA Core', status: 'healthy', latency: 12, ops: '4.8k ops/s' },
  { id: 'db', name: 'PostgreSQL & Redis Cache Cluster', type: 'Database', status: 'healthy', latency: 4, ops: '99.999% sync' },
  { id: 'cdn', name: 'Global Anycast CDN Workers', type: 'Edge Network', status: 'healthy', latency: 6, ops: '18 régions' },
  { id: 'w3', name: 'Smart Contract & API Relay', type: 'Web3 & API', status: 'healthy', latency: 15, ops: 'Zéro coupure' }
];

export function DynesisCloudShowcase() {
  const branding = useBrandingContent();
  const [copied, setCopied] = useState(false);
  const [selectedNode, setSelectedNode] = useState<MicroserviceNode>(DEFAULT_NODES[0]);
  const [isLoadTesting, setIsLoadTesting] = useState(false);
  const [requestsCount, setRequestsCount] = useState(48290);
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] ⚡ Dynesis Cloud Core v4.2 initialisé',
    '[NETWORK] 🌐 18 nœuds Edge Anycast synchronisés',
    '[SECURITY] 🛡 Bouclier WAF actif • 0 menace',
    '[DATABASE] 💾 PostgreSQL & Redis actifs (0ms lag)',
    '[AUTOSCALE] 🚀 Équilibrage de charge adaptatif activé'
  ]);

  // Live request counter increment
  useEffect(() => {
    const interval = setInterval(() => {
      setRequestsCount((prev) => prev + Math.floor(Math.random() * 18) + 8);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  function handleCopyEndpoint() {
    navigator.clipboard?.writeText('https://cloud.dynesis.tech/v1/cluster');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleTriggerLoadTest() {
    if (isLoadTesting) return;
    setIsLoadTesting(true);
    
    const time = new Date().toLocaleTimeString('fr-FR');
    setLogs((prev) => [
      `[${time}] ⚡ TEST DE CHARGE : +5k req simulées...`,
      `[${time}] 📈 Auto-scaling : +4 workers GPU prêts`,
      ...prev.slice(0, 4)
    ]);

    setTimeout(() => {
      const finishTime = new Date().toLocaleTimeString('fr-FR');
      setLogs((prev) => [
        `[${finishTime}] ✔ Succès : 100% requêtes (8.4ms)`,
        ...prev.slice(0, 5)
      ]);
      setIsLoadTesting(false);
    }, 2000);
  }

  function handlePingCluster() {
    const time = new Date().toLocaleTimeString('fr-FR');
    const newLatency = Math.floor(Math.random() * 6) + 4;
    setLogs((prev) => [
      `[${time}] 📶 Ping EU-Paris : ${newLatency}ms (OK)`,
      ...prev.slice(0, 5)
    ]);
  }

  return (
    <section className="dyn-cloud-sec" id="cloud-infrastructure" aria-label="Plateforme Cloud Dynesis">
      <div className="dyn-cloud-sec__glow" aria-hidden="true" />

      <div className="dyn-cloud-sec__container">
        {/* Section Header */}
        <header className="dyn-cloud-sec__header">
          <div className="dyn-cloud-sec__tag-wrapper">
            <span className="dyn-cloud-sec__tag">(F) — INFRASTRUCTURE CLOUD & ÉCOSYSTÈME IA</span>
            <div className="dyn-cloud-sec__tag-line" aria-hidden="true" />
          </div>

          <h2 className="dyn-cloud-sec__title">
            Une infrastructure Cloud complète, <br />
            pilotée pour <span className="dyn-cloud-sec__title-accent">l'excellence.</span>
          </h2>

          <p className="dyn-cloud-sec__sub">
            Découvrez la puissance et la robustesse de nos déploiements : architecture distribuée, temps de réponse sous les 10ms, sécurité renforcée et observabilité temps réel.
          </p>
        </header>

        {/* Master Cloud Simulation Window */}
        <div className="dyn-cloud-win">
          {/* Window Chrome Titlebar */}
          <div className="dyn-cloud-win__titlebar">
            <div className="dyn-cloud-win__traffic-lights">
              <span className="dyn-cloud-win__dot dyn-cloud-win__dot--red" />
              <span className="dyn-cloud-win__dot dyn-cloud-win__dot--yellow" />
              <span className="dyn-cloud-win__dot dyn-cloud-win__dot--green" />
            </div>

            {/* Brand Logo & Name */}
            <div className="dyn-cloud-win__brand">
              <img 
                src={branding.logoUrl || '/images/dynesistech.png'} 
                alt="Dynesis" 
                className="dyn-cloud-win__logo-img" 
                onError={(e) => { e.currentTarget.src = '/images/dynesistech.png'; }}
              />
              <span className="dyn-cloud-win__brand-text">Dynesis Cloud Core</span>
            </div>

            {/* Address & Fast Copy */}
            <div className="dyn-cloud-win__address-bar">
              <span className="dyn-cloud-win__address-text">cluster: eu-west-paris-1 (AWS & Edge)</span>
              <button 
                type="button" 
                className="dyn-cloud-win__copy-btn"
                onClick={handleCopyEndpoint}
                title="Copier l'URL de l'API"
              >
                {copied ? <Check size={11} style={{ color: '#059669' }} /> : <Copy size={11} />}
                <span>{copied ? 'Copié !' : 'Endpoint'}</span>
              </button>
            </div>
          </div>

          {/* Window Body 3-Column Layout */}
          <div className="dyn-cloud-win__body">
            {/* COLUMN 1: Microservices Fleet */}
            <div className="dyn-cloud-win__col dyn-cloud-win__col--fleet">
              <div className="dyn-cloud-win__col-header">
                <Server size={13} style={{ color: '#0080ff' }} />
                <span>NŒUDS & MICROSERVICES</span>
                <span className="dyn-cloud-win__badge-count">{DEFAULT_NODES.length} actifs</span>
              </div>

              <div className="dyn-cloud-win__nodes-list">
                {DEFAULT_NODES.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      className={`dyn-cloud-win__node-item ${isSelected ? 'dyn-cloud-win__node-item--active' : ''}`}
                      onClick={() => setSelectedNode(node)}
                    >
                      <div className="dyn-cloud-win__node-main">
                        <span className="dyn-cloud-win__node-dot" />
                        <span className="dyn-cloud-win__node-name">{node.name}</span>
                      </div>
                      <div className="dyn-cloud-win__node-meta">
                        <span className="dyn-cloud-win__node-type">{node.type}</span>
                        <span className="dyn-cloud-win__node-latency">{node.latency}ms</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* COLUMN 2: Architecture Visualizer & Live Metrics */}
            <div className="dyn-cloud-win__col dyn-cloud-win__col--metrics">
              <div className="dyn-cloud-win__col-header">
                <Activity size={13} style={{ color: '#0080ff' }} />
                <span>MÉTRIQUES & ÉTAT DU CLUSTER</span>
                <span className="dyn-cloud-win__badge-live">LIVE</span>
              </div>

              {/* Key Metrics Grid */}
              <div className="dyn-cloud-win__metrics-grid">
                <div className="dyn-cloud-win__metric-card">
                  <span className="dyn-cloud-win__metric-lbl">DISPONIBILITÉ SLA</span>
                  <span className="dyn-cloud-win__metric-val dyn-cloud-win__metric-val--emerald">99.99%</span>
                  <span className="dyn-cloud-win__metric-sub">Zéro coupure constatée</span>
                </div>
                <div className="dyn-cloud-win__metric-card">
                  <span className="dyn-cloud-win__metric-lbl">LATENCE GLOBALE</span>
                  <span className="dyn-cloud-win__metric-val dyn-cloud-win__metric-val--blue">7.4 ms</span>
                  <span className="dyn-cloud-win__metric-sub">Edge CDN optimisé</span>
                </div>
                <div className="dyn-cloud-win__metric-card">
                  <span className="dyn-cloud-win__metric-lbl">REQUÊTES TOTALES</span>
                  <span className="dyn-cloud-win__metric-val dyn-cloud-win__metric-val--indigo">{requestsCount.toLocaleString('fr-FR')}</span>
                  <span className="dyn-cloud-win__metric-sub">+18 req/sec</span>
                </div>
                <div className="dyn-cloud-win__metric-card">
                  <span className="dyn-cloud-win__metric-lbl">NŒUD SÉLECTIONNÉ</span>
                  <span className="dyn-cloud-win__metric-val dyn-cloud-win__metric-val--purple">{selectedNode.ops}</span>
                  <span className="dyn-cloud-win__metric-sub">{selectedNode.type}</span>
                </div>
              </div>

              {/* Animated Throughput Bars */}
              <div className="dyn-cloud-win__oscilloscope">
                <div className="dyn-cloud-win__osc-header">
                  <span>DÉBIT INSTANTANÉ DES DONNÉES</span>
                  <strong>3.8 GB/s</strong>
                </div>
                <div className="dyn-cloud-win__osc-bars">
                  <div className="dyn-cloud-win__osc-bar" style={{ height: '45%' }} />
                  <div className="dyn-cloud-win__osc-bar" style={{ height: '70%' }} />
                  <div className="dyn-cloud-win__osc-bar" style={{ height: '60%' }} />
                  <div className="dyn-cloud-win__osc-bar" style={{ height: '85%' }} />
                  <div className="dyn-cloud-win__osc-bar" style={{ height: '65%' }} />
                  <div className="dyn-cloud-win__osc-bar" style={{ height: '95%' }} />
                  <div className="dyn-cloud-win__osc-bar" style={{ height: '75%' }} />
                  <div className="dyn-cloud-win__osc-bar" style={{ height: '90%' }} />
                  <div className="dyn-cloud-win__osc-bar" style={{ height: '100%' }} />
                  <div className="dyn-cloud-win__osc-bar" style={{ height: '80%' }} />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="dyn-cloud-win__actions-row">
                <button
                  type="button"
                  className="dyn-cloud-win__action-btn dyn-cloud-win__action-btn--primary"
                  onClick={handleTriggerLoadTest}
                  disabled={isLoadTesting}
                >
                  <Zap size={12} />
                  <span>{isLoadTesting ? 'Simulation de charge...' : 'Lancer un Test de Charge'}</span>
                </button>
                <button
                  type="button"
                  className="dyn-cloud-win__action-btn dyn-cloud-win__action-btn--secondary"
                  onClick={handlePingCluster}
                >
                  <RefreshCw size={12} />
                  <span>Ping Cluster</span>
                </button>
              </div>
            </div>

            {/* COLUMN 3: Live Cloud Terminal & Logs */}
            <div className="dyn-cloud-win__col dyn-cloud-win__col--terminal">
              <div className="dyn-cloud-win__col-header">
                <Terminal size={13} style={{ color: '#059669' }} />
                <span>JOURNAL D'ÉVÉNEMENTS CLOUD</span>
                <span className="dyn-cloud-win__badge-sync">AUTO-SYNC</span>
              </div>

              <div className="dyn-cloud-win__terminal-output">
                {logs.map((line, idx) => (
                  <div key={idx} className="dyn-cloud-win__terminal-line">
                    {line}
                  </div>
                ))}
                <div className="dyn-cloud-win__terminal-cursor">
                  <span className="dyn-cloud-win__prompt-symbol">$</span> dynesis-engine <span className="dyn-cloud-win__blink">_</span>
                </div>
              </div>

              {/* Security Shield Summary */}
              <div className="dyn-cloud-win__security-box">
                <ShieldCheck size={16} style={{ color: '#059669', flexShrink: 0 }} />
                <div className="dyn-cloud-win__sec-details">
                  <strong>Conformité & Sécurité ISO 27001</strong>
                  <p>Chiffrement TLS 1.3 de bout en bout • Pare-feu applicatif WAF actif</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Highlights Proof Bar */}
          <div className="dyn-cloud-win__footer">
            <div className="dyn-cloud-win__pill">
              <CheckCircle2 size={13} style={{ color: '#059669' }} />
              <span>99.99% SLA Garanti</span>
            </div>
            <div className="dyn-cloud-win__pill">
              <ShieldCheck size={13} style={{ color: '#0080ff' }} />
              <span>Chiffrement AES-256 E2E</span>
            </div>
            <div className="dyn-cloud-win__pill">
              <Zap size={13} style={{ color: '#d97706' }} />
              <span>Auto-scaling sans interruption</span>
            </div>
            <div className="dyn-cloud-win__pill">
              <Globe size={13} style={{ color: '#2563eb' }} />
              <span>18 Régions Edge Déployées</span>
            </div>
          </div>
        </div>

        {/* Action Buttons below the simulation */}
        <div className="dyn-cloud-sec__bottom-actions">
          <Link to="/contact" className="tech-btn tech-btn--primary">
            DÉMARRER MON PROJET CLOUD <span className="tech-btn__arrow">→</span>
          </Link>
          <Link to="/services" className="tech-btn tech-btn--secondary">
            DÉCOUVRIR NOS ARCHITECTURES
          </Link>
        </div>
      </div>
    </section>
  );
}
