import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedDarkMode = localStorage.getItem('dyswrite_darkMode');
    const savedFontSize = localStorage.getItem('dyswrite_fontSize');
    const savedHighContrast = localStorage.getItem('dyswrite_highContrast');

    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
    if (savedFontSize) {
      setFontSize(savedFontSize as 'small' | 'medium' | 'large');
    }
    if (savedHighContrast !== null) {
      setHighContrast(JSON.parse(savedHighContrast));
    }
  }, []);

  const toggleDarkMode = () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    localStorage.setItem('dyswrite_darkMode', JSON.stringify(newValue));
  };

  const handleSetFontSize = (size: 'small' | 'medium' | 'large') => {
    setFontSize(size);
    localStorage.setItem('dyswrite_fontSize', size);
  };

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('dyswrite_highContrast', JSON.stringify(newValue));
  };

  useEffect(() => {
    // Apply theme classes to document
    const root = document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply font size
    root.style.fontSize = fontSize === 'small' ? '14px' : fontSize === 'large' ? '18px' : '16px';
  }, [isDarkMode, fontSize, highContrast]);

  const value: ThemeContextType = {
    isDarkMode,
    toggleDarkMode,
    fontSize,
    setFontSize: handleSetFontSize,
    highContrast,
    toggleHighContrast
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}