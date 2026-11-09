import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface SkylineHeroProps {
  className?: string;
}

/**
 * Animated 3-layer parallax skyline hero scene for Professional Mode.
 * Uses only CSS variables: --bg, --primary, --accent-1, --accent-2, --accent-3, --surface, --text.
 */
export const SkylineHero: React.FC<SkylineHeroProps> = ({ className = '' }) => {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
  const [planeKey, setPlaneKey] = useState(0);
  const [isPlaneFlying, setIsPlaneFlying] = useState(false);

  // Scroll parallax: skyline moves slightly slower than the page
  const { scrollY } = useScroll();
  const scrollOffset = useTransform(scrollY, [0, 600], [0, 48]);

  // Screen size & pointer check
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
      setHasFinePointer(window.matchMedia('(pointer: fine)').matches);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // IntersectionObserver to pause animations when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Page visibility API (pause when tab hidden)
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Desktop fine pointer parallax
  useEffect(() => {
    if (prefersReduced || !hasFinePointer) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = (e.clientY / window.innerHeight) * 2 - 1;
        setCursorOffset({ x: normX, y: normY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReduced, hasFinePointer]);

  // Airplane flight scheduling:
  // First pass ~6s after load; then repeats every ~45s while visible and active
  useEffect(() => {
    if (prefersReduced) return;

    let repeatTimer: ReturnType<typeof setInterval>;
    // First pass starts at 6s
    const initialTimer = setTimeout(() => {
      if (isIntersecting && isTabVisible) {
        setIsPlaneFlying(true);
      }
    }, 6000);

    // Repeat every ~45s
    repeatTimer = setInterval(() => {
      if (isIntersecting && isTabVisible) {
        setIsPlaneFlying(false);
        // Small delay to reset animation before next pass
        setTimeout(() => {
          setPlaneKey((k) => k + 1);
          setIsPlaneFlying(true);
        }, 100);
      }
    }, 45000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(repeatTimer);
    };
  }, [prefersReduced, isIntersecting, isTabVisible]);

  // Parallax offsets for each layer
  const farX = prefersReduced ? 0 : cursorOffset.x * -5;
  const farY = prefersReduced ? 0 : cursorOffset.y * -2.5;

  const midX = prefersReduced ? 0 : cursorOffset.x * -10;
  const midY = prefersReduced ? 0 : cursorOffset.y * -5;

  const nearX = prefersReduced ? 0 : cursorOffset.x * -18;
  const nearY = prefersReduced ? 0 : cursorOffset.y * -8;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
    >
      <style>{`
        @keyframes window-twinkle-subtle {
          0%, 100% { opacity: 0.95; }
          45% { opacity: 0.35; }
          55% { opacity: 0.85; }
          80% { opacity: 0.45; }
        }
        @keyframes plane-flight-across {
          0% {
            transform: translate3d(-340px, 0, 0) rotate(-3deg);
          }
          20% {
            transform: translate3d(20vw, -12px, 0) rotate(-2deg);
          }
          45% {
            transform: translate3d(45vw, -4px, 0) rotate(-4deg);
          }
          70% {
            transform: translate3d(72vw, -15px, 0) rotate(-1.5deg);
          }
          100% {
            transform: translate3d(calc(100vw + 340px), -8px, 0) rotate(-3deg);
          }
        }
        @keyframes plane-banner-flutter {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(2deg) translateY(2px); }
        }
        @keyframes beacon-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
        .skyline-twinkle-1 {
          animation: window-twinkle-subtle 4.5s ease-in-out infinite;
        }
        .skyline-twinkle-2 {
          animation: window-twinkle-subtle 6.2s ease-in-out 1.5s infinite;
        }
        .skyline-twinkle-3 {
          animation: window-twinkle-subtle 5.4s ease-in-out 3s infinite;
        }
        .beacon-blinking {
          animation: beacon-blink 1.8s steps(2, start) infinite;
        }
      `}</style>

      {/* Airplane with Trailing Banner */}
      {!prefersReduced && isPlaneFlying && (
        <div
          key={planeKey}
          className="absolute top-14 sm:top-18 left-0 z-10 will-change-transform"
          style={{
            animation: 'plane-flight-across 11s cubic-bezier(0.42, 0, 0.58, 1) forwards',
            animationPlayState: isIntersecting && isTabVisible ? 'running' : 'paused',
          }}
        >
          <div className="flex items-center">
            {/* Airplane Silhouette */}
            <svg
              viewBox="0 0 44 24"
              className="w-9 h-5 sm:w-11 sm:h-6 shrink-0 drop-shadow-xs"
              style={{ fill: 'var(--primary)' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Fuselage & Wings */}
              <path d="M2 13C2 13 8 12.5 14 12L23 5L26 5L21 12H34L37 8L39 8L38 12L42 12C43 12 44 12.5 44 13C44 13.5 43 14 42 14L38 14L39 18L37 18L34 14H21L26 21L23 21L14 14C8 13.5 2 13 2 13Z" />
            </svg>

            {/* Tow Rope */}
            <svg
              viewBox="0 0 24 6"
              className="w-5 sm:w-6 h-2 shrink-0 -ml-0.5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0"
                y1="3"
                x2="24"
                y2="3"
                stroke="var(--accent-2)"
                strokeWidth="1.2"
                strokeDasharray="2 1"
              />
            </svg>

            {/* Trailing Banner */}
            <div
              className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-sm border shadow-xs"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--accent-2)',
                animation: 'plane-banner-flutter 2.4s ease-in-out infinite',
              }}
            >
              <span
                className="text-[10px] sm:text-xs font-semibold tracking-wide whitespace-nowrap font-mono"
                style={{ color: 'var(--primary)' }}
              >
                {isMobile ? 'Open to opportunities' : 'Open to software, data & development roles'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Skyline SVG Layers anchored to bottom of hero */}
      <motion.div
        style={{ y: prefersReduced ? 0 : scrollOffset }}
        className="absolute inset-x-0 bottom-0 h-44 sm:h-56 md:h-72 lg:h-80 will-change-transform"
      >
        <svg
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ======================================================== */}
          {/* LAYER 1: FAR SKYLINE (Pale buildings in --accent-2, low opacity) */}
          {/* Hidden on small mobile screens (<768px) to reduce clutter */}
          {/* ======================================================== */}
          {!isMobile && (
            <motion.g
              initial={prefersReduced ? false : { y: 60, opacity: 0 }}
              animate={{ y: farY, opacity: 1 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              style={{ fill: 'var(--accent-2)', opacity: 0.38, transform: `translate3d(${farX}px, 0, 0)` }}
            >
              {/* Building 1 */}
              <rect x="25" y="140" width="75" height="180" />
              {/* Building 2 with Spire */}
              <rect x="120" y="90" width="85" height="230" />
              <line x1="162" y1="90" x2="162" y2="55" stroke="var(--accent-2)" strokeWidth="2" />
              <circle cx="162" cy="55" r="2.5" fill="var(--accent-2)" />
              {/* Building 3 */}
              <rect x="225" y="160" width="65" height="160" />
              {/* Building 4 stepped */}
              <rect x="310" y="80" width="90" height="240" />
              <rect x="330" y="55" width="50" height="25" />
              {/* Building 5 */}
              <rect x="420" y="130" width="80" height="190" />
              {/* Building 6 glass tower dome */}
              <path d="M525 320 V110 C525 75 605 75 605 110 V320 Z" />
              {/* Building 7 */}
              <rect x="630" y="145" width="70" height="175" />
              {/* Building 8 with Antenna */}
              <rect x="725" y="70" width="95" height="250" />
              <line x1="772" y1="70" x2="772" y2="35" stroke="var(--accent-2)" strokeWidth="2" />
              <circle cx="772" cy="35" r="2" fill="var(--accent-2)" />
              {/* Building 9 */}
              <rect x="840" y="125" width="85" height="195" />
              {/* Building 10 */}
              <rect x="945" y="150" width="80" height="170" />
              {/* Building 11 */}
              <rect x="1050" y="95" width="90" height="225" />
              <line x1="1095" y1="95" x2="1095" y2="60" stroke="var(--accent-2)" strokeWidth="2" />

              {/* Distant soft windows */}
              <g fill="var(--surface)" opacity="0.4">
                <rect x="135" y="110" width="8" height="10" />
                <rect x="155" y="110" width="8" height="10" />
                <rect x="175" y="110" width="8" height="10" />
                <rect x="135" y="135" width="8" height="10" />
                <rect x="155" y="135" width="8" height="10" />
                <rect x="175" y="135" width="8" height="10" />
                <rect x="740" y="95" width="8" height="10" />
                <rect x="760" y="95" width="8" height="10" />
                <rect x="780" y="95" width="8" height="10" />
                <rect x="1065" y="120" width="8" height="10" />
                <rect x="1085" y="120" width="8" height="10" />
                <rect x="1105" y="120" width="8" height="10" />
              </g>
            </motion.g>
          )}

          {/* ======================================================== */}
          {/* LAYER 2: MID SKYLINE (In --accent-1 with moderate opacity) */}
          {/* ======================================================== */}
          <motion.g
            initial={prefersReduced ? false : { y: 90, opacity: 0 }}
            animate={{ y: midY, opacity: 1 }}
            transition={{ duration: 0.85, delay: prefersReduced ? 0 : 0.22, ease: 'easeOut' }}
            style={{ fill: 'var(--accent-1)', opacity: 0.65, transform: `translate3d(${midX}px, 0, 0)` }}
          >
            {/* Building M1: Angled Roof */}
            <path d="M0 320 V170 L70 135 V320 Z" />
            {/* Building M2: Rounded Glass Tower */}
            <path d="M85 320 V120 C85 85 160 85 160 120 V320 Z" />
            {/* Building M3 */}
            <rect x="180" y="150" width="75" height="170" />
            {/* Building M4: Stepped Crown */}
            <rect x="275" y="110" width="85" height="210" />
            <rect x="295" y="90" width="45" height="20" />
            {/* Building M5 */}
            <rect x="380" y="165" width="70" height="155" />
            {/* Building M6: Tall Tower with double antenna */}
            <rect x="470" y="80" width="90" height="240" />
            <line x1="495" y1="80" x2="495" y2="40" stroke="var(--accent-1)" strokeWidth="2.2" />
            <line x1="535" y1="80" x2="535" y2="50" stroke="var(--accent-1)" strokeWidth="1.8" />
            <circle cx="495" cy="40" r="2.5" fill="var(--accent-1)" />
            {/* Building M7 */}
            <rect x="580" y="140" width="80" height="180" />
            {/* Building M8: Arch cutout top */}
            <path d="M680 320 V125 C715 105 745 105 770 125 V320 Z" />
            {/* Building M9 */}
            <rect x="785" y="155" width="75" height="165" />
            {/* Building M10: Spire Skyscraper */}
            <rect x="880" y="95" width="95" height="225" />
            <path d="M915 95 L927 50 L940 95 Z" />
            <line x1="927" y1="50" x2="927" y2="28" stroke="var(--accent-1)" strokeWidth="2" />
            <circle cx="927" cy="28" r="2" fill="var(--accent-1)" />
            {/* Building M11 */}
            <rect x="995" y="145" width="85" height="175" />
            {/* Building M12 */}
            <rect x="1100" y="120" width="100" height="200" />

            {/* Mid Layer Windows (Lit with soft ice fill) */}
            <g fill="var(--surface)" opacity="0.8">
              {/* Rounded tower glass bands */}
              <rect x="100" y="130" width="45" height="4" rx="2" />
              <rect x="100" y="145" width="45" height="4" rx="2" />
              <rect x="100" y="160" width="45" height="4" rx="2" />
              <rect x="100" y="175" width="45" height="4" rx="2" />
              {/* Stepped crown windows */}
              <rect x="290" y="125" width="7" height="9" rx="1" />
              <rect x="305" y="125" width="7" height="9" rx="1" />
              <rect x="320" y="125" width="7" height="9" rx="1" />
              <rect x="335" y="125" width="7" height="9" rx="1" />
              <rect x="290" y="145" width="7" height="9" rx="1" />
              <rect x="305" y="145" width="7" height="9" rx="1" />
              <rect x="320" y="145" width="7" height="9" rx="1" />
              <rect x="335" y="145" width="7" height="9" rx="1" />
              {/* Tall tower windows */}
              <rect x="488" y="105" width="8" height="10" rx="1" className="skyline-twinkle-1" />
              <rect x="508" y="105" width="8" height="10" rx="1" />
              <rect x="528" y="105" width="8" height="10" rx="1" className="skyline-twinkle-2" />
              <rect x="488" y="128" width="8" height="10" rx="1" />
              <rect x="508" y="128" width="8" height="10" rx="1" className="skyline-twinkle-3" />
              <rect x="528" y="128" width="8" height="10" rx="1" />
              {/* Spire skyscraper windows */}
              <rect x="900" y="120" width="7" height="10" rx="1" />
              <rect x="915" y="120" width="7" height="10" rx="1" className="skyline-twinkle-1" />
              <rect x="930" y="120" width="7" height="10" rx="1" />
              <rect x="945" y="120" width="7" height="10" rx="1" className="skyline-twinkle-2" />
            </g>
          </motion.g>

          {/* ======================================================== */}
          {/* LAYER 3: NEAR SKYLINE (In deep purple derived from --primary) */}
          {/* ======================================================== */}
          <motion.g
            initial={prefersReduced ? false : { y: 130, opacity: 0 }}
            animate={{ y: nearY, opacity: 1 }}
            transition={{ duration: 0.95, delay: prefersReduced ? 0 : 0.42, ease: 'easeOut' }}
            style={{ fill: 'var(--primary)', opacity: 0.95, transform: `translate3d(${nearX}px, 0, 0)` }}
          >
            {/* Near Building N1 */}
            <rect x="15" y="190" width="60" height="130" />
            {/* Near Building N2: Modern high-rise */}
            <rect x="95" y="130" width="80" height="190" />
            {/* Near Building N3: Antenna with blinking beacon */}
            <rect x="200" y="105" width="70" height="215" />
            <line x1="235" y1="105" x2="235" y2="60" stroke="var(--primary)" strokeWidth="2.5" />
            <circle cx="235" cy="58" r="3" fill="var(--accent-1)" className="beacon-blinking" />
            {/* Near Building N4 */}
            <rect x="290" y="175" width="75" height="145" />
            {/* Near Building N5: Corporate headquarters */}
            <rect x="385" y="120" width="85" height="200" />
            <rect x="405" y="105" width="45" height="15" />
            {/* Near Building N6 */}
            <rect x="490" y="160" width="75" height="160" />
            {/* Near Building N7: Tall center tower with spire */}
            <rect x="585" y="90" width="85" height="230" />
            <path d="M610 90 L627.5 45 L645 90 Z" />
            <line x1="627.5" y1="45" x2="627.5" y2="20" stroke="var(--primary)" strokeWidth="2.5" />
            <circle cx="627.5" cy="18" r="3" fill="var(--accent-1)" className="beacon-blinking" />
            {/* Near Building N8 */}
            <rect x="690" y="170" width="70" height="150" />
            {/* Near Building N9: Terraced tower */}
            <path d="M780 320 V140 H805 V115 H845 V140 H865 V320 Z" />
            {/* Near Building N10 */}
            <rect x="885" y="165" width="75" height="155" />
            {/* Near Building N11: Modern block */}
            <rect x="980" y="115" width="85" height="205" />
            <line x1="1022" y1="115" x2="1022" y2="75" stroke="var(--primary)" strokeWidth="2" />
            <circle cx="1022" cy="73" r="2.5" fill="var(--accent-1)" className="beacon-blinking" />
            {/* Near Building N12 */}
            <rect x="1085" y="180" width="90" height="140" />

            {/* Lit Windows & Code Line Windows */}
            <g fill="var(--surface)" opacity="0.9">
              {/* N2 windows */}
              <rect x="110" y="148" width="8" height="11" rx="1" />
              <rect x="126" y="148" width="8" height="11" rx="1" className="skyline-twinkle-1" />
              <rect x="142" y="148" width="8" height="11" rx="1" />
              <rect x="158" y="148" width="8" height="11" rx="1" className="skyline-twinkle-2" />
              <rect x="110" y="172" width="8" height="11" rx="1" />
              <rect x="126" y="172" width="8" height="11" rx="1" />
              <rect x="142" y="172" width="8" height="11" rx="1" className="skyline-twinkle-3" />
              <rect x="158" y="172" width="8" height="11" rx="1" />

              {/* N3 windows with code strokes */}
              <rect x="215" y="125" width="10" height="12" rx="1" />
              <rect x="235" y="125" width="10" height="12" rx="1" className="skyline-twinkle-2" />
              <rect x="215" y="150" width="10" height="12" rx="1" className="skyline-twinkle-1" />
              <rect x="235" y="150" width="10" height="12" rx="1" />

              {/* N5 Windows */}
              <rect x="400" y="135" width="9" height="11" rx="1" className="skyline-twinkle-3" />
              <rect x="418" y="135" width="9" height="11" rx="1" />
              <rect x="436" y="135" width="9" height="11" rx="1" className="skyline-twinkle-1" />
              <rect x="400" y="158" width="9" height="11" rx="1" />
              <rect x="418" y="158" width="9" height="11" rx="1" className="skyline-twinkle-2" />
              <rect x="436" y="158" width="9" height="11" rx="1" />

              {/* N7 Center Tower Windows */}
              <rect x="602" y="115" width="10" height="12" rx="1" />
              <rect x="622" y="115" width="10" height="12" rx="1" className="skyline-twinkle-1" />
              <rect x="642" y="115" width="10" height="12" rx="1" />
              <rect x="602" y="140" width="10" height="12" rx="1" className="skyline-twinkle-2" />
              <rect x="622" y="140" width="10" height="12" rx="1" />
              <rect x="642" y="140" width="10" height="12" rx="1" className="skyline-twinkle-3" />

              {/* N9 Terraced Tower Windows */}
              <rect x="815" y="130" width="9" height="11" rx="1" />
              <rect x="832" y="130" width="9" height="11" rx="1" className="skyline-twinkle-1" />
              <rect x="798" y="155" width="9" height="11" rx="1" className="skyline-twinkle-2" />
              <rect x="815" y="155" width="9" height="11" rx="1" />
              <rect x="832" y="155" width="9" height="11" rx="1" />
              <rect x="848" y="155" width="9" height="11" rx="1" className="skyline-twinkle-3" />

              {/* N11 Windows */}
              <rect x="998" y="135" width="9" height="11" rx="1" className="skyline-twinkle-1" />
              <rect x="1018" y="135" width="9" height="11" rx="1" />
              <rect x="1038" y="135" width="9" height="11" rx="1" className="skyline-twinkle-2" />
              <rect x="998" y="158" width="9" height="11" rx="1" />
              <rect x="1018" y="158" width="9" height="11" rx="1" className="skyline-twinkle-3" />
              <rect x="1038" y="158" width="9" height="11" rx="1" />
            </g>

            {/* A few windows on the nearest buildings show tiny "code line" strokes */}
            <g stroke="var(--accent-1)" strokeWidth="1.2" strokeLinecap="round" opacity="0.95">
              {/* Terminal window on N3 */}
              <line x1="217" y1="174" x2="223" y2="174" />
              <line x1="217" y1="178" x2="221" y2="178" />
              <line x1="237" y1="174" x2="243" y2="174" />
              <line x1="237" y1="178" x2="241" y2="178" />

              {/* Terminal window on N7 */}
              <line x1="605" y1="168" x2="610" y2="168" />
              <line x1="605" y1="172" x2="609" y2="172" />
              <line x1="645" y1="168" x2="650" y2="168" />
              <line x1="645" y1="172" x2="648" y2="172" />

              {/* Terminal window on N9 */}
              <line x1="817" y1="180" x2="822" y2="180" />
              <line x1="817" y1="184" x2="820" y2="184" />
            </g>
          </motion.g>
        </svg>

        {/* Soft light gradient overlay at bottom so hero text/buttons are 100% legible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, var(--bg) 0%, rgba(229, 234, 245, 0.85) 30%, rgba(229, 234, 245, 0.4) 65%, transparent 100%)',
          }}
        />
      </motion.div>
    </div>
  );
};

/**
 * Static near-layer skyline silhouette used as a divider above the footer.
 * Reusable, lightweight, and cleanly transitions into the footer background.
 */
export const SkylineSilhouette: React.FC<{ className?: string }> = ({ className = 'w-full h-12' }) => {
  return (
    <div aria-hidden="true" className={`overflow-hidden select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-full block"
        style={{ fill: 'currentColor' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="
          M0 120
          V75
          H25 V60 H55 V75
          H90 V45 H145 V75
          H180 V35 H220 V75
          H260 V55 H300 V75
          H345 V30 H395 V75
          H435 V50 H475 V75
          H515 V25 L535 5 L555 25 V75
          H600 V40 H645 V75
          H685 V60 H715 V75
          H755 V35 H805 V75
          H845 V55 H885 V75
          H925 V30 H975 V75
          H1020 V50 H1060 V75
          H1105 V40 H1155 V75
          H1200 V120
          Z
        " />
      </svg>
    </div>
  );
};
