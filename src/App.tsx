/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { CurtainIntro } from './components/CurtainIntro';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { ProjectsGarden } from './components/ProjectsGarden';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { CredentialsSection } from './components/CredentialsSection';
import { ContactCard } from './components/ContactCard';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { BorderVines } from './components/BorderVines';
import { ParallaxButterflies } from './components/ParallaxButterflies';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      const seen = sessionStorage.getItem('swarnadyuti_intro_seen');
      return seen !== 'true';
    } catch {
      return false;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Check URL hash or query for admin route
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      if (
        hash === '#admin' ||
        search.includes('admin=1') ||
        search.includes('admin=true') ||
        pathname === '/admin'
      ) {
        setIsAdminOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    return () => window.removeEventListener('hashchange', checkAdminRoute);
  }, []);

  // Lock scroll while intro overlay is active
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem('swarnadyuti_intro_seen', 'true');
    } catch (e) {
      console.warn('sessionStorage unavailable', e);
    }
    setShowIntro(false);
  };

  return (
    <PortfolioProvider>
      {/* Skip to Content for WCAG Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* 1. Entrance Curtain Reveal: Full-Screen Overlay with Two Birds Opening It */}
      {showIntro && <CurtainIntro onComplete={handleIntroComplete} />}

      {/* 2a. Fixed Left and Right Border Flower Vines with Scroll-Linked Shift */}
      <BorderVines />

      {/* 2b. Multi-Layered 3D Parallax Floating Butterflies behind text content */}
      <ParallaxButterflies />

      {/* Main Website App Shell (z-10 layer for crisp text & controls) */}
      <div
        className="min-h-screen flex flex-col bg-[#FBF4EF] text-[#2E2230] relative z-10"
        aria-hidden={showIntro}
      >
        <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

        <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
          {/* 1. Hero */}
          <Hero />

          {/* 2. About Me */}
          <About />

          {/* 3. Skills */}
          <Skills />

          {/* 4. Projects (Garden with Interactive Perched Birds flying away on hover) */}
          <ProjectsGarden />

          {/* 5. Experience Timeline */}
          <ExperienceTimeline />

          {/* 6, 7, 8. Credentials (Education, Certifications, Achievements) */}
          <CredentialsSection />

          {/* 9. Let's Connect */}
          <ContactCard />
        </main>

        {/* 10. Footer with Replay Curtain Reveal trigger */}
        <Footer
          onOpenAdmin={() => setIsAdminOpen(true)}
          onReplayIntro={() => setShowIntro(true)}
        />

        {/* Discreet Admin Modal with Google Sign-in */}
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => {
            setIsAdminOpen(false);
            if (window.location.hash === '#admin') {
              window.history.pushState(null, '', window.location.pathname);
            }
          }}
        />
      </div>
    </PortfolioProvider>
  );
}
