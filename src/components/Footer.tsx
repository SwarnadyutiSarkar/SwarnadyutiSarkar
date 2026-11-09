import React from 'react';
import { LilyLogo } from './Lilies';
import { Butterfly } from './Butterfly';
import { usePortfolio } from '../context/PortfolioContext';
import { usePortfolioMode } from '../context/ModeContext';
import { useReducedMotion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { SkylineSilhouette } from './SkylineScene';

interface FooterProps {
  onOpenAdmin: () => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onReplayIntro }) => {
  const { settings, isAdmin } = usePortfolio();
  const { isGarden, isProfessional } = usePortfolioMode();
  const prefersReduced = useReducedMotion();

  return (
    <footer className="bg-footer-bg text-footer-text relative z-10">
      {/* Professional Mode: Static near-layer skyline silhouette divider above footer */}
      {isProfessional && (
        <div className="w-full text-footer-bg -mt-8 sm:-mt-12 md:-mt-16 pointer-events-none select-none overflow-hidden relative z-0">
          <SkylineSilhouette className="w-full h-8 sm:h-12 md:h-16 block" />
        </div>
      )}

      <div className="py-12 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          {isGarden ? (
            <div className="p-2 rounded-xl bg-white/10 border border-white/20">
              <LilyLogo className="w-6 h-6" />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-display font-bold text-sm text-white">
              S
            </div>
          )}
          <div>
            <p className="font-display font-bold text-lg text-white tracking-tight">
              Swarnadyuti Sarkar
            </p>
            <p className="text-xs text-white/75 font-sans">
              Made with care in Kolkata, India
            </p>
          </div>
        </div>

        {/* Tagline Line (Script with butterfly in Garden; clean editorial serif in Professional) */}
        <div className="flex items-center justify-center gap-2">
          {isGarden ? (
            <div className="flex items-center gap-2 font-script text-2xl sm:text-3xl text-white/90 font-semibold tracking-wide">
              <span>Code. Create. Contribute.</span>
              <Butterfly size={24} animated={!prefersReduced} className="text-white/80" />
            </div>
          ) : (
            <span className="font-display italic text-lg sm:text-xl text-white/90 font-medium">
              Code. Create. Contribute.
            </span>
          )}
        </div>

        {/* Copyright, Replay Intro & Discreet Admin Access */}
        <div className="flex flex-col items-center md:items-end gap-1.5 text-xs text-white/75 font-sans">
          <p>© {new Date().getFullYear()} Swarnadyuti Sarkar. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {isGarden && onReplayIntro && (
              <>
                <button
                  type="button"
                  onClick={onReplayIntro}
                  className="inline-flex items-center gap-1 text-[11px] text-white/70 hover:text-white transition-colors focus:outline-none focus:underline cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-white/80" />
                  <span>Replay Curtain Reveal</span>
                </button>
                <span aria-hidden="true" className="text-white/30">·</span>
              </>
            )}
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-[11px] text-white/60 hover:text-white transition-colors focus:outline-none focus:underline cursor-pointer"
            >
              {isAdmin ? 'Signed in as Owner (Admin Panel)' : 'Owner Portal'}
            </button>
          </div>
        </div>

      </div>
    </div>
  </footer>
  );
};
