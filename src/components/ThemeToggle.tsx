import { useLayoutEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const { t } = useI18n();
  const [theme, setTheme] = useState<Theme>('light');
  const dark = theme === 'dark';

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0d100f' : '#fffdf5');
  }, [theme, dark]);

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={t.controls.themeToggle}
      aria-pressed={dark}
      title={dark ? t.controls.switchToLight : t.controls.switchToDark}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
    >
      <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {dark ? (
          <path d="M20.8 13.3A9 9 0 0 1 10.7 3.2 9 9 0 1 0 20.8 13.3Z" />
        ) : (
          <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" /></>
        )}
      </svg>
      <span className="theme-toggle__label">{dark ? t.controls.dark : t.controls.light}</span>
    </button>
  );
}
