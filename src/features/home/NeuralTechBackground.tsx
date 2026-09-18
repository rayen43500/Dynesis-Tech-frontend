import React, { useEffect, useRef } from 'react';
import './neural-background.css';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
  pulsePhase: number;
}

interface Signal {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

export function NeuralTechBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
      isActive: false
    };

    const colors = [
      '#0080ff', // Tech Blue
      '#00d2ff', // Cyan
      '#38bdf8', // Sky Blue
      '#6366f1', // Indigo
      '#0ea5e9'  // Light Blue
    ];

    // Node Count adapted to screen size
    const nodeCount = Math.min(Math.floor((width * height) / 18000), 75);
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = Math.random() * 2.2 + 1.8;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius,
        baseRadius: radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.4,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Synaptic signals
    const signals: Signal[] = [];
    const maxSignals = 14;

    function handleResize() {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    }

    function handleMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;
    }

    function handleMouseLeave() {
      mouse.isActive = false;
      mouse.x = -1000;
      mouse.y = -1000;
    }

    const parentEl = canvas.parentElement || window;
    parentEl.addEventListener('mousemove', handleMouseMove as EventListener);
    parentEl.addEventListener('mouseleave', handleMouseLeave as EventListener);
    window.addEventListener('resize', handleResize);

    const maxDist = 150;
    const maxDistSq = maxDist * maxDist;

    let lastTime = performance.now();

    function render(currentTime: number) {
      if (!ctx) return;
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // 1. Update & Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Move
        n.x += n.vx;
        n.y += n.vy;

        // Bounce at edges smoothly
        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        else if (n.x > width) { n.x = width; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        else if (n.y > height) { n.y = height; n.vy *= -1; }

        // Pulse phase
        n.pulsePhase += dt * 1.8;
        const pulse = Math.sin(n.pulsePhase) * 0.35 + 0.9;

        // Mouse interaction
        let currentRadius = n.baseRadius * pulse;
        if (mouse.isActive) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouse.radius * mouse.radius) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / mouse.radius;
            currentRadius = n.baseRadius * (1 + factor * 1.6);
            n.alpha = Math.min(1, 0.5 + factor * 0.5);
          }
        }

        // Draw Node Glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = n.alpha * 0.18;
        ctx.fill();

        // Draw Core Node
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = n.alpha;
        ctx.fill();
      }

      // 2. Draw Synaptic Connections & Spawn Signals
      const neighborPairs: Array<[number, number]> = [];

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            neighborPairs.push([i, j]);
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / maxDist;
            const lineAlpha = factor * 0.32;

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = n1.color;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = factor * 1.4;
            ctx.stroke();
          }
        }

        // Connect to mouse if active
        if (mouse.isActive) {
          const n = nodes[i];
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouse.radius * mouse.radius) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / mouse.radius;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = '#00d2ff';
            ctx.globalAlpha = factor * 0.45;
            ctx.lineWidth = factor * 1.5;
            ctx.stroke();
          }
        }
      }

      // 3. Spawn Random Synaptic Signals along connections
      if (signals.length < maxSignals && neighborPairs.length > 0 && Math.random() < 0.15) {
        const pair = neighborPairs[Math.floor(Math.random() * neighborPairs.length)];
        signals.push({
          fromNode: pair[0],
          toNode: pair[1],
          progress: 0,
          speed: Math.random() * 0.8 + 0.6
        });
      }

      // 4. Update & Draw Synaptic Signals (Electric pulses)
      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.progress += dt * sig.speed;

        if (sig.progress >= 1) {
          signals.splice(s, 1);
          continue;
        }

        const n1 = nodes[sig.fromNode];
        const n2 = nodes[sig.toNode];
        if (!n1 || !n2) {
          signals.splice(s, 1);
          continue;
        }

        const px = n1.x + (n2.x - n1.x) * sig.progress;
        const py = n1.y + (n2.y - n1.y) * sig.progress;

        // Signal Photon Glow
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.globalAlpha = 0.85;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.95;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationId = requestAnimationFrame(render);
    }

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      parentEl.removeEventListener('mousemove', handleMouseMove as EventListener);
      parentEl.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="neural-bg-wrapper" ref={containerRef} aria-hidden="true">
      {/* Dynamic Canvas */}
      <canvas ref={canvasRef} className="neural-bg-canvas" />

      {/* Cyber Grid & Ambient Gradient overlays */}
      <div className="neural-bg-grid" />
      <div className="neural-bg-glow neural-bg-glow--1" />
      <div className="neural-bg-glow neural-bg-glow--2" />
      <div className="neural-bg-vignette" />
    </div>
  );
}
