import { useState, useEffect } from 'react';
import { Theme } from '@/types';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.add('disable-transitions');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    void root.offsetHeight;
    setTimeout(() => {
      root.classList.remove('disable-transitions');
    }, 0);
  };

  return {
    theme,
    toggleTheme
  };
};
