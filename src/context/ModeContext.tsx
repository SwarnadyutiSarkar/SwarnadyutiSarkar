import React, { createContext, useContext, useEffect, useState } from 'react';

export type PortfolioMode = 'garden' | 'professional';

interface ModeContextType {
  mode: PortfolioMode;
  isGarden: boolean;
  isProfessional: boolean;
  toggleMode: () => void;
  setMode: (mode: PortfolioMode) => void;
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

  // 3. Default to garden
  return 'garden';
}

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<PortfolioMode>(getInitialMode);

  // Apply data-theme to <html> on initial mount and change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const setMode = (newMode: PortfolioMode) => {
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
    };

    // Use View Transitions API if supported for silky mode switching
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
    setMode(mode === 'garden' ? 'professional' : 'garden');
  };

  return (
    <ModeContext.Provider
      value={{
        mode,
        isGarden: mode === 'garden',
        isProfessional: mode === 'professional',
        toggleMode,
        setMode,
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
