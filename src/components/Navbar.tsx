import React, { useState } from 'react';
import { LilyLogo } from './Lilies';
import { Github, Linkedin, Mail, Menu, X, Shield } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings, isAdmin } = usePortfolio();

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#credentials' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF4EF]/90 backdrop-blur-md border-b border-[#E8C5C8]/40 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark with small Lily */}
        <a
          href="#home"
          className="flex items-center gap-2.5 text-[#5B2A4A] hover:text-[#48203a] transition-colors shrink-0 group focus:outline-none focus:ring-2 focus:ring-[#5B2A4A] rounded-lg p-1"
        >
          <LilyLogo className="w-6 h-6 transition-transform group-hover:scale-110" />
          <span className="font-display font-bold text-lg md:text-xl tracking-tight">
            Swarnadyuti Sarkar
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-[#2E2230]/85"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#5B2A4A] transition-colors relative py-1 focus:outline-none focus:ring-2 focus:ring-[#5B2A4A] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Social Icons & Admin Lock */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {settings.githubUrl && (
            <a
              href={settings.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 text-[#5B2A4A] hover:bg-[#F5EAE9] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#5B2A4A]"
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
              className="p-2 text-[#5B2A4A] hover:bg-[#F5EAE9] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#5B2A4A]"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}

          <a
            href={`mailto:${settings.email}`}
            aria-label="Send Email"
            className="p-2 text-[#5B2A4A] hover:bg-[#F5EAE9] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#5B2A4A]"
          >
            <Mail className="w-4 h-4" />
          </a>

          {/* Admin badge / login button (discreet) */}
          <button
            type="button"
            onClick={onOpenAdmin}
            aria-label={isAdmin ? 'Admin Dashboard (Active)' : 'Owner Sign In'}
            title={isAdmin ? 'Logged in as Admin' : 'Admin'}
            className={`p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#5B2A4A] cursor-pointer ${
              isAdmin
                ? 'bg-[#5B2A4A] text-white shadow-xs'
                : 'text-[#5B2A4A]/50 hover:text-[#5B2A4A] hover:bg-[#F5EAE9]'
            }`}
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            className="lg:hidden p-2 text-[#5B2A4A] hover:bg-[#F5EAE9] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#5B2A4A]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E8C5C8] bg-[#FBF4EF] px-4 pt-3 pb-6 shadow-md transition-all">
          <nav className="flex flex-col gap-3 font-medium text-base text-[#2E2230]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="py-2 px-3 hover:bg-[#F5EAE9] hover:text-[#5B2A4A] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#E8C5C8]/60 flex items-center gap-4 px-3 text-sm text-[#5B2A4A]">
              <span>Kolkata, India</span>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="underline hover:text-[#48203a] cursor-pointer"
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
