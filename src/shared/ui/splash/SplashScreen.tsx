import React, { useEffect, useState } from 'react';
import './splash-screen.css';

interface SplashScreenProps {
  /** Minimum duration to show splash in ms (default: 1400ms) */
  minDuration?: number;
  /** Force show on every mount (default: true) */
  enabled?: boolean;
}

/**
 * 3D Isometric Crystal Glass Cube Component
 * Renders high-fidelity glass faces with gradient reflections, cyan wireframe edges and inner glow
 */
function CrystalCube3D({ size = 60, opacity = 1 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity, filter: 'drop-shadow(0 6px 14px rgba(0, 140, 255, 0.35))' }}
    >
      <defs>
        {/* Top Face Gradient */}
        <linearGradient id="cubeTopGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#bae6fd" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
        </linearGradient>

        {/* Left Face Gradient */}
        <linearGradient id="cubeLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#0369a1" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#075985" stopOpacity="0.85" />
        </linearGradient>

        {/* Right Face Gradient */}
        <linearGradient id="cubeRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#0284c7" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0080ff" stopOpacity="0.8" />
        </linearGradient>

        {/* Inner Core Glow */}
        <radialGradient id="cubeCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Isometric Cube Geometry */}
      {/* 1. Left Face */}
      <polygon
        points="50,48 10,26 10,72 50,94"
        fill="url(#cubeLeftGrad)"
        stroke="#7dd3fc"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* 2. Right Face */}
      <polygon
        points="50,48 90,26 90,72 50,94"
        fill="url(#cubeRightGrad)"
        stroke="#93c5fd"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* 3. Top Face */}
      <polygon
        points="50,4 90,26 50,48 10,26"
        fill="url(#cubeTopGrad)"
        stroke="#ffffff"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* 4. Internal Refraction Core */}
      <circle cx="50" cy="50" r="16" fill="url(#cubeCoreGlow)" />

      {/* 5. Inner Glass Reflection Highlight Lines */}
      <line x1="50" y1="48" x2="50" y2="94" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.75" />
      <line x1="50" y1="48" x2="10" y2="26" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="50" y1="48" x2="90" y2="26" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.6" />
    </svg>
  );
}

export function SplashScreen({ minDuration = 1400, enabled = true }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState<boolean>(enabled);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(10);
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  const logoUrl = '/images/dynesistech.png';

  useEffect(() => {
    if (!enabled) {
      setIsVisible(false);
      return;
    }

    const startTime = Date.now();
    let exitTimeout: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / minDuration) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        // Trigger exit zoom and dissolution ("le logo passe")
        setIsExiting(true);

        // Remove from DOM after transition completes
        exitTimeout = setTimeout(() => {
          setIsVisible(false);
        }, 700);
      }
    }, 25);

    return () => {
      clearInterval(interval);
      if (exitTimeout) {
        clearTimeout(exitTimeout);
      }
    };
  }, [enabled, minDuration]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`dynesis-splash-root ${isExiting ? 'dynesis-splash-root--exiting' : ''}`}
      aria-hidden={isExiting}
      role="status"
      aria-label="Chargement de Dynesis Tech"
    >
      {/* Background Flow Waves & Ethereal Atmosphere */}
      <div className="dynesis-splash-bg">
        <div className="dynesis-splash-glow-center" />
        <div className="dynesis-splash-curve-bottom-left" />
        <div className="dynesis-splash-curve-top-right" />
      </div>

      {/* Main Center Stage */}
      <div className="dynesis-splash-stage">
        {/* Brand Logo & Symbol */}
        <div className="dynesis-splash-brand-wrap">
          <div className="dynesis-splash-logo-glow" />
          <img
            src={logoUrl}
            alt="Dynesis Tech"
            className="dynesis-splash-logo-img"
            onError={() => setImageFailed(true)}
          />
        </div>

        {/* Catchphrase Motto (Exact match: DES IDÉES AU IMPACT) */}
        <p className="dynesis-splash-motto">
          DES IDÉES AU IMPACT
        </p>

        {/* Progress Bar Row */}
        <div className="dynesis-splash-progress-container">
          <div className="dynesis-splash-progress-rail">
            <div
              className="dynesis-splash-progress-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="dynesis-splash-progress-glow-tip" />
            </div>
          </div>
          <span className="dynesis-splash-progress-pct">{progress}%</span>
        </div>

        {/* Bottom Loading Text */}
        <div className="dynesis-splash-loading-text">
          C H A R G E M E N T . . .
        </div>
      </div>
    </div>
  );
}
