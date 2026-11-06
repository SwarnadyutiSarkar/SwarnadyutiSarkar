import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { usePortfolioMode } from '../context/ModeContext';
import { ArrowRight, Globe, Code2, HeartHandshake, Layers, MapPin, Award } from 'lucide-react';
import { LilyBadge } from './Lilies';

export const About: React.FC = () => {
  const { settings } = usePortfolio();
  const { isGarden } = usePortfolioMode();
  const prefersReduced = useReducedMotion();

  // Scroll reveal variants: Garden gets slide + fade with stagger; Pro gets simple fade
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isGarden ? 0.12 : 0.06,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: isGarden && !prefersReduced ? 24 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isGarden && !prefersReduced ? 0.55 : 0.2,
      },
    },
  };

  const stats = [
    {
      value: settings.statProjectsCount || '8',
      label: 'Projects',
      desc: 'Full-stack & climate tools',
    },
    {
      value: settings.statCountriesTracked || '194',
      label: 'Countries tracked',
      sub: '(AralWatch)',
      desc: 'Global environmental monitor',
    },
    {
      value: settings.statCaseStudies || '30',
      label: 'Case studies',
      desc: 'South-South cooperation & SDGs',
    },
    {
      value: settings.statUNEntities || '5',
      label: 'UN entities',
      desc: 'ESCAP, UNDP, UNOSSC, UNV',
    },
  ];

  return (
    <section
      id="about"
      aria-label="About Me"
      className="py-16 md:py-24 relative border-b border-border/40"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-8"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            {isGarden && <LilyBadge styleName="blooming" className="w-8 h-8 text-rose" />}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent/80 font-sans block mb-1">
                Background &amp; Philosophy
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent tracking-tight">
                About Me
              </h2>
            </div>
          </motion.div>

          {/* Main Bio Card */}
          <motion.div
            variants={itemVariants}
            className={`bg-surface p-6 sm:p-8 md:p-10 border border-border shadow-sm relative overflow-hidden transition-all ${
              isGarden ? 'rounded-3xl' : 'rounded-xl'
            }`}
          >
            <div className="prose prose-lg max-w-none text-text leading-relaxed font-sans text-base sm:text-lg mb-8">
              <p className="mb-4">{settings.aboutText}</p>
            </div>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/60">
              <div
                className={`p-4 bg-surface-inner border border-border flex items-start gap-3 ${
                  isGarden ? 'rounded-2xl' : 'rounded-lg'
                }`}
              >
                <div
                  className={`p-2.5 bg-surface-subtle text-accent shrink-0 ${
                    isGarden ? 'rounded-xl' : 'rounded-md'
                  }`}
                >
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-accent mb-1">
                    Full-Stack &amp; AI
                  </h3>
                  <p className="text-xs text-text/80 leading-normal font-sans">
                    React, Node, Python, and LLM APIs built for reliable decision support.
                  </p>
                </div>
              </div>

              <div
                className={`p-4 bg-surface-inner border border-border flex items-start gap-3 ${
                  isGarden ? 'rounded-2xl' : 'rounded-lg'
                }`}
              >
                <div
                  className={`p-2.5 bg-surface-subtle text-accent shrink-0 ${
                    isGarden ? 'rounded-xl' : 'rounded-md'
                  }`}
                >
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-accent mb-1">
                    Climate &amp; SDG Data
                  </h3>
                  <p className="text-xs text-text/80 leading-normal font-sans">
                    Geospatial models, drought monitors, and SDG reporting automation.
                  </p>
                </div>
              </div>

              <div
                className={`p-4 bg-surface-inner border border-border flex items-start gap-3 ${
                  isGarden ? 'rounded-2xl' : 'rounded-lg'
                }`}
              >
                <div
                  className={`p-2.5 bg-surface-subtle text-accent shrink-0 ${
                    isGarden ? 'rounded-xl' : 'rounded-md'
                  }`}
                >
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-accent mb-1">
                    UN &amp; Development
                  </h3>
                  <p className="text-xs text-text/80 leading-normal font-sans">
                    ESCAP, UNDP, UNOSSC, and UNV programme coordination &amp; advocacy.
                  </p>
                </div>
              </div>
            </div>

            {/* Learn More link scrolling to experience */}
            <div className="mt-8 flex justify-end">
              <a
                href="#experience"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover group focus:outline-none focus:ring-2 focus:ring-accent rounded-lg px-2 py-1"
              >
                <span>Learn more in my Experience timeline</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          {/* Stats Strip under About section */}
          <motion.div
            variants={itemVariants}
            className={`p-6 sm:p-8 bg-surface-subtle border border-border/80 shadow-2xs ${
              isGarden ? 'rounded-3xl' : 'rounded-xl'
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                    i > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''
                  }`}
                >
                  <div className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-accent tracking-tight leading-none mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-text/90 font-sans">
                    {stat.label}{' '}
                    {stat.sub && (
                      <span className="text-xs text-muted font-normal block sm:inline">
                        {stat.sub}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted font-sans mt-0.5 line-clamp-1">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
