import React, { ReactNode, useLayoutEffect, useState } from 'react';
import { mergeClassNames, useButton } from 'react-hookers';
import css from './ThemeSwitch.module.css';

const THEME_STORAGE_KEY = 'theme';

interface ThemeSwitchProps {
  className?: string;
}

export function ThemeSwitch(props: ThemeSwitchProps): ReactNode {
  const { className } = props;

  const [theme, setTheme] = useState('auto');

  const { buttonProps, isFocusVisible } = useButton({
    onPress: () => setTheme(cycleTheme),
  });

  useLayoutEffect(() => setTheme(localStorage.getItem(THEME_STORAGE_KEY) || 'auto'), []);

  return (
    <button
      {...buttonProps}
      className={mergeClassNames(
        css.ThemeSwitch,
        isFocusVisible && css.FocusVisible,
        theme === 'light' ? css.ThemeLight : theme === 'dark' ? css.ThemeDark : css.ThemeAuto,
        className
      )}
    />
  );
}

function cycleTheme(theme: string): string {
  // Cycle in the direction of the instant change
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light';
  } else {
    theme = theme === 'dark' ? 'light' : theme === 'light' ? 'auto' : 'dark';
  }

  localStorage.setItem(THEME_STORAGE_KEY, theme);
  window.dispatchEvent(new CustomEvent('themechange'));

  return theme;
}
