
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface Settings {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const defaultSettings: Settings = {
  theme: 'dark',
  setTheme: () => {},
  sidebarOpen: true,
  setSidebarOpen: () => {},
};

const SettingsContext = createContext<Settings>(defaultSettings);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SettingsContext.Provider
      value={{ theme, setTheme, sidebarOpen, setSidebarOpen }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
