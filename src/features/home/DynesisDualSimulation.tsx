import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  ShieldAlert, 
  Zap, 
  Terminal, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  Layers, 
  Activity, 
  Lock, 
  Flame, 
  Bot, 
  Sparkles, 
  Code2, 
  Radio, 
  Eye, 
  Check, 
  Copy,
  ChevronRight,
  TrendingUp,
  Server
} from 'lucide-react';
import './dynesis-dual-simulation.css';

// ── Types ──────────────────────────────────────────────────────────
type SimMode = 'ai' | 'security';

interface AIScenario {
  id: string;
  title: string;
  badge: string;
  prompt: string;
  stages: { name: string; detail: string; duration: number }[];
  resultCode: string;
  resultSummary: string;
  metrics: {
    tokensPerSec: number;
    latency: string;
    confidence: string;
    model: string;
  };
}

interface SecurityScenario {
  id: string;
  title: string;
  threatType: string;
  intensity: string;
  description: string;
  attackVector: string;
  phases: { name: string; log: string; severity: 'low' | 'med' | 'high' | 'mitigated' }[];
  metrics: {
    mitigationTime: string;
    blockedReqs: string;
    encryption: string;
    status: string;
  };
}

// ── Scenarios Data ─────────────────────────────────────────────────
const AI_SCENARIOS: AIScenario[] = [
  {
    id: 'ai-arch',
    title: 'Optimisation SaaS Multi-Tenant & Sharding',
    badge: 'Architecture LLM',
    prompt: 'Analyser les goulets d’étranglement de la base de données et concevoir un partitionnement dynamique avec cache distribué Redis et sharding PostgreSQL.',
    stages: [
      { name: 'Ingestion & Vectorisation', detail: 'Embeddings 1536 dims, indexation vectorielle dans PgVector', duration: 700 },
      { name: 'Consensus Multi-Agents', detail: '3 agents (Architecte, DBA, Sécurité) évaluent la scalabilité', duration: 900 },
      { name: 'Synthèse & Optimisation', detail: 'Génération de schéma SQL partitionné & pooling de connexions', duration: 800 },
      { name: 'Validation Zéro-Défaut', detail: 'Test formel de charge simulé à 50 000 req/s validé', duration: 600 }
    ],
    resultCode: `// Architecture générée par le cluster IA Dynesis
export const PartitionConfig = {
  shards: 16,
  algorithm: 'hash-consistent-crc32',
  replication: { factor: 3, readPreference: 'nearest' },
  caching: {
    l1: 'in-memory-lru (sub-millisecond)',
    l2: 'redis-sentinel-cluster'
  },
  estimatedThroughput: '142,000 ops/sec',
  p99Latency: '3.8ms'
};`,
    resultSummary: 'Modèle validé : réduction de latence de 64%, capacité d’absorption de trafic multipliée par 5 sans surcoût infrastructure.',
    metrics: {
      tokensPerSec: 284,
      latency: '11.4 ms',
      confidence: '99.85%',
      model: 'Dynesis-Titan-v4 (128B MoE)'
    }
  },
  {
    id: 'ai-web3',
    title: 'Audit & Déploiement Smart Contract DeFi',
    badge: 'Web3 & Sécurité Formelle',
    prompt: 'Auditer un smart contract de liquidité décentralisée contre les attaques de réentrance, flash loans et manipulation d’oracles.',
    stages: [
      { name: 'Analyse Statique d’Opcode', detail: 'Décompilation de l’EVM & cartographie du graphe de flux', duration: 750 },
      { name: 'Fuzzing & Attaques Simulées', detail: '10 000 scénarios de Flash Loans exécutés en sandbox isolée', duration: 950 },
      { name: 'Correction Cryptographique', detail: 'Injection automatique de gardes ReentrancyGuard et TWAP Oracle', duration: 850 },
      { name: 'Certification Formelle', detail: 'Génération de la preuve mathématique ZK de conformité', duration: 650 }
    ],
    resultCode: `// Dynesis Guard - Reentrancy & Flash-Loan Resilient
contract VaultLiquiditySecure is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;
    bytes32 private immutable DOMAIN_SEPARATOR;
    uint256 private constant ORACLE_TIME_TOLERANCE = 120; // 2 min TWAP

    function executeProtectedSwap(uint256 amountIn, uint256 minOut) 
        external nonReentrant returns (uint256 actualOut) 
    {
        // Oracle sanity check & slippage protection
        validateTwapPrice(amountIn, minOut);
        return _settleAtomicSwap(msg.sender, amountIn, minOut);
    }
}`,
    resultSummary: 'Audit certifié sans faille : 0 vulnérabilité critique détectée, protection contre 100% des vecteurs d’attaques connus.',
    metrics: {
      tokensPerSec: 310,
      latency: '9.2 ms',
      confidence: '99.98%',
      model: 'Dynesis-Solidity-Audit-v2'
    }
  },
  {
    id: 'ai-predict',
    title: 'Pipeline RAG & Moteur Prédictif Temps Réel',
    badge: 'Big Data & RAG',
    prompt: 'Indexation de millions de documents non structurés et génération d’analyses financières prédictives en moins de 15 millisecondes.',
    stages: [
      { name: 'Parsing & Chunking Sémantique', detail: 'Découpage contextuel avec préservation des liens logiques', duration: 600 },
      { name: 'Recherche Hybride BM25 + Vecteurs', detail: 'Reranking de précision avec cross-encoder de pointe', duration: 800 },
      { name: 'Filtrage de Hallucination', detail: 'Vérification de factualité croisée avec sources primaires', duration: 700 },
      { name: 'Streaming Réactif', detail: 'Livraison temps réel du flux de prédiction décisionnelle', duration: 600 }
    ],
    resultCode: `// Moteur de recommandation en flux continu
const predictiveStream = await dynesisAI.streamInference({
  contextWindow: '128k',
  retrievalStrategy: 'hybrid-rerank-v2',
  factualThreshold: 0.992,
  metrics: { precision: '99.9%', recall: '98.7%' }
});`,
    resultSummary: 'Précision d’analyse supérieure à 99% : réponses ultra-sourcées garanties sans hallucination.',
    metrics: {
      tokensPerSec: 260,
      latency: '14.1 ms',
      confidence: '99.40%',
      model: 'Dynesis-Cognitive-MoE'
    }
  }
];

const SECURITY_SCENARIOS: SecurityScenario[] = [
  {
    id: 'sec-ddos',
    title: 'Attaque DDoS Volumétrique L7 (650 000 req/s)',
    threatType: 'DDoS HTTP/2 Rapid Reset & Flood SYN',
    intensity: 'CRITIQUE (650k req/s)',
    description: 'Une coalition de botnets mondiaux cible simultanément l’API Gateway pour saturer la mémoire vive et provoquer un effondrement.',
    attackVector: '84 000 adresses IP réparties sur 62 pays',
    phases: [
      { name: 'Anomalie Détectée', log: '[00:00:01] Pic de trafic massif détecté : +4,200% au-dessus de la normale.', severity: 'high' },
      { name: 'Analyse Comportementale eBPF', log: '[00:00:02] Filtre au niveau noyau Linux : empreinte de paquets anormaux identifiée.', severity: 'med' },
      { name: 'Déploiement du Challenge Zero-Trust', log: '[00:00:03] Défi cryptographique JS silencieux injecté sur les IP non authentifiées.', severity: 'low' },
      { name: 'Mitigation Totale Réalisée', log: '[00:00:04] 648 912 requêtes malveillantes bloquées. Trafic légitime préservé à 100%.', severity: 'mitigated' }
    ],
    metrics: {
      mitigationTime: '8.4 ms',
      blockedReqs: '648 912 /s',
      encryption: 'TLS 1.3 + ChaCha20',
      status: 'MENACE NEUTRALISÉE'
    }
  },
  {
    id: 'sec-sqli',
    title: 'Injection SQL Zero-Day & Tentative d’Exfiltration',
    threatType: 'Exploit WAF Bypass & Union Select',
    intensity: 'ÉLEVÉE (Extraction de données)',
    description: 'Tentative d’altération des requêtes d’authentification pour contourner les contrôles d’accès et dumper la base de données.',
    attackVector: 'Payload encodé en double-URL avec obfusquation hexadécimale',
    phases: [
      { name: 'Interception WAF Intelligente', log: '[00:00:01] Payload hexadécimal suspect repéré sur /api/v1/auth/login.', severity: 'high' },
      { name: 'Désensibilisation & Dé-obfusquation', log: '[00:00:02] Décodage dynamique : signature d’injection SQL avancée confirmée.', severity: 'high' },
      { name: 'Isolation Instantanée du Conteneur', log: '[00:00:03] Sandbox éphémère activée, attaquant redirigé vers un pot de miel (Honeypot).', severity: 'med' },
      { name: 'Bannissement & Clés Rotées', log: '[00:00:04] IP bannie sur l’ensemble du CDN Anycast, 0 octet exfiltré.', severity: 'mitigated' }
    ],
    metrics: {
      mitigationTime: '4.2 ms',
      blockedReqs: '100% bloqué',
      encryption: 'Post-Quantum AES-256',
      status: 'ACCÈS REFUSÉ & TRAQUÉ'
    }
  },
  {
    id: 'sec-auth',
    title: 'Brute-Force Distribué & Vol de Jetons JWT',
    threatType: 'Credential Stuffing & Token Hijack',
    intensity: 'MOYENNE (Tentative de prise de compte)',
    description: 'Utilisation de dictionnaires de mots de passe fuités et tentative de falsification de signature cryptographique RS256.',
    attackVector: 'Rotation de proxys résidentiels et falsification d’en-têtes HTTP',
    phases: [
      { name: 'Pattern de Vélocité Suspect', log: '[00:00:01] 1 200 tentatives de connexion échouées réparties sur 300 proxys.', severity: 'med' },
      { name: 'Vérification de Clé Asymétrique', log: '[00:00:02] Détection de tentative d’attaque par confusion d’algorithme JWT (None / HMAC).', severity: 'high' },
      { name: 'Blocage Adaptatif & MFA Forcé', log: '[00:00:03] Déclenchement de l’empreinte biométrique WebAuthn / Passkey obligatoire.', severity: 'low' },
      { name: 'Sécurité Rétablie', log: '[00:00:04] Comptes sécurisés avec succès. Aucun compte compromis.', severity: 'mitigated' }
    ],
    metrics: {
      mitigationTime: '6.1 ms',
      blockedReqs: '12 400 IPs',
      encryption: 'Ed25519 + Zero-Knowledge',
      status: 'INTÉGRITÉ PRÉSERVÉE'
    }
  }
];

export function DynesisDualSimulation() {
  const [activeMode, setActiveMode] = useState<SimMode>('ai');

  // AI State
  const [selectedAI, setSelectedAI] = useState<AIScenario>(AI_SCENARIOS[0]);
  const [isAIRunning, setIsAIRunning] = useState(false);
  const [aiStageIndex, setAiStageIndex] = useState(4); // Default complete
  const [aiProgress, setAiProgress] = useState(100);
  const [streamedCodeLength, setStreamedCodeLength] = useState(AI_SCENARIOS[0].resultCode.length);
  const [copiedCode, setCopiedCode] = useState(false);

  // Security State
  const [selectedSec, setSelectedSec] = useState<SecurityScenario>(SECURITY_SCENARIOS[0]);
  const [isSecRunning, setIsSecRunning] = useState(false);
  const [secPhaseIndex, setSecPhaseIndex] = useState(4); // Default mitigated
  const [radarIntensity, setRadarIntensity] = useState<'calm' | 'alert' | 'defended'>('defended');

  // Live dynamic counter for packets
  const [livePackets, setLivePackets] = useState(648912);
  useEffect(() => {
    const t = setInterval(() => {
      setLivePackets((prev) => prev + Math.floor(Math.random() * 24) + 6);
    }, 1400);
    return () => clearInterval(t);
  }, []);

  // ── Run AI Simulation ──
  const runAISimulation = (scenario: AIScenario = selectedAI) => {
    if (isAIRunning) return;
    setIsAIRunning(true);
    setAiStageIndex(0);
    setAiProgress(10);
    setStreamedCodeLength(0);

    let currentStage = 0;
    const stages = scenario.stages;

    const executeStage = () => {
      if (currentStage < stages.length) {
        setAiStageIndex(currentStage);
        setAiProgress(Math.round(((currentStage + 1) / stages.length) * 100));

        // Code streaming preview
        const targetLength = Math.floor(((currentStage + 1) / stages.length) * scenario.resultCode.length);
        setStreamedCodeLength(targetLength);

        setTimeout(() => {
          currentStage++;
          executeStage();
        }, stages[currentStage].duration);
      } else {
        setAiStageIndex(stages.length);
        setAiProgress(100);
        setStreamedCodeLength(scenario.resultCode.length);
        setIsAIRunning(false);
      }
    };

    executeStage();
  };

  // ── Run Security Simulation ──
  const runSecSimulation = (scenario: SecurityScenario = selectedSec) => {
    if (isSecRunning) return;
    setIsSecRunning(true);
    setSecPhaseIndex(0);
    setRadarIntensity('alert');

    let phase = 0;
    const interval = setInterval(() => {
      phase++;
      if (phase < scenario.phases.length) {
        setSecPhaseIndex(phase);
        if (phase === scenario.phases.length - 1) {
          setRadarIntensity('defended');
        }
      } else {
        clearInterval(interval);
        setSecPhaseIndex(scenario.phases.length);
        setIsSecRunning(false);
        setRadarIntensity('defended');
      }
    }, 800);
  };

  // Switch scenario
  const handleSelectAIScenario = (sc: AIScenario) => {
    setSelectedAI(sc);
    runAISimulation(sc);
  };

  const handleSelectSecScenario = (sc: SecurityScenario) => {
    setSelectedSec(sc);
    runSecSimulation(sc);
  };

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(selectedAI.resultCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section 
      className="dyn-dual-sim" 
      id="simulation-lab" 
      aria-label="Laboratoire de Simulation IA et Cyber-Sécurité"
    >
      {/* Background Cyber Ambient Lights */}
      <div className={`dyn-dual-sim__ambient dyn-dual-sim__ambient--${activeMode}`} aria-hidden="true" />
      <div className="dyn-dual-sim__grid-overlay" aria-hidden="true" />

      <div className="dyn-dual-sim__container">
        
        {/* Header */}
        <header className="dyn-dual-sim__header">
          <div className="dyn-dual-sim__eyebrow">
            <span className="dyn-dual-sim__pulse-dot" />
            <span>(LABORATOIRE TECHNOLOGIQUE) — SIMULATION INTERACTIVE EN DIRECT</span>
          </div>
          <h2 className="dyn-dual-sim__title">
            Testez la Puissance de nos Moteurs <span className="dyn-dual-sim__gradient-text">IA & Cyber-Défense</span>
          </h2>
          <p className="dyn-dual-sim__subtitle">
            Manipulez nos technologies de pointe en temps réel : visualisez le flux de raisonnement de nos modèles neuronaux autonomes et observez la neutralisation d’attaques critiques en quelques millisecondes.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="dyn-dual-sim__mode-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeMode === 'ai'}
              className={`dyn-dual-sim__tab ${activeMode === 'ai' ? 'dyn-dual-sim__tab--active dyn-dual-sim__tab--ai' : ''}`}
              onClick={() => setActiveMode('ai')}
            >
              <Bot className="dyn-dual-sim__tab-icon" size={18} />
              <span className="dyn-dual-sim__tab-label">Simulation IA & Agents LLM</span>
              <span className="dyn-dual-sim__badge dyn-dual-sim__badge--cyan">128B MoE</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeMode === 'security'}
              className={`dyn-dual-sim__tab ${activeMode === 'security' ? 'dyn-dual-sim__tab--active dyn-dual-sim__tab--sec' : ''}`}
              onClick={() => setActiveMode('security')}
            >
              <ShieldCheck className="dyn-dual-sim__tab-icon" size={18} />
              <span className="dyn-dual-sim__tab-label">Simulation Cyber-Sécurité Zero-Trust</span>
              <span className="dyn-dual-sim__badge dyn-dual-sim__badge--green">Bouclier Actif</span>
            </button>
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════════
            MODE 1 : SIMULATION IA & AGENTS AUTONOMES
           ══════════════════════════════════════════════════════════ */}
        {activeMode === 'ai' && (
          <div className="dyn-dual-sim__panel dyn-dual-sim__panel--ai">
            
            {/* Top Toolbar / System Status */}
            <div className="dyn-dual-sim__status-bar">
              <div className="dyn-dual-sim__status-item">
                <span className="dyn-dual-sim__status-indicator dyn-dual-sim__status-indicator--green" />
                <span className="dyn-dual-sim__status-key">Moteur :</span>
                <span className="dyn-dual-sim__status-val">{selectedAI.metrics.model}</span>
              </div>
              <div className="dyn-dual-sim__status-item">
                <Activity size={14} className="dyn-dual-sim__status-icon" />
                <span className="dyn-dual-sim__status-key">Vitesse d’Inférence :</span>
                <span className="dyn-dual-sim__status-val">{selectedAI.metrics.tokensPerSec} tokens/sec</span>
              </div>
              <div className="dyn-dual-sim__status-item">
                <Zap size={14} className="dyn-dual-sim__status-icon" />
                <span className="dyn-dual-sim__status-key">Latence P99 :</span>
                <span className="dyn-dual-sim__status-val">{selectedAI.metrics.latency}</span>
              </div>
              <div className="dyn-dual-sim__status-item">
                <CheckCircle size={14} className="dyn-dual-sim__status-icon" />
                <span className="dyn-dual-sim__status-key">Confiance :</span>
                <span className="dyn-dual-sim__status-val">{selectedAI.metrics.confidence}</span>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="dyn-dual-sim__main-grid">
              
              {/* Left Column: Interactive Scenario Selector & Reasoning Chain */}
              <div className="dyn-dual-sim__col-left">
                <h3 className="dyn-dual-sim__col-heading">
                  <Sparkles size={16} className="dyn-dual-sim__accent-icon" />
                  1. Choisissez un Cas d'Usage Haute-Performance
                </h3>

                {/* Scenario Cards */}
                <div className="dyn-dual-sim__scenario-list">
                  {AI_SCENARIOS.map((sc) => {
                    const isSelected = selectedAI.id === sc.id;
                    return (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => handleSelectAIScenario(sc)}
                        className={`dyn-dual-sim__sc-card ${isSelected ? 'dyn-dual-sim__sc-card--active-ai' : ''}`}
                      >
                        <div className="dyn-dual-sim__sc-card-top">
                          <span className="dyn-dual-sim__sc-badge">{sc.badge}</span>
                          {isSelected && <span className="dyn-dual-sim__live-badge">SÉLECTIONNÉ</span>}
                        </div>
                        <h4 className="dyn-dual-sim__sc-title">{sc.title}</h4>
                        <p className="dyn-dual-sim__sc-desc">{sc.prompt}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Action Trigger */}
                <div className="dyn-dual-sim__action-box">
                  <button
                    type="button"
                    disabled={isAIRunning}
                    onClick={() => runAISimulation(selectedAI)}
                    className="dyn-dual-sim__btn dyn-dual-sim__btn--ai"
                  >
                    {isAIRunning ? (
                      <>
                        <RotateCcw className="dyn-dual-sim__spin" size={16} />
                        Inférence & Raisonnement en Cours...
                      </>
                    ) : (
                      <>
                        <Play size={16} fill="currentColor" />
                        Relancer la Synthèse IA en Direct
                      </>
                    )}
                  </button>
                  <span className="dyn-dual-sim__action-hint">
                    Exécution en sandbox temps réel sur GPU H100
                  </span>
                </div>

                {/* Reasoning Pipeline Stages */}
                <div className="dyn-dual-sim__pipeline-box">
                  <div className="dyn-dual-sim__pipeline-header">
                    <span className="dyn-dual-sim__pipeline-title">Chaîne de Réflexion (ReAct Chain)</span>
                    <span className="dyn-dual-sim__pipeline-pct">{aiProgress}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="dyn-dual-sim__progress-track">
                    <div 
                      className="dyn-dual-sim__progress-fill dyn-dual-sim__progress-fill--cyan" 
                      style={{ width: `${aiProgress}%` }} 
                    />
                  </div>

                  <div className="dyn-dual-sim__stages-list">
                    {selectedAI.stages.map((st, idx) => {
                      const isPast = aiStageIndex > idx;
                      const isCurrent = aiStageIndex === idx;
                      return (
                        <div 
                          key={idx} 
                          className={`dyn-dual-sim__stage-item ${isPast ? 'dyn-dual-sim__stage-item--done' : isCurrent ? 'dyn-dual-sim__stage-item--current' : ''}`}
                        >
                          <div className="dyn-dual-sim__stage-icon-wrap">
                            {isPast ? (
                              <Check size={14} className="dyn-dual-sim__stage-check" />
                            ) : isCurrent ? (
                              <span className="dyn-dual-sim__stage-pulse" />
                            ) : (
                              <span className="dyn-dual-sim__stage-number">{idx + 1}</span>
                            )}
                          </div>
                          <div className="dyn-dual-sim__stage-content">
                            <strong className="dyn-dual-sim__stage-name">{st.name}</strong>
                            <span className="dyn-dual-sim__stage-detail">{st.detail}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Code & Solution Streaming Sandbox */}
              <div className="dyn-dual-sim__col-right">
                <div className="dyn-dual-sim__terminal-card">
                  
                  {/* Terminal Header */}
                  <div className="dyn-dual-sim__terminal-header">
                    <div className="dyn-dual-sim__terminal-dots">
                      <span className="dyn-dual-sim__dot dyn-dual-sim__dot--red" />
                      <span className="dyn-dual-sim__dot dyn-dual-sim__dot--yellow" />
                      <span className="dyn-dual-sim__dot dyn-dual-sim__dot--green" />
                    </div>
                    <div className="dyn-dual-sim__terminal-title">
                      <Code2 size={14} />
                      <span>dynesis-agent://inference-output.ts</span>
                    </div>
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="dyn-dual-sim__terminal-copy"
                      title="Copier le code"
                    >
                      {copiedCode ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                      <span>{copiedCode ? 'Copié !' : 'Copier'}</span>
                    </button>
                  </div>

                  {/* Terminal Code View */}
                  <div className="dyn-dual-sim__terminal-body">
                    <pre className="dyn-dual-sim__code-pre">
                      <code>
                        {selectedAI.resultCode.slice(0, streamedCodeLength)}
                        {isAIRunning && <span className="dyn-dual-sim__cursor" />}
                      </code>
                    </pre>
                  </div>

                  {/* Terminal Footer Summary */}
                  <div className="dyn-dual-sim__terminal-footer">
                    <div className="dyn-dual-sim__summary-badge">
                      <CheckCircle size={15} color="#00f5ff" />
                      <span>Résultat de Synthèse Validé</span>
                    </div>
                    <p className="dyn-dual-sim__summary-text">{selectedAI.resultSummary}</p>
                  </div>
                </div>

                {/* Key Architectural Guarantees */}
                <div className="dyn-dual-sim__features-grid">
                  <div className="dyn-dual-sim__feat-item">
                    <Layers size={18} className="dyn-dual-sim__feat-icon dyn-dual-sim__feat-icon--cyan" />
                    <div>
                      <strong>Architecture MoE</strong>
                      <p>Routage dynamique des requêtes vers les sous-réseaux spécialisés.</p>
                    </div>
                  </div>
                  <div className="dyn-dual-sim__feat-item">
                    <ShieldCheck size={18} className="dyn-dual-sim__feat-icon dyn-dual-sim__feat-icon--cyan" />
                    <div>
                      <strong>Garantie Sans Hallucination</strong>
                      <p>Validation formelle croisée et ancrage sémantique strict.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            MODE 2 : SIMULATION CYBER-SÉCURITÉ ZERO-TRUST
           ══════════════════════════════════════════════════════════ */}
        {activeMode === 'security' && (
          <div className="dyn-dual-sim__panel dyn-dual-sim__panel--sec">
            
            {/* Top Toolbar / Defense Status */}
            <div className="dyn-dual-sim__status-bar">
              <div className="dyn-dual-sim__status-item">
                <span className="dyn-dual-sim__status-indicator dyn-dual-sim__status-indicator--emerald" />
                <span className="dyn-dual-sim__status-key">Grille de Défense :</span>
                <span className="dyn-dual-sim__status-val">WAF Anycast + Kernel eBPF</span>
              </div>
              <div className="dyn-dual-sim__status-item">
                <Lock size={14} className="dyn-dual-sim__status-icon" />
                <span className="dyn-dual-sim__status-key">Chiffrement :</span>
                <span className="dyn-dual-sim__status-val">{selectedSec.metrics.encryption}</span>
              </div>
              <div className="dyn-dual-sim__status-item">
                <Zap size={14} className="dyn-dual-sim__status-icon" />
                <span className="dyn-dual-sim__status-key">Temps de Neutralisation :</span>
                <span className="dyn-dual-sim__status-val">{selectedSec.metrics.mitigationTime}</span>
              </div>
              <div className="dyn-dual-sim__status-item">
                <Radio size={14} className="dyn-dual-sim__status-icon" />
                <span className="dyn-dual-sim__status-key">Menaces Bloquées :</span>
                <span className="dyn-dual-sim__status-val">{livePackets.toLocaleString()} reqs</span>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="dyn-dual-sim__main-grid">
              
              {/* Left Column: Attack Scenario Injection */}
              <div className="dyn-dual-sim__col-left">
                <h3 className="dyn-dual-sim__col-heading">
                  <Flame size={16} className="dyn-dual-sim__accent-icon dyn-dual-sim__accent-icon--red" />
                  1. Injectez un Scénario d’Attaque Critique
                </h3>

                {/* Scenario Cards */}
                <div className="dyn-dual-sim__scenario-list">
                  {SECURITY_SCENARIOS.map((sc) => {
                    const isSelected = selectedSec.id === sc.id;
                    return (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => handleSelectSecScenario(sc)}
                        className={`dyn-dual-sim__sc-card ${isSelected ? 'dyn-dual-sim__sc-card--active-sec' : ''}`}
                      >
                        <div className="dyn-dual-sim__sc-card-top">
                          <span className="dyn-dual-sim__sc-badge dyn-dual-sim__sc-badge--red">{sc.intensity}</span>
                          {isSelected && <span className="dyn-dual-sim__live-badge dyn-dual-sim__live-badge--red">CIBLÉ</span>}
                        </div>
                        <h4 className="dyn-dual-sim__sc-title">{sc.title}</h4>
                        <p className="dyn-dual-sim__sc-desc">{sc.description}</p>
                        <div className="dyn-dual-sim__sc-meta">
                          <span className="dyn-dual-sim__sc-meta-label">Vecteur :</span> {sc.attackVector}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Action Trigger */}
                <div className="dyn-dual-sim__action-box">
                  <button
                    type="button"
                    disabled={isSecRunning}
                    onClick={() => runSecSimulation(selectedSec)}
                    className="dyn-dual-sim__btn dyn-dual-sim__btn--sec"
                  >
                    {isSecRunning ? (
                      <>
                        <RotateCcw className="dyn-dual-sim__spin" size={16} />
                        Attaque Détectée • Riposte en Cours...
                      </>
                    ) : (
                      <>
                        <ShieldAlert size={16} />
                        Simuler l’Attaque & Tester la Riposte
                      </>
                    )}
                  </button>
                  <span className="dyn-dual-sim__action-hint">
                    Test d'intrusion sans impact sur l'environnement de production
                  </span>
                </div>
              </div>

              {/* Right Column: Live Radar & Tactical Defense Console */}
              <div className="dyn-dual-sim__col-right">
                
                {/* Cyber Radar Visualizer */}
                <div className="dyn-dual-sim__radar-card">
                  <div className="dyn-dual-sim__radar-top">
                    <div className="dyn-dual-sim__radar-status">
                      <span className={`dyn-dual-sim__radar-pulse dyn-dual-sim__radar-pulse--${radarIntensity}`} />
                      <span className="dyn-dual-sim__radar-title">
                        {isSecRunning ? 'ALERTE : ATTAQUE DÉTECTÉE & EN COURS D’ISOLATION' : 'BOUCLIER ACTIF — INTÉGRITÉ 100% SÉCURISÉE'}
                      </span>
                    </div>
                    <span className="dyn-dual-sim__radar-time">{selectedSec.metrics.mitigationTime}</span>
                  </div>

                  {/* Concentric Animated Radar */}
                  <div className="dyn-dual-sim__radar-visual">
                    <svg viewBox="0 0 200 200" className="dyn-dual-sim__radar-svg">
                      <circle cx="100" cy="100" r="85" className="dyn-dual-sim__radar-circle dyn-dual-sim__radar-circle--outer" />
                      <circle cx="100" cy="100" r="55" className="dyn-dual-sim__radar-circle dyn-dual-sim__radar-circle--mid" />
                      <circle cx="100" cy="100" r="25" className="dyn-dual-sim__radar-circle dyn-dual-sim__radar-circle--inner" />
                      <line x1="100" y1="15" x2="100" y2="185" className="dyn-dual-sim__radar-axis" />
                      <line x1="15" y1="100" x2="185" y2="100" className="dyn-dual-sim__radar-axis" />
                      
                      {/* Sweeping Beam */}
                      <g className={`dyn-dual-sim__radar-sweep ${isSecRunning ? 'dyn-dual-sim__radar-sweep--fast' : ''}`}>
                        <line x1="100" y1="100" x2="185" y2="100" className="dyn-dual-sim__radar-beam" />
                        <path d="M 100 100 L 185 100 A 85 85 0 0 0 160 40 Z" className="dyn-dual-sim__radar-cone" />
                      </g>

                      {/* Blips */}
                      <circle cx="140" cy="65" r="3.5" className="dyn-dual-sim__radar-blip dyn-dual-sim__radar-blip--1" />
                      <circle cx="60" cy="130" r="3" className="dyn-dual-sim__radar-blip dyn-dual-sim__radar-blip--2" />
                      <circle cx="130" cy="140" r="4" className="dyn-dual-sim__radar-blip dyn-dual-sim__radar-blip--3" />
                    </svg>

                    <div className="dyn-dual-sim__radar-stats">
                      <div className="dyn-dual-sim__stat-box">
                        <span className="dyn-dual-sim__stat-num">{selectedSec.metrics.blockedReqs}</span>
                        <span className="dyn-dual-sim__stat-label">Filtré en Temps Réel</span>
                      </div>
                      <div className="dyn-dual-sim__stat-box">
                        <span className="dyn-dual-sim__stat-num">0.00%</span>
                        <span className="dyn-dual-sim__stat-label">Faux Positifs</span>
                      </div>
                      <div className="dyn-dual-sim__stat-box">
                        <span className="dyn-dual-sim__stat-num">100%</span>
                        <span className="dyn-dual-sim__stat-label">Uptime Garanti</span>
                      </div>
                    </div>
                  </div>

                  {/* Tactical Security Incident Logs */}
                  <div className="dyn-dual-sim__sec-logs">
                    <div className="dyn-dual-sim__sec-logs-header">
                      <Terminal size={14} />
                      <span>Journal des Événements Tactiques (Kernel Audit)</span>
                    </div>
                    <div className="dyn-dual-sim__sec-logs-body">
                      {selectedSec.phases.map((ph, idx) => {
                        const isVisible = secPhaseIndex >= idx;
                        return (
                          <div
                            key={idx}
                            className={`dyn-dual-sim__sec-log-row dyn-dual-sim__sec-log-row--${ph.severity} ${isVisible ? 'dyn-dual-sim__sec-log-row--visible' : 'dyn-dual-sim__sec-log-row--hidden'}`}
                          >
                            <span className="dyn-dual-sim__sec-log-phase">{ph.name} :</span>
                            <span className="dyn-dual-sim__sec-log-msg">{ph.log}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Security Summary Banner */}
                  <div className="dyn-dual-sim__sec-banner">
                    <ShieldCheck size={20} color="#10b981" />
                    <div>
                      <strong>Résultat du Banc d’Essai Cyber-Défense</strong>
                      <p>Intégrité des données garantie à 100%. Trafic légitime préservé sans interruption de service.</p>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
