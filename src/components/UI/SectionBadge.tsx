import React from 'react';

interface SectionBadgeProps {
  label: string;
  code?: string;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({ label, code }) => {
  return (
    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-bio-card/80 border border-bio-border text-xs font-mono text-bio-cyan tracking-wider uppercase backdrop-blur-md">
      <span className="w-2 h-2 rounded-full bg-bio-emerald animate-pulse" />
      {code && <span className="text-bio-muted">{code} //</span>}
      <span>{label}</span>
    </div>
  );
};
