import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { impactStats } from '../data/companyData';
import { SectionBadge } from './UI/SectionBadge';
import { useCountUp } from '../hooks/useCountUp';
import { Award, Dna, Globe, Activity } from 'lucide-react';

interface StatItemProps {
  stat: typeof impactStats[0];
  isVisible: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ stat, isVisible }) => {
  const animatedValue = useCountUp(stat.number, 2200, isVisible);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Award': return <Award className="w-6 h-6 text-bio-cyan" />;
      case 'Dna': return <Dna className="w-6 h-6 text-bio-emerald" />;
      case 'Globe': return <Globe className="w-6 h-6 text-bio-lime" />;
      default: return <Activity className="w-6 h-6 text-sky-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-panel p-6 sm:p-8 rounded-3xl border border-bio-border flex flex-col justify-between group hover:border-bio-cyan/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 rounded-2xl bg-bio-deep border border-bio-border group-hover:border-bio-cyan/40 transition-colors">
          {getIcon(stat.iconName)}
        </div>
        <span className="text-xs font-mono text-bio-dim tracking-wider uppercase">NX-METRIC</span>
      </div>

      <div>
        <div className="text-4xl sm:text-5xl font-bold font-mono text-white mb-2 tracking-tight flex items-baseline">
          <span>{animatedValue}</span>
          <span className="text-bio-cyan">{stat.suffix}</span>
        </div>
        <h3 className="text-base font-bold text-white mb-2">{stat.label}</h3>
        <p className="text-bio-muted text-xs sm:text-sm leading-relaxed">{stat.description}</p>
      </div>
    </motion.div>
  );
};

export const Impact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="impact" ref={sectionRef} className="py-28 bg-bio-dark relative overflow-hidden border-t border-bio-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionBadge code="IMP-04" label="Global Impact & Scale" />
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-4 mb-4">
            Validated Medical & Scientific Milestones
          </h2>
          <p className="text-bio-muted text-base sm:text-lg">
            Empirical evidence of our single-cell discovery engine's performance across global bio-pharma collaborations.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactStats.map((stat) => (
            <StatItem key={stat.id} stat={stat} isVisible={isVisible} />
          ))}
        </div>

      </div>
    </section>
  );
};
