import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { researchAreas } from '../data/researchData';
import { SectionBadge } from './UI/SectionBadge';
import { Activity, Dna, Cpu, Layers, ChevronRight, Zap } from 'lucide-react';

export const Research: React.FC = () => {
  const [selectedId, setSelectedId] = useState(researchAreas[0].id);

  const activeArea = researchAreas.find((a) => a.id === selectedId) || researchAreas[0];

  const getIcon = (id: string) => {
    switch (id) {
      case 'precision-medicine': return <Activity className="w-5 h-5" />;
      case 'cellular-engineering': return <Dna className="w-5 h-5" />;
      case 'computational-biology': return <Cpu className="w-5 h-5" />;
      case 'molecular-discovery': return <Layers className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <section id="research" className="py-28 bg-bio-deep relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <SectionBadge code="RES-04" label="Core Research Pillars" />
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-4">
              Scientific Domains & Discovery Engines
            </h2>
          </div>
          <p className="text-bio-muted max-w-md text-sm sm:text-base">
            Exploring the nexus of single-cell multi-omics, synthetic genetic circuits, and computational macromolecular physics.
          </p>
        </div>

        {/* Scientific Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Area Navigation List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {researchAreas.map((area) => {
              const isSelected = area.id === selectedId;
              return (
                <motion.div
                  key={area.id}
                  onClick={() => setSelectedId(area.id)}
                  whileHover={{ x: 4 }}
                  className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? 'bg-bio-card border-bio-cyan/40 shadow-cyan-glow'
                      : 'bg-bio-card/40 border-bio-border/60 hover:bg-bio-card/70 hover:border-bio-border'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm font-bold text-bio-cyan px-2.5 py-1 rounded-lg bg-bio-cyan/10 border border-bio-cyan/20">
                        {area.number}
                      </span>
                      <div>
                        <h3 className={`font-bold text-base transition-colors ${isSelected ? 'text-white' : 'text-bio-muted'}`}>
                          {area.title}
                        </h3>
                        <p className="text-xs text-bio-dim">{area.subtitle}</p>
                      </div>
                    </div>
                    <div className={`p-2 rounded-xl transition-colors ${isSelected ? 'bg-bio-cyan text-bio-deep' : 'bg-bio-card text-bio-dim'}`}>
                      {getIcon(area.id)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Selected Research Interactive Dashboard */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeArea.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-bio-cyan/30 shadow-2xl relative overflow-hidden"
              >
                {/* Header status bar */}
                <div className="flex items-center justify-between border-b border-bio-border pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-bio-emerald animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-wider text-bio-cyan">
                      PROGRAM SPECIFICATION // {activeArea.number}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-bio-dim">DEEP RESEARCH MATRIX</span>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {activeArea.title}
                </h3>
                <p className="text-sm font-mono text-bio-cyan mb-4">{activeArea.subtitle}</p>
                <p className="text-bio-muted text-sm sm:text-base leading-relaxed mb-8">
                  {activeArea.description}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                  {activeArea.metrics.map((m, idx) => (
                    <div key={idx} className="bg-bio-deep/80 p-3.5 rounded-xl border border-bio-border">
                      <div className="text-[10px] font-mono text-bio-dim uppercase tracking-wider mb-1">{m.label}</div>
                      <div className="text-sm sm:text-base font-bold font-mono text-white">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Technical Specifications List */}
                <div className="mb-8">
                  <h4 className="text-xs font-mono text-bio-dim uppercase tracking-wider mb-3">Platform Protocols</h4>
                  <ul className="space-y-2">
                    {activeArea.specifications.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2 text-xs sm:text-sm text-bio-text">
                        <ChevronRight className="w-4 h-4 text-bio-cyan shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Research Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-bio-border">
                  {activeArea.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs font-mono px-3 py-1 rounded-full bg-bio-cyan/10 border border-bio-cyan/20 text-bio-cyan">
                      #{tag}
                    </span>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
