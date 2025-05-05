
'use client';

import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { useMedia } from 'react-use';

export type SidebarContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isDesktop = useMedia('(min-width: 768px)', true);
  const [open, setOpen] = useState(isDesktop);

  const toggle = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { toggle } = useSidebar();
  return (
    <button
      onClick={toggle}
      className={`p-2 transition-colors hover:bg-secondary/80 light:hover:bg-accent/80 rounded-md ${className || ''}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  );
}
