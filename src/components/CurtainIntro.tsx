import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

// Blue Finch Bird SVG (accent blue #6FA8DC and deep #3E7CB1, cream belly, orange beak)
const BlueFinch: React.FC<{
  facing: 'left' | 'right';
  isFlying: boolean;
  className?: string;
}> = ({ facing, isFlying, className = '' }) => {
  return (
    <svg
      viewBox="0 0 64 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${facing === 'left' ? 'scale-x-[-1]' : ''} ${className}`}
      aria-hidden="true"
    >
      {/* Bird Body */}
      <path
        d="M14 30C11 23 16 15 28 13C38 11 46 15 48 22C50 28 46 34 36 35C26 36 16 36 14 30Z"
        fill="#3E7CB1"
      />
      {/* Soft Cream Belly */}
      <path
        d="M20 29C18 24 22 19 30 18C37 17 42 21 44 26C42 31 34 33 26 32C22 31 20 30 20 29Z"
        fill="#FBF4EF"
      />
      {/* Finch Head */}
      <circle cx="46" cy="19" r="9.5" fill="#3E7CB1" />
      <circle cx="47.5" cy="17" r="2" fill="#1C2D37" />
      <circle cx="48" cy="16.5" r="0.7" fill="#FFFFFF" />

      {/* Tiny Orange Beak (Gripping curtain edge) */}
      <path d="M54 18L62 20.5L54 23Z" fill="#E07A5F" />

      {/* Flapping Wings when flying */}
      <g
        style={{
          transformOrigin: '30px 19px',
          animation: isFlying ? 'finch-wing-flap 0.15s infinite alternate ease-in-out' : 'none',
        }}
      >
        <path
          d="M22 21C26 13 38 12 40 19C38 25 30 27 24 26C20 25 18 23 22 21Z"
          fill="#6FA8DC"
        />
        {/* Feather Quill Accents */}
        <path
          d="M28 17C32 15 37 17 36 22"
          stroke="#2A5C85"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M24 22C28 21 33 22 32 25"
          stroke="#2A5C85"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>

      {/* Tail feathers */}
      <path d="M15 29L4 34L6 30L2 30L13 25" fill="#2A5C85" />

      {/* Tiny Claws */}
      <path
        d="M28 35V39M30 35V39M26 39H30M28 39H32"
        stroke="#E07A5F"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

// Lily & Leaf Pattern for Curtains (Inline SVG pattern with vertical folds)
const CurtainFabric: React.FC<{ side: 'left' | 'right' }> = ({ side }) => (
  <div
    className={`absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none ${
      side === 'left' ? 'bg-[#FAF0EA]' : 'bg-[#F8EEE7]'
    }`}
    style={{
      backgroundImage: `
        linear-gradient(to right,
          rgba(91,42,74,0.08) 0%,
          transparent 6%,
          rgba(255,255,255,0.45) 12%,
          transparent 20%,
          rgba(91,42,74,0.06) 32%,
          transparent 42%,
          rgba(255,255,255,0.45) 55%,
          transparent 68%,
          rgba(91,42,74,0.09) 85%,
          transparent 95%,
          rgba(91,42,74,0.12) 100%)
      `,
    }}
  >
    {/* Repeating botanical floral pattern */}
    <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id={`lily-fabric-pattern-${side}`}
          width="130"
          height="150"
          patternUnits="userSpaceOnUse"
        >
          {/* Stem & Leaves */}
          <path
            d="M65 20C60 55 45 75 65 115"
            stroke="#95A78D"
            strokeWidth="1.6"
            fill="none"
            opacity="0.65"
          />
          <path
            d="M60 48C48 42 42 53 52 62C58 58 60 51 60 48Z"
            fill="#95A78D"
            opacity="0.55"
          />
          <path
            d="M62 80C75 74 80 85 71 94C64 91 61 83 62 80Z"
            fill="#748A6D"
            opacity="0.55"
          />

          {/* Lily Bloom Motif */}
          <path
            d="M65 20C65 10 56 4 48 10C54 18 62 18 65 20Z"
            fill="#D49B9E"
            opacity="0.8"
          />
          <path
            d="M65 20C65 10 74 4 82 10C76 18 68 18 65 20Z"
            fill="#D49B9E"
            opacity="0.8"
          />
          <path
            d="M65 20C63 29 54 33 49 27C56 23 60 22 65 20Z"
            fill="#E8C5C8"
            opacity="0.85"
          />
          <path
            d="M65 20C67 29 76 33 81 27C74 23 70 22 65 20Z"
            fill="#E8C5C8"
            opacity="0.85"
          />
          <circle cx="65" cy="20" r="2.2" fill="#5B2A4A" opacity="0.8" />

          {/* Floating petals */}
          <ellipse cx="28" cy="115" rx="4.5" ry="2.2" fill="#E8C5C8" opacity="0.6" transform="rotate(-25 28 115)" />
          <ellipse cx="102" cy="55" rx="4" ry="2" fill="#E8C5C8" opacity="0.6" transform="rotate(35 102 55)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#lily-fabric-pattern-${side})`} />
    </svg>

    {/* Fabric edge border fold and inner seam drape */}
    <div
      className={`absolute top-0 bottom-0 w-6 ${
        side === 'left'
          ? 'right-0 bg-gradient-to-l from-[#5B2A4A]/20 via-[#5B2A4A]/5 to-transparent border-r-2 border-[#D49B9E]/70 shadow-lg'
          : 'left-0 bg-gradient-to-r from-[#5B2A4A]/20 via-[#5B2A4A]/5 to-transparent border-l-2 border-[#D49B9E]/70 shadow-lg'
      }`}
    />
  </div>
);

interface CurtainIntroProps {
  onComplete: () => void;
}

export const CurtainIntro: React.FC<CurtainIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'waiting' | 'opening' | 'done'>('waiting');
  const [petals, setPetals] = useState<
    { id: number; left: number; top: number; delay: number; duration: number; rotate: number }[]
  >([]);
  const hasTriggeredRef = useRef(false);

  // Setup petals on mount
  useEffect(() => {
    const generatedPetals = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: 32 + Math.random() * 36, // drift around center seam
      top: 10 + Math.random() * 35,
      delay: Math.random() * 0.7,
      duration: 2.0 + Math.random() * 1.6,
      rotate: Math.random() * 360,
    }));
    setPetals(generatedPetals);
  }, []);

  // Check prefers-reduced-motion via motion/react hook and mediaQuery
  const prefersReduced = useReducedMotion();
  useEffect(() => {
    const mediaQuery = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (prefersReduced || mediaQuery?.matches) {
      onComplete();
      return;
    }

    // Auto-open after ~1.0s
    const timer = setTimeout(() => {
      triggerOpen();
    }, 1000);

    return () => clearTimeout(timer);
  }, [prefersReduced]);

  // Keyboard support: Space or Enter immediately triggers open, Escape skips
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        triggerOpen();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        skipImmediately();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage]);

  const triggerOpen = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setStage('opening');

    // Total reveal animation completes in ~2.4s, then completely unmounts
    setTimeout(() => {
      setStage('done');
      onComplete();
    }, 2400);
  };

  const skipImmediately = () => {
    hasTriggeredRef.current = true;
    setStage('done');
    onComplete();
  };

  if (stage === 'done') {
    return null;
  }

  const isOpening = stage === 'opening';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome Curtain Intro"
      className={`fixed inset-0 z-50 overflow-hidden select-none ${
        isOpening ? 'pointer-events-none' : 'cursor-pointer'
      }`}
      onClick={triggerOpen}
    >
      <style>{`
        @keyframes finch-wing-flap {
          0% { transform: rotate(0deg) scaleY(1); }
          100% { transform: rotate(-30deg) scaleY(0.65); }
        }
        @keyframes petal-drift {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.95;
          }
          100% {
            transform: translate(${Math.random() > 0.5 ? '50px' : '-50px'}, 120vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Slim Plum & Gold Curtain Rod at the top */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[#5B2A4A] z-40 shadow-md flex items-center justify-between px-3">
        <div className="w-5 h-5 rounded-full bg-[#D49B9E] -ml-2 border-2 border-[#5B2A4A]" />
        <div className="h-0.5 w-full bg-[#E8C5C8]/30 mx-2" />
        <div className="w-5 h-5 rounded-full bg-[#D49B9E] -mr-2 border-2 border-[#5B2A4A]" />
      </div>

      {/* LEFT CURTAIN HALF (Pulled outward to the left edge by left bird) */}
      <div
        className="absolute top-0 bottom-0 left-0 w-1/2 will-change-transform"
        style={{
          transform: isOpening ? 'translateX(-102%)' : 'translateX(0%)',
          transition: isOpening ? 'transform 2.2s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        }}
      >
        <CurtainFabric side="left" />

        {/* LEFT BIRD (holding inner edge with beak, flies toward left border) */}
        <div
          className="absolute right-[-14px] top-[46%] z-30 pointer-events-none transition-transform"
          style={{
            transform: isOpening
              ? 'translate(-100px, -50px) rotate(-15deg) scale(0.95)'
              : 'translate(0, 0) rotate(0deg)',
            transition: isOpening ? 'transform 2.1s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          }}
        >
          <BlueFinch facing="left" isFlying={isOpening} className="w-16 h-12 sm:w-20 sm:h-15 drop-shadow-md" />
        </div>
      </div>

      {/* RIGHT CURTAIN HALF (Pulled outward to the right edge by right bird) */}
      <div
        className="absolute top-0 bottom-0 right-0 w-1/2 will-change-transform"
        style={{
          transform: isOpening ? 'translateX(102%)' : 'translateX(0%)',
          transition: isOpening ? 'transform 2.2s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        }}
      >
        <CurtainFabric side="right" />

        {/* RIGHT BIRD (holding inner edge with beak, flies toward right border) */}
        <div
          className="absolute left-[-14px] top-[46%] z-30 pointer-events-none transition-transform"
          style={{
            transform: isOpening
              ? 'translate(100px, -50px) rotate(15deg) scale(0.95)'
              : 'translate(0, 0) rotate(0deg)',
            transition: isOpening ? 'transform 2.1s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
          }}
        >
          <BlueFinch facing="right" isFlying={isOpening} className="w-16 h-12 sm:w-20 sm:h-15 drop-shadow-md" />
        </div>
      </div>

      {/* CENTER WELCOME TEXT (Fades out when curtain begins opening) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none text-center px-4"
        style={{
          opacity: isOpening ? 0 : 1,
          transform: isOpening ? 'scale(0.95)' : 'scale(1)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <div className="bg-[#FAF0EA]/95 backdrop-blur-xs px-8 py-5 rounded-3xl border border-[#D49B9E]/70 shadow-xl shadow-[#5B2A4A]/5 max-w-sm mx-auto">
          <p className="font-script text-5xl md:text-6xl text-[#5B2A4A] tracking-wide mb-1">
            Welcome
          </p>
          <p className="text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-[#5B2A4A]/80">
            Swarnadyuti Sarkar · Portfolio
          </p>
          <p className="text-[11px] text-[#2E2230]/70 mt-3 flex items-center justify-center gap-1.5 font-sans">
            <span>Tap anywhere or wait for the birds to open</span>
          </p>
        </div>
      </div>

      {/* FLOATING DRIFTING PETALS WHEN OPENING */}
      {isOpening &&
        petals.map((petal) => (
          <div
            key={petal.id}
            className="absolute pointer-events-none z-35"
            style={{
              left: `${petal.left}%`,
              top: `${petal.top}%`,
              animation: `petal-drift ${petal.duration}s ease-in forwards ${petal.delay}s`,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2C10 8 5 10 2 10C5 10 10 14 10 18C10 14 15 10 18 10C15 10 10 8 10 2Z"
                fill="#E8C5C8"
                opacity="0.9"
                transform={`rotate(${petal.rotate} 10 10)`}
              />
            </svg>
          </div>
        ))}

      {/* SKIP BUTTON */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            skipImmediately();
          }}
          className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#5B2A4A] bg-[#FAF0EA]/95 hover:bg-white border border-[#D49B9E] rounded-full shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-[#5B2A4A] cursor-pointer"
        >
          Skip Intro
        </button>
      </div>
    </div>
  );
};
