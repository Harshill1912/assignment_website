import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Dna, ArrowUpRight } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { companyNavLinks } from '../data/companyData';
import { Button } from './UI/Button';

interface NavbarProps {
  onOpenPartnerModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPartnerModal }) => {
  const { isScrolled } = useScrollProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  const handleNavClick = (href: string) => {
    setActiveHash(href);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-[#06080C]/85 backdrop-blur-xl border-b border-bio-border shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-bio-cyan/50 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-bio-cyan via-teal-500 to-bio-emerald p-[1px] shadow-cyan-glow group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#06080C] rounded-[11px] flex items-center justify-center">
                <Dna className="w-5 h-5 text-bio-cyan group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-lg tracking-tight text-white flex items-center gap-1">
                NEXORA <span className="text-bio-cyan font-mono text-xs px-1.5 py-0.5 rounded bg-bio-cyan/10 border border-bio-cyan/20">BIO</span>
              </span>
              <span className="text-[10px] font-mono text-bio-dim tracking-wider uppercase">Biological Systems</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-bio-card/60 p-1.5 rounded-full border border-bio-border backdrop-blur-md">
            {companyNavLinks.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-bio-cyan ${
                    isActive ? 'text-bio-cyan' : 'text-bio-muted hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-bio-cyan/15 rounded-full border border-bio-cyan/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenPartnerModal}
            >
              Partner With Us
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-bio-card/80 border border-bio-border text-bio-muted hover:text-white focus:outline-none focus:ring-2 focus:ring-bio-cyan"
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-bio-cyan" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[70px] z-40 p-4 md:hidden"
          >
            <div className="glass-panel rounded-2xl p-6 shadow-2xl border border-bio-border flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {companyNavLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-left text-sm font-medium text-bio-text hover:text-bio-cyan transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-bio-dim" />
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-bio-border flex flex-col gap-3">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPartnerModal();
                  }}
                >
                  Partner With Us
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
