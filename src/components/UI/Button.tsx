import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  showArrow = true,
  children,
  className,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-bio-cyan/50 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden";

  const variants = {
    primary: "bg-gradient-to-r from-bio-cyan via-teal-400 to-bio-emerald text-[#06080C] font-semibold hover:shadow-cyan-glow hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-bio-card hover:bg-bio-card/90 text-bio-text border border-bio-border hover:border-bio-cyan/40 hover:scale-[1.02] active:scale-[0.98]",
    outline: "bg-transparent text-bio-cyan border border-bio-cyan/40 hover:bg-bio-cyan/10 hover:border-bio-cyan hover:scale-[1.02] active:scale-[0.98]",
    ghost: "bg-transparent text-bio-text hover:text-bio-cyan hover:bg-white/5",
  };

  const sizes = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-3 font-semibold",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <ArrowUpRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </button>
  );
};
