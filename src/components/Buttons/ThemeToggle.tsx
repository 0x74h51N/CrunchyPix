'use client';

import { getTheme, setThemeAction } from '@/app/actions/setThemeAction';
import { setThemeSlice } from '@/store/redux/theme';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const themeTook = async () => {
      const themeCookie = await getTheme();
      if (themeCookie) {
        setTheme(themeCookie);
      } else {
        setTheme('dark');
      }
    };
    themeTook();
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme!);
    dispatch(setThemeSlice(theme!));
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setThemeAction(newTheme);
  };
  return (
    <div className="w-12 mx-1.5">
      <label className="toggle text-base-content !cursor-pointer">
        <input
          type="checkbox"
          value="synthwave"
          id="theme-toggle-controller"
          className="theme-controller"
          onChange={toggleTheme}
          checked={theme === 'dark'}
        />
        <svg
          aria-label="sun"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </g>
        </svg>

        <svg
          aria-label="moon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </g>
        </svg>
      </label>
    </div>
  );
}
