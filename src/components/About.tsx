import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionBadge } from './UI/SectionBadge';
import { CheckCircle2, Cpu, ShieldCheck, Microscope } from 'lucide-react';

export const About: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated Cellular Blueprint Diagram Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = Math.max(canvas.parentElement?.clientWidth || 0, 500));
    let height = (canvas.height = Math.max(canvas.parentElement?.clientHeight || 0, 400));

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

    let startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw Scientific Blueprint Grid
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.06)';
      ctx.lineWidth = 1;
      const gridSize = 40;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Concentric Layer Circles (Cellular Architecture)
      const layers = [140, 100, 60, 25];
      const layerColors = ['#00F2FE', '#10B981', '#A3E635', '#38BDF8'];

      layers.forEach((r, idx) => {
        const pulse = Math.sin(elapsed * 1.5 + idx * 0.8) * 4;
        const currentR = r + pulse;

        ctx.beginPath();
        ctx.arc(cx, cy, currentR, 0, Math.PI * 2);
        ctx.strokeStyle = layerColors[idx];
        ctx.globalAlpha = 0.35 - idx * 0.05;
        ctx.lineWidth = idx === 0 ? 1.5 : 1;
        ctx.setLineDash(idx % 2 === 0 ? [6, 6] : []);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;

        // Orbiting node markers
        const angle = elapsed * (0.4 - idx * 0.08) * (idx % 2 === 0 ? 1 : -1);
        const ox = cx + Math.cos(angle) * currentR;
        const oy = cy + Math.sin(angle) * currentR;

        ctx.beginPath();
        ctx.arc(ox, oy, 4, 0, Math.PI * 2);
        ctx.fillStyle = layerColors[idx];
        ctx.fill();

        // Connecting radial line to core
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ox, oy);
        ctx.strokeStyle = layerColors[idx];
        ctx.globalAlpha = 0.15;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Scanning Laser Sweep line
      const laserY = (Math.sin(elapsed * 0.8) * 0.5 + 0.5) * height;
      ctx.beginPath();
      ctx.moveTo(0, laserY);
      ctx.lineTo(width, laserY);
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Measurement HUD Reticle
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="about" className="py-24 bg-bio-dark relative overflow-hidden border-t border-bio-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <SectionBadge code="PHIL-01" label="Research Innovation" />

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-6 mb-6 leading-tight">
              "Biology is the world's most sophisticated technology. We build the tools to understand it."
            </h2>

            <p className="text-bio-muted text-base sm:text-lg leading-relaxed mb-8">
              At NEXORA BIO, we view biological organisms not merely as complex tissue, but as programmable molecular computers. Traditional medicine discovers drugs by serendipity; our platform engineers therapeutic interventions through algorithmic intention.
            </p>

            {/* Philosophy Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              <div className="glass-panel p-4 rounded-xl border border-bio-border/60 flex items-start gap-3">
                <Microscope className="w-5 h-5 text-bio-cyan shrink-0 mt-1" />
                <div>
                  <h3 className="text-sm font-semibold text-white">Single-Molecule Rigor</h3>
                  <p className="text-xs text-bio-muted mt-1">Observing cellular events at atomic distances to eliminate therapeutic ambiguity.</p>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-bio-border/60 flex items-start gap-3">
                <Cpu className="w-5 h-5 text-bio-emerald shrink-0 mt-1" />
                <div>
                  <h3 className="text-sm font-semibold text-white">Algorithmic Biology</h3>
                  <p className="text-xs text-bio-muted mt-1">AI models trained on multi-omic landscapes to predict binding kinetic stability.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-bio-border/40 w-full">
              <div className="flex items-center gap-2 text-xs font-mono text-bio-cyan">
                <CheckCircle2 className="w-4 h-4 text-bio-emerald" />
                <span>ISO-17025 Certified Bio-Foundry</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-bio-cyan">
                <ShieldCheck className="w-4 h-4 text-bio-emerald" />
                <span>HIPAA & GDPR Multi-Omic Compliance</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Column (Cellular Blueprint Canvas) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="glass-panel rounded-3xl p-4 border border-bio-border shadow-2xl relative group overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 border-b border-bio-border mb-2 text-xs font-mono text-bio-muted">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-bio-cyan animate-ping" />
                  LIVE CELLULAR BLUEPRINT
                </span>
                <span>RETICLE: 0.4Å</span>
              </div>

              <div className="relative h-[360px] sm:h-[400px] w-full rounded-2xl overflow-hidden bg-[#06080C]/90">
                <canvas ref={canvasRef} className="w-full h-full" />
              </div>

              {/* Floating Overlay Badge */}
              <div className="absolute bottom-8 right-8 glass-panel px-4 py-2 rounded-xl border border-bio-cyan/30 text-xs font-mono text-bio-cyan">
                LAYER STATUS: SYNCED
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
