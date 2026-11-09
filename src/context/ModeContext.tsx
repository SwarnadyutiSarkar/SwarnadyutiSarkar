import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

export type PortfolioMode = 'garden' | 'professional';

interface ModeContextType {
  mode: PortfolioMode;
  isGarden: boolean;
  isProfessional: boolean;
  toggleMode: () => void;
  setMode: (mode: PortfolioMode, triggeredByUser?: boolean) => void;
  // Curtain Intro state
  showCurtain: boolean;
  triggerCurtain: () => void;
  dismissCurtain: () => void;
  // Discovery Popup state
  showDiscoveryPopup: boolean;
  dismissDiscoveryPopup: () => void;
  hasUserManuallyToggled: boolean;
  // Modal tracking
  isDetailModalOpen: boolean;
  setIsDetailModalOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
}

const ModeContext = createContext<ModeContextType | null>(null);

function getInitialMode(): PortfolioMode {
  // 1. URL search param check (?mode=pro / ?mode=professional / ?mode=garden)
  try {
    const params = new URLSearchParams(window.location.search);
    const m = params.get('mode')?.toLowerCase();
    if (m === 'pro' || m === 'professional') {
      return 'professional';
    }
    if (m === 'garden') {
      return 'garden';
    }
  } catch {
    // ignore
  }

  // 2. Local storage check
  try {
    const saved = localStorage.getItem('portfolio_mode');
    if (saved === 'professional' || saved === 'garden') {
      return saved as PortfolioMode;
    }
  } catch {
    // ignore
  }

  // 3. Default to professional
  return 'professional';
}

function getInitialCurtainState(initialMode: PortfolioMode): boolean {
  // Only play curtain on initial load if ?mode=garden was explicitly in URL and not seen this session
  try {
    const params = new URLSearchParams(window.location.search);
    const m = params.get('mode')?.toLowerCase();
    const seen = sessionStorage.getItem('swarnadyuti_garden_curtain_seen');
    if (m === 'garden' && seen !== 'true' && initialMode === 'garden') {
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialMode = getInitialMode();
  const [mode, setModeState] = useState<PortfolioMode>(initialMode);
  const [showCurtain, setShowCurtain] = useState<boolean>(() => getInitialCurtainState(initialMode));
  const [showDiscoveryPopup, setShowDiscoveryPopup] = useState<boolean>(false);
  const [hasUserManuallyToggled, setHasUserManuallyToggled] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('swarnadyuti_user_toggled_mode') === 'true';
    } catch {
      return false;
    }
  });

  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Refs for callbacks/timers to avoid stale closures
  const isDetailModalOpenRef = useRef(isDetailModalOpen);
  isDetailModalOpenRef.current = isDetailModalOpen;

  const isAdminOpenRef = useRef(isAdminOpen);
  isAdminOpenRef.current = isAdminOpen;

  const hasUserManuallyToggledRef = useRef(hasUserManuallyToggled);
  hasUserManuallyToggledRef.current = hasUserManuallyToggled;

  const modeRef = useRef(mode);
  modeRef.current = mode;

  // Apply data-theme to <html> on initial mount and change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const dismissCurtain = () => {
    try {
      sessionStorage.setItem('swarnadyuti_garden_curtain_seen', 'true');
    } catch (e) {
      console.warn('sessionStorage unavailable', e);
    }
    setShowCurtain(false);
  };

  const triggerCurtain = () => {
    setShowCurtain(true);
  };

  const dismissDiscoveryPopup = () => {
    try {
      sessionStorage.setItem('swarnadyuti_discovery_dismissed', 'true');
    } catch (e) {
      console.warn('sessionStorage unavailable', e);
    }
    setShowDiscoveryPopup(false);
  };

  const setMode = (newMode: PortfolioMode, triggeredByUser = true) => {
    const prevMode = modeRef.current;

    if (triggeredByUser) {
      setHasUserManuallyToggled(true);
      try {
        sessionStorage.setItem('swarnadyuti_user_toggled_mode', 'true');
      } catch (e) {
        console.warn('sessionStorage unavailable', e);
      }
      // If popup was visible, dismiss it
      setShowDiscoveryPopup(false);
    }

    const applyMode = () => {
      setModeState(newMode);
      document.documentElement.setAttribute('data-theme', newMode);

      // Persist in localStorage
      try {
        localStorage.setItem('portfolio_mode', newMode);
      } catch (e) {
        console.warn('localStorage error', e);
      }

      // Update URL search parameter without reloading
      try {
        const url = new URL(window.location.href);
        if (newMode === 'professional') {
          url.searchParams.set('mode', 'pro');
        } else {
          url.searchParams.delete('mode');
        }
        window.history.replaceState({}, '', url.toString());
      } catch (e) {
        console.warn('history.replaceState error', e);
      }

      // If switching TO garden mode: play curtain intro if not seen this session
      if (prevMode !== 'garden' && newMode === 'garden') {
        try {
          const seen = sessionStorage.getItem('swarnadyuti_garden_curtain_seen');
          if (seen !== 'true') {
            setShowCurtain(true);
          }
        } catch {
          setShowCurtain(true);
        }
      }
    };

    // Use View Transitions API if supported
    if (
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      typeof (document as any).startViewTransition === 'function'
    ) {
      (document as any).startViewTransition(() => {
        applyMode();
      });
    } else {
      applyMode();
    }
  };

  const toggleMode = () => {
    setMode(mode === 'garden' ? 'professional' : 'garden', true);
  };

  // Discovery Popup trigger logic (in professional mode only)
  useEffect(() => {
    if (mode !== 'professional') {
      setShowDiscoveryPopup(false);
      return;
    }

    // Check pre-conditions for showing discovery popup
    const checkCanShowPopup = (): boolean => {
      if (modeRef.current !== 'professional') return false;
      if (hasUserManuallyToggledRef.current) return false;
      if (isDetailModalOpenRef.current || isAdminOpenRef.current) return false;

      try {
        if (sessionStorage.getItem('swarnadyuti_discovery_dismissed') === 'true') {
          return false;
        }
        if (sessionStorage.getItem('swarnadyuti_user_toggled_mode') === 'true') {
          return false;
        }
        const params = new URLSearchParams(window.location.search);
        if (params.has('mode')) {
          return false;
        }
      } catch {
        // ignore
      }

      return true;
    };

    const attemptShowPopup = () => {
      if (checkCanShowPopup()) {
        setShowDiscoveryPopup(true);
      }
    };

    // 1. Timer trigger: 20 seconds
    const timer = setTimeout(() => {
      attemptShowPopup();
    }, 20000);

    // 2. Scroll trigger: when visitor scrolls past the Projects section
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const projectsSection = document.getElementById('projects');
          if (projectsSection) {
            const rect = projectsSection.getBoundingClientRect();
            // Bottom of projects section has entered or passed upper viewport
            if (rect.bottom < window.innerHeight * 0.75) {
              attemptShowPopup();
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mode]);

  return (
    <ModeContext.Provider
      value={{
        mode,
        isGarden: mode === 'garden',
        isProfessional: mode === 'professional',
        toggleMode,
        setMode,
        showCurtain,
        triggerCurtain,
        dismissCurtain,
        showDiscoveryPopup,
        dismissDiscoveryPopup,
        hasUserManuallyToggled,
        isDetailModalOpen,
        setIsDetailModalOpen,
        isAdminOpen,
        setIsAdminOpen,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export function usePortfolioMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('usePortfolioMode must be used within a ModeProvider');
  }
  return context;
}
