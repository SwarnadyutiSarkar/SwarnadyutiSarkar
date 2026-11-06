import React, { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { usePortfolioMode } from '../context/ModeContext';
import { Butterfly } from './Butterfly';
import { BloomingLily, LilyCornerSprig, WaterLily } from './Lilies';
import { ArrowDown, Download, Mail } from 'lucide-react';

const ROTATING_ROLES = [
  'Software engineer',
  'Data builder',
  'Development professional',
];

export const Hero: React.FC = () => {
  const { settings } = usePortfolio();
  const { isGarden, isProfessional } = usePortfolioMode();
  const prefersReduced = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle rotating subtitle line every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROTATING_ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Slight parallax on portrait (Garden mode only, disabled in Pro & reduced motion)
  const { scrollY } = useScroll();
  const portraitParallaxY = useTransform(scrollY, [0, 500], [0, -28]);

  // Staggered line entrance variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isGarden ? 0.1 : 0.05,
        delayChildren: 0.05,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: {
      opacity: 0,
      y: isGarden && !prefersReduced ? 16 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isGarden && !prefersReduced ? 0.5 : 0.2,
      },
    },
  };

  // Button micro-interactions: subtle magnetic spring in garden mode; color change only in pro
  const buttonMotionProps = isGarden && !prefersReduced
    ? {
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.98 },
        transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
      }
    : {};

  const photoSrc =
    settings.photoUrl && !settings.photoUrl.endsWith('.jpg')
      ? settings.photoUrl
      : '/src/assets/images/swarnadyuti_portrait.webp';

  return (
    <section
      id="home"
      aria-label="Hero Introduction"
      className="relative pt-12 pb-20 md:py-24 overflow-hidden border-b border-border/40"
    >
      {/* Subtle corner decorative lily sprigs (Garden Mode only) */}
      {isGarden && (
        <>
          <div className="absolute top-0 right-0 hidden lg:block opacity-40 pointer-events-none">
            <LilyCornerSprig className="w-64 h-64" flipped />
          </div>
          <div className="absolute bottom-0 left-0 hidden lg:block opacity-35 pointer-events-none">
            <LilyCornerSprig className="w-56 h-56" />
          </div>
        </>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Staggered Line-by-Line Entrance */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start space-y-5"
          >
            {/* Line 1: Open-to Badge */}
            {settings.openToBadge && (
              <motion.div variants={lineVariants}>
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface-subtle border border-border text-xs sm:text-[13px] font-medium text-accent shadow-2xs ${
                    isGarden ? 'rounded-full' : 'rounded-lg'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
                  <span>{settings.openToBadge}</span>
                </div>
              </motion.div>
            )}

            {/* Line 2 & 3: Heading & Name */}
            <motion.div variants={lineVariants}>
              <p className="text-sm sm:text-base font-semibold uppercase tracking-wider text-accent/80 mb-1 font-sans">
                Hi, I'm
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-accent leading-[1.12]">
                {settings.heroTitle}
              </h1>
            </motion.div>

            {/* Line 4: Rotating Subtitle Line with Smooth Transition */}
            <motion.div
              variants={lineVariants}
              className="flex flex-wrap items-center gap-2 pt-1 pb-1"
            >
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted font-sans">
                Focus ·
              </span>
              <div className="relative h-8 min-w-[240px] sm:min-w-[280px] overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_ROLES[roleIndex]}
                    initial={{
                      opacity: 0,
                      y: isGarden && !prefersReduced ? 12 : 0,
                    }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: isGarden && !prefersReduced ? -12 : 0,
                    }}
                    transition={{
                      duration: isGarden && !prefersReduced ? 0.35 : 0.18,
                      ease: 'easeOut',
                    }}
                    className="font-display italic font-semibold text-accent text-xl sm:text-2xl tracking-wide inline-block"
                  >
                    "{ROTATING_ROLES[roleIndex]}"
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Line 5: Tagline (italic serif) */}
            <motion.p
              variants={lineVariants}
              className="font-display italic text-lg sm:text-xl text-accent/90 leading-snug max-w-xl"
            >
              "{settings.heroTagline}"
            </motion.p>

            {/* Line 6: Intro paragraph */}
            <motion.p
              variants={lineVariants}
              className="text-base sm:text-lg text-text/90 leading-relaxed max-w-xl font-sans"
            >
              {settings.heroIntro}
            </motion.p>

            {/* Line 7: Script quote in Garden, clean serif in Professional */}
            {settings.quote && (
              <motion.div variants={lineVariants} className="flex items-center gap-2 pt-0.5 pb-0.5">
                {isGarden ? (
                  <span className="font-script text-2xl sm:text-3xl text-accent font-semibold tracking-wide">
                    ~ "{settings.quote}"
                  </span>
                ) : (
                  <span className="font-display italic text-base sm:text-lg text-accent/80 font-medium">
                    "{settings.quote}"
                  </span>
                )}
              </motion.div>
            )}

            {/* Line 8: Action Buttons with micro-interactions */}
            <motion.div
              variants={lineVariants}
              className="flex flex-wrap items-center gap-3 pt-3"
            >
              <motion.a
                {...buttonMotionProps}
                href="#projects"
                className={`inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                  isGarden ? 'rounded-full' : 'rounded-lg'
                }`}
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </motion.a>

              {settings.techResumeUrl && (
                <motion.a
                  {...buttonMotionProps}
                  href={settings.techResumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 bg-surface-subtle hover:bg-surface border border-border text-accent font-medium text-sm transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-accent ${
                    isGarden ? 'rounded-full' : 'rounded-lg'
                  }`}
                >
                  <Download className="w-4 h-4 text-accent" />
                  <span>Tech Resume</span>
                </motion.a>
              )}

              {settings.devResumeUrl && (
                <motion.a
                  {...buttonMotionProps}
                  href={settings.devResumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 bg-surface-subtle hover:bg-surface border border-border text-accent font-medium text-sm transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-accent ${
                    isGarden ? 'rounded-full' : 'rounded-lg'
                  }`}
                >
                  <Download className="w-4 h-4 text-accent" />
                  <span>Dev Resume</span>
                </motion.a>
              )}

              <motion.a
                {...buttonMotionProps}
                href="#contact"
                className={`inline-flex items-center gap-2 px-4 py-2.5 bg-transparent hover:bg-surface-subtle text-accent font-medium text-sm transition-colors border border-transparent hover:border-border focus:outline-none focus:ring-2 focus:ring-accent ${
                  isGarden ? 'rounded-full' : 'rounded-lg'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column: Portrait Frame with Parallax in Garden mode */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* Garden-only Accents: Butterfly & Lilies */}
            {isGarden && (
              <>
                <div className="absolute -top-4 -right-2 sm:right-6 z-25">
                  <Butterfly size={34} animated={!prefersReduced} />
                </div>
                <div className="absolute -top-6 -left-6 z-20 pointer-events-none">
                  <BloomingLily className="w-20 h-20 drop-shadow-xs" />
                </div>
                <div className="absolute -bottom-6 -right-4 z-20 pointer-events-none">
                  <WaterLily className="w-20 h-20 drop-shadow-xs" />
                </div>
              </>
            )}

            {/* Photo Frame Container with optional slight parallax */}
            <motion.div
              style={isGarden && !prefersReduced ? { y: portraitParallaxY } : {}}
              className="will-change-transform"
            >
              {isGarden ? (
                /* Garden Mode: Arched Floral Frame */
                <div className="relative w-64 sm:w-72 md:w-80 h-84 sm:h-96 md:h-104 p-2 bg-surface-subtle rounded-t-full rounded-b-3xl border-2 border-border shadow-lg shadow-accent/5">
                  <div className="w-full h-full overflow-hidden rounded-t-full rounded-b-2xl bg-bg relative">
                    <img
                      src={photoSrc}
                      alt="Swarnadyuti Sarkar portrait"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-t-full rounded-b-2xl border border-border/30 pointer-events-none" />
                  </div>
                </div>
              ) : (
                /* Professional Mode: Plain rounded-xl portrait without floral arch (no parallax) */
                <div className="relative w-64 sm:w-72 md:w-80 aspect-[4/5] p-2 bg-surface rounded-2xl border border-border shadow-sm">
                  <div className="w-full h-full overflow-hidden rounded-xl bg-surface-subtle relative">
                    <img
                      src={photoSrc}
                      alt="Swarnadyuti Sarkar portrait"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-102"
                    />
                    <div className="absolute inset-0 rounded-xl border border-border/40 pointer-events-none" />
                  </div>
                </div>
              )}
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
