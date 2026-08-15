import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Dna, Activity, ArrowDown } from 'lucide-react';
import { Button } from './UI/Button';
import { SectionBadge } from './UI/SectionBadge';
import { useMousePosition } from '../hooks/useMousePosition';
import { ParticleNode, drawMolecularNetwork } from '../utils/canvasDrawers';

interface HeroProps {
  onOpenPartnerModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPartnerModal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useMousePosition();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize Canvas Molecular Network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = Math.max(canvas.parentElement?.clientWidth || 0, window.innerWidth || 800));
    let height = (canvas.height = Math.max(canvas.parentElement?.clientHeight || 0, window.innerHeight || 600));

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const newWidth = canvas.parentElement.clientWidth;
      const newHeight = canvas.parentElement.clientHeight;
      if (newWidth > 0 && newHeight > 0) {
        width = canvas.width = newWidth;
        height = canvas.height = newHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Create particle nodes
    const nodeCount = isMobile ? 22 : 45;
    const colors = ['#00F2FE', '#10B981', '#A3E635', '#38BDF8'];
    const labels = ['GEN-01', 'PRO-44', 'CELL-89', 'MOL-12', 'RNA-09', 'LIG-33', 'EP-07'];

    const nodes: ParticleNode[] = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.5 + 2,
      baseRadius: Math.random() * 2.5 + 2,
      color: colors[i % colors.length],
      pulseOffset: Math.random() * Math.PI * 2,
      label: labels[i % labels.length],
    }));

    const render = (time: number) => {
      drawMolecularNetwork(ctx, width, height, nodes, mouse, time, isMobile);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouse, isMobile]);

  const scrollToResearch = () => {
    document.querySelector('#research')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-bio-deep">
      {/* Background Interactive Molecular Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-80"
      />

      {/* Subtle Radial Gradient Overlays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-bio-cyan/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-bio-emerald/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <SectionBadge code="NX-BIO" label="Next-Gen Biotherapeutics Platform" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white max-w-5xl leading-[1.08] mb-6"
        >
          Engineering biology <br className="hidden sm:inline" />
          for a <span className="bg-gradient-to-r from-bio-cyan via-teal-300 to-bio-emerald bg-clip-text text-transparent">healthier tomorrow.</span>
        </motion.h1>

        {/* Mission Statement Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-lg sm:text-xl text-bio-muted max-w-3xl leading-relaxed mb-10 font-normal"
        >
          NEXORA BIO bridges generative artificial intelligence and synthetic cell biology to decode cellular signals, program de novo proteins, and accelerate life-saving therapeutics.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <Button variant="primary" size="lg" onClick={scrollToResearch}>
            Explore Our Research
          </Button>
          <Button variant="secondary" size="lg" onClick={onOpenPartnerModal}>
            Partner With Us
          </Button>
        </motion.div>

        {/* Scientific Telemetry Floating Chips */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-4xl w-full"
        >
          <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-3 border border-bio-border/60">
            <div className="w-8 h-8 rounded-lg bg-bio-cyan/10 border border-bio-cyan/30 flex items-center justify-center text-bio-cyan shrink-0">
              <Dna className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[11px] font-mono text-bio-dim uppercase tracking-wider">Single-Cell Resolution</div>
              <div className="text-xs font-bold text-white font-mono">0.4Å Atomic Precision</div>
            </div>
          </div>

          <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-3 border border-bio-border/60">
            <div className="w-8 h-8 rounded-lg bg-bio-emerald/10 border border-bio-emerald/30 flex items-center justify-center text-bio-emerald shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[11px] font-mono text-bio-dim uppercase tracking-wider">AI Structure Yield</div>
              <div className="text-xs font-bold text-white font-mono">98.9% TM-Score</div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 glass-panel p-3.5 rounded-2xl flex items-center gap-3 border border-bio-border/60">
            <div className="w-8 h-8 rounded-lg bg-bio-lime/10 border border-bio-lime/30 flex items-center justify-center text-bio-lime shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[11px] font-mono text-bio-dim uppercase tracking-wider">Discovery Acceleration</div>
              <div className="text-xs font-bold text-white font-mono">10,000x In-Silico</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        onClick={scrollToResearch}
      >
        <ArrowDown className="w-5 h-5 text-bio-cyan" />
      </motion.div>
    </section>
  );
};
