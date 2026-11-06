import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { usePortfolioMode } from '../context/ModeContext';
import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react';
import { LilyBadge } from './Lilies';

export const ContactCard: React.FC = () => {
  const { settings } = usePortfolio();
  const { isGarden } = usePortfolioMode();
  const prefersReduced = useReducedMotion();

  const buttonMotionProps = isGarden && !prefersReduced
    ? {
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.98 },
        transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
      }
    : {};

  return (
    <section
      id="contact"
      aria-label="Contact and Collaboration"
      className="py-16 md:py-24 relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Main Card with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: isGarden && !prefersReduced ? 24 : 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: isGarden && !prefersReduced ? 0.55 : 0.2, ease: 'easeOut' }}
          className={`bg-surface p-8 sm:p-10 md:p-12 border border-border shadow-sm relative overflow-hidden ${
            isGarden ? 'rounded-3xl' : 'rounded-xl'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-2">
                {isGarden && <LilyBadge styleName="blooming" className="w-7 h-7 text-rose" />}
                <span className="text-xs font-semibold uppercase tracking-widest text-accent/80 font-sans">
                  Get in Touch
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent tracking-tight">
                Let's Connect
              </h2>
              
              <p className="text-sm sm:text-base text-text/85 mt-2 font-sans leading-relaxed">
                Whether you're recruiting for software engineering, climate intelligence, or development-sector initiatives, I'd love to explore how we can collaborate.
              </p>

              {/* Location pin */}
              <div className="flex items-center gap-2 mt-4 text-xs font-medium text-accent font-sans">
                <MapPin className="w-4 h-4 shrink-0 text-accent" />
                <span className="text-muted">Based in Kolkata, India · Open to Remote &amp; Onsite Opportunities</span>
              </div>
            </div>

            {/* Direct Connect Actions */}
            <div className="flex flex-col gap-3.5 shrink-0 w-full sm:w-auto font-sans">
              
              {/* Primary Mailto Button with magnetic/hover micro-interaction */}
              <motion.a
                {...buttonMotionProps}
                href={`mailto:${settings.email}`}
                className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold text-sm transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                  isGarden ? 'rounded-full' : 'rounded-lg'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
                <Send className="w-3.5 h-3.5" />
              </motion.a>

              {/* LinkedIn Link */}
              {settings.linkedinUrl && (
                <motion.a
                  {...buttonMotionProps}
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-surface-subtle hover:bg-surface border border-border text-accent font-medium text-xs transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-accent ${
                    isGarden ? 'rounded-full' : 'rounded-lg'
                  }`}
                >
                  <Linkedin className="w-4 h-4 text-[#0077B5]" />
                  <span>linkedin.com/in/swarnadyuti-sarkar</span>
                </motion.a>
              )}

              {/* GitHub Link (Hidden if empty) */}
              {settings.githubUrl && (
                <motion.a
                  {...buttonMotionProps}
                  href={settings.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-surface-subtle hover:bg-surface border border-border text-accent font-medium text-xs transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-accent ${
                    isGarden ? 'rounded-full' : 'rounded-lg'
                  }`}
                >
                  <Github className="w-4 h-4" />
                  <span>github.com/swarnadyutisarkar</span>
                </motion.a>
              )}

              {/* Direct email label */}
              <p className="text-center text-xs text-muted font-mono pt-1">
                {settings.email}
              </p>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
