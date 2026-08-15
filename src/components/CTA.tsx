import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './UI/Button';
import { SectionBadge } from './UI/SectionBadge';
import { Dna } from 'lucide-react';

interface CTAProps {
  onOpenPartnerModal: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onOpenPartnerModal }) => {
  return (
    <section className="py-28 bg-bio-dark relative overflow-hidden border-t border-bio-border">
      
      {/* Background Subtle Mesh Grid & Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-bio-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-10 sm:p-16 rounded-3xl border border-bio-cyan/30 shadow-2xl relative overflow-hidden"
        >
          {/* Top Badge */}
          <div className="mb-6">
            <SectionBadge code="INIT-01" label="Strategic Bio-Partnerships" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto">
            Let's build what <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-bio-cyan via-teal-300 to-bio-emerald bg-clip-text text-transparent">
              biology makes possible.
            </span>
          </h2>

          {/* Supporting Copy */}
          <p className="text-bio-muted text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether exploring therapeutic co-development, licensing single-cell target data, or co-designing synthetic circuits, partner with our scientific team today.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenPartnerModal}
            >
              Start a Conversation
            </Button>
          </div>

          {/* Decorative Corner Icons */}
          <Dna className="absolute top-6 left-6 w-12 h-12 text-bio-cyan/10 pointer-events-none" />
          <Dna className="absolute bottom-6 right-6 w-12 h-12 text-bio-emerald/10 pointer-events-none" />

        </motion.div>

      </div>
    </section>
  );
};
