import React, { useState, useEffect } from 'react';
import { LilyLogo } from './Lilies';
import { Github, Linkedin, Mail, Menu, X, Shield, Flower2, Briefcase } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { usePortfolioMode } from '../context/ModeContext';

import { motion } from 'motion/react';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { settings, isAdmin } = usePortfolio();
  const { mode, isGarden, isProfessional, setMode } = usePortfolioMode();

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Education', href: '#credentials', id: 'credentials' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Scroll listener for shrink, shadow, and scroll-spy active section
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);

          const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'credentials', 'contact'];
          const scrollPosition = window.scrollY + 130;

          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const el = document.getElementById(sectionIds[i]);
            if (el) {
              const top = el.offsetTop;
              if (scrollPosition >= top) {
                setActiveSection(sectionIds[i]);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-bg/95 backdrop-blur-md border-b border-border/60 transition-all duration-300 will-change-transform ${
        scrolled ? 'shadow-md border-border/80' : 'shadow-none'
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-4 transition-all duration-300 ${
          scrolled ? 'h-14' : 'h-16'
        }`}
      >
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          className="flex items-center gap-2.5 text-accent hover:text-accent-hover transition-colors shrink-0 group focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-1"
        >
          {isGarden ? (
            <LilyLogo className="w-6 h-6 transition-transform group-hover:scale-110" />
          ) : (
            <div className="w-6 h-6 rounded-md bg-accent text-white flex items-center justify-center font-display font-bold text-xs">
              S
            </div>
          )}
          <span className="font-display font-bold text-lg md:text-xl tracking-tight">
            Swarnadyuti Sarkar
          </span>
        </a>

        {/* Zone 2: Navigation Links with Scroll-Spy Highlight */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-text/85"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded ${
                  isActive ? 'text-accent font-semibold' : 'hover:text-accent text-text/80'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-accent ${
                      isGarden ? 'rounded-full' : 'rounded-none'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Mode Switch, Social Icons & Admin Lock */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Garden / Professional Mode Switch (Accessible & Visible on Mobile and Desktop) */}
          <div
            role="group"
            aria-label="Theme mode selection"
            className="inline-flex items-center p-0.5 rounded-full bg-surface-subtle border border-border shadow-2xs text-xs font-semibold"
          >
            <button
              type="button"
              onClick={() => setMode('garden')}
              aria-pressed={isGarden}
              aria-label="Switch to Garden theme"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent ${
                isGarden
                  ? 'bg-accent text-white shadow-xs'
                  : 'text-text/75 hover:text-accent'
              }`}
            >
              <Flower2 className={`w-3.5 h-3.5 ${isGarden ? 'text-white' : 'text-rose'}`} />
              <span className="hidden sm:inline">Garden</span>
            </button>

            <button
              type="button"
              onClick={() => setMode('professional')}
              aria-pressed={isProfessional}
              aria-label="Switch to Professional theme"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent ${
                isProfessional
                  ? 'bg-accent text-white shadow-xs'
                  : 'text-text/75 hover:text-accent'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pro</span>
            </button>
          </div>

          {settings.githubUrl && (
            <a
              href={settings.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 text-accent hover:bg-surface-subtle rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {settings.linkedinUrl && (
            <a
              href={settings.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 text-accent hover:bg-surface-subtle rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}

          <a
            href={`mailto:${settings.email}`}
            aria-label="Send Email"
            className="p-2 text-accent hover:bg-surface-subtle rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <Mail className="w-4 h-4" />
          </a>

          {/* Admin badge / login button (discreet) */}
          <button
            type="button"
            onClick={onOpenAdmin}
            aria-label={isAdmin ? 'Admin Dashboard (Active)' : 'Owner Sign In'}
            title={isAdmin ? 'Logged in as Admin' : 'Admin'}
            className={`p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer ${
              isAdmin
                ? 'bg-accent text-white shadow-xs'
                : 'text-accent/50 hover:text-accent hover:bg-surface-subtle'
            }`}
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            className="lg:hidden p-2 text-accent hover:bg-surface-subtle rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-bg px-4 pt-3 pb-6 shadow-md transition-all">
          <nav className="flex flex-col gap-2 font-medium text-base text-text">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="py-2 px-3 hover:bg-surface-subtle hover:text-accent rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-border/60 flex items-center justify-between px-3 text-sm text-accent">
              <span>Kolkata, India</span>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="underline hover:text-accent-hover cursor-pointer text-xs"
              >
                {isAdmin ? 'Admin Settings' : 'Admin'}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
