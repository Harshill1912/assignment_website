import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionBadge } from './UI/SectionBadge';
import { useMousePosition } from '../hooks/useMousePosition';
import {
  ParticleNode,
  drawMolecularNetwork,
  drawDnaHelix,
  drawCellularSignal,
} from '../utils/canvasDrawers';
import { Play, Pause, Layers, Dna, Radio, Eye } from 'lucide-react';

export type SimMode = 'mesh' | 'helix' | 'signal';

export const ScientificVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useMousePosition();
  const [simMode, setSimMode] = useState<SimMode>('mesh');
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [selectedTelemetry, setSelectedTelemetry] = useState<{
    id: string;
    affinity: string;
    tmScore: string;
    conformation: string;
  } | null>({
    id: 'MOL-ALPHA-09',
    affinity: '0.42 nM',
    tmScore: '0.984',
    conformation: 'Stable Alpha-Fold',
  });

  // Initialize and render interactive canvas sandbox
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = Math.max(canvas.parentElement?.clientWidth || 0, 800));
    let height = (canvas.height = Math.max(canvas.parentElement?.clientHeight || 0, 500));

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const newW = canvas.parentElement.clientWidth;
      const newH = canvas.parentElement.clientHeight;
      if (newW > 0 && newH > 0) {
        width = canvas.width = newW;
        height = canvas.height = newH;
      }
    };
    window.addEventListener('resize', handleResize);

    // Initialize node mesh
    const colors = ['#00F2FE', '#10B981', '#A3E635', '#38BDF8'];
    const initialNodes: ParticleNode[] = Array.from({ length: 32 }, (_, i) => ({
      x: Math.random() * (width - 80) + 40,
      y: Math.random() * (height - 80) + 40,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 3 + 3,
      baseRadius: Math.random() * 3 + 3,
      color: colors[i % colors.length],
      pulseOffset: Math.random() * Math.PI * 2,
      label: `NODE-${i + 10}`,
    }));

    let startTime = performance.now();
    let accumulatedTime = 0;

    const render = (now: number) => {
      if (isPlaying) {
        accumulatedTime += (now - startTime) * speedMultiplier;
      }
      startTime = now;

      if (simMode === 'mesh') {
        drawMolecularNetwork(ctx, width, height, initialNodes, mouse, accumulatedTime, false);
      } else if (simMode === 'helix') {
        drawDnaHelix(ctx, width, height, accumulatedTime);
      } else if (simMode === 'signal') {
        drawCellularSignal(ctx, width, height, accumulatedTime, mouse);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [simMode, isPlaying, speedMultiplier, mouse]);

  // Click canvas to inspect nearest node
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clickX = e.clientX - rect.left;

    const randomId = `MOL-${Math.floor(Math.random() * 900 + 100)}`;
    const randomKd = (Math.random() * 0.8 + 0.1).toFixed(2);
    const randomTm = (Math.random() * 0.05 + 0.94).toFixed(3);

    setSelectedTelemetry({
      id: randomId,
      affinity: `${randomKd} nM`,
      tmScore: randomTm,
      conformation: `Conformation X-${Math.floor(clickX % 10)}`,
    });
  };

  return (
    <section id="lab-sandbox" className="py-28 bg-bio-deep relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <SectionBadge code="LAB-01" label="Interactive Laboratory Engine" />
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-4">
              Real-Time Biophysical Simulation
            </h2>
          </div>
          <p className="text-bio-muted max-w-md text-sm sm:text-base">
            Interact with live macromolecular models. Switch simulation modes, adjust velocity fields, and inspect individual node telemetries.
          </p>
        </div>

        {/* Main Canvas Sandbox Frame */}
        <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-bio-cyan/30 shadow-2xl relative overflow-hidden">
          
          {/* Top Simulation Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-bio-border mb-4">
            
            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-2 bg-bio-card p-1 rounded-2xl border border-bio-border">
              <button
                onClick={() => setSimMode('mesh')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  simMode === 'mesh' ? 'bg-bio-cyan text-bio-deep font-bold shadow-cyan-glow' : 'text-bio-muted hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Molecular Mesh</span>
              </button>

              <button
                onClick={() => setSimMode('helix')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  simMode === 'helix' ? 'bg-bio-cyan text-bio-deep font-bold shadow-cyan-glow' : 'text-bio-muted hover:text-white'
                }`}
              >
                <Dna className="w-3.5 h-3.5" />
                <span>DNA Helix</span>
              </button>

              <button
                onClick={() => setSimMode('signal')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  simMode === 'signal' ? 'bg-bio-cyan text-bio-deep font-bold shadow-cyan-glow' : 'text-bio-muted hover:text-white'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Cellular Signal</span>
              </button>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-xl bg-bio-card border border-bio-border text-bio-cyan hover:bg-bio-cyan/10 transition-colors"
                title={isPlaying ? "Pause Simulation" : "Play Simulation"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-bio-dim bg-bio-card px-3 py-1.5 rounded-xl border border-bio-border">
                <span>Speed:</span>
                <select
                  value={speedMultiplier}
                  onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
                  className="bg-transparent text-bio-cyan font-bold outline-none cursor-pointer"
                >
                  <option value={0.5} className="bg-bio-card">0.5x</option>
                  <option value={1} className="bg-bio-card">1.0x</option>
                  <option value={2} className="bg-bio-card">2.0x</option>
                </select>
              </div>
            </div>

          </div>

          {/* Interactive Canvas Render Container */}
          <div className="relative h-[420px] sm:h-[500px] w-full rounded-2xl overflow-hidden bg-[#06080C] cursor-crosshair">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="w-full h-full"
            />

            {/* Floating Live Telemetry Inspector Card */}
            {selectedTelemetry && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-4 right-4 glass-panel p-4 rounded-2xl border border-bio-cyan/40 w-64 shadow-2xl backdrop-blur-xl pointer-events-none"
              >
                <div className="flex items-center justify-between text-xs font-mono text-bio-cyan mb-2">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> TELEMETRY
                  </span>
                  <span>{selectedTelemetry.id}</span>
                </div>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-bio-muted">
                    <span>Binding Kd:</span>
                    <span className="text-white font-bold">{selectedTelemetry.affinity}</span>
                  </div>
                  <div className="flex justify-between text-bio-muted">
                    <span>TM-Score:</span>
                    <span className="text-bio-emerald font-bold">{selectedTelemetry.tmScore}</span>
                  </div>
                  <div className="flex justify-between text-bio-muted">
                    <span>State:</span>
                    <span className="text-bio-lime">{selectedTelemetry.conformation}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Canvas Bottom Overlay Prompt */}
            <div className="absolute bottom-4 left-4 text-xs font-mono text-bio-dim bg-bio-card/80 px-3 py-1.5 rounded-lg border border-bio-border backdrop-blur-md">
              [Click anywhere on canvas to inspect molecular telemetry]
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
