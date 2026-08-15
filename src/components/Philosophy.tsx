import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Philosophy: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0.6, 0.9], [-30, 30]);

  return (
    <section className="py-36 bg-bio-deep relative overflow-hidden flex items-center justify-center">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.06)_0,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Quote Mark Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-bio-cyan font-serif text-8xl font-bold mb-4 font-mono select-none"
        >
          “
        </motion.div>

        {/* Parallax Editorial Statement */}
        <motion.div style={{ y: yParallax }}>
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.2] max-w-4xl mx-auto font-sans"
          >
            "The future of medicine will not be discovered by looking at biology differently. <br className="hidden sm:inline" />
            It will be discovered by <span className="bg-gradient-to-r from-bio-cyan via-teal-300 to-bio-emerald bg-clip-text text-transparent">understanding it deeper.</span>"
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-2"
          >
            <div className="w-12 h-[1px] bg-bio-cyan/40 mb-2" />
            <span className="text-sm font-semibold tracking-wider text-white uppercase font-sans">Dr. Evelyn Vance</span>
            <span className="text-xs font-mono text-bio-cyan">Chief Scientific Officer // NEXORA BIO</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
