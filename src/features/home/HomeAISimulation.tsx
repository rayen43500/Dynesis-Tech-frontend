import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Sparkles, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Layers,
  ArrowRight
} from 'lucide-react';
import './home-ai-simulation.css';

export function HomeAISimulation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasVideo, setHasVideo] = useState(true);

  // IntersectionObserver to auto-play with sound on scroll into view, and pause on scroll away
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When scrolled into view: start video and audio
            video.muted = false;
            setIsMuted(false);
            const promise = video.play();
            if (promise !== undefined) {
              promise
                .then(() => setIsPlaying(true))
                .catch(() => {
                  // Fallback to muted if browser blocks unmuted autoplay without previous user interaction
                  video.muted = true;
                  setIsMuted(true);
                  video.play().then(() => setIsPlaying(true)).catch(() => {});
                });
            }
          } else {
            // When scrolled away (up or down): pause video
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: 0.35
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Toggle Mute / Unmute
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      videoRef.current.requestFullscreen().catch(() => {});
    }
  };

  // Progress update
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  return (
    <section className="dyn-ai-video-sec" id="simulation-ia" aria-label="Présentation Vidéo Intelligence Artificielle">
      <div className="dyn-ai-video-sec__container">
        
        {/* Harmonious Header */}
        <header className="dyn-ai-video-sec__header">
          <div className="tech-section-tag-wrapper">
            <span className="tech-section-tag">(D) — INTELLIGENCE ARTIFICIELLE & INNOVATION</span>
            <div className="tech-section-tag-line" aria-hidden="true" />
          </div>
          <h2 className="dyn-ai-video-sec__title">
            Intelligence Artificielle & Modèles Cognitifs Autonomes
          </h2>
          <p className="dyn-ai-video-sec__subtitle">
            Visualisez la puissance de nos architectures d’IA : agents autonomes, raisonnement multi-étapes et déploiement de code en production en quelques secondes.
          </p>
        </header>

        {/* High-Tech Video Player Frame */}
        <div className="dyn-ai-frame">
          
          {/* Frame Window Bar */}
          <div className="dyn-ai-frame__topbar">
            <div className="dyn-ai-frame__dots">
              <span className="dyn-ai-frame__dot dyn-ai-frame__dot--red" />
              <span className="dyn-ai-frame__dot dyn-ai-frame__dot--yellow" />
              <span className="dyn-ai-frame__dot dyn-ai-frame__dot--green" />
            </div>
            
            <div className="dyn-ai-frame__url-bar">
              <Sparkles size={13} className="dyn-ai-frame__url-icon" />
              <span>dynesis-ai://neural-cognitive-lab/stream</span>
            </div>

            <div className="dyn-ai-frame__badge">
              <span className="dyn-ai-frame__badge-pulse" />
              <span>DÉMO VIDÉO IA • HD</span>
            </div>
          </div>

          {/* Main Video Viewport */}
          <div className="dyn-ai-player" onClick={togglePlay}>
            <video
              ref={videoRef}
              className="dyn-ai-player__video"
              poster="/images/dynesis-ai-poster.jpg"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => setHasVideo(false)}
            >
              <source src="/images/dynesis-ai.mp4" type="video/mp4" />
              <source src="/dynesis-ai.mp4" type="video/mp4" />
              <source src="/videos/dynesis-ai.mp4" type="video/mp4" />
              Votre navigateur ne prend pas en charge la lecture vidéo.
            </video>

            {/* Glowing Scanline / HUD Overlay */}
            <div className="dyn-ai-player__hud-overlay" />

            {/* Hint Badge if video file is still waiting to be copied */}
            {!hasVideo && (
              <div className="dyn-ai-player__waiting-hint" onClick={(e) => e.stopPropagation()}>
                <Sparkles size={16} />
                <span>Collez votre vidéo nommée <strong>dynesis-ai.mp4</strong> dans le dossier <strong>public/</strong></span>
              </div>
            )}

            {/* Central Play/Pause Watermark Overlay when paused */}
            {!isPlaying && (
              <div className="dyn-ai-player__center-play" aria-label="Lire la vidéo">
                <Play size={28} className="dyn-ai-player__play-icon" />
              </div>
            )}

            {/* Floating Player Control Bar */}
            <div className="dyn-ai-controls" onClick={(e) => e.stopPropagation()}>
              <button 
                type="button" 
                onClick={togglePlay} 
                className="dyn-ai-controls__btn"
                title={isPlaying ? 'Pause' : 'Lecture'}
                aria-label={isPlaying ? 'Pause' : 'Lecture'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>

              <button 
                type="button" 
                onClick={toggleMute} 
                className="dyn-ai-controls__btn"
                title={isMuted ? 'Activer le son' : 'Couper le son'}
                aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              {/* Progress Bar */}
              <div className="dyn-ai-controls__progress-wrap">
                <div 
                  className="dyn-ai-controls__progress-bar" 
                  style={{ width: `${progress}%` }} 
                />
              </div>

              <span className="dyn-ai-controls__time-tag">1080p 60fps</span>

              <button 
                type="button" 
                onClick={toggleFullscreen} 
                className="dyn-ai-controls__btn"
                title="Plein écran"
                aria-label="Plein écran"
              >
                <Maximize size={16} />
              </button>
            </div>

          </div>

          {/* Bottom Telemetry Bar */}
          <div className="dyn-ai-frame__bottom">
            <div className="dyn-ai-frame__chips">
              <div className="dyn-ai-frame__chip">
                <Cpu size={14} className="dyn-ai-frame__chip-icon" />
                <span className="dyn-ai-frame__chip-lbl">Agent Cognitif :</span>
                <strong className="dyn-ai-frame__chip-val">Dynesis-Titan v3</strong>
              </div>
              <div className="dyn-ai-frame__chip">
                <Zap size={14} className="dyn-ai-frame__chip-icon" />
                <span className="dyn-ai-frame__chip-lbl">Inférence :</span>
                <strong className="dyn-ai-frame__chip-val">4.2 ms (Temps Réel)</strong>
              </div>
              <div className="dyn-ai-frame__chip">
                <Layers size={14} className="dyn-ai-frame__chip-icon" />
                <span className="dyn-ai-frame__chip-lbl">Architecture :</span>
                <strong className="dyn-ai-frame__chip-val">Multi-Agents ZK</strong>
              </div>
            </div>

            <Link to="/contact" className="dyn-ai-frame__cta">
              <span>EXPLORER NOS SOLUTIONS IA</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
