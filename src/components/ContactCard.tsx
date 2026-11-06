import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Linkedin, Github, MapPin, Send, MessageSquare } from 'lucide-react';
import { LilyBadge } from './Lilies';

export const ContactCard: React.FC = () => {
  const { settings } = usePortfolio();

  return (
    <section
      id="contact"
      aria-label="Contact and Collaboration"
      className="py-16 md:py-24 relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Main Card */}
        <div className="bg-[#FAF0EA] rounded-3xl p-8 sm:p-10 md:p-12 border border-[#E8C5C8] shadow-sm relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-2">
                <LilyBadge styleName="blooming" className="w-7 h-7 text-[#D49B9E]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#5B2A4A]/80 font-sans">
                  Get in Touch
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#5B2A4A] tracking-tight">
                Let's Connect
              </h2>
              
              <p className="text-sm sm:text-base text-[#2E2230]/85 mt-2 font-sans leading-relaxed">
                Whether you're recruiting for software engineering, climate intelligence, or development-sector initiatives, I'd love to explore how we can collaborate.
              </p>

              {/* Location pin */}
              <div className="flex items-center gap-2 mt-4 text-xs font-medium text-[#748A6D] font-sans">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Based in Kolkata, India · Open to Remote &amp; Onsite Opportunities</span>
              </div>
            </div>

            {/* Direct Connect Actions */}
            <div className="flex flex-col gap-3.5 shrink-0 w-full sm:w-auto">
              
              {/* Primary Mailto Button */}
              <a
                href={`mailto:${settings.email}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#5B2A4A] hover:bg-[#48203a] text-white font-semibold text-sm transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-[#5B2A4A] focus:ring-offset-2"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
                <Send className="w-3.5 h-3.5" />
              </a>

              {/* LinkedIn Link */}
              {settings.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-[#FBF4EF] hover:bg-white border border-[#E8C5C8] text-[#5B2A4A] font-medium text-xs transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#5B2A4A]"
                >
                  <Linkedin className="w-4 h-4 text-[#0077B5]" />
                  <span>linkedin.com/in/swarnadyuti-sarkar</span>
                </a>
              )}

              {/* GitHub Link (Hidden if empty) */}
              {settings.githubUrl && (
                <a
                  href={settings.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-[#FBF4EF] hover:bg-white border border-[#E8C5C8] text-[#5B2A4A] font-medium text-xs transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#5B2A4A]"
                >
                  <Github className="w-4 h-4" />
                  <span>github.com/swarnadyutisarkar</span>
                </a>
              )}

              {/* Direct email label */}
              <p className="text-center text-xs text-[#2E2230]/65 font-mono pt-1">
                {settings.email}
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
