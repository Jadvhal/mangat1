'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'System' | 'Light' | 'Dark';
export type DisplayType = 'Auto' | 'Single Page' | 'Strip';
export type ReadingDirection = 'Left to Right' | 'Right to Left';

export interface Settings {
  theme: Theme;
  fancyAnimations: boolean;
  showToasts: boolean;
  loginMal: boolean;
  loginAnilist: boolean;
  allowAnalytics: boolean;
  displayType: DisplayType;
  showProgress: boolean;
  stripWidth: number;
  readingDirection: ReadingDirection;
  advanceChapter: boolean;
  showShortcuts: boolean;
}

export const defaultSettings: Settings = {
  theme: 'System',
  fancyAnimations: true,
  showToasts: true,
  loginMal: false,
  loginAnilist: false,
  allowAnalytics: true,
  displayType: 'Auto',
  showProgress: true,
  stripWidth: 144,
  readingDirection: 'Left to Right',
  advanceChapter: true,
  showShortcuts: true,
};

interface SettingsContextType {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('app-settings');
    if (stored) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(stored) });
      } catch (e) {
        console.error('Failed to parse settings', e);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('app-settings', JSON.stringify(settings));
      
      // Apply theme
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      
      if (settings.theme === 'System') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(settings.theme.toLowerCase());
      }
    }
  }, [settings, mounted]);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  // Prevent hydration mismatch by not rendering children until mounted, 
  // or just render children but theme might flash.
  // To avoid flash, we should ideally use a script tag in layout, but this is simpler for now.

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
