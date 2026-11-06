import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { usePortfolioMode } from '../context/ModeContext';

/**
 * Garden-only scroll progress indicator:
 * A thin vine/stem running down the left edge that grows with scroll progress,
 * featuring delicate sprouting leaves and a blooming lily bud at the current scroll head.
 */
export const ScrollProgressStem: React.FC = () => {
  const { isGarden } = usePortfolioMode();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate tip position in percentage
  const tipTop = useTransform(smoothProgress, (p) => `${Math.min(p * 100, 99.2)}%`);

  if (!isGarden) {
    return null;
  }

  return (
    <aside
      aria-label="Garden scroll progress indicator"
      className="fixed left-1.5 sm:left-3 top-0 bottom-0 w-4 pointer-events-none z-30 select-none hidden md:block"
    >
      {/* Background Trellis Guide Line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-8 w-[1.5px] bg-border/40 rounded-full" />

      {/* Growing Organic Vine Stem */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-4 bottom-8 w-[2px] bg-gradient-to-b from-sage/60 via-sage to-accent origin-top rounded-full shadow-2xs"
        style={{ scaleY: smoothProgress }}
      />

      {/* Leaf Nodes Along Stem at Strategic Milestone Intervals */}
      {[0.2, 0.45, 0.7, 0.9].map((milestone, idx) => (
        <div
          key={milestone}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
          style={{ top: `${milestone * 100}%` }}
        >
          <svg
            viewBox="0 0 16 16"
            className={`w-3.5 h-3.5 ${idx % 2 === 0 ? '-translate-x-1 rotate-12' : 'translate-x-1 -rotate-12'} text-sage/75`}
            fill="currentColor"
          >
            <path d="M8 1C8 7 1 10 1 15C7 15 13 13 15 8C15 3 11 1 8 1Z" />
          </svg>
        </div>
      ))}

      {/* Blossoming Lily Bud Head Following Scroll Tip */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ top: tipTop }}
      >
        <div className="relative flex items-center justify-center">
          {/* Subtle petal pulse aura */}
          <span className="absolute w-4 h-4 rounded-full bg-rose/40 animate-ping opacity-60 pointer-events-none" />
          
          {/* Miniature Lily Bud Icon */}
          <svg
            viewBox="0 0 20 20"
            className="w-4 h-4 text-accent drop-shadow-xs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Center bud petal */}
            <path
              d="M10 2C10 7 7 11 7 15C7 16.6 8.3 18 10 18C11.7 18 13 16.6 13 15C13 11 10 2 10 2Z"
              fill="#D49B9E"
            />
            {/* Left petal flare */}
            <path
              d="M10 7C8 9 5 12 5 14C5 15.5 6 16.5 7.5 16.5C8 16.5 8.8 15.5 10 14"
              stroke="#5B2A4A"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Right petal flare */}
            <path
              d="M10 7C12 9 15 12 15 14C15 15.5 14 16.5 12.5 16.5C12 16.5 11.2 15.5 10 14"
              stroke="#5B2A4A"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="10" cy="14" r="1.5" fill="#5B2A4A" />
          </svg>
        </div>
      </motion.div>
    </aside>
  );
};
