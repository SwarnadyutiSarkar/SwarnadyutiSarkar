import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, Globe, Code2, Users, HeartHandshake } from 'lucide-react';
import { LilyBadge } from './Lilies';

export const About: React.FC = () => {
  const { settings } = usePortfolio();

  return (
    <section
      id="about"
      aria-label="About Me"
      className="py-16 md:py-20 relative border-b border-[#E8C5C8]/30"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <LilyBadge styleName="blooming" className="w-8 h-8 text-[#D49B9E]" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#5B2A4A] tracking-tight">
            About Me
          </h2>
        </div>

        {/* Content Card */}
        <div className="bg-[#FAF0EA] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E8C5C8]/70 shadow-sm relative overflow-hidden">
          
          <div className="prose prose-lg max-w-none text-[#2E2230] leading-relaxed font-sans text-base sm:text-lg mb-8">
            <p className="mb-4">
              {settings.aboutText}
            </p>
          </div>

          {/* Core Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8C5C8]/50">
            
            <div className="p-4 rounded-2xl bg-[#FBF4EF] border border-[#E8C5C8]/50 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#F5EAE9] text-[#5B2A4A] shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm text-[#5B2A4A] mb-1">
                  Full-Stack &amp; AI
                </h3>
                <p className="text-xs text-[#2E2230]/80 leading-normal">
                  React, Node, Python, and LLM APIs built for reliable decision support.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FBF4EF] border border-[#E8C5C8]/50 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#EFF3ED] text-[#748A6D] shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm text-[#5B2A4A] mb-1">
                  Climate &amp; SDG Data
                </h3>
                <p className="text-xs text-[#2E2230]/80 leading-normal">
                  Geospatial models, drought monitors, and SDG reporting automation.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FBF4EF] border border-[#E8C5C8]/50 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#F5EAE9] text-[#5B2A4A] shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm text-[#5B2A4A] mb-1">
                  UN &amp; Development
                </h3>
                <p className="text-xs text-[#2E2230]/80 leading-normal">
                  ESCAP, UNDP, UNOSSC, and UNV programme coordination &amp; advocacy.
                </p>
              </div>
            </div>

          </div>

          {/* Learn More link scrolling to experience */}
          <div className="mt-8 flex justify-end">
            <a
              href="#experience"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5B2A4A] hover:text-[#48203a] group focus:outline-none focus:ring-2 focus:ring-[#5B2A4A] rounded-lg px-2 py-1"
            >
              <span>Learn more in my Experience timeline</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
