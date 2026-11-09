/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { ModeProvider, usePortfolioMode } from './context/ModeContext';
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
import { ScrollProgressStem } from './components/ScrollProgressStem';

function PortfolioApp() {
  const {
    isGarden,
    showCurtain,
    dismissCurtain,
    triggerCurtain,
    isAdminOpen,
    setIsAdminOpen,
  } = usePortfolioMode();

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
  }, [setIsAdminOpen]);

  // Lock scroll while intro curtain overlay is active
  useEffect(() => {
    if (showCurtain) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCurtain]);

  return (
    <>
      {/* Skip to Content for WCAG Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* 1. Entrance Curtain Reveal: Finches pulling flowery curtain when switching to Garden mode */}
      {showCurtain && <CurtainIntro onComplete={dismissCurtain} />}

      {/* 2a. Fixed Left and Right Border Flower Vines (Garden mode only) */}
      {isGarden && <BorderVines />}

      {/* 2b. Multi-Layered 3D Parallax Floating Butterflies (Garden mode only) */}
      {isGarden && <ParallaxButterflies />}

      {/* 2c. Growing Vine Progress Stem down Left Edge (Garden mode only) */}
      {isGarden && <ScrollProgressStem />}

      {/* Main Website App Shell (z-10 layer for crisp text & controls) */}
      <div
        className="min-h-screen flex flex-col bg-bg text-text relative z-10 transition-colors duration-150"
        aria-hidden={showCurtain}
      >
        <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

        <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
          {/* 1. Hero */}
          <Hero />

          {/* 2. About Me */}
          <About />

          {/* 3. Skills */}
          <Skills />

          {/* 4. Projects */}
          <ProjectsGarden />

          {/* 5. Experience Timeline */}
          <ExperienceTimeline />

          {/* 6, 7, 8. Credentials (Education, Certifications, Achievements) */}
          <CredentialsSection />

          {/* 9. Let's Connect */}
          <ContactCard />
        </main>

        {/* 10. Footer with Replay Curtain Reveal trigger in Garden mode */}
        <Footer
          onOpenAdmin={() => setIsAdminOpen(true)}
          onReplayIntro={() => {
            if (isGarden) {
              triggerCurtain();
            }
          }}
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
    </>
  );
}

export default function App() {
  return (
    <ModeProvider>
      <PortfolioProvider>
        <PortfolioApp />
      </PortfolioProvider>
    </ModeProvider>
  );
}
