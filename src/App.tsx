import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Research } from './components/Research';
import { Capabilities } from './components/Capabilities';
import { ScientificVisual } from './components/ScientificVisual';
import { Impact } from './components/Impact';
import { Philosophy } from './components/Philosophy';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { PartnerModal } from './components/PartnerModal';

export function App() {
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative bg-[#06080C] min-h-screen text-bio-text selection:bg-bio-cyan/20 selection:text-bio-cyan">
      
      {/* Top Reading Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-bio-cyan via-teal-400 to-bio-emerald z-[60] transform-origin-left"
        style={{ scaleX }}
      />

      {/* Navigation Bar */}
      <Navbar onOpenPartnerModal={() => setIsPartnerModalOpen(true)} />

      {/* Main Page Content */}
      <main>
        {/* Section 1: Hero */}
        <Hero onOpenPartnerModal={() => setIsPartnerModalOpen(true)} />

        {/* Section 2: About / Innovation */}
        <About />

        {/* Section 3: Research / Technology */}
        <Research />

        {/* Section 4: Capabilities Matrix */}
        <Capabilities />

        {/* Section 5: Scientific Visual / Lab Sandbox Engine */}
        <ScientificVisual />

        {/* Section 6: Statistics / Impact */}
        <Impact />

        {/* Section 7: Editorial Philosophy */}
        <Philosophy />

        {/* Section 8: Final CTA */}
        <CTA onOpenPartnerModal={() => setIsPartnerModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Partnering Modal */}
      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />
    </div>
  );
}

export default App;
