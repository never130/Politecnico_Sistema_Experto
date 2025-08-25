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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div className="hidden sm:block">
        <LanguageSwitcher />
      </div>
      <button
        aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        onClick={toggleTheme}
        className="bg-[#1da1f2] text-white rounded-full p-3 shadow-lg hover:bg-[#1a8cd8] transition-all duration-200"
      >
        {dark ? '🌙' : '☀️'}
      </button>
    </div>
  );
}
