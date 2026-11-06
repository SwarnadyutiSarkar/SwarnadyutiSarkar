import React from 'react';
import { LilyLogo } from './Lilies';
import { Butterfly } from './Butterfly';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onReplayIntro }) => {
  const { settings, isAdmin } = usePortfolio();

  return (
    <footer className="bg-[#5B2A4A] text-[#FBF4EF] py-12 px-4 sm:px-6 relative overflow-hidden z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FAF0EA]/10 border border-[#FAF0EA]/20">
            <LilyLogo className="w-6 h-6" />
          </div>
          <div>
            <p className="font-display font-bold text-lg text-white tracking-tight">
              Swarnadyuti Sarkar
            </p>
            <p className="text-xs text-[#E8C5C8]/80 font-sans">
              Made with care in Kolkata, India
            </p>
          </div>
        </div>

        {/* Handwritten Script line with small butterfly */}
        <div className="flex items-center justify-center gap-2 font-script text-2xl sm:text-3xl text-[#E8C5C8] font-semibold tracking-wide">
          <span>Code. Create. Contribute.</span>
          <Butterfly size={24} animated={true} className="text-[#D49B9E]" />
        </div>

        {/* Copyright, Replay Intro & Discreet Admin Access */}
        <div className="flex flex-col items-center md:items-end gap-1.5 text-xs text-[#E8C5C8]/70 font-sans">
          <p>© {new Date().getFullYear()} Swarnadyuti Sarkar. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="inline-flex items-center gap-1 text-[11px] text-[#E8C5C8]/70 hover:text-white transition-colors focus:outline-none focus:underline cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-[#D49B9E]" />
                <span>Replay Curtain Reveal</span>
              </button>
            )}
            <span aria-hidden="true" className="text-[#E8C5C8]/30">·</span>
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-[11px] text-[#E8C5C8]/50 hover:text-[#E8C5C8] transition-colors focus:outline-none focus:underline cursor-pointer"
            >
              {isAdmin ? 'Signed in as Owner (Admin Panel)' : 'Owner Portal'}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
