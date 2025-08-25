/**
 * Modo oscuro para la app usando Tailwind y preferencia del usuario
 */
'use client';
import { useEffect, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDark(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    setDark((prev) => {
      document.documentElement.classList.toggle('dark', !prev);
      return !prev;
    });
  };

  return (
    <>
      {/* Desktop: top-right pill with language + theme */}
      <div className="hidden sm:flex fixed top-6 right-6 z-50 items-center gap-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur rounded-full px-3 py-1 shadow-md border border-slate-200 dark:border-slate-700">
        <LanguageSwitcher compact />
        <button
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={toggleTheme}
          className="ml-2 bg-[#1da1f2] text-white rounded-full p-2 shadow hover:bg-[#1a8cd8] transition-colors duration-150"
        >
          <span className="sr-only">Toggle theme</span>
          {dark ? '🌙' : '☀️'}
        </button>
      </div>

      {/* Mobile: floating button bottom-right */}
      <div className="sm:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <LanguageSwitcher compact />
        <button
          aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          onClick={toggleTheme}
          className="bg-[#1da1f2] text-white rounded-full p-3 shadow-lg hover:bg-[#1a8cd8] transition-all duration-200"
        >
          {dark ? '🌙' : '☀️'}
        </button>
      </div>
    </>
  );
}
