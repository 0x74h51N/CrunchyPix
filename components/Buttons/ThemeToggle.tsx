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
      <label className="grid place-items-center !cursor-pointer">
        <input
          type="checkbox"
          value="synthwave"
          id="theme-toggle-controller"
          className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
          onChange={toggleTheme}
          checked={theme === 'dark'}
        />
        <svg
          className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <svg
          className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
    </div>
  );
}
