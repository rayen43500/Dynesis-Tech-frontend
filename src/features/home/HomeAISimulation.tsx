import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Check, 
  Copy, 
  Code2, 
  Cpu, 
  Zap, 
  CheckCircle2,
  Layers
} from 'lucide-react';
import './home-ai-simulation.css';

interface AIScenario {
  id: string;
  label: string;
  badge: string;
  prompt: string;
  stages: string[];
  code: string;
  summary: string;
  speed: string;
  latency: string;
}

const SCENARIOS: AIScenario[] = [
  {
    id: 'arch',
    label: 'Auto-Scaling & Sharding',
    badge: 'Architecture Cloud',
    prompt: 'Partitionnement dynamique et cache distribué Redis pour absorber 100k req/s.',
    stages: ['Vectorisation', 'Consensus 3 Agents', 'Génération Schéma SQL', 'Validation Zéro-Défaut'],
    code: `// Partitionnement dynamique généré par l'IA Dynesis
export const ShardConfig = {
  shards: 16,
  algorithm: 'hash-consistent-crc32',
  replicationFactor: 3,
  cachingL1: 'in-memory-lru',
  cachingL2: 'redis-cluster',
  throughput: '142,000 ops/s',
  latencyP99: '3.8ms'
};`,
    summary: 'Latence réduite de 64% • Capacité d’absorption ×5 sans surcoût.',
    speed: '284 tok/s',
    latency: '11.4 ms'
  },
  {
    id: 'web3',
    label: 'Audit Smart Contract',
    badge: 'Web3 & Sécurité Formelle',
    prompt: 'Vérification formelle contre réentrance et flash-loans avec preuve ZK.',
    stages: ['Décompilation Opcode', 'Fuzzing Sandbox', 'Garde ReentrancyGuard', 'Certification Mathématique'],
    code: `// Contrat audité & certifié sans vulnérabilité
contract VaultSecure is ReentrancyGuard, Ownable {
  using SafeERC20 for IERC20;
  function executeSwap(uint256 amountIn, uint256 minOut) 
    external nonReentrant returns (uint256 out) {
      validateTwapOracle(amountIn, minOut);
      return _settleSwap(msg.sender, amountIn, minOut);
  }
}`,
    summary: '0 vulnérabilité critique • Protection 100% contre flash-loans.',
    speed: '310 tok/s',
    latency: '9.2 ms'
  },
  {
    id: 'rag',
    label: 'Pipeline RAG Temps Réel',
    badge: 'Big Data & LLM',
    prompt: 'Indexation hybride vectorielle et détection d’hallucination en continu.',
    stages: ['Chunking Sémantique', 'Recherche Hybride BM25', 'Filtrage Factuel', 'Streaming Temps Réel'],
    code: `// Inférence sémantique garantie sans hallucination
const stream = await dynesisAI.streamInference({
  contextWindow: '128k',
  retrievalStrategy: 'hybrid-rerank-v2',
  factualThreshold: 0.992,
  accuracy: '99.9%'
});`,
    summary: 'Précision supérieure à 99% • Réponses ultra-sourcées vérifiées.',
    speed: '260 tok/s',
    latency: '14.1 ms'
  }
];

export function HomeAISimulation() {
  const [selected, setSelected] = useState<AIScenario>(SCENARIOS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState(4); // All done by default
  const [streamLength, setStreamLength] = useState(SCENARIOS[0].code.length);
  const [copied, setCopied] = useState(false);

  const runSimulation = (scenario: AIScenario = selected) => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStage(0);
    setStreamLength(0);

    let stage = 0;
    const interval = setInterval(() => {
      stage++;
      if (stage <= scenario.stages.length) {
        setCurrentStage(stage);
        setStreamLength(Math.floor((stage / scenario.stages.length) * scenario.code.length));
      } else {
        clearInterval(interval);
        setStreamLength(scenario.code.length);
        setIsRunning(false);
      }
    }, 550);
  };

  const handleSelect = (sc: AIScenario) => {
    setSelected(sc);
    runSimulation(sc);
  };

  const copyCode = () => {
    navigator.clipboard?.writeText(selected.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="dyn-ai-sec" id="simulation-ia" aria-label="Simulation Intelligence Artificielle">
      <div className="dyn-ai-sec__ambient" aria-hidden="true" />
      <div className="dyn-ai-sec__container">
        
        {/* Header */}
        <div className="dyn-ai-sec__header">
          <div className="dyn-ai-sec__eyebrow">
            <span className="dyn-ai-sec__pulse" />
            <span>(LAB IA) — SIMULATION COGNITIVE EN DIRECT</span>
          </div>
          <h2 className="dyn-ai-sec__title">
            Moteurs IA & Raisonnement Autonome
          </h2>
          <p className="dyn-ai-sec__sub">
            Testez l’agilité de nos modèles neuronaux : sélectionnez un cas d’usage et observez la chaîne de réflexion multi-agents en temps réel.
          </p>
        </div>

        {/* Compact 2-Column Showcase */}
        <div className="dyn-ai-sec__grid">
          
          {/* Left Column: Interactive Controls */}
          <div className="dyn-ai-sec__controls">
            
            {/* Live Metrics Row */}
            <div className="dyn-ai-sec__metrics-row">
              <div className="dyn-ai-sec__metric">
                <span className="dyn-ai-sec__metric-dot" />
                <span className="dyn-ai-sec__metric-label">Modèle :</span>
                <strong className="dyn-ai-sec__metric-val">Dynesis-Titan 128B</strong>
              </div>
              <div className="dyn-ai-sec__metric">
                <Zap size={13} className="dyn-ai-sec__metric-icon" />
                <span className="dyn-ai-sec__metric-label">Vitesse :</span>
                <strong className="dyn-ai-sec__metric-val">{selected.speed}</strong>
              </div>
              <div className="dyn-ai-sec__metric">
                <Cpu size={13} className="dyn-ai-sec__metric-icon" />
                <span className="dyn-ai-sec__metric-label">Latence :</span>
                <strong className="dyn-ai-sec__metric-val">{selected.latency}</strong>
              </div>
            </div>

            {/* Scenario Pills */}
            <div className="dyn-ai-sec__pills">
              {SCENARIOS.map((sc) => {
                const isActive = selected.id === sc.id;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => handleSelect(sc)}
                    className={`dyn-ai-sec__pill ${isActive ? 'dyn-ai-sec__pill--active' : ''}`}
                  >
                    <span className="dyn-ai-sec__pill-badge">{sc.badge}</span>
                    <strong className="dyn-ai-sec__pill-title">{sc.label}</strong>
                    <span className="dyn-ai-sec__pill-prompt">{sc.prompt}</span>
                  </button>
                );
              })}
            </div>

            {/* Trigger Button */}
            <div className="dyn-ai-sec__action-bar">
              <button
                type="button"
                disabled={isRunning}
                onClick={() => runSimulation(selected)}
                className="dyn-ai-sec__run-btn"
              >
                {isRunning ? (
                  <>
                    <RotateCcw size={15} className="dyn-ai-sec__spin" />
                    Raisonnement multi-agents en cours...
                  </>
                ) : (
                  <>
                    <Play size={14} fill="currentColor" />
                    Lancer la simulation de synthèse IA
                  </>
                )}
              </button>
            </div>

            {/* Micro 4-Step Chain */}
            <div className="dyn-ai-sec__chain">
              {selected.stages.map((st, idx) => {
                const isPassed = currentStage > idx;
                const isCurrent = currentStage === idx;
                return (
                  <div key={idx} className={`dyn-ai-sec__step ${isPassed ? 'dyn-ai-sec__step--done' : isCurrent ? 'dyn-ai-sec__step--current' : ''}`}>
                    <div className="dyn-ai-sec__step-bubble">
                      {isPassed ? <Check size={11} /> : idx + 1}
                    </div>
                    <span className="dyn-ai-sec__step-label">{st}</span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Code Streaming & Summary */}
          <div className="dyn-ai-sec__preview">
            <div className="dyn-ai-sec__terminal">
              <div className="dyn-ai-sec__terminal-top">
                <div className="dyn-ai-sec__dots">
                  <span className="dyn-ai-sec__dot dyn-ai-sec__dot--red" />
                  <span className="dyn-ai-sec__dot dyn-ai-sec__dot--yellow" />
                  <span className="dyn-ai-sec__dot dyn-ai-sec__dot--green" />
                </div>
                <div className="dyn-ai-sec__terminal-file">
                  <Code2 size={13} />
                  <span>dynesis://ai-output.ts</span>
                </div>
                <button
                  type="button"
                  onClick={copyCode}
                  className="dyn-ai-sec__copy-btn"
                  title="Copier le code"
                >
                  {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                  <span>{copied ? 'Copié' : 'Copier'}</span>
                </button>
              </div>

              <div className="dyn-ai-sec__terminal-body">
                <pre className="dyn-ai-sec__code">
                  <code>
                    {selected.code.slice(0, streamLength)}
                    {isRunning && <span className="dyn-ai-sec__cursor" />}
                  </code>
                </pre>
              </div>

              <div className="dyn-ai-sec__terminal-bottom">
                <CheckCircle2 size={15} className="dyn-ai-sec__valid-icon" />
                <span className="dyn-ai-sec__summary-text">{selected.summary}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
