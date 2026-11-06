import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { usePortfolioMode } from '../context/ModeContext';
import { LilyBadge } from './Lilies';
import { Languages } from 'lucide-react';

export const Skills: React.FC = () => {
  const { skills, settings } = usePortfolio();
  const { isGarden } = usePortfolioMode();
  const prefersReduced = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isGarden ? 0.08 : 0.04,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: isGarden && !prefersReduced ? 20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isGarden && !prefersReduced ? 0.45 : 0.2,
      },
    },
  };

  return (
    <section
      id="skills"
      aria-label="Technical and Professional Skills"
      className="py-16 md:py-24 relative border-b border-border/40"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-8"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            {isGarden && <LilyBadge styleName="tiger" className="w-8 h-8 text-rose" />}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent/80 font-sans block mb-1">
                Domain Stack
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent tracking-tight">
                Skills &amp; Competencies
              </h2>
              <p className="text-sm text-muted mt-1 font-sans">
                Organized domain clusters spanning engineering, analytics, AI, and international development
              </p>
            </div>
          </motion.div>

          {/* Grouped Skills Grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((group) => (
              <motion.div
                key={group.id}
                variants={itemVariants}
                className={`bg-surface p-5 border border-border shadow-2xs hover:shadow-xs transition-shadow flex flex-col ${
                  isGarden ? 'rounded-2xl' : 'rounded-lg'
                }`}
              >
                <h3 className="font-display font-semibold text-base text-accent pb-3 mb-3 border-b border-border/60 flex items-center justify-between">
                  <span>{group.category}</span>
                  <span className="text-xs font-sans font-normal text-muted">
                    {group.items.length} items
                  </span>
                </h3>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className={`inline-block px-3 py-1 text-[13px] font-medium bg-surface-subtle text-text border border-border shadow-2xs ${
                        isGarden ? 'rounded-full' : 'rounded-md'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Languages Spoken line */}
          {settings.spokenLanguages && (
            <motion.div
              variants={itemVariants}
              className={`p-4 bg-surface-subtle border border-border flex items-center gap-3 text-sm text-text ${
                isGarden ? 'rounded-2xl' : 'rounded-lg'
              }`}
            >
              <div
                className={`p-2 bg-surface text-accent shrink-0 shadow-2xs border border-border/50 ${
                  isGarden ? 'rounded-xl' : 'rounded-md'
                }`}
              >
                <Languages className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-accent">Languages spoken: </span>
                <span className="text-text">{settings.spokenLanguages}</span>
              </div>
            </motion.div>
          )}
        </motion.div>

      </div>
    </section>
  );
};
