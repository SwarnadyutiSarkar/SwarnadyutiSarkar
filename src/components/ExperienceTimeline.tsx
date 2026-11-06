import React, { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
  type Variants,
} from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { usePortfolioMode } from '../context/ModeContext';
import { Experience, ExperienceCategory } from '../types/portfolio';
import { LilyBadge } from './Lilies';
import { ChevronDown, ChevronUp, ExternalLink, MapPin, Calendar, Award } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const { experience } = usePortfolio();
  const { isGarden } = usePortfolioMode();
  const prefersReduced = useReducedMotion();
  const [selectedFilter, setSelectedFilter] = useState<ExperienceCategory>('All');
  const [expandedId, setExpandedId] = useState<string | null>('exp-1');

  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ['start 85%', 'end 70%'],
  });
  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    restDelta: 0.001,
  });

  const filters: ExperienceCategory[] = ['All', 'Tech', 'Development'];

  const filteredExperience = experience.filter((exp) => {
    if (selectedFilter === 'All') return true;
    return exp.tags.includes(selectedFilter as 'Tech' | 'Development');
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

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

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: isGarden && !prefersReduced ? 24 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isGarden && !prefersReduced ? 0.5 : 0.2,
      },
    },
  };

  return (
    <section
      id="experience"
      aria-label="Professional Experience"
      className="py-16 md:py-24 relative border-b border-border/40"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {isGarden && <LilyBadge styleName="calla" className="w-7 h-7 text-rose" />}
              <span className="text-xs font-semibold uppercase tracking-widest text-accent/80 font-sans">
                {isGarden ? 'Career & UN Assignments' : 'Career History'}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent tracking-tight">
              Experience Timeline
            </h2>
            <p className="text-sm sm:text-base text-text/80 mt-1 max-w-xl font-sans">
              Combining software development, reporting automation, and international development coordination across the UN system.
            </p>
          </div>

          {/* Filter Chips: All / Tech / Development */}
          <div
            role="tablist"
            aria-label="Filter experience by domain"
            className={`flex items-center gap-1.5 p-1.5 bg-surface border border-border shadow-2xs self-start ${
              isGarden ? 'rounded-full' : 'rounded-lg'
            }`}
          >
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={selectedFilter === f}
                onClick={() => setSelectedFilter(f)}
                className={`px-4 py-1.5 text-xs sm:text-[13px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer ${
                  isGarden ? 'rounded-full' : 'rounded-md'
                } ${
                  selectedFilter === f
                    ? 'bg-accent text-white shadow-xs'
                    : 'text-text/80 hover:text-accent hover:bg-surface-subtle'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Stack with Animated Drawing Line */}
        <div ref={timelineContainerRef} className="space-y-6 relative">
          
          {/* Faint Background Guide Line */}
          <div className="absolute left-5 sm:left-7 top-6 bottom-8 w-[2px] bg-border/40 pointer-events-none rounded-full" />

          {/* Connecting Line Drawing on Scroll (both modes) */}
          <motion.div
            className="absolute left-5 sm:left-7 top-6 bottom-8 w-[2px] bg-accent origin-top pointer-events-none rounded-full will-change-transform z-0 shadow-2xs"
            style={{
              scaleY: prefersReduced ? 1 : lineScaleY,
            }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-6"
          >
            {filteredExperience.map((item) => {
              const isExpanded = expandedId === item.id;
              
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="relative pl-12 sm:pl-16 group transition-all"
                >
                  {/* Timeline node badge (Neutral badge, strictly NO official UN logos) */}
                  <div
                    className={`absolute left-1.5 sm:left-3.5 top-5 -translate-x-1/2 w-8 h-8 bg-surface border-2 border-border flex items-center justify-center shadow-xs z-10 ${
                      isGarden ? 'rounded-full' : 'rounded-md'
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 bg-accent transition-transform duration-200 group-hover:scale-125 ${
                        isGarden ? 'rounded-full' : 'rounded-xs'
                      }`}
                    />
                  </div>

                  {/* Experience Card */}
                  <div
                    className={`bg-surface p-5 sm:p-7 border transition-all ${
                      isGarden ? 'rounded-3xl' : 'rounded-xl'
                    } ${
                      isExpanded
                        ? 'border-accent shadow-sm'
                        : 'border-border hover:border-accent/80 shadow-2xs'
                    }`}
                  >
                    {/* Card Header & Headline */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        
                        {/* Badges & Meta */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-2.5 py-0.5 text-xs font-semibold bg-surface-subtle text-accent border border-border ${
                                isGarden ? 'rounded-full' : 'rounded'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}

                          {item.isVolunteer && (
                            <span
                              className={`px-2.5 py-0.5 text-xs font-semibold bg-surface-subtle text-accent border border-border flex items-center gap-1 ${
                                isGarden ? 'rounded-full' : 'rounded'
                              }`}
                            >
                              <Award className="w-3 h-3 text-accent" />
                              <span>Volunteer</span>
                            </span>
                          )}
                        </div>

                        {/* Role & Org */}
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-accent">
                          {item.role}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-text/85 mt-1 font-sans">
                          <span className="text-accent font-semibold">{item.organization}</span>
                          <span aria-hidden="true" className="text-border">·</span>
                          <span className="flex items-center gap-1 text-muted">
                            <MapPin className="w-3.5 h-3.5 text-accent" />
                            <span>{item.location}</span>
                          </span>
                          <span aria-hidden="true" className="text-border">·</span>
                          <span className="flex items-center gap-1 text-muted">
                            <Calendar className="w-3.5 h-3.5 text-accent" />
                            <span>{item.startDate} – {item.endDate}</span>
                          </span>
                        </div>

                        {/* ONE-LINE IMPACT HEADLINE (visible on card) */}
                        <p className="mt-3 text-sm sm:text-base font-semibold text-accent bg-surface-subtle px-3.5 py-2 rounded-xl border-l-4 border-accent font-sans">
                          {item.impactHeadline}
                        </p>

                      </div>

                      {/* Expand/Collapse Toggle Button with micro-interaction */}
                      <motion.button
                        whileHover={isGarden && !prefersReduced ? { scale: 1.04 } : {}}
                        whileTap={isGarden && !prefersReduced ? { scale: 0.96 } : {}}
                        type="button"
                        onClick={() => toggleExpand(item.id)}
                        className={`self-start inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-accent hover:bg-surface-subtle border border-border transition-colors focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer ${
                          isGarden ? 'rounded-full' : 'rounded-md'
                        }`}
                      >
                        <span>{isExpanded ? 'Hide Details' : 'View Bullets'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </motion.button>
                    </div>

                    {/* Expandable Bullets with AnimatePresence */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key="bullets"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div className="mt-5 pt-5 border-t border-border/60 space-y-4">
                            <ul className="space-y-2.5 text-sm sm:text-[15px] text-text font-sans leading-relaxed list-disc list-outside pl-5">
                              {item.bullets.map((bullet, bIdx) => (
                                <motion.li
                                  key={bIdx}
                                  initial={{ opacity: 0, x: isGarden && !prefersReduced ? -6 : 0 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: bIdx * 0.04,
                                    duration: 0.22,
                                    ease: 'easeOut',
                                  }}
                                  className="pl-1"
                                >
                                  {bullet}
                                </motion.li>
                              ))}
                            </ul>

                            {/* Optional Live link */}
                            {item.linkUrl && (
                              <div className="pt-2">
                                <motion.a
                                  whileHover={isGarden && !prefersReduced ? { scale: 1.03 } : {}}
                                  whileTap={isGarden && !prefersReduced ? { scale: 0.98 } : {}}
                                  href={item.linkUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white text-xs font-semibold transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-accent ${
                                    isGarden ? 'rounded-full' : 'rounded-lg'
                                  }`}
                                >
                                  <span>{item.linkText || 'Visit Managed Portal'}</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </motion.a>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
