import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { usePortfolioMode } from '../context/ModeContext';
import { GraduationCap, Award, Trophy } from 'lucide-react';
import { LilyBadge } from './Lilies';

export const CredentialsSection: React.FC = () => {
  const { education, certifications, achievements } = usePortfolio();
  const { isGarden } = usePortfolioMode();
  const prefersReduced = useReducedMotion();

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
      id="credentials"
      aria-label="Education, Certifications, and Achievements"
      className="py-16 md:py-24 relative border-b border-border/40"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-12"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-2">
              {isGarden && <LilyBadge styleName="stargazer" className="w-7 h-7 text-rose" />}
              <span className="text-xs font-semibold uppercase tracking-widest text-accent/80 font-sans">
                Credentials &amp; Recognition
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent tracking-tight">
              Education, Certifications &amp; Honours
            </h2>
            <p className="text-sm sm:text-base text-text/80 mt-1 font-sans">
              Rigorous technical training in Computer Science, combined with postgraduate research in political science, literature, and governance.
            </p>
          </motion.div>

          {/* 3 Readable Cards Side by Side on Desktop, Stacked on Mobile */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
          >
            {/* Card 1: Education */}
            <motion.div
              variants={itemVariants}
              className={`bg-surface p-6 sm:p-7 border border-border shadow-2xs flex flex-col justify-between ${
                isGarden ? 'rounded-3xl' : 'rounded-xl'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 pb-4 mb-5 border-b border-border/60">
                  <div
                    className={`p-2.5 bg-surface-subtle text-accent shrink-0 shadow-2xs ${
                      isGarden ? 'rounded-2xl' : 'rounded-lg'
                    }`}
                  >
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-accent">
                      Education
                    </h3>
                    <p className="text-xs text-muted font-sans">
                      Degrees &amp; Academic Training
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className={`p-3.5 bg-surface-inner border border-border transition-colors ${
                        isGarden ? 'rounded-2xl' : 'rounded-lg'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-display font-semibold text-[15px] text-accent">
                          {edu.degree}
                        </h4>
                        <span className="text-xs font-medium text-accent whitespace-nowrap font-sans">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-text/85 mt-0.5 font-sans">
                        {edu.institution}
                      </p>
                      {edu.details && (
                        <p className="text-xs text-muted mt-1.5 leading-relaxed font-sans">
                          {edu.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-border/40 text-xs text-muted font-sans">
                4 Academic Programs Completed / In Progress
              </div>
            </motion.div>

            {/* Card 2: Certifications */}
            <motion.div
              variants={itemVariants}
              className={`bg-surface p-6 sm:p-7 border border-border shadow-2xs flex flex-col justify-between ${
                isGarden ? 'rounded-3xl' : 'rounded-xl'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 pb-4 mb-5 border-b border-border/60">
                  <div
                    className={`p-2.5 bg-surface-subtle text-accent shrink-0 shadow-2xs ${
                      isGarden ? 'rounded-2xl' : 'rounded-lg'
                    }`}
                  >
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-accent">
                      Certifications
                    </h3>
                    <p className="text-xs text-muted font-sans">
                      Industry &amp; Multilateral Credentials
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className={`p-3 bg-surface-inner border border-border flex items-start justify-between gap-2 ${
                        isGarden ? 'rounded-2xl' : 'rounded-lg'
                      }`}
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-accent font-sans">
                          {cert.title}
                        </h4>
                        {cert.issuer && (
                          <p className="text-xs text-muted font-sans mt-0.5">
                            {cert.issuer}
                          </p>
                        )}
                      </div>
                      {cert.year && (
                        <span className="text-xs font-medium text-accent font-mono shrink-0">
                          {cert.year}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-border/40 text-xs text-muted font-sans">
                Verified Multilateral &amp; Technical Credentials
              </div>
            </motion.div>

            {/* Card 3: Achievements */}
            <motion.div
              variants={itemVariants}
              className={`bg-surface p-6 sm:p-7 border border-border shadow-2xs flex flex-col justify-between ${
                isGarden ? 'rounded-3xl' : 'rounded-xl'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 pb-4 mb-5 border-b border-border/60">
                  <div
                    className={`p-2.5 bg-surface-subtle text-accent shrink-0 shadow-2xs ${
                      isGarden ? 'rounded-2xl' : 'rounded-lg'
                    }`}
                  >
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-accent">
                      Achievements
                    </h3>
                    <p className="text-xs text-muted font-sans">
                      Hackathons, Fellowships &amp; Honours
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {achievements.map((ach) => (
                    <div
                      key={ach.id}
                      className={`p-3 bg-surface-inner border border-border ${
                        isGarden ? 'rounded-2xl' : 'rounded-lg'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-accent font-sans">
                          {ach.title}
                        </h4>
                        {ach.year && (
                          <span className="text-xs font-medium text-accent font-mono shrink-0">
                            {ach.year}
                          </span>
                        )}
                      </div>
                      {ach.organization && (
                        <p className="text-xs font-medium text-text/80 mt-0.5 font-sans">
                          {ach.organization}
                        </p>
                      )}
                      {ach.description && (
                        <p className="text-xs text-muted mt-1 font-sans leading-normal">
                          {ach.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-border/40 text-xs text-muted font-sans">
                National &amp; Multilateral Leadership Recognition
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
