import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Dna, CheckCircle2, Loader2, Send } from 'lucide-react';
import { Button } from './UI/Button';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    interest: 'Precision Medicine',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Keyboard accessibility: ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      organization: '',
      interest: 'Precision Medicine',
      message: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#06080C]/80 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative z-10 w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-bio-cyan/40 shadow-2xl overflow-hidden my-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl bg-bio-card/80 border border-bio-border text-bio-dim hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-bio-cyan"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8 flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-bio-emerald/20 border border-bio-emerald/40 flex items-center justify-center text-bio-emerald mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Inquiry Transmitted</h3>
                <p className="text-bio-muted text-sm max-w-xs mb-6">
                  Thank you for reaching out to NEXORA BIO. Our research partnership team will review your specs within 24 hours.
                </p>
                <Button variant="secondary" size="md" onClick={handleReset} showArrow={false}>
                  Close Window
                </Button>
              </div>
            ) : (
              <div>
                {/* Header */}
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-bio-cyan">
                  <Dna className="w-4 h-4" />
                  <span>PARTNERSHIP INQUIRY PROTOCOL</span>
                </div>
                <h3 id="modal-title" className="text-2xl font-bold text-white mb-2">
                  Initiate Research Collaboration
                </h3>
                <p className="text-bio-muted text-xs sm:text-sm mb-6">
                  Submit your research specs or inquiry to connect with our biotherapeutics lead scientists.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-bio-muted mb-1.5 uppercase">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. Sarah Jenkins"
                      className="w-full px-4 py-2.5 rounded-xl bg-bio-deep border border-bio-border text-white text-sm focus:outline-none focus:border-bio-cyan transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-bio-muted mb-1.5 uppercase">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="s.jenkins@institute.org"
                        className="w-full px-4 py-2.5 rounded-xl bg-bio-deep border border-bio-border text-white text-sm focus:outline-none focus:border-bio-cyan transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-bio-muted mb-1.5 uppercase">
                        Organization / Institute *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="Stanford Bio-X"
                        className="w-full px-4 py-2.5 rounded-xl bg-bio-deep border border-bio-border text-white text-sm focus:outline-none focus:border-bio-cyan transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-bio-muted mb-1.5 uppercase">
                      Primary Domain of Interest
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-bio-deep border border-bio-border text-white text-sm focus:outline-none focus:border-bio-cyan transition-colors cursor-pointer"
                    >
                      <option value="Precision Medicine">Precision Medicine</option>
                      <option value="Cellular Engineering">Cellular Engineering</option>
                      <option value="Computational Biology">Computational Biology</option>
                      <option value="Molecular Discovery">Molecular Discovery</option>
                      <option value="Other Bio-Partnership">Other Bio-Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-bio-muted mb-1.5 uppercase">
                      Project Specification / Note
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe target pathway or therapeutic goals..."
                      className="w-full px-4 py-2.5 rounded-xl bg-bio-deep border border-bio-border text-white text-sm focus:outline-none focus:border-bio-cyan transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      className="w-full"
                      disabled={isSubmitting}
                      showArrow={false}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-bio-deep" />
                          Transmitting Protocol...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4 text-bio-deep" />
                          Transmit Partnership Inquiry
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
