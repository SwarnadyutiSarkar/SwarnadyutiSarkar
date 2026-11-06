import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, Award, Trophy } from 'lucide-react';
import { LilyBadge } from './Lilies';

export const CredentialsSection: React.FC = () => {
  const { education, certifications, achievements } = usePortfolio();

  return (
    <section
      id="credentials"
      aria-label="Education, Certifications, and Achievements"
      className="py-16 md:py-24 relative border-b border-[#E8C5C8]/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <LilyBadge styleName="stargazer" className="w-7 h-7 text-[#D49B9E]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#5B2A4A]/80 font-sans">
              Credentials &amp; Recognition
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#5B2A4A] tracking-tight">
            Education, Certifications &amp; Honours
          </h2>
          <p className="text-sm sm:text-base text-[#2E2230]/80 mt-1 font-sans">
            Rigorous technical training in Computer Science, combined with postgraduate research in political science, literature, and governance.
          </p>
        </div>

        {/* 3 Readable Cards Side by Side on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Education */}
          <div className="bg-[#FAF0EA] rounded-3xl p-6 sm:p-7 border border-[#E8C5C8]/70 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-4 mb-5 border-b border-[#E8C5C8]/60">
                <div className="p-2.5 rounded-2xl bg-[#F5EAE9] text-[#5B2A4A] shrink-0 shadow-2xs">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-[#5B2A4A]">
                    Education
                  </h3>
                  <p className="text-xs text-[#2E2230]/70 font-sans">
                    Degrees &amp; Academic Training
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-3.5 rounded-2xl bg-[#FBF4EF] border border-[#E8C5C8]/60 transition-colors"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-display font-semibold text-[15px] text-[#5B2A4A]">
                        {edu.degree}
                      </h4>
                      <span className="text-xs font-medium text-[#748A6D] whitespace-nowrap font-sans">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#2E2230]/85 mt-0.5 font-sans">
                      {edu.institution}
                    </p>
                    {edu.details && (
                      <p className="text-xs text-[#2E2230]/75 mt-1.5 leading-relaxed font-sans">
                        {edu.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-[#E8C5C8]/40 text-xs text-[#2E2230]/65 font-sans">
              4 Academic Programs Completed / In Progress
            </div>
          </div>

          {/* Card 2: Certifications */}
          <div className="bg-[#FAF0EA] rounded-3xl p-6 sm:p-7 border border-[#E8C5C8]/70 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-4 mb-5 border-b border-[#E8C5C8]/60">
                <div className="p-2.5 rounded-2xl bg-[#EFF3ED] text-[#748A6D] shrink-0 shadow-2xs">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-[#5B2A4A]">
                    Certifications
                  </h3>
                  <p className="text-xs text-[#2E2230]/70 font-sans">
                    Industry &amp; Scientific Credentials
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3.5 rounded-2xl bg-[#FBF4EF] border border-[#E8C5C8]/60 flex items-start gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#748A6D] mt-1.5 shrink-0" />
                    <div>
                      <h4 className="font-display font-semibold text-[14px] text-[#5B2A4A] leading-snug">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-[#2E2230]/80 mt-0.5 font-sans">
                        {cert.issuer} {cert.year ? `· ${cert.year}` : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-[#E8C5C8]/40 text-xs text-[#2E2230]/65 font-sans">
              Specialized in Data Analytics &amp; Geospatial AI/ML
            </div>
          </div>

          {/* Card 3: Achievements */}
          <div className="bg-[#FAF0EA] rounded-3xl p-6 sm:p-7 border border-[#E8C5C8]/70 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-4 mb-5 border-b border-[#E8C5C8]/60">
                <div className="p-2.5 rounded-2xl bg-[#F5EAE9] text-[#5B2A4A] shrink-0 shadow-2xs">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-[#5B2A4A]">
                    Achievements
                  </h3>
                  <p className="text-xs text-[#2E2230]/70 font-sans">
                    National Prizes &amp; Publications
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-4 rounded-2xl bg-[#FBF4EF] border border-[#E8C5C8]/60"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-display font-semibold text-[15px] text-[#5B2A4A]">
                        {ach.title}
                      </h4>
                      {ach.year && (
                        <span className="text-[11px] font-semibold text-[#748A6D] bg-[#EFF3ED] px-2 py-0.5 rounded-full whitespace-nowrap font-sans">
                          {ach.year}
                        </span>
                      )}
                    </div>

                    {ach.organization && (
                      <p className="text-xs font-medium text-[#2E2230]/80 mt-1 font-sans">
                        {ach.organization}
                      </p>
                    )}

                    {ach.description && (
                      <p className="text-xs text-[#2E2230]/80 mt-2 leading-relaxed font-sans">
                        {ach.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-[#E8C5C8]/40 text-xs text-[#2E2230]/65 font-sans">
              Recognised by Government of India &amp; Premier Institutions
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
