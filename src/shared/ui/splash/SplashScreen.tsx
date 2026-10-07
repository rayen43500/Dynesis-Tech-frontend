import React, { useEffect, useState } from 'react';
import './splash-screen.css';

interface SplashScreenProps {
  /** Target animation duration in ms (default: 1600ms) */
  minDuration?: number;
  /** Force show on mount (default: true) */
  enabled?: boolean;
}

/**
 * 3D Creative Rotating Crystal Cube Component
 * Features true CSS 3D transforms (preserve-3d), 6 translucent glass faces,
 * inner glowing singularity core with counter-rotating quantum crystal,
 * dynamic multi-axis tumbling (avant, gauche, arrière), gyroscopic orbital rings,
 * and reactive 3D floor shadow.
 */
function CreativeRotatingCube3D() {
  return (
    <div className="dynesis-cube-viewport" aria-hidden="true">
      {/* Dynamic 3D Floor Shadow */}
      <div className="dynesis-cube-floor-shadow" />

      {/* Gyroscopic Orbital Rings */}
      <div className="dynesis-orbital-system">
        <div className="dynesis-orbital-ring dynesis-orbital-ring--primary">
          <span className="dynesis-orbital-photon dynesis-orbital-photon--cyan" />
        </div>
        <div className="dynesis-orbital-ring dynesis-orbital-ring--secondary">
          <span className="dynesis-orbital-photon dynesis-orbital-photon--blue" />
        </div>
      </div>

      {/* 3D Perspective Stage */}
      <div className="dynesis-cube-stage">
        {/* Levitation & Spatial Tumbling Pivot */}
        <div className="dynesis-cube-levitator">
          <div className="dynesis-cube-tumbler">
            {/* Outer Translucent Glass Faces (84px x 84px) */}
            <div className="dynesis-face dynesis-face--front">
              <span className="dynesis-face-glass-glare" />
              <span className="dynesis-face-crosshair" />
              <span className="dynesis-face-node tl" />
              <span className="dynesis-face-node tr" />
              <span className="dynesis-face-node bl" />
              <span className="dynesis-face-node br" />
            </div>

            <div className="dynesis-face dynesis-face--back">
              <span className="dynesis-face-glass-glare" />
              <span className="dynesis-face-crosshair" />
              <span className="dynesis-face-node tl" />
              <span className="dynesis-face-node tr" />
              <span className="dynesis-face-node bl" />
              <span className="dynesis-face-node br" />
            </div>

            <div className="dynesis-face dynesis-face--right">
              <span className="dynesis-face-glass-glare" />
              <span className="dynesis-face-crosshair" />
              <span className="dynesis-face-node tl" />
              <span className="dynesis-face-node tr" />
              <span className="dynesis-face-node bl" />
              <span className="dynesis-face-node br" />
            </div>

            <div className="dynesis-face dynesis-face--left">
              <span className="dynesis-face-glass-glare" />
              <span className="dynesis-face-crosshair" />
              <span className="dynesis-face-node tl" />
              <span className="dynesis-face-node tr" />
              <span className="dynesis-face-node bl" />
              <span className="dynesis-face-node br" />
            </div>

            <div className="dynesis-face dynesis-face--top">
              <span className="dynesis-face-glass-glare" />
              <span className="dynesis-face-crosshair" />
              <span className="dynesis-face-node tl" />
              <span className="dynesis-face-node tr" />
              <span className="dynesis-face-node bl" />
              <span className="dynesis-face-node br" />
            </div>

            <div className="dynesis-face dynesis-face--bottom">
              <span className="dynesis-face-glass-glare" />
              <span className="dynesis-face-crosshair" />
              <span className="dynesis-face-node tl" />
              <span className="dynesis-face-node tr" />
              <span className="dynesis-face-node bl" />
              <span className="dynesis-face-node br" />
            </div>

            {/* Inner Quantum Singularity Core */}
            <div className="dynesis-cube-core-anchor">
              <div className="dynesis-core-energy-orb" />
              <div className="dynesis-inner-crystal">
                <div className="dynesis-inner-face in-front" />
                <div className="dynesis-inner-face in-back" />
                <div className="dynesis-inner-face in-right" />
                <div className="dynesis-inner-face in-left" />
                <div className="dynesis-inner-face in-top" />
                <div className="dynesis-inner-face in-bottom" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const STAGES = [
  { at: 0, text: 'Initialisation du système...' },
  { at: 32, text: 'Chargement des modules interactifs...' },
  { at: 68, text: 'Synchronisation de l’écosystème Dynesis...' },
  { at: 92, text: 'Finalisation du rendu...' },
  { at: 100, text: 'Prêt' }
];

export function SplashScreen({ minDuration = 1600, enabled = true }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState<boolean>(enabled);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>(STAGES[0].text);

  useEffect(() => {
    if (!enabled) {
      setIsVisible(false);
      return;
    }

    const startTime = performance.now();
    let frameId: number;
    let exitTimeout: ReturnType<typeof setTimeout> | undefined;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const linearPct = Math.min(elapsed / minDuration, 1);
      // Quad ease-out: smooth progression
      const eased = 1 - Math.pow(1 - linearPct, 1.8);
      const currentPct = Math.min(Math.round(eased * 100), 100);

      setProgress(currentPct);

      const activeStage = [...STAGES].reverse().find((s) => currentPct >= s.at);
      if (activeStage) {
        setStatusMessage(activeStage.text);
      }

      if (linearPct < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        exitTimeout = setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsVisible(false);
          }, 650);
        }, 180);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      if (exitTimeout) clearTimeout(exitTimeout);
    };
  }, [enabled, minDuration]);

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      className={`dynesis-splash-root ${isExiting ? 'dynesis-splash-root--exiting' : ''}`}
      aria-hidden={isExiting}
      role="status"
      aria-live="polite"
      aria-label="Chargement de Dynesis Tech"
    >
      {/* Ambient Cyber Canvas */}
      <div className="dynesis-splash-backdrop">
        <div className="dynesis-splash-aurora-1" />
        <div className="dynesis-splash-aurora-2" />
        <div className="dynesis-splash-grid-mesh" />
      </div>

      {/* Center Cinematic Stage */}
      <div className="dynesis-splash-centerpiece">
        {/* Creative Rotating 3D Crystal Cube */}
        <CreativeRotatingCube3D />

        {/* Brand Typographic Identity */}
        <div className="dynesis-splash-brand-heading">
          <div className="dynesis-splash-brand-title">
            <span className="dynesis-splash-brand-name">DYNESIS</span>
            <span className="dynesis-splash-brand-highlight">TECH</span>
          </div>
          <p className="dynesis-splash-brand-motto">
            DES IDÉES À L&apos;IMPACT
          </p>
        </div>

        {/* Dynamic Progress Indicator */}
        <div className="dynesis-splash-meter-wrapper">
          <div
            className="dynesis-splash-meter-rail"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="dynesis-splash-meter-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="dynesis-splash-meter-lead" />
            </div>
          </div>
          <div className="dynesis-splash-meter-stats">
            <span className="dynesis-splash-meter-status">{statusMessage}</span>
            <span className="dynesis-splash-meter-pct">{String(progress).padStart(2, '0')}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Submark / System Chip */}
      <div className="dynesis-splash-footer">
        <span className="dynesis-splash-footer-badge">
          <span className="dynesis-splash-footer-dot" />
          ARCHITECTURE LOGICIELLE HAUTE PERFORMANCE
        </span>
      </div>
    </aside>
  );
}
