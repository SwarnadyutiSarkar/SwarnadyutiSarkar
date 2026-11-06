import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Experience, ExperienceCategory } from '../types/portfolio';
import { LilyBadge } from './Lilies';
import { ChevronDown, ChevronUp, ExternalLink, MapPin, Calendar, Briefcase, Award } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const { experience } = usePortfolio();
  const [selectedFilter, setSelectedFilter] = useState<ExperienceCategory>('All');
  const [expandedId, setExpandedId] = useState<string | null>('exp-1'); // Default expand role a for immediate impact

  const filters: ExperienceCategory[] = ['All', 'Tech', 'Development'];

  const filteredExperience = experience.filter((exp) => {
    if (selectedFilter === 'All') return true;
    return exp.tags.includes(selectedFilter as 'Tech' | 'Development');
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="experience"
      aria-label="Professional Experience"
      className="py-16 md:py-24 relative border-b border-[#E8C5C8]/30"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <LilyBadge styleName="calla" className="w-7 h-7 text-[#D49B9E]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#5B2A4A]/80 font-sans">
                Career &amp; UN Assignments
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#5B2A4A] tracking-tight">
              Experience Timeline
            </h2>
            <p className="text-sm sm:text-base text-[#2E2230]/80 mt-1 max-w-xl font-sans">
              Combining software development, reporting automation, and international development coordination across the UN system.
            </p>
          </div>

          {/* Filter Chips: All / Tech / Development */}
          <div
            role="tablist"
            aria-label="Filter experience by domain"
            className="flex items-center gap-1.5 p-1.5 bg-[#FAF0EA] rounded-full border border-[#E8C5C8]/70 shadow-2xs self-start"
          >
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={selectedFilter === f}
                onClick={() => setSelectedFilter(f)}
                className={`px-4 py-1.5 text-xs sm:text-[13px] font-medium rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#5B2A4A] cursor-pointer ${
                  selectedFilter === f
                    ? 'bg-[#5B2A4A] text-white shadow-xs'
                    : 'text-[#2E2230]/80 hover:text-[#5B2A4A] hover:bg-[#F5EAE9]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 sm:before:left-7 before:w-0.5 before:bg-[#E8C5C8]/60 before:pointer-events-none">
          {filteredExperience.map((item) => {
            const isExpanded = expandedId === item.id;
            
            return (
              <div
                key={item.id}
                className="relative pl-12 sm:pl-16 group transition-all"
              >
                {/* Timeline node badge (Neutral small lily badge, strictly NO official UN logos) */}
                <div className="absolute left-1.5 sm:left-3.5 top-5 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FAF0EA] border-2 border-[#D49B9E] flex items-center justify-center shadow-xs z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#5B2A4A]" />
                </div>

                {/* Experience Card */}
                <div
                  className={`bg-[#FAF0EA] rounded-3xl p-5 sm:p-7 border transition-all ${
                    isExpanded
                      ? 'border-[#D49B9E] shadow-sm'
                      : 'border-[#E8C5C8]/70 hover:border-[#D49B9E]/80 shadow-2xs'
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
                            className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#F5EAE9] text-[#5B2A4A] border border-[#E8C5C8]"
                          >
                            {tag}
                          </span>
                        ))}

                        {item.isVolunteer && (
                          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#EFF3ED] text-[#748A6D] border border-[#748A6D]/30 flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            <span>Volunteer</span>
                          </span>
                        )}
                      </div>

                      {/* Role & Org */}
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[#5B2A4A]">
                        {item.role}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-[#2E2230]/85 mt-1 font-sans">
                        <span className="text-[#5B2A4A] font-semibold">{item.organization}</span>
                        <span aria-hidden="true" className="text-[#D49B9E]">·</span>
                        <span className="flex items-center gap-1 text-[#2E2230]/75">
                          <MapPin className="w-3.5 h-3.5 text-[#748A6D]" />
                          <span>{item.location}</span>
                        </span>
                        <span aria-hidden="true" className="text-[#D49B9E]">·</span>
                        <span className="flex items-center gap-1 text-[#2E2230]/75">
                          <Calendar className="w-3.5 h-3.5 text-[#748A6D]" />
                          <span>{item.startDate} – {item.endDate}</span>
                        </span>
                      </div>

                      {/* ONE-LINE IMPACT HEADLINE (visible on card) */}
                      <p className="mt-3 text-sm sm:text-base font-semibold text-[#5B2A4A] bg-[#F5EAE9]/80 px-3.5 py-2 rounded-xl border-l-4 border-[#5B2A4A] font-sans">
                        {item.impactHeadline}
                      </p>

                    </div>

                    {/* Expand/Collapse Toggle Button */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(item.id)}
                      className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#5B2A4A] hover:bg-[#F5EAE9] border border-[#E8C5C8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5B2A4A] cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Bullets'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Expandable Bullets & Links */}
                  {isExpanded && (
                    <div className="mt-5 pt-5 border-t border-[#E8C5C8]/60 space-y-4 animate-in fade-in duration-200">
                      <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#2E2230] font-sans leading-relaxed list-disc list-outside pl-5">
                        {item.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="pl-1">
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {/* Optional Live link (e.g. UN ESCAP WE COM website) */}
                      {item.linkUrl && (
                        <div className="pt-2">
                          <a
                            href={item.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5B2A4A] hover:bg-[#48203a] text-white text-xs font-semibold transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#5B2A4A]"
                          >
                            <span>{item.linkText || 'Visit Managed Portal'}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
