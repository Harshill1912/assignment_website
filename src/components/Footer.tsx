import { Dna, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bio-deep text-bio-muted border-t border-bio-border pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-bio-border/60">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a href="#" className="flex items-center gap-3 mb-4 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-bio-cyan via-teal-500 to-bio-emerald p-[1px] shadow-cyan-glow">
                <div className="w-full h-full bg-[#06080C] rounded-[11px] flex items-center justify-center">
                  <Dna className="w-4 h-4 text-bio-cyan" />
                </div>
              </div>
              <span className="font-sans font-bold text-lg text-white">
                NEXORA <span className="text-bio-cyan font-mono text-xs px-1.5 py-0.5 rounded bg-bio-cyan/10 border border-bio-cyan/20">BIO</span>
              </span>
            </a>

            <p className="text-bio-muted text-sm leading-relaxed max-w-sm mb-6">
              Engineering biology for a healthier tomorrow. Pioneering precision medicine, cellular programming, and AI-assisted molecular therapeutics.
            </p>

            {/* Live Telemetry Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-bio-card border border-bio-border text-xs font-mono text-bio-cyan">
              <span className="w-2 h-2 rounded-full bg-bio-emerald animate-pulse" />
              <span>SYSTEM STATUS: 100% OPERATIONAL // ALL NODES SYNCED</span>
            </div>
          </div>

          {/* Nav Categories */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Research */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-white mb-4">Research Domains</h3>
              <ul className="space-y-2.5 text-xs font-mono">
                <li><a href="#research" className="hover:text-bio-cyan transition-colors">Precision Medicine</a></li>
                <li><a href="#research" className="hover:text-bio-cyan transition-colors">Cellular Engineering</a></li>
                <li><a href="#research" className="hover:text-bio-cyan transition-colors">Computational Biology</a></li>
                <li><a href="#research" className="hover:text-bio-cyan transition-colors">Molecular Discovery</a></li>
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-white mb-4">Platform & Capabilities</h3>
              <ul className="space-y-2.5 text-xs font-mono">
                <li><a href="#capabilities" className="hover:text-bio-cyan transition-colors">Genomic Analysis</a></li>
                <li><a href="#capabilities" className="hover:text-bio-cyan transition-colors">Cell Engineering</a></li>
                <li><a href="#capabilities" className="hover:text-bio-cyan transition-colors">Molecular Screening</a></li>
                <li><a href="#lab-sandbox" className="hover:text-bio-cyan transition-colors">Lab Sandbox Engine</a></li>
              </ul>
            </div>

            {/* Company & Social */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-white mb-4">Connect & Legal</h3>
              <ul className="space-y-2.5 text-xs font-mono">
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-bio-cyan transition-colors inline-flex items-center gap-1">
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-bio-cyan transition-colors inline-flex items-center gap-1">
                    <span>Twitter / X</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-bio-cyan transition-colors inline-flex items-center gap-1">
                    <span>GitHub Bio-Repo</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
                <li><span className="text-bio-dim cursor-not-allowed">Privacy & Bio-Ethics</span></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Copyright & Credit Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-bio-dim">
          <p>© {currentYear} NEXORA BIO, Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-bio-emerald" />
            <span>Designed for Next-Generation Biotechnology Research</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
