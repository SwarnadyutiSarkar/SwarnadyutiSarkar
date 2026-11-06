import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { LilyBadge } from './Lilies';
import { Languages } from 'lucide-react';

export const Skills: React.FC = () => {
  const { skills, settings } = usePortfolio();

  return (
    <section
      id="skills"
      aria-label="Technical and Professional Skills"
      className="py-16 md:py-20 relative border-b border-[#E8C5C8]/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <LilyBadge styleName="tiger" className="w-8 h-8 text-[#D49B9E]" />
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#5B2A4A] tracking-tight">
              Skills &amp; Competencies
            </h2>
            <p className="text-sm text-[#2E2230]/75 mt-0.5 font-sans">
              Organized domain clusters spanning engineering, analytics, AI, and international development
            </p>
          </div>
        </div>

        {/* Grouped Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group) => (
            <div
              key={group.id}
              className="bg-[#FAF0EA] rounded-2xl p-5 border border-[#E8C5C8]/60 shadow-2xs hover:shadow-xs transition-shadow flex flex-col"
            >
              <h3 className="font-display font-semibold text-base text-[#5B2A4A] pb-3 mb-3 border-b border-[#E8C5C8]/50 flex items-center justify-between">
                <span>{group.category}</span>
                <span className="text-xs font-sans font-normal text-[#2E2230]/60">
                  {group.items.length} items
                </span>
              </h3>

              <div className="flex flex-wrap gap-2 mt-auto">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block px-3 py-1 rounded-full text-[13px] font-medium bg-[#FBF4EF] text-[#2E2230] border border-[#E8C5C8] shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Languages Spoken line */}
        {settings.spokenLanguages && (
          <div className="mt-8 p-4 rounded-2xl bg-[#EFF3ED] border border-[#748A6D]/30 flex items-center gap-3 text-sm text-[#2E2230]">
            <div className="p-2 rounded-xl bg-white text-[#748A6D] shrink-0 shadow-2xs">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-[#5B2A4A]">Languages spoken: </span>
              <span className="text-[#2E2230]">{settings.spokenLanguages}</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
