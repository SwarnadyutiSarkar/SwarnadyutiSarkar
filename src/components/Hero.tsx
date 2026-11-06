import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Butterfly } from './Butterfly';
import { BloomingLily, LilyCornerSprig, WaterLily } from './Lilies';
import { ArrowDown, Download, ExternalLink, Mail } from 'lucide-react';

export const Hero: React.FC = () => {
  const { settings } = usePortfolio();

  return (
    <section
      id="home"
      aria-label="Hero Introduction"
      className="relative pt-12 pb-20 md:py-24 overflow-hidden border-b border-[#E8C5C8]/30"
    >
      {/* Subtle corner decorative lily sprigs */}
      <div className="absolute top-0 right-0 hidden lg:block opacity-40 pointer-events-none">
        <LilyCornerSprig className="w-64 h-64" flipped />
      </div>
      <div className="absolute bottom-0 left-0 hidden lg:block opacity-35 pointer-events-none">
        <LilyCornerSprig className="w-56 h-56" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Details */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Open-to Pill Badge */}
            {settings.openToBadge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EAE9] border border-[#E8C5C8] text-xs sm:text-[13px] font-medium text-[#5B2A4A] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#748A6D]" aria-hidden="true" />
                <span>{settings.openToBadge}</span>
              </div>
            )}

            {/* Heading & Name */}
            <div>
              <p className="text-sm sm:text-base font-semibold uppercase tracking-wider text-[#5B2A4A]/80 mb-2">
                Hi, I'm
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#5B2A4A] leading-[1.12]">
                {settings.heroTitle}
              </h1>
            </div>

            {/* Tagline (italic serif) */}
            <p className="font-display italic text-xl sm:text-2xl text-[#5B2A4A]/90 leading-snug max-w-xl">
              "{settings.heroTagline}"
            </p>

            {/* Intro paragraph */}
            <p className="text-base sm:text-lg text-[#2E2230]/90 leading-relaxed max-w-xl font-sans">
              {settings.heroIntro}
            </p>

            {/* Script Quote */}
            {settings.quote && (
              <div className="flex items-center gap-2 pt-1 pb-1">
                <span className="font-script text-2xl sm:text-3xl text-[#5B2A4A] font-semibold tracking-wide">
                  ~ "{settings.quote}"
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5B2A4A] hover:bg-[#48203a] text-white font-medium text-sm transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-[#5B2A4A] focus:ring-offset-2"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              {settings.techResumeUrl && (
                <a
                  href={settings.techResumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F5EAE9] hover:bg-white border border-[#E8C5C8] text-[#5B2A4A] font-medium text-sm transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#5B2A4A]"
                >
                  <Download className="w-4 h-4 text-[#748A6D]" />
                  <span>Tech Resume</span>
                </a>
              )}

              {settings.devResumeUrl && (
                <a
                  href={settings.devResumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F5EAE9] hover:bg-white border border-[#E8C5C8] text-[#5B2A4A] font-medium text-sm transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#5B2A4A]"
                >
                  <Download className="w-4 h-4 text-[#748A6D]" />
                  <span>Dev Resume</span>
                </a>
              )}

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-transparent hover:bg-[#F5EAE9] text-[#5B2A4A] font-medium text-sm transition-colors border border-transparent hover:border-[#E8C5C8] focus:outline-none focus:ring-2 focus:ring-[#5B2A4A]"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </div>
          </div>

          {/* Right Column: Arched Photo Frame with Lilies & Animated Butterfly */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* ONE Gently Animated Butterfly hovering near top-right of portrait */}
            <div className="absolute -top-4 -right-2 sm:right-6 z-25">
              <Butterfly size={34} animated={true} />
            </div>

            {/* Botanical Floral Frame Accents */}
            <div className="absolute -top-6 -left-6 z-20 pointer-events-none">
              <BloomingLily className="w-20 h-20 drop-shadow-xs" />
            </div>
            <div className="absolute -bottom-6 -right-4 z-20 pointer-events-none">
              <WaterLily className="w-20 h-20 drop-shadow-xs" />
            </div>

            {/* The Arched Photo Frame */}
            <div className="relative w-64 sm:w-72 md:w-80 h-84 sm:h-96 md:h-104 p-2 bg-[#F5EAE9] rounded-t-full rounded-b-3xl border-2 border-[#D49B9E] shadow-lg shadow-[#5B2A4A]/5">
              <div className="w-full h-full overflow-hidden rounded-t-full rounded-b-2xl bg-[#FBF4EF] relative">
                {settings.photoUrl ? (
                  <img
                    src={settings.photoUrl}
                    alt="Swarnadyuti Sarkar portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#F5EAE9] to-[#FAF0EA]">
                    <BloomingLily className="w-16 h-16 mb-3 text-[#D49B9E]" />
                    <span className="font-display font-semibold text-lg text-[#5B2A4A]">
                      Swarnadyuti Sarkar
                    </span>
                    <span className="text-xs text-[#2E2230]/70 mt-1">
                      Kolkata, India
                    </span>
                  </div>
                )}

                {/* Subtle soft gradient rim */}
                <div className="absolute inset-0 rounded-t-full rounded-b-2xl border border-[#D49B9E]/30 pointer-events-none" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
