import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { capabilitiesData } from '../data/capabilitiesData';
import { SectionBadge } from './UI/SectionBadge';
import { Dna, Cpu, Activity, Database, Shield, Zap, Sparkles } from 'lucide-react';

export const Capabilities: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getIcon = (id: string) => {
    switch (id) {
      case 'genomic-analysis': return <Dna className="w-5 h-5 text-bio-cyan" />;
      case 'cell-engineering': return <Zap className="w-5 h-5 text-bio-emerald" />;
      case 'molecular-screening': return <Activity className="w-5 h-5 text-bio-lime" />;
      case 'ai-discovery': return <Cpu className="w-5 h-5 text-sky-400" />;
      case 'translational-research': return <Shield className="w-5 h-5 text-teal-300" />;
      case 'data-intelligence': return <Database className="w-5 h-5 text-indigo-400" />;
      default: return <Sparkles className="w-5 h-5 text-bio-cyan" />;
    }
  };

  return (
    <section id="capabilities" className="py-28 bg-bio-dark relative overflow-hidden border-t border-bio-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionBadge code="CAP-06" label="Core Capability Matrix" />
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-4 mb-4">
            End-to-End Biological Intelligence
          </h2>
          <p className="text-bio-muted text-base sm:text-lg">
            From single-cell transcriptomics to automated synthesis robotics, explore our integrated capabilities matrix.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilitiesData.map((item) => {
            const isHovered = hoveredId === item.id;
            return (
              <motion.div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="glass-panel glass-panel-hover p-6 rounded-3xl border border-bio-border flex flex-col justify-between relative overflow-hidden group cursor-pointer"
              >
                {/* Top Code & Icon Bar */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-bio-dim group-hover:text-bio-cyan transition-colors">
                    {item.code}
                  </span>
                  <div className="p-2.5 rounded-xl bg-bio-deep border border-bio-border group-hover:border-bio-cyan/40 transition-colors">
                    {getIcon(item.id)}
                  </div>
                </div>

                {/* Capability Name & Short Description */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-bio-cyan transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs font-mono text-bio-cyan mb-3">{item.category}</p>
                  <p className="text-bio-muted text-sm leading-relaxed mb-6">
                    {item.shortDesc}
                  </p>
                </div>

                {/* Hover Reveal Details Container */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0.85,
                    height: 'auto',
                  }}
                  className="pt-4 border-t border-bio-border/60 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-bio-dim">{item.telemetry.label}</span>
                    <span className="text-bio-emerald font-bold">{item.telemetry.value}</span>
                  </div>

                  {isHovered && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-bio-muted leading-relaxed mt-1"
                    >
                      {item.detailedDesc}
                    </motion.p>
                  )}
                </motion.div>

                {/* Decorative Hover Glow Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-bio-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
